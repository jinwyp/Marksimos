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





    /********************  Use This Module To Set New Filters ********************/


    /********************  Normal Html Template Filters ********************/

    angular.module('marksimos.filter').filter('usersegment', userSegmentFilter);
    angular.module('marksimos.filter').filter('skupacksize', skuPackSizeFilter);

    angular.module('marksimos.filter').directive('filterpercentage', percentageInputFilter);
    angular.module('marksimos.filter').directive('filternumber', numberInputFilter);


    function userSegmentFilter () {
        return function(input) {
            var userSegment = [
                {id:0, name:'0 None'},
                {id:1, name:'1 Price Sensitive'},
                {id:2, name:'2 Pretenders'},
                {id:3, name:'3 Moderate'},
                {id:4, name:'4 Good Life'},
                {id:5, name:'5 Ultimate'},
                {id:6, name:'6 Pragmatic'}
            ];

            // conditional based on optional argument
            if(angular.isNumber(input)){
                if (input === userSegment[0].id) {
                    return userSegment[0].name;

                }else if(input === userSegment[1].id) {
                    return userSegment[1].name;

                }else if(input === userSegment[2].id) {
                    return userSegment[2].name;

                }else if(input === userSegment[3].id) {
                    return userSegment[3].name;

                }else if(input === userSegment[4].id) {
                    return userSegment[4].name;

                }else if(input === userSegment[5].id) {
                    return userSegment[5].name;

                }else if(input === userSegment[6].id) {
                    return userSegment[6].name;

                }else {
                    return input;
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




    /********************  NgModel Filters ********************/

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






