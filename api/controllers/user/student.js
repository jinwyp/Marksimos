
'use strict';

var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var teamModel = require('../../models/user/team.js');
var fileUploadModel = require('../../models/user/fileupload.js');

//var ObjectId = require('mongoose').Types.ObjectId;



exports.updateStudentB2CInfo = function(req, res, next){

    var validationErrors = userModel.userInfoValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2C);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var updatedUser = {};

    if(typeof req.body.gender !== 'undefined') updatedUser.gender = req.body.gender;
    if(typeof req.body.birthday !== 'undefined') updatedUser.birthday = req.body.birthday;
    if(typeof req.body.firstName !== 'undefined') updatedUser.firstName = req.body.firstName;
    if(typeof req.body.lastName !== 'undefined') updatedUser.gender = req.body.lastName;
    if(typeof req.body.idcardNumber !== 'undefined') updatedUser.gender = req.body.idcardNumber;

    if(typeof req.body.mobilePhone !== 'undefined') updatedUser.mobilePhone = req.body.mobilePhone;
    if(typeof req.body.qq !== 'undefined') updatedUser.gender = req.body.qq;

    if(typeof req.body.majorsDegree !== 'undefined') updatedUser.majorsDegree = req.body.qq;
    if(typeof req.body.dateOfEnterCollege !== 'undefined') updatedUser.dateOfEnterCollege = req.body.dateOfEnterCollege;
    if(typeof req.body.dateOfGraduation !== 'undefined') updatedUser.dateOfGraduation = req.body.dateOfGraduation;
    if(typeof req.body.organizationOrUniversity !== 'undefined') updatedUser.organizationOrUniversity = req.body.organizationOrUniversity;
    if(typeof req.body.occupation !== 'undefined') updatedUser.occupation = req.body.occupation;

    if(typeof req.body.country !== 'undefined') updatedUser.country = req.body.country;
    if(typeof req.body.state !== 'undefined') updatedUser.state = req.body.state;
    if(typeof req.body.city !== 'undefined') updatedUser.city = req.body.city;
    if(typeof req.body.district !== 'undefined') updatedUser.district = req.body.district;
    if(typeof req.body.street !== 'undefined') updatedUser.street = req.body.street;

    if(typeof req.body.websiteLanguage !== 'undefined') updatedUser.websiteLanguage = req.body.websiteLanguage;



    userModel.findOneAndUpdateQ( { _id : req.user._id }, updatedUser ).then(function(resultUser){

        if(!resultUser){
            throw new Error('Cancel promise chains. Because Update Team failed. more or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: 'Student update success'});

    }).fail(function(err){
        next(err);
    }).done();
};



exports.uploadStudentAvatar = function(req, res, next){

    fileUploadModel.creatFile(req.files, 'studentavatar').then(function(result){

        if(!result ){
            throw new Error('Cancel promise chains. Because Create New File failed !');
        }

        return userModel.findOneAndUpdateQ({ _id : req.user._id} , {avatar : result._id});

    }).then(function( savedDoc){

        if(!savedDoc ){
            throw new Error('Cancel promise chains. Because Update User failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: 'Upload Avatar picture success'});


    }).fail(function(err){
        next(err);
    }).done();

};





exports.updateStudentB2CPassword = function(req, res, next){

    var validationErrors = userModel.passwordValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2C);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    userModel.findByIdQ(req.user._id).then(function(resultUser){

        if(!resultUser){
            throw new Error('Cancel promise chains. Because user not found !');
        }

        if (!userModel.verifyPassword(req.body.passwordOld, resultUser.password)) {
            throw new Error('Cancel promise chains. Because Old password wrong!');
        }

        resultUser.password = req.body.passwordNew;
        return resultUser.saveQ();

    }).then(function(savedDoc){

        if(!savedDoc ){
            throw new Error('Cancel promise chains. Because Update Password failed. More or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Student password update success'});

    }).fail(function(err){
        next(err);
    }).done();
};







exports.updateTeam = function(req, res, next){

    var validationErrors = teamModel.updateValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    teamModel.findOneAndUpdateQ(
        { creator : req.user._id },
        { name:req.body.name, description:req.body.description||''  },
        { upsert : true}

    ).then(function(resultTeam){

        if(!resultTeam){
            throw new Error('Cancel promise chains. Because Update Team failed. more or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Team update success'});

    }).fail(function(err){
        next(err);
    }).done();
};


exports.addStudentToTeam = function(req, res, next){

    var validationErrors = userModel.usernameValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2C);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var userData = {};

    userModel.findOneQ({$or : [
        { 'username': req.body.username},
        { 'email': req.body.email}
    ]}).then(function(resultUser) {

        if (!resultUser) {
            throw new Error('Cancel promise chains. Because User not found!');
        }

        if (resultUser._id.equals(req.user._id)) {
            throw new Error('Cancel promise chains. Because User can not add himself in his own team !');
        }

        userData = resultUser;
        return teamModel.findOneQ({ creator: req.user._id });

    }).then(function(resultTeam){
        if(resultTeam){

            if(resultTeam.memberList.indexOf(userData._id) > -1){
                throw new Error('Cancel promise chains. Because This user is already in the Team !');
            }

            resultTeam.memberList.push(userData._id);
            resultTeam.saveQ().then(function(savedDoc){

                if(!savedDoc ){
                    throw new Error('Cancel promise chains. Because Update Team failed. more or less than 1 record is updated. it should be only one !');
                }

                return res.status(200).send({message: 'Add student to team success'});

            }).fail(function(err){
                next(err);
            }).done();

        }else{
            teamModel.createQ({
                name: req.user.username,
                creator: req.user._id,
                memberList : [userData._id]
            }).then(function(resultNewTeam){

                if(!resultNewTeam ){
                    throw new Error('Cancel promise chains. Because Create New Team failed !');
                }

                return res.status(200).send({message: 'Create New Team success'});

            }).fail(function(err){
                next(err);
            }).done();
        }
    }).fail(function(err){
        next(err);
    }).done();
};


exports.removeStudentToTeam = function(req, res, next){

    var validationErrors = userModel.userIdValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2C);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var userData = {};

    userModel.findByIdQ(req.params.student_id).then(function(resultUser) {

        if (!resultUser) {
            throw new Error('Cancel promise chains. Because User not found!');
        }

        userData = resultUser;
        return teamModel.findOneQ({ creator: req.user._id });

    }).then(function(resultTeam){

        if(!resultTeam){
            throw new Error('Cancel promise chains. Because Team not found!');
        }

        resultTeam.memberList.forEach(function(member, index){
            if(member.toString() === userData.id){
                resultTeam.memberList.splice(index, 1);
            }
        });

        return resultTeam.saveQ();

    }).then(function(savedDoc){

        if(!savedDoc ){
            throw new Error('Cancel promise chains. Because Update Team failed. more or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Remove student to team success'});

    }).fail(function(err){
        next(err);
    }).done();
};



