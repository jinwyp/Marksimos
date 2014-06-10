/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', ['angularCharts', 'nvd3ChartDirectives', 'marksimos.component', 'marksimos.factory' ]);



// controller business logic
marksimosapp.controller('chartController', function AppCtrl ($scope,  $timeout, $http, report, company) {

    $scope.css = {
        menu : 'Report',
        chartMenu : 'A3',
        additionalBudget : true,
        currentBrandId : 0,
        investmentInfo : false
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


        $scope.exampleData = [
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

    $scope.data = {
        currentCompany : {},
        currentBrand : {},
        updateSku : {},
        userSegment : [
            {id:1, name:'1 Price Sensitive'},
            {id:2, name:'2 Pretenders'},
            {id:3, name:'3 Moderate'},
            {id:4, name:'4 Good Life'},
            {id:5, name:'5 Ultimate'},
            {id:6, name:'6 Pragmatic'}
        ],
        chartA11MarketShareInValue : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartA12MarketShareInVolume : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartA13MindSpaceShare : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartA14ShelfSpaceShare : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartB31TotalInvestment : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB32NetProfitByCompanies : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB33ReturnOnInvestment : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB34InvestmentsVersusBudget : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartB41MarketSalesValue : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB42MarketSalesVolume : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB43TotalInventoryAtFactory : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB44TotalInventoryAtTrade : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartC11SegmentsLeadersByValuePriceSensitive : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC12SegmentsLeadersByValuePretenders : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC13SegmentsLeadersByValueModerate : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC14SegmentsLeadersByValueGoodLife : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC15SegmentsLeadersByValueUltimate : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC16SegmentsLeadersByValuePragmatic : {
            type : report.getChartType2(),
            config : report.getChartConfig2(),
            data : $scope.dataChartSimple
        },

        chartC41GrowthRateInVolume : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC42GrowthRateInValue : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC43NetMarketPrice : {
            type : report.getChartType1(),
            config : report.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC44SegmentValueShareTotalMarket : {
            type : report.getChartType3(),
            config : report.getChartConfig3(),
            data : $scope.dataChartSimple
        }

    };


    company.getCompany().then(function(data, status, headers, config){
        console.log(data);
        $scope.data.currentCompany = data;
        $scope.css.currentBrandId = $scope.data.currentCompany.d_BrandsDecisions[0]._id;
        $scope.data.currentBrand = $scope.data.currentCompany.d_BrandsDecisions[0];

    });

    $scope.clickBrand = function(brand){
        $scope.css.currentBrandId = brand._id;
        $scope.data.currentBrand = brand;
    };

    $scope.leaveSkuInput = function(sku, fieldname, fielddata, week, weekindex){
        $scope.data.updateSku = {
            brand_id : sku.d_BrandID,
            sku_id : sku.d_SKUID,
            sku_data : {}
        };
        $scope.data.updateSku.sku_data[fieldname] = fielddata;
        if(!angular.isUndefined(weekindex)){
            // 针对d_PromotionalEpisodes 字段需要特殊处理
            $scope.data.updateSku.sku_data[fieldname][weekindex] = week;
        }
        console.log($scope.data.updateSku, sku);

        company.updateSku($scope.data.updateSku).success(function(data, status, headers, config){
            console.log(data);
        });
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
//        console.log(data);
        $scope.data.chartB41MarketSalesValue.data = data;
    });
    report.marketSalesVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB42MarketSalesVolume.data = data;
    });
    report.totalInventoryAtFactory().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB43TotalInventoryAtFactory.data = data;
    });
    report.totalInventoryAtTrade().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB44TotalInventoryAtTrade.data = data;
    });


    // Chart C1
    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.config.title = 'Price Sensitive (%)';
    $scope.data.chartC12SegmentsLeadersByValuePretenders.config.title = 'Pretenders (%)';
    $scope.data.chartC13SegmentsLeadersByValueModerate.config.title = 'Moderate (%)';
    $scope.data.chartC14SegmentsLeadersByValueGoodLife.config.title = 'GoodLife (%)';
    $scope.data.chartC15SegmentsLeadersByValueUltimate.config.title = 'Ultimate (%)';
    $scope.data.chartC16SegmentsLeadersByValuePragmatic.config.title = 'Pragmatic (%)';

    report.segmentsLeadersByValuePriceSensitive().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = data;
    });
    report.segmentsLeadersByValuePretenders().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC12SegmentsLeadersByValuePretenders.data = data;
    });
    report.segmentsLeadersByValueModerate().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC13SegmentsLeadersByValueModerate.data = data;
    });
    report.segmentsLeadersByValueGoodLife().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = data;
    });
    report.segmentsLeadersByValueUltimate().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC15SegmentsLeadersByValueUltimate.data = data;
    });
    report.segmentsLeadersByValuePragmatic().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = data;
    });


    // Chart C4
    $scope.data.chartC41GrowthRateInVolume.config.title = 'Growth Rate In Volume (Period 3 = 100)';
    $scope.data.chartC42GrowthRateInValue.config.title = 'Growth Rate In Value (Period 3 = 100)';
    $scope.data.chartC43NetMarketPrice.config.title = 'Net Market Price (Period 3 = 100)';
    $scope.data.chartC44SegmentValueShareTotalMarket.config.title = 'Segment Value Share In Total Market (%)';

    report.growthRateInVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC41GrowthRateInVolume.data = data;
    });
    report.growthRateInValue().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC42GrowthRateInValue.data = data;
    });
    report.netMarketPrice().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC43NetMarketPrice.data = data;
    });
    report.segmentValueShareTotalMarket().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC44SegmentValueShareTotalMarket.data = data;
    });





    /********************  切换左部图标菜单  ********************/
    $scope.clickChartMenu = function(chart){
        $scope.css.menu = 'Report';
        $scope.css.chartMenu = chart;
    };


    /********************  切换顶部菜单  ********************/
    $scope.switchHeaderMenu = function(menu){
        $scope.css.menu = menu;
    };



});

