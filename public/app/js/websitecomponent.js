/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.component', []);

app.directive('headerUser', function() {
    return {
        scope: {
            login : '=',
            menuhome : '&clickHome',
            menureport : '&clickReport',
            menuscore : '&clickScore',
            menudecision : '&clickDecision'
        },
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/headeruser.html',
        link: function (scope, element, attrs) {

            scope.css = {
                currentMenu : 'Home'
            };

            scope.clickMenu = function(currentmenu){
                scope.css.currentMenu = currentmenu;

                if (currentmenu == 'Home'){
                    scope.menuhome();
                }else if (currentmenu == 'Report'){
                    scope.menureport();
                }else if (currentmenu == 'Score'){
                    scope.menuscore();
                }else if (currentmenu == 'Decision'){
                    scope.menudecision();
                }
            }



        }
    };
});


