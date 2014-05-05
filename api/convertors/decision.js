/**
 * Clean the decision data got from CGI service
 * Include:
 *   remove empty SKU
 *   chage array of char to string
 * 
 * @method toJSON
 * @return {Object} Copy of ...
 */
exports.clean = function(decision) {
    if (!decision) return;

    for (var j = 0; j < decision.d_BrandsDecisions.length; j++) {
        var brand = decision.d_BrandsDecisions[j];
        var tempSku = [];
        for (var i = 0; i < brand.d_SKUsDecisions.length; i++) {
            var sku = brand.d_SKUsDecisions[i];
            if (sku.d_SKUID !== 0) {
                tempSku.push(sku);
            }

            sku.d_SKUName = sku.d_SKUName
                .filter(function(n){return n!=='\u0000'})
                .join('').trim();
        }

        brand.d_SKUsDecisions = tempSku;

        brand.d_BrandName = brand.d_BrandName
            .filter(function(n){return n!=='\u0000'})
            .join('').trim();
    }

    decision.d_CompanyName = decision.d_CompanyName
        .filter(function(n){return n!=='\u0000'})
        .join('').trim();
};


