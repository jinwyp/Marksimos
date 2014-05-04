var request = require('../promises/request.js');
var util = require('util');
var config = require('../config.js');
var Q = require('q');
var decisionCleaner = require('../convertors/decision.js');
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
        queries.push(initOnePeriodAllResult(seminar, period));
    });

    var p = Q.all(queries)
    .then(function(results){
        console.log(results);
        return allResultsModel.updateAllResults(seminar, results);
    });

    return p;

    // var allResultList = [];

    // var result = initOnePeriodAllResult(seminar, periods[0]);
    // periods = periods.slice(1);
    // periods.forEach(function(period){
    //     result = result.then(function(input){
    //         allResultList.push(input);
    //         return initOnePeriodAllResult(seminar, period);
    //     })
    // });

    // result = result.then(function(input){
    //     return allResultsModel.updateAllResults(seminar, allResultList);
    // });

    // return result;
}

function initOnePeriodAllResult(seminar, period){
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
        decisionCleaner.clean(result);
        return decisionModel.saveDecision(result);
    });
}


















