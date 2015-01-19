var sessionOperation = require('../../../common/sessionOperation.js');
var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');
var Token = require('../../models/user/authenticationtoken.js');

var utility = require('../../../common/utility.js');
var logger = require('../../../common/logger.js');
var util = require('util');

//Passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


/**
 * Passport LocalStrategy For Login and Generate Token.
 */

exports.initAuth = function () {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, function (req,  email, password, done) {        
        //登录参数验证
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.assert('password', '6 to 20 characters required').len(6, 20);
        var errors = req.validationErrors();
        if (errors) {
            return done(null, false, { message: util.inspect(errors) });
        }
        
        //查找用户 
        userModel.query.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            
            if (!user) {
                return done(null, false, { message: 'User does not exist.' });
            }
            
            if (!utility.comparePassword(password, user.password)) {
                return done(null, false, { message: 'Email or password is wrong.' });
            }
            //为用户分配token
            Token.createToken({ userId: user._id }).then(function (tokenInfo) {
                user.token = tokenInfo.token;

                done(null, user);
            }).fail(function (err) {
                done({ message: util.inspect(err) }, false);
            }).done();
        });

    }));

};

exports.studentLogin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.status(401).send( { message: info.message })
        }
        if (user.role === userRoleModel.roleList.student.id) {
            res.cookie('x-access-token', user.token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).send({ message: 'Login success.' , token: user.token });
        }else {
            return res.status(403).send({ message: 'Your account is a ' + user.roleName + ' account, you need a student account login' });
        }
    })(req, res, next);
};

exports.adminLogin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.status(401).send( { message: info.message })
        }
        if (user.role === userRoleModel.roleList.admin.id || user.role === userRoleModel.roleList.distributor.id || user.role === userRoleModel.roleList.facilitator.id) {
            res.cookie('x-access-token', user.token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).send({ message: 'Login success.' , token: user.token });
        }else {
            return res.status(403).send({ message: 'Your account is a ' + user.roleName + ' account, you need a admin account login' });
        }
    })(req, res, next);
};

exports.logout = function(req, res, next){
    req.logout();
    res.clearCookie('x-access-token');
    //sessionOperation.setSeminarId(req, "");
    //sessionOperation.setCurrentPeriod(req, "");
    res.status(200).send({message: 'Logout success'});
};




/**
 * Authenticate Token  For LocalStrategy.
 */

function getUser(req, done) {

    function lookup(obj, field) {
        if (!obj) { return null; }
        var chain = field.split(']').join('').split('[');
        for (var i = 0, len = chain.length; i < len; i++) {
            var prop = obj[chain[i]];
            if (typeof (prop) === 'undefined') { return null; }
            if (typeof (prop) !== 'object') { return prop; }
            obj = prop;
        }
        return null;
    }
    var tokenName = 'x-access-token';
    var token = req.headers[tokenName] || lookup(req.body, tokenName) || lookup(req.query, tokenName) || req.cookies[tokenName];
    if (token) {
        //查找token记录
        Token.findOne({ token: token }, function (errToken, tokenInfo) {
            if (errToken) { return done(errToken); }
            //记录存在且未过期
            if (tokenInfo && tokenInfo.expires > new Date()) {

                userModel.query.findOne({ _id: tokenInfo.userId }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        //token存在，用户不存在，则可能用户已被删除
                        return done(null, false, { message: 'Login error.' });
                    }

                    req.user = user;
                    console.log("user", req.user, req.user.roleId);
                    done(null, user);
                });
            }else {
                //token过期或不存在
                done(null, false, { message: 'Login timeout.' });
            }
               
        });
    }else {
        done(null, false)
    }  
}



exports.authLoginToken = function (options) {
    return function (req, res, next) {
        options = options || {};
        if(typeof options.failureRedirect === 'undefined'){
            options.failureRedirect = false;
        }

        function lookup(obj, field) {
            if (!obj) { return null; }
            var chain = field.split(']').join('').split('[');
            for (var i = 0, len = chain.length; i < len; i++) {
                var prop = obj[chain[i]];
                if (typeof (prop) === 'undefined') { return null; }
                if (typeof (prop) !== 'object') { return prop; }
                obj = prop;
            }
            return null;
        }

        var tokenName = 'x-access-token';
        var token = req.headers[tokenName] || lookup(req.body, tokenName) || lookup(req.query, tokenName) || req.cookies[tokenName];

        if (token) {
            //查找token记录
            Token.findOne({ token: token }, function (errToken, tokenInfo) {
                if (errToken) { return res.status(500).send(errToken); }

                //token存在且未过期
                if (tokenInfo && tokenInfo.expires > new Date()) {

                    userModel.query.findOne({ _id: tokenInfo.userId }, function (err, user) {
                        if (err) { return res.status(500).send(err);}

                        if (!user) {
                            //token存在，用户不存在，则可能用户已被删除
                            options.message = 'Token existed, but user not found.';
                        }else{
                            req.user = user;
                            next();
                        }
                    });
                }else {
                    //token过期
                    options.message = 'Token have expired.';
                }
            });
        }

        if (options.failureRedirect) {
            return res.redirect(options.failureRedirect);
        }else{
            res.status(401).send( {message: options.message });
        }
    }
};




/**
 * Middleware that will authorize a third-party account  with optional `options`.
 *
 * Examples:
 *
 *    passport.authorize('twitter-authz', { successRedirect: '/',  failureRedirect: '/login',  failureFlash: true });
 *
 * @param {Object} options
 */


exports.authRole = function (permission, options) {
    return function (req, res, next) {
        permission = permission || "";
        options = options || {};

        if (userRoleModel.authRolePermission(permission, req.user.roleId) ){
            next();
        }else{
            if (options.failureRedirect) {
                return res.redirect(options.failureRedirect);
            }else{
                res.status(403).send( {message: 'You are not authorized. Need ' + permission + ' permission !'});
            }
        }

    }
};







exports.getUserInfo = function (req, res, next){
    res.send(req.user);
};





exports.registerStudentB2B = function(req, res, next){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    var email = req.body.email;
    var password = req.body.password;
    password = utility.hashPassword(password);

    var phoneNum = req.body.mobilePhone || '';
    var country = req.body.country || '';
    var state = req.body.state || '';
    var city = req.body.city || '';

    var user = {
        email: email,
        password: password
    };

    if(phoneNum) user.mobilePhone = phoneNum;
    if(country) user.country = country;
    if(state) user.state = state;
    if(city) user.city = city;


    userModel.findByEmail(email)
    .then(function(findResult){
        if(findResult){
            return res.send({status:2, message: 'User is existed.'});
        }
        return userModel.register(user)
        .then(function(result){
            if(result){
                return utility.sendActivateEmail(email, user.emailActivateToken)
                .then(function(sendEmailResult){
                    if(sendEmailResult){
                        return res.send({message: 'Register success'});
                    }else{
                        throw new Error('Send activate email failed.');
                    }
                })
            }else{
                throw new Error('Save user to db failed.');
            }
        })
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'register failed.'});
    })
    .done();
};


function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}


//registerE4Estudent
exports.registerE4Estudent = function(req, res, next){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    var email = req.body.email;
    var password = randomString(6);
    var oldPassword = password;
    password = utility.hashPassword(password);

    var user = {
        email: email,
        password: password
    };

    user.username = req.body.userName;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.birthday = req.body.yearOfBirth;
    user.majorsDegree = req.body.majors;
    user.organizationOrUniversity = req.body.university;
    user.dateOfGraduation = req.body.dateOfGraduation;
    user.qq = req.body.qq;

    user.role = userRoleModel.roleList.student.id;
    user.studentType = 20;

    userModel.findByEmail(email)
    .then(function(findResult){
        if(findResult){
            return res.send({status:2, message: 'User is existed.'});
        }
        return userModel.register(user)
        .then(function(result){
            if(result){
                return res.send({message: 'Register success',password:oldPassword});

                // return utility.sendActivateEmail(email, user.emailActivateToken)
                // .then(function(sendEmailResult){
                //     if(sendEmailResult){
                //         return res.send({message: 'Register success'});
                //     }else{
                //         throw new Error('Send activate email failed.');
                //     }
                // })
            }else{
                throw new Error('Save user to db failed.');
            }
        })
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'register failed.'});
    })
    .done();
}


//registerE4Ecompany
exports.registerE4Ecompany = function(req, res, next){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    var email = req.body.email;
    var password = randomString(6);
    var oldPassword = password;
    password = utility.hashPassword(password);

    var user = {
        email: email,
        password: password
    }

    user.username = req.body.nameOfContactPerson;
    user.designation = req.body.designation;
    user.officalContactNumber = req.body.officalContactNumber;
    user.holdingCompany = req.body.holdingCompany;
    user.division = req.body.division;
    user.mobilePhone = req.body.mobileNumber;

    user.role = userRoleModel.roleList.enterprise.id;

    userModel.findByEmail(email)
    .then(function(findResult){
        if(findResult){
            return res.send({status:2, message: 'User is existed.'});
        }
        return userModel.register(user)
        .then(function(result){
            if(result){
                return res.send({message: 'Register success',password:oldPassword});


                // return utility.sendActivateEmail(email, user.emailActivateToken)
                // .then(function(sendEmailResult){
                //     if(sendEmailResult){
                //         return res.send({message: 'Register success'});
                //     }else{
                //         throw new Error('Send activate email failed.');
                //     }
                // })
            }else{
                throw new Error('Save user to db failed.');
            }
        })
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'register failed.'});
    })
    .done();
};


exports.activateEmail = function(req, res, next){
    var email = req.query.email;
    var token = req.query.token;

    if(!email){
        return res.send(400, {message: 'email is required.'})
    }

    if(!token){
        return res.send(400, {message: 'token is required.'})
    }

    userModel.findByEmailAndToken(email, token)
    .then(function(result){
        if(result){
            return userModel.updateByEmail(email, {
                emailActivated: true
            })
            .then(function(numAffected){
                if(numAffected === 1){
                    return res.send({message: 'activate success'});
                }
                return res.send(500, {message: 'more or less than 1 record is updated. it should be only one.'})
            });
        }else{
            throw new Error('User does not exist.');
        }
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'activate failed.'})
    })
    .done();
}























