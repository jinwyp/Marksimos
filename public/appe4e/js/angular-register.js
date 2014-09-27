/**
 * Created by raven on 9/27/14.
 */


(function () {
    'use strict';



// create module for custom directives
var registerapp = angular.module('e4eregister', ['pascalprecht.translate', 'marksimos.translation','e4e.directive']);


        


registerapp.controller('registerHeaderController',['$scope','$translate','$rootScope',function($scope,$translate,$rootScope){
    $scope.isEnglish=($translate.use()=="en_US");

    $rootScope.$on('$translateChangeSuccess', function () {
        $scope.isEnglish=($translate.use()=="en_US");
    });

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}]);


// controller company register
registerapp.controller('companyRegisterController', ['$scope', '$timeout', '$http', '$window', function($scope, $timeout, $http, $window) {
    $scope.title='company register';
}]);







// controller student register
registerapp.controller('studentRegisterController', ['$scope', '$http', '$notification', function($scope, $http, $notification) {
    $scope.title='student register';
}]);

}());




