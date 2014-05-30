/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', ['angularCharts', 'marksimos.component', 'marksimos.factory' ]);



// controller business logic
marksimosapp.controller('chartController', function AppCtrl ($scope,  $timeout, $http, report) {

    $scope.css = {
        menu : 'Report',
        chartMenu : 'A1'
    };


    $scope.dataChartSimple = {
        series: ['A', 'B', 'C'],
        data : [
            {
                x : "Round 1",
                y: [100,500, 1000],
                tooltip:"this is tooltip"
            }
        ]
    };


    $scope.data = {
        chartA11MarketShareInValue : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartA12MarketShareInVolume : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartA13MindSpaceShare : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartA14ShelfSpaceShare : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },

        chartB31TotalInvestment : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB32NetProfitByCompanies : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB33ReturnOnInvestment : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB34InvestmentsVersusBudget : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },

        chartB41MarketSalesValue : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB42MarketSalesVolume : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB43TotalInventoryAtFactory : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        },
        chartB44TotalInventoryAtTrade : {
            type : report.getChartType(),
            config : report.getChartConfig(),
            data : $scope.dataChartSimple
        }
    };

    // Chart A1
    $scope.data.chartA11MarketShareInValue.config.title = 'Market Share in Value (%)';
    $scope.data.chartA12MarketShareInVolume.config.title = 'Market Share in Volume (%)';
    $scope.data.chartA13MindSpaceShare.config.title = 'Mind Space Share (%)';
    $scope.data.chartA14ShelfSpaceShare.config.title = 'Shelf Space Share(%)';

    report.marketShareInValue().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartA11MarketShareInValue.data = data;
    });
    report.marketShareInVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartA12MarketShareInVolume.data = data;
    });
    report.mindSpaceShare().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartA13MindSpaceShare.data = data;
    });
    report.shelfSpaceShare().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartA14ShelfSpaceShare.data = data;
    });


    // Chart B3
    $scope.data.chartB31TotalInvestment.config.title = 'Total Investment (mln RMB)';
    $scope.data.chartB32NetProfitByCompanies.config.title = 'Net Profit By Companies (mln RMB)';
    $scope.data.chartB33ReturnOnInvestment.config.title = 'Return On Investment (%)';
    $scope.data.chartB34InvestmentsVersusBudget.config.title = 'Investments Versus Budget (%)';

    report.totalInvestment().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB31TotalInvestment.data = data;
    });
    report.netProfitByCompanies().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB32NetProfitByCompanies.data = data;
    });
    report.returnOnInvestment().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB33ReturnOnInvestment.data = data;
    });
    report.investmentsVersusBudget().then(function(data, status, headers, config){
//        console.log(data);
//        $scope.data.chartB34InvestmentsVersusBudget.data = data;
    });


    // Chart B4
    $scope.data.chartB41MarketSalesValue.config.title = 'Market Sales Value (mln RMB)';
    $scope.data.chartB42MarketSalesVolume.config.title = 'Market Sales Volume (std pack)';
    $scope.data.chartB43TotalInventoryAtFactory.config.title = 'Total Inventory At Factory (std pack)';
    $scope.data.chartB44TotalInventoryAtTrade.config.title = 'Total Inventory At Trade (std pack)';

    report.marketSalesValue().then(function(data, status, headers, config){
        console.log(data);
        $scope.data.chartB41MarketSalesValue.data = data;
    });
    report.marketSalesVolume().then(function(data, status, headers, config){
        console.log(data);
        $scope.data.chartB42MarketSalesVolume.data = data;
    });
    report.totalInventoryAtFactory().then(function(data, status, headers, config){
        console.log(data);
        $scope.data.chartB43TotalInventoryAtFactory.data = data;
    });
    report.totalInventoryAtTrade().then(function(data, status, headers, config){
        console.log(data);
        $scope.data.chartB44TotalInventoryAtTrade.data = data;
    });







    /********************  切换左部图标菜单  ********************/
    $scope.clickChartMenu = function(chart){
        $scope.css.menu = 'Report'
        $scope.css.chartMenu = chart;
    };


    /********************  切换顶部菜单  ********************/
    $scope.switchHeaderMenu = function(menu){
        $scope.css.menu = menu;
    };





});

