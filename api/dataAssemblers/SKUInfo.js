var Q = require('q');
var seminarModel = require('../models/seminar.js');
var decisionAssembler = require('./decision.js');

exports.getSKUInfo = function(seminarId, period, companyId, SKUID){
    Q.all([
        seminarModel.findOne(seminarId),
        decisionAssembler.getDecision(seminarId, period, companyId)
    ])
    .spread(function(seminar, decision)){
        var allResults = seminar.allResults;

        var result = {
            SKUInfo: []
            ExpectedSales: {

            }
        };

        var lastPeriodResult = allResults[allResults.length-1];

        lastPeriodResult.p_SKUs.forEach(function(SKUResult){
            var SKUInfo = {};
            SKUInfo.stocksAtFactory = [
                SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume,
                SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
            ];
            SKUinfi.stocksAtWholsalers = [
                SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume,
                SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
            ];
            SKUinfi.stocksAtRetailers = [
                SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume,
                SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
            ];

            SKUinfi.unitProductionCost = ;
            SKUinfi.wholesalePrice = ;
            SKUinfi.recommendedConsumer = ;
        })
    }
}