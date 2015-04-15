
/**
 * Created by Ken on 4/14/15.
 */

/**
 * recommended
 *
 * no globals are left behind
 */





(function () {
    'use strict';



    /********************  Create New Module For Controllers ********************/
    angular.module('b2cwebsite', ['pascalprecht.translate', 'b2c.config', 'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter', 'mgcrea.ngStrap', 'ngAnimate']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('b2cwebsite')
    .controller('userLoginController',
    [
    '$http',
    '$window',
    '$location',
    function($http, $window, $location, Student) {

        /* jshint validthis: true */
        var vm = this;


        vm.css = {
            showRegForm                     : true,
            showForgotPasswordForm          : true,
            resetPasswordForm               : 'tokenForm',
            loginFailedInfo                 : false,
            usernameExistedInfo             : false,
            emailNotExistedInfo             : false,
            resetPasswordTokenNotExistedInfo: false
        };
    }
    ]);

}());