var request = require('request');
var config = require('../config.js');
var url = require('url');
var util = require('util');
var decisionModel = require('../models/decision.js');
var decisionCleaner = require('../convertors/decisionCleaner.js');


exports.submitDecision = function(req, res, next){
    var teamId = req.session.team_id;
    var period = req.session.period;
    var seminarId = req.session.seminar_id;

    decisionModel.getDecision(seminarId, period, teamId)
    .then(function(decision){
        console.log(decision);
        res.send('submit decision');
    }).fail(function(err){
        res.send(err);
    }).done();
}