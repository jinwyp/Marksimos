var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var utility = require('../../common/utility.js');

exports.addStudent = function(req, res, next){
    var validateResult = validateStudent(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
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
        facilitatorId: facilitatorId,

        pincode: req.body.pincode || '',
        gender: req.body.gender || '',
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
    .done();
};

exports.updateStudent = function(req, res, next){
    if(sessionOperation.getUserRole(req) === config.role.facilitator){
        updateStudentByFacilitator(req, res, next);
    }else if(sessionOperation.getUserRole(req) === config.role.student){
        //updateStudentByFacilitator(req, res, next);
    }else{
        res.send(500, {message: "Invalid user role."});
    }
}

function updateStudentByFacilitator(req, res, next){
    var validateResult = validateStudent(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var student = {};

    if(req.body.name) student.name = req.body.first_name + ' ' + req.body.last_name;
    if(req.body.phone) student.phone = req.body.phone;
    if(req.body.country) student.country = req.body.country;
    if(req.body.state) student.state = req.body.state;
    if(req.body.city) student.city = req.body.city;
    if(req.body.password) student.password = req.body.password;
    if(req.body.pincode) student.pincode = req.body.pincode;
    if(req.body.gender) student.gender = req.body.gender;
    if(req.body.occupation) student.occupation = req.body.occupation;
    if(req.body.firstName) student.firstName = req.body.firstName;
    if(req.body.lastName) student.lastName = req.body.lastName;
    if(req.body.univercity) student.univercity = req.body.univercity;
    if(req.body.organization) student.organization = req.body.organization;
    if(req.body.highestEducationalDegree) student.highestEducationalDegree = req.body.highestEducationalDegree;

    if(Object.keys(student).length === 0){
        return res.send(400, {message: "You should at least provide one field to update."})
    }

    var student_id = req.params.student_id;
    if(!student_id){
        return res.send(400, {message: "student_id can't be empty."})
    }

    userModel.findOne({
        _id: student_id
    })
    .then(function(dbStudent){
        if(!dbStudent){
            throw {httpStatus: 400, message: "student doesn't exist."}
        }

        if(dbStudent.facilitatorId !== sessionOperation.getUserId(req)){
            throw {httpStatus: 400, message: "You are not authorized to update this student."}
        }

        return userModel.update({_id: student_id}, student);
    })
    .then(function(numAffected){
        if(numAffected !== 1){
            if(numAffected > 1){
                throw {httpStatus:400, message: "more than one row are updated."};
            }else{
                throw {httpStatus:400, message: "no student is updated." + student_id};
            }
        }

        res.send({message: "update student success."});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "failed to update student."});
    })
    .done();
}

function validateStudent(req){
    if(req.body.email){
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    }
    
    if(req.body.password){
        req.assert('password', '6 to 20 characters required').len(6, 20);
    }
    
    if(req.body.first_name){
        req.checkBody('first_name', '2 to 20 characters required.').notEmpty().len(2, 20);
    }

    if(req.body.last_name){
        req.checkBody('last_name', '2 to 20 characters required.').notEmpty().len(2, 20);
    }
    
    if(req.body.phone){
        req.checkBody('phone', 'phone is empty.').notEmpty();
    }

    if(req.body.country){
        req.checkBody('country', 'country is empty').notEmpty();
    }
    
    if(req.body.state){
        req.checkBody('state', 'state is empty').notEmpty();
    }

    if(req.body.city){
        req.checkBody('city', 'city is empty').notEmpty();
    }
    
    if(req.body.num_of_license){
        req.checkBody('num_of_license', 'Invalid num of license').isInt();
    }
    

    var errors = req.validationErrors();

    if(errors){
        return util.inspect(errors);
    }
    
    if(req.body.pincode && !utility.validatePincode(req.body.pincode)){
        return 'Invalid pincode';
    }

    if(req.body.gender && !utility.validateGender(req.body.gender)){
        return 'Invalid gender';
    }

    //if phone contains characters other than number
    if(!validator.isNumeric(req.body.phone)){
        return "Invalid phone.";
    }
}












