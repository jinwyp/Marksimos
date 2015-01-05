var config = require('../../../common/config.js');
var sessionOperation = require('../../../common/sessionOperation.js');
var userModel = require('../../models/user/user.js');
var seminarModel = require('../../models/marksimos/seminar.js');

var validator = require('validator');
var logger = require('../../../common/logger.js');
var util = require('util');
var utility = require('../../../common/utility.js');



exports.getSeminarList = function(req, res, next){
    var email = sessionOperation.getEmail(req);

    seminarModel.find({},{})
    .then(function(allSeminars){
        var assignedSeminars = [];

        for(var i=0; i<allSeminars.length; i++){
            var seminar = allSeminars[i];
            for(var j=0; j<seminar.companyAssignment.length; j++){

                if( typeof seminar.companyAssignment[j].studentList  !== 'undefined'){
                    if(seminar.companyAssignment[j].studentList.indexOf(email) > -1){
                        if(seminar.isInitialized ){
                            assignedSeminars.push(seminar);
                            break;
                        }
                    }
                }
            }
        }

        res.send(assignedSeminars);
    })
    .fail(function(err){
        logger.error(err);
        err.message = "get seminar list failed.";
        next(err);
    })
    .done();
};


exports.getSeminarInfo = function(req, res, next){
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

            if(dbSeminar.currentPeriod > dbSeminar.simulationSpan){
                sessionOperation.setCurrentPeriod(req, dbSeminar.simulationSpan); // very important
            }else{
                sessionOperation.setCurrentPeriod(req, dbSeminar.currentPeriod); // very important
            }


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
};










