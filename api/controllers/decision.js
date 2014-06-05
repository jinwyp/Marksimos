var request = require('../promises/request.js');
var config = require('../config.js');
var url = require('url');
var util = require('util');
var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var decisionCleaner = require('../convertors/decisionCleaner.js');
var decisionConvertor = require('../convertors/decision.js');
var Q = require('q');
var logger = require('../../logger.js');

/**
 * Sumit decision to CGI service
 */
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

    companyDecisionModel.findOne(seminarId, period, companyId)
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
        //convert result to data format that can be accepted by CGI service
        decisionConvertor.convert(result);

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
};

exports.updateSKUDecision = function(req, res, next){
    var brandId = req.body.brand_id;
    var SKUID = req.body.sku_id;
    var SKU = req.body.sku_data;

    var seminarId = req.session.seminarId;
    var companyId = req.session.companyId;
    var period = req.session.period;


    if(!brandId){
        return res.send(400, {status: 0, message: "Invalid parameter brand_id."});
    }

    if(!SKUID){
        return res.send(400, {status: 0, message: "Invalid parameter sku_id."});
    }

    if(!SKU){
        return res.send(400, {status: 0, message: "Invalid parameter sku"});
    }

    if(!seminarId){
        return res.send(400, {status: 0, message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(400, {status: 0, message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(400, {status: 0, message: "Invalid period in session."});
    }

    var jsonSKU = null;
    try{
        jsonSKU = JSON.parse(SKU);
    }catch(err){
        logger.error(err);
        return res.send(400, {status: 0, message: "Invalid parameter sku"});
    }

    //create a SKU object using the data posted by the client
    var tempSKU = createSKU(jsonSKU);


    SKUDecisionModel.updateSKU(seminarId, period, companyId, brandId, SKUID, tempSKU)
    .then(function(numAffected){
        if(numAffected !== 1){
            return res.send(400, {status: 0, message: 'SKUDecision does not exist.'});
        }
        res.send({status: 1, message: 'update success.'});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {status: 0, message: 'update failed.'});
    })
    .done(); 


    function createSKU(postedSKU){
        var result = {};

        var fields = ['d_SKUName','d_Advertising','d_AdditionalTradeMargin','d_FactoryPrice','d_ConsumerPrice','d_RepriceFactoryStocks','d_IngredientsQuality','d_PackSize','d_ProductionVolume','d_PromotionalBudget','d_PromotionalEpisodes','d_TargetConsumerSegment','d_Technology','d_ToDrop','d_TradeExpenses','d_WholesalesBonusMinVolume','d_WholesalesBonusRate','d_WarrantyLength'];
        fields.forEach(function(field){
            if(postedSKU[field] !== undefined){
                result[field] = postedSKU[field];
            }
        })

        return result;
    }
};

exports.updateBrandDecision = function(req, res, next){
    var brandId = req.body.brand_id;
    var brand_decision = req.body.brand_decision;

    var seminarId = req.session.seminarId;
    var companyId = req.session.companyId;
    var period = req.session.period;


    if(!brandId){
        return res.send(400, {status: 0, message: "Invalid parameter brand_id."});
    }

    if(!brand_decision){
        return res.send(400, {status: 0, message: "Invalid parameter brand_data"});
    }

    if(!seminarId){
        return res.send(400, {status: 0, message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(400, {status: 0, message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(400, {status: 0, message: "Invalid period in session."});
    }

    var jsonBrand = null;
    try{
        jsonBrand = JSON.parse(brand_decision);
    }catch(err){
        logger.error(err);
        return res.send(400, {status: 0, message: "Invalid parameter brand_data"});
    }

    var tempBrand = createBrand(jsonBrand);


    brandDecisionModel.updateBrand(seminarId, period, companyId, brandId, tempBrand)
    .then(function(numAffected){
        if(numAffected !== 1){
            return res.send(400, {status: 0, message: 'brandDecision does not exist.'});
        }
        res.send({status: 1, message: 'update success.'});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {status: 0, message: 'update failed.'});
    })
    .done(); 


    function createBrand(postedBrand){
        var result = {};

        var fields = ['d_BrandName', 'd_SalesForce'];
        fields.forEach(function(field){
            if(postedBrand[field] !== undefined){
                result[field] = postedBrand[field];
            }
        });

        return result;
    }
};

exports.updateCompanyDecision = function(req, res, next){
    var company_decision = req.body.company_decision;

    var seminarId = req.session.seminarId;
    var companyId = req.session.companyId;
    var period = req.session.period;


    if(!company_decision){
        return res.send(400, {status: 0, message: "Invalid parameter company_decision"});
    }

    if(!seminarId){
        return res.send(400, {status: 0, message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(400, {status: 0, message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(400, {status: 0, message: "Invalid period in session."});
    }

    var jsonCompanyDecision = null;
    try{
        jsonCompanyDecision = JSON.parse(company_decision);
    }catch(err){
        logger.error(err);
        return res.send(400, {status: 0, message: "Invalid parameter company_decision"});
    }

    var tempCompanyDecision = createCompanyDecision(jsonCompanyDecision);


    companyDecisionModel.updateCompanyDecision(seminarId, period, companyId, tempCompanyDecision)
    .then(function(numAffected){
        if(numAffected !== 1){
            return res.send(400, {status: 0, message: 'companyDecision does not exist.'});
        }
        res.send({status: 1, message: 'update success.'});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {status: 0, message: 'update failed.'});
    })
    .done(); 


    function createCompanyDecision(postedCompanyDecision){
        var result = {};

        var fields = ['d_CompanyName','d_IsAdditionalBudgetAccepted','d_RequestedAdditionalBudget','d_InvestmentInEfficiency','d_InvestmentInTechnology','d_InvestmentInServicing'];
        fields.forEach(function(field){
            if(postedCompanyDecision[field] !== undefined){
                result[field] = postedCompanyDecision[field];
            }
        });

        return result;
    }
};




































