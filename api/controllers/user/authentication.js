var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');
var Token = require('../../models/user/authenticationtoken.js');
var EmailModel = require('../../models/user/emailContent.js');



var mailProvider = require('../../../common/sendCloud.js');
var mailSender = mailProvider.createEmailSender();

var logger = require('../../../common/logger.js');
var util = require('util');
var utility = require('../../../common/utility.js');


//Passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


/**
 * Passport LocalStrategy For Login and Generate Token.
 */

Token.clearToken();

exports.initAuth = function () {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passReqToCallback: true
    }, function (req, username, password, done) {
        //登录参数验证 (用户名和邮箱都可以验证)

        req.assert('password', '6 to 20 characters required').len(6, 20);

        if(req.body.username.indexOf('@') > -1 ){
            req.body.email = req.body.username;
            req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        }else{
            req.checkBody('username', 'Username should be 6-20 characters').notEmpty().len(6, 20);
        }

        var errors = req.validationErrors();
        if (errors) {
            return done(null, false, { message: util.inspect(errors) });
        }

        var rememberMe = false;
        if(req.body.rememberMe){
            rememberMe = true;
        };


        //查找用户
        userModel.findOne( {$or : [
            { username: req.body.username},
            { email: req.body.email}

        ]}, function (err, user) {
            if (err) { return done(err); }
            
            if (!user) {
                return done(null, false, { message: 'User does not exist.' });
            }
            
            if (!userModel.verifyPassword(password, user.password)) {
                return done(null, false, { message: 'Username or password wrong.' });
            }

            //为用户分配token
            Token.createToken({ userId: user._id, rememberMe : rememberMe }).then(function (tokenInfo) {
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

    res.status(200).send({message: 'Logout success'});
};




/**
 * Authenticate Token  For LocalStrategy.
 *
 *  * Examples:
 *
 *    authLoginToken( { successRedirect: '/',  failureRedirect: '/login',  failureFlash: true });
 *
 */

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

        function sendResult(options){
            if (options.failureRedirect) {
                return res.redirect(options.failureRedirect);
            }else{
                return res.status(401).send( {message: options.message });
            }
        }

        var tokenName = 'x-access-token';
        var token = req.headers[tokenName] || lookup(req.body, tokenName) || lookup(req.query, tokenName) || req.cookies[tokenName];

        if (token) {
            //查找token记录
            Token.findOne({ token: token }, function (errToken, tokenInfo) {
                if (errToken) { return next(errToken); }

                //token存在且未过期
                if (tokenInfo && tokenInfo.expires > new Date()) {

                    userModel.findOne({ _id: tokenInfo.userId }, function (err, user) {

                        if (err) { return next(err);}

                        if (!user) {
                            //token存在，用户不存在，则可能用户已被删除
                            options.message = 'Token existed, but user not found.';
                            sendResult(options);
                        }else{
                            req.user = user;

                            // 同时查询改用户当前所玩的Seminar
                            seminarModel.query.findSeminarByUserId(user.id).then(function(seminarResult){
                                if(seminarResult){

                                    req.gameMarksimos = {
                                        currentStudent : user,
                                        currentStudentSeminar : seminarResult
                                    };
                                }else{
                                    req.gameMarksimos = {
                                        currentStudent : false,
                                        currentStudentSeminar : false
                                    };
                                }

                                return next();

                            }).fail(function(err){
                                console.log(err);
                                next(err);
                            }).done();

                        }
                    });
                }else {
                    //token过期
                    options.message = 'Token have expired.';
                    sendResult(options);
                }
            });
        }else {
            options.message = 'Token not found, pls login .';
            sendResult(options);
        }


    }
};




/**
 * Middleware that will authorize a UserRole  with optional `options`.
 *
 * Examples:
 *
 *    authRole('twitter-authz', { successRedirect: '/',  failureRedirect: '/login',  failureFlash: true });
 *
 * @param {Object} options
 */


exports.authRole = function (permission, options) {
    return function (req, res, next) {
        permission = permission || "";
        options = options || {};

        if (userRoleModel.authRolePermission(permission, req.user.roleId) ){
            return next();
        }else{
            if (options.failureRedirect) {
                return res.redirect(options.failureRedirect);
            }else{
                return res.status(403).send( {message: 'You are not authorized. Need ' + permission + ' permission !'});
            }
        }

    }
};







exports.getUserInfo = function (req, res, next){
    var userResult;
    var currentPeriod;

    if(req.gameMarksimos.currentStudent){
        userResult = req.gameMarksimos.currentStudent.toObject();

        userResult.currentMarksimosSeminar = req.gameMarksimos.currentStudentSeminar.toObject();

        // very important, after seminar finished currentPeriod is last round
        if(userResult.currentMarksimosSeminar.currentPeriod > userResult.currentMarksimosSeminar.simulationSpan){
            currentPeriod =  userResult.currentMarksimosSeminar.simulationSpan;
        }else{
            currentPeriod = userResult.currentMarksimosSeminar.currentPeriod;
        }

        userResult.currentMarksimosSeminar.currentPeriod = currentPeriod;
        userResult.currentMarksimosSeminar.numOfCompany = userResult.currentMarksimosSeminar.companyNum;
        userResult.currentMarksimosSeminar.maxPeriodRound = userResult.currentMarksimosSeminar.simulationSpan;


        for(var i=0; i<userResult.currentMarksimosSeminar.companyAssignment.length; i++){
            //if this student is in this company
            if(userResult.currentMarksimosSeminar.companyAssignment[i].studentList.indexOf(userResult.email) > -1){

                userResult.currentMarksimosSeminar.currentCompany = {
                    companyId : userResult.currentMarksimosSeminar.companyAssignment[i].companyId,
                    companyName : userResult.currentMarksimosSeminar.companyAssignment[i].companyName,
                    numOfTeamMember : userResult.currentMarksimosSeminar.companyAssignment[i].studentList.length
                };
            }
        }
    }else{
        userResult = req.user.toObject();
    }



    res.status(200).send(userResult);
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





exports.registerB2CStudent = function(req, res, next){

    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2C);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var newUser = {
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,

        gender : req.body.gender,
        //firstName : req.body.firstName,
        //lastName : req.body.lastName,
        //birthday : req.body.birthday,
        //idcardNumber : req.body.idcardNumber,
        //mobilePhone : req.body.mobilePhone,
        //qq : req.body.qq,


        //majorsDegree : req.body.majorsDegree,
        //organizationOrUniversity : req.body.university,
        //dateOfGraduation : req.body.dateOfGraduation,

        facilitatorId: "54d834bdeaf05dbd048120f8", // fixed for b2c_facilitator

        role : userRoleModel.roleList.student.id,
        studentType : userModel.getStudentType().B2C
    };


    userModel.register(newUser).then(function(resultUser){
        if(!resultUser) {
            throw new Error('Save new user to database error.');
        }


        var mailContent = EmailModel.registration;

        mailContent.html = mailContent.html1 + resultUser.username + mailContent.html2 + resultUser.email + mailContent.html3 + resultUser.resultUser.emailActivateToken +
            mailContent.html4 + resultUser.email + mailContent.html5 + resultUser.resultUser.emailActivateToken + mailContent.htmlend ;

        mailSender.sendMail(mailContent, function(error, info){
            if(error){
                logger.error(error);
            }else{
                logger.log(info);
            }
        });

        return res.status(200).send({message: 'Register new user success'});


    }).fail(function(err){
        next(err);
    }).done();


};


exports.registerB2CEnterprise = function(req, res, next){

    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.enterprise.id);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var newUser = {
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,


        companyName : req.body.companyName,
        companyAddress : req.body.companyAddress,
        companyContactPerson : req.body.companyContactPerson,
        companyContactMobileNumber: req.body.companyContactMobileNumber,
        companyOfficeTelephone: req.body.companyOfficeTelephone,

        facilitatorId: "54d834bdeaf05dbd048120f8", // fixed for b2c_facilitator

        role : userRoleModel.roleList.enterprise.id,
        studentType : userModel.getStudentType().B2C
    };


    userModel.register(newUser).then(function(result){
        if(result){
            return res.status(200).send({message: 'Register new company success'});

        }else{
            throw new Error('Save new company to database error.');
        }

    }).fail(function(err){
        next(err);
    }).done();


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

    userModel.findOneQ({
        email: email,
        activateToken: token
    }).then(function(result){
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
};








exports.forgetPassword = function(req, res, next){

    req.checkBody('email', 'Email wrong format').notEmpty().isEmail();

    var validationErrors =  req.validationErrors();

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    userModel.findOneQ({ email: req.body.email }).then(function(resultUser){

        if(!resultUser){
            throw new Error('Cancel promise. User does not exist.');
        }

        var mailContent = EmailModel.resetPassword;

        mailContent.html = mailContent.html1 + resultUser.username + mailContent.html2 + resultUser.email + mailContent.html3 + resultUser.resultUser.emailActivateToken +
        mailContent.html4 + resultUser.email + mailContent.html5 + resultUser.resultUser.emailActivateToken + mailContent.htmlend ;

        mailSender.sendMail(mailContent, function(error, info){
            if(error){
                logger.error(error);
            }

            return res.status(200).send({message: 'Reset Password Email Send'});
        });

    }).fail(function(err){
        next(err);
    }).done();
};













