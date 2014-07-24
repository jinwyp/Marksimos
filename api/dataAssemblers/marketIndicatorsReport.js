var gameParameters = require('../gameParameters.js').parameters;

exports.getMarketIndicators = function(exogenouse){
    return {
        corporateTaxRate: exogenouse.exo_TaxRate * 100,
        inflationRate: exogenouse.exo_InflationRate * 100,
        depositRate: exogenouse.exo_DepositRate * 100,
        borrowingRate: exogenouse.exo_InterestRate * 100,
        additionalInvestmentBudgetSurchargeRate: exogenouse.exo_SurchargeRate * 100,
        inventoryHoldingCost: (exogenouse.exo_InterestRate + gameParameters.pgen.sku_StockHoldingCost) * 100,
        obsoleteGoodsCost: gameParameters.pgen.sku_ObsolescenceCost * 100,
        discontinuedGoodsCost: gameParameters.pgen.sku_DroppedCost * 100
    };
}