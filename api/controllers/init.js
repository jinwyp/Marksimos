var request = require('../promises/request.js');
var util = require('util');
var url = require('url');
var config = require('../config.js');
var Q = require('q');

var decisionCleaner = require('../convertors/decisionCleaner.js');
var allResultsCleaner = require('../convertors/allResultsCleaner.js');

var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var seminarModel = require('../models/seminar.js');
var reportModel = require('../models/report.js');
var simulationResultModel = require('../models/simulationResult.js');
var chartModel = require('../models/chart.js');
var dbutility = require('../models/dbutility.js');

var cgiapi = require('../cgiapi.js');

var decisionAssembler = require('../dataAssemblers/decision.js');
var companyStatusReportAssembler = require('../dataAssemblers/companyStatusReport.js');
var financialReportAssembler = require('../dataAssemblers/financialReport.js');
var profitabilityEvolutionReportAssembler = require('../dataAssemblers/profitabilityEvolutionReport.js');
var segmentDistributionReportAssembler = require('../dataAssemblers/segmentDistributionReport.js');
var competitorIntelligenceReportAssembler = require('../dataAssemblers/competitorIntelligence.js');
var marketTrendsReportAssembler = require('../dataAssemblers/marketTrendsReport.js');
var chartAssembler = require('../dataAssemblers/chart.js');


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

    initBinaryFile(seminarId)
    .then(function(initResult){
        if(initResult === 'init_success'){
            return res.send({message: 'init binary file failed.'});
        }
        Q.all([
            simulationResultModel.removeAll(seminarId),
            dbutility.removeExistedDecisions(seminarId),
            seminarModel.remove(seminarId),
            chartModel.remove(seminarId),
            reportModel.remove(seminarId)
        ])
    })
    .then(function(){
        //insert empty data into mongo, so that we can update them
        return Q.all([
            //add a new seminar
            seminarModel.insert(seminarId, {
                seminarId: seminarId,
                simulation_span: simulationSpan
            })
        ]);
    })
    .then(function(){
        return Q.all([
            initSimulationResult(seminarId),
            initDecision(seminarId)
        ])
    })
    .then(function(){
        return Q.all([
            simulationResultModel.findAll(seminarId)
        ])
        .spread(function(allResults){
            return Q.all([
                initChartData(seminarId, allResults),
                
                initCompanyStatusReport(seminarId, allResults),
                initFinancialReport(seminarId, allResults),
                initProfitabilityEvolutionReport(seminarId, allResults),
                initSegmentDistributionReport(seminarId, allResults),
                initCompetitorIntelligenceReport(seminarId, allResults),
                initMarketTrendsReport(seminarId, allResults)
            ]);
        });
    })
    .then(function(){
        //when init is called, current period is 1
        return dbutility.insertEmptyDecision(seminarId, 1);
    })
    .then(function(){
        res.send({message: 'initialize success'});
    })
    .fail(function(err){
        next(err);
    })
    .done();
};

function initBinaryFile(seminarId){
    var simulation_span = 4;

    return cgiapi.init({
        seminarId: seminarId,
        simulation_span: simulation_span,
        teams: ['companyA', 'companyB']
    });
}


function initDecision(seminarId){
    var periods = config.initPeriods

    var queries = [];
    periods.forEach(function(period) {
        queries.push(cgiapi.queryDecisionsInOnePeriod(seminarId, period));
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

        //this function modify allDecisions directly
        cleanDecisions(tempDecisions);

        return dbutility.saveDecision(seminarId, tempDecisions);
    });
}

function cleanDecisions(allDecisions){
    allDecisions.forEach(function(decision){
        decisionCleaner.clean(decision);
    })
}

/**
 * @param {Object} allResults allResults of all periods
 */
function initChartData(seminarId, allResults){
    var period = allResults[allResults.length-1].period;

    return Q.all([
        seminarModel.findOne(seminarId),
        //get exogenous of period:0, FMCG and GENERIC market
        cgiapi.getExogenous(period)
    ])
    .spread(function(seminar, exogenous){
        //generate charts from allResults
        var chartData = chartAssembler.extractChartData(allResults, {
            simulationSpan: seminar.simulationSpan,
            exogenous: exogenous
        });

        return chartModel.insert({
            seminarId: seminarId,
            charts: chartData
        })
    });
}


function initSimulationResult(seminarId){
    var periods = config.initPeriods;

    //allResults contains data of several periods
    var queries = [];
    periods.forEach(function(period) {
        queries.push(cgiapi.queryOnePeriodResult(seminarId, period));
    });

    return Q.all(queries)
    .then(function(allResults){
        cleanAllResults(allResults);

        var saveOperations = []
        for(var i=0; i<allResults.length; i++){
            allResults[i].seminarId = seminarId;
            allResults[i].period = periods[i];
            saveOperations.push(simulationResultModel.insert(allResults[i]))
        }
        return Q.all(saveOperations);
    });
}

function cleanAllResults(allResults){
    allResults.forEach(function(onePeriodResult){
        //remove useless data like empty SKU, company
        allResultsCleaner.clean(onePeriodResult);
    })
}

function initCompanyStatusReport(seminarId, allResults){
    var queries = [];
    allResults.forEach(function(onePeriodResult){
        queries.push(cgiapi.getExogenous(onePeriodResult.period));
    })
    return Q.all(queries)
    .then(function(allExogenous){
        return reportModel.insert({
            seminarId: seminarId,
            reportName: "company_status",
            reportData: companyStatusReportAssembler.getCompanyStatusReport(allResults, allExogenous)
        })
    });
};

function initFinancialReport(seminarId, allResults){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: "financial_report",
        reportData: financialReportAssembler.getFinancialReport(allResults)
    })
}

function initProfitabilityEvolutionReport(seminarId, allResults){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: "profitability_evolution",
        reportData: profitabilityEvolutionReportAssembler.getProfitabilityEvolutionReport(allResults)
    })
}

function initSegmentDistributionReport(seminarId, allResults){
    var queries = [];
    allResults.forEach(function(onePeriodResult){
        queries.push(cgiapi.getExogenous(onePeriodResult.period));
    })
    return Q.all(queries)
    .then(function(allExogenous){
        return reportModel.insert({
            seminarId: seminarId,
            reportName: "segment_distribution",
            reportData: segmentDistributionReportAssembler.getSegmentDistributionReport(allResults, allExogenous)
        })
    });
}

function initCompetitorIntelligenceReport(seminarId, allResults){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: 'competitor_intelligence',
        reportData: competitorIntelligenceReportAssembler.getCompetitorIntelligenceReport(allResults)
    })
}

function initMarketTrendsReport(seminarId, allResults){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: 'market_trends',
        reportData: marketTrendsReportAssembler.getMarketTrendsReport(allResults)
    })
}







































