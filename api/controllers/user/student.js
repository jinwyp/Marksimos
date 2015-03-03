
'use strict';

var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var teamModel = require('../../models/user/team.js');


var logger = require('../../../common/logger.js');


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

        userData = resultUser;

        return teamModel.findOneQ({ creator: resultUser.id });

    }).then(function(resultTeam){

        if(resultTeam){

            if(resultTeam.memberList.indexOf(userData.id) > -1){
                throw new Error('Cancel promise chains. Because This user is already in the Team !');
            }

            resultTeam.memberList.push(userData.id);
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
                creator: req.user.id,
                memberList : [userData.id]
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
        return teamModel.findOneQ({ creator: req.user.id });

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



