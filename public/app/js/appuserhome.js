/**
 * Created by jinwyp on 4/28/14.
 */


// create module for custom directives
var marksimosapp = angular.module('marksimos', ['pascalprecht.translate', 'angularCharts', 'nvd3ChartDirectives', 'cgNotify',  'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter', 'marksimos.translation' ]);




// controller business logic
marksimosapp.controller('chartController', ['$translate', '$scope', '$rootScope', '$timeout', '$http', 'notify', 'chartReport', 'tableReport', 'Company', function($translate, $scope, $rootScope, $timeout, $http, notify, chartReport, tableReport, Company) {
    $rootScope.$on('$translateChangeSuccess', function () {
        $translate(['HomePageSegmentLabelPriceSensitive', 'HomePageSegmentLabelPretenders', 'HomePageSegmentLabelModerate',
            'HomePageSegmentLabelGoodLife', 'HomePageSegmentLabelUltimate', 'HomePageSegmentLabelPragmatic']).then(function (translations) {
            $scope.data.userSegment = [
                {id:1, name: translations.HomePageSegmentLabelPriceSensitive},
                {id:2, name: translations.HomePageSegmentLabelPretenders},
                {id:3, name: translations.HomePageSegmentLabelModerate},
                {id:4, name: translations.HomePageSegmentLabelGoodLife},
                {id:5, name: translations.HomePageSegmentLabelUltimate},
                {id:6, name: translations.HomePageSegmentLabelPragmatic}
            ];
        });
    });

    $translate(['HomePageSegmentLabelPriceSensitive', 'HomePageSegmentLabelPretenders', 'HomePageSegmentLabelModerate',
        'HomePageSegmentLabelGoodLife', 'HomePageSegmentLabelUltimate', 'HomePageSegmentLabelPragmatic']).then(function (translations) {
        $scope.data.userSegment = [
            {id:1, name: translations.HomePageSegmentLabelPriceSensitive},
            {id:2, name: translations.HomePageSegmentLabelPretenders},
            {id:3, name: translations.HomePageSegmentLabelModerate},
            {id:4, name: translations.HomePageSegmentLabelGoodLife},
            {id:5, name: translations.HomePageSegmentLabelUltimate},
            {id:6, name: translations.HomePageSegmentLabelPragmatic}
        ];
    });


    notify.config({
        duration : 10000
    }) ;
    var notifytemplate = {
        success : '/app/js/websitecomponent/notifysavesuccess.html',
        failure : '/app/js/websitecomponent/notifysavefailure.html'
    };
    $scope.closeAll = function(){
        notify.closeAll();
    };


    $scope.css = {
        menu                     : 'Home',
        chartMenu                : 'A1',
        tableReportTab           : 'SKU',
        tableReportMenu          : 1,
        additionalBudget         : true,
        currentDecisionBrandId   : 0,
        currentDecisionRightMenu : 1,
        addNewSku                : false,
        addNewBrand              : false,
        skuErrorField : '',
        skuErrorInfo  : '',
        brandErrorInfo  : '',
        companyErrorInfo  : '',
        periods : []
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
        currentStudent : null,
        currentCompany : null,
        currentCompanyOtherInfo : {},
        currentCompanyProductPortfolio : {},
        currentCompanySpendingDetails : {},
        currentCompanyFutureProjectionCalculator : [],
        currentBrand : null,
        currentBrandIndex : 0,
        currentModifiedSku : {},
        currentModifiedBrand : {},
        currentModifiedCompany : {
            company_data : {}
        },
        currentSku : null,
        currentSkuIndex : 0,
        newBrand : {
            brand_name : "",
            sku_name : "",
            othererrorinfo : ""
        },
        newSku : {
            sku_name : "",
            brand_id : "",
            othererrorinfo : ""
        },

        tableA1CompanyStatus : {
            allCompanyData : [],
            currentCompany : {
                companyName : 'Company List'
            },
            currentSKU : {},
            currentBrand : {},
            currentGlobal : {}
        },
        tableA2FinancialData : {
            allData : [],
            currentCompany : {},
            currentPeriod : {
                period : 'Select Period'
            },
            currentBrand : {}
        },
        tableA4ProfitabilityEvolution : {
            allData : [],
            currentSKU : {},
            currentBrand : {},
            currentGlobal : {}
        },
        tableB2CompetitorIntelligence : {
            allData : [],
            currentTable : 1
        },
        tableC3SegmentDistribution : {
            allData : [],
            currentTable : 1
//            marketShareVolume : [],
//            marketShareValue : [],
//            marketSaleVolume : [],
//            marketSaleValue : [],
//            averageNetMarketPriceStdPack : [],
//            valuePerception : [],
//            imagePerception : []
        },
        tableC5MarketTrends : {
            allData : [],
            dataSKU : {},
            dataBrand : {},
            dataGlobal : {},
            currentTable : 1
        },
        tableC6MarketIndicators : {
            allData : {}
        },



        chartA31InventoryReport : {
            data : [],
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
        },

        chartB11MarketShareInValue : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB12MarketShareInVolume : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB13MindSpaceShare : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB14ShelfSpaceShare : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartB31TotalInvestment : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB32NetProfitByCompanies : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB33ReturnOnInvestment : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB34InvestmentsVersusBudget : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB41MarketSalesValue : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB42MarketSalesVolume : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB43TotalInventoryAtFactory : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB44TotalInventoryAtTrade : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartC11SegmentsLeadersByValuePriceSensitive : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC12SegmentsLeadersByValuePretenders : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC13SegmentsLeadersByValueModerate : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC14SegmentsLeadersByValueGoodLife : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC15SegmentsLeadersByValueUltimate : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC16SegmentsLeadersByValuePragmatic : {
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC21PerceptionMap : {
            data : [],
            dataChart : [],
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
        },
        chartC41GrowthRateInVolume : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC42GrowthRateInValue : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC43NetMarketPrice : {
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC44SegmentValueShareTotalMarket : {
            config : chartReport.getChartConfig3(),
            data : $scope.dataChartSimple
        }

    };





    $scope.A31ColorFunction = function(){
        return function(d, i){
            return $scope.data.chartA31InventoryReport.color[i];
        };
    };

    $scope.A31ToolTipContent = function(){
        return function(key, x, y, e, graph) {
            return  '<h5>' + y + '</h5>';
        };
    };


    $scope.C31shapeFunction = function(){
        return function(d) {
            return d.shape;
        };
    };

    $scope.C31TooltipContent = function(){
        return function(key, x, y, e, graph) {

            var iconColor = $scope.data.chartC21PerceptionMap.color[e.seriesIndex];
            var htmlResult = '';

            var arrow0 = 'glyphicon-arrow-right';
            var arrow1 = 'glyphicon-arrow-right';
            var arrow2 = 'glyphicon-arrow-right';
            var arrow3 = 'glyphicon-arrow-right';
            var arrow4 = 'glyphicon-arrow-right';
            var arrow5 = 'glyphicon-arrow-right';
            var arrow6 = 'glyphicon-arrow-right';
            var arrow7 = 'glyphicon-arrow-right';

            if(e.point.tooltips.length > 0){
                if(e.point.tooltips[0].compareWithPreviousPeriod === 1){
                    arrow0 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[0].compareWithPreviousPeriod === -1){
                    arrow0 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[1].compareWithPreviousPeriod === 1){
                    arrow1 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[1].compareWithPreviousPeriod === -1){
                    arrow1 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[2].compareWithPreviousPeriod === 1){
                    arrow2 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[2].compareWithPreviousPeriod === -1){
                    arrow2 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[3].compareWithPreviousPeriod === 1){
                    arrow3 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[3].compareWithPreviousPeriod === -1){
                    arrow3 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[4].compareWithPreviousPeriod === 1){
                    arrow4 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[4].compareWithPreviousPeriod === -1){
                    arrow4 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[5].compareWithPreviousPeriod === 1){
                    arrow5 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[5].compareWithPreviousPeriod === -1){
                    arrow5 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[6].compareWithPreviousPeriod === 1){
                    arrow6 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[6].compareWithPreviousPeriod === -1){
                    arrow6 = 'glyphicon-arrow-down';
                }

                if(e.point.tooltips[7].compareWithPreviousPeriod === 1){
                    arrow7 = 'glyphicon-arrow-up';
                }else if(e.point.tooltips[7].compareWithPreviousPeriod === -1){
                    arrow7 = 'glyphicon-arrow-down';
                }

                htmlResult = '<div class="panel panel-default perception_panel"> <div class="panel-heading"><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + key + ' - ' + e.point.name + '</div>' +
                    '<ul class="list-group">' +
                    '<li class="list-group-item perception_list"><span class="perception_info">Market Share (Value %)  </span><span class="perception_info_number">' + Math.round(e.point.tooltips[0].value * 10000) / 100 +
                    '</span><span class="glyphicon ' + arrow0 + ' "></span></li>' +
                    '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">Average Display Price   </span><span class="perception_info_number">' + Math.round(e.point.tooltips[1].value * 100) / 100 +
                    '</span><span class="glyphicon ' + arrow1 + ' "></span></li>' +
                    '<li class="list-group-item perception_list"><span class="perception_info">Applied Technology Index </span><span class="perception_info_number">' + e.point.tooltips[2].value +
                    '</span><span class="glyphicon ' + arrow2 + ' "></span></li>' +
                    '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">Ingredients Quality Index</span><span class="perception_info_number">' + e.point.tooltips[3].value +
                    '</span><span class="glyphicon ' + arrow3 + ' "></span></li>' +
                    '<li class="list-group-item perception_list"><span class="perception_info">Awareness (%)            </span><span class="perception_info_number">' + Math.round(e.point.tooltips[4].value * 10000) / 100 +
                    '</span><span class="glyphicon ' + arrow4 + ' "></span></li>' +
                    '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">Shelf Space (%)          </span><span class="perception_info_number">' + Math.round(e.point.tooltips[5].value * 10000) / 100 +
                    '</span><span class="glyphicon ' + arrow5 + ' "></span></li>' +
                    '<li class="list-group-item perception_list"><span class="perception_info">Value Perception Change </span><span class="perception_info_number">' + Math.round(e.point.tooltips[6].value * 100) / 100 +
                    '</span><span class="glyphicon ' + arrow6 + ' "></span></li>' +
                    '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">Image Perception Change </span><span class="perception_info_number">' + Math.round(e.point.tooltips[7].value * 100) / 100 +
                    '</span><span class="glyphicon ' + arrow7 + ' "></span></li>' +
                    '</ul></div>' ;

            }else {
                htmlResult = '<h5><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + key + ' ' + e.point.name + '</h5>';
            }


            return htmlResult;
        };
    };





    /********************  Chart A3  ********************/
    chartReport.inventoryReport().then(function(data, status, headers, config){
        $scope.data.chartA31InventoryReport.data = data;
//        console.log($scope.data.chartA31InventoryReport.data);
    });


    /********************  Chart B1  ********************/
    chartReport.marketShareInValue().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB11MarketShareInValue.data = data;
    });
    chartReport.marketShareInVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB12MarketShareInVolume.data = data;
    });
    chartReport.mindSpaceShare().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB13MindSpaceShare.data = data;
    });
    chartReport.shelfSpaceShare().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB14ShelfSpaceShare.data = data;
    });


    /********************  Chart B3  ********************/
    chartReport.totalInvestment().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB31TotalInvestment.data = data;
    });
    chartReport.netProfitByCompanies().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB32NetProfitByCompanies.data = data;
    });
    chartReport.returnOnInvestment().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB33ReturnOnInvestment.data = data;
    });
    chartReport.investmentsVersusBudget().then(function(data, status, headers, config){
//        console.log(data);
//        $scope.data.chartB34InvestmentsVersusBudget.data = data;
    });


    /********************  Chart B4  ********************/
    chartReport.marketSalesValue().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB41MarketSalesValue.data = data;
    });
    chartReport.marketSalesVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB42MarketSalesVolume.data = data;
    });
    chartReport.totalInventoryAtFactory().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB43TotalInventoryAtFactory.data = data;
    });
    chartReport.totalInventoryAtTrade().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartB44TotalInventoryAtTrade.data = data;
    });


    /********************  Chart C1  ********************/
    chartReport.segmentsLeadersByValuePriceSensitive().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = data;
    });
    chartReport.segmentsLeadersByValuePretenders().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC12SegmentsLeadersByValuePretenders.data = data;
    });
    chartReport.segmentsLeadersByValueModerate().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC13SegmentsLeadersByValueModerate.data = data;
    });
    chartReport.segmentsLeadersByValueGoodLife().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = data;
    });
    chartReport.segmentsLeadersByValueUltimate().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC15SegmentsLeadersByValueUltimate.data = data;
    });
    chartReport.segmentsLeadersByValuePragmatic().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = data;
    });


    /********************  Chart C2  ********************/
    chartReport.perceptionMap().then(function(data, status, headers, config){
        $scope.data.chartC21PerceptionMap.data = data;
        $scope.data.chartC21PerceptionMap.dataChart = data.dataSKU;
    });

    $scope.switchPerceptionMapsData = function(flag){
        if(flag === 'sku'){
            $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
        }else{
            $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataBrand;
        }
    };


    /********************  Chart C4  ********************/
    $scope.data.chartC41GrowthRateInVolume.config.title = 'Growth Rate In Volume (Period -3 = 100)';
    $scope.data.chartC42GrowthRateInValue.config.title = 'Growth Rate In Value (Period -3 = 100)';
    $scope.data.chartC43NetMarketPrice.config.title = 'Net Market Price (Period -3 = 100)';
    $scope.data.chartC44SegmentValueShareTotalMarket.config.title = 'Segment Value Share In Total Market (%)';

    chartReport.growthRateInVolume().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC41GrowthRateInVolume.data = data;
    });
    chartReport.growthRateInValue().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC42GrowthRateInValue.data = data;
    });
    chartReport.netMarketPrice().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC43NetMarketPrice.data = data;
    });
    chartReport.segmentValueShareTotalMarket().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.chartC44SegmentValueShareTotalMarket.data = data;
    });


    /********************  Table Report A1  ********************/
    tableReport.companyStatus().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableA1CompanyStatus.allCompanyData = data;
        $scope.data.tableA1CompanyStatus.currentCompany = data[0];
        $scope.data.tableA1CompanyStatus.currentSKU = $scope.data.tableA1CompanyStatus.currentCompany.SKU[0];
        $scope.data.tableA1CompanyStatus.currentBrand = $scope.data.tableA1CompanyStatus.currentCompany.brand[0];
        $scope.data.tableA1CompanyStatus.currentGlobal = $scope.data.tableA1CompanyStatus.currentCompany.global;
    });

    $scope.switchTableReportCompany = function(company){
        $scope.data.tableA1CompanyStatus.currentCompany = company;
        $scope.data.tableA1CompanyStatus.currentSKU = $scope.data.tableA1CompanyStatus.currentCompany.SKU[0];
        $scope.data.tableA1CompanyStatus.currentBrand = $scope.data.tableA1CompanyStatus.currentCompany.brand[0];
        $scope.data.tableA1CompanyStatus.currentGlobal = $scope.data.tableA1CompanyStatus.currentCompany.global;
    };
    $scope.switchTableReportSKU = function(SKU){
        $scope.data.tableA1CompanyStatus.currentSKU = SKU;
        $scope.data.tableA4ProfitabilityEvolution.currentSKU = SKU;
    };
    $scope.switchTableReportBrand = function(brand){
        $scope.data.tableA1CompanyStatus.currentBrand = brand;
        $scope.data.tableA2FinancialData.currentBrand = brand;
        $scope.data.tableA4ProfitabilityEvolution.currentBrand = brand;
    };


    /********************  Table Report A2  ********************/
    tableReport.financialReport().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableA2FinancialData.allData = data;
        $scope.data.tableA2FinancialData.currentCompany = data[0];
        $scope.data.tableA2FinancialData.currentPeriod = $scope.data.tableA2FinancialData.currentCompany.periods[0];
        $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
    });
    $scope.switchTableReportPeriod = function(period){
        $scope.data.tableA2FinancialData.currentPeriod = period;
        $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
    };
    /********************  Table Report A4  ********************/
    tableReport.profitabilityEvolution().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableA4ProfitabilityEvolution.allData = data[0];
        $scope.data.tableA4ProfitabilityEvolution.currentSKU = $scope.data.tableA4ProfitabilityEvolution.allData.SKU[0];
        $scope.data.tableA4ProfitabilityEvolution.currentBrand = $scope.data.tableA4ProfitabilityEvolution.allData.brand[0];
        $scope.data.tableA4ProfitabilityEvolution.currentGlobal = $scope.data.tableA4ProfitabilityEvolution.allData.global;
    });

    /********************  Table Report B2  ********************/
    tableReport.competitorIntelligence().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableB2CompetitorIntelligence.allData = data;
    });

    /********************  Table Report C3  ********************/
    tableReport.segmentDistribution().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableC3SegmentDistribution.allData = data;
    });
    $scope.switchTableMenuLevel1 = function(menu){
        $scope.css.tableReportMenu = menu;
        $scope.data.tableB2CompetitorIntelligence.currentTable = 1;
        $scope.data.tableC5MarketTrends.currentTable = 1;
    };
    $scope.switchTableReport = function(report){
        $scope.data.tableC3SegmentDistribution.currentTable = report;
        $scope.data.tableB2CompetitorIntelligence.currentTable = report;
        $scope.data.tableC5MarketTrends.currentTable = report;
    };

    /********************  Table Report C5  ********************/
    tableReport.marketTrends().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableC5MarketTrends.allData = data;
        $scope.data.tableC5MarketTrends.dataSKU = data.SKU;
        $scope.data.tableC5MarketTrends.dataBrand = data.brand;
        $scope.data.tableC5MarketTrends.dataGlobal = data.global;

    });

    /********************  Table Report C6  ********************/
    tableReport.marketIndicators().then(function(data, status, headers, config){
        $scope.data.tableC6MarketIndicators.allData = data;

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





    /********************  获取Decision信息  ********************/

    $scope.companyInfoInit = function(){

        Company.getCurrentStudent().then(function(data, status, headers, config){
            $scope.data.currentStudent = data;

            if(angular.isNumber($scope.data.currentStudent.currentPeriod)){
                for (var i = -3; i <= $scope.data.currentStudent.maxPeriodRound; i++) {

                    if (i ===  $scope.data.currentStudent.currentPeriod ) {
                        $scope.css.periods.push({
                            value : i,
                            currentPeriod : true,
                            pastPeriod : false
                        });

                    } else if(i <  $scope.data.currentStudent.currentPeriod){
                        $scope.css.periods.push({
                            value : i,
                            currentPeriod : false,
                            pastPeriod : true
                        });
                    }else{
                        $scope.css.periods.push({
                            value : i,
                            currentPeriod : false,
                            pastPeriod : false
                        });
                    }
                }
            }


        });

        Company.getCompany().then(function(data, status, headers, config){

            //记录上一次选中的Brand 和SKU 并找到对应的Index 供本次查询使用

            if($scope.data.currentBrand !== null ){
                angular.forEach(data.d_BrandsDecisions, function(brand){
                    if(brand.d_BrandID === $scope.data.currentBrand.d_BrandID){
                        $scope.data.currentBrandIndex = data.d_BrandsDecisions.indexOf(brand);

                        if($scope.data.currentBrandIndex === -1 ){
                            $scope.data.currentBrandIndex  = 0;
                        }
                    }
                });
            }

            $scope.data.currentCompany = data;
            $scope.css.currentDecisionBrandId = $scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex]._id;
            $scope.data.currentBrand = $scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex];


            //记录上一次选中的Brand 和SKU 并找到对应的Index 供本次查询使用
            if($scope.data.currentSku !== null ){
                angular.forEach($scope.data.currentBrand.d_SKUsDecisions, function(sku){

                    if(sku.d_SKUID === $scope.data.currentSku.d_SKUID){
                        $scope.data.currentSkuIndex = $scope.data.currentBrand.d_SKUsDecisions.indexOf(sku);

                        if($scope.data.currentSkuIndex === -1 ){
                            $scope.data.currentSkuIndex  = 0;
                        }
                    }
                });
            }

            $scope.data.currentSku = $scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex].d_SKUsDecisions[$scope.data.currentSkuIndex];

            Company.getCompanyFutureProjectionCalculator($scope.data.currentSku.d_SKUID).then(function(data, status, headers, config){
    //            console.log(data);
                $scope.data.currentCompanyFutureProjectionCalculator = data;

            });

        });

        Company.getCompanyOtherInfo().then(function(data, status, headers, config){
            $scope.data.currentCompanyOtherInfo = {
                totalAvailableBudget : parseInt(data.totalAvailableBudget * 10000) / 100,
                totalAvailableBudgetCSS : data.totalAvailableBudget.toFixed(4)  * 100 + '%',
                totalAvailableBudgetValue : data.totalAvailableBudgetValue.toFixed(0),
                normalCapacity : parseInt(data.normalCapacity * 10000) / 100,
                normalCapacityCSS : data.normalCapacity.toFixed(4)  * 100 + '%',
                normalCapacityValue : data.normalCapacityValue.toFixed(0),
                overtimeCapacity : parseInt(data.overtimeCapacity * 10000 ) / 100,
                overtimeCapacityCSS : data.overtimeCapacity.toFixed(4)  * 100 + '%',
                overtimeCapacityValue : data.overtimeCapacityValue.toFixed(0)
            };

    //        console.log($scope.data.currentCompanyOtherInfo);

        });

        Company.getCompanyProductPortfolio().then(function(data, status, headers, config){
    //        console.log(data);
            $scope.data.currentCompanyProductPortfolio = data;
        });

        Company.getCompanySpendingDetails().then(function(data, status, headers, config){
    //        console.log(data);
            $scope.data.currentCompanySpendingDetails = data;
        });

    };


    $scope.companyInfoInit();





    /********************  点击添加一个新的Brand 显示添加Brand的表单  ********************/
    $scope.showAddNewBrandForm = function(){
        $scope.css.addNewBrand = true;
        $scope.data.newBrand.brand_name = "";
        $scope.data.newBrand.sku_name = "";
        $scope.data.newBrand.othererrorinfo = "";
    };

    $scope.addNewBrand = function(form){

        if (form.$valid) {
            Company.addBrand($scope.data.newBrand).then(function(data, status, headers, config){
                $scope.companyInfoInit();

                notify({
                    message  : 'Save Success !',
                    template : notifytemplate.success,
                    position : 'center'
                });

                $scope.css.addNewBrand = false;
            }, function(data){
                form.brandName.$valid = false;
                form.brandName.$invalid = true;
                $scope.data.newBrand.othererrorinfo = data.data.message ;

            });
        }
    };


    /********************  点击添加一个新的SKU 显示添加SKU的表单  ********************/
    $scope.showAddNewSkuForm = function(){
        $scope.css.addNewSku = true;
        $scope.data.newSku.sku_name = "";
        $scope.data.newSku.brand_id = "";
        $scope.data.newSku.othererrorinfo = "";
    };

    $scope.addNewSku = function(form){
        $scope.data.newSku.brand_id = $scope.data.currentBrand.d_BrandID;

        if (form.$valid) {
            Company.addSku($scope.data.newSku).then(function(data, status, headers, config){
                $scope.companyInfoInit();

                notify({
                    message  : 'Save Success !',
                    template : notifytemplate.success,
                    position : 'center'
                });

                $scope.css.addNewSku = false;
            }, function(data){
                form.skuName.$valid = false;
                form.skuName.$invalid = true;
                $scope.data.newSku.othererrorinfo = data.data.message ;

            });
        }
    };

    /********************  删除一个SKU  注意该SKU必须是本回合添加的SKU才可以删除 ********************/
    $scope.delSku = function(sku){
        Company.delSku(sku.d_SKUID, sku.d_BrandID).then(function(data, status, headers, config){
            $scope.companyInfoInit();

            notify({
                message  : 'Delete Sku Success !',
                template : notifytemplate.success,
                position : 'center'
            });
        }, function(data){
            notify({
                message  : data.data.message,
                template : notifytemplate.failure,
                position : 'center'
            });
        });
    };


    /********************  点击选中Brand 或 SKU  ********************/
    $scope.clickBrand = function(brand){
        $scope.css.currentDecisionBrandId = brand._id;
        $scope.data.currentBrand = brand;
        $scope.css.addNewBrand = false;
        $scope.css.addNewSku = false;
    };

    $scope.clickCurrentSku = function(sku){
        $scope.css.skuErrorField = '';
        $scope.data.currentSku = angular.copy(sku);
        Company.getCompanyFutureProjectionCalculator($scope.data.currentSku.d_SKUID).then(function(data, status, headers, config){
            $scope.data.currentCompanyFutureProjectionCalculator = data;

        });
    };


    /********************  更新 SKU  ********************/
    $scope.leaveSkuInput = function(sku, fieldname, fielddata, segmentOrWeek, weekindex){
        $scope.data.currentModifiedSku = {
            brand_id : sku.d_BrandID,
            sku_id : sku.d_SKUID,
            sku_data : {}
        };
        $scope.data.currentModifiedSku.sku_data[fieldname] = fielddata;

        if(fieldname === 'd_TargetConsumerSegment'){
            sku.d_TargetConsumerSegment = segmentOrWeek.id;
            $scope.data.currentModifiedSku.sku_data[fieldname] = segmentOrWeek.id;

        }else if(fieldname === 'd_PromotionalEpisodes'){
            if(!angular.isUndefined(weekindex)){
                // 针对d_PromotionalEpisodes 字段需要特殊处理
                $scope.data.currentModifiedSku.sku_data[fieldname][weekindex] = segmentOrWeek;
            }
        }else if(fieldname === 'd_FactoryPrice'){
            // 针对 d_FactoryPrice 字段需要特殊处理
            $scope.data.currentModifiedSku.sku_data[fieldname] = $scope.data.currentSku[fieldname];
            $scope.data.currentModifiedSku.sku_data[fieldname][0] = Number(fielddata);
        }else if(fieldname === 'd_AdditionalTradeMargin'){
            // 针对 d_AdditionalTradeMargin 字段需要特殊处理
            $scope.data.currentModifiedSku.sku_data[fieldname][0] = Number(fielddata) / 100;
        }else if(fieldname === 'd_WholesalesBonusRate'){
            // 针对 d_WholesalesBonusRate 字段需要特殊处理
            $scope.data.currentModifiedSku.sku_data[fieldname][0] = Number(fielddata) / 100;
        }



//        console.log($scope.data.currentModifiedSku);
        Company.updateSku($scope.data.currentModifiedSku).then(function(data, status, headers, config){
            $scope.companyInfoInit();

            notify({
                message : 'Save Success !',
                template : notifytemplate.success,
                position : 'center'
            });
        }, function(data){
            console.log(data);

            $scope.css.skuErrorField = data.data.modifiedField;

            // 使用命令对象
            function showSkuErrorInfo(fieldname) {
                var names = {
                    'd_Technology': function() {
                        return data.data;
                    },
                    'd_IngredientsQuality': function() {
                        return data.data;
                    },
                    'd_ProductionVolume': function() {
                        return data.data;
                    },
                    'd_FactoryPrice': function() {
                        return data.data;
                    },
                    'd_Advertising': function() {
                        return data.data;
                    },
                    'd_PromotionalBudget': function() {
                        return data.data;
                    },
                    'd_TradeExpenses': function() {
                        return data.data;
                    },
                    'd_AdditionalTradeMargin': function() {
                        return data.data;
                    },
                    'd_WholesalesBonusMinVolume': function() {
                        return data.data;
                    },
                    'd_WholesalesBonusRate': function() {
                        return data.data;
                    }

                };
                if (typeof names[fieldname] !== 'function') {
                    return false;
                }
                return names[fieldname]();
            }

            $scope.css.skuErrorInfo = showSkuErrorInfo($scope.css.skuErrorField);


            notify({
                message : data.data.message,
                template : notifytemplate.failure,
                position : 'center'                
            });
        });
    };

    /********************  更新 Brand  ********************/
    $scope.updateBrand = function(form){
        $scope.data.currentModifiedBrand = {
            brand_id : $scope.data.currentBrand.d_BrandID,
            brand_data : {
                d_SalesForce : $scope.data.currentBrand.d_SalesForce
            }
        };

        Company.updateBrand($scope.data.currentModifiedBrand).then(function(data, status, headers, config){
            form.brandSalesForce.$valid = true;
            form.brandSalesForce.$invalid = false;

            $scope.companyInfoInit();
            notify({
                message : 'Save Success !',
                template : notifytemplate.success,
                position : 'center'
            });
        }, function(data){
            console.log(data);

            form.brandSalesForce.$valid = false;
            form.brandSalesForce.$invalid = true;

            $scope.css.brandErrorInfo = data.data;

            notify({
                message : data.data.message,
                template : notifytemplate.failure,
                position : 'center'                
            });
        });
    };


    /********************  更新 Company  ********************/
    $scope.updateCompany = function(fieldname, form, formfieldname){

        $scope.data.currentModifiedCompany.company_data = {};
        $scope.data.currentModifiedCompany.company_data[fieldname] = $scope.data.currentCompany[fieldname];

        console.log($scope.data.currentModifiedCompany);
        Company.updateCompany($scope.data.currentModifiedCompany).success(function(data, status, headers, config){
            console.log(data);
            $scope.css.additionalBudget = true;


            form[formfieldname].$valid = true;
            form[formfieldname].$invalid = false;

            $scope.companyInfoInit();
            notify({
                message : 'Save Success !',
                template : notifytemplate.success,
                position : 'center'
            });
        }).error(function(data, status, headers, config){
            console.log(data);

            form[formfieldname].$valid = false;
            form[formfieldname].$invalid = true;

            $scope.css.companyErrorInfo = data;

            notify({
//                message : JSON.stringify(data.data) + ', status: ' + data.status,
                message : data.message,
                template : notifytemplate.failure,
                position : 'center'
            });
        });
    };




}]);
