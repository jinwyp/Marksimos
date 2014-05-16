var request = require('../promises/request.js');
var util = require('util');
var url = require('url');
var config = require('../config.js');
var Q = require('q');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var allResultsConvertor = require('../convertors/allResults.js');
var allResultsCleaner = require('../convertors/allResultsCleaner.js');
var decisionModel = require('../models/decision.js');
var allResultsModel = require('../models/allResults.js');
var chartDataModel = require('../models/chartData.js');
var seminarModel = require('../models/seminar.js');

/**
 * Initialize game data
 *
 * @method init
 *
 */
exports.init = function(req, res, next) {
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return next(new Error("seminarId cannot be empty."));
    }

    // initDecision(seminar).then(function(){
    //     res.send('initialize decision success');
    // }).fail(function(err){
    //     next(err);
    // });

    initAllResult(seminarId)
    .then(function(value) {
        console.log(value);
        res.send('Got allresults');
    }).fail(function(err) {
        next(err);
    }).done();
};


/**
 * Get allResults from CGI service, remove useless data,
 * and save charts and reports to db
 * 
 * @method initAllResult
 *
 */
function initAllResult(seminarId) {
    var periods = config.initPeriods;

    //allResults contains data of several periods
    var queries = [];
    periods.forEach(function(period) {
        queries.push(initOnePeriodResult(seminarId, period));
    });

    var p = Q.all(queries)
        .then(function(results){
            var tempResults = [];
            for(var i=0; i<results.length; i++){
                //remove useless data like empty SKU, company
                allResultsCleaner.clean(results[i]);
                tempResults.push({
                    periodId: periods[i],
                    onePeriodResult: results[i]
                });
            }

            //save allResults to db, for debug purpose, we don't have to do this
            return allResultsModel.updateAllResults(seminarId, tempResults);
        })
        .then(function(results) {
            return seminarModel.getSeminarSetting(seminarId)
            .then(function(seminarSetting){
                return getExogenous(seminarSetting)
                .then(function(exogenous){
                    //generate charts from allResults
                    return extractChartData(results, {
                        seminarSetting: seminarSetting,
                        exogenous: exogenous
                    });
                })
            })
        })
        .then(function(chartData) {
            //before save new chart data, remove the existed one
            return chartDataModel.removeChartData(seminarId)
            .then(function(){
                return chartDataModel.saveChartData({
                    seminarId: seminarId,
                    charts: chartData
                });
            })
        });

    return p;
}

/**
 * Get exogenous, exogenous are some parameters of the game
 * 
 * @method getExogenous
 * @param {Object} seminarSetting {simulationVariant, targetMarket}
 *
 */
function getExogenous(seminarSetting){
    var reqUrl = url.resolve(config.cgiService,
        util.format('exogenous.exe?period=%s&simulationVariant=%s&targetMarket=%s',
            0,seminarSetting.simulationVariant, seminarSetting.targetMarket));
    return request(reqUrl);
}

/**
 * Query allResults CGI service
 * 
 * @method initOnePeriodResult
 * @param {String} seminarId
 * @param {Number} period [-3, -2, -1]
 */
function initOnePeriodResult(seminarId, period) {
    var reqUrl = config.cgiService + util.format('allresults.exe?seminar=%s&period=%s', seminarId, period);
    return request(reqUrl);
}

function extractChartData(results, settings){
    //生成chart数据
    var marketShareInValue = allResultsConvertor.marketShareInValue(results);
    var marketShareInVolume = allResultsConvertor.marketShareInVolume(results);
    var mindSpaceShare = allResultsConvertor.mindSpaceShare(results);
    var shelfSpaceShare = allResultsConvertor.shelfSpaceShare(results);

    //investment and profit
    var totalInvestment = allResultsConvertor.totalInvestment(results);
    var netProfitByCompanies = allResultsConvertor.netProfitByCompanies(results);
    var returnOnInvestment = allResultsConvertor.returnOnInvestment(results);
    var investmentsVersusBudget = allResultsConvertor.investmentsVersusBudget(results, settings.seminarSetting);
    
    //market sales and inventory
    var marketSalesValue = allResultsConvertor.marketSalesValue(results);
    var marketSalesVolume = allResultsConvertor.marketSalesVolume(results);
    var totalInventoryAtFactory = allResultsConvertor.totalInventoryAtFactory(results);
    var totalInventoryAtTrade = allResultsConvertor.totalInventoryAtTrade(results);

    //segment leaders top 5
    var segmentsLeadersByValuePriceSensitive = allResultsConvertor.segmentsLeadersByValue(results, 'priceSensitive');    
    var segmentsLeadersByValuePretenders = allResultsConvertor.segmentsLeadersByValue(results, 'pretenders');
    var segmentsLeadersByValueModerate = allResultsConvertor.segmentsLeadersByValue(results, 'moderate');
    var segmentsLeadersByValueGoodLife = allResultsConvertor.segmentsLeadersByValue(results, 'goodLife');
    var segmentsLeadersByValueUltimate = allResultsConvertor.segmentsLeadersByValue(results, 'ultimate');
    var segmentsLeadersByValuePramatic = allResultsConvertor.segmentsLeadersByValue(results, 'pramatic');

    //Market evolution
    var growthRateInVolume = allResultsConvertor.growthRateInVolume(results);
    var growthRateInValue = allResultsConvertor.growthRateInValue(results);
    var netMarketPrice = allResultsConvertor.netMarketPrice(results);
    var segmentValueShareTotalMarket = allResultsConvertor.segmentValueShareTotalMarket(results);

    var perceptionMap = allResultsConvertor.perceptionMap(results, settings.exogenous);

    var inventoryReport = allResultsConvertor.inventoryReport(results, settings.seminarSetting);

    return [
        {
            chartName: 'marketShareInValue',
            chartData: marketShareInValue
        },
        {
            chartName: 'marketShareInVolume',
            chartData: marketShareInVolume
        },
        {
            chartName: 'mindSpaceShare',
            chartData: mindSpaceShare
        },
        {
            chartName: 'shelfSpaceShare',
            chartData: shelfSpaceShare
        },
        {
            chartName: 'totalInvestment',
            chartData: totalInvestment
        },
        {
            chartName: 'netProfitByCompanies',
            chartData: netProfitByCompanies
        },
        {
            chartName: 'returnOnInvestment',
            chartData: returnOnInvestment
        },
        {
            chartName: 'investmentsVersusBudget',
            chartData: investmentsVersusBudget
        },
        {
            chartName: 'marketSalesValue',
            chartData: marketSalesValue
        },
        {
            chartName: 'marketSalesVolume',
            chartData: marketSalesVolume
        },
        {
            chartName: 'totalInventoryAtFactory',
            chartData: totalInventoryAtFactory
        },
        {
            chartName: 'totalInventoryAtTrade',
            chartData: totalInventoryAtTrade
        },
        {
            chartName: 'segmentsLeadersByValuePriceSensitive',
            chartData: segmentsLeadersByValuePriceSensitive
        },
        {
            chartName: 'segmentsLeadersByValuePretenders',
            chartData: segmentsLeadersByValuePretenders
        },
        {
            chartName: 'segmentsLeadersByValueModerate',
            chartData: segmentsLeadersByValueModerate
        },
        {
            chartName: 'segmentsLeadersByValueGoodLife',
            chartData: segmentsLeadersByValueGoodLife
        },
        {
            chartName: 'segmentsLeadersByValueUltimate',
            chartData: segmentsLeadersByValueUltimate
        },
        {
            chartName: 'segmentsLeadersByValuePramatic',
            chartData: segmentsLeadersByValuePramatic
        },
        {
            chartName: 'growthRateInVolume',
            chartData: growthRateInVolume
        },
        {
            chartName: 'growthRateInValue',
            chartData: growthRateInValue
        },
        {
            chartName: 'netMarketPrice',
            chartData: netMarketPrice
        },
        {
            chartName: 'segmentValueShareTotalMarket',
            chartData: segmentValueShareTotalMarket
        },
        {
            chartName: 'perceptionMap',
            chartData: perceptionMap
        },
        {
            chartName: 'inventoryReport',
            chartData: inventoryReport
        }
    ];
}

/**
 * Initialize decision
 *
 * @method initDecision
 * @param {Number} seminar
 * @return {Object} a promise
 */
function initDecision(seminarId) {
    var periods = config.initPeriods
    var teams = config.initTeams;

    var queries = [];
    periods.forEach(function(period) {
        teams.forEach(function(team) {
            queries.push(initOnePeriodDecison(seminarId, team, period));
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
function initOnePeriodDecison(seminarId, team, period) {
    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s&seminar=%s', period, team, seminarId);
    return request(reqUrl).then(function(result) {
        decisionCleaner.clean(result);
        return decisionModel.saveDecision(result);
    });
}