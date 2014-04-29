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
    var periods = [-3];
    var teams = [1];

    var queries = [];
    periods.forEach(function(period){
        teams.forEach(function(team){
            queries.push(initOnePeriodDecison(period, team));
        })
    });

    Q.all(queries).then(function(){
        res.send('init success');
    }).fail(function(err){
        next(err);
    });
};

/**
 * Get decision from CGI service, save it to mongo
 * return a promise
 *
 * @method initOnePeriodDecison
 * @param {Number} period
 * @param {team} team
 * @return {Object} a promise
 */
function initOnePeriodDecison(period, team){
    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s', period, team);
    return request(reqUrl).then(function(result){
        decisionCleaner.clean(result);
        return decisionModel.saveDecision(result);
    });
}


















