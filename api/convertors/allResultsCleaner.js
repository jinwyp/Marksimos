var consts = require('../consts.js');

exports.clean = function(onePeriodResult) {
    if (!onePeriodResult) return;


    removeEmptyBrands(onePeriodResult);
    removeEmptyCompany(onePeriodResult);
    removeEmptySKU(onePeriodResult);


    //clean company name
    for (var i = 0; i < onePeriodResult.p_Companies.length; i++) {
        var company = onePeriodResult.p_Companies[i];
        company.c_CompanyName = company.c_CompanyName
            .filter(function(n){return n!=='\u0000'})
            .join('').trim();
    }
};

function removeEmptyBrands(onePeriodResult) {
    var brands = [];
    for (var i = 0; i < onePeriodResult.p_Brands.length; i++) {
        var brand = onePeriodResult.p_Brands[i];
        if (brand.b_BrandID !== 0) {
            brands.push(brand);
        }
    }
    onePeriodResult.p_Brands = brands;
}

function removeEmptyCompany(onePeriodResult) {
    var companies = [];
    for (var i = 0; i < onePeriodResult.p_Companies.length; i++) {
        var company = onePeriodResult.p_Companies[i];
        if (company.c_CompanyID !== 0) {
            companies.push(company);
        }
    }
    onePeriodResult.p_Companies = companies;
}

function removeEmptySKU(onePeriodResult) {
    var SKUs = [];
    for (var i = 0; i < onePeriodResult.p_SKUs.length; i++) {
        var SKU = onePeriodResult.p_SKUs[i];
        if (SKU.u_SKUID !== 0) {
            SKUs.push(SKU);
        }
    }
    onePeriodResult.p_SKUs = SKUs;
}