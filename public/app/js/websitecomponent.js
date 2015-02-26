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

    angular.module('marksimos.websitecomponent', ['marksimos.templates', 'marksimos.model', 'pascalprecht.translate', 'marksimos.translation' ]);


    angular.module('marksimos.websitecomponent').directive('b2cHeader', ['$window', '$translate', 'Student', b2cHeaderComponent ]);
    angular.module('marksimos.websitecomponent').directive('userHeader', ['$window', '$translate', 'Student', userHeaderComponent ]);
    angular.module('marksimos.websitecomponent').directive('headerAdmin', ['$window', '$translate', 'Student', adminHeaderComponent]);
    angular.module('marksimos.websitecomponent').directive('menuAdmin', [adminMenuComponent]);


    function b2cHeaderComponent($window, $translate, Student){
        return {
            scope: {
                showlogin  : '=',
                showlogout : '=',
                username   : '@',
                password   : '@'
            },
            restrict: 'AE',
            templateUrl: 'b2cheader.html',
            link: function (scope, element, attrs) {

                //scope.clickHelpMenu = function(){
                //    if($window.location.href.indexOf('/marksimos/help')==-1)
                //        $window.location.href='/marksimos/help';
                //};
                //
                //scope.changeLanguage = function (langKey) {
                //    $translate.use(langKey);
                //};
                //

                scope.newUser = {
                    username : scope.username,
                    password : scope.password,
                    rememberMe : false
                };

                scope.clickLogin = function () {

                    if(typeof scope.newUser.username === 'undefined' || typeof scope.newUser.password === 'undefined' ){
                        return false;
                    }else {
                        if(scope.newUser.username !== '' && scope.newUser.password !== ''){

                            Student.login(scope.newUser).then(function(){

                                $window.location.href = "/e4e/userhome" ;

                            }, function(err){
                                $window.location.href = "/e4e/login#!/?username=" + scope.newUser.username ;
                            });
                        }
                    }


                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){
                        $window.location.href = "/marksimos/login" ;
                    });
                };

            }
        };
    }


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
                seminarFinished : '=',
                currentRound : '='
            },
            restrict: 'AE',
            templateUrl: 'userheader.html',
            link: function (scope, element, attrs) {

                scope.clickMenu = function(currentmenu){
                    scope.currentMenu = currentmenu;
                };

                scope.clickHelpMenu = function(){
                    if($window.location.href.indexOf('/marksimos/help')==-1)
                        $window.location.href='/marksimos/help';
                };

                scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){
                        $window.location.href = "/marksimos/login" ;
                    });
                };

            }
        };
    }


    function adminHeaderComponent($window, $translate, Student){
        return {
            scope: {
                currentuser : '='
            },
            restrict: 'AE',
            templateUrl: 'adminheader.html',
            link: function (scope, element, attrs) {
                scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                };

                scope.clickLogout = function () {
                    Student.logOut().then(function(data){

                        $window.location.href = "/marksimos/admin/" ;

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
            templateUrl: 'adminmenu.html',
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
            templateUrl: 'tablereportcompanystatussku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompanystatusbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompanyStatusGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompanystatusglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportfinancialreportbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportFinancialReportAllBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportfinancialreportallbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionSku', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionsku.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionBrand', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionbrand.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportProfitabilityEvolutionGlobal', function() {
        return {
            scope: {
                data : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportprofitabilityevolutionglobal.html'
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportCompetitorIntelligence', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportcompetitorintelligence.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 1;
                }

                scope.display = 'line';

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportSegmentDistribution', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '=',
                showAllSegments : '=allsegments'
            },
            restrict: 'AE',
            templateUrl: 'tablereportsegmentdistribution.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

                if(angular.isUndefined(scope.unit)) {
                    scope.unit = '';
                }else if (scope.unit === "%"){
                    scope.plus = 1;
                }

                attrs.$observe('showAllSegments', function(value){
                    if (angular.isUndefined(value)) {
                        value = false;
                    }
                });

            }
        };
    });


    angular.module('marksimos.websitecomponent').directive('tableReportMarketTrendsSku', function() {
        return {
            scope: {
                data : '=',
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendssku.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

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
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendsbrand.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

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
                unit : '=',
                chartdata : '=',
                chartconfig : '='
            },
            restrict: 'AE',
            templateUrl: 'tablereportmarkettrendsglobal.html',
            link: function (scope, element, attrs) {

                scope.plus = 1;
                scope.display = 'line';

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
            templateUrl: 'tablereportmarketindicator.html',
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
                data: '=',
                showScaled:'='
            },

            restrict: 'AEC',
            templateUrl: 'tablereportfinalscore.html',
            link: function(scope, element, attrs) {

                if (scope.data && scope.data.length) {
                    scope.selectedIndex = scope.data.length - 1;
                }

                attrs.$observe('showScaled', function(value){
                    if (value === undefined) {
                        value = true;
                    }
                });

                scope.changeIndex = function(index) {
                    scope.selectedIndex = index;
                };
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

    angular.module('marksimos.websitecomponent').directive('highlightKey', function () {        
        return {
            scope: {
                key:'=highlightKey'
            }, 
            restrict: 'AE',
            compile: function (tElement, tAttrs) {
                return function (scope, tElement, tAttrs) {                  
                    scope.$watch(tAttrs, function () {
                        if (scope.key) {
                            var html = tElement.html();
                            html = html.replace(new RegExp("[" + scope.key.split('').join('][') + "]", "ig"), function (match) {
                                return "<span class='text-danger'>" + match + "</span>";
                            });
                            tElement.html(html);
                        }
                    });
                };
            }
        };
    });

})();




