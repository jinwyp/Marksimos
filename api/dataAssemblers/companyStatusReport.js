var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');

exports.getCompanyStatusReport = function(allResults){
    var result = {
        company: {},
        brand: {},
        SKU: {}
    };

    result.company = generateCompanyReport(allResults);
    result.brand = generateBrandReport(allResults);

    return result;
}

function generateSKUReport(allResults){
    var allSKUReport = [];

    allResults[0].p_SKUs.forEach(function(SKU){
        if(!isSKUExist(SKU.u_SKUID)){
            allSKUReport.push({
                SKUID: SKU.u_SKUID,

            })
        }
    })
}

function generateBrandReport(allResults){
    var allBrandReport = [];

    allResults[0].p_Brands.forEach(function(brand){
        if(!isBrandExist(brand.b_BrandID, allBrandReport)){
            allBrandReport.push({
               brandId: brand.b_BrandID,
               data: [] 
            });
        }
    })

    allBrandReport.forEach(function(brandReport){
        allResults.forEach(function(onePeriodResult){
            for(var i=0; i<onePeriodResult.p_Brands.length; i++){
                var brandResult = onePeriodResult.p_Brands[i];

                if(brandResult.b_BrandID === brandReport.brandId){
                    brandReport.brandName = brandResult.b_BrandName;
                    brandReport.companyId = brandResult.b_ParentCompanyID;

                    var onePeriodReport = {};
                    onePeriodReport.period = "Quarter " + onePeriodResult.period;
                    onePeriodReport.marketShareValue = brandResult.b_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal - 1] * 100;
                    onePeriodReport.marketShareVolume = brandResult.b_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal - 1] * 100;
                    onePeriodReport.marketSalesVolumeStdPack = brandResult.b_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal - 1];
                    onePeriodReport.lostSalesVolumeDueToOOSStdPack = brandResult.b_StockOutVolume;
                    onePeriodReport.numbericalDistribution = brandResult.b_AverageDistributionNum * 100;
                    onePeriodReport.volumeWeightedDistribution = brandResult.b_AverageDistributionVol * 100;
                    onePeriodReport.shelfSpace = brandResult.b_ShelfSpace * 100;
                    onePeriodReport.awareness = brandResult.b_Awareness * 100;
                    onePeriodReport.averageNetMarketPriceStdPack = brandResult.b_AverageNetMarketPrice;
                    onePeriodReport.averageDisplayPriceStdPack = brandResult.b_AverageDisplayPrice;
                    onePeriodReport.priceRankingIndex = brandResult.b_AveragePriceIndex;
                    onePeriodReport.valuePerception = brandResult.b_Perception[0];
                    onePeriodReport.imagePerception = brandResult.b_Perception[1];
                    onePeriodReport.ingredientsQualityIndex = brandResult.b_AverageIngredientsQuality;
                    onePeriodReport.appliedTechnologyIndex = brandResult.b_AverageTechnology;
                    onePeriodReport.marketSalesValue = brandResult.b_MarketSalesValue[consts.ConsumerSegmentsMaxTotal - 1];
                    onePeriodReport.consumerPricePromotions = -brandResult.b_PricePromotionsCost;
                    onePeriodReport.marketNetSalesValues = brandResult.b_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal - 1];
                    onePeriodReport.numberOfOutOfStockEpisodes = utility.setSize(brandResult.b_CompleteOOSEpisodesNumbers);
                    onePeriodReport.retailersPurchasesVolumeStdPack = brandResult.b_WholesalesVolume;
                    onePeriodReport.shippmentsToWholesalersStdPack = brandResult.b_FactorySalesVolume;
                    onePeriodReport.productionVolumeStdPack = brandResult.b_ActualProductionVolume;
                    onePeriodReport.inventoryVolumeAtManufacturerStdPack = brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.inventoryVolumeAtWholesalersStdPack = brandResult.b_WholesalesStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.inventoryVolumeAtRetailersStdPack = brandResult.b_RetailStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.stocksCoverAtRetailersWeeks = brandResult.b_StockCoverAtRetailers;
                    onePeriodReport.stocksCoverAtWholesalersWeeks = brandResult.b_StockCoverAtWholesalers;
                    brandReport.data.push(onePeriodReport);
                    break;
                }
            }
        })
    })

    return allBrandReport;



    function isBrandExist(brandId, allBrandReport){
        return allBrandReport.some(function(brandReport){
            return brandReport.brandId === brandId;
        })
    }
}

/**
 * @param {Object} allResults allResults of all periods
 */
function generateCompanyReport(allResults){
    var allCompanyReport = [];

    allResults[0].p_Companies.forEach(function(company){
        if(!isCompanyExist(company.c_CompanyID, allCompanyReport)){
            allCompanyReport.push({
                companyId: company.c_CompanyID,
                data: []
            })
        }
    })

    allCompanyReport.forEach(function(companyReport){
        allResults.forEach(function(onePeriodResult){
            for(var i=0; i<onePeriodResult.p_Companies.length; i++){
                var companyResult = onePeriodResult.p_Companies[i];

                if(companyResult.c_CompanyID === companyReport.companyId){
                    companyReport.companyName = companyResult.c_CompanyName;
                    var onePeriodReport = {};
                    onePeriodReport.marketShareValue = companyResult.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100;
                    onePeriodReport.marketShareVolume = companyResult.c_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal -1] * 100;
                    onePeriodReport.marketSalesVolume = companyResult.c_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1] * 100;
                    onePeriodReport.lostSalesVolumeDueToOOS = companyResult.c_TotalStockOutVolume;
                    onePeriodReport.numbericalDistribution = companyResult.c_AverageDistributionNum * 100;
                    onePeriodReport.volumeWeightedDistribution = companyResult.c_AverageDistributionVol * 100;
                    onePeriodReport.shelfSpace = companyResult.c_ShelfSpace * 100;
                    onePeriodReport.mindSpaceShare = companyResult.c_MindSpaceShare * 100;
                    onePeriodReport.averageNetMarketPrice = companyResult.c_AverageNetMarketPrice;
                    onePeriodReport.averageDisplayPrice = companyResult.c_AverageDisplayPrice;
                    onePeriodReport.ingredientsQualityIndex = companyResult.c_AverageIngredientsQuality;
                    onePeriodReport.appliedTechnologyIndex = companyResult.c_AverageIngredientsQuality;
                    onePeriodReport.marketSalesValue = companyResult.c_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.consumerPricePromotions = -companyResult.c_PricePromotionsCost;
                    onePeriodReport.marketNetSalesValues = companyResult.c_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.retailersPurchasesVolume = companyResult.c_WholesalesVolume;
                    onePeriodReport.shippmentsToWholesalers = companyResult.c_FactorySalesVolume;
                    onePeriodReport.productionVolume = companyResult.c_ActualProductionVolume;
                    onePeriodReport.inventoryVolumeAtManufacturer = companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.inventoryVolumeAtWholesalers = companyResult.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.inventoryVolumeAtRetailers = companyResult.c_RetailStocks[consts.StocksMaxTotal].s_Volume;
                    onePeriodReport.stocksCoverAtRetailers = companyResult.c_StockCoverAtRetailers;
                    onePeriodReport.stocksCoverAtWholesalers = companyResult.c_StockCoverAtWholesalers;
                    companyReport.data.push(onePeriodReport);
                    break;
                }
            }
        })
    })

    return allCompanyReport;

    function isCompanyExist(companyId, allCompanyReport){
        return allCompanyReport.some(function(companyReport){
            return companyReport.companyId === companyId;
        })
    }
}










