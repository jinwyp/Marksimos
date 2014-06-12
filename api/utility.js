var gameParameters = require('./gameParameters.js').parameters;
var cgiapi = require('./cgiapi.js');

/**
 * Find brand by brandId
 *
 * @method findBrand
 * @param {Object} currentPeriodResult data from allResults
 * @param {Function} u_ParentBrandID
 * @return {Object} the brand data from allResults
 */
exports.findBrand = function(onePeriodResult, u_ParentBrandID){
    for(var i=0; i<onePeriodResult.p_Brands.length; i++){
        var brand = onePeriodResult.p_Brands[i];
        if(brand.b_BrandID === u_ParentBrandID){
            return brand;
        }
    }
}

exports.findSKU = function(onePeriodResult, SKUID){
    for(var i=0; i<onePeriodResult.p_SKUs.length; i++){
        var SKU = onePeriodResult.p_SKUs[i];
        if(SKUID === SKU.u_SKUID){
            return SKU;
        }
    }
}

exports.findCompany = function(onePeriodResult, companyId){
    for(var i=0; i<onePeriodResult.p_Companies.length; i++){
        var companyResult = onePeriodResult.p_Companies[i];
        if(companyResult.c_CompanyID === companyId){
            return companyResult;
        }
    }
}

exports.unitCost = function(configurationRecord
    , periodNumber
    , packsize
    , ingredientsQuality
    , technologyLevel
    , previousCumulatedVolumes
    , efficiencyOfProduction
    , currentVolume){

    var tLevel;
    var inflation;
    var QI;
    var TL;
    var costNow;
    var volumeNow = currentVolume * consts.ActualSize[packsize];

    volumeNow += previousCumulatedVolumes[technologyLevel];

    if(technologyLevel < consts.TechnologyUltimateLevel){
        for(var i = technologyLevel+1; i <= consts.TechnologyUltimateLevel; i++){
            volumeNow += previousCumulatedVolumes[i] * gameParameters.pgen.firm_HigherTechnologyImpact;
        }
    }

    volumeNow = Math.max(volumeNow, gameParameters.pgen.sku_MinProductionVolume);

    return cgiapi.getExogenous(periodNumber)
    .then(function(exogenous){
        if(periodNumber < 0){
            inflation = Math.power(1 + exogenous.exo_InflationRate, Math.abs(periodNumber));
        }

        QI = gameParameters.pgen.sku_CostIQSquare * ingredientsQuality * ingredientsQuality
            + gameParameters.pgen.sku_CostIQLinear * ingredientsQuality
            + gameParameters.pgen.sku_CostIQIntercept;

        TL = gameParameters.pgen.sku_CostTLSquare * technologyLevel * technologyLevel
            + gameParameters.pgen.sku_CostTLLinear * technologyLevel
            + gameParameters.sku_CostTLIntercept;

        costNow = exogenous.exo_IngredientsCost / inflation * QI
            + exogenous.exo_TechnologyExpense / inflation * TL;

        costNow *= Math.power(volumeNow / gameParameters.pgen.sku_MinProductionVolume, gameParameters.pgen.sku_DefaultCostDrop);

        costNow = (costNow + exogenous.exo_LogisticsFixedCosts / inflation) * (1.00 - efficiencyOfProduction);

        costNow = costNow * consts.ActualSize[packsize];

        return costNow;
    })
}



























