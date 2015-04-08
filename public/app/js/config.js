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

    angular.module('marksimos.config', ['LocalStorageModule']);
    angular.module('b2c.config', ['LocalStorageModule']);


    /********************  解决提交请求$http 时出现 "Provisional headers are shown angular"(实际上并没有采用,而是后端出的问题导致了该问题) ********************/
    /********************  http://stackoverflow.com/questions/21630534/node-js-angular-js-caution-provisional-headers-are-shown ********************/

    angular.module('marksimos.config').factory('marksimosInterceptor', ['$log', '$q', '$window', 'localStorageService', function($log, $q, $window, localStorageService) {
        //$log.debug('$log is here to show you that this is a regular factory with injection');

        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (localStorageService.get('logintoken')) {
                    config.headers['x-access-token'] = localStorageService.get('logintoken');
                }
                return config;
            },
            'responseError': function(response) {
                //console.log(response);
                if(response.status === 401) {
                    //$window.location.href = '/marksimos';
                }
                return $q.reject(response);
            }
        };
    }]);



    angular.module('b2c.config').factory('b2cInterceptor', ['$log', '$q', '$window', 'localStorageService', function($log, $q, $window, localStorageService) {
        //$log.debug('$log is here to show you that this is a regular factory with injection');

        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (localStorageService.get('logintoken')) {
                    config.headers['x-access-token'] = localStorageService.get('logintoken');
                }
                return config;
            },
            'responseError': function(response) {
                //console.log(response);
                if(response.status === 401 || response.status === 403) {
                    //$window.location.href = '/e4e/login';
                }
                return $q.reject(response);
            }
        };
    }]);





    //angular.module('marksimos.config').config(['$httpProvider', function ($httpProvider) {
    //    //Reset headers to avoid OPTIONS request (aka preflight)
    //    $httpProvider.defaults.headers.common = {};
    //    $httpProvider.defaults.headers.post = {};
    //    $httpProvider.defaults.headers.put = {};
    //    $httpProvider.defaults.headers.patch = {};
    //}]);


    angular.module('marksimos.config').config(['$httpProvider', 'localStorageServiceProvider', '$locationProvider', function ($httpProvider, localStorageServiceProvider, $locationProvider ) {
        localStorageServiceProvider.setPrefix('hcdlearning');
        localStorageServiceProvider.setStorageType('localStorage');  // Or sessionStorage
        localStorageServiceProvider.setNotify(true, true);

        $httpProvider.interceptors.push('marksimosInterceptor');

        $locationProvider.html5Mode(false).hashPrefix('!');

    }]);


    angular.module('b2c.config').config(['$httpProvider', 'localStorageServiceProvider', '$locationProvider', function ($httpProvider, localStorageServiceProvider, $locationProvider ) {
        localStorageServiceProvider.setPrefix('hcdlearning');
        localStorageServiceProvider.setStorageType('localStorage');  // Or sessionStorage
        localStorageServiceProvider.setNotify(true, true);

        $httpProvider.interceptors.push('b2cInterceptor');

        $locationProvider.html5Mode(false).hashPrefix('!');

    }]);

    angular.module('b2c.config').constant('Constant',
    {
        language : [
            {
                id : 1000, name : 'LanguageChinese', shortName : 'ZH'
            },
            {
                id : 1010, name : 'LanguageEnglish', shortName : 'EN'
            },
            {
                id : 1020, name : 'LanguageFrench', shortName : 'FR'
            },
            {
                id : 1030, name : 'LanguageGerman', shortName : 'DE'
            },
            {
                id : 1040, name : 'LanguageGreek', shortName : 'EL'
            },
            {
                id : 1050, name : 'LanguageHindi', shortName : 'HI'
            },
            {
                id : 1060, name : 'LanguageItalian', shortName : 'IT'
            },
            {
                id : 1070, name : 'LanguageJapanese', shortName : 'JA'
            },
            {
                id : 1080, name : 'LanguageKorean', shortName : 'KO'
            },
            {
                id : 1090, name : 'LanguageRussian', shortName : 'RU'
            },
            {
                id : 1100, name : 'LanguageSpanish', shortName : 'ES'
            },
            {
                id : 1110, name : 'LanguageSwedish', shortName : 'SV'
            },
            {
                id : 1120, name : 'LanguageTibetan', shortName : 'BO'
            },
            {
                id : 1130, name : 'LanguageTurkish', shortName : 'TR'
            },
            {
                id : 1140, name : 'LanguageUkrainian', shortName : 'UZ'
            }

        ],

        languageProficiency : [
            { id: 10, name : 'LanguageBeginner'},
            { id: 20, name : 'LanguageIntermediate'},
            { id: 30, name : 'LanguageFluent'},
            { id: 40, name : 'LanguageNative'}
        ],

        jobType : [
            { id: 10, name : 'jobTypeFullTime'},
            { id: 20, name : 'jobTypePartTime'},
            { id: 30, name : 'jobTypeIntern'}
        ]

    }
    );



}());