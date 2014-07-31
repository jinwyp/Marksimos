/**
 * Created by jinwyp on 5/20/14.
 */


var app = angular.module('marksimos.commoncomponent', ['pascalprecht.translate']);




/********************  Form Input ********************/


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
        templateUrl: 'app/js/commoncomponent/formusernameinput.html',
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
        templateUrl: 'app/js/commoncomponent/formemailinput.html',
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
        templateUrl: 'app/js/commoncomponent/formpasswordinput.html',
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
        templateUrl: 'app/js/commoncomponent/formphoneinput.html',
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
        templateUrl: 'app/js/commoncomponent/formidcardinput.html',
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
        templateUrl: 'app/js/commoncomponent/formlicenceinput.html',
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
        templateUrl: 'app/js/commoncomponent/formroundinput.html',
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