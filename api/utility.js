var gameParameters = require('./gameParameters.js').parameters;
var cgiapi = require('./cgiapi.js');
var consts = require('./consts.js');
var config = require('./config.js');


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


exports.unitCost = function(periodNumber, packsize, ingredientsQuality, technologyLevel, previousCumulatedVolumes, efficiencyOfProduction, currentVolume){
    if(periodNumber === undefined) throw new Error("Invalid parameter periodNumber.");
    if(!packsize) throw new Error("Invalid parameter packsize.");
    if(!ingredientsQuality) throw new Error("Invalid parameter ingredientQuality.");
    if(!technologyLevel) throw new Error("Invalid parameter technologyLevel.");
    if(!previousCumulatedVolumes) throw new Error("Invalid parameter previousCumulatedVolumes.");
    if(!efficiencyOfProduction) throw new Error("Invalid parameter efficiencyOfProduction.");
    if(!currentVolume) throw new Error("Invalid patameter currentVolume.");

    var tLevel;
    var inflation;
    var QI;
    var TL;
    var costNow;

    var volumeNow = currentVolume * consts.ActualSize[packsize];

    volumeNow += previousCumulatedVolumes[technologyLevel];

    if(technologyLevel < consts.TechnologyUltimateLevel){
        for(var i = technologyLevel; i < consts.TechnologyUltimateLevel; i++){
            volumeNow += previousCumulatedVolumes[i] * gameParameters.pgen.firm_HigherTechnologyImpact;
        }
    }

    volumeNow = Math.max(volumeNow, gameParameters.pgen.sku_MinProductionVolume);

    return cgiapi.getExogenous(periodNumber)
    .then(function(exogenous){
        if(periodNumber < 0){
            inflation = Math.pow(1 + exogenous.exo_InflationRate, Math.abs(periodNumber));
        }else{
            inflation = 1.0;
        }

        QI = gameParameters.pgen.sku_CostIQSquare * ingredientsQuality * ingredientsQuality
            + gameParameters.pgen.sku_CostIQLinear * ingredientsQuality
            + gameParameters.pgen.sku_CostIQIntercept;

        TL = gameParameters.pgen.sku_CostTLSquare * technologyLevel * technologyLevel
            + gameParameters.pgen.sku_CostTLLinear * technologyLevel
            + gameParameters.pgen.sku_CostTLIntercept;

        costNow = exogenous.exo_IngredientsCost / inflation * QI
            + exogenous.exo_TechnologyExpense / inflation * TL;

        costNow *= Math.pow(volumeNow / gameParameters.pgen.sku_MinProductionVolume, gameParameters.pgen.sku_DefaultCostDrop);

        costNow = (costNow + exogenous.exo_LogisticsFixedCosts / inflation) * (1.00 - efficiencyOfProduction);

        costNow = costNow * consts.ActualSize[packsize];

        return costNow;
    })
}

exports.unitPrice = function(localtion, consumerPrice){
    var priceNow;

    switch(localtion){
        case 'RETAILERS': 
            priceNow = consumerPrice;
            break;
        case 'WHOLESALERS': 
            priceNow = consumerPrice / ( 1.0 + gameParameters.pgen.retail_Markup);
            break;
        default:
            priceNow = consumerPrice / ( 1.0 + gameParameters.pgen.retail_Markup);
            priceNow = priceNow / (1.0 + gameParameters.pgen.wholesale_Markup)
            break;
    }
    
    return priceNow;
}



























