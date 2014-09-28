var request = require('../promises/request.js');
var util = require('util');
var url = require('url');
var config = require('../../common/config.js');
var utility = require('../../common/utility.js');
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
var marketIndicatorsReportAssembler = require('../dataAssemblers/marketIndicatorsReport.js');
var chartAssembler = require('../dataAssemblers/chart.js');

var decisionConvertor = require('../convertors/decision.js');

var logger = require('../../common/logger.js');


var consts = require('../consts.js');

var sessionOperation = require('../../common/sessionOperation.js');
var _ = require('underscore');


/**
 * Initialize game data, only certain perople can call this method
 *
 * @method init
 *
 */
exports.init = function(req, res, next) {
    var status;

    return function(req, res, next){        
        if(status == 'pending'){
            return res.send(400, {message: "Last request is still pending, please wait for runSimulation process complete..."})
        } else {
            status = 'pending';
            //var seminarId = 'TTT'; //this parameter should be posted from client
            var seminarId = req.body.seminar_id;
            var simulationSpan; //should be posted from client
            var companyNum;
            var currentPeriod;

            var companies = [];
            var periods = [];

            if(!seminarId){
                status = 'active';
                return next(new Error("seminarId cannot be empty."));
            }

            seminarModel.findOne({seminarId: seminarId})
            .then(function(dbSeminar){
                if(!dbSeminar){
                    status = 'active';
                    throw {message: "seminar doesn't exist."}
                }

                if(dbSeminar.currentPeriod !== consts.Period_0 + 1){
                    status = 'active';
                    throw {message: "initialize a seminar that alreay starts."}
                }

                //before init, a new seminar should be created,
                //and it's currentPeriod should be set correctly = 1
                currentPeriod = dbSeminar.currentPeriod;
                sessionOperation.setCurrentPeriod(req, dbSeminar.currentPeriod);

                //create periods array
                periods.push(-3);
                periods.push(-2);
                periods.push(-1);
                periods.push(0);        

                //create company array
                companies = utility.createCompanyArray(dbSeminar.companyNum);

                simulationSpan = dbSeminar.simulationSpan;
                companyNum = dbSeminar.companyNum;

                return initBinaryFile(seminarId, simulationSpan, companies);
                //return initBinaryFile('TTT', 3);
            })
            .then(function(initResult){
                if(initResult.message !== 'init_success'){
                    status = 'active';
                    return res.send(403, {message: 'init binary file failed. initResult = ' + initResult.message});
                }

                return Q.all([
                    simulationResultModel.removeAll(seminarId),
                    dbutility.removeExistedDecisions(seminarId),
                    chartModel.remove(seminarId),
                    reportModel.remove(seminarId)
                ])
                .then(function(){
                    return Q.all([
                        initSimulationResult(seminarId, periods),
                        initDecision(seminarId, periods, companyNum)
                    ])
                })
                .then(function(){
                    return Q.all([
                        simulationResultModel.findAll(seminarId)
                    ])
                    .spread(function(allResults){
                        return Q.all([
                            initChartData(seminarId, allResults),
                            
                            initCompanyStatusReport(seminarId, allResults, 0),
                            initFinancialReport(seminarId, allResults),
                            initProfitabilityEvolutionReport(seminarId, allResults, 0),
                            initSegmentDistributionReport(seminarId, allResults),
                            initCompetitorIntelligenceReport(seminarId, allResults),
                            initMarketTrendsReport(seminarId, allResults, 0),
                            initMarketIndicatorReport(seminarId, currentPeriod)
                        ]);
                    });
                })
                .then(function(){
                    //copy decision of period (currentPeriod - 1 = 0)
                    return duplicateLastPeriodDecision(seminarId, currentPeriod - 1);
                    
                })
                .then(function(){
                    return seminarModel.update({seminarId: seminarId}, {
                        isInitialized: true
                    })
                })
                .then(function(numAffected){
                    status = 'active';
                    if(numAffected!==1){
                        throw {message: "there's error during set isInitialized to true."};
                    }
                    res.send(200, {message: 'initialize success'});
                }).done();
            })
            .fail(function(err){
                status = 'active';
                logger.error(err);
                res.send(500, {message: err.message})
            })
            .done();            
        }        

    }
};

/**
* Write decision to binary file
* Run simulation
* Fetch current period allresults and save it to db
* Generate current period reports and charts
* Generate new period decision 
*/
exports.runSimulation = function(){
    var status;

    return function(req, res, next){
        if(status == 'pending'){
            return res.send(400, {message: "Last request is still pending, please wait for runSimulation process complete..."})
        } else {
            status = 'pending';
            var seminarId = req.body.seminar_id;

            if(!seminarId){
                status = 'active';
                return res.send(400, {message: "You have not choose a seminar."})
            }

            var currentPeriod = sessionOperation.getCurrentPeriod(req);

            //check if this seminar exists
            seminarModel.findOne({
                seminarId: seminarId
            })
            .then(function(dbSeminar){
                if(!dbSeminar){
                     status = 'active';
                    throw {message: "seminar doesn't exist."};
                }

                if(!dbSeminar.isInitialized){
                     status = 'active';
                    throw {httpStatus: 400, message: "you have not initialized this seminar."}
                }

                //if all rounds are executed
                if(dbSeminar.isSimulationFinised){
                     status = 'active';
                    throw {httpStatus: 400, message: "the last round simulation has been executed."}
                }

                var companies = [];
                for(var i=0; i<dbSeminar.companyNum; i++){
                    companies.push(i+1);
                }

                //write decision to binary file
                return submitDecisionForAllCompany(companies, currentPeriod, seminarId)
                    .then(function(){
                        console.log('write decision finished.');
                        // if(submitDecisionResult.message!=='submit_decision_success'){
                        //     throw {message: submitDecisionResult.message};
                        // }

                        //run simulation
                        return cgiapi.runSimulation({
                            seminarId: seminarId,
                            simulationSpan: dbSeminar.simulationSpan,
                            teams: utility.createCompanyArray(dbSeminar.companyNum),
                            period: currentPeriod
                        })
                        .then(function(simulationResult){
                            console.log('run simulation finished.');
                            if(simulationResult.message !== 'run_simulation_success'){
                                 status = 'active';
                                throw {message: simulationResult.message};
                            }

                            return Q.all[removeCurrentPeriodSimulationResult(seminarId, currentPeriod)
                                        , chartModel.remove(seminarId)
                                        , reportModel.remove(seminarId)
                                    ];
                        })
                        .then(function(){
                            console.log('get current period simulation result finished.');
                            //once removeCurrentPeriodSimulationResult success, 
                            //query and save the current period simulation result
                            return initCurrentPeriodSimulationResult(seminarId, currentPeriod);
                        })
                        .then(function(){
                            return Q.all([
                                simulationResultModel.findAll(seminarId)
                            ])
                            .spread(function(allResults){
                                return Q.all([
                                    initChartData(seminarId, allResults),
                                    
                                    initCompanyStatusReport(seminarId, allResults, currentPeriod),
                                    initFinancialReport(seminarId, allResults),
                                    initProfitabilityEvolutionReport(seminarId, allResults, currentPeriod),
                                    initSegmentDistributionReport(seminarId, allResults),
                                    initCompetitorIntelligenceReport(seminarId, allResults),
                                    initMarketTrendsReport(seminarId, allResults, currentPeriod),
                                    initMarketIndicatorReport(seminarId, currentPeriod)
                                ]);
                            });
                        })
                        .then(function(){
                            console.log('generate report/chart finished.');
                            //for the last period, we don't create the next period decision automatically
                            if(dbSeminar.currentPeriod < dbSeminar.simulationSpan){
                                return createNewDecisionBasedOnLastPeriodDecision(seminarId, currentPeriod);
                            }else{
                                 status = 'active';
                                return undefined;
                            }
                        })
                        .then(function(){
                            console.log('create duplicate decision from last period finished.');
                            if(dbSeminar.currentPeriod < dbSeminar.simulationSpan){
                                //after simulation success, set currentPeriod to next period
                                sessionOperation.setCurrentPeriod(req, sessionOperation.getCurrentPeriod(req)+1);

                                return seminarModel.update({seminarId: seminarId}, {
                                    currentPeriod: dbSeminar.currentPeriod + 1
                                })
                                .then(function(numAffected){
                                    if(numAffected!==1){
                                        throw {message: "there's error during update seminar."}
                                    }else{
                                         status = 'active';
                                        return undefined;
                                    }
                                })
                            }else{
                                return seminarModel.update({seminarId: seminarId}, {
                                    isSimulationFinised: true
                                }).then(function(numAffected){
                                    if(numAffected!==1){
                                        throw {message: "there's error during update isSimulationFinised to true."}
                                    }else{
                                         status = 'active';
                                        return undefined;
                                    }
                                });
                            }
                        })
                    });
            })
            .then(function(){
                 status = 'active';
                return res.send({message: "run simulation success."});
            })
            .fail(function(err){
                 status = 'active';
                if(err.httpStatus){
                    return res.send(err.httpStatus, {message: err.message});
                }
                logger.error(err);
                res.send(500, {message: err.message})
            })
            .done();            
        }

    }


};

function initCurrentPeriodSimulationResult(seminarId, currentPeriod){
    return cgiapi.queryOnePeriodResult(seminarId, currentPeriod)
    .then(function(currentPeriodResult){
        if(currentPeriodResult && currentPeriodResult.message){
            throw currentPeriodResult;
        }

        allResultsCleaner.clean(currentPeriodResult);

        currentPeriodResult.seminarId = seminarId;
        currentPeriodResult.period = currentPeriod;

        return simulationResultModel.insert(currentPeriodResult);
    })
}

function removeCurrentPeriodSimulationResult(seminarId, currentPeriod){
    return simulationResultModel.remove({
        seminarId: seminarId,
        period: currentPeriod
    });
}

function submitDecisionForAllCompany(companies, period, seminarId){
    var p = Q();

    companies.forEach(function(companyId){
        p = p.then(function(){
            console.log("submit decision finished.");
            return submitDecision(companyId, period, seminarId)
        })
    });

    return p;
}

function submitDecision(companyId, period, seminarId){
    var result = {};
    console.log('companyId:' + companyId + ', period:' + period + ', seminarId:' + seminarId);
    return companyDecisionModel.findOne(seminarId, period, companyId)
    .then(function(decision){
        if(!decision){
            throw new Error("decision doesn't exist.");
        }

        result.d_CID = decision.d_CID;
        result.d_CompanyName = decision.d_CompanyName;
        result.d_BrandsDecisions = [];
        result.d_IsAdditionalBudgetAccepted = decision.d_IsAdditionalBudgetAccepted;
        result.d_RequestedAdditionalBudget = decision.d_RequestedAdditionalBudget;
        result.d_InvestmentInEfficiency = decision.d_InvestmentInEfficiency;
        result.d_InvestmentInTechnology = decision.d_InvestmentInTechnology;
        result.d_InvestmentInServicing = decision.d_InvestmentInServicing;

        return brandDecisionModel.findAllInCompany(seminarId, period, companyId)
                .then(function(brandDecisions){
                    var p2 = Q();
                    brandDecisions.forEach(function(brandDecision){
                        var tempBrandDecision = {};
                        tempBrandDecision.d_BrandID = brandDecision.d_BrandID;
                        tempBrandDecision.d_BrandName = brandDecision.d_BrandName;
                        tempBrandDecision.d_SalesForce = brandDecision.d_SalesForce;
                        tempBrandDecision.d_SKUsDecisions = [];

                        p2 = p2.then(function(){
                            return SKUDecisionModel.findAllInBrand(seminarId, period, companyId, brandDecision.d_BrandID);
                        }).then(function(SKUDecisions){
                            SKUDecisions.forEach(function(SKUDecision){
                                var tempSKUDecision = {};
                                tempSKUDecision.d_SKUID = SKUDecision.d_SKUID;
                                tempSKUDecision.d_SKUName = SKUDecision.d_SKUName;
                                tempSKUDecision.d_Advertising = SKUDecision.d_Advertising;
                                tempSKUDecision.d_AdditionalTradeMargin = SKUDecision.d_AdditionalTradeMargin;
                                tempSKUDecision.d_FactoryPrice = SKUDecision.d_FactoryPrice;
                                tempSKUDecision.d_ConsumerPrice = SKUDecision.d_ConsumerPrice;
                                tempSKUDecision.d_RepriceFactoryStocks = SKUDecision.d_RepriceFactoryStocks;
                                tempSKUDecision.d_IngredientsQuality = SKUDecision.d_IngredientsQuality;
                                tempSKUDecision.d_PackSize = SKUDecision.d_PackSize;
                                tempSKUDecision.d_ProductionVolume = SKUDecision.d_ProductionVolume;
                                tempSKUDecision.d_PromotionalBudget = SKUDecision.d_PromotionalBudget;
                                tempSKUDecision.d_PromotionalEpisodes = SKUDecision.d_PromotionalEpisodes;
                                tempSKUDecision.d_TargetConsumerSegment = SKUDecision.d_TargetConsumerSegment;
                                tempSKUDecision.d_Technology = SKUDecision.d_Technology;
                                tempSKUDecision.d_ToDrop = SKUDecision.d_ToDrop;
                                tempSKUDecision.d_TradeExpenses = SKUDecision.d_TradeExpenses;
                                tempSKUDecision.d_WholesalesBonusMinVolume = SKUDecision.d_WholesalesBonusMinVolume;
                                tempSKUDecision.d_WholesalesBonusRate = SKUDecision.d_WholesalesBonusRate;
                                tempSKUDecision.d_WarrantyLength = SKUDecision.d_WarrantyLength;
                                tempBrandDecision.d_SKUsDecisions.push(tempSKUDecision);
                            })
                            result.d_BrandsDecisions.push(tempBrandDecision);
                        })
                    })
                    return p2;
                })
    })
    .then(function(){
        if(Object.keys(result).length===0){
            return res.send(500, {message: "fail to get decisions"})
        }

        insertEmptyBrandsAndSKUs(result);
        //convert result to data format that can be accepted by CGI service
        decisionConvertor.convert(result);

        //return res.send(result);
        //return result;
        var reqUrl = url.resolve(config.cgiService, '/cgi-bin/decisions.exe');
        return request.post(reqUrl, {
            decision: JSON.stringify(result),
            seminarId: seminarId,
            period: period,
            team: companyId
        })
    });


    /**
     * CGI service can not convert JSON string to delphi object,
     * if the number of SKUs or brnads is not the same as
     * the length of correspond array in delphi data structure.
     *
     * @method insertEmptyBrands
     */
    function insertEmptyBrandsAndSKUs(decision){
        for(var i=0; i< decision.d_BrandsDecisions.length; i++){
            var brand = decision.d_BrandsDecisions[i];
            var numOfSKUToInsert = 5 - brand.d_SKUsDecisions.length;
            for(var j=0; j<numOfSKUToInsert; j++){
                var emptySKU = JSON.parse(JSON.stringify(brand.d_SKUsDecisions[0]));
                emptySKU.d_SKUID = 0;
                emptySKU.d_SKUName = '\u0000\u0000\u0000';

                brand.d_SKUsDecisions.push(emptySKU);
            }
        }

        var numOfBrandToInsert = 5 - decision.d_BrandsDecisions.length;
        for(var k=0; k<numOfBrandToInsert; k++){
            var emptyBrand = JSON.parse(JSON.stringify(decision.d_BrandsDecisions[0]));
            for(var p=0; p<emptyBrand.d_SKUsDecisions.length; p++){
                emptyBrand.d_SKUsDecisions[p].d_SKUID = 0;
                emptyBrand.d_SKUsDecisions[p].d_SKUName = '\u0000\u0000\u0000';
            }
            emptyBrand.d_BrandID = 0;
            emptyBrand.d_BrandName = '\u0000\u0000\u0000\u0000\u0000\u0000';
            decision.d_BrandsDecisions.push(emptyBrand);
        }
    }
}


function initBinaryFile(seminarId, simulation_span, companies){
    return cgiapi.init({
        seminarId: seminarId,
        simulationSpan: simulation_span,
        teams: companies
    });
}

/**
* @param {Array} periods array of periods
*/
function initDecision(seminarId, periods, companyNum){
    var queries = [];
    periods.forEach(function(period) {
        queries.push(cgiapi.queryDecisionsInOnePeriod(seminarId, period, companyNum));
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
    var period = allResults[allResults.length-1].period + 1;

    return Q.all([
        seminarModel.findOne({seminarId: seminarId}),
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


function initSimulationResult(seminarId, periods){
    //allResults contains data of several periods
    var queries = [];
    periods.forEach(function(period) {
        queries.push(cgiapi.queryOnePeriodResult(seminarId, period));
    });

    console.log(queries);
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

function initCompanyStatusReport(seminarId, allResults, period){
    var queries = [];
    allResults.forEach(function(onePeriodResult){
        queries.push(cgiapi.getExogenous(onePeriodResult.period));
    })

    return Q.all(queries)
    .then(function(allExogenous){
        return reportModel.insert({
            seminarId: seminarId,
            reportName: "company_status",
            reportData: companyStatusReportAssembler.getCompanyStatusReport(allResults, allExogenous, period)
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

function initProfitabilityEvolutionReport(seminarId, allResults, period){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: "profitability_evolution",
        reportData: profitabilityEvolutionReportAssembler.getProfitabilityEvolutionReport(allResults, period)
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

function initMarketTrendsReport(seminarId, allResults, period){
    return reportModel.insert({
        seminarId: seminarId,
        reportName: 'market_trends',
        reportData: marketTrendsReportAssembler.getMarketTrendsReport(allResults, period)
    })
}

function initMarketIndicatorReport(seminarId, currentPeriod){
    return cgiapi.getExogenous(currentPeriod)
    .then(function(exogenouse){
        if(!exogenouse || exogenouse.message){
            throw new Error(exogenouse.message);
        }

        return reportModel.insert({
            seminarId: seminarId,
            reportName: 'market_indicators',
            reportData: marketIndicatorsReportAssembler.getMarketIndicators(exogenouse)
        });
    });
}

function duplicateLastPeriodDecision(seminarId, lastPeriod){
    return companyDecisionModel.findAllInPeriod(seminarId, lastPeriod)
    .then(function(allCompanyDecision){
        var p = Q('init');
        allCompanyDecision.forEach(function(companyDecision){
            var tempCompanyDecision = JSON.parse(JSON.stringify(companyDecision));

            delete tempCompanyDecision._id;
            delete tempCompanyDecision.__v;
            tempCompanyDecision.period = tempCompanyDecision.period + 1;
            tempCompanyDecision.d_RequestedAdditionalBudget = 0;
            tempCompanyDecision.d_InvestmentInServicing = 0;
            tempCompanyDecision.d_InvestmentInEfficiency = 0;
            tempCompanyDecision.d_InvestmentInTechnology = 0;
            tempCompanyDecision.bs_AdditionalBudgetApplicationCounter = 0;
            tempCompanyDecision.bs_BlockBudgetApplication = false;
            p = p.then(function(result){
                if(!result){
                    throw new Error("save comanyDecision failed during create copy of last period decision.");
                }
                return companyDecisionModel.save(tempCompanyDecision);
            })
        })
        return p;
    })
    .then(function(result){
        if(!result){
            throw new Error("save comanyDecision failed during create copy of last period decision.");
        }
        return brandDecisionModel.findAllInPeriod(seminarId, lastPeriod)
        .then(function(allBrandDecision){
            var p = Q('init');
            allBrandDecision.forEach(function(brandDecision){
                var tempBrandDecision = JSON.parse(JSON.stringify(brandDecision));

                delete tempBrandDecision._id;
                delete tempBrandDecision.__v;
                tempBrandDecision.period = tempBrandDecision.period + 1;
                tempBrandDecision.d_SalesForce = 0;
                p = p.then(function(result){
                    if(!result){
                        throw new Error("save brandDecision failed during create copy of last period decision.");
                    }
                    return brandDecisionModel.initCreate(tempBrandDecision);
                })
            })
            return p;
        })
    })
    .then(function(result){
        if(!result){
            throw new Error("save comanyDecision failed during create copy of last period decision.");
        }
        return SKUDecisionModel.findAllInPeriod(seminarId, lastPeriod)
        .then(function(allSKUDecision){
            var p = Q('init');
            allSKUDecision.forEach(function(SKUDecision){
                var tempSKUDecision = JSON.parse(JSON.stringify(SKUDecision));

                delete tempSKUDecision._id;
                delete tempSKUDecision.__v;

                //Make sure to copy all the field instead of field listed below:
                tempSKUDecision.period = tempSKUDecision.period + 1;
                tempSKUDecision.d_Advertising = 0;
                tempSKUDecision.d_AdditionalTradeMargin = 0;
                tempSKUDecision.d_ProductionVolume = 0;
                tempSKUDecision.d_PromotionalBudget = 0;
                tempSKUDecision.d_TradeExpenses = 0;
                tempSKUDecision.d_WholesalesBonusRate = 0;
                tempSKUDecision.d_WholesalesBonusMinVolume = 0;
                p = p.then(function(result){
                    if(!result){
                        throw new Error("save SKUDecision failed during create copy of last period decision.");
                    }
                    return SKUDecisionModel.initCreate(tempSKUDecision);
                })
            })
            return p;
        })
    })
}

//createNewDecisionBasedOnLastPeriodDecision
//a) copy previous to current except dropped SKUs/Brands
//b) clean array brandDecisions.d_SKUsDecisions
//c) clean array companyDecisions.d_BrandsDecisions
function createNewDecisionBasedOnLastPeriodDecision(seminarId, lastPeriod){
    var discontinuedSKUId = [];
    var discontinuedBrandId = [];

    return SKUDecisionModel.findAllInPeriod(seminarId, lastPeriod)
        .then(function(allSKUDecision){
            discontinuedSKUId = [];
            discontinuedBrandId = [];

            var p = Q('init');
            allSKUDecision.forEach(function(SKUDecision){
                var tempSKUDecision = JSON.parse(JSON.stringify(SKUDecision));

                if(tempSKUDecision.d_ToDrop){
                    discontinuedSKUId.push(tempSKUDecision.d_SKUID); 
                } else {
                    delete tempSKUDecision._id;
                    delete tempSKUDecision.__v;
                    //Make sure to copy all the field instead of field listed below:
                    tempSKUDecision.period = tempSKUDecision.period + 1;
                    tempSKUDecision.d_Advertising = 0;
                    tempSKUDecision.d_AdditionalTradeMargin = 0;
                    tempSKUDecision.d_ProductionVolume = 0;
                    tempSKUDecision.d_PromotionalBudget = 0;
                    tempSKUDecision.d_TradeExpenses = 0;
                    tempSKUDecision.d_WholesalesBonusRate = 0;
                    tempSKUDecision.d_WholesalesBonusMinVolume = 0;
                    p = p.then(function(result){
                        if(!result){
                            throw new Error("save SKUDecision failed during create copy of last period decision.");
                        }
                        return SKUDecisionModel.createSKUDecisionBasedOnLastPeriodDecision(tempSKUDecision);
                    })                    
                }
            })
            return p;
    })
    .then(function(result){
        if(!result){
            throw new Error("save comanyDecision failed during create copy of last period decision.");
        }
        return brandDecisionModel.findAllInPeriod(seminarId, lastPeriod)
        .then(function(allBrandDecision){
            var p = Q('init');
            allBrandDecision.forEach(function(brandDecision){
                var tempBrandDecision = JSON.parse(JSON.stringify(brandDecision));

                tempBrandDecision.d_SKUsDecisions = _.difference(tempBrandDecision.d_SKUsDecisions, discontinuedSKUId);
                if(tempBrandDecision.d_SKUsDecisions.length == 0){
                    discontinuedBrandId.push(tempBrandDecision.d_BrandID);
                } else {
                    delete tempBrandDecision._id;
                    delete tempBrandDecision.__v;
                    tempBrandDecision.period = tempBrandDecision.period + 1;
                    tempBrandDecision.d_SalesForce = 0;
                    p = p.then(function(result){
                        if(!result){
                            throw new Error("save brandDecision failed during create copy of last period decision.");
                        }
                        return brandDecisionModel.createBrandDecisionBasedOnLastPeriodDecision(tempBrandDecision);
                    })
                }

            })
            return p;
        })        
    }).then(function(result){
        return companyDecisionModel.findAllInPeriod(seminarId, lastPeriod)
        .then(function(allCompanyDecision){
            var p = Q('init');
            allCompanyDecision.forEach(function(companyDecision){
                var tempCompanyDecision = JSON.parse(JSON.stringify(companyDecision));

                delete tempCompanyDecision._id;
                delete tempCompanyDecision.__v;

                if(companyDecision.bs_AdditionalBudgetApplicationCounter >= 2){
                    tempCompanyDecision.bs_BlockBudgetApplication = true;
                } else {
                    tempCompanyDecision.bs_BlockBudgetApplication = false;
                }

                tempCompanyDecision.d_BrandsDecisions = _.difference(tempCompanyDecision.d_BrandsDecisions, discontinuedBrandId);
                tempCompanyDecision.period = tempCompanyDecision.period + 1;
                tempCompanyDecision.d_RequestedAdditionalBudget = 0;
                tempCompanyDecision.d_IsAdditionalBudgetAccepted = false;
                tempCompanyDecision.d_InvestmentInServicing = 0;
                tempCompanyDecision.d_InvestmentInEfficiency = 0;
                tempCompanyDecision.d_InvestmentInTechnology = 0;                
                p = p.then(function(result){
                    if(!result){
                        throw new Error("save comanyDecision failed during create copy of last period decision.");
                    }
                    return companyDecisionModel.save(tempCompanyDecision);
                })
            })
            return p;
        })        
    })

}



































