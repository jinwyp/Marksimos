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
    angular.module('marksimos.filter').filter('companyName', companyNameFilter);

    angular.module('marksimos.filter').filter('company', companyFilter);
    angular.module('marksimos.filter').filter('period', periodFilter);
    angular.module('marksimos.filter').filter('toFloat', toFixedFilter);
    angular.module('marksimos.filter').filter('brand', brandFilter);

    angular.module('marksimos.filter').directive('filterpercentage', percentageInputFilter);
    angular.module('marksimos.filter').directive('filternumber', numberInputFilter);
   
 

    function userSegmentFilter () {
        return function(input) {
            var names = {
                '1': function() {
                    return 'HomePageSegmentLabelPriceSensitive';
                },
                '2': function() {
                    return 'HomePageSegmentLabelPretenders';
                },
                '3': function() {
                    return 'HomePageSegmentLabelModerate';
                },
                '4': function() {
                    return 'HomePageSegmentLabelGoodLife';
                },
                '5': function() {
                    return 'HomePageSegmentLabelUltimate';
                },
                '6': function() {
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

    function companyNameFilter() {
        return function(input) {
            input = input || [];
            //根据公司编号，显示公司名称
            var companyID = +input || -1;
            if (companyID > 0) {
                return String.fromCharCode('A'.charCodeAt(0) + companyID - 1);
            }
            return 'unknown';
        };
    }
   
    function companyFilter() {
        return function(input, cid) {
            input = input || [];
            var data = [];
            for (var i = 0; i < input.length; i++) {
                var cur = input[i];
                if (cur.d_CID === cid) {
                    data.push(cur);
                }
            }
            return data;
        }
    }
    function periodFilter() {
        return function(input, period) {
            var data = [];
            for (var i = 0; i < input.length; i++) {
                var cur = input[i];
                if (cur.period === period) {
                    data.push(cur);
                }
            }
            return data;
        }
    }
    function toFixedFilter() {
        return function(input, num) {
            return +(parseFloat(input) || 0.0).toFixed(+num || 2);
        }
    }
    function brandFilter() {
        return function(input, brandID) {
            input = input || [];
            var data = [];
            for (var i = 0; i < input.length; i++) {
                var cur = input[i];
                if (cur.d_BrandID === brandID) {
                    data.push(cur);
                }
            }
            return data;
        }
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






