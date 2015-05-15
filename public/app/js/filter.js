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

    angular.module('marksimos.filter').filter('filterpick', ['$filter', pickerFilter]);

    angular.module('marksimos.filter').filter('language', languageFilter);
    angular.module('marksimos.filter').filter('proficiency', proficiencyFilter);
    angular.module('marksimos.filter').filter('degree', degreeFilter);
    angular.module('marksimos.filter').filter('major', majorFilter);
    angular.module('marksimos.filter').filter('jobtype', jobTypeFilter);
    angular.module('marksimos.filter').filter('societyposition', societyExperiencesPositionFilter);
    angular.module('marksimos.filter').filter('jobndustry', jobIndustryFilter);
    angular.module('marksimos.filter').filter('companysize', companySizeFilter);

    angular.module('marksimos.filter').filter('usersegment', userSegmentFilter);
    angular.module('marksimos.filter').filter('skupacksize', skuPackSizeFilter);
    angular.module('marksimos.filter').filter('companyname', companyNameFilter);
    
   

    angular.module('marksimos.filter').directive('filterpercentage', percentageInputFilter);
    angular.module('marksimos.filter').directive('filternumber', numberInputFilter);


    angular.module('marksimos.filter').filter('emailaddress', emailAddressFilter);


    function pickerFilter($filter) {
        return function() {
            var filterName = [].splice.call(arguments, 1, 1)[0];
            return $filter(filterName).apply(null, arguments);
        };
    }

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

            return names[input] || 'LanguageChinese';
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

            return names[input] || 'LanguageBeginner';
        };
    }


    function degreeFilter() {
        return function(input) {
            var names = {
                10: 'educationDegreeSeniorHighSchool',
                20: 'educationDegreeJuniorCollege',
                30: 'educationDegreeBachelor',
                40: 'educationDegreeMaster',
                50: 'educationDegreeMBA',
                60: 'educationDegreeDoctor',
                70: 'educationDegreeOther'
            };

            return names[input] || 'educationDegreeSeniorHighSchool';
        };
    }

    function majorFilter() {
        return function(input) {
            var names = {
                1100: 'educationMajorPhilosophy',
                1200: 'educationMajorEconomics',
                1300: 'educationMajorManagement',
                1400: 'educationMajorLiterature',
                1500: 'educationMajorEngineering',
                1600: 'educationMajorLaw',
                1700: 'educationMajorHistory',
                1800: 'educationMajorScience',
                1900: 'educationMajorEducation',
                2000: 'educationMajorMedicine',
                2100: 'educationMajorAgriculture',


                1105: 'educationMajorPhilosophy01',

                1205: 'educationMajorEconomics01',

                1305: 'educationMajorManagement01',
                1310: 'educationMajorManagement02',
                1315: 'educationMajorManagement03',
                1320: 'educationMajorManagement04',

                1405 : 'educationMajorLiterature01',
                1410 : 'educationMajorLiterature02',
                1415 : 'educationMajorLiterature03',

                1505 : 'educationMajorEngineering01',
                1510 : 'educationMajorEngineering02',
                1515 : 'educationMajorEngineering03',
                1520 : 'educationMajorEngineering04',
                1525 : 'educationMajorEngineering05',
                1530 : 'educationMajorEngineering06',
                1535 : 'educationMajorEngineering07',
                1540 : 'educationMajorEngineering08',
                1545 : 'educationMajorEngineering09',
                1550 : 'educationMajorEngineering10',
                1555 : 'educationMajorEngineering11',
                1560 : 'educationMajorEngineering12',
                1565 : 'educationMajorEngineering13',
                1570 : 'educationMajorEngineering14',
                1575 : 'educationMajorEngineering16',
                1580 : 'educationMajorEngineering17',

                1605 : 'educationMajorLaw01',

                1705 : 'educationMajorHistory01',

                1805 : 'educationMajorScience01',
                1810 : 'educationMajorScience02',
                1815 : 'educationMajorScience03',
                1820 : 'educationMajorScience04',
                1825 : 'educationMajorScience05',
                1830 : 'educationMajorScience06',
                1835 : 'educationMajorScience07',
                1840 : 'educationMajorScience08',
                1845 : 'educationMajorScience09',

                1905 : 'educationMajorEducation01',

                2005 : 'educationMajorMedicine01',
                2010 : 'educationMajorMedicine02',

                2105 : 'educationMajorAgriculture01'
            };

            return names[input] || '';
        };
    }

    function societyExperiencesPositionFilter() {
        return function(input) {
            var names = {
                10: 'societyExperiencesPositionChairman',
                20: 'societyExperiencesPositionViceChairman',
                30: 'societyExperiencesPositionMinister',
                40: 'societyExperiencesPositionViceMinister',
                50: 'societyExperiencesPositionTeamLeader',
                60: 'societyExperiencesPositionMember'
            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input || 'societyExperiencesPositionChairman';
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

            return input || 'jobTypeFullTime';
        };
    }

    function jobIndustryFilter() {
        return function(input) {
            var names = {
                1100: 'jobIndustryComputer',
                1200: 'jobIndustryFinance',
                1300: 'jobIndustryManufacturing',
                1400: 'jobIndustryBiotechnology',
                1500: 'jobIndustryAdvertising',
                1600: 'jobIndustryConstruction',
                1700: 'jobIndustryEducation',
                1800: 'jobIndustryService',
                1900: 'jobIndustryTransport',
                2000: 'jobIndustryEnergy',
                2100: 'jobIndustryOthers',

                1105 : 'jobIndustryComputer01',
                1110 : 'jobIndustryComputer02',
                1115 : 'jobIndustryComputer03',
                1120 : 'jobIndustryComputer04',
                1125 : 'jobIndustryComputer05',
                1130 : 'jobIndustryComputer06',
                1135 : 'jobIndustryComputer07',
                1140 : 'jobIndustryComputer08',
                1145 : 'jobIndustryComputer09',

                1205 : 'jobIndustryFinance01',
                1210 : 'jobIndustryFinance02',
                1215 : 'jobIndustryFinance03',
                1220 : 'jobIndustryFinance04',
                1225 : 'jobIndustryFinance05',

                1305 : 'jobIndustryManufacturing01',
                1310 : 'jobIndustryManufacturing02',
                1315 : 'jobIndustryManufacturing03',
                1320 : 'jobIndustryManufacturing04',
                1325 : 'jobIndustryManufacturing05',
                1330 : 'jobIndustryManufacturing06',
                1335 : 'jobIndustryManufacturing07',
                1340 : 'jobIndustryManufacturing08',
                1345 : 'jobIndustryManufacturing09',

                1405 : 'jobIndustryBiotechnology01',
                1410 : 'jobIndustryBiotechnology02',
                1415 : 'jobIndustryBiotechnology03',

                1505 : 'jobIndustryAdvertising01',
                1510 : 'jobIndustryAdvertising02',
                1515 : 'jobIndustryAdvertising03',
                1520 : 'jobIndustryAdvertising04',
                1525 : 'jobIndustryAdvertising05',

                1605 : 'jobIndustryConstruction01',
                1610 : 'jobIndustryConstruction02',
                1615 : 'jobIndustryConstruction03',
                1620 : 'jobIndustryConstruction04',

                1705 : 'jobIndustryEducation01',
                1710 : 'jobIndustryEducation02',
                1715 : 'jobIndustryEducation03',
                1720 : 'jobIndustryEducation04',
                1725 : 'jobIndustryEducation05',
                1730 : 'jobIndustryEducation06',
                1735 : 'jobIndustryEducation07',
                1740 : 'jobIndustryEducation08',

                1805 : 'jobIndustryCustomerService01',
                1810 : 'jobIndustryCustomerService02',
                1815 : 'jobIndustryCustomerService03',
                1820 : 'jobIndustryCustomerService04',
                1825 : 'jobIndustryCustomerService05',

                1905 : 'jobIndustryTransportation01',
                1910 : 'jobIndustryTransportation02',

                2005 : 'jobIndustryEnergy01',
                2010 : 'jobIndustryEnergy02',
                2015 : 'jobIndustryEnergy03',
                2020 : 'jobIndustryEnergy04',
                2025 : 'jobIndustryEnergy05',

                2105 : 'jobIndustryOthers01',
                2110 : 'jobIndustryOthers02',
                2115 : 'jobIndustryOthers03',
                2120 : 'jobIndustryOthers04',
                2125 : 'jobIndustryOthers05',
                2130 : 'jobIndustryOthers06'

            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input || '';
        };
    }

    function companySizeFilter() {
        return function(input) {
            var names = {
                110: 'jobCompanySize20',
                120: 'jobCompanySize50',
                125: 'jobCompanySize80',
                130: 'jobCompanySize100',
                140: 'jobCompanySize200',
                150: 'jobCompanySize500',
                160: 'jobCompanySize1000',
                170: 'jobCompanySize2000',
                180: 'jobCompanySize5000',
                190: 'jobCompanySize10000'
            };

            if (angular.isNumber(input)) {
                return names[input];
            }

            return input || 'jobTypeFullTime';
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






