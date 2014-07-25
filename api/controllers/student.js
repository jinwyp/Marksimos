var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var seminarModel = require('../models/seminar.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var utility = require('../../common/utility.js');

exports.addStudent = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForStudent(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var facilitatorId = sessionOperation.getUserId(req);

    var student = {
        name: req.body.firstname + ' ' + req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: utility.hashPassword(req.body.password),
        role: config.role.student,
        facilitatorId: facilitatorId,

        pincode: req.body.pincode || '',
        gender: req.body.gender || '',
        occupation: req.body.occupation || '',
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        university: req.body.university || '',
        organization: req.body.organization || '',
        highestEducationalDegree: req.body.highest_educational_degree ||''
    }

    userModel.findOne({
        email: req.body.email
    })
    .then(function(result){
        if(result){
            throw {httpStatus: 400, message: 'Email has been used, please choose another email.'};
        }else{
            return userModel.register(student);
        }
    })
    .then(function(result){
        if(!result){
            throw {message: "failed to save student to db."}
        }
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: "add student failed."})
    })
    .done();
};

exports.updateStudent = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var student = {};

    if(req.body.name) student.name = req.body.firstname + ' ' + req.body.lastname;
    if(req.body.phone) student.phone = req.body.phone;
    if(req.body.country) student.country = req.body.country;
    if(req.body.state) student.state = req.body.state;
    if(req.body.city) student.city = req.body.city;
    if(req.body.password) student.password = utility.hashPassword(req.body.password);
    if(req.body.pincode) student.pincode = req.body.pincode;
    if(req.body.gender) student.gender = req.body.gender;
    if(req.body.occupation) student.occupation = req.body.occupation;
    if(req.body.firstname) student.firstName = req.body.firstname;
    if(req.body.lastname) student.lastName = req.body.lastname;
    if(req.body.university) student.university = req.body.university;
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
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: "failed to update student."});
    })
    .done();
};

exports.searchStudent = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var isDisabled = req.query.user_status;

    var query = {
        role: config.role.student
    };

    //only facilitator and admin can search students
    //facilitator can only view its own students
    if(sessionOperation.getUserRole(req) !== config.role.admin){
        query.facilitatorId = sessionOperation.getUserId(req);
    }

    if(name) query.name = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(isDisabled) query.isDisabled = isDisabled;

    userModel.find(query)
    .then(function(result){
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'search failed'})
    })
    .done();
}

exports.getSeminarOfStudent = function(req, res, next){
    var studentId = sessionOperation.getUserId(req);

    seminarModel.find({},{})
    .then(function(allSeminars){
        var assignedSeminars = [];
        for(var i=0; i<allSeminars.length; i++){
            var seminar = allSeminars[i];
            for(var j=0; j<seminar.companyAssignment.length; j++){
                if(seminar.companyAssignment[j].indexOf(studentId) > -1){
                    assignedSeminars.push(seminar);
                    break;
                }
            }
        }

        res.send(assignedSeminars);
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: "get seminar list failed."})
    })
    .done();
};











