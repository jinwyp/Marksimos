var Q = require('q');
var seminarModel = require('../models/marksimos/seminar.js');
var SKUDecisionModel = require('../models/marksimos/SKUDecision.js');
var brandDecisionModel = require('../models/marksimos/brandDecision.js');
var utility = require('../../common/utility.js');
var consts = require('../consts.js');
var gameParameters = require('../gameParameters.js').parameters;
var simulationResultModel = require('../models/marksimos/simulationResult.js');

exports.getSKUInfo = function(seminarId, currentPeriod, companyId, SKUID){
    if(typeof SKUID == 'number'){
        SKUID = SKUID.toString();
    }

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

        currentPeriodInfo.SKUName = brandDecision.d_BrandName + decision.d_SKUName;

        if(SKUResult){
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
        } else {
            currentPeriodInfo.stocksAtFactory = [0, 0];
            currentPeriodInfo.stocksAtWholsalers = [0, 0];
            currentPeriodInfo.stocksAtRetailers = [0, 0];
        }


        //not sure if the last parameter is decision.d_ProductionVolume 
        return utility.unitCost(
                currentPeriod,
                decision.d_PackSize,
                decision.d_IngredientsQuality,
                decision.d_Technology,
                companyResult.c_CumulatedProductionVolumes,
                companyResult.c_AcquiredEfficiency,
                decision.d_ProductionVolume)
        .then(function(unitProductionCost){
            currentPeriodInfo.unitProductionCost = [
                parseFloat((Math.ceil(unitProductionCost * 100) / 100).toFixed(2)), 
                parseFloat((Math.ceil(unitProductionCost / consts.ActualSize[decision.d_PackSize] * 100) / 100).toFixed(2))
            ]; 
            
            //not sure if currentPeriodInfo.d_ConsumerPrice is the right value for that parameter
            var wholesalePrice = utility.unitPrice('WHOLESALERS', decision.d_ConsumerPrice);
            currentPeriodInfo.wholesalePrice = [parseFloat(wholesalePrice.toFixed(2)), parseFloat((wholesalePrice/consts.ActualSize[decision.d_PackSize]).toFixed(2))];

            var recommendedConsumer = decision.d_FactoryPrice[0] * (gameParameters.pgen.wholesale_Markup + 1)
                * (1+ gameParameters.pgen.retail_Markup);                
            currentPeriodInfo.recommendedConsumer = [
                parseFloat(recommendedConsumer.toFixed(2)), 
                parseFloat((recommendedConsumer / consts.ActualSize[decision.d_PackSize]).toFixed(2))
            ];
            // currentPeriodInfo.recommendedConsumer = [
            //     parseFloat((Math.ceil(recommendedConsumer * 100) / 100).toFixed(2)), 
            //     parseFloat((Math.ceil(recommendedConsumer / consts.ActualSize[SKUResult.u_PackSize] * 100) / 100).toFixed(2))
            // ];

            currentPeriodInfo.period = currentPeriod;

            result.currentPeriodInfo = currentPeriodInfo;

            //previous period data
            var previousPeriodInfo = {};

            if(SKUResult){
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
            } else {
                previousPeriodInfo.marketSales = ['/', '/'];
                previousPeriodInfo.shipmentsToRetailers = ['/', '/'];
                previousPeriodInfo.unitProductionCost = ['/', '/'];
                previousPeriodInfo.averageConsumerPrice = ['/', '/'];
                previousPeriodInfo.consumerCommunication = '/';
                previousPeriodInfo.consumerPromotions = '/';                

            }
            previousPeriodInfo.period = currentPeriod - 1;
            result.previousPeriodInfo = previousPeriodInfo;


            // //expected sales
            var expectedSales = {};

            if(!SKUResult){
                SKUResult = {};
                SKUResult.u_ps_FactoryStocks = [];
                SKUResult.u_ps_WholesaleStocks = [];
                SKUResult.u_ps_RetailStocks = [];                
                for (var i = 0; i < 6; i++) {
                    SKUResult.u_ps_FactoryStocks.push({s_ps_Volume: 0, s_ps_UnitPrice: 0, s_ps_UnitCost : 0});                                
                    SKUResult.u_ps_WholesaleStocks.push({s_ps_Volume:0});
                    SKUResult.u_ps_RetailStocks.push({s_ps_Volume:0});
                };
                SKUResult.u_PackSize = 1;
            } 

            if(!brandResult){
                brandResult = {};
                brandResult.b_FactoryStocks = [];
                for (var i = 0; i < 6; i++) {
                    brandResult.b_FactoryStocks.push({s_Volume:0});
                };                
            }

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
                    + decision.d_ProductionVolume * unitProductionCost
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

























