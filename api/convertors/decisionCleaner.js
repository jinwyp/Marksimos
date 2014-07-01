/**
 * Clean the decision data got from CGI service
 * Include:
 *   remove empty SKU
 *   change array of char to string
 * 
 * @method clean
 * @param {Object} decision
 {
    d_BrandsDecisions : [],
    d_CompanyName: '',
    d_CID: 1
 }
 */
exports.clean = function(decision) {
    if (!decision) return;

    removeEmptyBrand(decision);
    removeEmptySKU(decision);

    cleanSKUName(decision);
    cleanBrandName(decision);

    decision.d_CompanyName = decision.d_CompanyName
        .filter(function(n){return n!=='\u0000'})
        .join('').trim();
};

function removeEmptyBrand(decision){
    var tempBrand = [];
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];

        if(brand.d_BrandID !== 0){
            tempBrand.push(brand);
        }
    }
    decision.d_BrandsDecisions = tempBrand;
}

function cleanBrandName(decision){
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];
        brand.d_BrandName = brand.d_BrandName
            .filter(function(n){return n!=='\u0000'})
            .join('').trim();
    }
}

function removeEmptySKU(decision){
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];

        if(brand.d_BrandID !== 0){
            //clean SKU data
            var tempSku = [];
            for (var i = 0; i < brand.d_SKUsDecisions.length; i++) {
                var sku = brand.d_SKUsDecisions[i];
                if (sku.d_SKUID !== 0) {
                    tempSku.push(sku);
                }
            }
            brand.d_SKUsDecisions = tempSku;
        }
    }
}

function cleanSKUName(decision){
    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];
        for (var i = 0; i < brand.d_SKUsDecisions.length; i++) {
            var sku = brand.d_SKUsDecisions[i];
            sku.d_SKUName = sku.d_SKUName
                .filter(function(n){return n!=='\u0000'})
                .join('').trim();
        }
    }
}


