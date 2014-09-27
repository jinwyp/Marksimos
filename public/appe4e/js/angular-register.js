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
    $scope.title='company register'

    $scope.submitRegister = function(){
        var postData={ 
            userName:$scope.userName,
            companyName:$scope.companyName,
            holdingCompany:$scope.holdingCompany,
            division:$scope.division,
            numberOfEmployees:$scope.numberOfEmployees,
            compmayAddress:$scope.compmayAddress,
            
            nameOfContactPerson:$scope.nameOfContactPerson,
            designation:$scope.designation,
            officalContactNumber:$scope.officalContactNumber,
            mobileNumber:$scope.mobileNumber,
            email:$scope.email,

            companyFunction:$scope.companyFunction,
            companyRole:$scope.companyRole,
            numberOfPositions:$scope.numberOfPositions,
            jobDescription:$scope.jobDescription
        }
        $http({
            method:'POST',
            url:'/e4e/register/company',
            data:postData
        }).then(function(data){
            if(data.data.result=="success"){
                $window.location.href = "/e4e/company-success" ;
            }else{
                console.log('fail');
            }
        });
    }
}]);







// controller student register
registerapp.controller('studentRegisterController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.title='student register';
    
    $scope.submitRegister = function(){
        var postData={ 
            userName:$scope.userName,
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            age:$scope.age,
            country:$scope.country,
            address:$scope.address,
            email:$scope.email,
            qq:$scope.qq
        }
        $http({
            method:'POST',
            url:'/e4e/register/student',
            data:postData
        }).then(function(data){
            if(data.data.result=="success"){
                $window.location.href = "/e4e/student-success" ;
            }else{
                console.log('fail');
            }
        });
    }
}]);

}());




