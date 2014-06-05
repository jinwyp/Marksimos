var utility = require('./utility.js');

/**
 * Assemble product portfolio data
 * 
 * @param {Object} decision current decision got from CGI service
 * @param {Object} allResults allResults got from CGI service
 * @param {Object} seminarSetting
 */
exports.productPortfolio = function(decision, allResults, seminarSetting){
    var productPortfolio = [];

    var lastPeriodResult = allResults[allResults.length-1].onePeriodResult;

    for(var i=0; i<decision.d_BrandsDecisions.length; i++){
        var brandDecision = decision.d_BrandsDecisions[i];
        for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
            var SKUDecision = brandDecision.d_SKUsDecisions[j];
            var productPortfolioForSKU = {};
            productPortfolioForSKU.SKUName = brandDecision.d_BrandName + SKUDecision.d_SKUName;
            productPortfolioForSKU.targetSegment = config.segmentNamesOnProductPortfolio[SKUDecision.d_TargetConsumerSegment];

            if(seminarSetting.simulationVariant === 'FMCG'){
                productPortfolio.factoryPrice = SKUDecision.d_FactoryPrice[0] + ' / (' 
                    + SKUDecision.d_FactoryPrice[0]/consts.ActualSize[SKUDecision.d_PackSize]
                    + ')';
            }else{
                productPortfolio.factoryPrice = SKUDecision.d_FactoryPrice[0];
            }

            productPortfolio.ingredientsQuality = SKUDecision.d_IngredientsQuality;
            productPortfolio.technologyLevel = SKUDecision.d_Technology;
            productPortfolio.productionVolume = SKUDecision.d_ProductionVolume;

            var SKUInAllResults = utility.findSKU(lastPeriodResult, SKUDecision.d_SKUID);
            if(seminarSetting.simulationVariant === 'FMCG'){
                productPortfolio.averageFactoryPrice = SKUInAllResults.u_AverageManufacturerPrice * consts.Actualsize[SKUInAllResults.u_PackSize]
                + ' / (' + SKUInAllResults.u_AverageManufacturerPrice;
            }else{
                productPortfolio.averageFactoryPrice = SKUInAllResults.u_AverageManufacturerPrice;
            }
            
            productPortfolio.averageIngredientsQuality = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_IngredientsQuality;
            productPortfolio.averageTechnologyLevel = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_Technology;
            productPortfolio.totalInventoryVolumeAtFactory = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume;
        }
    }

    return productPortfolio;
};