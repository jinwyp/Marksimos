/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.websitecomponent', ['marksimos.model', 'pascalprecht.translate' ]);




app.directive('userHeader', ['$window', '$translate', 'Student', function($window, $translate, Student) {
    return {
        scope: {
            showmenu : '=',
            showlogout : '=',
            menuhome : '&clickHome',
            menureport : '&clickReport',
            menuscore : '&clickScore',
            menudecision : '&clickDecision',
            currentMenu : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/userheader.html',
        link: function (scope, element, attrs) {

            scope.clickMenu = function(currentmenu){
                scope.currentMenu = currentmenu;
            };

            scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

            scope.clickLogout = function () {
                Student.logOut().success(function(data, status, headers, config){

                    $window.location.href = "/login" ;

                }).error(function(data, status, headers, config){
                    console.log(data);
                });
            };


        }
    };
}]);


app.directive('headerAdmin', [function() {
    return {
        scope: {
            currentuser : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/adminheader.html'
    };
}]);


app.directive('menuAdmin', [function() {
    return {
        scope: {
            currentMenu : '=',
            showtab : '=',
            currentuser : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/adminmenu.html',
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
}]);






app.directive('tableReportSegmentDistribution', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportsegmentdistribution.html',
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


app.directive('tableReportCompetitorIntelligence', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportcompetitorintelligence.html',
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


app.directive('tableReportMarketTrendsSku', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportmarkettrendssku.html',
        link: function (scope, element, attrs) {

            scope.plus = 1;

            if(angular.isUndefined(scope.unit)) {
                scope.unit = '';
            }
        }
    };
});

app.directive('tableReportMarketTrendsBrand', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportmarkettrendsbrand.html',
        link: function (scope, element, attrs) {

            scope.plus = 1;

            if(angular.isUndefined(scope.unit)) {
                scope.unit = '';
            }

        }
    };
});

app.directive('tableReportMarketTrendsGlobal', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportmarkettrendsglobal.html',
        link: function (scope, element, attrs) {

            scope.plus = 1;

            if(angular.isUndefined(scope.unit)) {
                scope.unit = '';
            }

        }
    };
});


app.directive('tableReportMarketIndicator', ['$translate', function($translate) {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/report/tablereportmarketindicator.html',
        link: function (scope, element, attrs) {

            scope.plus = 1;

            if(angular.isUndefined(scope.unit)) {
                scope.unit = '';
            }else if (scope.unit === "%"){
                scope.plus = 1;
            }

        }
    };
}]);


