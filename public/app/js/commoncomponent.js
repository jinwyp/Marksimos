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


    /********************  Create New Module For Directive ********************/
    angular.module('marksimos.commoncomponent', ['marksimos.templates', 'pascalprecht.translate']);


    /********************  Use This Module To Set New Controllers  ********************/

    /********************  Form Input ********************/

    angular.module('marksimos.commoncomponent').directive('textFormInput', function($compile, $timeout) {
        return {
            scope : {
                type             : '@',
                name             : '@',
                label            : '@',
                labelclass       : '@',
                inputclass       : '@',
                inputgroupprefix : '@',
                placeholder      : '@',
                data             : '=',

                radiooptions : '=',
                checkboxoptions : '=',

                required          : '=',
                requirederrorinfo : '@',
                emailerrorinfo    : '@',

                minlength          : '@',
                minlengtherrorinfo : '@',
                maxlength          : '@',
                maxlengtherrorinfo : '@',

                numbererrorinfo : '@',
                min             : '@',
                max             : '@',

                pattern          : '@',
                patternerrorinfo : '@',

                othererrorinfo : '='

            },
            restrict: 'AE',
            require: '^form',
            template: function(tElement, tAttrs) {

                var labelclass = tAttrs.labelclass || 'col-sm-4';
                var inputclass = tAttrs.inputclass || 'col-sm-3';
                var inputgroupprefix = tAttrs.inputgroupprefix || '';

                var labelTextarea1 = '<input type="';
                var labelTextarea2 = '>';

                if (tAttrs.type === 'textarea'){
                    labelTextarea1 = '<textarea rows="5" ';
                    labelTextarea2 = '></textarea>';
                }

                var type = tAttrs.type || 'text';



                var required, requirederrorinfo, emailerrorinfo, minlength, minlengtherrorinfo, maxlength, maxlengtherrorinfo, min, max, numbererrorinfo, pattern, patternerrorinfo;

                required = tAttrs.hasOwnProperty('required') ? 'ng-required="' + tAttrs.required + '"' : "";
                requirederrorinfo = tAttrs.hasOwnProperty('requirederrorinfo') ? tAttrs.requirederrorinfo  : "field is required";


                if(type === 'email'){
                    emailerrorinfo = tAttrs.hasOwnProperty('emailerrorinfo') ? tAttrs.emailerrorinfo  : 'Email format wrong';
                }


                if(type === 'checkbox'){
                    required = tAttrs.hasOwnProperty('required') ? 'ng-required=" !data "' : "";

                    var tplcheckbox = '<div class="form-group" ng-class="{ \'has-success\':form.$dirty && form.$valid , \'has-error\':form.$dirty && form.$invalid}">' +
                                        '<label class="' + labelclass + ' control-label" for="ID' + tAttrs.name + '" >' + tAttrs.label + '</label>' +

                                        '<div class="' + inputclass + '">' +
                                            '<label class="checkbox-inline" ng-repeat="option in checkboxoptions">' +
                                                '<input type="' + type + '" id="ID' + tAttrs.name +'" name="' + tAttrs.name + '"value="{{option.value}}" ng-model="$parent.data" ' + required + '>' + '{{option.text}}' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>';

                    return tplcheckbox;
                }

                if (type === 'radio'){
                    required = tAttrs.hasOwnProperty('required') ? 'ng-required=" !data "' : "";


                    var tplradio = '<div class="form-group" ng-class="{ \'has-success\':form.$dirty && form.$valid , \'has-error\': form.$dirty && form.$invalid}">' +
                                        '<label class="' + labelclass + ' control-label" for="ID' + tAttrs.name + '" >' + tAttrs.label + '</label>' +

                                        '<div class="' + inputclass + '">' +
                                            '<label class="radio-inline" ng-repeat="option in radiooptions">' +
                                                '<input type="' + type + '" id="ID' + tAttrs.name +'" name="' + tAttrs.name + '"value="{{option.value}}" ng-model="$parent.data" ' + required + '>' + '{{option.text}}' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>';

                    return tplradio;
                }




                if(type === 'number'){
                    min = tAttrs.hasOwnProperty('min') ? 'min="' + tAttrs.min + '"' : "";
                    max = tAttrs.hasOwnProperty('max') ? 'max="' + tAttrs.max + '"' : "";
                    numbererrorinfo = tAttrs.hasOwnProperty('numbererrorinfo') ? tAttrs.numbererrorinfo  : 'must be in range ' + tAttrs.min + ' to '+ tAttrs.max;

                    minlength = "";
                    minlengtherrorinfo = "";
                    maxlength = "";
                    maxlengtherrorinfo = "";

                    //numbererrorinfo = 'Number is required';
                    //numbererrorinfo = 'Must be numeric character';
                    //numbererrorinfo = 'Number must be greater than 0';
                    //numbererrorinfo = 'Number must be less than 9';

                }else{
                    min = "";
                    max = "";
                    numbererrorinfo = "";

                    minlength = tAttrs.hasOwnProperty('minlength') ? 'ng-minlength="' + tAttrs.minlength + '"' : "";
                    minlengtherrorinfo = tAttrs.hasOwnProperty('minlengtherrorinfo') ? tAttrs.minlengtherrorinfo  : 'field must be at least ' + tAttrs.minlength + ' characters';

                    maxlength = tAttrs.hasOwnProperty('maxlength') ? 'ng-maxlength="' + tAttrs.maxlength + '"' : "";
                    maxlengtherrorinfo = tAttrs.hasOwnProperty('maxlengtherrorinfo') ? tAttrs.maxlengtherrorinfo  : 'field is a maximum of ' + tAttrs.maxlength + ' characters';

                    pattern = tAttrs.hasOwnProperty('pattern') ? 'ng-pattern="' + tAttrs.pattern + '"' : "";
                    patternerrorinfo = tAttrs.hasOwnProperty('patternerrorinfo') ? tAttrs.patternerrorinfo : 'wrong text format';
                }

                var tpltext = '<div class="form-group has-feedback" ng-class="{ \'has-success\':form.$dirty && form.$valid , \'has-error\': form.$dirty && form.$invalid}">' +
                                '<label class="' + labelclass + ' control-label" for="ID' + tAttrs.name + '" >' + tAttrs.label + '</label>' +
                                '<div class=" ' + inputclass + '">'  +
                                    '<span class="form-input-prefix" ng-if="inputgroupprefix">' + inputgroupprefix + '</span>' +
                                    labelTextarea1 + type + '" class="form-control" id="ID' + tAttrs.name +'" name="' + tAttrs.name +'" placeholder="{{placeholder}}" ng-model="data" ' + required + minlength + maxlength + min + max + pattern + labelTextarea2 +
                                    '<span ng-if="form.$dirty && form.$valid" class="glyphicon glyphicon-ok form-control-feedback"></span>' +
                                    '<span ng-if="form.$dirty && form.$invalid" class="glyphicon glyphicon-remove form-control-feedback"></span>' +
                                '</div>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.required && !form.$error.number"><i class="fa fa-times-circle-o"></i> ' + requirederrorinfo + ' </label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.email"><i class="fa fa-times-circle-o"></i> ' + emailerrorinfo + ' </label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.minlength" ><i class="fa fa-times-circle-o"></i> ' + minlengtherrorinfo + '</label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.maxlength" ><i class="fa fa-times-circle-o"></i> ' + maxlengtherrorinfo + '</label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.number" ><i class="fa fa-times-circle-o"></i> must be a number</label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.min || form.$dirty && form.$error.max " ><i class="fa fa-times-circle-o"></i> ' + numbererrorinfo + '</label>' +
                                '<label class="control-label" ng-if="form.$dirty && form.$error.pattern" ><i class="fa fa-times-circle-o"></i> ' + patternerrorinfo + '</label>' +
                                '<label class="control-label" ng-if="form.$invalid && othererrorinfo" ><i class="fa fa-times-circle-o"></i> {{othererrorinfo}}</label>' +

                                '</div>';

                return tpltext;

            },

            compile: function ( tElement, tAttrs) {
                return function (scope, element, attributes, formController) {

                    //var radioLabelsTPl = element.find('#radioTpl');
                    //console.log(radioLabelsTPl.html());
                    //$compile(radioLabelsTPl.html())(scope)
                    //radioLabelsTPl.html( $compile(radioLabelsTPl.html())(scope) );

                    scope.form = formController[scope.name];

                    $timeout(function(){
                        //fixed ng-repeat bug
                        scope.form = formController[scope.name];
                    }, 500);
                };
            }
        };
    });


    angular.module('marksimos.commoncomponent').directive('ngMatch', ['$parse', function($parse) {
        return {

            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngMatch: "="
            },
            link: function (scope, element, attrs, ctrl) {

                // if ngModel is not defined, we don't need to do anything
                if (!ctrl) return;

                ctrl.$validators.match = function(modelValue, viewValue) {
                    return scope.ngMatch === viewValue;
                };

                scope.$watch('ngMatch', function () {
                    ctrl.$validate();
                });
            }
        };
    }]);

    angular.module('marksimos.commoncomponent').directive('asyncValidate', ['$http', '$q', function($http, $q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                asyncValidate: "="
            },
            link: function (scope, element, attrs, ctrl) {

                var name = attrs.name;

                // if ngModel is not defined, we don't need to do anything
                if (!name || !ctrl || !scope.asyncValidate) return;

                ctrl.$asyncValidators.asyncValid = function(modelValue, viewValue) {
                    var type = typeof scope.asyncValidate;
                    var data = {};
                    data[name] = viewValue;
                    if (type == 'string') {
                        return $http.post(type, data);
                    } else if (type == 'function'){
                        return scope.asyncValidate(data);
                    } else {
                        return $q.reject(Error('`asyncValidate` should be either a string or a function'));
                    }
                };
            }
        };
    }]);



    // Prevent the backspace key from navigating back.
    angular.module('marksimos.commoncomponent').directive('preventBackspaceNavigateBack', ['$document', function($document) {
        return {
            restrict : 'A',
            link  : function (element, attrs) {

                $(document).unbind('keydown').bind('keydown', function (event) {

                    var doPrevent = true;
                    if (event.keyCode === 8) {

                        var d = event.srcElement || event.target;

                        // 注释, 此处很Bug 会很纠结
                        if ((d.tagName.toUpperCase() === 'INPUT' &&
                            (
                                d.type.toUpperCase() === 'TEXT' ||
                                d.type.toUpperCase() === 'PASSWORD' ||
                                d.type.toUpperCase() === 'NUMBER' ||
                                d.type.toUpperCase() === 'FILE' ||
                                d.type.toUpperCase() === 'EMAIL' ||
                                d.type.toUpperCase() === 'SEARCH' ||
                                d.type.toUpperCase() === 'DATE' )
                            ) ||
                            d.tagName.toUpperCase() === 'TEXTAREA') {
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
    }]
    );




    angular.module('marksimos.commoncomponent').directive('fixedFooter', ['$document', '$window', '$timeout', function($document, $window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                var className = attrs.fixedFooter;
                if (!className) return;

                var elemHeight = elem[0].offsetHeight;

                var unwatch = scope.$watch(checkFix);
                $timeout(function() {
                    unwatch();
                }, 2000);

                $window.addEventListener('resize', checkFix);
                scope.$on('destroy', function() {
                    $window.removeEventListener('resize', checkFix);
                });

                function checkFix() {
                    var windowHeight = $document[0].documentElement.clientHeight;
                    var bodyHeight = $document[0].body.offsetHeight;
                    var hasFixed = elem.hasClass(className);
                    if (hasFixed) {
                        if (bodyHeight + elemHeight > windowHeight) {
                            elem.removeClass(className);
                        }
                    } else if (bodyHeight < windowHeight) {
                        elem.addClass(className);
                    }
                }
            }
        };
    }]);

    // preview the image file specified by the `file` property of the param object parsed from the attribute 'ng-thumb'.
    angular.module('marksimos.commoncomponent').directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    // jshint validthis:true
                    canvas.attr({ width: 240, height: 240});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, 240, 240);
                }
            }
        };
    }]);



}());