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

    angular.module('marksimos.model', ['LocalStorageModule', 'pascalprecht.translate', 'marksimos.translation']);


    /********************  Use This Module To Set New Factory  ********************/

    angular.module('marksimos.model').factory('Authentication', ['$http', 'localStorageService', authenticationModel]);



    angular.module('marksimos.model').factory('Student', ['$http', 'localStorageService', studentModel]);
    angular.module('marksimos.model').factory('Company', ['$http', companyModel]);


    angular.module('marksimos.model').factory('chartReport', ['$http', '$rootScope', '$translate', chartReportModel]);
    angular.module('marksimos.model').factory('tableReport', ['$http', tableReportModel]);

    angular.module('marksimos.model').factory('Help', ['$http', helpModel]);



    /********************  Administrator Model  ********************/
    angular.module('marksimos.model').factory('Admin', ['$http', adminModel]);
    //管理员报表-表格
    angular.module('marksimos.model').factory('AdminTable', ['$http', adminTableModel]);
    //管理员报表-图表
    angular.module('marksimos.model').factory('AdminChart',['$http',adminChartModel]);


    var apiPath = '/marksimos/api/';
    var apiPathB2C = '/e4e/api/';
    var apiAdminPath = '/marksimos/api/admin/';


    function authenticationModel($http, localStorageService){


    }




    function studentModel ($http, localStorageService){

        var factory = {
            registerB2C : function(user){
                return $http.post(apiPathB2C + 'registerstudent', user);
            },
            forgetPasswordStep1 : function(user){
                return $http.post(apiPathB2C + 'forgotpasswordstep1', user);
            },
            forgetPasswordStep2 : function(user){
                return $http.post(apiPathB2C + 'forgotpasswordstep2', user);
            },
            forgetPasswordStep3 : function(user){
                return $http.post(apiPathB2C + 'forgotpasswordstep3', user);
            },

            login : function(user){
                return $http.post(apiPath + 'login', user).then(function(result){
                    localStorageService.set('logintoken', result.data.token);
                    return result.data;
                });
            },
            logOut : function(){
                return $http.get(apiPath + 'logout').then(function(result){
                    localStorageService.clearAll();
                    return result.data;
                });
            },

            getStudent : function(){
                return $http.get(apiPath + 'user');
            },

            getSeminarList : function(){
                return $http.get(apiPath + 'student/seminar').then(function(result){
                    return result.data;
                });
            },

            chooseSeminar : function(queryParams){
                return $http.get(apiPath + 'choose_seminar', {params : queryParams});
            },

            addStudentToTeam : function(user) {
                return $http.post(apiPathB2C + 'team/student', user);
            },

            removeStudentToTeam : function(id) {
                return $http.delete(apiPathB2C + 'team/student/' + id);
            },

            updateTeamName : function(name) {
                return $http.post(apiPathB2C + 'team', {name: name});
            }


        };

        return factory;
    }



    function companyModel ($http){

        var factory = {

            getCompany : function(companyId){
                return $http.get(apiPath + 'company', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },
            getCompanyOtherInfo : function(companyId){
                return $http.get(apiPath + 'company/otherinfo', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },
            getCompanyFutureProjectionCalculator : function(skuId, companyId){
                return $http.get(apiPath + 'future_projection_calculator/' + skuId, {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },
            getCompanyProductPortfolio : function(companyId){
                return $http.get(apiPath + 'product_portfolio', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },
            getCompanySpendingDetails : function(companyId){
                return $http.get(apiPath + 'spending_details', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },


            addSku : function(postdata){
                return $http.post(apiPath + 'sku/decision/', postdata);
            },

            updateSku : function(postdata){
                return $http.put(apiPath + 'sku/decision/', postdata);
            },

            delSku : function(companyId, brandId, skuId){
                return $http['delete'](apiPath + 'sku/decision/' + companyId + '/' + brandId + '/' + skuId);
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

            getFinalScore: function() {
                return $http.get(apiPath + 'finalscore');
            },

            getQuestionnaire : function(){
                return $http.get(apiPath + 'questionnaire');
            },

            submitQuestionnaire : function(postdata){
                return $http.put(apiPath + 'questionnaire', postdata);
            }

        };
        return factory;
    }







    /********************  Report Format and Translation  ********************/


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
            },
            'priceSensitive': function() {
                return translateText.HomePageSegmentLabelPriceSensitive;
            },
            'pretenders': function() {
                return translateText.HomePageSegmentLabelPretenders;
            },
            'moderate': function() {
                return translateText.HomePageSegmentLabelModerate;
            },
            'goodLife': function() {
                return translateText.HomePageSegmentLabelGoodLife;
            },
            'ultimate': function() {
                return translateText.HomePageSegmentLabelUltimate;
            },
            'pragmatic': function() {
                return translateText.HomePageSegmentLabelPragmatic;
            },
            'allSegments': function() {
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


    var chartFormatToolLineChart = function(chartHttpData, decimalNumber){
        // 使用angular-chart 插件的数据格式

        chartResult.series = [];
        chartResult.data = [];

        if(angular.isUndefined(chartHttpData.periods)){
            // 如果periods 没有定义则是普通的图表,不带有系列的图表 目前仅仅有C44 和 B34
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
                    // 这里处理原本处理C1 但已不用, C1处理已放到 chartFormatTool2
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
                    // 这里处理C44
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
            // 如果periods 有定义 则是带有系列的图表 包括图表 B1 B3 和 C4
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



    var chartFormatToolC1BarChart = function(chartHttpData, decimalNumber){
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

        if(angular.isArray(chartHttpData)){

            angular.forEach(chartHttpData, function(period, keyperiod) {
                var periodData = {
                    period : period.period,
                    data : []
                };

                angular.forEach(period.chartData, function(value, key) {
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

                    periodData.data.push(oneBarData);
                });

                chartResult.data.push(periodData);
            });

        }
        return angular.copy(chartResult);

    };



    var chartFormatToolForTableData = function(chartHttpData){
        // 使用angular-chart 插件的数据格式  FOR Report B2 Competitor Intelligence , C3 Segment Distributions , C5 Market Trends
        chartResult.series = [];
        chartResult.data = [];

        if(angular.isUndefined(chartHttpData[0].data)){
            // 这里处理C3  tableC3 Segment Distribution
            angular.forEach(chartHttpData[0], function(value, key) {
                if(key !== 'period' && key !=='$$hashKey'){
                    chartResult.series.push(showTranslateTextConsumerSegmentName(key));
                }
            });

            angular.forEach(chartHttpData, function(period, key) {

                var oneBarData = {
                    x : 0, //Round Name
                    y : []
                };

                oneBarData.x = period.period;
                angular.forEach(period, function(value, key) {
                    if(key !== 'period' && key !== '$$hashKey') {
                        oneBarData.y.push(Math.round(value * 10000 ) / 10000);
                    }
                });

                chartResult.data.push(oneBarData);
            });

        }else{
            // 这里处理B2  tableB2 Competitor Intelligence 或 C5 Market Trends
            angular.forEach(chartHttpData[0].data, function(period, key) {

                var oneBarData = {
                    x : 0, //Round Name
                    y : []
                };

                oneBarData.x = period.name;
                chartResult.data.push(oneBarData);
            });

            angular.forEach(chartHttpData, function(value, key) {
                if(!angular.isUndefined(value.SKUName)){
                    chartResult.series.push(value.SKUName);
                }
                if(!angular.isUndefined(value.brandName)){
                    chartResult.series.push(value.brandName);
                }
                if(!angular.isUndefined(value.companyName)){
                    chartResult.series.push(showTranslateTextCompanyName(value.companyName));
                }


                angular.forEach(value.data, function(period, key) {
                    chartResult.data[key].y.push(Math.round(period.value * 100 ) / 100);
                });

            });
        }
        return angular.copy(chartResult);
    };



    var chartFormatToolnvd3StackedMultiBarChart = function(chartHttpData) {
        // 使用angular-nvd3 插件的数据格式 Stacked Multi Bar Chart

        chartResult.series = [];
        chartResult.data = [];

        var companyList = [];

        // 根据对象还是数组判断是给学生的对象数据还是admin的数组有多个公司的数据
        if(angular.isUndefined(chartHttpData.companyId)){
            companyList = chartHttpData;
        }else{
            companyList.push(chartHttpData);
        }

        angular.forEach(companyList, function(company, companykey) {
            var companyData = {
                companyName : company.companyName,
                companyId : company.companyId,
                data : [],
                series : []
            };

            if(angular.isArray(company.SKUs) ){
                angular.forEach(company.SKUs[0].inventoryData, function(value, key) {
                    var oneSeries = {
                        "key": showTranslateTextInventoryReport(value.inventoryName),
                        "values": []
                    };
                    if(key !== 0){
                        companyData.data.push(oneSeries);
                        companyData.series.push(showTranslateTextInventoryReport(value.inventoryName));
                    }
                });

                angular.forEach(company.SKUs, function(value, key) {
//                    var oneLineData1 = []; // Close To EXpire Inventory
//                    oneLineData1.push( value.SKUName );
//                    oneLineData1.push( angular.copy(Math.round(value.inventoryData[0].inventoryValue * 100) / 100 ) );

                    var oneLineData2 = []; // Previous Inventory
                    oneLineData2.push( value.SKUName );
                    oneLineData2.push( angular.copy(Math.round(value.inventoryData[1].inventoryValue * 100) / 100 ) );

                    var oneLineData3 = []; // Fresh Inventory
                    oneLineData3.push( value.SKUName );
                    oneLineData3.push( angular.copy(Math.round(value.inventoryData[2].inventoryValue * 100) / 100 ) );

//                    companyData.data[0].values.push(oneLineData1);
                    companyData.data[0].values.push(oneLineData2);
                    companyData.data[1].values.push(oneLineData3);

                });
            }
            chartResult.data.push(angular.copy(companyData));

        });

        return angular.copy(chartResult.data);

    };


    var chartFormatToolnvd3ScatterChart = function(chartHttpData) {
        // 使用angular-nvd3 插件的数据格式   only for C2 Perception Maps Scatter Chart 散点图
//        chartResult.series = [];
//        chartResult.data = [];

        chartResult.series = [];
        chartResult.data = [];

        if(angular.isArray(chartHttpData.periods) ){
            // 处理 exogenous
            var oneSegment = {
                "key" : showTranslateTextSegmentName(),
                "values" : []
            };

            angular.forEach(chartHttpData.exogenous, function(value, key) {
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

            // 处理 periods 数据
            angular.forEach(chartHttpData.periods, function(period, keyperiod) {
                var perioddata = {
                    period : period.period,
                    dataSKU : [],
                    dataBrand : []
                };

                angular.forEach(period.allCompanyData, function(value, key) {
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
                            'x' : Math.round(valueSku.valuePerception * 100 + Math.random() * 10 + Math.random()  ) / 100,
                            'y' : Math.round(valueSku.imagePerception * 100 + Math.random() * 10 + Math.random()  ) / 100,
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

                    perioddata.dataSKU.push(oneCompanySku);
                    perioddata.dataBrand.push(oneCompanyBrand);
                });

                perioddata.dataSKU.push(oneSegment);
                perioddata.dataBrand.push(oneSegment);

                chartResult.data.push(perioddata);

            });


            return angular.copy(chartResult);
        }
    };





    /********************  Report Model API  ********************/

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



        var chartConfig1 = {
            title: '',
            tooltips: true,
            labels: false,
            legend: {
                display: true,
                position: 'right' //could be 'left, right'
            },
            innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
            lineLegend: 'traditional', // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
            lineCurveType: 'monotone' // can be also 'linear', 'step', 'basis', 'bundle', 'cardinal', 'monotone', defaults to 'linear'
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
            lineLegend: 'traditional', // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
            lineCurveType: 'linear' // can be also 'linear', 'step', 'basis', 'bundle', 'cardinal', 'monotone', defaults to 'linear'
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
            lineLegend: 'traditional', // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
            lineCurveType: 'linear' // can be also 'linear', 'step', 'basis', 'bundle', 'cardinal', 'monotone', defaults to 'linear'
//        mouseover: function() {},
//        mouseout: function() {},
//        click: function() {}
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
            // Chart For Report B2, C3, C5
            formatChartData : function(data){

                return chartFormatToolForTableData(data);
            },
            initTranslate: function () {
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
                });
            },
            // Chart A3
            inventoryReport : function(companyId){
                return  $http.get(apiPath + 'chart/inventory_report', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolnvd3StackedMultiBarChart(result.data);
                });
            },

            // Chart B1
            marketShareInValue : function(companyId){
                return $http.get(apiPath + 'chart/market_share_in_value', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 2);
                });
            },

            marketShareInVolume : function(companyId){
                return $http.get(apiPath + 'chart/market_share_in_volume', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 2);
                });
            },

            mindSpaceShare : function(companyId){
                return $http.get(apiPath + 'chart/mind_space_share', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 2);
                });
            },

            shelfSpaceShare : function(companyId){
                return $http.get(apiPath + 'chart/shelf_space_share', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 2);
                });
            },


            // Chart B3
            totalInvestment : function(companyId){
                return $http.get(apiPath + 'chart/total_investment', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            netProfitByCompanies : function(companyId){
                return $http.get(apiPath + 'chart/net_profit_by_companies', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            returnOnInvestment : function(companyId){
                return $http.get(apiPath + 'chart/return_on_investment', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            investmentsVersusBudget : function(companyId){
                return $http.get(apiPath + 'chart/investments_versus_budget', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },


            // Chart B4
            marketSalesValue : function(companyId){
                return $http.get(apiPath + 'chart/market_sales_value', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            marketSalesVolume : function(companyId){
                return $http.get(apiPath + 'chart/market_sales_volume', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            totalInventoryAtFactory : function(companyId){
                return $http.get(apiPath + 'chart/total_inventory_at_factory', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            totalInventoryAtTrade : function(companyId){
                return $http.get(apiPath + 'chart/total_inventory_at_trade', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },


            // Chart C1
            segmentsLeadersByValuePriceSensitive : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_price_sensitive', {params : {companyId : companyId }}).then(function(result){
                //console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },

            segmentsLeadersByValuePretenders : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_pretenders', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },

            segmentsLeadersByValueModerate : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_moderate', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },

            segmentsLeadersByValueGoodLife : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_good_life', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },

            segmentsLeadersByValueUltimate : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_ultimate', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },

            segmentsLeadersByValuePragmatic : function(companyId){
                return $http.get(apiPath + 'chart/segments_leaders_by_value_pragmatic', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },


            // Chart C2
            perceptionMap : function(companyId){
                return $http.get(apiPath + 'chart/perception_map', {params : {companyId : companyId }}).then(function(result){
                    return chartFormatToolnvd3ScatterChart(result.data);
                });
            },


            // Chart C4
            growthRateInVolume : function(companyId){
                return $http.get(apiPath + 'chart/growth_rate_in_volume', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            growthRateInValue : function(companyId){
                return $http.get(apiPath + 'chart/growth_rate_in_value', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            netMarketPrice : function(companyId){
                return $http.get(apiPath + 'chart/net_market_price', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 0);
                });
            },

            segmentValueShareTotalMarket : function(companyId){
                return $http.get(apiPath + 'chart/segment_value_share_total_market', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);
                    return chartFormatToolLineChart(result.data, 2);
                });
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
            companyStatus : function(companyId){
                return $http.get(apiPath + 'report/company_status', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report A2
            financialReport : function(companyId){
                return $http.get(apiPath + 'report/financial_report', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report B2
            profitabilityEvolution : function(companyId){
                return $http.get(apiPath + 'report/profitability_evolution', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report B2
            competitorIntelligence : function(companyId){
                return $http.get(apiPath + 'report/competitor_intelligence', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report C3
            segmentDistribution : function(companyId){
                return $http.get(apiPath + 'report/segment_distribution', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report C5
            marketTrends : function(companyId){
                return $http.get(apiPath + 'report/market_trends', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            },

            // Table Report C6
            marketIndicators : function(companyId){
                return $http.get(apiPath + 'report/market_indicators', {params : {companyId : companyId }}).then(function(result){
//                console.log(result.data);

                    return result.data;
                });
            }
        };

        return factory;
    }



    function helpModel($http){

        var factory = {

            getFAQ : function(){
                return $http.get(apiPath + 'faq').then(function(result){
                    return result.data;
                });
            },
            getManualChinese : function(){
                return $http.get('/marksimos/manual/zh_CN').then(function(result){
                    return result.data;
                });
            },
            getManualEnglish : function(){
                return $http.get('/marksimos/manual/en_US').then(function(result){
                    return result.data;
                });
            }

        };
        return factory;
    }




    /********************  管理员界面数据  ********************/
    function adminModel($http){

        var factory = {

            login : function(user){
                return $http.post(apiAdminPath + 'login', user);
            },
            userInfo : function(){
                return $http.get(apiAdminPath + 'user');
            },
            getDistributors : function(urlparams){
                urlparams = angular.isUndefined(urlparams) ? {}  : urlparams ;
                return $http.get(apiAdminPath + 'distributors', {params : urlparams});
            },
            getFacilitators : function(urlparams){
                urlparams = angular.isUndefined(urlparams) ? {}  : urlparams ;
                return $http.get(apiAdminPath + 'facilitators', {params : urlparams});
            },
            getStudents : function(urlparams){
                urlparams = angular.isUndefined(urlparams) ? {}  : urlparams ;
                return $http.get(apiAdminPath + 'students', {params : urlparams});
            },
            getSeminars : function(urlparams){
                urlparams = angular.isUndefined(urlparams) ? {}  : urlparams ;
                return $http.get(apiAdminPath + 'facilitator/seminar', {params : urlparams});
            },
            getAllCompanyDecisionsOfAllPeriods : function(seminarId){
                return $http.get(apiAdminPath + 'seminar/' + seminarId + '/decisions') ;
            },
            getFinalScores: function(seminarId) {
                //获取得分
                return $http.get(apiAdminPath + 'finalscore/' + seminarId);
            },
            getQuestionnaire: function(seminarId) {
                //获取反馈
                return $http.get(apiAdminPath + 'questionnaire/' + seminarId);
            },
            initSeminar: function(seminarId) {
                return $http.post(apiAdminPath + 'seminar/' + seminarId + '/init' );
            },
            runSeminar: function(seminarId, runNextPeriod, companyOverwrite) {
                return $http.post(apiAdminPath + 'seminar/' + seminarId + '/runsimulation', {goingToNewPeriod : runNextPeriod, decisionsOverwriteSwitchers:companyOverwrite});
            },
            updateCompanyDecision: function(postdata) {
                return $http.put(apiAdminPath + 'company/decision', postdata);
            },
            updateBrandDecision: function(postdata) {
                return $http.put(apiAdminPath + 'brand/decision', postdata);
            },
            updateSkuDecision: function(postdata) {
                return $http.put(apiAdminPath + 'sku/decision', postdata);
            }

        };
        return factory;
    }



    /********************  管理员报表-表格  ********************/
    function adminTableModel($http) {

        function getAdminRequest(url, seminarId) {
            return $http.get(apiAdminPath + url, {params : {seminarId : seminarId}}).then(function (result) {
                return result.data;    
            });
        }       
        return {
            //Table A1 Company Status
            getCompany: function (seminarId) {
                return getAdminRequest("report/company_status", seminarId);
            },
            //Table A2 Financial Data
            getFinancial: function (seminarId) {
                return getAdminRequest("report/financial_report", seminarId);
            },
            //Table A4 Profitability Evolution
            getProfitability: function (seminarId) {
                return getAdminRequest("report/profitability_evolution", seminarId);
            },
            //Table B2 Competitor Intelligence
            getCompetitorIntelligence: function (seminarId) {
                return getAdminRequest("report/competitor_intelligence", seminarId);
            },
            //Table C3 Segment Distribution
            getSegmentDistribution: function (seminarId) {
                return getAdminRequest("report/segment_distribution", seminarId);
            },
            //Table C5 Market Trends
            getMarketTrends: function (seminarId) {
                return getAdminRequest("report/market_trends", seminarId);
            },
            //Table C6 Market Indicators
            getMarketIndicators: function (seminarId) {
                return getAdminRequest("report/market_indicators", seminarId);
            }
        };
    }


    /********************  管理员报表-图表  ********************/
    function adminChartModel($http) {  
    
        return {
            // Chart A3 Inventory Report
            getInventoryReport : function(seminarId){
                return $http.get(apiAdminPath + 'chart/inventory_report', {params : {seminarId : seminarId}}).then(function(result){
                    return chartFormatToolnvd3StackedMultiBarChart(result.data);
                });
            },

            //Table B1 Market Share In Value
            getMarketShareInValue: function (seminarId) {
                return $http.get(apiAdminPath + "chart/market_share_in_value", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 2);
                });                
            },
            //Table B1 Market Share In Volume
            getMarketShareInVolume: function (seminarId) {
                return $http.get(apiAdminPath + "chart/market_share_in_volume", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 2);
                });               
            },
            //Table B1 Mind SpaceShare
            getMindSpaceShare: function (seminarId) {
                return $http.get(apiAdminPath + "chart/mind_space_share", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 2);
                });               
            },
            //Table B1 Shelf SpaceShare
            getShelfSpaceShare: function (seminarId) {
                return $http.get(apiAdminPath + "chart/shelf_space_share", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 2);
                });                
            },


            //Table B3-1 Total Investment
            getTotalInvestment: function (seminarId) {
                return $http.get(apiAdminPath + "chart/total_investment", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });               
            },
            //Table B3-2 Net Profit By Companies
            getNetProfitByCompanies: function (seminarId) {
                return $http.get(apiAdminPath + "chart/net_profit_by_companies", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });                
            },
            //Table B3-3 Return On Investment
            getReturnOnInvestment: function (seminarId) {
                return $http.get(apiAdminPath + "chart/return_on_investment", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });              
            },
            //Table B3-4 Investments Versus Budget
            getInvestmentsVersusBudget: function (seminarId) {
                return $http.get(apiAdminPath + "chart/investments_versus_budget", {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });               
            },


            //Table B4-1 Market Salues Value
            getMarketSalesValue: function (seminarId) {
                return $http.get(apiAdminPath + "chart/market_sales_value", {params : {seminarId : seminarId}}).then(function(result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table B4-2 Market Salues Volume
            getMarketSalesVolume: function (seminarId) {
                return $http.get(apiAdminPath + "chart/market_sales_volume", {params : {seminarId : seminarId}}).then(function(result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table B4-3 Total Inventory At Facotry
            getTotalInventoryAtFactory: function (seminarId) {
                return $http.get(apiAdminPath + "chart/total_inventory_at_factory", {params : {seminarId : seminarId}}).then(function(result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table B4-4 Total Inventory At Trade
            getTotalInventoryAtTrade: function (seminarId) {
                return $http.get(apiAdminPath + "chart/total_inventory_at_trade", {params : {seminarId : seminarId}}).then(function(result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },


            //Table C1-1 Segments Leader By Value Price Sensitive
            getSegmentsLeadersByValuePriceSensitive: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_price_sensitive', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },
            //Table C1-2 Segments Leaders By Value Pretenders
            getSegmentsLeadersByValuePretenders: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_pretenders', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },
            //Table C1-3 Segments Leaders By Value Moderate
            getSegmentsLeadersByValueModerate: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_moderate', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },
            //Table C1-4 Segments Leaders By Value Good Life
            getSegmentsLeadersByValueGoodLife: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_good_life', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },
            //Table C1-5 Segments Leaders By Value Ultimate
            getSegmentsLeadersByValueUltimate: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_ultimate', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },
            //Table C1-6 Segments Leaders By Value Pragmatic
            getSegmentsLeadersByValuePragmatic: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segments_leaders_by_value_pragmatic', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolC1BarChart(result.data, 2);
                });
            },


            //Table C2 Preception Map
            getPerceptionMap: function(seminarId) {
                return $http.get(apiAdminPath + 'chart/perception_map', {params : {seminarId : seminarId}}).then(function(result) {
                    return chartFormatToolnvd3ScatterChart(result.data);
                });
            },
            //Table C4-1 Growth Rate In Volume
            getGrowthRateInVolume: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/growth_rate_in_volume', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table C4-2 Growth rate In Value
            getGrowthRateInValue: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/growth_rate_in_value', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table C4-3 Net market Price
            getNetMarketPrice: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/net_market_price', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 0);
                });
            },
            //Table C4-4 Segment Value Share Total Market
            getSegmentValueShareTotalMarket: function (seminarId) {
                return $http.get(apiAdminPath + 'chart/segment_value_share_total_market', {params : {seminarId : seminarId}}).then(function (result) {
                    return chartFormatToolLineChart(result.data, 2);
                });
            }

        };
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

            /**
             * Copyright (c) 2010 by Gabriel Birke
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the 'Software'), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in all
             * copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
             * SOFTWARE.
             */

            function Sanitize(){
                var i, e, options;
                options = arguments[0] || {};
                this.config = {};
                this.config.elements = options.elements ? options.elements : [];
                this.config.attributes = options.attributes ? options.attributes : {};
                this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [];
                this.config.allow_comments = options.allow_comments ? options.allow_comments : false;
                this.allowed_elements = {};
                this.config.protocols = options.protocols ? options.protocols : {};
                this.config.add_attributes = options.add_attributes ? options.add_attributes  : {};
                this.dom = options.dom ? options.dom : document;
                for(i=0;i<this.config.elements.length;i++) {
                    this.allowed_elements[this.config.elements[i]] = true;
                }
                this.config.remove_element_contents = {};
                this.config.remove_all_contents = false;
                if(options.remove_contents) {

                    if(options.remove_contents instanceof Array) {
                        for(i=0;i<options.remove_contents.length;i++) {
                            this.config.remove_element_contents[options.remove_contents[i]] = true;
                        }
                    }
                    else {
                        this.config.remove_all_contents = true;
                    }
                }
                this.transformers = options.transformers ? options.transformers : [];
            }

            Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i;
            Sanitize.RELATIVE = '__relative__'; // emulate Ruby symbol with string constant

            Sanitize.prototype.clean_node = function(container) {
                var that = this;
                var fragment = that.dom.createDocumentFragment();
                that.current_element = fragment;
                that.whitelist_nodes = [];



                /**
                 * Utility function to check if an element exists in an array
                 */
                function _array_index(needle, haystack) {
                    var i;
                    for(i=0; i < haystack.length; i++) {
                        if(haystack[i] == needle)
                            return i;
                    }
                    return -1;
                }

                function _merge_arrays_uniq() {
                    var result = [];
                    var uniq_hash = {};
                    var i,j;
                    for(i=0;i<arguments.length;i++) {
                        if(!arguments[i] || !arguments[i].length)
                            continue;
                        for(j=0;j<arguments[i].length;j++) {
                            if(uniq_hash[arguments[i][j]])
                                continue;
                            uniq_hash[arguments[i][j]] = true;
                            result.push(arguments[i][j]);
                        }
                    }
                    return result;
                }

                /**
                 * Clean function that checks the different node types and cleans them up accordingly
                 * @param elem DOM Node to clean
                 */
                function _clean(elem) {
                    var clone;
                    switch(elem.nodeType) {
                        // Element
                        case 1:
                            _clean_element.call(that, elem);
                            break;
                        // Text
                        case 3:
                            clone = elem.cloneNode(false);
                            that.current_element.appendChild(clone);
                            break;
                        // Entity-Reference (normally not used)
                        case 5:
                            clone = elem.cloneNode(false);
                            that.current_element.appendChild(clone);
                            break;
                        // Comment
                        case 8:
                            if(that.config.allow_comments) {
                                clone = elem.cloneNode(false);
                                that.current_element.appendChild(clone);
                            }
                            break;
                        default:
                            if (console && console.log) console.log("unknown node type", elem.nodeType);
                            break;
                    }

                }

                function _clean_element(elem) {
                    var i, j, clone, parent_element, name, allowed_attributes, attr, attr_name, attr_node, protocols, del, attr_ok;
                    var transform = _transform_element.call(that, elem);

                    elem = transform.node;
                    name = elem.nodeName.toLowerCase();

                    // check if element itself is allowed
                    parent_element = that.current_element;
                    if(that.allowed_elements[name] || transform.whitelist) {
                        that.current_element = that.dom.createElement(elem.nodeName);
                        parent_element.appendChild(that.current_element);

                        // clean attributes
                        var attrs = that.config.attributes;
                        allowed_attributes = _merge_arrays_uniq(attrs[name], attrs['__ALL__'], transform.attr_whitelist);
                        for(i=0;i<allowed_attributes.length;i++) {
                            attr_name = allowed_attributes[i];
                            attr = elem.attributes[attr_name];
                            if(attr) {
                                attr_ok = true;
                                // Check protocol attributes for valid protocol
                                if(that.config.protocols[name] && that.config.protocols[name][attr_name]) {
                                    protocols = that.config.protocols[name][attr_name];
                                    del = attr.value.toLowerCase().match(Sanitize.REGEX_PROTOCOL);
                                    if(del) {
                                        attr_ok = (_array_index(del[1], protocols) != -1);
                                    }
                                    else {
                                        attr_ok = (_array_index(Sanitize.RELATIVE, protocols) != -1);
                                    }
                                }
                                if(attr_ok) {
                                    attr_node = document.createAttribute(attr_name);
                                    attr_node.value = attr.value;
                                    that.current_element.setAttributeNode(attr_node);
                                }
                            }
                        }

                        // Add attributes
                        if(that.config.add_attributes[name]) {
                            for(attr_name in that.config.add_attributes[name]) {
                                attr_node = document.createAttribute(attr_name);
                                attr_node.value = that.config.add_attributes[name][attr_name];
                                that.current_element.setAttributeNode(attr_node);
                            }
                        }
                    } // End checking if element is allowed
                    // If this node is in the dynamic whitelist array (built at runtime by
                    // transformers), let it live with all of its attributes intact.
                    else if(_array_index(elem, that.whitelist_nodes) != -1) {
                        that.current_element = elem.cloneNode(true);
                        // Remove child nodes, they will be sanitiazied and added by other code
                        while(that.current_element.childNodes.length > 0) {
                            that.current_element.removeChild(that.current_element.firstChild);
                        }
                        parent_element.appendChild(that.current_element);
                    }

                    // iterate over child nodes
                    if(!that.config.remove_all_contents && !that.config.remove_element_contents[name]) {
                        for(i=0;i<elem.childNodes.length;i++) {
                            _clean.call(that, elem.childNodes[i]);
                        }
                    }

                    // some versions of IE don't support normalize.
                    if(that.current_element.normalize) {
                        that.current_element.normalize();
                    }
                    that.current_element = parent_element;
                } // END clean_element function

                function _transform_element(node) {
                    var output = {
                        attr_whitelist:[],
                        node: node,
                        whitelist: false
                    };
                    var i, j, transform;
                    for(i=0;i<that.transformers.length;i++) {
                        transform = that.transformers[i]({
                            allowed_elements: that.allowed_elements,
                            config: that.config,
                            node: node,
                            node_name: node.nodeName.toLowerCase(),
                            whitelist_nodes: that.whitelist_nodes,
                            dom: that.dom
                        });
                        if (transform === null)
                            continue;
                        else if(typeof transform == 'object') {
                            if(transform.whitelist_nodes && transform.whitelist_nodes instanceof Array) {
                                for(j=0;j<transform.whitelist_nodes.length;j++) {
                                    if(_array_index(transform.whitelist_nodes[j], that.whitelist_nodes) == -1) {
                                        that.whitelist_nodes.push(transform.whitelist_nodes[j]);
                                    }
                                }
                            }
                            output.whitelist = transform.whitelist ? true : false;
                            if(transform.attr_whitelist) {
                                output.attr_whitelist = _merge_arrays_uniq(output.attr_whitelist, transform.attr_whitelist);
                            }
                            output.node = transform.node ? transform.node : output.node;
                        }
                        else {
                            throw new Error("transformer output must be an object or null");
                        }
                    }
                    return output;
                }

                for(var i=0;i<container.childNodes.length;i++) {
                    _clean.call(this, container.childNodes[i]);
                }

                if(fragment.normalize) {
                    fragment.normalize();
                }

                return fragment;

            };

            if(!Sanitize.Config) {
                Sanitize.Config = {};
            }

            Sanitize.Config.BASIC = {
                elements: [
                    'a', 'b', 'blockquote', 'br', 'cite', 'code', 'dd', 'dl', 'dt', 'em',
                    'i', 'li', 'ol', 'p', 'pre', 'q', 'small', 'strike', 'strong', 'sub',
                    'sup', 'u', 'ul'],

                attributes: {
                    'a'         : ['href'],
                    'blockquote': ['cite'],
                    'q'         : ['cite']
                },

                add_attributes: {
                    'a': {'rel': 'nofollow'}
                },

                protocols: {
                    'a'         : {'href': ['ftp', 'http', 'https', 'mailto', Sanitize.RELATIVE]},
                    'blockquote': {'cite': ['http', 'https', Sanitize.RELATIVE]},
                    'q'         : {'cite': ['http', 'https', Sanitize.RELATIVE]}
                }
            };

            Sanitize.Config.RELAXED = {
                elements: [
                    'a', 'b', 'blockquote', 'br', 'caption', 'cite', 'code', 'col',
                    'colgroup', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'i', 'img', 'li', 'ol', 'p', 'pre', 'q', 'small', 'strike', 'strong',
                    'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u',
                    'ul', 'div'],

                attributes: {
                    'a'         : ['href', 'title'],
                    'blockquote': ['cite'],
                    'col'       : ['span', 'width'],
                    'colgroup'  : ['span', 'width'],
                    'img'       : ['align', 'alt', 'height', 'src', 'title', 'width'],
                    'ol'        : ['start', 'type'],
                    'q'         : ['cite'],
                    'table'     : ['summary', 'width'],
                    'td'        : ['abbr', 'axis', 'colspan', 'rowspan', 'width'],
                    'th'        : ['abbr', 'axis', 'colspan', 'rowspan', 'scope',    'width'],
                    'ul'        : ['type'],
                    'div'       : ['class']
                },

                protocols: {
                    'a'         : {'href': ['ftp', 'http', 'https', 'mailto', Sanitize.RELATIVE]},
                    'blockquote': {'cite': ['http', 'https', Sanitize.RELATIVE]},
                    'img'       : {'src' : ['http', 'https', Sanitize.RELATIVE]},
                    'q'         : {'cite': ['http', 'https', Sanitize.RELATIVE]}
                }
            };

            Sanitize.Config.RESTRICTED = {
                elements: ['b', 'em', 'i', 'strong', 'u']
            };


            /********************  Ending of Sanitize ********************/


            var sanitize = [
                new Sanitize({}),
                new Sanitize(Sanitize.Config.RESTRICTED),
                new Sanitize(Sanitize.Config.BASIC),
                new Sanitize(Sanitize.Config.RELAXED)
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


























