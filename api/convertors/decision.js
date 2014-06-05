exports.convert = function(decision){
    convertCompanyName(decision);
    //convert SKUName
    convertSKUName(decision);
    convertBrandName(decision);
}

exports.productPortfolio = function(decision, seminarSetting){
    var productPortfolio = [];

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
            productPortfolio.averageFactoryPrice = '';
            productPortfolio.averageIngredientsQuality = '';
            productPortfolio.averageTechnologyLevel = '';
            productPortfolio.totalInventoryVolumeAtFactory = '';
        }
    }

    return productPortfolio;
};

function convertCompanyName(decision){
    decision.d_CompanyName = decision.d_CompanyName.split('');
    append(decision.d_CompanyName, 16, '\u0000');
}

function convertBrandName(decision){
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];

        brand.d_BrandName = brand.d_BrandName.split('');
        append(brand.d_BrandName, 6, '\u0000');
    }
}

function convertSKUName(decision){
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];
        for (var i = 0; i < brand.d_SKUsDecisions.length; i++) {
            var sku = brand.d_SKUsDecisions[i];
            sku.d_SKUName = sku.d_SKUName.split('');
            append(sku.d_SKUName, 3, '\u0000');
        }
    }
}

/**
 * if a is shorter than width, append c to a, so that the length of a is width
 * 
 * @param {Array} a 
 */
function append(a, width, c){
    if(!a || a.length===undefined) return a;
    
    var appendNum = width - a.length;
    for(var i=0; i<appendNum; i++){
        a.push(c);
    }
}