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

    var chartTool = function(chartHttpData, decimalNumber){

        chartResult.series = [];
        chartResult.data = [];


        if(angular.isArray(chartHttpData)){
            angular.forEach(chartHttpData, function(value, key) {
                if(chartResult.series.indexOf(value.SKUName.substring(0,1)) == -1 ){
                    chartResult.series.push(value.SKUName.substring(0,1));
                }
            });

            angular.forEach(chartHttpData, function(value, key) {
                var oneBarData = {
                    x : value.SKUName, //Round Name
                    y : []
                };

                var index = chartResult.series.indexOf(value.SKUName.substring(0,1));
                // 插入空数据占位
                if( index !== -1){
                    for (var i = 0; i <= index; i++) {
                        if(i == index){
                            oneBarData.y.push(Math.round(value.valueSegmentShare * 10000) / Math.pow(10, Number(decimalNumber) ) );
                        }else{
                            oneBarData.y.push(0);
                        }
                    }
                }

                chartResult.data.push(oneBarData);
            });


            return angular.copy(chartResult);

        }else if(angular.isObject(chartHttpData) ){

            if(angular.isArray(chartHttpData.periods)){

                angular.forEach(chartHttpData.periods, function(value, key) {

                    var oneLineData = {
                        x : value.toString(), //Round Name
                        y : angular.copy(chartHttpData.chartData[key])
                    };

                    angular.forEach(oneLineData.y, function(value, key) {
                        if(decimalNumber == 0){
                            oneLineData.y[key] = Math.round(value);
                        }else{
                            oneLineData.y[key] = Math.round(value * 10000 )/Math.pow(10, Number(decimalNumber));
                        }
                    });

                    chartResult.data.push(oneLineData);
                });


                if(angular.isUndefined(chartHttpData.companyNames)){
                    chartResult.series = chartHttpData.segmentNames;
                }else{
                    chartResult.series = chartHttpData.companyNames;
                }


                return angular.copy(chartResult);
            }else{

                // pie chart
                angular.forEach(chartHttpData.segmentNames, function(value, key) {

                    var onePieData = {
                        x : value, //Round Name
                        y : chartHttpData.chartData[key]
                    };

//                    onePieData.y =  Math.round(chartHttpData.chartData[key] * 10000 )/Math.pow(10, Number(decimalNumber)) ;

                    chartResult.data.push(onePieData);
                });
                console.log(chartResult);

                if(angular.isUndefined(chartHttpData.companyNames)){
                    chartResult.series = chartHttpData.segmentNames;
                }else{
                    chartResult.series = chartHttpData.companyNames;
                }


                return angular.copy(chartResult);
            }

        }else{
            console.log('chart Data format is wrong !');
            return '';
        }
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

        // Chart A1
        marketShareInValue : function(){
            return $http.get(apiPath + 'chart/market_share_in_value').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        marketShareInVolume : function(){
            return $http.get(apiPath + 'chart/market_share_in_volume').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        mindSpaceShare : function(){
            return $http.get(apiPath + 'chart/mind_space_share').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        shelfSpaceShare : function(){
            return $http.get(apiPath + 'chart/shelf_space_share').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },


        // Chart B3
        totalInvestment : function(){
            return $http.get(apiPath + 'chart/total_investment').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        netProfitByCompanies : function(){
            return $http.get(apiPath + 'chart/net_profit_by_companies').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        returnOnInvestment : function(){
            return $http.get(apiPath + 'chart/return_on_investment').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        investmentsVersusBudget : function(){
            return $http.get(apiPath + 'chart/investments_versus_budget').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },


        // Chart B4
        marketSalesValue : function(){
            return $http.get(apiPath + 'chart/market_sales_value').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        marketSalesVolume : function(){
            return $http.get(apiPath + 'chart/market_sales_volume').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        totalInventoryAtFactory : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_factory').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        totalInventoryAtTrade : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_trade').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },


        // Chart C1
        segmentsLeadersByValuePriceSensitive : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_price_sensitive').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        segmentsLeadersByValuePretenders : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_pretenders').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        segmentsLeadersByValueModerate : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_moderate').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        segmentsLeadersByValueGoodLife : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_good_life').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        segmentsLeadersByValueUltimate : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_ultimate').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },

        segmentsLeadersByValuePragmatic : function(){
            return $http.get(apiPath + 'chart/segments_leaders_by_value_pragmatic').then(function(result){
//                console.log(result.data);

                return chartTool(result.data, 2);
            });
        },


        // Chart C4
        growthRateInVolume : function(){
            return $http.get(apiPath + 'chart/growth_rate_in_volume').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        growthRateInValue : function(){
            return $http.get(apiPath + 'chart/growth_rate_in_value').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        netMarketPrice : function(){
            return $http.get(apiPath + 'chart/net_market_price').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        segmentValueShareTotalMarket : function(){
            return $http.get(apiPath + 'chart/segment_value_share_total_market').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        }





    };

    return factory;


});