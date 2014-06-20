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
            // allBrandReport.push({
            //     brandId: brand.b_BrandID,
            //     marketShareValue: [],
            //     marketShareVolume: [],
            //     marketSalesVolumeStdPack: [],
            //     lostSalesVolumeDueToOOSStdPack: [],
            //     numbericalDistribution: [],
            //     volumeWeightedDistribution: [],
            //     shelfSpace: [],

            //     awareness: [],

            //     averageNetMarketPriceStdPack: [],
            //     averageDisplayPriceStdPack: [],

            //     priceRankingIndex: [],
            //     valuePerception: [],
            //     imagePerception: [],

            //     ingredientsQualityIndex: [],
            //     appliedTechnologyIndex: [],

            //     marketSalesValue:[],
            //     consumerPricePromotions: [],
            //     marketNetSalesValues: [],
            //     //lostSalesVolumeDueToOOSStdPack,
            //     numberOfOutOfStockEpisodes: [],
            //     //marketSalesVolumeStdPack,
            //     retailersPurchasesVolumeStdPack: [],
            //     shippmentsToWholesalersStdPack: [],
            //     productionVolumeStdPack: [],
            //     inventoryVolumeAtManufacturerStdPack: [],
            //     inventoryVolumeAtWholesalersStdPack: [],
            //     inventoryVolumeAtRetailersStdPack: [],
            //     //inventoryVolumeAtRetailersStdPack2: [],

            //     stocksCoverAtRetailersWeeks: [],
            //     stocksCoverAtWholesalersWeeks: []
            // })
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
                companyId: company.c_CompanyID
            })
        }
    })

    allCompanyReport.forEach(function(companyReport){
        allResults.forEach(function(onePeriodResult){
            for(var i=0; i<onePeriodResult.p_Companies.length; i++){
                var companyResult = onePeriodResult.p_Companies[i];
                if(companyResult.c_CompanyID === companyReport.companyId){

                    if(!companyReport.marketShareValue) companyReport.marketShareValue = [];
                    if(!companyReport.marketShareVolume) companyReport.marketShareVolume = [];
                    if(!companyReport.marketSalesVolume) companyReport.marketSalesVolume = [];
                    if(!companyReport.lostSalesVolumeDueToOOS) companyReport.lostSalesVolumeDueToOOS = [];
                    if(!companyReport.numbericalDistribution)  companyReport.numbericalDistribution = [];
                    if(!companyReport.volumeWeightedDistribution) companyReport.volumeWeightedDistribution = [];
                    if(!companyReport.shelfSpace) companyReport.shelfSpace = [];
                    if(!companyReport.mindSpaceShare) companyReport.mindSpaceShare = [];
                    if(!companyReport.averageNetMarketPrice) companyReport.averageNetMarketPrice = [];
                    if(!companyReport.averageDisplayPrice) companyReport.averageDisplayPrice = [];
                    if(!companyReport.ingredientsQualityIndex)  companyReport.ingredientsQualityIndex = [];
                    if(!companyReport.appliedTechnologyIndex)  companyReport.appliedTechnologyIndex = [];
                    if(!companyReport.marketSalesValue)  companyReport.marketSalesValue = [];
                    if(!companyReport.consumerPricePromotions)  companyReport.consumerPricePromotions = [];
                    if(!companyReport.marketNetSalesValues)  companyReport.marketNetSalesValues = [];
                    if(!companyReport.retailersPurchasesVolume)  companyReport.retailersPurchasesVolume = [];
                    if(!companyReport.shippmentsToWholesalers)  companyReport.shippmentsToWholesalers = [];
                    if(!companyReport.productionVolume)   companyReport.productionVolume = [];
                    if(!companyReport.inventoryVolumeAtManufacturer)   companyReport.inventoryVolumeAtManufacturer = [];
                    if(!companyReport.inventoryVolumeAtWholesalers)    companyReport.inventoryVolumeAtWholesalers = [];
                    if(!companyReport.inventoryVolumeAtRetailers)    companyReport.inventoryVolumeAtRetailers = [];
                    if(!companyReport.stocksCoverAtRetailers)    companyReport.stocksCoverAtRetailers = [];
                    if(!companyReport.stocksCoverAtWholesalers)    companyReport.stocksCoverAtWholesalers = [];

                    companyReport.marketShareValue.push(companyResult.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1] * 100);
                    companyReport.marketShareVolume.push(companyResult.c_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal -1] * 100);
                    companyReport.marketSalesVolume.push(companyResult.c_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1] * 100);
                    companyReport.lostSalesVolumeDueToOOS.push(companyResult.c_TotalStockOutVolume);
                    companyReport.numbericalDistribution.push(companyResult.c_AverageDistributionNum * 100);
                    companyReport.volumeWeightedDistribution.push(companyResult.c_AverageDistributionVol * 100);
                    companyReport.shelfSpace.push(companyResult.c_ShelfSpace * 100);
                    companyReport.mindSpaceShare.push(companyResult.c_MindSpaceShare * 100);
                    companyReport.averageNetMarketPrice.push(companyResult.c_AverageNetMarketPrice);
                    companyReport.averageDisplayPrice.push(companyResult.c_AverageDisplayPrice);
                    companyReport.ingredientsQualityIndex.push(companyResult.c_AverageIngredientsQuality);
                    companyReport.appliedTechnologyIndex.push(companyResult.c_AverageIngredientsQuality);
                    companyReport.marketSalesValue.push(companyResult.c_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1]);
                    companyReport.consumerPricePromotions.push(-companyResult.c_PricePromotionsCost);
                    companyReport.marketNetSalesValues.push(companyResult.c_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1]);
                    companyReport.retailersPurchasesVolume.push(companyResult.c_WholesalesVolume);
                    companyReport.shippmentsToWholesalers.push(companyResult.c_FactorySalesVolume);
                    companyReport.productionVolume.push(companyResult.c_ActualProductionVolume);
                    companyReport.inventoryVolumeAtManufacturer.push(companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_Volume)
                    companyReport.inventoryVolumeAtWholesalers.push(companyResult.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume);
                    companyReport.inventoryVolumeAtRetailers.push(companyResult.c_RetailStocks[consts.StocksMaxTotal].s_Volume);
                    companyReport.stocksCoverAtRetailers.push(companyResult.c_StockCoverAtRetailers);
                    companyReport.stocksCoverAtWholesalers.push(companyResult.c_StockCoverAtWholesalers);

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










