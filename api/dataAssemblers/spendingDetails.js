var decisionAssembler = require('../dataAssemblers/decision.js');
var seminarModel = require('../models/seminar.js');
var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');
var gameParameters = require('../gameParameters.js').parameters;
var preGeneratedDataModel = require('../models/preGeneratedData.js');

exports.getSpendingDetails = function(seminarId, period, companyId){
    return Q.all([
        decisionAssembler.getDecision(seminarId, period, companyId),
        seminarModel.findOne(seminarId),
        preGeneratedDataModel.findOne(seminarId)
    ])
    .spread(function(decision, seminar, preGeneratedData){
        var brandData = [];
        var companyData = {}

        //assemble brand data
        for(var i=0; i<decision.d_BrandsDecisions.length; i++){
            var brandDecision = decision.d_BrandsDecisions[i];
            var brandDataRow = {};
            brandDataRow.brandName = brandDecision.d_BrandName;
            brandDataRow.salesForce = brandDecision.d_SalesForce;
            brandDataRow.consumerCommunication = 0;
            brandDataRow.consumerPromotion = 0;
            brandDataRow.tradeExpenses = 0;
            brandDataRow.estimatedAdditionalTradeMarginCost =0;
            brandDataRow.estimatedWholesaleBonusCost = 0;

            for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
                var SKUDecision = brandDecision.d_SKUsDecisions[j];
                brandDataRow.consumerCommunication += SKUDecision.d_Advertising;
                brandDataRow.consumerPromotion += SKUDecision.d_PromotionalBudget;
                brandDataRow.tradeExpenses += SKUDecision.d_TradeExpenses;
                brandDataRow.estimatedAdditionalTradeMarginCost += SKUDecision.d_AdditionalTradeMargin;
                brandDataRow.estimatedWholesaleBonusCost += SKUDecision.d_WholesalesBonusRate;
            }

            brandDataRow.estimatedAdditionalTradeMarginCost = brandDataRow.estimatedAdditionalTradeMarginCost.toFixed(2);
            brandDataRow.estimatedWholesaleBonusCost = brandDataRow.estimatedWholesaleBonusCost.toFixed(2);

            brandData.push(brandDataRow);
        }

        //calculate total value
        var total = {};
        total.brandName = "Total";
        total.salesForce = brandData.reduce(function(lastResult, nextValue){
            return lastResult + nextValue.salesForce;
        }, 0);
        total.consumerCommunication = brandData.reduce(function(lastResult, nextValue){
            return lastResult + nextValue.consumerCommunication;
        }, 0);
        total.consumerPromotion = brandData.reduce(function(lastResult, nextValue){
            return lastResult + nextValue.consumerPromotion;
        }, 0);
        total.tradeExpenses = brandData.reduce(function(lastResult, nextValue){
            return lastResult + nextValue.tradeExpenses;
        }, 0);
        total.estimatedAdditionalTradeMarginCost = brandData.reduce(function(lastResult, nextValue){
            return lastResult + parseFloat(nextValue.estimatedAdditionalTradeMarginCost);
        }, 0)
        total.estimatedWholesaleBonusCost = brandData.reduce(function(lastResult, nextValue){
            return lastResult + parseFloat(nextValue.estimatedWholesaleBonusCost);
        }, 0)
        brandData.push(total);

        //assemble company data
        companyData.investmentInProductionEfficiency = decision.d_InvestmentInEfficiency;
        companyData.investmentInProcessingTechnology = decision.d_InvestmentInTechnology;

        companyData.totalInvestment = (total.salesForce + total.consumerCommunication + total.consumerPromotion
        + total.tradeExpenses + total.estimatedAdditionalTradeMarginCost + total.estimatedWholesaleBonusCost).toFixed(2);

        var companyDataInAllResults = utility.findCompany(preGeneratedData.allResults[preGeneratedData.allResults.length-1], companyId)
        
        //average budget per period
        companyData.averageBudgetPerPeriod = (companyDataInAllResults.c_TotalInvestmentBudget / seminar.simulationSpan).toFixed(2);

        companyData.totalInvestmentBudget = companyDataInAllResults.c_TotalInvestmentBudget;

        companyData.cumulatedPreviousInvestments = companyDataInAllResults.c_CumulatedInvestments.toFixed(2);

        companyData.availableBudget = (companyDataInAllResults.c_TotalInvestmentBudget - companyDataInAllResults.c_CumulatedInvestments 
            - companyData.totalInvestment).toFixed(2);

        //normal capacity
        companyData.normalCapacity = companyDataInAllResults.c_Capacity - utility.calculateTotalVolume(decision)
        if(companyData.normalCapacity < -1){
            companyData.normalCapacity = 0;
        }

        //company data in all results
        if(companyDataInAllResults.c_Capacity - utility.calculateTotalVolume(decision) < 0){
            companyData.availableOvertimeCapacityExtension = companyDataInAllResults.c_Capacity - calculateTotalVolume(decision) 
                + companyDataInAllResults.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity;
        }else{
            companyData.availableOvertimeCapacityExtension = companyDataInAllResults.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity;
        }

        companyData.availableOvertimeCapacityExtension = companyData.availableOvertimeCapacityExtension.toFixed(2);
        

        companyData.acquiredEfficiency = (companyDataInAllResults.c_AcquiredEfficiency*100).toFixed(2);

        companyData.acquiredProductionVolumeFlexibility = (companyDataInAllResults.c_AcquiredFlexibility * 100).toFixed(2);

        companyData.acquiredTechnologyLevel = companyDataInAllResults.c_AcquiredTechnologyLevel;

        
        return {
            brandData: brandData,
            companyData: companyData
        };
    });
}
























