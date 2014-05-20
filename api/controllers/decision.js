var request = require('request');
var config = require('../config.js');
var url = require('url');
var util = require('util');
var decisionModel = require('../models/decision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var Q = require('q');


exports.submitDecision = function(req, res, next){
    var teamId = req.session.teamId;
    var period = req.session.period;
    var seminarId = req.session.seminar_Id;

    Q.all([decisionModel.findAll(seminarId),
        brandDecisionModel.findAll(seminarId),
        SKUDecisionModel.findAll(seminarId)])
    .spread(function(decisions, brandDecisions, SKUDecisions){
        res.send('submit decision');
    }).fail(function(err){
        next(err);
    }).done();
}