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

    angular.module('marksimos.config', []);



    /********************  解决提交请求$http 时出现 "Provisional headers are shown angular"(实际上并没有采用,而是后端出的问题导致了该问题) ********************/
    /********************  http://stackoverflow.com/questions/21630534/node-js-angular-js-caution-provisional-headers-are-shown ********************/


    angular.module('marksimos.config').config(['$httpProvider', function ($httpProvider) {
        //Reset headers to avoid OPTIONS request (aka preflight)
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }]);



}());