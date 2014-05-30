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

    var chartTool = function(chartHttpData, decimalNumber){
        if(angular.isObject(chartHttpData) ){
            if(angular.isArray(chartHttpData.periods)){

                chartResult.series = [];
                chartResult.data = [];

                angular.forEach(chartHttpData.periods, function(value, key) {

                    var oneLineData = {
                        x : "", //Round Name
                        y : []
                    };

                    oneLineData.x = value.toString();
                    oneLineData.y = angular.copy(chartHttpData.chartData[key]);

                    angular.forEach(oneLineData.y, function(value, key) {
                        if(decimalNumber == 0){
                            oneLineData.y[key] = Math.round(value);
                        }else{
                            oneLineData.y[key] = Math.round(value * 10000 )/Math.pow(10, Number(decimalNumber));
                        }

                    });

                    chartResult.data.push(oneLineData);
                });

                chartResult.series = chartHttpData.companyNames;

                return angular.copy(chartResult);
            }

        }else{
            alert('chart Data format is wrong !');
            return '';
        }
    };



    var factory = {
        getChartType : function(){
            return angular.copy(chartType1);
        },
        getChartConfig : function(){
            return angular.copy(chartConfig1);
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
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        marketSalesVolume : function(){
            return $http.get(apiPath + 'chart/market_sales_volume').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        totalInventoryAtFactory : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_factory').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        },

        totalInventoryAtTrade : function(){
            return $http.get(apiPath + 'chart/total_inventory_at_trade').then(function(result){
                console.log(result.data);

                return chartTool(result.data, 0);
            });
        }





    };

    return factory;


});