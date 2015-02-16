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



    /********************  解决提交请求$http 时出现 "Provisional headers are shown angular"(实际上并没有采用,而是后端出的问题导致了该问题) ********************/
    /********************  http://stackoverflow.com/questions/21630534/node-js-angular-js-caution-provisional-headers-are-shown ********************/

    angular.module('marksimos.config').factory('marksimosInterceptor', ['$log', '$q', '$location', 'localStorageService', function($log, $q, $location, localStorageService) {
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
                console.log(response);
                if(response.status === 401 || response.status === 403) {
                    //$location.path('/marksimos');
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

        $locationProvider.html5Mode(true).hashPrefix('!');

    }]);



}());