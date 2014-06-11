/**
 * Created by jinwyp on 5/29/14.
 */


var app = angular.module('marksimos.factory', []);

app.factory('currentUser',function(){

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
            return $http.get(apiPath + 'companydata').then(function(result){
//                console.log(result.data);

                return result.data.companyDecision;
            });
        },
        updateSku : function(postdata){
            return $http.post(apiPath + 'sku/decision/', postdata);
        }
    };


    return factory;
});




app.factory('report',function($http){

    var apiPath = '/api/';

    var chartResult = {
        series: [],
        data: []
    };

    var chartType1 = 'line';  //'pie', 'bar', 'line', 'point', 'area'
    var chartType2 = 'bar';  //'pie', 'bar', 'line', 'point', 'area'
    var chartType3 = 'pie';  //'pie', 'bar', 'line', 'point', 'area'

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
            display: false,
            position: 'left' //could be 'left, right'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'lineEnd' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
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
                    x : value.toString(), //Round Name
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

    var exampleData = [
        {
            "key": "Series 1",
            "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
        },
        {
            "key": "Series 2",
            "values": [ [ 1025409600000 , 0] , [ 1028088000000 , 0] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 0] , [ 1051675200000 , 0] , [ 1054353600000 , 0] , [ 1056945600000 , 0] , [ 1059624000000 , 0] , [ 1062302400000 , 0] , [ 1064894400000 , 0] , [ 1067576400000 , 0] , [ 1070168400000 , 0] , [ 1072846800000 , 0] , [ 1075525200000 , -0.049184266875945] ]
        },
        {
            "key": "Series 3",
            "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
        },
        {
            "key": "Series 4",
            "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
        }
    ];
    var chartFormatTool2 = function(chartHttpData, decimalNumber) {
        // 使用angular-nvd3 插件的数据格式

        chartResult.series = [];
        chartResult.data = [];

        angular.forEach(chartHttpData.SKUs, function(value, key) {

            var oneLineData = {
                key : value.SKUName, //Round Name
                values : angular.copy(chartHttpData.chartData[key])
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

    };



    var factory = {

        getChartType1 : function(){
            return angular.copy(chartType1);
        },
        getChartType2 : function(){
            return angular.copy(chartType2);
        },
        getChartType3 : function(){
            return angular.copy(chartType3);
        },
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
                console.log(result.data);

                return chartFormatTool2(result.data, 2);
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

                return chartFormatTool1(result.data, 2);
            });
        },

        investmentsVersusBudget : function(){
            return $http.get(apiPath + 'chart/investments_versus_budget').then(function(result){
//                console.log(result.data);

                return chartFormatTool1(result.data, 2);
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