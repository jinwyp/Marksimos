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
        templateUrl: '/app/js/commoncomponent/formusernameinput.html',
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
        templateUrl: '/app/js/commoncomponent/formemailinput.html',
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
        templateUrl: '/app/js/commoncomponent/formpasswordinput.html',
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
        templateUrl: '/app/js/commoncomponent/formphoneinput.html',
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
        templateUrl: '/app/js/commoncomponent/formidcardinput.html',
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
        templateUrl: '/app/js/commoncomponent/formlicenceinput.html',
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
        templateUrl: '/app/js/commoncomponent/formroundinput.html',
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


app.directive('textFormInput', function() {
    return {
        scope: {
            type        : '@',
            name        : '@',
            label       : '@',
            labelclass  : '@',
            inputclass  : '@',
            inputgroupprefix  : '@',
            placeholder : '@',
            data        : '=',

            required          : '=',
            requirederrorinfo : '@',

            minlength          : '@',
            minlengtherrorinfo : '@',
            maxlength          : '@',
            maxlengtherrorinfo : '@',

            numbererrorinfo : '@',
            min             : '@',
            max             : '@',

            othererrorinfo : '='


        },
        restrict: 'AE',
        require: '^form',
        template: function(tElement, tAttrs) {
            var labelclass = tAttrs.labelclass || 'col-sm-4';
            var inputclass = tAttrs.inputclass || 'col-sm-3';

            var type = tAttrs.type || 'text';

            var required, requirederrorinfo, minlength, minlengtherrorinfo, maxlength, maxlengtherrorinfo, min, max, numbererrorinfo;

            required = tAttrs.hasOwnProperty('required') ? 'ng-required="' + tAttrs.required + '"' : "";
            requirederrorinfo = tAttrs.hasOwnProperty('requirederrorinfo') ? tAttrs.requirederrorinfo  : "field is required";

            if (type === 'checkbox'){

                var tplcheckbox = '<div class="form-group" ng-class="{ \'has-success\':form.$dirty && form.$valid , \'has-error\': form.$dirty && form.$invalid}">' +
                                    '<label class="' + labelclass + ' control-label" for="' + tAttrs.name + '" >' + tAttrs.label + '</label>' +
                                        '<div class="' + inputclass + '">' +
                                            '<div class="checkbox">' +
                                            '<label>' +
                                                '<input type="' + type + '" id="ID' + tAttrs.name +'" name="' + tAttrs.name +'" ng-model="data" ' + required + '>' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>' +
                                    '</div>';

                return tplcheckbox;

            }else if(type === 'number'){
                min = tAttrs.hasOwnProperty('min') ? 'min="' + tAttrs.min + '"' : "";
                max = tAttrs.hasOwnProperty('max') ? 'max="' + tAttrs.max + '"' : "";
                numbererrorinfo = tAttrs.hasOwnProperty('numbererrorinfo') ? tAttrs.numbererrorinfo  : 'must be in range ' + tAttrs.min + ' to '+ tAttrs.max;

                minlength = "";
                minlengtherrorinfo = "";
                maxlength = "";
                maxlengtherrorinfo = "";

            }else{
                min = "";
                max = "";
                numbererrorinfo = "";

                minlength = tAttrs.hasOwnProperty('minlength') ? 'ng-minlength="' + tAttrs.minlength + '"' : "";
                minlengtherrorinfo = tAttrs.hasOwnProperty('minlengtherrorinfo') ? tAttrs.minlengtherrorinfo  : 'field must be at least ' + tAttrs.minlength + ' characters';

                maxlength = tAttrs.hasOwnProperty('maxlength') ? 'ng-maxlength="' + tAttrs.maxlength + '"' : "";
                maxlengtherrorinfo = tAttrs.hasOwnProperty('maxlengtherrorinfo') ? tAttrs.maxlengtherrorinfo  : 'field is a maximum of ' + tAttrs.maxlength + ' characters';
            }

            var tpltext = '<div class="form-group has-feedback" ng-class="{ \'has-success\':form.$dirty && form.$valid , \'has-error\': form.$dirty && form.$invalid}">' +
                            '<label class="' + labelclass + ' control-label" for="' + tAttrs.name + '" >' + tAttrs.label + '</label>' +
                            '<div class=" ' + inputclass + '">'  +
                                '<span class="form-input-prefix" ng-if="inputgroupprefix">{{inputgroupprefix}}</span>' +
                                '<input type="' + type + '" class="form-control" id="ID' + tAttrs.name +'" name="' + tAttrs.name +'" placeholder="{{placeholder}}" ng-model="data" ' + required + minlength + maxlength + min + max + '>' +
                                '<span ng-if="form.$dirty && form.$valid" class="glyphicon glyphicon-ok form-control-feedback"></span>' +
                                '<span ng-if="form.$dirty && form.$invalid" class="glyphicon glyphicon-remove form-control-feedback"></span>' +
                            '</div>' +
                            '<label class="control-label" ng-if="form.$dirty && form.$error.required && !form.$error.number"><i class="fa fa-times-circle-o"></i> ' + requirederrorinfo + ' </label>' +
                            '<label class="control-label" ng-if="form.$dirty && form.$error.minlength" ><i class="fa fa-times-circle-o"></i>' + minlengtherrorinfo + '</label>' +
                            '<label class="control-label" ng-if="form.$dirty && form.$error.maxlength" ><i class="fa fa-times-circle-o"></i>' + maxlengtherrorinfo + '</label>' +
                            '<label class="control-label" ng-if="form.$dirty && form.$error.number" ><i class="fa fa-times-circle-o"></i>must be a number</label>' +
                            '<label class="control-label" ng-if="form.$dirty && form.$error.min || form.$dirty && form.$error.max " ><i class="fa fa-times-circle-o"></i>' + numbererrorinfo + '</label>' +
                            '<label class="control-label" ng-if="form.$invalid" ><i class="fa fa-times-circle-o"></i>{{othererrorinfo}}</label>' +

                            '</div>';

            return tpltext;

        },

        compile: function ( tElement, tAttrs) {

            return function (scope, element, attributes, formController) {
                scope.form = formController[scope.name];

                scope.inputgroupprefix = angular.isUndefined(scope.inputgroupprefix) ? ""  : scope.inputgroupprefix;
            };
        }
    };
});



// Prevent the backspace key from navigating back.
app.directive('preventBackspaceNavigateBack', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.unbind('keydown').bind('keydown', function (event) {
                var doPrevent = false;

                if (event.keyCode === 8) {
                    var d = event.srcElement || event.target;

                    var inputFlag = d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'NUMBER' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL' || d.type.toUpperCase() === 'SEARCH' || d.type.toUpperCase() === 'DATE';

                    if ( (d.tagName.toUpperCase() === 'INPUT' && inputFlag )|| d.tagName.toUpperCase() === 'TEXTAREA') {
                        doPrevent = d.readOnly || d.disabled;
                    }else {
                        doPrevent = true;
                    }

                    if (doPrevent) {
                        event.preventDefault();
                    }
                }

            });

        }

    };
});

