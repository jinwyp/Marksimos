var config = require('../config.js');
var consts = require('../consts.js');

exports.getFinancialReport = function(allResults){
    var allCompanyReport = [];

    allResults[0].p_Companies.forEach(function(companyResult){
        if(!isCompanyExist(companyResult.c_CompanyID, allCompanyReport)){
            allCompanyReport.push({
                companyId: companyResult.c_CompanyID,
                companyName: companyResult.c_CompanyName,
                periods: []
            });
        }
    });

    allCompanyReport.forEach(function(companyReport){
        allResults.forEach(function(onePeriodResult){
            var periodReport = {
                period: onePeriodResult.period,
                brands: []
            };

            //generate report for each brand
            onePeriodResult.p_Brands.forEach(function(brandResult){
                var brandReport = {
                    brandId: brandResult.b_BrandID,
                    brandName: brandResult.b_BrandName,
                    data: []
                }

                onePeriodResult.p_SKUs.forEach(function(SKUResult){
                    if(SKUResult.u_ParentBrandID === brandResult.b_BrandID){
                        brandReport.data.push({
                            SKUName: SKUResult.u_SKUName + ' ' + config.packsizeDescription[SKUResult.u_PackSize],
                            salesValue: SKUResult.u_FactorySalesValue,
                            changeVersusPreviousPeriodSalesValue: SKUResult.u_FactorySalesValueChange * 100,
                            shareInBrandTotalSalesValue: SKUResult.u_ShareInBrandSalesValue,
                            costOfGoodsSold: -SKUResult.u_CostOfGoodsSold,
                            obsoleteGoodsCost: -SKUResult.u_ObsoleteGoodsCost,
                            discontinuedGoodsCost: -SKUResult.u_DroppedGoodsCost,
                            inventoryHoldingCost: -SKUResult.u_InventoryHoldingCost,
                            totalMaterialCosts: -SKUResult.u_MaterialCosts,

                            grossProfit: SKUResult.u_GrossProfit,
                            changeVersusPreviousPeriodGrossProfit: SKUResult.u_GrossProfitChange * 100,
                            grossProfitMargin: SKUResult.u_GrossProfitMargin * 100,
                            shareInBrandGrossProfitLosses: SKUResult.u_ShareInBrandGrossProfit * 100,
                            advertising: -SKUResult.u_Advertising,
                            consumerPromotionsCost: -SKUResult.u_ConsumerPromotions,
                            tradeInvestment: -SKUResult.u_TradeExpenses,
                            salesForceCost: -SKUResult.u_SalesForceCost,
                            additionalTradeMarginCost: -SKUResult.u_AdditionalMarginValue,
                            volumeDiscountCost: -SKUResult.u_VolumeDiscountCost,
                            totalTradeAndMarketingExpenses: -SKUResult.u_TotalTradeAndMarketing,
                            tradeAndMarketingExpensesAsAPercentageOfSales: SKUResult.u_TradeAndMrktngSalesRatio * 100,
                            shareOfTradeAndMarketingExpensesInBrandTotal: SKUResult.u_ShareInBrandTradeAndMrktng * 100,
                            generalExpenses: -SKUResult.u_GeneralExpenses,
                            amortisation: -SKUResult.u_Amortisation,

                            operatingProfit: SKUResult.u_OperatingProfit,
                            changeVersusPreviousPeriodOperatingProfit: SKUResult.u_OperatingProfitChange * 100,
                            operatingProfitMargin: SKUResult.u_OperatingProfitMargin * 100,
                            shareInBrandOperatingProfitLosses: SKUResult.u_ShareInBrandOperatingProfit * 100,
                            interests: SKUResult.u_Interests,
                            taxes: -SKUResult.u_Taxes,
                            exceptionalCostsProfits: SKUResult.u_CurrentExceptionalCostProfit,

                            netProfit: SKUResult.u_NetProfit,
                            changeVersusPreviousPeriodNetProfit: SKUResult.u_NetProfitChange * 100,
                            netProfitMargin: SKUResult.u_NetProfitMargin * 100,
                            shareInBrandNetProfitLosses: SKUResult.u_ShareInBrandNetProfit * 100,
                            productionCost: SKUResult.u_ProductionCost,
                            inventoryValue: SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume * SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_UnitCost
                        })
                    }
                })

                periodReport.brands.push(brandReport);
            })
            
            var reportByBrand = {
                brandName: "All Brands",
                data: []
            };

            onePeriodResult.p_Brands.forEach(function(brandResult){
                var tempReportByBrand = {
                    brandName: brandResult.b_BrandName,
                    salesValue: brandResult.b_FactorySalesValue,
                    changeVersusPreviousPeriodSalesValue: brandResult.b_FactorySalesValueChange * 100,
                    shareInCompanyTotalSalesValue: brandResult.b_ShareInCompanySalesValue,
                    costOfGoodsSold: -brandResult.b_CostOfGoodsSold,
                    obsoleteGoodsCost: -brandResult.b_ObsoleteGoodsCost,
                    discontinuedGoodsCost: -brandResult.b_DroppedGoodsCost,
                    inventoryHoldingCost: -brandResult.b_InventoryHoldingCost,
                    totalMaterialCosts: -brandResult.b_MaterialCosts,

                    grossProfit: brandResult.b_GrossProfit,
                    changeVersusPreviousPeriodGrossProfit: brandResult.b_GrossProfitChange * 100,
                    grossProfitMargin: brandResult.b_GrossProfitMargin * 100,
                    shareInCompanyGrossProfitLosses: brandResult.b_ShareInCompanyGrossProfit * 100,
                    advertising: -brandResult.b_Advertising,
                    consumerPromotionsCost: -brandResult.b_ConsumerPromotions,
                    tradeInvestment: -brandResult.b_TradeExpenses,
                    salesForceCost: -brandResult.b_SalesForceCost,
                    additionalTradeMarginCost: -brandResult.b_AdditionalMarginValue,
                    volumeDiscountCost: -brandResult.b_VolumeDiscountCost,
                    totalTradeAndMarketingExpenses: -brandResult.b_TotalTradeAndMarketing,
                    tradeAndMarketingExpensesAsAPercentageOfSales: brandResult.b_TradeAndMrktngSalesRatio * 100,
                    shareOfTradeAndMarketingExpensesInBrandTotal: brandResult.b_ShareInCompanyTradeAndMrktng * 100,
                    generalExpenses: -brandResult.b_GeneralExpenses,
                    amortisation: -brandResult.b_Amortisation,

                    operatingProfit: brandResult.b_OperatingProfit,
                    changeVersusPreviousPeriodOperatingProfit: brandResult.b_OperatingProfitChange * 100,
                    operatingProfitMargin: brandResult.b_OperatingProfitMargin * 100,
                    shareInBrandOperatingProfitLosses: brandResult.b_ShareInCompanyOperatingProfit * 100,
                    interests: brandResult.b_Interests,
                    taxes: -brandResult.b_Taxes,
                    exceptionalCostsProfits: brandResult.b_CurrentExceptionalCostProfit,

                    netProfit: brandResult.b_NetProfit,
                    changeVersusPreviousPeriodNetProfit: brandResult.b_NetProfitChange * 100,
                    netProfitMargin: brandResult.b_NetProfitMargin * 100,
                    shareInBrandNetProfitLosses: brandResult.b_ShareInCompanyNetProfit * 100,
                    productionCost: brandResult.b_ProductionCost,
                    inventoryValue: brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_Volume * brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_UnitCost
                };

                reportByBrand.data.push(tempReportByBrand);
            })

            periodReport.allBrands = reportByBrand;
            
            companyReport.periods.push(periodReport);
        })
    })

    return allCompanyReport;

    function isCompanyExist(companyId, result){
        return result.some(function(companyReport){
            return companyReport.companyId === companyId;
        })
    }
}