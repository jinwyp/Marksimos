/**
 * Created by jinwyp on 5/29/14.
 */


var app = angular.module('marksimos.factory', []);

app.factory('currentUser', function(){

    var factory = {};

    var user = {
        name : 'aaa',
        company : 'Company A'
    };

    var seminar ={
        currentRound : -3, // -3,-2, -1, 0, 1, 2, 3, 4, 5, 6
        companylist : []
    };

    return factory;
});




app.factory('company',function($http){

    var apiPath = '/api/';

    var factory = {
        getCompany : function(){
            return $http.get(apiPath + 'company').then(function(result){
//                console.log(result.data);

                return result.data;
            }, function(err){
                console.log(err);
            });
        },
        getCompanyOtherInfo : function(){
            return $http.get(apiPath + 'company/otherinfo').then(function(result){
//                console.log(result.data);

                return result.data;
            }, function(err){
                console.log(err);
            });
        },
        getCompanyFutureProjectionCalculator : function(id){
            return $http.get(apiPath + 'future_projection_calculator/' + id).then(function(result){
//                console.log(result.data);

                return result.data;
            }, function(err){
                console.log(err);
            });
        },
        getCompanyProductPortfolio : function(){
            return $http.get(apiPath + 'product_portfolio').then(function(result){
//                console.log(result.data);

                return result.data;
            }, function(err){
                console.log(err);
            });
        },
        getCompanySpendingDetails : function(){
            return $http.get(apiPath + 'spending_details').then(function(result){
//                console.log(result.data);

                return result.data;
            }, function(err){
                console.log(err);
            });
        },

        updateSku : function(postdata){
            return $http.put(apiPath + 'sku/decision/', postdata);
        }

    };


    return factory;
});




app.factory('chartReport',function($http){

    var apiPath = '/api/';

    var chartResult = {
        series: [],
        data: []
    };


    var chartConfig1 = {
        title: '',
        tooltips: true,
        labels: false,
        legend: {
            display: true,
            position: 'left' //could be 'left, right'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'lineEnd' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
//        mouseover: function() {},
//        mouseout: function() {},
//        click: function() {}
    };

    var chartConfig2 = {
        title: '',
        tooltips: true,
        labels: false,
        legend: {
            display: true,
            position: 'right' //could be 'left, right'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'traditional' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
//        mouseover: function() {},
//        mouseout: function() {},
//        click: function() {}
    };

    var chartConfig3 = {
        title: '',
        tooltips: true,
        labels: false,
        legend: {
            display: true,
            position: 'right' //could be 'left, right'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'traditional' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
//        mouseover: function() {},
//        mouseout: function() {},
//        click: function() {}
    };




    var chartFormatTool1 = function(chartHttpData, decimalNumber){
        // 使用angular-chart 插件的数据格式

        chartResult.series = [];
        chartResult.data = [];

        if(angular.isUndefined(chartHttpData.periods)){
            // 如果periods 没有定义则是普通的图表,不带有系列的图表
            angular.forEach(chartHttpData.chartData, function(value, key) {
                if(angular.isUndefined(value.segmentName)){
                    // 判断是否是消费者segmentName的图表还是SKUName的图表

                    if(chartResult.series.indexOf(value.SKUName.substring(0,1)) == -1 ){
                        chartResult.series.push(value.SKUName.substring(0,1));
                    }
                }else{
                    chartResult.series.push(value.segmentName);
                }
            });

            angular.forEach(chartHttpData.chartData, function(value, key) {
                var oneBarData = {
                    x : 0, //Round Name
                    y : []
                };

                if(angular.isUndefined(value.segmentName) ){
                    oneBarData.x = value.SKUName;

                    var index = chartResult.series.indexOf(value.SKUName.substring(0,1));
                    // 插入空数据占位, 用来显示不同颜色
                    if( index !== -1){

                        for (var i = 0; i <= index; i++) {
                            if(i == index){
                                if(decimalNumber === 0){
                                    oneBarData.y.push(Math.round(value.valueSegmentShare * 100) / 100 );
                                }else{
                                    oneBarData.y.push(Math.round(value.valueSegmentShare * 10000) / Math.pow(10, Number(decimalNumber)) );
                                }

                            }else{
                                oneBarData.y.push(0);
                            }
                        }
                    }

                }else{
                    oneBarData.x = value.segmentName;

                    if(decimalNumber === 0){
                        oneBarData.y.push(Math.round(value.value * 100) / 100 );
                    }else{
                        oneBarData.y.push( Math.round(value.value * 10000) / Math.pow(10, Number(decimalNumber)) );
                    }
                }

                chartResult.data.push(oneBarData);
            });


            return angular.copy(chartResult);


        }else if(angular.isArray(chartHttpData.periods) ){
            // 如果periods 有定义 则是带有系列的图表
            angular.forEach(chartHttpData.periods, function(value, key) {

                var oneLineData = {
                    x : "period" + value.toString(), //Round Name
                    y : angular.copy(chartHttpData.chartData[key])
                };

                angular.forEach(oneLineData.y, function(value, key) {
                    if(decimalNumber === 0){
                        oneLineData.y[key] = Math.round(value * 100) / 100;
                    }else{
                        oneLineData.y[key] = Math.round(value * 10000 )/Math.pow(10, Number(decimalNumber));
                    }
                });

                chartResult.data.push(oneLineData);
            });

            // 判断是 company的图表还是 消费者群体的图表
            if(angular.isUndefined(chartHttpData.companyNames)){
                chartResult.series = chartHttpData.segmentNames;
            }else{
                chartResult.series = chartHttpData.companyNames;
            }


            return angular.copy(chartResult);

        }else{
            console.log('chart Data format is wrong !');
            return '';
        }
    };

    var chartFormatTool2 = function(chartHttpData) {
        // 使用angular-nvd3 插件的数据格式 Stacked Multi Bar Chart

        chartResult.series = [];
        chartResult.data = [];


        if(angular.isArray(chartHttpData.SKUs) ){
            angular.forEach(chartHttpData.SKUs[0].inventoryData, function(value, key) {
                var oneSeries = {
                    "key": value.inventoryName,
                    "values": []
                };
                chartResult.data.push(oneSeries);
                chartResult.series.push(value.inventoryName);
            });

            angular.forEach(chartHttpData.SKUs, function(value, key) {

                var oneLineData1 = []; // CloseToEXpireInventory
                oneLineData1.push( value.SKUName );
                oneLineData1.push( angular.copy(Math.round(value.inventoryData[0].inventoryValue * 100) / 100 ) );

                var oneLineData2 = []; // PreviousInventory
                oneLineData2.push( value.SKUName );
                oneLineData2.push( angular.copy(Math.round(value.inventoryData[1].inventoryValue * 100) / 100 ) );

                var oneLineData3 = []; // FreshInventory
                oneLineData3.push( value.SKUName );
                oneLineData3.push( angular.copy(Math.round(value.inventoryData[2].inventoryValue * 100) / 100 ) );

                chartResult.data[0].values.push(oneLineData1);
                chartResult.data[1].values.push(oneLineData2);
                chartResult.data[2].values.push(oneLineData3);

            });
            return angular.copy(chartResult.data);
        }
    };

    var chartFormatTool3 = function(chartHttpData) {
        // 使用angular-nvd3 插件的数据格式   Scatter Chart 散点图
        chartResult.series = [];
        chartResult.data = [];
        chartResult.dataSKU = [];
        chartResult.dataBrand = [];

        if(angular.isArray(chartHttpData) ){

            angular.forEach(chartHttpData, function(value, key) {
                var oneCompanySku = {
                    "key" : value.companyName,
                    "values" : []
                };

                var oneCompanyBrand = {
                    "key" : value.companyName,
                    "values" : []
                };

                angular.forEach(value.SKUs, function(valueSku, keySku) {
                    var oneLineSku1 = {
                        'x' : Math.round(valueSku.valuePerception * 100) / 100,
                        'y' : Math.round(valueSku.imagePerception * 100) / 100,
                        'size' : 0.6,
                        'SKUName' : valueSku.SKUName,
                        'name' : valueSku.SKUName,
                        'CompanyName' : value.companyName,
                        'tooltips' : valueSku.tooltips,
                        'shape' : 'circle'
                    };

                    oneCompanySku.values.push(oneLineSku1);
                });

                angular.forEach(value.brands, function(valueBrand, keyBrand) {
                    var oneLineBrand1 = {
                        'x' : Math.round(valueBrand.valuePerception * 100) / 100,
                        'y' : Math.round(valueBrand.imagePerception * 100) / 100,
                        'size' : 0.6,
                        'BrandName' : valueBrand.brandName,
                        'name' : valueBrand.brandName,
                        'CompanyName' : value.companyName,
                        'tooltips' : [],
                        'shape' : 'circle'
                    };

                    oneCompanyBrand.values.push(oneLineBrand1);
                });

                chartResult.dataSKU.push(oneCompanySku);
                chartResult.dataBrand.push(oneCompanyBrand);
            });

            var oneSegment = {
                "key" : 'Segment',
                "values" : []
            };

            angular.forEach(chartHttpData[0].exogenous, function(value, key) {
                var oneLineData = {
                    'x' : Math.round(value.valuePerception * 100) / 100,
                    'y' : Math.round(value.imagePerception * 100) / 100,
                    'size' : 0.5,
                    'name' : key + ' ' + value.segmentName,
                    'tooltips' : [],
                    'shape' : 'diamond'
                };

                oneSegment.values.push(oneLineData);
            });

            chartResult.dataSKU.push(oneSegment);
            chartResult.dataBrand.push(oneSegment);

            return angular.copy(chartResult);
        }
    };

    var factory = {

        getChartConfig1 : function(){
            return angular.copy(chartConfig1);
        },
        getChartConfig2 : function(){
            return angular.copy(chartConfig2);
        },
        getChartConfig3 : function(){
            return angular.copy(chartConfig3);
        },

        // Chart A1
        marketShareInValue : function(){
            return $http.get(apiPath + 'chart/market_share_in_value').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            }, function(err){
                console.log(err);
            });
        },

        marketShareInVolume : function(){
            return $http.get(apiPath + 'chart/market_share_in_volume').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        mindSpaceShare : function(){
            return $http.get(apiPath + 'chart/mind_space_share').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        shelfSpaceShare : function(){
            return $http.get(apiPath + 'chart/shelf_space_share').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },


        // Chart A3
        inventoryReport : function(){
            return $http.get(apiPath + 'chart/inventory_report').then(function(result){
//                console.log(result.data);

                return chartFormatTool2(result.data);
            });
        },


        // Chart B3
        totalInvestment : function(){
            return $http.get(apiPath + 'chart/total_investment').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        netProfitByCompanies : function(){
            return $http.get(apiPath + 'chart/net_profit_by_companies').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        returnOnInvestment : function(){
            return $http.get(apiPath + 'chart/return_on_investment').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        investmentsVersusBudget : function(){
            return $http.get(apiPath + 'chart/investments_versus_budget').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },


        // Chart B4
        marketSalesValue : function(){
            return $http.get(apiPath + 'chart/market_sales_value').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        marketSalesVolume : function(){
            return $http.get(apiPath + 'chart/market_sales_volume').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        totalInventoryAtFactory : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_factory').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        totalInventoryAtTrade : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_trade').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },


        // Chart C1
        segmentsLeadersByValuePriceSensitive : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_price_sensitive').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        segmentsLeadersByValuePretenders : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_pretenders').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        segmentsLeadersByValueModerate : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_moderate').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        segmentsLeadersByValueGoodLife : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_good_life').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        segmentsLeadersByValueUltimate : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_ultimate').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },

        segmentsLeadersByValuePragmatic : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_pragmatic').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        },


        // Chart C2
        perceptionMap : function(){
            return $http.get(apiPath + 'chart/perception_map').then(function(result){
//                console.log(result.data);

                return chartFormatTool3(result.data);
            });
        },


        // Chart C4
        growthRateInVolume : function(){
            return $http.get(apiPath + 'chart/growth_rate_in_volume').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        growthRateInValue : function(){
            return $http.get(apiPath + 'chart/growth_rate_in_value').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        netMarketPrice : function(){
            return $http.get(apiPath + 'chart/net_market_price').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 0);
            });
        },

        segmentValueShareTotalMarket : function(){
            return $http.get(apiPath + 'chart/segment_value_share_total_market').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
            });
        }



    };

    return factory;


});




app.factory('tableReport',function($http){

    var apiPath = '/api/';

    var tableResult = {
        series: [],
        data: []
    };


    var factory = {


        // Table Report A1
        companyStatus : function(){
            return $http.get(apiPath + 'report/company_status').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        },

        // Table Report A2
        financialReport : function(){
            return $http.get(apiPath + 'report/financial_report').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        },

        // Table Report B2
        profitabilityEvolution : function(){
            return $http.get(apiPath + 'report/profitability_evolution').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        },

        // Table Report B2
        competitorIntelligence : function(){
            return $http.get(apiPath + 'report/competitor_intelligence').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        },

        // Table Report C3
        segmentDistribution : function(){
            return $http.get(apiPath + 'report/segment_distribution').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        },

        // Table Report C5
        marketTrends : function(){
            return $http.get(apiPath + 'report/market_trends').then(function(result){
//                console.log(result.data);

                return result.data;
            }).catch(function(err){
                console.log(err);
            });
        }
    };

    return factory;


});