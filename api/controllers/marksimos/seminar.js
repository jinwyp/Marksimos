var seminarModel = require('../../models/marksimos/seminar.js');
var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');

var sessionOperation = require('../../../common/sessionOperation.js');
var logger = require('../../../common/logger.js');
var consts = require('../../consts.js');
var utility = require('../../../common/utility.js');


exports.addSeminar = function(req, res, next){
    var checkRequiredFieldResult = checkRequiredField(req);

    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var validateResult = validateSeminar(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var seminar = {};

    var facilitatorId = sessionOperation.getUserId(req);

    seminar.description = req.body.description;
    seminar.country = req.body.country;
    seminar.state = req.body.state;
    seminar.city = req.body.city;
    seminar.venue = req.body.venue;
    seminar.facilitatorId = facilitatorId;
    seminar.simulationSpan = req.body.simulation_span;
    seminar.companyNum = req.body.company_num;
    
    seminar.companyAssignment = [];
    seminar.companies = [];
    var companyNameList = utility.createCompanyArray(seminar.companyNum);
    for(i = 0; i<seminar.companyNum; i++){
        seminar.companies.push({
            companyId: i + 1,
            companyName: companyNameList[i]
        });

        seminar.companyAssignment.push({
            companyId: i + 1,
            companyName: companyNameList[i],
            studentList : []
        });

    }

    userModel.findOne({_id: facilitatorId})
    .then(function(dbFacilitator){
        if(!dbFacilitator){
            throw {message: "Can't find facilitator."};
        }

        if(dbFacilitator.numOfLicense <= 0){
            throw {httpStatus:400, message: "You don't have enough licenses."}
        } 

        return userModel.update({_id: facilitatorId}, {
            numOfLicense: dbFacilitator.numOfLicense - 1,
            numOfUsedLicense: dbFacilitator.numOfUsedLicense + 1
        })
    })
    .then(function(numAffected){
        if(numAffected === 0){
            throw {message: "update facilitator failed."}
        }

        if(numAffected > 1){
            throw {message: "more than one row was updated."}
        }

        //get all seminar, create the next seminar id
        return seminarModel.find({}, {seminarId: "desc"})
    })
    .then(function(allSeminars){
        if(!allSeminars || allSeminars.length === 0){
            seminar.seminarId = "10000";
        }else{
            seminar.seminarId = parseInt(allSeminars[0].seminarId) + 1;
        }

        return seminarModel.insert(seminar);
    })
    .then(function(result){
        if(!result){
            return res.send(500, {message: "save seminar to db failed."});
        }

        return res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        return res.send(500, {message: "add seminar failed."})
    })
    .done();
};








exports.updateSeminar = function(req, res, next){
    var validateResult = validateSeminar(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var seminar = {};

    if(req.body.description) seminar.description = req.body.description;
    if(req.body.country) seminar.country = req.body.country;
    if(req.body.state) seminar.state = req.body.state;
    if(req.body.city) seminar.city = req.body.city;
    if(req.body.venue) seminar.venue = req.body.venue;

    if(Object.keys(seminar).length === 0){
        return res.send(400, {message: "You should at leaset provide one field to update."})
    }

    var facilitatorId = sessionOperation.getUserId(req);
    var seminarId = sessionOperation.getSeminarId(req);

    if(!seminarId){
        return res.send(400, {message: "You have not choose a seminar."});
    }

    seminarModel.update({
        facilitatorId: facilitatorId,
        seminarId: seminarId
    }, seminar)
    .then(function(numAffected){
        if(numAffected!==1){
            return res.send(400, {message: "there's error during update seminar."})
        }
        return res.send({message: "update seminar success."})
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: ""})
    })
    .done();
};






/**
 * Facilitator can call this API
 */
exports.assignStudentToSeminar = function(req, res, next){
   
  

    req.checkBody('email', 'Invalid email.').notEmpty().isEmail();

    req.checkBody('seminarId', 'Invalid seminar id.').notEmpty().isInt();

    req.checkBody('companyId', 'Invalid seminar id.').notEmpty().isInt();

 
    var email = req.body.email;
    var seminarId = req.body.seminar_id.toString();
    var companyId = +req.body.company_id;


    if (req.validationErr) {
        res.send(400, { message: "Invalid company_id." });
        return;
    }

    userModel.findOne({email: email})
    .then(function(student){
        if(!student){
            throw {message: "Email not exist, assign student to seminar failed."};
        }

        return seminarModel.findOne({seminarId: seminarId});
    })
    .then(function(dbSeminar){
        if(!dbSeminar){
            throw {httpStatus: 400, message: "seminar "+ seminarId + " doesn't exist."}
        }

        var companyAssignment = dbSeminar.companyAssignment;
        var isStudentAssignedToSeminar = false;


        for(var i=0; i < companyAssignment.length; i++){
            if(companyAssignment[i].studentList.indexOf(email) > -1){
                isStudentAssignedToSeminar = true;
                throw {message: "Email have already assigned to this seminar."};
            }
        }

        //if this student has not been added to this seminar, add it
        if(!isStudentAssignedToSeminar){
            return seminarModel.update({ 'seminarId': seminarId, 'companyAssignment.companyId': companyId }, {
                '$addToSet': { 'companyAssignment.$.studentList': email }
            });
        }
        return 0;     
    })
    .then(function(numAffected){
        if(numAffected!==1){
            return res.send({message: "there's error during update seminar."});
        }
        return res.send({message: "assign student to seminar success."})
    })
    .fail(function(err){
        logger.error(err);
        next (err);
    })
    .done();
};


exports.removeStudentFromSeminar = function(req, res, next){
    var email = req.body.email;
    var seminarId = req.body.seminar_id;

    if(!email){
        return res.send(400, {message: "Invalid email."});
    }

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."})
    }


    seminarModel.findOne({seminarId: seminarId})
        .then(function(dbSeminar){
            if(!dbSeminar){
                throw {httpStatus: 400, message: "seminar "+ seminarId + " doesn't exist."}
            }

            var companyAssignment = dbSeminar.companyAssignment;


            for(var i=0; i<companyAssignment.length; i++){
                //if this student is in this company
                if(companyAssignment[i].studentList.indexOf(email) > -1){

                    for(var j=0; j<companyAssignment[i].studentList.length; j++){
                        if(companyAssignment[i].studentList[j] === email){
                            companyAssignment[i].studentList.splice(j, 1);
                        }
                    }
                }
            }


            return seminarModel.update({seminarId: seminarId}, {
                companyAssignment: companyAssignment
            });
        })
        .then(function(numAffected){
            if(numAffected!==1){
                return res.send({message: "there's error during update seminar."});
            }
            return res.send({message: "remove student from seminar success."})
        })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            return res.send(500, {message: "remove student from seminar failed."})
        })
        .done();
};



exports.chooseSeminarForFacilitator = function(req, res, next){
    var seminarId = req.params.seminar_id;

    if(!seminarId){
        return res.send(400, {message: "Invalid seminar_id"});
    }

    seminarModel.findOne({seminarId: seminarId})
        .then(function(dbSeminar){
            if(!dbSeminar){
                return res.send(400, {message: "seminar " + seminarId + " doesn't exist."});
            }

            sessionOperation.setSeminarId(req, dbSeminar.seminarId);
            sessionOperation.setCurrentPeriod(req, dbSeminar.currentPeriod);


            return res.render('marksimosadmin/adminmarksimosreport.ejs',{
                title : 'Admin | Report',
                seminarId: seminarId
            });
        })
        .fail(function(err){
            logger.error(err);
            return res.send(500, {message: "choose seminar fails."})
        })
        .done();

};



/**
 * Populate seminar information to session
 * facilitator and student can call this API
 */
exports.chooseSeminarForStudent = function(req, res, next){
    var seminarId = req.query.seminar_id;

    if(!seminarId){
        return res.send(400, {message: "Invalid seminar_id"});
    }

    seminarModel.findOne({seminarId: seminarId})
        .then(function(dbSeminar){
            if(!dbSeminar){
                return res.send(400, {message: "seminar " + seminarId + " doesn't exist."});
            }

            sessionOperation.setSeminarId(req, dbSeminar.seminarId);

            if(dbSeminar.currentPeriod > dbSeminar.simulationSpan){
                sessionOperation.setCurrentPeriod(req, dbSeminar.simulationSpan); // very important
            }else{
                sessionOperation.setCurrentPeriod(req, dbSeminar.currentPeriod); // very important
            }


            if(sessionOperation.getUserRole(req) === userRoleModel.role.student.id){

            }

            return res.send({message: "choose seminar success."});
        })
        .fail(function(err){
            logger.error(err);
            return res.send(500, {message: "choose seminar faile."})
        })
        .done();
};








function checkRequiredField(req){
    if(!req.body.description) return "description can't be empty.";

    if(!req.body.country) return "country can't be empty";

    if(!req.body.state) return "state can't be empty";

    if(!req.body.city) return "city can't be empty";

    if(!req.body.venue) return "venue can't be empty";

    if(!req.body.simulation_span) return "simulation_span can't be empty";

    if(!req.body.company_num) return "company_num can't be empty.";
}

function validateSeminar(req){
    if(req.body.simulation_span){
        var span = parseInt(req.body.simulation_span);
        if(span <= 0 || span > consts.Period_Max){
            return "Invalid simulation_span";
        }
    }

    if(req.body.company_num){
        var companyNum = parseInt(req.body.company_num);
        if(companyNum <= 0 || companyNum > consts.CompaniesMax){
            return "Invalid company_num";
        }
    }
}



















