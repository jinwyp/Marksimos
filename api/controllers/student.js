var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var utility = require('../../common/utility.js');

exports.addStudent = function(req, res, next){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    req.checkBody('first_name', '2 to 20 characters required.').notEmpty().len(2, 20);
    req.checkBody('last_name', '2 to 20 characters required.').notEmpty().len(2, 20);
    req.checkBody('phone', 'phone is empty.').notEmpty();
    req.checkBody('country', 'country is empty').notEmpty();
    req.checkBody('state', 'state is empty').notEmpty();
    req.checkBody('city', 'city is empty').notEmpty();
    req.checkBody('num_of_license', 'Invalid num of license').isInt();


    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    if(req.body.pincode && !utility.validatePincode(req.body.pincode)){
        return res.send(400, {message: 'Invalid pincode'});
    }

    if(req.body.gender && !utility.validateGender(req.body.gender)){
        return res.send(400, {message: 'Invalid gender'});
    }


    //if phone contains characters other than number
    if(!validator.isNumeric(req.body.phone)){
        return res.send(400, {message: "Invalid phone."});
    }

    var facilitatorId = sessionOperation.getUserId(req);

    var student = {
        name: req.body.first_name + ' ' + req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: req.body.password,
        role: config.role.student,
        isActive: true,
        facilitatorId: facilitatorId,

        pincode: req.body.pincode,
        gender: req.body.gender,
        occupation: req.body.occupation || '',
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        univercity: req.body.univercity || '',
        organization: req.body.organization || '',
        highestEducationalDegree: req.body.highestEducationalDegree ||''
    }

    userModel.findOne({
        email: req.body.email
    })
    .then(function(result){
        if(result){
            throw {httpStatus: 400, message: 'Email has been used, please choose another email.'};
        }else{
            return userModel.findOne({
                _id: facilitatorId
            })
        }
    })
    .then(function(facilitator){
        if(!facilitator){
            throw {httpStatus:400, message: "Can't find facilitator in database, facilitatorId: " + facilitatorId};
        }

        return userModel.update({
            _id: facilitatorId
        }, {
            numOfLicense: facilitator.numOfLicense - 1,
            numOfUsedLicense: facilitator.numOfUsedLicense + 1
        });
    })
    .then(function(numAffected){
        if(numAffected !== 1){
            throw {message: "update facilitator failed during add student, numAffected: " + numAffected};
        }

        return userModel.register(student);
    })
    .then(function(result){
        if(!result){
            throw {message: "failed to save student to db."}
        }
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(err.httpStatus || 500, {message: "add student failed."})
    })
};












