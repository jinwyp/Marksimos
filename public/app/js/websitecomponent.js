/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.component', []);

app.directive('headerUser', function($translate) {
    return {
        scope: {
            login : '=',
            menuhome : '&clickHome',
            menureport : '&clickReport',
            menuscore : '&clickScore',
            menudecision : '&clickDecision',
            currentMenu : '='
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/headeruser.html',
        link: function (scope, element, attrs) {


            scope.clickMenu = function(currentmenu){
                scope.currentMenu = currentmenu;

//                if (currentmenu == 'Home'){
//                    scope.menuhome();
//                }else if (currentmenu == 'Report'){
//                    scope.menureport();
//                }else if (currentmenu == 'Score'){
//                    scope.menuscore();
//                }else if (currentmenu == 'Decision'){
//                    scope.menudecision();
//                }
            };

            scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

        }
    };
});










app.directive('tableReport', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/tablereport.html',
        link: function (scope, element, attrs) {
            scope.plus = 1;

            if(angular.isUndefined(scope.unit)) {
                scope.unit = '';
            }else if (scope.unit === "%"){
                scope.plus = 100;
            }

            scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };

        }
    };
});
