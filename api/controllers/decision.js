var request                   = require('../promises/request.js');
var config                    = require('../../common/config.js');
var url                       = require('url');
var util                      = require('util');
var Q                         = require('q');
var companyDecisionModel      = require('../models/companyDecision.js');
var brandDecisionModel        = require('../models/brandDecision.js');
var SKUDecisionModel          = require('../models/SKUDecision.js');
var simulationResultModel     = require('../models/simulationResult.js');
var seminarModel              = require('../models/seminar.js');
var decisionCleaner           = require('../convertors/decisionCleaner.js');
var decisionConvertor         = require('../convertors/decision.js');
var logger                    = require('../../common/logger.js');
var gameParameters            = require('../gameParameters.js').parameters;
var utility                   = require('../../common/utility.js');
var decisionAssembler         = require('../dataAssemblers/decision.js');
var productPortfolioAssembler = require('../dataAssemblers/productPortfolio.js');
var spendingDetailsAssembler  = require('../dataAssemblers/spendingDetails.js');
var SKUInfoAssembler          = require('../dataAssemblers/SKUInfo.js');


/**
 * Sumit decision to CGI service
 */
exports.submitDecision = function(req, res, next){
    var companyId = req.session.companyId;
    var period = req.session.currentPeriod;
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    if(!companyId){
        return res.json({message: "Invalid companyId"});
    }

    if(period === undefined){
        return res.json({message: "Invalid period"});
    }

    if(!seminarId){
        return res.json({message: "Invalid seminarId"});
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
                            });
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
        .then(function(postDecisionResult){
            res.send(postDecisionResult);
        });
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "submit decision failed."})
    })
    .done();

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


exports.getDecision = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    decisionAssembler.getDecision(seminarId, period, companyId)
    .then(function(result){
        res.send(result)
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get company data failed."});
    })
    .done();
};

exports.updateSKUDecision = function(req, res, next){
    var brandId = req.body.brand_id;
    var SKUID = req.body.sku_id;
    var SKU = req.body.sku_data;

    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var companyId = req.session.companyId;
    var period = req.session.currentPeriod;


    if(!brandId){
        return res.send(403, {message: "Invalid parameter brand_id."});
    }

    if(!SKUID){
        return res.send(403, {message: "Invalid parameter sku_id."});
    }

    if(!SKU){
        return res.send(403, {message: "Invalid parameter skudata"});
    }

    if(!seminarId){
        return res.send(403, {message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(403, {message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(403, {message: "Invalid period in session."});
    }

    var jsonSKU = SKU;
    //create a SKU object using the data posted by the client
    var tempSKU = createSKU(jsonSKU);



    SKUDecisionModel.updateSKU(seminarId, period, companyId, brandId, SKUID, tempSKU)
    .then(function(doc){
        res.send(200, {status: 1, message: 'update success.'});
    })
    .fail(function(err){

    var message = JSON.stringify(err, ['message', 'lower', 'upper', 'modifiedField'], 2);

    logger.log('!!!!: ' + message);
        res.send(403, message);
    })
    .done(); 

    //res.send(400, 'bad request');
    function createSKU(postedSKU){
        var result = {};

        var fields = ['d_SKUName','d_Advertising','d_AdditionalTradeMargin','d_FactoryPrice','d_RepriceFactoryStocks','d_IngredientsQuality','d_PackSize','d_ProductionVolume','d_PromotionalBudget','d_PromotionalEpisodes','d_TargetConsumerSegment','d_Technology','d_ToDrop','d_TradeExpenses','d_WholesalesBonusMinVolume','d_WholesalesBonusRate','d_WarrantyLength'];
        fields.forEach(function(field){
            if(postedSKU[field] !== undefined){
                result[field] = postedSKU[field];

                // //update consumer price automatically if user try to update factory price
                // if(field === 'd_FactoryPrice'){
                //     result.d_ConsumerPrice = result.d_FactoryPrice[0] * (gameParameters.pgen.wholesale_Markup + 1)
                //         * (gameParameters.pgen.retail_Markup + 1);
                // }
            }
        })

        return result;
    }
};

exports.updateBrandDecision = function(req, res, next){
    /*
    application/json; charset=utf-8
    {
      "brand_id": 12,
      "brand_data": {
        "d_SalesForce": 10
      }
    }
    */
    var brandId = req.body.brand_id;
    var brand_data = req.body.brand_data;

    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var companyId = req.session.companyId;
    var period = req.session.currentPeriod;


    if(!brandId){
        return res.send(403, {message: "Invalid parameter brand_id."});
    }

    if(!brand_data){
        return res.send(403, {message: "Invalid parameter brand_data"});
    }

    if(!seminarId){
        return res.send(403, {message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(403, {message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(403, {message: "Invalid period in session."});
    }

    var tempBrand = createBrand(brand_data);

    brandDecisionModel.updateBrand(seminarId, period, companyId, brandId, tempBrand)
    .then(function(doc){
        res.send({status: 1, message: 'update success.'});
    })
    .fail(function(err){        
        var message = JSON.stringify(err, ['message', 'lower', 'upper', 'modifiedField'], 2);        
        res.send(403, message);
    })
    .done(); 

    function createBrand(postedBrand){
        var result = {};

        var fields = ['d_SalesForce'];
        fields.forEach(function(field){
            if(postedBrand[field] !== undefined){
                result[field] = postedBrand[field];
            }
        });

        return result;
    }
};

exports.updateCompanyDecision = function(req, res, next){

    var company_data = req.body.company_data;

    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var companyId = req.session.companyId;
    var period = req.session.currentPeriod;


    if(!company_data){
        return res.send(403, {message: "Invalid parameter company_data"});
    }

    if(!seminarId){
        return res.send(403, {message: "Invalid seminarId in session."});
    }

    if(!companyId){
        return res.send(403, {message: "Invalid companyId in session."});
    }

    if(period === undefined){
        return res.send(403, {message: "Invalid period in session."});
    }

    var tempCompanyDecision = createCompanyDecision(company_data);

    logger.log('tempCompanyDecision:' + util.inspect(tempCompanyDecision));
    companyDecisionModel.updateCompanyDecision(seminarId, period, companyId, tempCompanyDecision)
    .then(function(result){
        res.send({message: 'update success.'});
    })
    .fail(function(err){
        var message = JSON.stringify(err, ['message', 'lower', 'upper', 'modifiedField'], 2);
        res.send(403, message);        
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

exports.addBrand = function(req, res, next){
    var seminarId = req.session.seminarId;
    
    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    var brand_name = req.body.brand_name;
    var sku_name = req.body.sku_name;

    if(!brand_name){
        return res.send(403, {message: "Invalid parameter brand_name."});
    }

    if(!sku_name){
        return res.send(403, {message: "Invalid parameter sku_name."})
    }

    brandDecisionModel.create({
        seminarId       : seminarId,
        period          : period,
        d_CID           : companyId,
        d_BrandName     : brand_name,
        d_SKUsDecisions : [] 
    })
    .then(function(newBrandID){
        return SKUDecisionModel.create({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: newBrandID,
            d_SKUName: '_' + sku_name
        });        
    })
    .then(function(){
        res.send({message: "add brand and sku success."});
    })
    .fail(function(err){
        var message = JSON.stringify(err, ['message'], 2);
        res.send(403, message);        
    })
    .done();


    // brandDecisionModel.findAllInCompany(seminarId, period, companyId)
    // .then(function(allBrands){
    //     var maxBrandId = 0;
    //     allBrands.forEach(function(brand){
    //         if(brand.d_BrandID>maxBrandId){
    //             maxBrandId = brand.d_BrandID;
    //         }
    //     })

    //     if(maxBrandId===0 || maxBrandId % 10 > 4){
    //         return res.send(403, {message: "you alread have 5 brands."});
    //     }

    //     var nextBrandId = maxBrandId +1;
    //     var firstSKUID = (maxBrandId+1)*10 + 1;//SKUID =  brandID * 10 + 1 

    //     return SKUDecisionModel.create({
    //         seminarId: seminarId,
    //         period: period,
    //         d_CID: companyId,
    //         d_BrandID: nextBrandId,
    //         d_SKUID: firstSKUID,
    //         d_SKUName: sku_name
    //     })
    //     .then(function(){
    //         return brandDecisionModel.save({
    //             seminarId: seminarId,
    //             period: period,
    //             d_CID: companyId,
    //             d_BrandID: nextBrandId,
    //             d_BrandName     : brand_name,
    //             d_SKUsDecisions : [firstSKUID] 
    //         })
    //     })      
    // })
    // .then(function(){
    //     res.send({message: "add brand success."});
    // })
    // .fail(function(err){
    //     logger.error(err);
    //     res.send(500, {message: "addBrand failed."})
    // })
    // .done();


};

exports.addSKU = function(req, res, next){    
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    var brand_id = req.body.brand_id;
    var sku_name = req.body.sku_name;

    if(!sku_name){
        return res.send(403, {message: "Invalid parameter sku_name."})
    }

    SKUDecisionModel.create({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brand_id,
        d_SKUName: '_' + sku_name
    })
    .then(function(){
        res.send({message: 'add SKU successfully.'});
    })
    .fail(function(err){
        var message = JSON.stringify(err, ['message'], 2);
        res.send(403, message)
    })
    .done();
};

exports.deleteSKU = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    var brand_id = req.params.brand_id;
    var sku_id = req.params.sku_id;

    if(!brand_id){
        return res.send(403, {message: "Invalid parameter brand_id."});
    }

    if(!sku_id){
        return res.send(403, {message: "Invalid parameter sku_id."})
    }

    SKUDecisionModel.remove(seminarId, period, companyId, brand_id, sku_id)
    .then(function(){
        res.send({message: "remove SKU successfully."});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "remove SKU failed."});
    })
    .done();
}

exports.deleteBrand = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    var brand_id = req.body.brand_id;
    
    if(!brand_id){
        return res.send(403, {message: "Invalid parameter brand_id."});
    }

    brandDecisionModel.remove(seminarId, period, companyId, brand_id)
    .then(function(){
        return SKUDecisionModel.removeAllInBrand(seminarId, period, companyId, brand_id);
    })
    .then(function(){
        res.send({message: "Remove brand successfully."});
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "remove brand failed."});
    })
    .done();
}

exports.getProductPortfolio = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    productPortfolioAssembler.getProductPortfolioForOneCompany(seminarId, period, companyId)
    .then(function(productPortfolioForOneCompany){
        res.send(productPortfolioForOneCompany);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get product portfolio failed."});
    })
    .done();
}

exports.getSpendingDetails = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    spendingDetailsAssembler.getSpendingDetails(seminarId, period, companyId)
    .then(function(spendingDetails){
        res.send(spendingDetails);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get spending details failed."});
    })
    .done();
}


exports.getSKUInfo = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    var SKUID = req.params.sku_id;

    if(!SKUID){
        return res.send(403, {message: "Invalid parameter sku_id."});
    }

    SKUInfoAssembler.getSKUInfo(seminarId, period, companyId, SKUID)
    .then(function(SKUInfo){
        res.send(SKUInfo);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get SKUInfo failed."});
    })
    .done();
}


exports.getOtherinfo = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(403, {message: "You don't choose a seminar."});
    }
    
    var currentPeriod = req.session.currentPeriod;
    var companyId = req.session.companyId;

    Q.all([
        spendingDetailsAssembler.getSpendingDetails(seminarId, currentPeriod, companyId),
        simulationResultModel.findOne(seminarId, currentPeriod - 1)
    ])
    .spread(function(spendingDetails, lastPeriodResult){
        var totalInvestment = spendingDetails.companyData.totalInvestment;
        var companyResult = utility.findCompany(lastPeriodResult, companyId);

        var totalAvailableBudget = parseFloat(
                (
                    (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments - totalInvestment
                    ) / (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments)
                ).toFixed(2)
            );
        var totalAvailableBudgetValue = companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments - totalInvestment;

        var normalCapacity = parseFloat((spendingDetails.companyData.normalCapacity/companyResult.c_Capacity).toFixed(2));
        var normalCapacityValue = spendingDetails.companyData.normalCapacity;
        
        var overtimeCapacity = parseFloat(((companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity +  spendingDetails.companyData.normalCapacity
            ) / (companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity)).toFixed(2));

        var overtimeCapacityValue = companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity +  spendingDetails.companyData.normalCapacity;

        //if normal capacity is not totally used, set overtime capacity to 1
        if(normalCapacityValue > 0){
            overtimeCapacity = 1;
            overtimeCapacityValue = companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity;
            //overtimeCapacityValue = companyResult.c_Capacity;
        }

        res.send({
            totalAvailableBudget: totalAvailableBudget,
            normalCapacity: normalCapacity,
            overtimeCapacity: overtimeCapacity,
            totalAvailableBudgetValue: totalAvailableBudgetValue,
            normalCapacityValue: normalCapacityValue,
            overtimeCapacityValue: overtimeCapacityValue
        });
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get otherInfo failed."})
    })
    .done();
}
































