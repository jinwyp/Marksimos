/**
 * Find brand by brandId
 *
 * @method findBrand
 * @param {Object} currentPeriodResult data from allResults
 * @param {Function} u_ParentBrandID
 * @return {Object} the brand data from allResults
 */
exports.findBrand = function(currentPeriodResult, u_ParentBrandID){
    for(var i=0; i<currentPeriodResult.p_Brands.length; i++){
        var brand = currentPeriodResult.p_Brands[i];
        if(brand.b_BrandID === u_ParentBrandID){
            return brand;
        }
    }
}

exports.findSKU = function(periodResult, SKUID){
    for(var i=0; i<periodResult.p_SKUs.length; i++){
        var SKU = periodResult.p_SKUs[i];
        if(SKUID === SKU.u_SKUID){
            return SKU;
        }
    }
}