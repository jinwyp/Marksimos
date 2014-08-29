var utility = require('../../common/utility.js');
var config = require('../../common/config.js');
var consts = require('../consts.js');
var seminarModel = require('../models/seminar.js');
var decisionAssembler = require('./decision.js');
var Q = require('q');
var simulationResultModel = require('../models/simulationResult.js');

/**
 * Assemble product portfolio data
 * 
 * @param {Number} currentPeriod the current period
 * @param {Number} companyId
 */
exports.getProductPortfolioForOneCompany = function(seminarId, currentPeriod, companyId){
    return Q.all([
        simulationResultModel.findOne(seminarId, currentPeriod-1),
        decisionAssembler.getDecision(seminarId, currentPeriod, companyId)
    ])
    .spread(function(lastPeriodResult, decision){
    

        var productPortfolioForOneCompany = [];
        
        for(var i=0; i<decision.d_BrandsDecisions.length; i++){
            var brandDecision = decision.d_BrandsDecisions[i];

            for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
                var SKUDecision = brandDecision.d_SKUsDecisions[j];
                
                var productPortfolioForSKU = {};
                
                productPortfolioForSKU.SKUName = brandDecision.d_BrandName + SKUDecision.d_SKUName;
                productPortfolioForSKU.targetSegment = config.segmentNamesOnProductPortfolio[SKUDecision.d_TargetConsumerSegment - 1];

                productPortfolioForSKU.factoryPrice = SKUDecision.d_FactoryPrice[0].toFixed(2) + ' / (' 
                    + (SKUDecision.d_FactoryPrice[0]/consts.ActualSize[SKUDecision.d_PackSize]).toFixed(2)
                    + ')';

                productPortfolioForSKU.ingredientsQuality = SKUDecision.d_IngredientsQuality;
                productPortfolioForSKU.technologyLevel = SKUDecision.d_Technology;
                productPortfolioForSKU.productionVolume = SKUDecision.d_ProductionVolume;


                var SKUInAllResults = utility.findSKU(lastPeriodResult, SKUDecision.d_SKUID);
                if(SKUInAllResults){
                    productPortfolioForSKU.averageFactoryPrice = (SKUInAllResults.u_AverageManufacturerPrice * consts.ActualSize[SKUInAllResults.u_PackSize]).toFixed(2)
                    + ' / (' + SKUInAllResults.u_AverageManufacturerPrice.toFixed(2) +")";
                    
                    productPortfolioForSKU.averageIngredientsQuality = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_IngredientsQuality;
                    productPortfolioForSKU.averageTechnologyLevel = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_Technology;
                    productPortfolioForSKU.totalInventoryVolumeAtFactory = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume.toFixed(2);
                    productPortfolioForOneCompany.push(productPortfolioForSKU);                        
                } else {
                    productPortfolioForSKU.averageFactoryPrice = '/';
                    productPortfolioForSKU.averageIngredientsQuality = '/';
                    productPortfolioForSKU.averageTechnologyLevel = '/';
                    productPortfolioForSKU.totalInventoryVolumeAtFactory = '/';
                    productPortfolioForOneCompany.push(productPortfolioForSKU);                        
                }
            }
        }

        return productPortfolioForOneCompany;
    })
}


























