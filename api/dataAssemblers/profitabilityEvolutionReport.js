var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');
var config = require('../config.js');

exports.getProfitabilityEvolutionReport = function(allResults){
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
        companyReport.SKU = generateSKUReport(companyReport.companyId, allResults);
        companyReport.brand = generateBrandReport(companyReport.companyId, allResults);
        companyReport.global = generateGlobalReport(companyReport.companyId, allResults);
    })

    return allCompanyReport;
}

function generateSKUReport(companyId, allResults){
    if(allResults === undefined) throw new Error("Invalid parameter allResult.");

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
        allResults.forEach(function(onePeriodResult){
            var SKUResult = onePeriodResult.p_SKUs;

            SKUResult.forEach(function(SKU){
                if(SKU.u_SKUID === SKUReport.SKUID){
                    var brandName = utility.findBrand(onePeriodResult, SKU.u_ParentBrandID).b_BrandName;
                    SKUReport.SKUName = brandName + SKU.u_SKUName + ' ' + config.packsizeDescription[SKU.u_PackSize];

                    var onePeriodReport = {};
                    onePeriodReport.period = "Quarter " + onePeriodResult.period;
                    
                    onePeriodReport.manufacturerSalesValue = SKU.u_FactorySalesValue;
                    onePeriodReport.costOfGoodsSold = -SKU.u_CostOfGoodsSold;
                    onePeriodReport.inventoryHoldingCost = -SKU.u_InventoryHoldingCost;
                    onePeriodReport.obsoleteGoodsCost = -SKU.u_ObsoleteGoodsCost;
                    onePeriodReport.discontinuedGoodsCost = -SKU.u_DroppedGoodsCost;
                    onePeriodReport.grossProfit = SKU.u_GrossProfit;
                    onePeriodReport.advertising = -SKU.u_Advertising;
                    onePeriodReport.consumerPromotionsCost = -SKU.u_ConsumerPromotions;
                    onePeriodReport.tradeInvestment = -SKU.u_TradeExpenses;
                    onePeriodReport.salesForceCost = -SKU.u_SalesForceCost;
                    onePeriodReport.volumeDiscountCost = -SKU.u_VolumeDiscountCost;
                    onePeriodReport.additionalTradeMarginCost = -SKU.u_AdditionalMarginValue;
                    onePeriodReport.totalTradeAndMarketingExpenses = -SKU.u_TotalTradeAndMarketing;

                    onePeriodReport.generalExpenses = -SKU.u_GeneralExpenses;
                    onePeriodReport.amortisation = - SKU.u_Amortisation;
                    onePeriodReport.operatingProfit = SKU.u_OperatingProfit;
                    onePeriodReport.interests = SKU.u_Interests;
                    onePeriodReport.exceptionalCostsProfits = SKU.u_CurrentExceptionalCostProfit;
                    onePeriodReport.taxes = -SKU.u_Taxes;
                    onePeriodReport.netProfit = SKU.u_NetProfit;
                    onePeriodReport.surchargeForSuplementaryInvestmentBudget = -SKU.u_CurrentSurcharge;
                    onePeriodReport.netResult = -SKU.u_NetResult;
                    onePeriodReport.shareInBrandTotalSalesValue = SKU.u_ShareInBrandSalesValue * 100;
                    onePeriodReport.shareInBrandGrossProfitLosses = SKU.u_ShareInBrandGrossProfit * 100;
                    onePeriodReport.shareOfTradeAndMarketingExpensesInBrandTotal = SKU.u_ShareInBrandTradeAndMrktng * 100;
                    onePeriodReport.shareInBrandOperatingProfitLosses = SKU.u_ShareInBrandOperatingProfit * 100;
                    onePeriodReport.shareInBrandNetProfitLosses = SKU.u_ShareInBrandNetProfit * 100;
                    onePeriodReport.grossProfitMargin = SKU.u_GrossProfitMargin * 100;
                    onePeriodReport.tradeAndMarketingExpensesAsAPercentageOfSales = SKU.u_TradeAndMrktngSalesRatio * 100;
                    onePeriodReport.generalExpensesAsAPercentageOfSales = SKU.u_GeneralExpensesSalesRatio * 100;
                    onePeriodReport.operatingProfitMargin = SKU.u_GrossProfitMargin * 100;
                    onePeriodReport.netProfitMargin = SKU.u_NetProfitMargin * 100;
                    onePeriodReport.returnOnInvestment = SKU.u_ReturnOnInvestment;
                    onePeriodReport.averageNetMarketPrice = SKU.u_AverageNetMarketPrice * consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.averageWholesalesPrice = SKU.u_AverageWholesalesPrice * consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.averageManufacturerPrice = SKU.u_AverageManufacturerPrice * consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.averageProductionCost = SKU.u_AverageProductionCost * consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.marketSalesValue = SKU.u_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.consumerProcePromotion = -SKU.u_PricePromotionsCost;
                    onePeriodReport.marketNetSalesValue = SKU.u_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.additionalRetailerMargin = -SKU.u_AdditionalMarginValue;
                    onePeriodReport.wholesalersBonusRate = SKU.u_WholesalesBonusRate * 100;
                    onePeriodReport.minimalPurchaseQualifyingForBonusStdPack = SKU.u_ps_WholesalesBonusMinVolume * consts.ActualSize[SKU.u_PackSize];
                    onePeriodReport.productionCost = SKU.u_ProductionCost;
                    onePeriodReport.inventoryValue = SKU.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume * SKU.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_UnitCost;

                    SKUReport.data.push(onePeriodReport);
                }
            })
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

                    onePeriodReport.manufacturerSalesValue = brandResult.b_FactorySalesValue;
                    onePeriodReport.costOfGoodsSold = -brandResult.b_CostOfGoodsSold;
                    onePeriodReport.inventoryHoldingCost = -brandResult.b_InventoryHoldingCost;
                    onePeriodReport.obsoleteGoodsCost = -brandResult.b_ObsoleteGoodsCost;
                    onePeriodReport.discontinuedGoodsCost = -brandResult.b_DroppedGoodsCost;
                    onePeriodReport.grossProfit = brandResult.b_GrossProfit;
                    onePeriodReport.advertising = -brandResult.b_Advertising;
                    onePeriodReport.consumerPromotionsCost = -brandResult.b_ConsumerPromotions;
                    onePeriodReport.tradeInvestment = -brandResult.b_TradeExpenses;
                    onePeriodReport.salesForceCost = -brandResult.b_SalesForceCost;
                    onePeriodReport.volumeDiscountCost = -brandResult.b_VolumeDiscountCost;
                    onePeriodReport.additionalTradeMarginCost = -brandResult.b_AdditionalMarginValue;
                    onePeriodReport.totalTradeAndMarketingExpenses = -brandResult.b_TotalTradeAndMarketing;

                    onePeriodReport.generalExpenses = -brandResult.b_GeneralExpenses;
                    onePeriodReport.amortisation = - brandResult.b_Amortisation;
                    onePeriodReport.operatingProfit = brandResult.b_OperatingProfit;
                    onePeriodReport.interests = brandResult.b_Interests;
                    onePeriodReport.exceptionalCostsProfits = brandResult.b_CurrentExceptionalCostProfit;
                    onePeriodReport.taxes = -brandResult.b_Taxes;
                    onePeriodReport.netProfit = brandResult.b_NetProfit;
                    onePeriodReport.surchargeForSuplementaryInvestmentBudget = -brandResult.b_CurrentSurcharge;
                    onePeriodReport.netResult = -brandResult.b_NetResult;

                    onePeriodReport.shareInCompanyTotalSalesValue = brandResult.b_ShareInCompanySalesValue * 100;
                    onePeriodReport.shareInCompanyGrossProfitLosses = brandResult.b_ShareInCompanyGrossProfit * 100;
                    onePeriodReport.shareOfTradeAndMarketingExpensesInCompanyTotal = brandResult.b_ShareInCompanyTradeAndMrktng * 100;
                    onePeriodReport.shareInCompanyOperatingProfitLosses = brandResult.b_ShareInCompanyOperatingProfit * 100;
                    onePeriodReport.shareInCompanyNetProfitLosses = brandResult.b_ShareInCompanyNetProfit * 100;

                    onePeriodReport.grossProfitMargin = brandResult.b_GrossProfitMargin * 100;
                    onePeriodReport.tradeAndMarketingExpensesAsAPercentageOfSales = brandResult.b_TradeAndMrktngSalesRatio * 100;
                    onePeriodReport.generalExpensesAsAPercentageOfSales = brandResult.b_GeneralExpensesSalesRatio * 100;
                    onePeriodReport.operatingProfitMargin = brandResult.b_GrossProfitMargin * 100;
                    onePeriodReport.netProfitMargin = brandResult.b_NetProfitMargin * 100;
                    onePeriodReport.returnOnInvestment = brandResult.b_ReturnOnInvestment;

                    onePeriodReport.averageNetMarketPrice = brandResult.b_AverageNetMarketPrice;
                    onePeriodReport.averageWholesalesPrice = brandResult.b_WholesalesPrice;
                    onePeriodReport.averageManufacturerPrice = brandResult.b_FactoryPrice;
                    onePeriodReport.averageProductionCost = brandResult.b_AverageProductionCost;

                    onePeriodReport.marketSalesValue = brandResult.b_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                    onePeriodReport.consumerProcePromotion = -brandResult.b_PricePromotionsCost;
                    onePeriodReport.marketNetSalesValue = brandResult.b_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];

                    onePeriodReport.productionCost = brandResult.b_ProductionCost;
                    onePeriodReport.inventoryValue = brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_Volume * brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_UnitCost;
                    
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

    var periodIndex = 0;
    for(var periodIndex=0; periodIndex<allResults.length; periodIndex++){
        var onePeriodResult = allResults[periodIndex];
        for(var i=0; i<onePeriodResult.p_Companies.length; i++){
            var companyResult = onePeriodResult.p_Companies[i];

            if(companyResult.c_CompanyID === companyId){
                var onePeriodReport = {};
                
                onePeriodReport.manufacturerSalesValue = companyResult.c_FactorySalesValue;
                onePeriodReport.costOfGoodsSold = -companyResult.c_CostOfGoodsSold;
                onePeriodReport.inventoryHoldingCost = -companyResult.c_InventoryHoldingCost;
                onePeriodReport.obsoleteGoodsCost = -companyResult.c_ObsoleteGoodsCost;
                onePeriodReport.discontinuedGoodsCost = -companyResult.c_DroppedGoodsCost;
                onePeriodReport.grossProfit = companyResult.c_GrossProfit;
                onePeriodReport.advertising = -companyResult.c_Advertising;
                onePeriodReport.consumerPromotionsCost = -companyResult.c_ConsumerPromotions;
                onePeriodReport.tradeInvestment = -companyResult.c_TradeExpenses;
                onePeriodReport.salesForceCost = -companyResult.c_SalesForceCost;
                onePeriodReport.volumeDiscountCost = -companyResult.c_VolumeDiscountCost;
                onePeriodReport.additionalTradeMarginCost = -companyResult.c_AdditionalMarginValue;
                onePeriodReport.totalTradeAndMarketingExpenses = -companyResult.c_TotalTradeAndMarketing;

                onePeriodReport.overhead = -companyResult.c_Overhead;
                onePeriodReport.investmentToImproveTechnologyLevel = -companyResult.c_Overhead;
                onePeriodReport.investmentToIncreaseProductionEfficiency = -companyResult.c_InvestmentInEfficiency;
                onePeriodReport.productionCapacityDisposalCosts = -companyResult.c_CapacityDisposalCost;
                onePeriodReport.overtimeShiftsCosts = -companyResult.c_OvertimeCost;


                onePeriodReport.generalExpenses = -companyResult.c_GeneralExpenses;
                onePeriodReport.amortisation = - companyResult.c_Amortisation;
                onePeriodReport.operatingProfit = companyResult.c_OperatingProfit;
                onePeriodReport.interests = companyResult.c_Interests;
                onePeriodReport.exceptionalCostsProfits = companyResult.c_CurrentExceptionalCostProfit;
                onePeriodReport.taxes = -companyResult.c_Taxes;
                onePeriodReport.netProfit = companyResult.c_NetProfit;
                onePeriodReport.surchargeForSuplementaryInvestmentBudget = -companyResult.c_CurrentSurcharge;
                onePeriodReport.netResult = -companyResult.c_NetResult;

                onePeriodReport.grossProfitMargin = companyResult.c_GrossProfitMargin * 100;
                onePeriodReport.tradeAndMarketingExpensesAsAPercentageOfSales = companyResult.c_TradeAndMrktngSalesRatio * 100;
                onePeriodReport.generalExpensesAsAPercentageOfSales = companyResult.c_GeneralExpensesSalesRatio * 100;
                onePeriodReport.operatingProfitMargin = companyResult.c_GrossProfitMargin * 100;
                onePeriodReport.netProfitMargin = companyResult.c_NetProfitMargin * 100;
                onePeriodReport.returnOnInvestment = companyResult.c_ReturnOnInvestment;

                onePeriodReport.averageNetMarketPrice = companyResult.c_AverageNetMarketPrice;
                onePeriodReport.averageWholesalesPrice = companyResult.c_WholesalesPrice;
                onePeriodReport.averageManufacturerPrice = companyResult.c_FactoryPrice;
                onePeriodReport.averageProductionCost = companyResult.c_AverageProductionCost;

                onePeriodReport.marketSalesValue = companyResult.c_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
                onePeriodReport.consumerProcePromotion = -companyResult.c_PricePromotionsCost;
                onePeriodReport.marketNetSalesValue = companyResult.c_MarketNetSalesValue[consts.ConsumerSegmentsMaxTotal-1];

                onePeriodReport.productionCost = companyResult.c_ProductionCost;
                onePeriodReport.inventoryValue = companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_Volume * companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_UnitCost;
                
                onePeriodReport.capacityUtilisationRate = companyResult.c_CapacityUtilisationRate * 100;
                if(periodIndex===0){
                    onePeriodReport.changeInProductionCapacityStdPack = 0;
                }else{
                    onePeriodReport.changeInProductionCapacityStdPack = companyResult.c_Capacity
                        - allResults[periodIndex-1].p_Companies[i].c_Capacity;
                }
                
                onePeriodReport.nextPeriodAvailableProdCapacity = companyResult.c_Capacity;

                onePeriodReport.availableTechnologyLevel = companyResult.c_AcquiredTechnologyLevel;
                onePeriodReport.extraBudgetRequiredToIncreaseTechnologyLevelBy1Step = companyResult.c_ATLPlus1;
                onePeriodReport.extraBudgetRequiredToIncreaseTechnologyLevelBy2Step = companyResult.c_ATLPlus2;

                onePeriodReport.acquiredProductionAndLogisticsEfficiency = companyResult.c_AcquiredEfficiency * 100;
                onePeriodReport.extraBudgetRequiredToIncreaseEfficiencyBy2Points = companyResult.c_PEPlus2;
                onePeriodReport.extraBudgetRequiredToIncreaseEfficiencyBy5Points = companyResult.c_PEPlus5;
                
                onePeriodReport.acquiredProductionPlanningFlexibility = companyResult.c_AcquiredFlexibility;
                onePeriodReport.extraBudgetRequiredToIncreaseFlexibilityBy2Points = companyResult.c_PEPlus2;
                onePeriodReport.extraBudgetRequiredToIncreaseFlexibilityBy5Points = companyResult.c_PFPlus5;

                globalReport.push(onePeriodReport);
                break;
            }
        }
        i++;
    }

    return globalReport;
}

function isCompanyExist(companyId, allCompanyReport){
    return allCompanyReport.some(function(companyReport){
        return companyReport.companyId === companyId;
    })
}










