var consts = require('../consts.js');
var utility = require('../../common/utility.js');
var config = require('../../common/config.js');

exports.getMarketTrendsReport = function(allResults){
    var result = {
        global: genereateCompanyReport(allResults),
        brand: generateBrandReport(allResults),
        SKU: generateSKUReport(allResults)
    }
    return result;
}

function generateSKUReport(allResults){
    return {
        averageDisplayPriceStdPack: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_AverageDisplayPrice}),
        averageNetMarketPriceStdPack: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_AverageNetMarketPrice}),
        brandAwareness: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_Awareness * 100}),
        imagePerception: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_Perception[1]}),
        lostSalesVolumeDueToOOSStdPack: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_StockOutVolume}),
        marketNetSalesValue: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1]}),
        marketSalesVolumeStdPack: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1]}),
        marketShareValue: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100}),
        marketShareVolume: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100}),
        numericalDistribution: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_DistributionNum * 100}),

        priceRankingIndex: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_PriceIndex}),
        shelfSpace: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ShelfSpace * 100}),
        totalInventoryAtTradeStdPack: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume + SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume}),
        valuePerception: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_Perception[0]}),

        valueShareInPriceSensitiveSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[0] * 100;}),
        valueShareInPretendersSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[1] * 100;}),
        valueShareInModerateSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[2] * 100;}),
        valueShareInGoodLifeSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[3] * 100;}),
        valueShareInUltimateSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[4] * 100;}),
        valueShareInPragmaticSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_ValueSegmentShare[5] * 100;}),
        
        volumeShareInPriceSensitiveSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[0] * 100;}),
        volumeShareInPretendersSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[1] * 100;}),
        volumeShareInModerateSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[2] * 100;}),
        volumeShareInGoodLifeSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[3] * 100;}),
        volumeShareInUltimateSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[4] * 100;}),
        volumeShareInPragmaticSegment: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_VolumeSegmentShare[5] * 100;}),

        volumeWeightedDistribution: generateSKUFieldReport(allResults, function(SKUResult){return SKUResult.u_DistributionVol * 100;})
    }
}

function generateSKUFieldReport(allResults, getField){
    var result = [];

    allResults[0].p_SKUs.forEach(function(SKU){
        var SKUName = utility.findBrand(allResults[0], SKU.u_ParentBrandID).b_BrandName + SKU.u_SKUName + ' ' + config.packsizeDescription[SKU.u_PackSize];
        result.push({
            SKUID: SKU.u_SKUID,
            SKUName: SKUName,
            data: []
        })
    });

    result.forEach(function(SKU){
        for(var i=0; i<allResults.length; i++){
            var onePeriodResult = allResults[i];

            for(var j=0; j<onePeriodResult.p_SKUs.length; j++){
                var SKUResult = onePeriodResult.p_SKUs[j];
                if(SKUResult.u_SKUID === SKU.SKUID){
                    SKU.data.push({
                        name: 'Quarter ' + onePeriodResult.period,
                        value: getField(SKUResult)
                    });
                }
            }
        }
    })

    return result;
}

function generateBrandReport(allResults){
    return {
        averageDisplayPriceStdPack: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_AverageDisplayPrice}),
        averageNetMarketPriceStdPack: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_AverageNetMarketPrice}),
        brandAwareness: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_Awareness * 100}),
        imagePerception: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_Perception[1]}),
        lostSalesVolumeDueToOOSStdPack: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_StockOutVolume}),
        marketNetSalesValue: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1]}),
        marketSalesVolumeStdPack: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1]}),
        marketShareValue: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100}),
        marketShareVolume: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100}),
        numericalDistribution: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_AverageDistributionNum * 100}),

        priceRankingIndex: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_AveragePriceIndex}),
        shelfSpace: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ShelfSpace * 100}),
        totalInventoryAtTradeStdPack: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_WholesalesStocks[consts.StocksMaxTotal].s_Volume + brandResult.b_RetailStocks[consts.StocksMaxTotal].s_Volume}),
        valuePerception: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_Perception[0]}),

        valueShareInPriceSensitiveSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[0] * 100;}),
        valueShareInPretendersSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[1] * 100;}),
        valueShareInModerateSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[2] * 100;}),
        valueShareInGoodLifeSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[3] * 100;}),
        valueShareInUltimateSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[4] * 100;}),
        valueShareInPragmaticSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_ValueSegmentShare[5] * 100;}),
        
        volumeShareInPriceSensitiveSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[0] * 100;}),
        volumeShareInPretendersSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[1] * 100;}),
        volumeShareInModerateSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[2] * 100;}),
        volumeShareInGoodLifeSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[3] * 100;}),
        volumeShareInUltimateSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[4] * 100;}),
        volumeShareInPragmaticSegment: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_VolumeSegmentShare[5] * 100;}),

        volumeWeightedDistribution: generateBrandFieldReport(allResults, function(brandResult){return brandResult.b_AverageDistributionVol * 100;})
    };
}

function generateBrandFieldReport(allResults, getField){
    var result = [];

    allResults[0].p_Brands.forEach(function(brand){
        result.push({
            brandId: brand.b_BrandID,
            brandName: brand.b_BrandName,
            data: []
        })
    });

    result.forEach(function(brand){
        for(var i=0; i<allResults.length; i++){
            var onePeriodResult = allResults[i];

            for(var j=0; j<onePeriodResult.p_Brands.length; j++){
                var brandResult = onePeriodResult.p_Brands[j];
                if(brandResult.b_BrandID === brand.brandId){
                    brand.data.push({
                        name: 'Quarter ' + onePeriodResult.period,
                        value: getField(brandResult)
                    });
                }
            }
        }
    })

    return result;
}

function genereateCompanyReport(allResults){
    return {
        averageNetMarketPriceStdPack: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_AverageNetMarketPrice}),
        lostSalesVolumeDueToOOSStdPack: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_TotalStockOutVolume;}),
        marketNetSalesValue: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];}),
        marketSalesVolumeStdPack: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1];}),
        marketShareValue: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100;}),
        marketShareVolume: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100;}),
        mindSpaceShare: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_MindSpaceShare * 100;}),
        numericalDistribution: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_AverageDistributionNum * 100;}),
        shelfSpace: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ShelfSpace * 100;}),
        totalInventoryAtTradeStdPack: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume + companyResult.c_RetailStocks[consts.StocksMaxTotal].s_Volume;}),
        
        valueShareInPriceSensitiveSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[0] * 100;}),
        valueShareInPretendersSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[1] * 100;}),
        valueShareInModerateSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[2] * 100;}),
        valueShareInGoodLifeSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[3] * 100;}),
        valueShareInUltimateSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[4] * 100;}),
        valueShareInPragmaticSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_ValueSegmentShare[5] * 100;}),
        
        volumeShareInPriceSensitiveSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[0] * 100;}),
        volumeShareInPretendersSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[1] * 100;}),
        volumeShareInModerateSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[2] * 100;}),
        volumeShareInGoodLifeSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[3] * 100;}),
        volumeShareInUltimateSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[4] * 100;}),
        volumeShareInPragmaticSegment: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_VolumeSegmentShare[5] * 100;}),

        volumeWeightedDistribution: generateCompanyFieldReport(allResults, function(companyResult){return companyResult.c_AverageDistributionVol * 100;})
    };
}

/**
 * @param {Function} getField a function which gets a field from companyResult
 */
function generateCompanyFieldReport(allResults, getField){
    var result = [];

    allResults[0].p_Companies.forEach(function(company){
        result.push({
            companyId: company.c_CompanyID,
            companyName: company.c_CompanyName,
            data: []
        })
    });

    result.forEach(function(company){
        for(var i=0; i<allResults.length; i++){
            var onePeriodResult = allResults[i];

            for(var j=0; j<onePeriodResult.p_Companies.length; j++){
                var companyResult = onePeriodResult.p_Companies[j];
                if(companyResult.c_CompanyID === company.companyId){
                    company.data.push({
                        name: 'Quarter ' + onePeriodResult.period,
                        value: getField(companyResult)
                    });
                }
            }
        }
    })

    return result;
}