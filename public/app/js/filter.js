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

    angular.module('marksimos.filter').filter('language', languageFilter);
    angular.module('marksimos.filter').filter('proficiency', proficiencyFilter);
    angular.module('marksimos.filter').filter('jobtype', jobTypeFilter);


    angular.module('marksimos.filter').filter('usersegment', userSegmentFilter);
    angular.module('marksimos.filter').filter('skupacksize', skuPackSizeFilter);
    angular.module('marksimos.filter').filter('companyname', companyNameFilter);
    
   

    angular.module('marksimos.filter').directive('filterpercentage', percentageInputFilter);
    angular.module('marksimos.filter').directive('filternumber', numberInputFilter);


    angular.module('marksimos.filter').filter('emailaddress', emailAddressFilter);


    function languageFilter() {
        return function(input) {
            var names = {
                1000: 'LanguageChinese',
                1010: 'LanguageEnglish',
                1020: 'LanguageFrench',
                1030: 'LanguageGerman',
                1040: 'LanguageGreek',
                1050: 'LanguageHindi',
                1060: 'LanguageItalian',
                1070: 'LanguageJapanese',
                1080: 'LanguageKorean',
                1090: 'LanguageRussian',
                1100: 'LanguageSpanish',
                1110: 'LanguageSwedish',
                1120: 'LanguageTibetan',
                1130: 'LanguageTurkish',
                1140: 'LanguageUkrainian'
            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input;
        };
    }


    function proficiencyFilter() {
        return function(input) {
            var names = {
                10: 'LanguageBeginner',
                20: 'LanguageIntermediate',
                30: 'LanguageFluent',
                40: 'LanguageNative'
            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input;
        };
    }


    function jobTypeFilter() {
        return function(input) {
            var names = {
                10: 'jobTypeFullTime',
                20: 'jobTypePartTime',
                30: 'jobTypeIntern'
            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input;
        };
    }


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

            //根据公司数值编号，显示公司字母名称 A, B, C, D, E, F
            if(angular.isNumber(input)){
                input = +input || 0;
                if (input > 0) {
                    return String.fromCharCode('A'.charCodeAt(0) + input - 1);
                }
            }else if(input === '!!'){
                return 'All';
            }

            return input;

        };
    }



    function emailAddressFilter(){
        return function(input) {

            var regEmail=/^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i;   // 验证email的格式是否正确


            var emailWebSiteList = [
                {
                    suffix : '@163.com',
                    website : 'mail.163.com',
                    websiteFullUrl : 'http://mail.163.com/'
                },
                {
                    suffix : '@126.com',
                    website : 'mail.126.com',
                    websiteFullUrl : 'http://mail.126.com/'
                },
                {
                    suffix : '@yeah.net',
                    website : 'mail.yeah.net',
                    websiteFullUrl : 'http://mail.yeah.net/'
                },
                {
                    suffix : '@sina.com',
                    website : 'mail.sina.com.cn',
                    websiteFullUrl : 'http://mail.sina.com.cn/'
                },
                {
                    suffix : '@sina.cn',
                    website : 'mail.sina.com.cn',
                    websiteFullUrl : 'http://mail.sina.com.cn/'
                },
                {
                    suffix : '@sohu.com',
                    website : 'mail.sohu.com',
                    websiteFullUrl : 'http://mail.sohu.com/'
                },
                {
                    suffix : '@qq.com',
                    website : 'mail.qq.com',
                    websiteFullUrl : 'https://mail.qq.com/'
                },
                {
                    suffix : '@21cn.com',
                    website : 'mail.21cn.com',
                    websiteFullUrl : 'http://mail.21cn.com/'
                },
                {
                    suffix : '@gmail.com',
                    website : 'mail.google.com',
                    websiteFullUrl : 'https://mail.google.com/'
                },
                {
                    suffix : '@hotmail.com',
                    website : 'www.hotmail.com',
                    websiteFullUrl : 'https://login.live.com/'
                },
                {
                    suffix : '@hotmail.com',
                    website : 'www.hotmail.com',
                    websiteFullUrl : 'https://login.live.com/'
                },
                {
                    suffix : '@outlook.com',
                    website : 'login.live.com',
                    websiteFullUrl : 'https://login.live.com/'
                },
                {
                    suffix : '@yahoo.com',
                    website : 'mail.yahoo.com',
                    websiteFullUrl : 'https://login.yahoo.com/'
                },
                {
                    suffix : '@tom.com',
                    website : 'mail.tom.com',
                    websiteFullUrl : 'http://web.mail.tom.com/'
                }
            ];




            var emailFound = false;

            if(angular.isString(input)){
                emailWebSiteList.forEach(function(email){
                    if(input.lastIndexOf(email.suffix) > -1){
                        emailFound = email.websiteFullUrl;
                        return;
                    }
                });

                if(emailFound){
                    return emailFound;
                }else{
                    return "#";
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
                        return Math.round( number * 100) / 100 ;
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






