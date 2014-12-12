var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var Q = require('q');

/**
 * Get decision of one period
 */
exports.getDecision = function(seminarId, period, companyId){
    return Q.all([
        companyDecisionModel.findOne(seminarId, period, companyId),
        brandDecisionModel.findAllInCompany(seminarId, period, companyId),
        SKUDecisionModel.findAllInCompany(seminarId, period, companyId)
    ])
    .spread(function(companyDecision, brandDecisionList, SKUDecisionList){
        companyDecision = JSON.parse(JSON.stringify(companyDecision));
        brandDecisionList = JSON.parse(JSON.stringify(brandDecisionList));
        SKUDecisionList = JSON.parse(JSON.stringify(SKUDecisionList));

        if(!companyDecision || !brandDecisionList || !SKUDecisionList){
            throw {message: 'companyDecision/brandDecisionList/SKUDecisionList is empty.'}
        }

        //combine decisions
        brandDecisionList.forEach(function(brandDecision){

            var tempSKUDecisionList = [];
            for(var i=0; i<SKUDecisionList.length; i++){
                var SKUDecision = SKUDecisionList[i];
                if(SKUDecision.d_BrandID === brandDecision.d_BrandID){

                    tempSKUDecisionList.push(SKUDecision);
                }
            }
            brandDecision.d_SKUsDecisions = tempSKUDecisionList;
        })

        companyDecision.d_BrandsDecisions = brandDecisionList;

        return companyDecision;
    });
};

/**
 * Get decision of all period
 */
exports.getAllCompanyDecisionsOfAllPeriod = function(seminarId){
    return Q.all([
        companyDecisionModel.query.find({seminarId:seminarId}).where('period').gt(0).lean().exec(),
        brandDecisionModel.query.find({seminarId:seminarId}).where('period').gt(0).lean().exec(),
        SKUDecisionModel.query.find({seminarId:seminarId}).where('period').gt(0).lean().exec()
    ])
        .spread(function(companyDecision, brandDecisionList, SKUDecisionList){

            if(!companyDecision || !brandDecisionList || !SKUDecisionList){
                throw {message: 'companyDecision / brandDecisionList / SKUDecisionList is empty.'}
            }

            //combine decisions

            companyDecision.forEach(function(company){

                company.brandDecisions = [];
                company.SKUDecisions = [];


                SKUDecisionList.forEach(function(SKUDecision){
                    if(SKUDecision.d_CID === company.d_CID && SKUDecision.period === company.period){

                        company.SKUDecisions.push(SKUDecision);
                    }
                });

                brandDecisionList.forEach(function(brandDecision){
                    brandDecision.SKUDecisions = [];

                    if(brandDecision.d_CID === company.d_CID && brandDecision.period === company.period){
                        company.brandDecisions.push(brandDecision);
                    }

                    company.SKUDecisions.forEach(function(SKUDecision2){

                        if(SKUDecision2.d_BrandID === brandDecision.d_BrandID){
                            brandDecision.SKUDecisions.push(SKUDecision2);
                        }
                    })

                });

            });


            return companyDecision;
        });
};


/**
 * Convert decision to a companyDecision object which can be saved to db
 *
 * @param {Object} decision decision got from CGI service
 */
exports.getCompanyDecision = function(decision){
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
exports.getBrandDecisions = function(decision){
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
exports.getSKUDecisions = function(decision){
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




