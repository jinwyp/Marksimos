/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', ['angularCharts', 'nvd3ChartDirectives', 'marksimos.component', 'marksimos.factory' ]);



// controller business logic
marksimosapp.controller('chartController', function AppCtrl ($scope,  $timeout, $http, report, company) {

    $scope.css = {
        menu : 'Report',
        chartMenu : 'C2',
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

        chartA31InventoryReport : {
            data : [],
            title : 'Inventory Report',
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf', '#000000']
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

        chartC21PerceptionMap : {
            data : [],
            dataChart : [],
            title : 'Perception Maps',
            color : ['#39b54a', '#ff983d', '#0087f0', '#8781bd', '#f26c4f', '#bd8cbf']
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


    $scope.A31ColorFunction = function(){
        return function(d, i){
            return $scope.data.chartA31InventoryReport.color[i];
        };
    };

    $scope.C31shapeFunction = function(){
        return function(d) {
            return d.shape;
        };
    };

    $scope.C31shapeTooltipFunction = function(){
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
                    '</ul></div>'

            }else {
                htmlResult = '<h5><span class="perception_logo" style="background-color:' + iconColor + '"></span>' + key + ' ' + e.point.name + '</h5>'
            }


            return htmlResult
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


    // Chart A3
    report.inventoryReport().then(function(data, status, headers, config){
        $scope.data.chartA31InventoryReport.data = data;
//        console.log($scope.data.chartA31InventoryReport.data);
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


    // Chart C2
    report.perceptionMap().then(function(data, status, headers, config){
        console.log(data);
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

