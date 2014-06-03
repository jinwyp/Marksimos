var request = require('../promises/request.js');
var util = require('util');
var url = require('url');
var config = require('../config.js');
var Q = require('q');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var allResultsConvertor = require('../convertors/allResults.js');
var allResultsCleaner = require('../convertors/allResultsCleaner.js');
var decisionModel = require('../models/decision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
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

    initDecision(seminarId)
    .then(function(){
        return initAllResult(seminarId);
    })
    .then(function(){
        res.send('initialize success');
    })
    .fail(function(err){
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
    return request.get(reqUrl);
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
    return request.get(reqUrl);
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
    var segmentsLeadersByValuePragmatic = allResultsConvertor.segmentsLeadersByValue(results, 'pragmatic');

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
            chartName: 'segmentsLeadersByValuePragmatic',
            chartData: segmentsLeadersByValuePragmatic
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

    var d = removeExistedData(seminarId);
    d = d.then(function(){
        var queries = [];
        periods.forEach(function(period) {
            teams.forEach(function(team) {
                queries.push(initOnePeriodDecison(seminarId, team, period));
            })
        });
        return Q.all(queries);
    });

    return d;

    function removeExistedData(seminarId){
        return Q.all([
                decisionModel.remove(seminarId),
                brandDecisionModel.remove(seminarId),
                SKUDecisionModel.remove(seminarId)
            ]);
    }
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
    return request.get(reqUrl).then(function(result) {
        decisionCleaner.clean(result);

        var decision = getDecision(result);
        decision.seminarId = seminarId;
        decision.period = period;

        var d = decisionModel.save(decision);

        var brandDecisions = getBrandDecisions(result);

        brandDecisions.forEach(function(brandDecision){
            brandDecision.seminarId = seminarId;
            brandDecision.period = period;
            d = d.then(function(){
                return brandDecisionModel.save(brandDecision)
            });
        });

        var SKUDecisions = getSKUDecisions(result);
        SKUDecisions.forEach(function(SKUDecision){
            SKUDecision.seminarId = seminarId;
            SKUDecision.period = period;
            d = d.then(function(){
                return SKUDecisionModel.save(SKUDecision)
            })
        });
        
        return d;
    });

    /**
     * Convert onePeriodResult to a decision object which can be saved to db
     * @param {Object} onePeriodResult decision of one company in one period
     */
    function getDecision(onePeriodResult){
        var brandIds = onePeriodResult.d_BrandsDecisions.map(function(brand){
            return brand.d_BrandID;
        });

        return {
            d_CID                        : onePeriodResult.d_CID,
            d_CompanyName                : onePeriodResult.d_CompanyName,
            d_BrandsDecisions            : brandIds,
            d_IsAdditionalBudgetAccepted : onePeriodResult.d_IsAdditionalBudgetAccepted,
            d_RequestedAdditionalBudget  : onePeriodResult.d_RequestedAdditionalBudget,
            d_InvestmentInEfficiency     : onePeriodResult.d_InvestmentInEfficiency,
            d_InvestmentInTechnology     : onePeriodResult.d_InvestmentInTechnology,
            d_InvestmentInServicing      : onePeriodResult.d_InvestmentInServicing
        }
    }

    /**
     * Convert onePeriodResult to an array of brandDecision objects which can be saved to db
     * @param {Object} onePeriodResult decision of one company in one period
     */
    function getBrandDecisions(onePeriodResult){
        var results = [];

        for(var i=0; i<onePeriodResult.d_BrandsDecisions.length; i++){
            var brandDecision = onePeriodResult.d_BrandsDecisions[i];
            var SKUIDs = brandDecision.d_SKUsDecisions.map(function(SKUDecision){
                return SKUDecision.d_SKUID;
            })
            results.push({
                d_CID: onePeriodResult.d_CID,
                d_BrandID       : brandDecision.d_BrandID,
                d_BrandName     : brandDecision.d_BrandName,
                d_SalesForce    : brandDecision.d_SalesForce,
                d_SKUsDecisions : SKUIDs
            });
        }

        return results;
    }

    /**
     * Convert onePeriodResult to an array of SKUDecision objects which can be saved to db
     * @param {Object} onePeriodResult decision of one company in one period
     */
    function getSKUDecisions(onePeriodResult){
        var results = [];

        for(var i=0; i<onePeriodResult.d_BrandsDecisions.length; i++){
            var brandDecision = onePeriodResult.d_BrandsDecisions[i];
            for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
                var SKUDecision = brandDecision.d_SKUsDecisions[j];
                results.push({
                    d_CID: onePeriodResult.d_CID,
                    d_BrandID: brandDecision.d_BrandID,
                    d_SKUID: SKUDecision.d_SKUID,
                    d_SKUName: SKUDecision.d_SKUName,
                    d_Advertising: SKUDecision.d_Advertising,
                    d_AdditionalTradeMargin: SKUDecision.d_AdditionalTradeMargin,
                    d_FactoryPrice: SKUDecision.d_FactoryPrice,
                    d_ConsumerPrice: SKUDecision.d_ConsumerPrice,
                    d_RepriceFactoryStocks: SKUDecision.d_RepriceFactoryStocks,
                    d_IngredientsQuality: SKUDecision.d_IngredientsQuality,
                    d_PackSize: SKUDecision.d_PackSize,
                    d_ProductionVolume: SKUDecision.d_ProductionVolume,
                    d_PromotionalBudget: SKUDecision.d_PromotionalBudget,

                    d_PromotionalEpisodes: SKUDecision.d_PromotionalEpisodes,
                    d_TargetConsumerSegment: SKUDecision.d_TargetConsumerSegment,
                    d_Technology: SKUDecision.d_Technology,
                    d_ToDrop: SKUDecision.d_ToDrop,
                    d_TradeExpenses: SKUDecision.d_TradeExpenses,
                    d_WholesalesBonusMinVolume: SKUDecision.d_WholesalesBonusMinVolume,
                    d_WholesalesBonusRate: SKUDecision.d_WholesalesBonusRate,
                    d_WarrantyLength: SKUDecision.d_WarrantyLength,
                })
            }
        }

        return results;
    }
}



































