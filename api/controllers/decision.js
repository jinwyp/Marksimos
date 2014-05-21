var request = require('request');
var config = require('../config.js');
var url = require('url');
var util = require('util');
var decisionModel = require('../models/decision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var Q = require('q');


exports.submitDecision = function(req, res, next){
    var companyId = req.session.companyId;
    var period = req.session.period;
    var seminarId = req.session.seminarId;

    var result = {};

    decisionModel.findOne(seminarId, period, companyId)
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

        return brandDecisionModel.findAll(seminarId, period, companyId)
                .then(function(brandDecisions){
                    var p2 = Q();
                    brandDecisions.forEach(function(brandDecision){
                        var tempBrandDecision = {};
                        tempBrandDecision.d_BrandID = brandDecision.d_BrandID;
                        tempBrandDecision.d_BrandName = brandDecision.d_BrandName;
                        tempBrandDecision.d_SalesForce = brandDecision.d_SalesForce;
                        tempBrandDecision.d_SKUsDecisions = [];

                        p2 = p2.then(function(){
                            return SKUDecisionModel.findAll(seminarId, period, companyId, brandDecision.d_BrandID);
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
        //console.log(result);
        res.send(result);
    })
    .fail(function(err){
        next(err);
    }).done();

    // Q.all([
    //     decisionModel.findAll(seminarId, period, teamId),
    //     brandDecisionModel.findAll(seminarId, period, teamId, companyId),
    //     SKUDecisionModel.findAll(seminarId, period, teamId, companyId, brandId)
    // ])
    // .spread(function(decisions, brandDecisions, SKUDecisions){
    //     console.log(decisions);
    //     var t = combineDecisions(decisions, brandDecisions, SKUDecisions);
    //     console.log(t);
    //     res.send('submit decision');

    //     function combineDecisions(decisions, brandDecisions, SKUDecisions){
    //         var result = {};
    //         //there's only one decision record of this period in this seminar
    //         if(decisions && decisions.length === 1){
    //             result.d_CID = decisions[0].d_CID;
    //             result.d_CompanyName = decisions[0].d_CompanyName;
    //             result.d_BrandsDecisions = [];
    //             result.d_IsAdditionalBudgetAccepted = decisions[0].d_IsAdditionalBudgetAccepted;
    //             result.d_RequestedAdditionalBudget = decisions[0].d_RequestedAdditionalBudget;
    //             result.d_InvestmentInEfficiency = decisions[0].d_InvestmentInEfficiency;
    //             result.d_InvestmentInTechnology = decisions[0].d_InvestmentInTechnology;
    //             result.d_InvestmentInServicing = decisions[0].d_InvestmentInServicing;

    //             decisions[0].d_BrandsDecisions.forEach(function(brandID){
    //                 brandDecisions.forEach(function(brandDecision){
    //                 });
    //             })
                    
    //                 var brandDecision = brandDecisions[i];
    //                 var tempBrandDecision = {};
    //                 tempBrandDecision.d_BrandID = brandDecision.d_BrandID;
    //                 tempBrandDecision.d_BrandName = brandDecision.d_BrandName;
    //                 tempBrandDecision.d_SalesForce = brandDecision.d_SalesForce;
    //                 tempBrandDecision.d_SKUsDecisions = [];
    //                 brandDecision.d_SKUsDecisions.forEach(function(SKUID){
    //                     var SKUDec = findSKUDecisions(SKUID, SKUDecisions);
    //                     if(SKUDec){
    //                         var tempSKUDecision = {};
    //                         tempSKUDecision.d_SKUID = SKUDec.d_SKUID;
    //                         tempSKUDecision.d_SKUName = SKUDec.d_SKUName;
    //                         tempSKUDecision.d_Advertising = SKUDec.d_Advertising;
    //                         tempSKUDecision.d_AdditionalTradeMargin = SKUDec.d_AdditionalTradeMargin;
    //                         tempSKUDecision.d_FactoryPrice = SKUDec.d_FactoryPrice;
    //                         tempSKUDecision.d_ConsumerPrice = SKUDec.d_ConsumerPrice;
    //                         tempSKUDecision.d_RepriceFactoryStocks = SKUDec.d_RepriceFactoryStocks;
    //                         tempSKUDecision.d_IngredientsQuality = SKUDec.d_IngredientsQuality;
    //                         tempSKUDecision.d_PackSize = SKUDec.d_PackSize;
    //                         tempSKUDecision.d_ProductionVolume = SKUDec.d_ProductionVolume;
    //                         tempSKUDecision.d_PromotionalBudget = SKUDec.d_PromotionalBudget;
    //                         tempSKUDecision.d_PromotionalEpisodes = SKUDec.d_PromotionalEpisodes;
    //                         tempSKUDecision.d_TargetConsumerSegment = SKUDec.d_TargetConsumerSegment;
    //                         tempSKUDecision.d_Technology = SKUDec.d_Technology;
    //                         tempSKUDecision.d_ToDrop = SKUDec.d_ToDrop;
    //                         tempSKUDecision.d_TradeExpenses = SKUDec.d_TradeExpenses;
    //                         tempSKUDecision.d_WholesalesBonusMinVolume = SKUDec.d_WholesalesBonusMinVolume;
    //                         tempSKUDecision.d_WholesalesBonusRate = SKUDec.d_WholesalesBonusRate;
    //                         tempSKUDecision.d_WarrantyLength = SKUDec.d_WarrantyLength;
    //                         tempBrandDecision.d_SKUsDecisions.push(tempSKUDecision);
    //                     }
    //                 })
    //                 result.d_BrandsDecisions.push(tempBrandDecision);
    //             }                
    //             }
                
    //         }else{
    //             throw new Error("decisions.length should be 1.");
    //         }
    //         return result;
    //     }

        //find all SKUDecisi
        // function findSKUDecisions(SKUID, SKUDecisions){
        //     for(var i=0; i<SKUDecisions.length; i++){
        //         if(SKUDecisions[i].d_SKUID === SKUID){
        //             return SKUDecisions[i];
        //         }
        //     }
        // }
}