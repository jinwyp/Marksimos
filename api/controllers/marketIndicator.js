var cgiapi = require('../cgiapi.js');
var sessionOperation = require('../../common/sessionOperation.js');
var gameParameters = require('../gameParameters.js').parameters;

exports.getMarketIndicator = function(req, res, next){
    var currentPetriod = sessionOperation.getCurrentPeriod(req);

    cgiapi.getExogenous(currentPetriod)
    .then(function(exogenouse){
        if(!exogenouse || exogenouse.message){
            return res.send(500, {message: exogenouse.message});
        }

        return res.send({
            corporateTaxRate: exogenouse.exo_TaxRate * 100,
            inflationRate: exogenouse.exo_InflationRate * 100,
            depositRate: exogenouse.exo_DepositRate * 100,
            borrowingRate: exogenouse.exo_InterestRate * 100,
            additionalInvestmentBudgetSurchargeRate: exogenouse.exo_SurchargeRate * 100,
            inventoryHoldingCost: (exogenouse.exo_InterestRate + gameParameters.pgen.sku_StockHoldingCost) * 100,
            obsoleteGoodsCost: gameParameters.pgen.sku_ObsolescenceCost * 100,
            discontinuedGoodsCost: gameParameters.pgen.sku_DroppedCost * 100
        });
    })
}