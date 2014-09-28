/**
 * Created by jinwyp on 5/29/14.
 */

/**
 * recommended
 *
 * no globals are left behind
 */

(function () {
    'use strict';


    /********************  Create New Module For Model ********************/

    angular.module('marksimos.model', ['pascalprecht.translate', 'marksimos.translation']);


    /********************  Use This Module To Set New Factory  ********************/


    angular.module('marksimos.model').factory('Student', ['$http', studentModel]);
    angular.module('marksimos.model').factory('Company', ['$http', companyModel]);

    angular.module('marksimos.model').factory('chartReport', ['$http', '$rootScope', '$translate', chartReportModel]);
    angular.module('marksimos.model').factory('tableReport', ['$http', tableReportModel]);

    angular.module('marksimos.model').factory('Help', ['$http', helpModel]);


    var apiPath = '/marksimos/api/';

    var errorHandler = function(err){
        console.log("Error 404 , Type : API ", err );
    };

    function studentModel ($http){

        var factory = {
            login : function(user){
                return $http.post(apiPath + 'login', user);
            },
            logOut : function(){
                return $http.get(apiPath + 'logout');
            },

            getStudent : function(){
                return $http.get(apiPath + 'user').then(function(result){

                    return result.data;
                })["catch"](function(err){
                    console.log(err);
                });
            },

            getSeminar : function(){
                return $http.get(apiPath + 'student/seminar').then(function(result){

                    return result.data;
                })["catch"](function(err){
                    console.log(err);
                });
            }
        };

        return factory;
    }



    function companyModel ($http){

        var factory = {
            getCurrentStudent : function(){
                return $http.get(apiPath + 'studentinfo').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            getCompany : function(){
                return $http.get(apiPath + 'company').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },
            getCompanyOtherInfo : function(){
                return $http.get(apiPath + 'company/otherinfo').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },
            getCompanyFutureProjectionCalculator : function(id){
                return $http.get(apiPath + 'future_projection_calculator/' + id).then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },
            getCompanyProductPortfolio : function(){
                return $http.get(apiPath + 'product_portfolio').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },
            getCompanySpendingDetails : function(){
                return $http.get(apiPath + 'spending_details').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },


            addSku : function(postdata){
                return $http.post(apiPath + 'sku/decision/', postdata);
            },

            updateSku : function(postdata){
                return $http.put(apiPath + 'sku/decision/', postdata);
            },

            delSku : function(skuid, brandid){
                return $http['delete'](apiPath + 'sku/decision/' + brandid + '/' + skuid);
            },


            addBrand : function(postdata){
                return $http.post(apiPath + 'brand/decision/', postdata);
            },

            updateBrand : function(postdata){
                return $http.put(apiPath + 'brand/decision', postdata);
            },

            updateCompany : function(postdata){
                return $http.put(apiPath + 'company/decision', postdata);
            },

            getFinalScore : function(period){
                return $http.get(apiPath + 'finalscore/' + period).then(function(result){

                    result.data.highest_score = _.max(result.data.scores, function(companyScore){
                        return companyScore.finalScore;
                    }).finalScore;

                    for(var i=0;i<result.data.scores.length;i++){
                        result.data.scores[i].companyName = String.fromCharCode( 64 + result.data.scores[i].companyId);
                    }
                    return result.data;
                })["catch"](errorHandler);
            },

            getQuestionnaire : function(){
                return $http.get(apiPath + 'questionnaire');
            },

            updateQuestionnaire : function(postdata){
                return $http.put(apiPath + 'questionnaire', postdata);
            }

        };
        return factory;
    }



    function chartReportModel ($http, $rootScope, $translate){

        // 'FMCG': [
        //   0:  'FreshInventory',
        //   1:  'PreviousInventory',
        //   2:  'CloseToEXpireInventory'
        // ],
        // 'DURABLES': [
        //   0:  'Latest Stock',
        //   1:  'one-year old Stock',
        //   2:  'Two-year old Stock',
        //   3:  'Three-year old Stock',
        //   4:  'Oldest Stock'
        // ]

        // segmentNames: [
        // 0 - 'priceSensitive',
        // 1 - 'pretenders',
        // 2 - 'moderate',
        // 3 - 'goodLife',
        // 4 - 'ultimate',
        // 5 - 'pragmatic',
        // 6 - 'allSegments'
        // ],

        var translateText = {
            'ReportInventoryReportLabelCloseToExpireInventory' : '',
            'ReportInventoryReportLabelPreviousInventory'      : '',
            'ReportInventoryReportLabelFreshInventory'         : '',
            'HomePageSecondMenuBarLabelsCompany'               : '',
            'HomePageSegmentLabelPriceSensitive'               : '',
            'HomePageSegmentLabelPretenders'                   : '',
            'HomePageSegmentLabelModerate'                     : '',
            'HomePageSegmentLabelGoodLife'                     : '',
            'HomePageSegmentLabelUltimate'                     : '',
            'HomePageSegmentLabelPragmatic'                    : '',
            'HomePageSegmentLabelAllSegments'                  : ''
        };

        function showTranslateTextInventoryReport(fieldname) {
            var names = {
                '0': function() {
                    return translateText.ReportInventoryReportLabelFreshInventory;
                },
                '1': function() {
                    return translateText.ReportInventoryReportLabelPreviousInventory;
                },
                '2': function() {
                    return translateText.ReportInventoryReportLabelCloseToExpireInventory;
                }
            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }

        function showTranslateTextCompanyName(fieldname) {
            var names = {
                'A': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'A';
                },
                'B': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'B';
                },
                'C': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'C';
                },
                'D': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'D';
                },
                'E': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'E';
                },
                'F': function() {
                    return translateText.HomePageSecondMenuBarLabelsCompany + 'F';
                }
            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }

        function showTranslateTextConsumerSegmentName(fieldname) {
            var names = {
                '0': function() {
                    return translateText.HomePageSegmentLabelPriceSensitive;
                },
                '1': function() {
                    return translateText.HomePageSegmentLabelPretenders;
                },
                '2': function() {
                    return translateText.HomePageSegmentLabelModerate;
                },
                '3': function() {
                    return translateText.HomePageSegmentLabelGoodLife;
                },
                '4': function() {
                    return translateText.HomePageSegmentLabelUltimate;
                },
                '5': function() {
                    return translateText.HomePageSegmentLabelPragmatic;
                },
                '6': function() {
                    return translateText.HomePageSegmentLabelAllSegments;
                }
            };
            if (typeof names[fieldname] !== 'function') {
                return false;
            }
            return names[fieldname]();
        }


        function showTranslateTextSegmentName() {
            return translateText.ReportPerceptionMapAxisLabelSegment ;
        }


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
                position: 'right' //could be 'left, right'
            },
            innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
            lineLegend: 'traditional' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
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
                        // 判断是否是Segment Leader Top5 的图表还是SKUName的图表

                        if(chartResult.series.indexOf(value.SKUName.substring(0,1)) == -1 ){
                            chartResult.series.push(value.SKUName.substring(0,1));
                        }
                    }else{
                        // C44 segment_value_share_total_market
                        chartResult.series.push(showTranslateTextConsumerSegmentName(value.segmentName));
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
                        oneBarData.x = showTranslateTextConsumerSegmentName(value.segmentName);

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
                // 如果periods 有定义 则是带有系列的图表 包括图表 B1 和 C4
                angular.forEach(chartHttpData.periods, function(value, key) {

                    var oneLineData = {
//                    x : "period" + value.toString(), //Round Name
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
                    angular.forEach(chartHttpData.segmentNames, function(value, key) {
                        chartResult.series.push(showTranslateTextConsumerSegmentName(value));
                    });

                }else{
                    angular.forEach(chartHttpData.companyNames, function(value, key) {
                        chartResult.series.push(showTranslateTextCompanyName(value));
                    });
                }

                return angular.copy(chartResult);

            }else{
                console.log('chart Data format is wrong !');
                return '';
            }
        };


        var chartFormatTool2 = function(chartHttpData, decimalNumber){
            // 使用angular-chart 插件的数据格式 Bar Chart  For Segment Leader Top Chart

            chartResult.series = ['justoneseries'];
            chartResult.data = [];


            function showSkuColor(fieldname) {

                var colorsRGB =  [
                    'rgb(0,76,229)',
                    'rgb(187,0,0)',
                    'rgb(255,188,1)',
                    'rgb(51,153,51)',
                    'rgb(153,0,153)',
                    'rgb(255,82,0)'
                ];

                var names = {
                    'A': function() {
                        return colorsRGB[0];
                    },
                    'B': function() {
                        return colorsRGB[1];
                    },
                    'C': function() {
                        return colorsRGB[2];
                    },
                    'D': function() {
                        return colorsRGB[3];
                    },
                    'E': function() {
                        return colorsRGB[4];
                    },
                    'F': function() {
                        return colorsRGB[5];
                    }

                };
                if (typeof names[fieldname] !== 'function') {
                    return false;
                }
                return names[fieldname]();
            }

            if(angular.isUndefined(chartHttpData.periods)){
                // 如果periods 没有定义则是普通的图表,不带有系列的图表

                angular.forEach(chartHttpData.chartData, function(value, key) {
                    var oneBarData = {
                        x : "", //SKU Name
                        y : [],
                        color : 'rgb(57,181,74)'
                    };

                    if(angular.isUndefined(value.segmentName) ){
                        oneBarData.x = value.SKUName;

                        if(decimalNumber === 0){
                            oneBarData.y.push(Math.round(value.valueSegmentShare * 100) / 100 );
                        }else{
                            oneBarData.y.push(Math.round(value.valueSegmentShare * 10000) / Math.pow(10, Number(decimalNumber)) );
                        }

                        oneBarData.color = showSkuColor(value.SKUName.substring(0,1));
                    }

                    chartResult.data.push(oneBarData);
                });
            }
            return angular.copy(chartResult);

        };


        var chartFormatTool4 = function(chartHttpData) {
            // 使用angular-nvd3 插件的数据格式 Stacked Multi Bar Chart

            chartResult.series = [];
            chartResult.data = [];

            if(angular.isArray(chartHttpData.SKUs) ){
                angular.forEach(chartHttpData.SKUs[0].inventoryData, function(value, key) {
                    var oneSeries = {
                        "key": showTranslateTextInventoryReport(value.inventoryName),
                        "values": []
                    };
                    chartResult.data.push(oneSeries);
                    chartResult.series.push(showTranslateTextInventoryReport(value.inventoryName));
                });

                angular.forEach(chartHttpData.SKUs, function(value, key) {
                    var oneLineData1 = []; // Close To EXpire Inventory
                    oneLineData1.push( value.SKUName );
                    oneLineData1.push( angular.copy(Math.round(value.inventoryData[0].inventoryValue * 100) / 100 ) );

                    var oneLineData2 = []; // Previous Inventory
                    oneLineData2.push( value.SKUName );
                    oneLineData2.push( angular.copy(Math.round(value.inventoryData[1].inventoryValue * 100) / 100 ) );

                    var oneLineData3 = []; // Fresh Inventory
                    oneLineData3.push( value.SKUName );
                    oneLineData3.push( angular.copy(Math.round(value.inventoryData[2].inventoryValue * 100) / 100 ) );

                    chartResult.data[0].values.push(oneLineData1);
                    chartResult.data[1].values.push(oneLineData2);
                    chartResult.data[2].values.push(oneLineData3);

                });
                return angular.copy(chartResult.data);
            }

        };


        var chartFormatTool5 = function(chartHttpData) {
            // 使用angular-nvd3 插件的数据格式   only for C2 Perception Maps Scatter Chart 散点图
//        chartResult.series = [];
//        chartResult.data = [];
            chartResult.dataSKU = [];
            chartResult.dataBrand = [];
            chartResult.series = [];
            chartResult.data = [];

            if(angular.isArray(chartHttpData) ){

                angular.forEach(chartHttpData, function(value, key) {
                    var oneCompanySku = {
                        "key" : showTranslateTextCompanyName(value.companyName),
                        "values" : []
                    };

                    var oneCompanyBrand = {
                        "key" : showTranslateTextCompanyName(value.companyName),
                        "values" : []
                    };

                    angular.forEach(value.SKUs, function(valueSku, keySku) {
                        var oneLineSku1 = {
                            'x' : Math.round(valueSku.valuePerception * 10000000 + Math.random() * 1000 ) / 10000000,
                            'y' : Math.round(valueSku.imagePerception * 10000000 + Math.random() * 1000 ) / 10000000,
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
                    "key" : showTranslateTextSegmentName(),
                    "values" : []
                };

                angular.forEach(chartHttpData[0].exogenous, function(value, key) {
                    var oneLineData = {
                        'x' : Math.round(value.valuePerception * 100) / 100,
                        'y' : Math.round(value.imagePerception * 100) / 100,
                        'size' : 0.5,
                        'name' : showTranslateTextConsumerSegmentName(value.segmentName),
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


            // Chart A3
            inventoryReport : function(){
                return $translate(['ReportInventoryReportLabelCloseToExpireInventory',
                    'ReportInventoryReportLabelPreviousInventory',
                    'ReportInventoryReportLabelFreshInventory',
                    'HomePageSecondMenuBarLabelsCompany',
                    'ReportPerceptionMapAxisLabelSegment',
                    'HomePageSegmentLabelPriceSensitive',
                    'HomePageSegmentLabelPretenders',
                    'HomePageSegmentLabelModerate',
                    'HomePageSegmentLabelGoodLife',
                    'HomePageSegmentLabelUltimate',
                    'HomePageSegmentLabelPragmatic',
                    'HomePageSegmentLabelAllSegments'
                ]).then(function (translations) {

                    translateText.ReportInventoryReportLabelCloseToExpireInventory = translations.ReportInventoryReportLabelCloseToExpireInventory;
                    translateText.ReportInventoryReportLabelPreviousInventory = translations.ReportInventoryReportLabelPreviousInventory;
                    translateText.ReportInventoryReportLabelFreshInventory = translations.ReportInventoryReportLabelFreshInventory;
                    translateText.HomePageSecondMenuBarLabelsCompany = translations.HomePageSecondMenuBarLabelsCompany;
                    translateText.ReportPerceptionMapAxisLabelSegment = translations.ReportPerceptionMapAxisLabelSegment;
                    translateText.HomePageSegmentLabelPriceSensitive = translations.HomePageSegmentLabelPriceSensitive;
                    translateText.HomePageSegmentLabelPretenders = translations.HomePageSegmentLabelPretenders;
                    translateText.HomePageSegmentLabelModerate = translations.HomePageSegmentLabelModerate;
                    translateText.HomePageSegmentLabelGoodLife = translations.HomePageSegmentLabelGoodLife;
                    translateText.HomePageSegmentLabelUltimate = translations.HomePageSegmentLabelUltimate;
                    translateText.HomePageSegmentLabelPragmatic = translations.HomePageSegmentLabelPragmatic;
                    translateText.HomePageSegmentLabelAllSegments = translations.HomePageSegmentLabelAllSegments;

                    return  $http.get(apiPath + 'chart/inventory_report');
                }).then(function(result){
//                console.log(result.data);
                    return chartFormatTool4(result.data);
                })["catch"](errorHandler);
            },

            // Chart B1
            marketShareInValue : function(){
                return $http.get(apiPath + 'chart/market_share_in_value').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 2);
                })["catch"](errorHandler);
            },

            marketShareInVolume : function(){
                return $http.get(apiPath + 'chart/market_share_in_volume').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 2);
                })["catch"](errorHandler);
            },

            mindSpaceShare : function(){
                return $http.get(apiPath + 'chart/mind_space_share').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 2);
                })["catch"](errorHandler);
            },

            shelfSpaceShare : function(){
                return $http.get(apiPath + 'chart/shelf_space_share').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 2);
                })["catch"](errorHandler);
            },


            // Chart B3
            totalInvestment : function(){
                return $http.get(apiPath + 'chart/total_investment').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            netProfitByCompanies : function(){
                return $http.get(apiPath + 'chart/net_profit_by_companies').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            returnOnInvestment : function(){
                return $http.get(apiPath + 'chart/return_on_investment').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            investmentsVersusBudget : function(){
                return $http.get(apiPath + 'chart/investments_versus_budget').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },


            // Chart B4
            marketSalesValue : function(){
                return $http.get(apiPath + 'chart/market_sales_value').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            marketSalesVolume : function(){
                return $http.get(apiPath + 'chart/market_sales_volume').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            totalInventoryAtFactory : function(){
                return $http.get(apiPath + 'chart/total_inventory_at_factory').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            totalInventoryAtTrade : function(){
                return $http.get(apiPath + 'chart/total_inventory_at_trade').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },


            // Chart C1
            segmentsLeadersByValuePriceSensitive : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_price_sensitive').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },

            segmentsLeadersByValuePretenders : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_pretenders').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },

            segmentsLeadersByValueModerate : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_moderate').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },

            segmentsLeadersByValueGoodLife : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_good_life').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },

            segmentsLeadersByValueUltimate : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_ultimate').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },

            segmentsLeadersByValuePragmatic : function(){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_pragmatic').then(function(result){
//                console.log(result.data);
                    return chartFormatTool2(result.data, 2);
                })["catch"](errorHandler);
            },


            // Chart C2
            perceptionMap : function(){
                return $http.get(apiPath + 'chart/perception_map').then(function(result){
                    return chartFormatTool5(result.data);
                })["catch"](errorHandler);
            },


            // Chart C4
            growthRateInVolume : function(){
                return $http.get(apiPath + 'chart/growth_rate_in_volume').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            growthRateInValue : function(){
                return $http.get(apiPath + 'chart/growth_rate_in_value').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            netMarketPrice : function(){
                return $http.get(apiPath + 'chart/net_market_price').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 0);
                })["catch"](errorHandler);
            },

            segmentValueShareTotalMarket : function(){
                return $http.get(apiPath + 'chart/segment_value_share_total_market').then(function(result){
//                console.log(result.data);
                    return chartFormatTool1(result.data, 2);
                })["catch"](errorHandler);
            }
        };

        return factory;
    }



    function tableReportModel($http){

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
                })["catch"](errorHandler);
            },

            // Table Report A2
            financialReport : function(){
                return $http.get(apiPath + 'report/financial_report').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            // Table Report B2
            profitabilityEvolution : function(){
                return $http.get(apiPath + 'report/profitability_evolution').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            // Table Report B2
            competitorIntelligence : function(){
                return $http.get(apiPath + 'report/competitor_intelligence').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            // Table Report C3
            segmentDistribution : function(){
                return $http.get(apiPath + 'report/segment_distribution').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            // Table Report C5
            marketTrends : function(){
                return $http.get(apiPath + 'report/market_trends').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            },

            // Table Report C6
            marketIndicators : function(){
                return $http.get(apiPath + 'report/market_indicators').then(function(result){
//                console.log(result.data);

                    return result.data;
                })["catch"](errorHandler);
            }
        };

        return factory;
    }



    function helpModel($http){

        var factory = {

            getFAQ : function(){
                return $http.get(apiPath + 'faq').then(function(result){
                    return result.data;
                })["catch"](errorHandler);
            },
            getManualChinese : function(){
                return $http.get('/marksimos/manual/zh_CN').then(function(result){
                    return result.data;
                })["catch"](errorHandler);
            },
            getManualEnglish : function(){
                return $http.get('/marksimos/manual/en_US').then(function(result){
                    return result.data;
                })["catch"](errorHandler);
            }

        };
        return factory;
    }






    /*JSONKit pretty isVisible mdParse sanitize for markdown*/
    angular.module('marksimos.model').factory('JSONKit', function () {
        return window.JSONKit;
    });

    angular.module('marksimos.model').factory('pretty', function () {
        return window.prettyPrint;
    });

    angular.module('marksimos.model').factory('isVisible', function () {
        return function (element) {
            var rect = element[0].getBoundingClientRect();
            return Boolean(rect.bottom - rect.top);
        };
    });

    angular.module('marksimos.model').factory('mdParse', ['JSONKit',
        function (JSONKit) {
            return function (html) {
                return window.marked(JSONKit.toStr(html));
            };
        }
    ]);

    angular.module('marksimos.model').factory('sanitize', ['JSONKit',
        function (JSONKit) {
            var San = Sanitize,
                config = San.Config,
                sanitize = [
                    new San({}),
                    new San(config.RESTRICTED),
                    new San(config.BASIC),
                    new San(config.RELAXED)
                ];
            // level: 0, 1, 2, 3
            return function (html, level) {
                var innerDOM = document.createElement('div'),
                    outerDOM = document.createElement('div');
                level = level >= 0 ? level : 3;
                innerDOM.innerHTML = JSONKit.toStr(html);
                outerDOM.appendChild(sanitize[level].clean_node(innerDOM));
                return outerDOM.innerHTML;
            };
        }
    ]);



})();


























