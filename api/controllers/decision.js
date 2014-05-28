var request = require('../promises/request.js');
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

    if(!companyId){
        return res.json({status: 0, message: "Invalid companyId"});
    }

    if(period === undefined){
        return res.json({status: 0, message: "Invalid period"});
    }

    if(!seminarId){
        return res.json({status: 0, message: "Invalid seminarId"});
    }

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
        if(Object.keys(result).length===0){
            return res.json({result: 0, message: "fail to get decisions"})
        }

        insertEmptyBrandsAndSKUs(result);

        var reqUrl = url.resolve(config.cgiService, '/cgi-bin/decisions.exe');
        return request.post(reqUrl, {
            decision: JSON.stringify(result),
            seminarId: seminarId,
            period: period,
            team: companyId
        });
    })
    .then(function(postDecisionResult){
        //console.log(!postDecisionResult);
        res.send(postDecisionResult);
    })
    .fail(function(err){
        next(err);
    }).done();

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
                emptySKU.d_SKUName = '';
                brand.d_SKUsDecisions.push(emptySKU);
            }
        }

        var numOfBrandToInsert = 5 - decision.d_BrandsDecisions.length;
        for(var k=0; k<numOfBrandToInsert; k++){
            var emptyBrand = JSON.parse(JSON.stringify(decision.d_BrandsDecisions[0]));
            for(var p=0; p<emptyBrand.d_SKUsDecisions.length; p++){
                emptyBrand.d_SKUsDecisions[p].d_SKUID = 0;
                emptyBrand.d_SKUsDecisions[p].d_SKUName = '';
            }
            emptyBrand.d_BrandID = 0;
            emptyBrand.d_BrandName = '';
            decision.d_BrandsDecisions.push(emptyBrand);
        }
    }
}