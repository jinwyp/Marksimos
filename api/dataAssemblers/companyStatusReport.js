var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');
var config = require('../config.js');

exports.getCompanyStatusReport = function(allResults, allExogenous){
    var allCompanyReport = [];

    allResults[0].p_Companies.forEach(function(company){
        if(!isCompanyExist(company.c_CompanyID, allCompanyReport)){
            allCompanyReport.push({
                companyId: company.c_CompanyID,
                companyName: company.c_CompanyName,
                global: {},
                brand: [],
                SKU: []
            });
        }
    })

    allCompanyReport.forEach(function(companyReport){
        companyReport.SKU = generateSKUReport(companyReport.companyId, allResults, allExogenous);
        companyReport.brand = generateBrandReport(companyReport.companyId, allResults);
        companyReport.global = generateGlobalReport(companyReport.companyId, allResults);
    })

    return allCompanyReport;
}

function generateSKUReport(companyId, allResults, allExogenous){
    if(allResults === undefined) throw new Error("Invalid parameter allResult.");
    if(allExogenous === undefined) throw new Error("Invalid parameter allExogenous.");

    var allSKUReport = [];

    allResults[0].p_SKUs.forEach(function(SKUResult){
        if(SKUResult.u_ParentCompanyID === companyId){
            if(!isSKUExist(SKUResult.u_SKUID, allSKUReport)){
                allSKUReport.push({
                    SKUID: SKUResult.u_SKUID,
                    data: []
                });
            }
        }
    })

    allSKUReport.forEach(function(SKUReport){
        var index = 0;
        allResults.forEach(function(onePeriodResult){
            var SKUResult = onePeriodResult.p_SKUs;
            var exogenous = allExogenous[index];

            SKUResult.forEach(function(SKU){
                if(SKU.u_SKUID === SKUReport.SKUID){
                    var brandName = utility.findBrand(onePeriodResult, SKU.u_ParentBrandID).b_BrandName;
                    SKUReport.SKUName = brandName + SKU.u_SKUName + ' ' + config.packsizeDescription[SKU.u_PackSize];

                    var onePeriodReport = {};
                    onePeriodReport.period = "Quarter " + onePeriodResult.period;
                    onePeriodReport.marketShareValue = SKU.u_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100.0;
                    onePeriodReport.marketShareVolume = SKU.u_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100.0;
                    onePeriodReport.marketSalesVolumeStdPack = SKU.u_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.lostSalesVolumeDueToOOSStdPack = SKU.u_StockOutVolume;
                    onePeriodReport.numbericalDistribution = SKU.u_DistributionNum * 100;
                    onePeriodReport.volumeWeightedDistribution = SKU.u_DistributionVol * 100;
                    onePeriodReport.shelfSpace = SKU.u_ShelfSpace;
                    onePeriodReport.awareness = SKU.u_Awareness;
                    onePeriodReport.averageNetMarketPriceStdPack = SKU.u_AverageNetMarketPrice;
                    onePeriodReport.averageDisplayPriceStdPack = SKU.u_AverageDisplayPrice;
                    onePeriodReport.priceRankingIndex = SKU.u_PriceIndex;
                    onePeriodReport.targetConsumerSegment = SKU.u_TargetConsumerSegment;
                    onePeriodReport.targetConsumerSegmentExpectedValuePerception = exogenous.exo_SegmentsIdealPoints[SKU.u_TargetConsumerSegment][0];
                    onePeriodReport.valuePerception = SKU.u_Perception[0];
                    onePeriodReport.targetConsumerSegmentExpectedImagePerception = exogenous.exo_SegmentsIdealPoints[SKU.u_TargetConsumerSegment][1];
                    onePeriodReport.imagePerception = SKU.u_Perception[1];
                    onePeriodReport.ingredientsQualityIndex = utility.calculateIngredientsQuality(SKU);
                    onePeriodReport.appliedTechnologyIndex = utility.calculateTechnology(SKU);
                    onePeriodReport.marketSalesValue = SKU.u_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.consumerPricePromotions = -SKU.u_PricePromotionsCost;
                    onePeriodReport.marketNetSalesValue = SKU.u_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.lostSalesVolumeDueToOOS = SKU.u_StockOutVolume / consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.numberOfOutOfStockEpisodes = utility.setSize(SKU.u_OOSEpisodesNumbers);
                    onePeriodReport.marketSalesVolume = SKU.u_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1] / consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.retailersPurchasesVolume = SKU.u_WholesalesVolume / consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.shipmentsToWholesalers = SKU.u_FactorySalesVolume / consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.productionVolume = SKU.u_ps_ActualProductionVolume;
                    onePeriodReport.inventoryVolumeAtManufacturer = SKU.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume;;
                    onePeriodReport.inventoryVolumeAtWholesalers = SKU.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume;
                    onePeriodReport.inventoryVolumeAtRetailers = SKU.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume;
                    onePeriodReport.stocksCoverAtRetailersWeeks = SKU.u_StockCoverAtRetailers;
                    onePeriodReport.stocksCoverAtWholesalersWeeks = SKU.u_StockCoverAtWholesalers;
                    SKUReport.data.push(onePeriodReport);
                }
            })
            index++;
        })
    })
    

    return allSKUReport;

    function isSKUExist(SKUID, allSKUReport){
        return allSKUReport.some(function(SKUReport){
            return SKUReport.SKUID === SKUID;
        })
    }
}

function generateBrandReport(companyId, allResults){
    var allBrandReport = [];

    allResults[0].p_Brands.forEach(function(brand){
        if(brand.b_ParentCompanyID === companyId){
            if(!isBrandExist(brand.b_BrandID, allBrandReport)){
                allBrandReport.push({
                   brandId: brand.b_BrandID,
                   data: [] 
                });
            }
        }
    })

    allBrandReport.forEach(function(brandReport){
        allResults.forEach(function(onePeriodResult){
            for(var i=0; i<onePeriodResult.p_Brands.length; i++){
                var brandResult = onePeriodResult.p_Brands[i];

                if(brandResult.b_BrandID === brandReport.brandId){
                    brandReport.brandName = brandResult.b_BrandName;

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
                    onePeriodReport.marketNetSalesValue = brandResult.b_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal - 1];
                    onePeriodReport.numberOfOutOfStockEpisodes = utility.setSize(brandResult.b_CompleteOOSEpisodesNumbers);
                    onePeriodReport.retailersPurchasesVolumeStdPack = brandResult.b_WholesalesVolume;
                    onePeriodReport.shipmentsToWholesalersStdPack = brandResult.b_FactorySalesVolume;
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
function generateGlobalReport(companyId, allResults){
    var globalReport = [];

    allResults.forEach(function(onePeriodResult){
        for(var i=0; i<onePeriodResult.p_Companies.length; i++){
            var companyResult = onePeriodResult.p_Companies[i];

            if(companyResult.c_CompanyID === companyId){
                var onePeriodReport = {};
                onePeriodReport.period = "Quarter " + onePeriodResult.period;
                onePeriodReport.marketShareValue = companyResult.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100;
                onePeriodReport.marketShareVolume = companyResult.c_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal -1] * 100;
                onePeriodReport.marketSalesVolumeStdPack = companyResult.c_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1] * 100;
                onePeriodReport.lostSalesVolumeDueToOOSStdPack = companyResult.c_TotalStockOutVolume;
                onePeriodReport.numbericalDistribution = companyResult.c_AverageDistributionNum * 100;
                onePeriodReport.volumeWeightedDistribution = companyResult.c_AverageDistributionVol * 100;
                onePeriodReport.shelfSpace = companyResult.c_ShelfSpace * 100;
                onePeriodReport.mindSpaceShare = companyResult.c_MindSpaceShare * 100;
                onePeriodReport.averageNetMarketPriceStdPack = companyResult.c_AverageNetMarketPrice;
                onePeriodReport.averageDisplayPriceStdPack = companyResult.c_AverageDisplayPrice;
                onePeriodReport.ingredientsQualityIndex = companyResult.c_AverageIngredientsQuality;
                onePeriodReport.appliedTechnologyIndex = companyResult.c_AverageIngredientsQuality;
                onePeriodReport.marketSalesValue = companyResult.c_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                onePeriodReport.consumerPricePromotions = -companyResult.c_PricePromotionsCost;
                onePeriodReport.marketNetSalesValue = companyResult.c_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                onePeriodReport.retailersPurchasesVolume = companyResult.c_WholesalesVolume;
                onePeriodReport.shipmentsToWholesalers = companyResult.c_FactorySalesVolume;
                onePeriodReport.productionVolume = companyResult.c_ActualProductionVolume;
                onePeriodReport.inventoryVolumeAtManufacturer = companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_Volume;
                onePeriodReport.inventoryVolumeAtWholesalers = companyResult.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume;
                onePeriodReport.inventoryVolumeAtRetailers = companyResult.c_RetailStocks[consts.StocksMaxTotal].s_Volume;
                onePeriodReport.stocksCoverAtRetailersWeeks = companyResult.c_StockCoverAtRetailers;
                onePeriodReport.stocksCoverAtWholesalersWeeks = companyResult.c_StockCoverAtWholesalers;
                globalReport.push(onePeriodReport);
                break;
            }
        }
    })

    return globalReport;
}

function isCompanyExist(companyId, allCompanyReport){
    return allCompanyReport.some(function(companyReport){
        return companyReport.companyId === companyId;
    })
}










