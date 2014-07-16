var seminarModel = require('../models/seminar.js');
var sessionOperation = require('../../common/sessionOperation.js');
var logger = require('../../common/logger.js');
var consts = require('../consts.js');

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

    //get all seminar, create the next seminar id
    seminarModel.find({}, {seminarId: "desc"})
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
        return res.send(err.httpStatus || 500, {message: "add seminar failed."})
    })
    .done();
}

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



















