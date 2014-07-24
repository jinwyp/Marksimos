var request = require('./promises/request.js');
var url = require('url');
var config = require('../common/config.js');
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
};

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
};

exports.queryOneDecision = function(seminarId, team, period){
    if(seminarId === undefined) throw new Error('Invalid parameter seminarId.');
    if(team === undefined) throw new Error('Invalid parameter team.');
    if(period === undefined) throw new Error('Invalid parameter period.');

    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s&seminar=%s', period, team, seminarId);

    return request.get(reqUrl);
};

/**
 * Query all decisions in one period
 */
exports.queryDecisionsInOnePeriod = function(seminarId, period, companyNum){
    var queries = [];

    if(typeof companyNum !== 'number' || companyNum <= 0){
        throw new Error("Invalid companyNum");
    }

    for(var i=1; i<=companyNum; i++){
        var company = i;
        queries.push(exports.queryOneDecision(seminarId, company, period));
    }

    return Q.all(queries)
    .then(function(decisions){
        for(var i=0; i<decisions.length; i++){
            if(decisions[i].message){
                throw new Error('Get decision failed, period: ' + period);
            }
            decisions[i].period = period;
        }
        return decisions;
    });
}

/**
 * @param {Object} initConfig
 {
    seminarId:'',
    simulationSpan: '',
    teams: []
 }
 */
exports.init = function(initConfig){
    if(!initConfig.simulationSpan){
        throw new Error("Invalid simulationSpan");
    }

    if(!initConfig.seminarId){
        throw new Error("Invalid seminarId");
    }

    //seminar=TTT&simulation_span=3&team1=companyA&team2=companyB

    var reqUrl = config.cgiService + util.format('initialize.exe?seminar=%s&simulation_span=%s'
        , initConfig.seminarId, initConfig.simulationSpan);
    for(var i=0; i<initConfig.teams.length; i++){
        reqUrl += '&team' + (i+1) + '=' + initConfig.teams[i];
    }

    return request.get(reqUrl);
}

/**
 * @param {Object} simulationConfig
 {
    seminarId:'',
    simulationSpan: '',
    teams: [],
    period: ''
 }
 * @return {message: "run_simulation_success"}
 */
exports.runSimulation = function(simulationConfig){
    var reqUrl = config.cgiService + util.format('runsimulation.exe?seminar=%s&simulation_span=%s'
        , simulationConfig.seminarId, simulationConfig.simulationSpan);

    for(var i=0; i<simulationConfig.teams.length; i++){
        reqUrl += '&team' + (i+1) + '=' + simulationConfig.teams[i];
    }

    reqUrl += '&period=' + simulationConfig.period;

    return request.get(reqUrl);
}





