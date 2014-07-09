/**
 * Created by jinwyp on 4/28/14.
 */


// create module for custom directives
var marksimosapp = angular.module('marksimos', ['pascalprecht.translate', 'angularCharts', 'nvd3ChartDirectives', 'marksimos.component', 'marksimos.factory', 'marksimos.filters', 'marksimos.translation' ]);


// controller business logic
marksimosapp.controller('chartController', function($scope,  $timeout, $http, chartReport, tableReport, company) {

    $scope.css = {
        menu : 'Home',
        chartMenu : 'A1',
        tableReportTab : 'SKU',
        additionalBudget : true,
        currentBrandId : 0,
        currentDecisionRightMenu : 1
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
        currentCompany : {},
        currentCompanyOtherInfo : {},
        currentCompanyProductPortfolio : {},
        currentCompanySpendingDetails : {},
        currentCompanyFutureProjectionCalculator : [],
        currentBrand : {},
        currentModifiedSku : {},
        currentSku : {},
        userSegment : [
            {id:1, name:'1 Price Sensitive'},
            {id:2, name:'2 Pretenders'},
            {id:3, name:'3 Moderate'},
            {id:4, name:'4 Good Life'},
            {id:5, name:'5 Ultimate'},
            {id:6, name:'6 Pragmatic'}
        ],


        tableA1CompanyStatus : {
            allCompanyData : [],
            currentCompany : {
                companyName : 'Company List'
            },
            currentSKU : {},
            currentBrand : {},
            currentGlobal : {},
            title : 'Company Status'
        },
        tableA2FinancialData : {
            allData : [],
            currentCompany : {},
            currentPeriod : {
                period : 'Select Period'
            },
            currentBrand : {},
            title : 'Financial Report'
        },

        chartA31InventoryReport : {
            data : [],
            title : 'Inventory Report',
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
        },

        chartB11MarketShareInValue : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB12MarketShareInVolume : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB13MindSpaceShare : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB14ShelfSpaceShare : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartB31TotalInvestment : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB32NetProfitByCompanies : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB33ReturnOnInvestment : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB34InvestmentsVersusBudget : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB41MarketSalesValue : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB42MarketSalesVolume : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB43TotalInventoryAtFactory : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartB44TotalInventoryAtTrade : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },

        chartC11SegmentsLeadersByValuePriceSensitive : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC12SegmentsLeadersByValuePretenders : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC13SegmentsLeadersByValueModerate : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC14SegmentsLeadersByValueGoodLife : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC15SegmentsLeadersByValueUltimate : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC16SegmentsLeadersByValuePragmatic : {
            type : chartReport.getChartType2(),
            config : chartReport.getChartConfig2(),
            data : $scope.dataChartSimple
        },
        chartC21PerceptionMap : {
            data : [],
            dataChart : [],
            title : 'Perception Maps',
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
        },
        chartC41GrowthRateInVolume : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC42GrowthRateInValue : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC43NetMarketPrice : {
            type : chartReport.getChartType1(),
            config : chartReport.getChartConfig1(),
            data : $scope.dataChartSimple
        },
        chartC44SegmentValueShareTotalMarket : {
            type : chartReport.getChartType3(),
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
    $scope.data.chartB11MarketShareInValue.config.title = 'Market Share in Value (%)';
    $scope.data.chartB12MarketShareInVolume.config.title = 'Market Share in Volume (%)';
    $scope.data.chartB13MindSpaceShare.config.title = 'Mind Space Share (%)';
    $scope.data.chartB14ShelfSpaceShare.config.title = 'Shelf Space Share(%)';

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
    $scope.data.chartB31TotalInvestment.config.title = 'Total Investment (mln RMB)';
    $scope.data.chartB32NetProfitByCompanies.config.title = 'Net Profit By Companies (mln RMB)';
    $scope.data.chartB33ReturnOnInvestment.config.title = 'Return On Investment (%)';
    $scope.data.chartB34InvestmentsVersusBudget.config.title = 'Investments Versus Budget (%)';

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
    $scope.data.chartB41MarketSalesValue.config.title = 'Market Sales Value (mln RMB)';
    $scope.data.chartB42MarketSalesVolume.config.title = 'Market Sales Volume (std pack)';
    $scope.data.chartB43TotalInventoryAtFactory.config.title = 'Total Inventory At Factory (std pack)';
    $scope.data.chartB44TotalInventoryAtTrade.config.title = 'Total Inventory At Trade (std pack)';

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
    $scope.data.chartC11SegmentsLeadersByValuePriceSensitive.config.title = 'Price Sensitive (%)';
    $scope.data.chartC12SegmentsLeadersByValuePretenders.config.title = 'Pretenders (%)';
    $scope.data.chartC13SegmentsLeadersByValueModerate.config.title = 'Moderate (%)';
    $scope.data.chartC14SegmentsLeadersByValueGoodLife.config.title = 'GoodLife (%)';
    $scope.data.chartC15SegmentsLeadersByValueUltimate.config.title = 'Ultimate (%)';
    $scope.data.chartC16SegmentsLeadersByValuePragmatic.config.title = 'Pragmatic (%)';

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
//        console.log(data);
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
    $scope.data.chartC41GrowthRateInVolume.config.title = 'Growth Rate In Volume (Period 3 = 100)';
    $scope.data.chartC42GrowthRateInValue.config.title = 'Growth Rate In Value (Period 3 = 100)';
    $scope.data.chartC43NetMarketPrice.config.title = 'Net Market Price (Period 3 = 100)';
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
    };
    $scope.switchTableReportBrand = function(brand){
        $scope.data.tableA1CompanyStatus.currentBrand = brand;
        $scope.data.tableA2FinancialData.currentBrand = brand;
    };


    /********************  Table Report A2  ********************/
    tableReport.financialReport().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.tableA2FinancialData.allData = data;
        $scope.data.tableA2FinancialData.currentCompany = data[0];
        $scope.data.tableA2FinancialData.currentPeriod = $scope.data.tableA2FinancialData.currentCompany.periods[0];
        $scope.data.tableA2FinancialData.currentBrand = $scope.data.tableA2FinancialData.currentPeriod.brands[0];
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
    company.getCompany().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.currentCompany = data;
        $scope.css.currentBrandId = $scope.data.currentCompany.d_BrandsDecisions[0]._id;
        $scope.data.currentBrand = $scope.data.currentCompany.d_BrandsDecisions[0];
        $scope.data.currentSku = $scope.data.currentCompany.d_BrandsDecisions[0].d_SKUsDecisions[0];

        company.getCompanyFutureProjectionCalculator($scope.data.currentSku.d_SKUID).then(function(data, status, headers, config){
//            console.log(data);
            $scope.data.currentCompanyFutureProjectionCalculator = data;

        });

    });

    company.getCompanyOtherInfo().then(function(data, status, headers, config){
        $scope.data.currentCompanyOtherInfo = {
            totalAvailableBudget : data.totalAvailableBudget * 100,
            totalAvailableBudgetCSS : data.totalAvailableBudget * 100 + '%',
            normalCapacity : data.normalCapacity * 100,
            normalCapacityCSS : data.normalCapacity * 100 + '%',
            overtimeCapacity : data.overtimeCapacity * 100,
            overtimeCapacityCSS : data.overtimeCapacity * 100 + '%'
        };

//        console.log($scope.data.currentCompanyOtherInfo);

    });



    company.getCompanyProductPortfolio().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.currentCompanyProductPortfolio = data;
    });

    company.getCompanySpendingDetails().then(function(data, status, headers, config){
//        console.log(data);
        $scope.data.currentCompanySpendingDetails = data;
    });




    $scope.clickBrand = function(brand){
        $scope.css.currentBrandId = brand._id;
        $scope.data.currentBrand = brand;
    };

    $scope.clickCurrentSku = function(sku){
        $scope.data.currentSku = sku;
    };



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
        }
        

        console.log($scope.data.currentModifiedSku, sku);

        company.updateSku($scope.data.currentModifiedSku).success(function(data, status, headers, config){
            console.log(data);
        });
    };


});

