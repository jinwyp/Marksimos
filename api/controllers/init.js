var request = require('../promises/request.js');
var util = require('util');
var config = require('../config.js');
var Q = require('q');
var decisionCleaner = require('../convertors/decision.js');
var decisionModel = require('../models/decision.js');

/**
 * Initialize game data
 *
 * @method init
 * 
 */
exports.init = function(req, res, next){
    var seminar = req.session.seminar;

    initDecision(seminar).then(function(){
        res.send('initialize decision success');
    }).fail(function(err){
        next(err);
    });
};

/**
 * Initialize decision
 *
 * @method initDecision
 * @param {Number} seminar
 * @return {Object} a promise
 */
function initDecision(seminar){
    var periods = config.initPeriods
    var teams = config.initTeams;

    var queries = [];
    periods.forEach(function(period){
        teams.forEach(function(team){
            queries.push(initOnePeriodDecison(seminar, team, period));
        })
    });

    return Q.all(queries);
}

/**
 * Get decision from CGI service, save it to mongo
 * return a promise
 *
 * @method initOnePeriodDecison
 * @param {Number} period
 * @param {team} team
 * @return {Object} a promise
 */
function initOnePeriodDecison(seminar, team, period){
    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s&seminar=%s'
        , period, team, seminar);
    return request(reqUrl).then(function(result){
        decisionCleaner.clean(result);
        return decisionModel.saveDecision(result);
    });
}


















