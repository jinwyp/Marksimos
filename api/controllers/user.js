var express = require('express');
var userModel = require('../models/user.js');
var utility = require('../../common/utility.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var companyDecisionModel = require('../models/companyDecision.js');
var seminarModel = require('../models/seminar.js');

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
}

exports.getStudent = function(req, res, next){
    var userId = sessionOperation.getUserId(req);

    userModel.findOne({_id: userId})
    .then(function(user){
        if(!user){
            return res.send(500, {message: "user doesn't exist."});
        }

        var companyId = sessionOperation.getCompanyId(req);
        var seminarId = sessionOperation.getSeminarId(req);

        var tempUser = JSON.parse(JSON.stringify(user));
        tempUser.companyId = companyId;
        tempUser.companyName = utility.createCompanyArray(companyId)[companyId-1];

        return seminarModel.findOne({
            seminarId: seminarId
        })
        .then(function(dbSeminar){
            if(!dbSeminar){
                throw {message: "seminar " + seminarId +" doesn't exist."}
            }
            tempUser.numOfTeamMember = dbSeminar.companyAssignment[companyId-1].length;
            tempUser.numOfCompany = dbSeminar.companyNum;
            tempUser.currentPeriod = dbSeminar.currentPeriod;
            res.send(tempUser);
        });
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get user failed."})
    })
    .done();
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

    var phoneNum = req.body.phoneNum || '';
    var country = req.body.country || '';
    var state = req.body.state || '';
    var city = req.body.city || '';

    var user = {
        email: email,
        password: password
    }

    if(phoneNum) user.phoneNum = phoneNum;
    if(country) user.country = country;
    if(state) user.state = state;
    if(city) user.city = city;

    var activateToken = utility.generateAcivateToken(email);
    user.activateToken = activateToken;

    userModel.findByEmail(email)
    .then(function(findResult){
        if(findResult){
            return res.send({status:2, message: 'User is existed.'});
        }
        return userModel.register(user)
        .then(function(result){
            if(result){
                return utility.sendActivateEmail(email, activateToken)
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
                isActivated: true
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

exports.login = function(req, res, next){
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

        if(!user.isActivated){
            return res.send(400, {message: 'User is not activated.'})
        }

        if(!utility.comparePassword(password, user.password)){
            return res.send(400, {message: 'Email or password is wrong.'})
        }

        sessionOperation.setLoginStatus(req, true);
        sessionOperation.setUserRole(req, user.role);
        sessionOperation.setUserId(req, user._id);

        return res.send({
            userId: user._id
        });
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'Login failed.'});
    })
    .done();
}























