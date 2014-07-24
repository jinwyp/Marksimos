/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.component', ['pascalprecht.translate']);


app.directive('filterpercentage', [ function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ngModel) {

            function showFormatText(number) {
                if(angular.isNumber(number)){
                    return parseInt( number * 10000) / 100 ;
                }
                return number;
            }

            function formatInput(number) {

                if(angular.isNumber(Number(number))){
                    return number / 100 ;
                }
                return number;
            }
            
            ngModel.$formatters.push(showFormatText);
            ngModel.$parsers.push(formatInput);

        }
    };
}]);



app.directive('headerUser', ['$translate', function($translate) {
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
}]);


app.directive('headerAdmin', [function() {
    return {
        scope: {},
        restrict: 'AE',
        templateUrl: 'app/js/websitecomponent/adminheader.html'
    };
}]);


app.directive('menuAdmin', [function() {
    return {
        scope: {
            currentMenu : '=',
            showtab : '='
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
        templateUrl: 'app/js/directive/tablereportsegmentdistribution.html',
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
        templateUrl: 'app/js/directive/tablereportcompetitorintelligence.html',
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
        templateUrl: 'app/js/directive/tablereportmarkettrendssku.html',
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

app.directive('tableReportMarketTrendsBrand', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/tablereportmarkettrendsbrand.html',
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

app.directive('tableReportMarketTrendsGlobal', function() {
    return {
        scope: {
            data : '=',
            unit : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/tablereportmarkettrendsglobal.html',
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






app.directive('usernameInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            minlength : '=',
            minlengtherrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formusernameinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'username is required';
            }

            if(angular.isUndefined(scope.minlength)  ){
                scope.minlength = 6;
                scope.minlengtherrorinfo = 'username must be at least 6 characters';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 20;
                scope.maxlengtherrorinfo = 'username is a maximum of 20 characters';
            }

        }
    };
});

app.directive('emailInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            emailerrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formemailinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'Email is required';
                scope.emailerrorinfo = "";
            }


            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 50;
                scope.maxlengtherrorinfo = 'Email is a maximum of 50 characters';
            }

        }
    };
});

app.directive('passwordInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            minlength : '=',
            minlengtherrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formpasswordinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'Password is required';
            }

            if(angular.isUndefined(scope.minlength)  ){
                scope.minlength = 6;
                scope.minlengtherrorinfo = 'Password must be at least 6 characters';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 20;
                scope.maxlengtherrorinfo = 'Password is a maximum of 20 characters';
            }

        }
    };
});

app.directive('phoneInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            minlength : '=',
            minlengtherrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'
        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formphoneinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'Cell Phone Number is required';
            }

            if(angular.isUndefined(scope.minlength)  ){
                scope.minlength = 11;
                scope.minlengtherrorinfo = 'Cell Phone Number must be at least 11 characters';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 13;
                scope.maxlengtherrorinfo = 'Cell Phone Number is a maximum of 13 characters';
            }

        }
    };
});

app.directive('idcardInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            minlength : '=',
            minlengtherrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formidcardinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'ID Card is required';
            }

            if(angular.isUndefined(scope.minlength)  ){
                scope.minlength = 17;
                scope.minlengtherrorinfo = 'ID Card must be at least 17 characters';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 24;
                scope.maxlengtherrorinfo = 'ID Card is a maximum of 24 characters';
            }

        }
    };
});


app.directive('licenceInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            numbererrorinfo : '@',
            min : '=',
            minerrorinfo : '@',
            max : '=',
            maxerrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formlicenceinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'Number is required';
                scope.numbererrorinfo = 'Must be numeric character';
            }

            if(angular.isUndefined(scope.min)  ){
                scope.min = 1;
                scope.minerrorinfo = 'Number must be greater than 0';
            }

            if(angular.isUndefined(scope.max)  ){
                scope.max = 1000;
                scope.maxerrorinfo = 'Number must be less than 1000';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 100;
                scope.maxlengtherrorinfo = 'Number is a maximum of 100 characters';
            }

        }
    };
});


app.directive('roundInput', function() {
    return {
        scope: {
            labeltext : '@',
            data : '=',
            placeholdertext : '@',
            formname : '=',
            required : '=',
            requirederrorinfo : '@',
            numbererrorinfo : '@',
            min : '=',
            minerrorinfo : '@',
            max : '=',
            maxerrorinfo : '@',
            maxlength : '=',
            maxlengtherrorinfo : '@'

        },
        restrict: 'AE',
        templateUrl: 'app/js/directive/formroundinput.html',
        link: function (scope, element, attrs) {

            if(angular.isUndefined(scope.required)  ){
                scope.required = true;
                scope.requirederrorinfo = 'Number is required';
                scope.numbererrorinfo = 'Must be numeric character';
            }

            if(angular.isUndefined(scope.min)  ){
                scope.min = 1;
                scope.minerrorinfo = 'Number must be greater than 0';
            }

            if(angular.isUndefined(scope.max)  ){
                scope.max = 9;
                scope.maxerrorinfo = 'Number must be less than 9';
            }

            if(angular.isUndefined(scope.required)  ){
                scope.maxlength = 100;
                scope.maxlengtherrorinfo = 'Number is a maximum of 100 characters';
            }

        }
    };
});