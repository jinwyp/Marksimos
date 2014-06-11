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