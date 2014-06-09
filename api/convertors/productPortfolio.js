var utility = require('./utility.js');
var config = require('../config.js');
var consts = require('../consts.js');

/**
 * Assemble product portfolio data
 * 
 * @param {Object} decision current decision got from CGI service
 * @param {Object} allResults allResults got from CGI service, allResults of all periods
 * @param {Object} seminarSetting {simulationVariant: 'FMCG'}
 */
function getProductPortfolioForOneCompany(decision, allResults, seminarSetting){
    var productPortfolioForOneCompany = [];

    var lastPeriodResult = allResults[allResults.length-1];

    for(var i=0; i<decision.d_BrandsDecisions.length; i++){
        var brandDecision = decision.d_BrandsDecisions[i];

        for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
            var SKUDecision = brandDecision.d_SKUsDecisions[j];

            var productPortfolioForSKU = {};
            
            productPortfolioForSKU.SKUName = brandDecision.d_BrandName + SKUDecision.d_SKUName;
            productPortfolioForSKU.targetSegment = config.segmentNamesOnProductPortfolio[SKUDecision.d_TargetConsumerSegment-1];

            if(seminarSetting.simulationVariant === 'FMCG'){
                productPortfolioForSKU.factoryPrice = SKUDecision.d_FactoryPrice[0] + ' / (' 
                    + SKUDecision.d_FactoryPrice[0]/consts.ActualSize[SKUDecision.d_PackSize]
                    + ')';
            }else{
                productPortfolioForSKU.factoryPrice = SKUDecision.d_FactoryPrice[0];
            }

            productPortfolioForSKU.ingredientsQuality = SKUDecision.d_IngredientsQuality;
            productPortfolioForSKU.technologyLevel = SKUDecision.d_Technology;
            productPortfolioForSKU.productionVolume = SKUDecision.d_ProductionVolume;

            // var SKUInAllResults = utility.findSKU(lastPeriodResult, SKUDecision.d_SKUID);
            // if(seminarSetting.simulationVariant === 'FMCG'){
            //     productPortfolioForSKU.averageFactoryPrice = SKUInAllResults.u_AverageManufacturerPrice * consts.Actualsize[SKUInAllResults.u_PackSize]
            //     + ' / (' + SKUInAllResults.u_AverageManufacturerPrice;
            // }else{
            //     productPortfolioForSKU.averageFactoryPrice = SKUInAllResults.u_AverageManufacturerPrice;
            // }
            
            // productPortfolioForSKU.averageIngredientsQuality = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_IngredientsQuality;
            // productPortfolioForSKU.averageTechnologyLevel = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_Technology;
            // productPortfolioForSKU.totalInventoryVolumeAtFactory = SKUInAllResults.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume;
            productPortfolioForOneCompany.push(productPortfolioForSKU);
        }
    }

    return productPortfolioForOneCompany;
};

/**
 * @param {Object} allDecisions all decisions of all the companies in all periods
 * @param {Object} allResults allResults of all periods
 * @param {Object} seminarSetting {simulationVariant: 'FMCG'}
 */
exports.getAllProductPortfolio = function(allDecisions, allResults, seminarSetting){
    var allProductPortfolio = [];
    for(var i=0; i<allDecisions.length; i++){
        var decision = allDecisions[i];
        
        var productPortfolioForOneCompany = getProductPortfolioForOneCompany(decision, allResults, seminarSetting);
        allProductPortfolio.push({
            companyId: decision.d_CID,
            productPortfolioForOneCompany: productPortfolioForOneCompany
        })
    }
    
    return allProductPortfolio;
}




























