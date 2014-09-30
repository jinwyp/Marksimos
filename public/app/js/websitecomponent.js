/**
 * Created by jinwyp on 5/20/14.
 */


/**
 * recommended
 *
 * no globals are left behind
 */



(function () {
    'use strict';

    angular.module('marksimos.websitecomponent', ['marksimos.model', 'pascalprecht.translate', 'marksimos.translation' ]);


    angular.module('marksimos.websitecomponent').directive('userHeader', ['$window', '$translate', 'Student', userHeaderComponent ]);
    angular.module('marksimos.websitecomponent').directive('headerAdmin', ['$window', 'Student', adminHeaderComponent]);
    angular.module('marksimos.websitecomponent').directive('menuAdmin', [adminMenuComponent]);





    function userHeaderComponent($window, $translate, Student){
        return {
            scope: {
                showmenu     : '=',
                showlogout   : '=',
                menuhome     : '&clickHome',
                menureport   : '&clickReport',
                menuscore    : '&clickScore',
                menudecision : '&clickDecision',
                currentMenu : '=',
                isFeedbackShown : '=',
                currentRound : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/websitecomponent/userheader.html',
            link: function (scope, element, attrs) {



                scope.clickMenu = function(currentmenu){
                    scope.currentMenu = currentmenu;
                    scope.isFeedbackShown = false;
                };

                scope.clickHelpMenu = function(){
                    if($window.location.href.indexOf('/marksimos/help')==-1)
                        $window.location.href='/marksimos/help';
                };

                scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                };

                scope.clickLogout = function () {
                    Student.logOut().success(function(data, status, headers, config){

                        $window.location.href = "/marksimos/login" ;

                    }).error(function(data, status, headers, config){
                        console.log(data);
                    });
                };

            }
        };
    }


    function adminHeaderComponent($window, Student){
        return {
            scope: {
                currentuser : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/websitecomponent/adminheader.html',
            link: function (scope, element, attrs) {

                scope.clickLogout = function () {
                    Student.logOut().success(function(data, status, headers, config){

                        $window.location.href = "/marksimos/admin/" ;

                    }).error(function(data, status, headers, config){
                        console.log(data);
                    });
                };

            }
        };
    }


    function adminMenuComponent(){
        return {
            scope: {
                currentMenu : '=',
                showtab : '=',
                currentuser : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/websitecomponent/adminmenu.html',
            link : function(scope, element){

                scope.css = {
                    currentTab : 2,
//                currentMenu : 'DistributorList',
                    menuexpand : [false, false, true, true, true, true, true, true] // menus control expand
                };


                scope.clickTab = function(tab){

                    scope.css.menuexpand[tab] = !scope.css.menuexpand[tab];
                    scope.css.currentTab = tab;

                };

                scope.clickMenu = function(currentmenu){
                    scope.currentMenu = currentmenu;

                    if(currentmenu === 1){
                        scope.clickTab(1);
                    }
                };

            }
        };
    }


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusSku', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportcompanystatussku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportcompanystatusbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportcompanystatusglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportfinancialreportbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportAllBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportfinancialreportallbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionSku', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportprofitabilityevolutionsku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportprofitabilityevolutionbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportprofitabilityevolutionglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompetitorIntelligence', function() {
        return {
            scope: {
                data : '=',
                unit : '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportcompetitorintelligence.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 1;
                }

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportSegmentDistribution', function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportsegmentdistribution.html',
            link: function (scope, element, attrs) {
                scope.plus = 1;

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 100;
                }

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsSku', function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportmarkettrendssku.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }
            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsBrand', function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportmarkettrendsbrand.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }
            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsGlobal', function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportmarkettrendsglobal.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketIndicator', [ function() {
        return {
            scope: {
                data : '=',
                unit : '@'
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportmarketindicator.html',
            link: function (scope, element, attrs) {

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }

            }
        };
    }]);


    angular.module('marksimos.websitecomponent').directive('tableReportFinalScore', [function() {
        return {
            scope: {
                data : '=',
                selectScore: '='
            },
            restrict: 'AE',
            templateUrl: '/app/js/report/tablereportfinalscore.html',
            link : function(scope, element, attrs){
            }
        };
    }]);


    angular.module('marksimos.websitecomponent').directive('genParseMd', ['mdParse', 'sanitize', 'pretty', 'isVisible', '$timeout',
        function (mdParse, sanitize, pretty, isVisible, $timeout) {
            // <div gen-parse-md="document"></div>
            // document是Markdown格式或一般文档字符串，解析成DOM后插入<div>
            return function (scope, element, attr) {
                scope.$watch(attr.genParseMd, function (value) {
                    if (isVisible(element)) {
                        parseDoc(value);
                    } else {
                        $timeout(function () {
                            parseDoc(value);
                        }, 500);
                    }
                });

                function parseDoc(value) {
                    if (angular.isDefined(value)) {
                        value = mdParse(value);
                        value = sanitize(value);
                        element.html(value);
                        angular.forEach(element.find('code'), function (value) {
                            value = angular.element(value);
                            if (!value.parent().is('pre')) {
                                value.addClass('prettyline');
                            }
                        });
                        element.find('pre').addClass('prettyprint'); // linenums have bug!
                        element.find('a').attr('target', function () {
                            if (this.host !== location.host) {
                                return '_blank';
                            }
                        });
                        pretty();
                    }
                }
            };
        }
    ]);



})();




