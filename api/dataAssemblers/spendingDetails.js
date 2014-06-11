var decisionAssembler = require('../dataAssemblers/decision.js');
var seminarModel = require('../models/seminar.js');
var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');

exports.getSpendingDetails = function(seminarId, period, companyId){
    return Q.all([
        decisionAssembler.getDecision(seminarId, period, companyId),
        seminarModel.findOne(seminarId)
    ])
    .spread(function(decision, seminar){
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

        var companyDataInAllResults = utility.findCompany(seminar.allResults[seminar.allResults.length-1], companyId)
        //average budget per period
        companyData.averageBudgetPerPeriod = (companyDataInAllResults.c_TotalInvestmentBudget / seminar.simulationSpan).toFixed(2);

        companyData.totalInvestmentBudget = companyDataInAllResults.c_TotalInvestmentBudget;

        companyData.cumulatedPreviousInvestments = companyDataInAllResults.c_CumulatedInvestments.toFixed(2);

        companyData.availableBudget = (companyDataInAllResults.c_TotalInvestmentBudget - companyDataInAllResults.c_CumulatedInvestments 
            - companyData.totalInvestment).toFixed(2);

        companyData.normalCapacity = calculateTotalVolume(decision);

        companyData.availableOvertimeCapacityExtension = '';

        companyData.acquiredEfficiency = '';

        companyData.acquiredProductionVolumeFlexibility = '';

        companyData.acquiredTechnologyLevel = '';

        
        return {
            brandData: brandData,
            companyData: companyData
        };
    });
}

function calculateTotalVolume(currentDecision){
    var totalVolume = 0;
    currentDecision.d_BrandsDecisions.forEach(function(brandDecision){
        brandDecision.d_SKUsDecisions.forEach(function(SKUDecision){
            totalVolume += SKUDecision.d_ProductionVolume * consts.ActualSize[SKUDecision.d_PackSize];
        })
    })
    return totalVolume;
}























