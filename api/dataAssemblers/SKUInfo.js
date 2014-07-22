var Q = require('q');
var seminarModel = require('../models/seminar.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var utility = require('../../common/utility.js');
var consts = require('../consts.js');
var gameParameters = require('../gameParameters.js').parameters;
var simulationResultModel = require('../models/simulationResult.js');

exports.getSKUInfo = function(seminarId, currentPeriod, companyId, SKUID){
    return Q.all([
        simulationResultModel.findOne(seminarId, currentPeriod-1),
        SKUDecisionModel.findOne(seminarId, currentPeriod, companyId, SKUID.slice(0, 2), SKUID),
        brandDecisionModel.findOne(seminarId, currentPeriod, companyId, SKUID.slice(0, 2))
    ]).spread(function(lastPeriodResult, decision, brandDecision){
        var result = {
            currentPeriodInfo: {

            },
            previousPeriodInfo: {

            },
            expectedSales: {

            }
        };

        var companyResult = utility.findCompany(lastPeriodResult, companyId);
        var brandResult = utility.findBrand(lastPeriodResult, parseInt(SKUID.slice(0, 2)))
        var SKUResult = utility.findSKU(lastPeriodResult, parseInt(SKUID));

        //current period data
        var currentPeriodInfo = {};
        currentPeriodInfo.SKUName = brandResult.b_BrandName + SKUResult.u_SKUName;
        currentPeriodInfo.stocksAtFactory = [
            SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume,
            SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
        ];
        currentPeriodInfo.stocksAtWholsalers = [
            SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume,
            SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
        ];
        currentPeriodInfo.stocksAtRetailers = [
            SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume,
            SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume * consts.ActualSize[SKUResult.u_PackSize]
        ];


        //not sure if the last parameter is decision.d_ProductionVolume 
        return utility.unitCost(
                currentPeriod,
                SKUResult.u_PackSize,
                decision.d_IngredientsQuality,
                decision.d_Technology,
                companyResult.c_CumulatedProductionVolumes,
                companyResult.c_AcquiredEfficiency,
                decision.d_ProductionVolume)
        .then(function(unitProductionCost){
            currentPeriodInfo.unitProductionCost = [
                parseFloat((Math.ceil(unitProductionCost * 100) / 100).toFixed(2)), 
                parseFloat((Math.ceil(unitProductionCost / consts.ActualSize[SKUResult.u_PackSize] * 100) / 100).toFixed(2))
            ]; 
            //currentPeriodInfo.unitProductionCost = [parseFloat(unitProductionCost), parseFloat((unitProductionCost / consts.ActualSize[SKUResult.u_PackSize]))]; 
            
            //not sure if currentPeriodInfo.d_ConsumerPrice is the right value for that parameter
            var wholesalePrice = utility.unitPrice('WHOLESALERS', decision.d_ConsumerPrice);
            currentPeriodInfo.wholesalePrice = [parseFloat(wholesalePrice.toFixed(2)), parseFloat((wholesalePrice/consts.ActualSize[SKUResult.u_PackSize]).toFixed(2))];

            var recommendedConsumer = decision.d_FactoryPrice[0] * (gameParameters.pgen.wholesale_Markup + 1)
                * (1+ gameParameters.pgen.retail_Markup);
            currentPeriodInfo.recommendedConsumer = [parseFloat(recommendedConsumer.toFixed(2)), parseFloat((recommendedConsumer / consts.ActualSize[SKUResult.u_PackSize]).toFixed(2))];

            currentPeriodInfo.period = currentPeriod;

            result.currentPeriodInfo = currentPeriodInfo;

            //previous period data
            var previousPeriodInfo = {};
            previousPeriodInfo.marketSales = [
                parseFloat((SKUResult.u_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1] / consts.ActualSize[SKUResult.u_PackSize]).toFixed(2)),
                parseFloat(SKUResult.u_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1].toFixed(2))
            ];

            previousPeriodInfo.shipmentsToRetailers = [
                parseFloat((SKUResult.u_WholesalesVolume/consts.ActualSize[SKUResult.u_PackSize]).toFixed(2)),
                parseFloat(SKUResult.u_WholesalesVolume.toFixed(2))
            ];

            previousPeriodInfo.unitProductionCost = [
                parseFloat(SKUResult.u_ps_UnitCost.toFixed(2)),
                parseFloat((SKUResult.u_ps_UnitCost / consts.ActualSize[SKUResult.u_PackSize]).toFixed(2))
            ];

            previousPeriodInfo.averageConsumerPrice = [
                parseFloat((SKUResult.u_AverageNetMarketPrice * consts.ActualSize[SKUResult.u_PackSize]).toFixed(2)),
                parseFloat(SKUResult.u_AverageNetMarketPrice.toFixed(2))
            ];

            previousPeriodInfo.consumerCommunication = SKUResult.u_Advertising;
            previousPeriodInfo.consumerPromotions = SKUResult.u_ConsumerPromotions;
            previousPeriodInfo.period = currentPeriod - 1;

            result.previousPeriodInfo = previousPeriodInfo;


            // //expected sales
            var expectedSales = {};

            if(decision.d_RepriceFactoryStocks){
                expectedSales.expectedMaximalSales = (SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume
                + decision.d_ProductionVolume) * decision.d_FactoryPrice[0];
            }else{
                expectedSales.expectedMaximalSales = SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume 
                * SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_UnitPrice 
                + decision.d_ProductionVolume * decision.d_FactoryPrice[0];
            }

            expectedSales.expectedMaximalSales = parseFloat(expectedSales.expectedMaximalSales.toFixed(2));

            if(expectedSales.expectedMaximalSales > 0){
                expectedSales.expectedGrossMargin = (expectedSales.expectedMaximalSales 
                - (SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume 
                    * SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_UnitCost
                    + decision.d_ProductionVolume * decision.d_FactoryPrice[0]
                   )
                ) / expectedSales.expectedMaximalSales * 100;
            }else{
                expectedSales.expectedGrossMargin = 0;
            }
            

            expectedSales.expectedGrossMargin = parseFloat(expectedSales.expectedGrossMargin.toFixed(2));

            if(expectedSales.expectedMaximalSales > 0){
                //vVolumeWeight is like average packsize
                var vVolumeWeight = ((SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume 
                        * consts.ActualSize[SKUResult.u_PackSize]) 
                        + (decision.d_ProductionVolume * consts.ActualSize[SKUResult.u_PackSize]
                    )) / 
                    (brandResult.b_FactoryStocks[consts.StocksMaxTotal].s_Volume + decision.d_ProductionVolume);

                var vEMSVAdditionalTradeMarginCost = (((decision.d_ProductionVolume + SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume
                    + SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume
                    + SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume) 
                    * decision.d_ConsumerPrice * (decision.d_AdditionalTradeMargin * 0.01)) / expectedSales.expectedMaximalSales) 
                    * 100;

                var vEMSVWholesalesBonusCost = (
                        (decision.d_ProductionVolume + SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume)
                        * decision.d_FactoryPrice[0] 
                        * (decision.d_WholesalesBonusRate * 0.01)
                    ) / expectedSales.expectedMaximalSales * 100;
        
                var vEMSVGeneralExpenses = 3;

                expectedSales.expectedOperatingMargin = parseFloat((expectedSales.expectedGrossMargin 
                    - decision.d_Advertising / expectedSales.expectedMaximalSales * 100
                    - decision.d_PromotionalBudget / expectedSales.expectedMaximalSales * 100
                    - decision.d_TradeExpenses / expectedSales.expectedMaximalSales * 100
                    - brandDecision.d_SalesForce * vVolumeWeight / expectedSales.expectedMaximalSales
                    - vEMSVAdditionalTradeMarginCost
                    - vEMSVWholesalesBonusCost
                    - vEMSVGeneralExpenses).toFixed(2));
            }else{
                expectedSales.expectedOperatingMargin = 0;
            }


            result.expectedSales = expectedSales;

            return result;
        })
    });
}

























