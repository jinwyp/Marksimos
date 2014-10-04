var consts = require('../consts.js');

exports.getCompetitorIntelligenceReport = function(allResults){
    return {
        acquiredProductionAndLogisticsEfficiency  : companyReport(allResults, function(companyResult){return companyResult.c_AcquiredEfficiency * 100}),
        acquiredProductionPlanningFlexibility     : companyReport(allResults, function(companyResult){return companyResult.c_AcquiredFlexibility * 100}),
        additionalTradeMarginCost                 : companyReport(allResults, function(companyResult){return companyResult.c_AdditionalMarginValue}),
        advertising                               : companyReport(allResults, function(companyResult){return companyResult.c_Advertising}),
        availableTechnologyLevel                  : companyReport(allResults, function(companyResult){return companyResult.c_AcquiredTechnologyLevel}),
        capacityUtilisationRate                   : companyReport(allResults, function(companyResult){return companyResult.c_CapacityUtilisationRate * 100}),
        consumerPromotionsCost                    : companyReport(allResults, function(companyResult){return companyResult.c_ConsumerPromotions}),
        inventoryVolumeAtManufacturerStdPack      : companyReport(allResults, function(companyResult){return companyResult.c_FactoryStocks[consts.StocksMaxTotal].s_Volume}),
        inventoryVolumeAtRetailersStdPack         : companyReport(allResults, function(companyResult){return companyResult.c_RetailStocks[consts.StocksMaxTotal].s_Volume}),
        inventoryVolumeAtWholesalersStdPack       : companyReport(allResults, function(companyResult){return companyResult.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume}),
        investmentToImproveTechnologyLevel        : companyReport(allResults, function(companyResult){return companyResult.c_InvestmentInTechnology}),
        investmentToIncreaseProductionEfficiency  : companyReport(allResults, function(companyResult){return companyResult.c_InvestmentInEfficiency}),
        nextPeriodAvailableProdCapacityStdPack    : companyReport(allResults, function(companyResult){return companyResult.c_Capacity}),
        productionVolumeStdPack                   : companyReport(allResults, function(companyResult){return companyResult.c_ActualProductionVolume}),
        retailersPurchasesVolumeStdPack           : companyReport(allResults, function(companyResult){return companyResult.c_WholesalesVolume}),
        salesForceCost                            : companyReport(allResults, function(companyResult){return companyResult.c_SalesForceCost}),
        shipmentsToWholesalers                    : companyReport(allResults, function(companyResult){return companyResult.c_FactorySalesVolume}),
        tradeInvestment                           : companyReport(allResults, function(companyResult){return companyResult.c_TradeExpenses}),
        volumeDiscountCost                        : companyReport(allResults, function(companyResult){return companyResult.c_VolumeDiscountCost})
    }
};

/**
 * @param {Function} getField a function which gets a field from companyResult
 */
function companyReport(allResults, getField){
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
                        name: onePeriodResult.period,
                        value: getField(companyResult)
                    });
                }
            }
        }
    })

    return result;
}