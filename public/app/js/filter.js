/**
 * Created by jinwyp on 6/26/14.
 */

var app = angular.module('marksimos.filter', []);



/********************  Template Filters ********************/


app.filter('usersegment', function() {
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
});







/********************  NgModel Filters ********************/


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


app.directive('filternumber', [ function() {
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
}]);


