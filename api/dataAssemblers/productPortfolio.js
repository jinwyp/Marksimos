var utility = require('../utility.js');
var config = require('../config.js');
var consts = require('../consts.js');
var seminarModel = require('../models/seminar.js');
var decisionAssembler = require('./decision.js');
var Q = require('q');
var simulationResultModel = require('../models/simulationResult.js');

/**
 * Assemble product portfolio data
 * 
 * @param {Object} decision current decision in mongo
 * @param {Object} allResults allResults in mongo
 */
exports.getProductPortfolioForOneCompany = function(seminarId, period, companyId){
    return Q.all([
        simulationResultModel.findOne(seminarId, period),
        decisionAssembler.getDecision(seminarId, period, companyId)
    ])
    .spread(function(lastPeriodResult, decision){

        var productPortfolioForOneCompany = [];

        for(var i=0; i<decision.d_BrandsDecisions.length; i++){
            var brandDecision = decision.d_BrandsDecisions[i];

            for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
                var SKUDecision = brandDecision.d_SKUsDecisions[j];

                var productPortfolioForSKU = {};
                
                productPortfolioForSKU.SKUName = brandDecision.d_BrandName + SKUDecision.d_SKUName;
                productPortfolioForSKU.targetSegment = config.segmentNamesOnProductPortfolio[SKUDecision.d_TargetConsumerSegment];

                productPortfolioForSKU.factoryPrice = SKUDecision.d_FactoryPrice[0].toFixed(2) + ' / (' 
                    + (SKUDecision.d_FactoryPrice[0]/consts.ActualSize[SKUDecision.d_PackSize]).toFixed(2)
                    + ')';

                productPortfolioForSKU.ingredientsQuality = SKUDecision.d_IngredientsQuality;
                productPortfolioForSKU.technologyLevel = SKUDecision.d_Technology;
                productPortfolioForSKU.productionVolume = SKUDecision.d_ProductionVolume;

                var SKUInAllResults = utility.findSKU(lastPeriodResult, SKUDecision.d_SKUID);
                productPortfolioForSKU.averageFactoryPrice = (SKUInAllResults.u_AverageManufacturerPrice * consts.ActualSize[SKUInAllResults.u_PackSize]).toFixed(2)
                + ' / (' + SKUInAllResults.u_AverageManufacturerPrice.toFixed(2) +")";
                
                productPortfolioForSKU.averageIngredientsQuality = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_IngredientsQuality;
                productPortfolioForSKU.averageTechnologyLevel = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_Technology;
                productPortfolioForSKU.totalInventoryVolumeAtFactory = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume.toFixed(2);
                productPortfolioForOneCompany.push(productPortfolioForSKU);
            }
        }

        return productPortfolioForOneCompany;
    })
}


























