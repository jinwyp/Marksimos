/**
 * Created by jinwyp on 4/28/14.
 */

(function () {
    'use strict';


    /********************  Create New Module For Controllers ********************/
    angular.module('marksimos', ['pascalprecht.translate', 'angularCharts', 'nvd3ChartDirectives', 'cgNotify',  'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter', 'marksimos.translation' ]);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('marksimos').controller('chartController', ['$translate', '$scope', '$rootScope', '$document', '$timeout', '$interval', '$http', 'notify', 'chartReport', 'tableReport', 'Company',  function($translate, $scope, $rootScope, $document, $timeout, $interval, $http, notify, chartReport, tableReport, Company ) {

        $rootScope.$on('$translateChangeSuccess', function () {
            app.loadingChartData();

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
            tableReportTabC2           : 'SKU',
            tableReportMenu          : 1,
            additionalBudget         : true,
            currentDecisionBrandId   : 0,
            currentDecisionRightMenu : 1,
            currentSearchReportName  : [],
            addNewSku                : false,
            addNewBrand              : false,
            skuErrorField : '',
            skuErrorFieldFrontEnd : '',
            skuErrorInfo  : '',
            brandErrorInfo  : '',
            companyErrorInfo  : '',
            periods : [],
            comparisonPage : false,
            dragEvent : {
                pressEvents   : 'touchstart mousedown',
                moveEvents    : 'touchmove mousemove',
                releaseEvents : 'touchend mouseup'
            },
            dragReportFlag : false,
            dragReportPosition : {
                'top' : 2000,
                'left' : 2000
            },
            dragTargetBoxId : '',
            dragSourceReportId : '',
            dragHaveLeftReport : false,
            dragHaveRightReport : false,
            seminarFinished : false,
            showFeedback : false

        };


        $scope.dataChartSimple = {
            series: ['A', 'B', 'C', 'D', 'E', 'F'],
            data : [
                {
                    x : "Round 1",
                    y: [2, 2, 3, 3, 3, 3],
                    tooltip:"this is tooltip"
                },
                {
                    x : "Round 2",
                    y: [2, 2, 3, 3, 3, 3],
                    tooltip:"this is tooltip"
                },
                {
                    x : "Round 3",
                    y: [2, 2, 3, 3, 3, 3],
                    tooltip:"this is tooltip"
                },
                {
                    x : "Round 4",
                    y: [0, 0, 0, 0, 0, 0],
                    tooltip:"this is tooltip"
                }
            ]
        };


        $scope.data = {
            currentTime : {
                hour : 0,
                minute : 0,
                second : 0
            },
            currentStudent : null,
            currentCompany : null,
            currentCompanyNameCharacter : "",
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
            reportName : "",
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
            tableFinalScore: {
                data : [],
                showScaled : true
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
                currentTable : 1,
                currentTableData : {},
                currentTableUnit : "%",
                chartConfig : chartReport.getChartConfig1(),
                chartData : $scope.dataChartSimple
            },
            tableC3SegmentDistribution : {
                allData : [],
                currentTable : 1,
                currentTableData : {},
                currentTableUnit : "%",
                currentTableShowAllSegments : false,
                chartConfig : chartReport.getChartConfig1(),
                chartData : $scope.dataChartSimple
    //            marketShareVolume : [],
    //            marketShareValue : [],
    //            marketSaleVolume : [],
    //            marketSaleValue : [],
    //            averageNetMarketPriceStdPack : [],
    //            valuePerception : [],
    //            imagePerception : []
            },
            tableC5MarketTrends : {
                allData          : [],
                currentTable     : 1,
                currentTableData : {},
                currentTableUnit : "",
                chartConfig      : chartReport.getChartConfig1(),
                chartData        : $scope.dataChartSimple,
                tableReportTab   : 'Global'
            },
            tableC6MarketIndicators : {
                allData : {}
            },


            chartA3InventoryReport : {
                data : [],
    //            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000'] // QIFEI 's color
    //            color : ['#004CE5', '#BB0000', '#FFBC01', '#339933', '#990099', '#FF5200', '#000000'] //Windows color
    //            color : ['#999999', '#BB0000', '#99CC00', '#339933', '#990099', '#FF5200', '#000000']
                color : ['#999999',  '#99CC00', '#BB0000', '#339933', '#990099', '#FF5200', '#000000']
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
                currentPeriod : 0,
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC12SegmentsLeadersByValuePretenders : {
                config : chartReport.getChartConfig2(),
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC13SegmentsLeadersByValueModerate : {
                config : chartReport.getChartConfig2(),
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC14SegmentsLeadersByValueGoodLife : {
                config : chartReport.getChartConfig2(),
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC15SegmentsLeadersByValueUltimate : {
                config : chartReport.getChartConfig2(),
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC16SegmentsLeadersByValuePragmatic : {
                config : chartReport.getChartConfig2(),
                allData : [],
                data : $scope.dataChartSimple
            },
            chartC21PerceptionMap : {
                allData : [],
                data : [],
                dataChart : [],
                currentPeriod : 0,
    //            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
                color : ['#004CE5', '#BB0000', '#FFBC01', '#339933', '#990099', '#FF5200', '#000000']
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





        $scope.A3ColorFunction = function(){
            return function(d, i){
                return $scope.data.chartA3InventoryReport.color[i];
            };
        };


        $scope.A3ToolTipContent = function(){
            return function(key, x, y, e, graph) {
                return  '<h5>' + y + '</h5>';
            };
        };

        $scope.C2ColorFunction = function(){
            return function(d, i){
                return $scope.data.chartC21PerceptionMap.color[i];
            };
        };


        $scope.C2shapeFunction = function(){
            return function(d) {
                return d.shape;
            };
        };

        // 处理当前的公司名称的颜色
        function C2TooltipContentShowCompanyNameColor(fieldname) {
            var names = {
                'A': function() {
                    return $scope.data.chartC21PerceptionMap.color[0];
                },
                'B': function() {
                    return $scope.data.chartC21PerceptionMap.color[1];
                },
                'C': function() {
                    return $scope.data.chartC21PerceptionMap.color[2];
                },
                'D': function() {
                    return $scope.data.chartC21PerceptionMap.color[3];
                },
                'E': function() {
                    return $scope.data.chartC21PerceptionMap.color[4];
                },
                'F': function() {
                    return $scope.data.chartC21PerceptionMap.color[5];
                }

            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }

        $scope.C2TooltipContent = function(){
            return function(key, x, y, e, graph) {

                var iconColor ;
                var htmlResult = '';

                var arrow0 = 'perception_arrow_right';
                var arrow1 = 'perception_arrow_right';
                var arrow2 = 'perception_arrow_right';
                var arrow3 = 'perception_arrow_right';
                var arrow4 = 'perception_arrow_right';
                var arrow5 = 'perception_arrow_right';
                var arrow6 = 'perception_arrow_right';
                var arrow7 = 'perception_arrow_right';

                if(e.point.tooltips.length > 0){
                    iconColor = C2TooltipContentShowCompanyNameColor(e.point.CompanyName);

                    if(e.point.tooltips[0].compareWithPreviousPeriod === 1){
                        arrow0 = 'perception_arrow_up';
                    }else if(e.point.tooltips[0].compareWithPreviousPeriod === -1){
                        arrow0 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[1].compareWithPreviousPeriod === 1){
                        arrow1 = 'perception_arrow_up';
                    }else if(e.point.tooltips[1].compareWithPreviousPeriod === -1){
                        arrow1 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[2].compareWithPreviousPeriod === 1){
                        arrow2 = 'perception_arrow_up';
                    }else if(e.point.tooltips[2].compareWithPreviousPeriod === -1){
                        arrow2 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[3].compareWithPreviousPeriod === 1){
                        arrow3 = 'perception_arrow_up';
                    }else if(e.point.tooltips[3].compareWithPreviousPeriod === -1){
                        arrow3 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[4].compareWithPreviousPeriod === 1){
                        arrow4 = 'perception_arrow_up';
                    }else if(e.point.tooltips[4].compareWithPreviousPeriod === -1){
                        arrow4 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[5].compareWithPreviousPeriod === 1){
                        arrow5 = 'perception_arrow_up';
                    }else if(e.point.tooltips[5].compareWithPreviousPeriod === -1){
                        arrow5 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[6].compareWithPreviousPeriod === 1){
                        arrow6 = 'perception_arrow_up';
                    }else if(e.point.tooltips[6].compareWithPreviousPeriod === -1){
                        arrow6 = 'perception_arrow_down';
                    }

                    if(e.point.tooltips[7].compareWithPreviousPeriod === 1){
                        arrow7 = 'perception_arrow_up';
                    }else if(e.point.tooltips[7].compareWithPreviousPeriod === -1){
                        arrow7 = 'perception_arrow_down';
                    }

                    htmlResult = '<div class="panel panel-default perception_panel"> <div class="panel-heading"><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + key + ' - ' + e.point.name + '  </div>' +
                        '<ul class="list-group">' +
                        '<li class="list-group-item perception_list"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipMarketShareValue') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[0].value * 10000) / 100 +
                        '%</span><span class=" ' + arrow0 + ' "></span></li>' +
                        '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipAverageDisplayPrice') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[1].value * 100) / 100 +
                        '</span><span class=" ' + arrow1 + ' "></span></li>' +
                        '<li class="list-group-item perception_list"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipAppliedTechnologyIndex') + '</span><span class="perception_info_number">' + e.point.tooltips[2].value +
                        '</span><span class=" ' + arrow2 + ' "></span></li>' +
                        '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipIngredientsQualityIndex') + '</span><span class="perception_info_number">' + e.point.tooltips[3].value +
                        '</span><span class=" ' + arrow3 + ' "></span></li>' +
                        '<li class="list-group-item perception_list"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipAwareness') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[4].value * 10000) / 100 +
                        '%</span><span class=" ' + arrow4 + ' "></span></li>' +
                        '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipShelfSpace') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[5].value * 10000) / 100 +
                        '%</span><span class=" ' + arrow5 + ' "></span></li>' +
                        '<li class="list-group-item perception_list"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipValuePerceptionChange') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[6].value * 100) / 100 +
                        '</span><span class=" ' + arrow6 + ' "></span></li>' +
                        '<li class="list-group-item perception_list perception_list_bg"><span class="perception_info">' +  $translate.instant('ReportPerceptionMapHoverTooltipImagePerceptionChange') + '</span><span class="perception_info_number">' + Math.round(e.point.tooltips[7].value * 100) / 100 +
                        '</span><span class=" ' + arrow7 + ' "></span></li>' +
                        '</ul></div>' ;

                }else {
                    iconColor = $scope.data.chartC21PerceptionMap.color[6];
                    htmlResult = '<h5><span class="perception_logo" style="background-color:' + iconColor + '"></span>'  + ' ' + e.point.name + '</h5>';
                }


                return htmlResult;
            };
        };



        /********************  APP 所有功能 运作函数  ********************/

        // 处理当前的公司名称
        function showCompanyName(fieldname) {
            var names = {
                '1': function() {
                    return "A";
                },
                '2': function() {
                    return "B";
                },
                '3': function() {
                    return "C";
                },
                '4': function() {
                    return "D";
                },
                '5': function() {
                    return "E";
                },
                '6': function() {
                    return "F";
                }

            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }

        var app = {

            initOnce : function(){
                this.loadingStudentData();

            },

            reRun : function(){
                this.loadingCompanyDecisionData();
                this.loadingCompanyOtherData();
            },
            loadingTableData : function(){
                /********************  Table Report A1  ********************/
                tableReport.companyStatus($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableA1CompanyStatus.allCompanyData = data;
                    $scope.data.tableA1CompanyStatus.currentCompany = data[0];
                    $scope.data.tableA1CompanyStatus.currentSKU = $scope.data.tableA1CompanyStatus.currentCompany.SKU[0];
                    $scope.data.tableA1CompanyStatus.currentBrand = $scope.data.tableA1CompanyStatus.currentCompany.brand[0];
                    $scope.data.tableA1CompanyStatus.currentGlobal = $scope.data.tableA1CompanyStatus.currentCompany.global;
                });

                $scope.switchTableReportA1Company = function(company){
                    $scope.data.tableA1CompanyStatus.currentCompany = company;
                    $scope.data.tableA1CompanyStatus.currentSKU = $scope.data.tableA1CompanyStatus.currentCompany.SKU[0];
                    $scope.data.tableA1CompanyStatus.currentBrand = $scope.data.tableA1CompanyStatus.currentCompany.brand[0];
                    $scope.data.tableA1CompanyStatus.currentGlobal = $scope.data.tableA1CompanyStatus.currentCompany.global;
                };
                $scope.switchTableReportA1SKU = function(SKU){
                    $scope.data.tableA1CompanyStatus.currentSKU = SKU;
                };
                $scope.switchTableReportA1Brand = function(brand){
                    $scope.data.tableA1CompanyStatus.currentBrand = brand;
                };


                /********************  Table Report A2  ********************/
                tableReport.financialReport($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableA2FinancialData.allData = data;
                    $scope.data.tableA2FinancialData.currentCompany = data[0];
                    $scope.data.tableA2FinancialData.currentPeriod = $scope.data.tableA2FinancialData.currentCompany.periods[$scope.data.tableA2FinancialData.currentCompany.periods.length -1];
                    $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
                });
                $scope.switchTableReportPeriod = function(period){
                    $scope.data.tableA2FinancialData.currentPeriod = period;
                    $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
                };
                $scope.switchTableReportA2Brand = function(brand){
                    $scope.data.tableA2FinancialData.currentBrand = brand;
                };


                /********************  Table Report A4  ********************/
                tableReport.profitabilityEvolution($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableA4ProfitabilityEvolution.allData = data[0];
                    $scope.data.tableA4ProfitabilityEvolution.currentSKU = $scope.data.tableA4ProfitabilityEvolution.allData.SKU[0];
                    $scope.data.tableA4ProfitabilityEvolution.currentBrand = $scope.data.tableA4ProfitabilityEvolution.allData.brand[0];
                    $scope.data.tableA4ProfitabilityEvolution.currentGlobal = $scope.data.tableA4ProfitabilityEvolution.allData.global;
                });
                $scope.switchTableReportA4SKU = function(SKU){
                    $scope.data.tableA4ProfitabilityEvolution.currentSKU = SKU;
                };
                $scope.switchTableReportA4Brand = function(brand){
                    $scope.data.tableA4ProfitabilityEvolution.currentBrand = brand;
                };

                /********************  Table Report B2  ********************/
                tableReport.competitorIntelligence($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableB2CompetitorIntelligence.allData = data;
                    $scope.data.tableB2CompetitorIntelligence.currentTableData = $scope.data.tableB2CompetitorIntelligence.allData.acquiredProductionAndLogisticsEfficiency;
                    $scope.data.tableB2CompetitorIntelligence.chartData = chartReport.formatChartData($scope.data.tableB2CompetitorIntelligence.allData.acquiredProductionAndLogisticsEfficiency);
                });
                $scope.switchTableMenuLevel1B2 = function(menu, field, unit){
                    $scope.css.tableReportMenu = menu;
                    $scope.switchTableReportB2(1, field, unit);
                };
                $scope.switchTableReportB2 = function(order, field, unit){
                    $scope.data.tableB2CompetitorIntelligence.currentTable = order;
                    $scope.data.tableB2CompetitorIntelligence.currentTableData = $scope.data.tableB2CompetitorIntelligence.allData[field];
                    $scope.data.tableB2CompetitorIntelligence.chartData = chartReport.formatChartData($scope.data.tableB2CompetitorIntelligence.currentTableData);
                    $scope.data.tableB2CompetitorIntelligence.currentTableUnit = unit;
                };



                /********************  Table Report C3  ********************/
                tableReport.segmentDistribution($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableC3SegmentDistribution.allData = data;
                    $scope.data.tableC3SegmentDistribution.currentTableData = $scope.data.tableC3SegmentDistribution.allData.marketShareVolume;
                    $scope.data.tableC3SegmentDistribution.chartData = chartReport.formatChartData($scope.data.tableC3SegmentDistribution.currentTableData);
                });
                $scope.switchTableReportC3 = function(order, field, unit, showAllSegments){
                    $scope.data.tableC3SegmentDistribution.currentTable = order;
                    $scope.data.tableC3SegmentDistribution.currentTableShowAllSegments = showAllSegments;
                    $scope.data.tableC3SegmentDistribution.currentTableData = $scope.data.tableC3SegmentDistribution.allData[field];
                    $scope.data.tableC3SegmentDistribution.chartData = chartReport.formatChartData($scope.data.tableC3SegmentDistribution.currentTableData);
                    $scope.data.tableC3SegmentDistribution.currentTableUnit = unit;
                };

                /********************  Table Report C5  ********************/
                tableReport.marketTrends($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    //        console.log(data);
                    $scope.data.tableC5MarketTrends.allData = data;
                    $scope.data.tableC5MarketTrends.currentTableData = $scope.data.tableC5MarketTrends.allData.SKU.averageDisplayPriceStdPack;
                    $scope.data.tableC5MarketTrends.chartData = chartReport.formatChartData($scope.data.tableC5MarketTrends.currentTableData);

                });
                $scope.switchTableCategoryC5 = function(category, field, unit){
                    $scope.data.tableC5MarketTrends.tableReportTab = category;
                    if(category === 'SKU'){
                        $scope.switchTableMenuLevel1C5(1, 'SKU', field, unit);
                    }else if(category === 'Brand'){
                        $scope.switchTableMenuLevel1C5(1, 'Brand', field, unit);
                    }else{
                        $scope.switchTableMenuLevel1C5(1, 'Global', field, unit);
                    }
                };
                $scope.switchTableMenuLevel1C5 = function(menu, category, field, unit){
                    $scope.data.tableC5MarketTrends.tableReportMenu = menu;
                    if(category === 'SKU'){
                        $scope.switchTableReportC5(1, 'SKU', field, unit);
                    }else if(category === 'Brand'){
                        $scope.switchTableReportC5(1, 'brand', field, unit);
                    }else{
                        $scope.switchTableReportC5(1, 'global', 'averageNetMarketPriceStdPack', unit);
                    }
                };
                $scope.switchTableReportC5 = function(order, category, field, unit){
                    $scope.data.tableC5MarketTrends.currentTable = order;
                    $scope.data.tableC5MarketTrends.currentTableData = $scope.data.tableC5MarketTrends.allData[category][field];
                    $scope.data.tableC5MarketTrends.currentTableUnit = unit;
                    $scope.data.tableC5MarketTrends.chartData = chartReport.formatChartData($scope.data.tableC5MarketTrends.currentTableData);
                };

                /********************  Table Report C6  ********************/
                tableReport.marketIndicators($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    $scope.data.tableC6MarketIndicators.allData = data;

                });

            },
            loadingChartData : function(){

                chartReport.initTranslate().then(function() {
                    /********************  Chart A3  ********************/
                    chartReport.inventoryReport($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartA3InventoryReport.data = data[0].data;
                    });


                    /********************  Chart B1  ********************/
                    chartReport.marketShareInValue($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB11MarketShareInValue.data = data;
                    });
                    chartReport.marketShareInVolume($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB12MarketShareInVolume.data = data;
                    });
                    chartReport.mindSpaceShare($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB13MindSpaceShare.data = data;
                    });
                    chartReport.shelfSpaceShare($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB14ShelfSpaceShare.data = data;
                    });


                    /********************  Chart B3  ********************/
                    chartReport.totalInvestment($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB31TotalInvestment.data = data;
                    });
                    chartReport.netProfitByCompanies($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB32NetProfitByCompanies.data = data;
                    });
                    chartReport.returnOnInvestment($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB33ReturnOnInvestment.data = data;
                    });
                    chartReport.investmentsVersusBudget($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartB34InvestmentsVersusBudget.data = data;
                    });


                    /********************  Chart B4  ********************/
                    chartReport.marketSalesValue($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB41MarketSalesValue.data = data;
                    });
                    chartReport.marketSalesVolume($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB42MarketSalesVolume.data = data;
                    });
                    chartReport.totalInventoryAtFactory($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartB43TotalInventoryAtFactory.data = data;
                    });
                    chartReport.totalInventoryAtTrade($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartB44TotalInventoryAtTrade.data = data;
                    });


                    /********************  Chart C1  ********************/
                    chartReport.segmentsLeadersByValuePriceSensitive($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData = data.data;
                        $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData.length - 4 ;
                        $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });
                    chartReport.segmentsLeadersByValuePretenders($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC12SegmentsLeadersByValuePretenders.allData = data.data;
                        $scope.data.chartC12SegmentsLeadersByValuePretenders.data = $scope.data.chartC12SegmentsLeadersByValuePretenders.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });
                    chartReport.segmentsLeadersByValueModerate($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC13SegmentsLeadersByValueModerate.allData = data.data;
                        $scope.data.chartC13SegmentsLeadersByValueModerate.data = $scope.data.chartC13SegmentsLeadersByValueModerate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });
                    chartReport.segmentsLeadersByValueGoodLife($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData = data.data;
                        $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });
                    chartReport.segmentsLeadersByValueUltimate($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC15SegmentsLeadersByValueUltimate.allData = data.data;
                        $scope.data.chartC15SegmentsLeadersByValueUltimate.data = $scope.data.chartC15SegmentsLeadersByValueUltimate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });
                    chartReport.segmentsLeadersByValuePragmatic($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData = data.data;
                        $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
                    });


                    /********************  Chart C2  ********************/
                    chartReport.perceptionMap($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        $scope.data.chartC21PerceptionMap.allData = data.data;
                        $scope.data.chartC21PerceptionMap.currentPeriod = $scope.data.chartC21PerceptionMap.allData.length - 4;
                        $scope.data.chartC21PerceptionMap.data = $scope.data.chartC21PerceptionMap.allData[$scope.data.chartC21PerceptionMap.currentPeriod + 3];
                        $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
                    });

                    /********************  Chart C4  ********************/
                    $scope.data.chartC41GrowthRateInVolume.config.title = 'Growth Rate In Volume (Period -3 = 100)';
                    $scope.data.chartC42GrowthRateInValue.config.title = 'Growth Rate In Value (Period -3 = 100)';
                    $scope.data.chartC43NetMarketPrice.config.title = 'Net Market Price (Period -3 = 100)';
                    $scope.data.chartC44SegmentValueShareTotalMarket.config.title = 'Segment Value Share In Total Market (%)';

                    chartReport.growthRateInVolume($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartC41GrowthRateInVolume.data = data;
                    });
                    chartReport.growthRateInValue($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartC42GrowthRateInValue.data = data;
                    });
                    chartReport.netMarketPrice($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartC43NetMarketPrice.data = data;
                    });
                    chartReport.segmentValueShareTotalMarket($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                        //        console.log(data);
                        $scope.data.chartC44SegmentValueShareTotalMarket.data = data;
                    });
                });

            },

            loadingStudentData : function(){
                var that = this;
                Company.getCurrentStudent().then(function(data, status, headers, config){
                    $scope.data.currentStudent = data;

                    var currentDate = new Date();

                    $scope.data.currentTime.hour = 1;
                    $scope.data.currentTime.minute = 59;
                    $scope.data.currentTime.second = 59 ;

    //            var timer = $interval(function() {
    //                currentDate = new Date();
    //                if(currentDate.getHours() < 13 && currentDate.getHours() > 9){
    //                    $scope.data.currentTime.hour = 12 - currentDate.getHours();
    //                    $scope.data.currentTime.minute = 60 - currentDate.getMinutes();
    //                    $scope.data.currentTime.second = 60 - currentDate.getSeconds() ;
    //                }else if(currentDate.getHours() < 19 && currentDate.getHours() >= 13){
    //                    $scope.data.currentTime.hour = 18 - currentDate.getHours();
    //                    $scope.data.currentTime.minute = 60 - currentDate.getMinutes();
    //                    $scope.data.currentTime.second = 60 - currentDate.getSeconds() ;
    //                }else {
    //                    $interval.cancel(timer);
    //                }
    //            }, 3000);





                    $scope.data.currentCompanyNameCharacter = showCompanyName($scope.data.currentStudent.companyId);

                    $scope.css.seminarFinished = $scope.data.currentStudent.isSimulationFinished;

                    $scope.css.periods = [];

                    // 处理显示当前第几回合进度条
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


                    /********************  Loading FinalScore  ********************/
                    Company.getFinalScore().then(function(data, status, headers, config) {
                        $scope.data.tableFinalScore.data = data.data;
                    });

                    that.loadingChartData();
                    that.loadingTableData();
                    that.loadingCompanyDecisionData();

                    // 处理最后比赛结束后
                    if($scope.data.currentStudent.isSimulationFinished === false){
                        that.loadingCompanyOtherData();
                    }else{
                        that.loadingFeedBackData();
                    }

                });
            },

            loadingCompanyDecisionData : function(){
                Company.getCompany($scope.data.currentStudent.companyId).then(function(data, status, headers, config){

                    //记录上一次选中的Brand  并找到对应的Index 供本次查询使用
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

                    //要处理删除SKU后,同时删除Brand后的问题 currentBrandIndex 要重置为零
                    if( angular.isUndefined($scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex]) ){
                        $scope.data.currentBrandIndex = 0;
                        $scope.data.currentSkuIndex  = 0;
                    }

                    $scope.css.currentDecisionBrandId = $scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex]._id;
                    $scope.data.currentBrand = $scope.data.currentCompany.d_BrandsDecisions[$scope.data.currentBrandIndex];
//                    console.log("Brand :",$scope.data.currentBrand);

                    //记录上一次选中的SKU 并找到对应的Index 供本次查询使用
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


                    if($scope.data.currentStudent.isSimulationFinished === false){
                        Company.getCompanyFutureProjectionCalculator($scope.data.currentSku.d_SKUID, $scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                            $scope.data.currentCompanyFutureProjectionCalculator = data;
                        });
                    }



                });
            },

            loadingCompanyOtherData : function(){
                Company.getCompanyOtherInfo($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
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

                });

                Company.getCompanyProductPortfolio($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    $scope.data.currentCompanyProductPortfolio = data;
                });

                Company.getCompanySpendingDetails($scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                    $scope.data.currentCompanySpendingDetails = data;
                });
            },
            loadingFeedBackData : function(){
                /********************  获取 Questionnaire  ********************/
                Company.getQuestionnaire().success(function(data, status, headers, config) {
                    $scope.questionnaire = data;
                    $scope.questionnaire.radio_OverallSatisfactionWithThePrograms = {
                        info: ['ChallengeStrategicThinkingAbility', 'DevelopAnIntegratedPerspective', 'TestPersonalAbilityOfBalancingRisks', 'ChallengeLeadershipAndTeamworkAbility', 'ChallengeAnalysisAndDecisionMakingAbility', 'SimulationInteresting']
                    };
                    $scope.questionnaire.radio_TeachingTeams = {
                        info: ['FeedbackOnSimulationDecisions', 'ExpandingViewAndInspireThinking', 'Lectures']
                    };
                    $scope.questionnaire.radio_Products = {
                        info: ['OverallProductUsageExperience', 'UserInterfaceExperience', 'EaseOfNavigation', 'ClarityOfWordsUsed']
                    };
                    $scope.questionnaire.radio_TeachingSupports = {
                        info: ['Helpfulness', 'QualityOfTechnicalSupport']
                    };
                    $scope.questionnaire.radio_MostBenefits = {
                        info: ["JoinProgram", "CompanyInHouse", "OpenClass"]
                    };
                });
            }

        };


        /********************  Chart C1  ********************/
        $scope.switchTableReportC1Period = function(period){
            $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod = period.period;
            $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.data = $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
            $scope.data.chartC12SegmentsLeadersByValuePretenders.data = $scope.data.chartC12SegmentsLeadersByValuePretenders.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
            $scope.data.chartC13SegmentsLeadersByValueModerate.data = $scope.data.chartC13SegmentsLeadersByValueModerate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
            $scope.data.chartC14SegmentsLeadersByValueGoodLife.data = $scope.data.chartC14SegmentsLeadersByValueGoodLife.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
            $scope.data.chartC15SegmentsLeadersByValueUltimate.data = $scope.data.chartC15SegmentsLeadersByValueUltimate.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
            $scope.data.chartC16SegmentsLeadersByValuePragmatic.data = $scope.data.chartC16SegmentsLeadersByValuePragmatic.allData[$scope.data.chartC11SegmentsLeadersByValuePriceSensitive.currentPeriod + 3];
        };


        /********************  Chart C2  ********************/
        $scope.switchPerceptionMapsData = function(flag){
            $scope.css.tableReportTabC2 = flag;
            if(flag === 'SKU'){
                $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
            }else{
                $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataBrand;
            }
        };
        $scope.switchTableReportC2Period = function(period){
            $scope.data.chartC21PerceptionMap.currentPeriod = period.period;
            $scope.data.chartC21PerceptionMap.data = period;
            $scope.data.chartC21PerceptionMap.dataChart = $scope.data.chartC21PerceptionMap.data.dataSKU;
        };























        /********************  切换左部图标菜单  ********************/
        $scope.clickChartMenu = function(chart){
            $scope.css.menu = 'Report';
            $scope.css.chartMenu = chart;
            // 原因 图表渲染的宽度没有撑开 ng-show改为ng-if 就可以撑开了.
        };


        /********************  切换顶部菜单  ********************/
        $scope.switchHeaderMenu = function(menu){
            $scope.css.menu = menu;
        };





        /********************  初始化程序  获取Decision 等信息  ********************/

        app.initOnce();







        /********************  点击添加一个新的Brand 显示添加Brand的表单  ********************/
        $scope.showAddNewBrandForm = function(){
            $scope.css.addNewBrand = true;
            $scope.data.newBrand.brand_name = "";
            $scope.data.newBrand.sku_name = "";
            $scope.data.newBrand.othererrorinfo = "";
            $scope.data.newBrand.companyId = $scope.data.currentStudent.companyId;
        };

        $scope.addNewBrand = function(form){

            if (form.$valid) {

                // 自动给品牌名称增加公司前缀
                $scope.data.newBrand.brand_name = $scope.data.currentCompanyNameCharacter + $scope.data.newBrand.brand_name;


                Company.addBrand($scope.data.newBrand).then(function(data, status, headers, config){

                    app.reRun();

                    notify({
                        message  : 'Save Success !',
                        template : notifytemplate.success,
                        position : 'center'
                    });

                    $scope.css.addNewBrand = false;
                }, function(data){
                    form.brandName.$valid = false;
                    form.brandName.$invalid = true;
                    form.brandName.$error.required = false;
                    $scope.data.newBrand.othererrorinfo = data.data.message ;

                });
            }
        };

        /********************  更新 Brand  ********************/
        $scope.updateBrand = function(form){
            $scope.data.currentModifiedBrand = {
                companyId : $scope.data.currentStudent.companyId,
                brand_id : $scope.data.currentBrand.d_BrandID,
                brand_data : {
                    d_SalesForce : $scope.data.currentBrand.d_SalesForce
                }
            };

            Company.updateBrand($scope.data.currentModifiedBrand).then(function(data, status, headers, config){
                form.brandSalesForce.$valid = true;
                form.brandSalesForce.$invalid = false;

                app.reRun();

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


        /********************  点击添加一个新的SKU 显示添加SKU的表单  ********************/
        $scope.showAddNewSkuForm = function(){
            $scope.css.addNewSku = true;
            $scope.data.newSku.sku_name = "";
            $scope.data.newSku.brand_id = "";
            $scope.data.newSku.othererrorinfo = "";
            $scope.data.newSku.companyId = $scope.data.currentStudent.companyId;
        };

        $scope.addNewSku = function(form){
            $scope.data.newSku.brand_id = $scope.data.currentBrand.d_BrandID;

            if (form.$valid) {
                Company.addSku($scope.data.newSku).then(function(data, status, headers, config){

                    app.reRun();

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


        /********************  点击选中Brand 或 SKU  ********************/
        $scope.clickBrand = function(brand){
            $scope.css.currentDecisionBrandId = brand._id;
            $scope.data.currentBrand = brand;
            $scope.css.addNewBrand = false;
            $scope.css.addNewSku = false;
        };

        $scope.clickCurrentSku = function(sku){
            $scope.css.skuErrorField = '';
            $scope.css.skuErrorFieldFrontEnd = '';
            $scope.data.currentSku = angular.copy(sku);
            Company.getCompanyFutureProjectionCalculator($scope.data.currentSku.d_SKUID, $scope.data.currentStudent.companyId).then(function(data, status, headers, config){
                $scope.data.currentCompanyFutureProjectionCalculator = data;
            });
        };


        /********************  更新 SKU  ********************/
        $scope.leaveSkuInput = function(sku, fieldname, fielddata, segmentOrWeek, weekindex){
            $scope.data.currentModifiedSku = {
                seminarId : $scope.data.currentStudent.seminarId,
                companyId : $scope.data.currentStudent.companyId,
                brand_id : sku.d_BrandID,
                sku_id : sku.d_SKUID,
                sku_data : {}
            };


            //表单验证

            var regexInteger = /^\d+$/;
            var regexFloat = /^\d+(\.\d{1,2})?$/;
            var regexFloat2 = /^0(\.\d{1,2})?$/;
            var regexHundred = /^[1-9][0-9]?$|^0$|^100$/;

            if(fieldname === 'd_Technology' &&  !regexInteger.test(fielddata)  ) {
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_IngredientsQuality' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_ProductionVolume' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_FactoryPrice' && !regexFloat.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_Advertising' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_PromotionalBudget' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_TradeExpenses' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_AdditionalTradeMargin' && !regexFloat2.test(fielddata) ){

                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_WholesalesBonusMinVolume' && !regexInteger.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;

            }else if(fieldname === 'd_WholesalesBonusRate' && !regexFloat2.test(fielddata) ){
                $scope.css.skuErrorFieldFrontEnd = fieldname;
            }else{

                // 表单验证成功 发送修改请求
                $scope.data.currentModifiedSku.sku_data[fieldname] = fielddata;


                if(fieldname === 'd_TargetConsumerSegment'){
                    sku.d_TargetConsumerSegment = segmentOrWeek;
                    $scope.data.currentModifiedSku.sku_data[fieldname] = segmentOrWeek;

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
                    //$scope.data.currentModifiedSku.sku_data[fieldname] = Number(fielddata) / 100;
                }else if(fieldname === 'd_WholesalesBonusRate'){
                    // 针对 d_WholesalesBonusRate 字段需要特殊处理
                    //$scope.data.currentModifiedSku.sku_data[fieldname] = Number(fielddata) / 100;
                }



                Company.updateSku($scope.data.currentModifiedSku).then(function(data, status, headers, config){

                    app.reRun();

                    notify({
                        message : 'Save Success !',
                        template : notifytemplate.success,
                        position : 'center'
                    });
                }, function(data){

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
                    app.reRun();
                });
            }

        };


        /********************  删除一个SKU  注意该SKU必须是本回合添加的SKU才可以删除 ********************/
        $scope.delSku = function(sku){
            Company.delSku($scope.data.currentStudent.companyId, sku.d_BrandID, sku.d_SKUID).then(function(data, status, headers, config){

                app.reRun();

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


        /********************  更新 Company  ********************/
        $scope.updateCompany = function(fieldname, form, formfieldname){

            $scope.data.currentModifiedCompany = {
                companyId : $scope.data.currentStudent.companyId,
                company_data : {}
            };

            $scope.data.currentModifiedCompany.company_data[fieldname] = $scope.data.currentCompany[fieldname];

            Company.updateCompany($scope.data.currentModifiedCompany).success(function(data, status, headers, config){
                $scope.css.additionalBudget = true;


                form[formfieldname].$valid = true;
                form[formfieldname].$invalid = false;

                app.reRun();

                notify({
                    message : 'Save Success !',
                    template : notifytemplate.success,
                    position : 'center'
                });
            }).error(function(data, status, headers, config){

                form[formfieldname].$valid = false;
                form[formfieldname].$invalid = true;

                $scope.css.companyErrorInfo = data;

                notify({
                    message : data.message,
                    template : notifytemplate.failure,
                    position : 'center'
                });
            });
        };











        /********************  提交 Questionnaire  ********************/
        $scope.submitQuestionnaire = function(questionnaire) {

            var currentData = {
                'questionnaire': questionnaire
            };

            Company.submitQuestionnaire(currentData).success(function(data, status, headers, config) {
                notify({
                    message: 'Save Success !',
                    template: notifytemplate.success,
                    position: 'center'
                });
                $scope.css.showFeedback = false;
                $scope.isFeedbackSumbit = true;

            }, function(data, status, headers, config) {
                notify({
                    message: data.message,
                    template: notifytemplate.failure,
                    position: 'center'
                });
                $scope.isFeedbackSumbit = false;

            });
        };




        /********************  Search Report   ********************/

        var reports = [
            {
                name : 'Company Status',
                id : 'A1',
                keywords : [ 'Company', 'Company Status', 'Market Share', 'Market Share Value', 'Market Share Volume', 'Lost Sales Volume', 'Numberical Distribution', 'Volume Weighted Distribution', 'Shelf Space', 'Awareness', 'Average Net Market Price', 'Average Display Price', 'Average Market Price', 'Price Ranking Index', 'Target Consumer Segment', 'Value Perception', 'Image Perception', 'Ingredients Quality Index', 'Applied Technology Index', 'Market Sales Value', 'Consumer Price Promotions', 'Market Net Sales Value', 'Number of Out-of-stock Episodes', 'Market Sales Volume', 'Retailers Purchases Volume', 'Shipments to Wholesalers', 'Production Volume', 'Inventory Volume At Manufacturer', 'Inventory Volume At Wholesalers', 'Inventory Volume At Retailers', 'Stocks Cover At Retailers', 'Stocks Cover At Wholesalers', '公司基本信息', '市场份额', '市场销量', '因缺货损失的销售量', '数值分销率', '加权分销率', '货架空间', '知名度', '平均净市场价', '平均陈列价格', '价格排序指数', '目标细分市场', '价值感知', '形象感知', '成分质量指数', '应用的技术指数', '市场销售额', '消费者价格促销', '市场净销售额', '缺货周数', '市场销售量', '零售商购买量', '经销商购买量', '产量', '厂商持有的库存量', '经销商持有的库存量', '零售商持有的库存量', '零售商的库存维持期', '经销商的库存维持期' ]
            },
            {
                name : 'Financial Report',
                id : 'A2',
                keywords : [ 'Financial', 'Financial Report', '"Sales Value', 'Share In Brand Total Sales Value', 'Cost of Goods Sold', 'Obsolete Goods Cost', 'Discontinued Goods Cost', 'Inventory Holding Cost', 'Total Material Cost', 'Gross Profit', 'Gross Profit Margin', 'Share In Brand Gross Profit/Losses', 'Advertising', 'Consumer Promotion Cost', 'Trade Investment', 'Sales Force Cost', 'Additional Trade Margin Cost', 'Volume Discount Cost', 'Total Trade and Marketing Expenses', 'Trade and Marketing Expenses as a (%) of Sales', 'Share of Trade and Marketing Expenses in Brand Total', 'General Expenses', 'Amortisation', 'Operating Profit', 'Operating Profit Margin', 'Share in Brand Operating Profit/Loss', 'Interests', 'Taxes', 'Exceptional Cost/Profit', 'Net Profit', 'Net Profit Margin', 'Share in Brand Net Profit/Loss', 'Production Cost', 'Inventory Value', '财务报告', '销售额', '占该品牌总销售额的份额', '售出商品成本', '处理商品成本', '停产商品成本', '库存持有成本', '总材料成本', '毛利额', '毛利率', '占该品牌 毛利/负毛利 的份额', '广告费用', '促销成本', '零售终端费用', '销售团队成本', '额外零售终端返利', '经销商进货折扣成本', '总的通路和营销费用', '通路和营销费用占销售额的百分比', '占该品牌通路和营销总额的份额', '一般性开支', '摊销费用', '运营利润', '运营利润率', '占该品牌 运营利润/运营亏损 的份额', '利息', '税', '额外开支/利润', '净利润', '净利率', '占该品牌 净利润/净亏损 的份额', '生产成本', '库存价值' ]
            },
            {
                name : 'Inventory Report',
                id : 'A3',
                keywords : [ 'Inventory', 'Inventory Report', 'Close to expire Inventory', 'Previous Inventory', 'Fresh Inventory', 'Total Stock', '库存报告', '将要过期的库存', '以前的库存', '新库存' ]
            },
            {
                name : 'Profitability Evolution',
                id : 'A4',
                keywords : [ 'Evolution', 'Profitability Evolution', 'Manufacturer Sales Value', 'Cost of Goods Sold', 'Inventory Holding', 'Obsolete Goods', 'Discontinued Goods Cost', 'Gross Profit', 'Advertising', 'Consumer Promotions Cost', 'Trade Investment', 'Sales Force Cost', 'Volume Discount Cost', 'Additional Trade Margin Cost', 'Total Trade and Marketing Expenses', 'General Expenses', 'Amortisation', 'Operating Profit', 'Interests', 'Exceptional Cost/Profit', 'Taxes', 'Net Profit', 'Surcharge for supplementary InvestmentBudget', 'Share In Brand Total Sales Value', 'Share In Brand Gross Profit/Losses', 'Share of Trade and Marketing Expenses In Brand Total', 'Share In Brand Operating Profit/Losses', 'Share In Brand Net Profit/Losses', 'Gross Profit Margin', 'Trade and Marketing Expenses as a(%) of Sales', 'General Expenses as a(%) of Sales', 'Operating Profit Margin', 'Net Profit Margin', 'Return on Investment', 'Average Net Market Price', 'Average Wholesales Price', 'Average Manufacturer Price', 'Average Production Cost', 'Market Sales Value', 'Consumer Price Promotions', 'Market Net Sales Value', 'Additional Retailers Margin', 'Wholesalers Bonus Rate', 'Minimal Purchase Qualifying for Bonus', 'Production Cost', 'Inventory Value', '盈利变化', '厂商销售额', '售出商品成本', '库存持有成本', '处理商品成本', '停产商品成本', '毛利额', '广告费用', '促销成本', '零售终端费用', '销售团队成本', '经销商进货折扣成本', '额外零售终端返利', '总的通路和营销费用', '一般性开支', '摊销费用', '运营利润', '利息', '额外开支/利润', '税', '净利润', '追加投资预算产生的额外费用', '净利额', '占该品牌总销售额的份额', '占该品牌 毛利/负毛利 的份额', '占公司通路和营销总费用的份额', '占该品牌 运营利润/运营亏损 的份额', '占该品牌 净利润/净亏损 的份额', '毛利率', '通路和营销费用占销售额的百分比', '一般费用占销售额的百分比', '运营利润率', '净利率', '投资回报率', '平均净市场价', '平均批发价', '平均出厂价', '平均生产成本', '市场销售额', '消费者价格促销', '市场净销售额', '给零售商的额外折扣', '经销商进货折扣率', '享受进货折扣的最低订货量', '生产成本', '库存价值' ]
            },
            {
                name : 'Market Share',
                id : 'B1',
                keywords : [ 'Market Share', 'Market Share in Value', 'Market Share in Volume', 'Mind Space Share', 'Shelf Space Share', '市场份额', '市场份额 （按销售额计%)', '市场份额 （按销量计%)', '思维空间份额', '货架空间份额' ]
            },
            {
                name : 'Competitor Intelligence',
                id : 'B2',
                keywords : [ 'Intelligence', 'Competitor Intelligence', 'Competitor', 'Technology', 'Acquired Production and Logistics Efficiency', 'Acquired Production Planning Flexibility', 'Available Technology Level', 'Marketing & Sales', 'Additional Trade Margin Cost', 'Advertising', 'Consumer Promotions Cost', 'Retailers Purchase Volume', 'Sales Force Cost', 'Shipments to Wholesalers', 'Trade Investments', 'Volume Discount Cost', 'Operations', 'Capacity Utilisation Rate', 'Inventory Volume at Manufacturer', 'Inventory Volume at Retailers', 'Inventory Volume at Wholesalers', 'Next Period Available Prod.Capacity', 'Production Volume', 'Investments', 'Investment to Improve Technology Level', 'Investment to Increase Production Efficiency', '竞争对手情报', '技术', '当前拥有的生产效率', '当前拥有的生产灵活度', '最高技术水平', '市场营销和销售', '额外零售终端返利', '广告费用', '促销成本', '零售商购买量', '销售团队成本', '经销商购买量', '零售终端费用', '经销商进货折扣成本', '操作', '产能利用率', '厂商持有的库存量', '零售商持有的库存量', '经销商持有的库存量', '下一阶段产能', '产量', '投资', '技术水平投资', '生产效率投资' ]
            },
            {
                name : 'Investment & Profits',
                id : 'B3',
                keywords : [ 'Investment and Profits', 'Investment', 'Profit', 'Total Investment', 'Net Profit By Companies', 'Return on Investment', 'Investment Versus Budget', '投资与利润', '预计的当期投资总额', '公司净利额', '投资回报率', '投资占预算比例' ]
            },
            {
                name : 'Market Sales & Inventory',
                id : 'B4',
                keywords : [ 'Market Sales & Inventory Report', 'Market Sales', 'Inventory', 'Market Sales Value', 'Market Sales Volume', 'Total Inventory at Factory', 'Total Inventory at Trade', '销售与库存状况', '市场销售额', '市场销售量', '工厂中的库存量', '渠道中的库存量' ]
            },
            {
                name : 'Segment Leader Top5',
                id : 'C1',
                keywords : [ 'Segment', 'Segment Leader', 'Segment Leader Top 5', '细分市场领导者' ]
            },
            {
                name : 'Perception Map',
                id : 'C2',
                keywords : [ 'Perception', 'Perception Map', 'Value Perception', 'Image Perception', '感知图', '价值感知', '形象感知' ]
            },
            {
                name : 'Segment Distributions',
                id : 'C3',
                keywords : [ 'Distributions', 'Segment Distributions', 'Market Share Value', 'Market Share Volume', 'Market Sales Value', 'Market Sales Volume', 'Average Net Market Price', 'Value Perception', 'Image Perception', '细分市场数据', '市场份额', '市场销售额', '市场销售量', '平均净市场价', '价值感知', '形象感知' ]
            },
            {
                name : 'Market Evolution',
                id : 'C4',
                keywords : [ 'Evolution', 'Market Evolution', 'Growth Rate', 'Growth Rate In Volume', 'Growth Rate In Value', 'Net Market Price', 'Segment Value Share In Total Market', '市场演变趋势', '基于销量的增长率', '基于销售额的增长率', '净市场价', '细分市场占总市场的销售份额（' ]
            },
            {
                name : 'Market Trends',
                id : 'C5',
                keywords : [ 'Trends', 'Market Trends', 'Market Figures', 'Average Display Price', 'Average Net Market Price', 'Brand Awareness', 'Image Perception', 'Market Net Sales Value', 'Market Net Sales Volume', 'Market Share', 'Market Share', 'Miscellaneous', 'Lost Sales Volume', 'Numerical Distribution', 'Total Inventory at Trade', 'Price Ranking Index', 'Shelf Space', 'Value Share', 'Value Share by Segment', 'Volume Share', 'Volume Share by Segment', '市场趋势', '市场数据', '平均陈列价格', '平均净市场价', '品牌知名度', '形象感知', '市场净销售额', '市场销量', '市场份额', '其他', '因缺货损失的销售量', '数值分销率', '渠道中的库存量', '价格排序指数', '货架空间', '占细分市场销售额' ]
            },
            {
                name : 'Market Indicator',
                id : 'C6',
                keywords : [ 'Indicator', 'Market Indiciator', 'Corporate Tax Rate', 'Inflation Rate', 'Deposit Rate', 'Borrowing Rate', 'Additional Investment Budget Surcharge Rate', 'Inventory Holding Cost', 'Obsolete Goods Cost', 'Discontinued Goods Cost', '宏观市场参数', '公司税率', '通货膨胀率', '存款利率', '借贷利率', '其他投资预算附加费率', '库存持有成本', '过期商品成本', '停产商品成' ]
            }
        ];

        $scope.searchReport = function(){

            $scope.css.currentSearchReportName = [];
            if($scope.data.reportName !== ''){

                angular.forEach(reports, function(child){

                    var flagHaveThisReport = false;
                    //判断是否该报告已经被搜索到了, 如果没搜索到在继续循环关键字.
                    if($scope.css.currentSearchReportName.length > 0){

                        angular.forEach($scope.css.currentSearchReportName, function(reportid){
                            if(reportid === child.id){
                                flagHaveThisReport = true;
                            }
                        });
                    }

                    if(!flagHaveThisReport){
                        angular.forEach(child.keywords, function(keyword){

                            if(!flagHaveThisReport){
                                if(keyword.toLowerCase().indexOf($scope.data.reportName) > -1){
                                    $scope.css.currentSearchReportName.push(child.id);
                                    flagHaveThisReport = true;
                                }
                            }
                        });

                    }

                });
            }
        };









        /********************  Report Comparison   ********************/
        $scope.showComparisonPage = function(){
            /*Score 页面跳转到Report页面*/
            $scope.css.menu = 'Report';

            $scope.css.comparisonPage = !$scope.css.comparisonPage;
        };

        $scope.startDragReport = function(reportid, event1){
            $scope.css.dragSourceReportId = reportid;
            $scope.css.dragTargetBoxId = '';
            $scope.css.dragReportFlag = true;

            // Prevent default dragging of selected content
            event1.preventDefault();

            var moveSourceDom = angular.element(event1.currentTarget);

            var movingDom = angular.element('.dragReportMovingBox');
            movingDom.empty().append(moveSourceDom.clone());

            $scope.css.dragReportPosition.top = event.clientY + 10;
            $scope.css.dragReportPosition.left = event.clientX - 120;


            $document.on($scope.css.dragEvent.moveEvents, onReportMove);
            $document.on($scope.css.dragEvent.releaseEvents, onReportRelease);
        };

        function onReportMove(event) {
            $scope.$apply(function () {
                $scope.css.dragReportPosition.top = event.clientY + 10;
                $scope.css.dragReportPosition.left = event.clientX - 120;
            });
        }

        function onReportRelease() {
            $scope.$apply(function () {
                var targetDom = {};
                var targetDomContent = {};
                if($scope.css.dragTargetBoxId !== ''){

                    if($scope.css.dragTargetBoxId === 'comparisonBoxLeft'){
                        $scope.css.dragHaveLeftReport = $scope.css.dragSourceReportId;
                    }else{
                        $scope.css.dragHaveRightReport = $scope.css.dragSourceReportId;
                    }
                }

                $scope.css.dragReportFlag = false;
                $scope.css.dragSourceReportId = '';
                $scope.css.dragTargetBoxId = '';

            });

            $document.off($scope.css.dragEvent.moveEvents, onReportMove);
            $document.off($scope.css.dragEvent.releaseEvents, onReportRelease);
        }

        $scope.enterComparisonBox = function(targetboxid){

            if(targetboxid === ''){
                $scope.css.dragTargetBoxId = '';
            }else{
                $scope.css.dragTargetBoxId = 'comparisonBox' +  targetboxid;
            }

        };

    }]);





}());
