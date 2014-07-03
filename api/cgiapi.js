var request = require('./promises/request.js');
var url = require('url');
var config = require('./config.js');
var util = require('util');
var Q = require('q');

/**
 * Get exogenous, exogenous are some parameters of the game
 * 
 * @method getExogenous
 * @param {Object} seminarSetting {simulationVariant, targetMarket}
 *
 */
exports.getExogenous = function(period){
    if(period === undefined) throw new Error('Invalid parameter period.');

    var simulationVariant = 'FMCG';
    var targetMarket = 'GENERIC';

    var reqUrl = url.resolve(config.cgiService,
        util.format('exogenous.exe?period=%s&simulationVariant=%s&targetMarket=%s',
            period, simulationVariant, targetMarket));

    return request.get(reqUrl);
}

/**
 * Query allResults CGI service
 * 
 * @method queryOnePeriodResult
 * @param {String} seminarId
 * @param {Number} period [-3, -2, -1]
 */
exports.queryOnePeriodResult = function(seminarId, period) {
    if(seminarId === undefined) throw new Error('Invalid parameter seminarId.');
    if(period === undefined) throw new Error('Invalid parameter period.');

    var reqUrl = config.cgiService + util.format('allresults.exe?seminar=%s&period=%s', seminarId, period);
    return request.get(reqUrl);
}

exports.queryOneDecision = function(seminarId, team, period){
    if(seminarId === undefined) throw new Error('Invalid parameter seminarId.');
    if(team === undefined) throw new Error('Invalid parameter team.');
    if(period === undefined) throw new Error('Invalid parameter period.');

    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s&seminar=%s', period, team, seminarId);
    return request.get(reqUrl);
}

/**
 * Query all decisions in one period
 */
exports.queryDecisionsInOnePeriod = function(seminarId, period){
    var companies = config.initCompanies;

    var queries = [];

    companies.forEach(function(company) {
        queries.push(exports.queryOneDecision(seminarId, company, period));
    })

    return Q.all(queries)
    .then(function(decisions){
        for(var i=0; i<decisions.length; i++){
            decisions[i].period = period;
        }
        return decisions;
    });
}

