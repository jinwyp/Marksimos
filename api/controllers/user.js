var express = require('express');
var userModel = require('../models/user.js');
var utility = require('../../common/utility.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var companyDecisionModel = require('../models/companyDecision.js');
var seminarModel = require('../models/seminar.js');
var config = require('../../common/config.js');


exports.getUser = function(req, res, next){
    var userId = sessionOperation.getUserId(req);
    userModel.findOne({_id: userId})
    .then(function(user){
        if(!user){
            return res.send(500, {message: "user doesn't exist."});
        }

        res.send(user);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get user failed."})
    })
    .done();
};



exports.getCurrnetStudentSeminar = function(req, res, next){
    var userId = sessionOperation.getUserId(req);

    userModel.findOne({_id: userId}).then(function(user){
        if(!user){
            return res.send(500, {message: "user doesn't exist."});
        }

        var seminarId = sessionOperation.getSeminarId(req);

        var tempUser = JSON.parse(JSON.stringify(user));

        return seminarModel.findOne({seminarId: seminarId}).then(function(dbSeminar){
            if(!dbSeminar){
                throw {message: "seminar " + seminarId +" doesn't exist."}
            }

            sessionOperation.setCurrentPeriod(req, dbSeminar.currentPeriod); // very important
            tempUser.seminarId = dbSeminar.seminarId;

            tempUser.numOfCompany = dbSeminar.companyNum;
            tempUser.currentPeriod = dbSeminar.currentPeriod;
            tempUser.maxPeriodRound = dbSeminar.simulationSpan;
            tempUser.isSimulationFinished = dbSeminar.isSimulationFinished;

            for(var i=0; i<dbSeminar.companyAssignment.length; i++){
                //if this student is in this company
                if(dbSeminar.companyAssignment[i].studentList.indexOf(user.email) > -1){

                    tempUser.companyId = dbSeminar.companyAssignment[i].companyId;
                    tempUser.companyName = dbSeminar.companyAssignment[i].companyName;
                    tempUser.numOfTeamMember = dbSeminar.companyAssignment[i].studentList.length;
                }
            }

            res.send(tempUser);
        });
    })
    .fail(function(err){
        logger.error(err);
        next(err);
    })
    .done();
}

exports.logout = function(req, res, next){
    sessionOperation.setStudentLoginStatus(req, false);
    sessionOperation.setAdminLoginStatus(req, false);

    sessionOperation.setUserRole(req, "");
    sessionOperation.setUserId(req, "");
    sessionOperation.setEmail(req, "");
    sessionOperation.setSeminarId(req, "");
    sessionOperation.setCurrentPeriod(req, "");
    res.send({message: 'Logout success'});
}

exports.register = function(req, res, next){
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

    user.role = config.role.student;
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

    user.role = config.role.enterpriseb2c;

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

exports.activate = function(req, res, next){
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

exports.studentLogin = function(req, res, next){
    req.checkBody('email', 'Invalid email.').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    var email = req.body.email;
    var password = req.body.password;

    //console.log(email, password);

    userModel.findByEmail(email)
    .then(function(user){
        if(!user){
            return res.send(400, {message: 'User does not exist.'});
        }

        // if(!user.emailActivated){
        //     return res.send(400, {message: 'User is not activated.'})
        // }

        if(!utility.comparePassword(password, user.password)){
            return res.send(400, {message: 'Email or password is wrong.'})
        }

        sessionOperation.setStudentLoginStatus(req, true);
        sessionOperation.setUserRole(req, user.role);
        sessionOperation.setUserId(req, user._id);
        sessionOperation.setEmail(req, email);

        return res.send({
            userId: user._id
        });
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'Login failed.'});
    })
    .done();
};

exports.adminLogin = function(req, res, next){
    req.checkBody('email', 'Invalid email.').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    var email = req.body.email;
    var password = req.body.password;

    userModel.findByEmail(email)
    .then(function(user){
        if(!user){
            return res.send(400, {message: 'User does not exist.'});
        }

        // if(!user.emailActivated){
        //     return res.send(400, {message: 'User is not activated.'})
        // }

        if(!utility.comparePassword(password, user.password)){
            return res.send(400, {message: 'Email or password is wrong.'})
        }

        sessionOperation.setAdminLoginStatus(req, true);
        sessionOperation.setUserRole(req, user.role);
        sessionOperation.setUserId(req, user._id);
        sessionOperation.setEmail(req, email);

        return res.send({
            userId: user._id
        });
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'Login failed.'});
    })
    .done();
};























