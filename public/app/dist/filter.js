/**
 * Created by jinwyp on 6/26/14.
 */


/**
 * recommended
 *
 * no globals are left behind
 */



(function () {
    'use strict';



    /********************  Create New Module For Filters ********************/

    angular.module('marksimos.filter', []);





    /********************  Use This Module To Set New Filters  ********************/


    /********************  Normal Html Template Filters  ********************/

    angular.module('marksimos.filter').filter('usersegment', userSegmentFilter);
    angular.module('marksimos.filter').filter('skupacksize', skuPackSizeFilter);

    angular.module('marksimos.filter').directive('filterpercentage', percentageInputFilter);
    angular.module('marksimos.filter').directive('filternumber', numberInputFilter);


    function userSegmentFilter () {
        return function(input) {
            var names = {
                '0': function() {
                    return 'HomePageSegmentLabelPriceSensitive';
                },
                '1': function() {
                    return 'HomePageSegmentLabelPretenders';
                },
                '2': function() {
                    return 'HomePageSegmentLabelModerate';
                },
                '3': function() {
                    return 'HomePageSegmentLabelGoodLife';
                },
                '4': function() {
                    return 'HomePageSegmentLabelUltimate';
                },
                '5': function() {
                    return 'HomePageSegmentLabelPragmatic';
                }
            };

            // conditional based on optional argument
            if(angular.isNumber(input)){
                if (typeof names[input] === 'function') {
                    return names[input]();
                }
            }

            return input;

        };
    }


    function skuPackSizeFilter () {
        return function(input) {

            // conditional based on optional argument
            // 这里是翻译语言的字段名称, 并不是真正的值

            var names = {
                '0': function() {
                    return 'DecisionPageDecisionTabPackagingSizeSmall';
                },
                '1': function() {
                    return 'DecisionPageDecisionTabPackagingSizeStandard';
                },
                '2': function() {
                    return 'DecisionPageDecisionTabPackagingSizeLarge';
                }
            };


            if(angular.isNumber(input)){
                if (typeof names[input] === 'function') {
                    return names[input]();
                }
            }

            return input;

        };
    }




    /********************  NgModel Filters  ********************/

    function percentageInputFilter () {
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
    }


    function numberInputFilter () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ngModel) {

                function showFormatText(number) {
                    if(angular.isNumber(number)){
                        return parseInt( number * 100) / 100 ;
                    }
                    return number;
                }

                function formatInput(number) {

                    if(angular.isNumber(Number(number))){
                        return number  ;
                    }
                    return number;
                }

                ngModel.$formatters.push(showFormatText);
                ngModel.$parsers.push(formatInput);

            }
        };
    }


})();





