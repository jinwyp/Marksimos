var request = require('../promises/request.js');
var util = require('util');
var config = require('../config.js');
var Q = require('q');
var decisionConvertor = require('../convertors/decision.js');
var allResultsConvertor = require('../convertors/allresults.js');
var decisionModel = require('../models/decision.js');
var allResultsModel = require('../models/allresults.js');

/**
 * Initialize game data
 *
 * @method init
 * 
 */
exports.init = function(req, res, next){
    var seminar = req.session.seminar;

    // initDecision(seminar).then(function(){
    //     res.send('initialize decision success');
    // }).fail(function(err){
    //     next(err);
    // });

    initAllResult(seminar).then(function(){
        res.send('Got allresults');
    }).fail(function(err){
        next(err);
    }).done();
};



function initAllResult(seminar){
    var periods = config.initPeriods;

    var queries = [];
    periods.forEach(function(period){
        queries.push(initOnePeriodResult(seminar, period));
    });

    var p = Q.all(queries)
    .then(function(results){
        results.forEach(function(onePeriodResult){
            allResultsConvertor.clean(onePeriodResult);
        })

        var marketShareInValueChart = allResultsConvertor.marketShareInValue(results);
        console.log(marketShareInValueChart);
        return allResultsModel.updateAllResults(seminar, results);
    });

    return p;
}

function initOnePeriodResult(seminar, period){
    var reqUrl = config.cgiService 
        + util.format('allresults.exe?seminar=%s&period=%s', seminar, period);

    return request(reqUrl);
}

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
    var reqUrl = config.cgiService 
        + util.format('decisions.exe?period=%s&team=%s&seminar=%s'
        , period, team, seminar);
    return request(reqUrl).then(function(result){
        decisionConvertor.clean(result);
        return decisionModel.saveDecision(result);
    });
}


















