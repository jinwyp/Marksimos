var request = require('../promises/request.js');
var util = require('util');
var url = require('url');
var config = require('../config.js');
var Q = require('q');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var allResultsConvertor = require('../convertors/allResults.js');
var allResultsCleaner = require('../convertors/allResultsCleaner.js');
var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var seminarModel = require('../models/seminar.js');
var cgiapi = require('../cgiapi.js');

/**
 * Initialize game data, only certain perople can call this method
 *
 * @method init
 *
 */
exports.init = function(req, res, next) {
    var seminarId = 'TTT'; //this parameter should be posted from client
    var simulationSpan = 6; //should be posted from client

    if(!seminarId){
        return next(new Error("seminarId cannot be empty."));
    }

    Q.all([
        removeExistedDecisions(seminarId),
        seminarModel.remove(seminarId)
    ])
    .then(function(){
        return seminarModel.insert(seminarId, {
            seminarId: seminarId,
            simulationSpan: simulationSpan,
            allResults: [],
            productPortfolio: [],
            charts: [],
            reports: []
        });
    })
    .then(function(){
        return Q.all([
            queryAllResults(seminarId),
            queryAllDecision(seminarId)
        ])
    })
    .spread(function(allResults, allDecisions){
        cleanAllResults(allResults);

        //this function modify allDecisions directly
        cleanDecisions(allDecisions);

        return Q.all([
            //save allResult data
            seminarModel.update(seminarId, {allResults: allResults}),
            initChartData(seminarId, allResults),
            initDecision(seminarId, allDecisions)
        ]);
    })
    .then(function(){
        res.send('initialize success');
    })
    .fail(function(err){
        next(err);
    }).done();
};


/**
 * Split allDecisions into companyDecision, brandDecison, and SKUDecision,
 * then save them to db
 *
 */
function initDecision(seminarId, allDecisions){
    allDecisions.forEach(function(decision){
        return Q.all([
            initCompanyDecision(decision, seminarId, decision.period),
            initBrandDecision(decision, seminarId, decision.period),
            initSKUDecision(decision, seminarId, decision.period)
        ])
    })
}

function initCompanyDecision(decision, seminarId, period){
    var companyDecision = getCompanyDecision(decision);
    companyDecision.seminarId = seminarId;
    companyDecision.period = period;

    return companyDecisionModel.save(companyDecision);
}

function initBrandDecision(decision, seminarId, period){
    var brandDecisions = getBrandDecisions(decision);

    var d = Q();
    brandDecisions.forEach(function(brandDecision){
        brandDecision.seminarId = seminarId;
        brandDecision.period = period;
        d = d.then(function(){
            return brandDecisionModel.save(brandDecision)
        });
    });
    return d;
}

function initSKUDecision(decision, seminarId, period){
    var SKUDecisions = getSKUDecisions(decision);

    var d = Q();
    SKUDecisions.forEach(function(SKUDecision){
        SKUDecision.seminarId = seminarId;
        SKUDecision.period = period;
        d = d.then(function(){
            return SKUDecisionModel.save(SKUDecision)
        })
    });
    
    return d;
}

/**
 * Convert decision to a companyDecision object which can be saved to db
 *
 * @param {Object} decision decision got from CGI service
 */
function getCompanyDecision(decision){
    var brandIds = decision.d_BrandsDecisions.map(function(brand){
        return brand.d_BrandID;
    });

    return {
        d_CID                        : decision.d_CID,
        d_CompanyName                : decision.d_CompanyName,
        d_BrandsDecisions            : brandIds,
        d_IsAdditionalBudgetAccepted : decision.d_IsAdditionalBudgetAccepted,
        d_RequestedAdditionalBudget  : decision.d_RequestedAdditionalBudget,
        d_InvestmentInEfficiency     : decision.d_InvestmentInEfficiency,
        d_InvestmentInTechnology     : decision.d_InvestmentInTechnology,
        d_InvestmentInServicing      : decision.d_InvestmentInServicing
    }
}

/**
 * Convert decision to an array of brandDecision objects which can be saved to db
 *
 * @param {Object} decision decision got from CGI service
 */
function getBrandDecisions(decision){
    var results = [];

    for(var i=0; i<decision.d_BrandsDecisions.length; i++){
        var brandDecision = decision.d_BrandsDecisions[i];
        var SKUIDs = brandDecision.d_SKUsDecisions.map(function(SKUDecision){
            return SKUDecision.d_SKUID;
        })
        results.push({
            d_CID: decision.d_CID,
            d_BrandID       : brandDecision.d_BrandID,
            d_BrandName     : brandDecision.d_BrandName,
            d_SalesForce    : brandDecision.d_SalesForce,
            d_SKUsDecisions : SKUIDs

        });
    }

    return results;
}

/**
 * Convert decision to an array of SKUDecision objects which can be saved to db
 *
 * @param {Object} decision decision got from CGI service
 */
function getSKUDecisions(decision){
    var results = [];

    for(var i=0; i<decision.d_BrandsDecisions.length; i++){
        var brandDecision = decision.d_BrandsDecisions[i];
        for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
            var SKUDecision = brandDecision.d_SKUsDecisions[j];
            results.push({
                d_CID: decision.d_CID,
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

function cleanDecisions(allDecisions){
    allDecisions.forEach(function(decision){
        decisionCleaner.clean(decision);
    })
}

function cleanAllResults(allResults){
    allResults.forEach(function(onePeriodResult){
        //remove useless data like empty SKU, company
        allResultsCleaner.clean(onePeriodResult);
    })
}

/**
 * @param {Object} allResults allResults of all periods
 */
function initChartData(seminarId, allResults){
    var period = allResults[allResults.length-1].periodId;
    return Q.all([
        seminarModel.findOne(seminarId),
        //get exogenous of period:0, FMCG and GENERIC market
        cgiapi.getExogenous(period)
    ])
    .spread(function(seminar, exogenous){
        //generate charts from allResults
        var chartData =  extractChartData(allResults, {
            simulationSpan: seminar.simulationSpan,
            exogenous: exogenous
        });

        return seminarModel.update(seminarId, {charts: chartData})
    });
}

function removeExistedDecisions(seminarId){
    return Q.all([
            companyDecisionModel.remove(seminarId),
            brandDecisionModel.remove(seminarId),
            SKUDecisionModel.remove(seminarId)
        ]);
}

function queryAllResults(seminarId){
    var periods = config.initPeriods;

    //allResults contains data of several periods
    var queries = [];
    periods.forEach(function(period) {
        queries.push(queryOnePeriodResult(seminarId, period));
    });

    return Q.all(queries)
    .then(function(allResults){
        for(var i=0; i<allResults.length; i++){
            allResults[i].periodId = periods[i];
        }
        return allResults;
    });
}

function queryAllDecision(seminarId){
    var periods = config.initPeriods

    var queries = [];
    periods.forEach(function(period) {
        queries.push(queryDecisionsInOnePeriod(seminarId, period));
    });

    return Q.all(queries)
    .then(function(decisions){
        //decisions: [[decision1, decision2], [decision3, decision4]]
        //tempDecisions: [decisoon1, decison2, decision3, decision4]
        var tempDecisions = [];
        decisions.forEach(function(a){
            a.forEach(function(b){
                tempDecisions.push(b);
            })
        })
        return tempDecisions;
    });
}

/**
 * Query all decisions in one period
 */
function queryDecisionsInOnePeriod(seminarId, period){
    var companies = config.initCompanies;

    var queries = [];

    companies.forEach(function(company) {
        queries.push(queryOneDecision(seminarId, company, period));
    })

    return Q.all(queries)
    .then(function(decisions){
        for(var i=0; i<decisions.length; i++){
            decisions[i].period = period;
        }
        return decisions;
    });
}

/**
 * Query allResults CGI service
 * 
 * @method queryOnePeriodResult
 * @param {String} seminarId
 * @param {Number} period [-3, -2, -1]
 */
function queryOnePeriodResult(seminarId, period) {
    var reqUrl = config.cgiService + util.format('allresults.exe?seminar=%s&period=%s', seminarId, period);
    return request.get(reqUrl);
}

function queryOneDecision(seminarId, team, period){
    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=%s&seminar=%s', period, team, seminarId);
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
    var investmentsVersusBudget = allResultsConvertor.investmentsVersusBudget(results, settings.simulationSpan);
    
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

    var inventoryReport = allResultsConvertor.inventoryReport(results);

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


































