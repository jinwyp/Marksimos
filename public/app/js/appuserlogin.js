/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives

var marksimosapp = angular.module('marksimoslogin', ['pascalprecht.translate', 'marksimos.model', 'marksimos.websitecomponent',  'marksimos.filter', 'marksimos.translation']);




// controller business logic
marksimosapp.controller('userLoginController', ['$scope', '$http', '$window', 'Student', function  ($scope, $http, $window, Student) {
    $scope.css = {
        newUser : {
            passwordPrompt : false
        }
    };

    $scope.data = {
        newUser : {
            email : '',
            password : ''
        }
    };


    $scope.login = function(form){
        if(form.$valid){
            Student.login($scope.data.newUser).success(function(data, status, headers, config){

                $window.location.href = "/marksimos/introduction" ;

            }).error(function(data, status, headers, config){
                form.password.$valid = false;
                form.password.$invalid = true;
                $scope.css.newUser.passwordPrompt = true;
                console.log(data);
            });
        }
    };

}]);




marksimosapp.controller('userIntroController',['$scope', '$http', '$window', 'Student',  'Company', function($scope, $http, $window, Student, Company) {

    $scope.css = {
        showBox : 'seminar'
    };

    $scope.data = {
        brandNumber : 0,
        skuNumber : 0,
        currentStudent : null,
        currentStudentSeminar : null,
        currentCompany : null,
        seminars : [],
        selectSeminar : {
            seminar_id : 0
        }
    };

    $scope.initSeminar = function() {

        $scope.isFAQShown=true;
        $scope.isVideoShown=false;
        $scope.isManualShown=false;

        Student.getStudent().then(function(data, status, headers, config){
            $scope.data.currentStudent = data;
        });

        Student.getSeminar().then(function(data, status, headers, config){
            $scope.data.seminars = data;
        });
    };

    $scope.initSeminar();


    $scope.clickIntro=function(item){
        $scope.isFAQShown=false;$scope.isVideoShown=false;$scope.isManualShown=false;
        switch(item){
            case 'FAQ':$scope.isFAQShown=true;break;
            case 'Video':$scope.isVideoShown=true;break;
            case 'Manual':$scope.isManualShown=true;break;
        }
    }


    $scope.introVideosNext = function(){
        $scope.css.showBox = 'seminar';
    };



    $scope.chooseSeminar = function(seminarid){

        $scope.data.selectSeminar.seminar_id = seminarid;

        if($scope.data.selectSeminar.seminar_id !== 0 ){
            $http.get('/marksimos/api/choose_seminar', {params : $scope.data.selectSeminar}).success(function(data, status, headers, config){
                $scope.css.showBox = 'whoami';


                Company.getCurrentStudent().then(function(data, status, headers, config){
                    $scope.data.currentStudentSeminar = data;
                });

                Company.getCompany().then(function(data, status, headers, config){
                    angular.forEach(data.d_BrandsDecisions, function(brand){
                        $scope.data.brandNumber++;

                        angular.forEach(brand.d_SKUsDecisions, function(sku){
                            $scope.data.skuNumber++;
                        });
                    });


                    $scope.data.currentCompany = data;
                });

            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
    };

    $scope.whoamiNext = function(){
        $window.location.href = "/marksimos/home" ;
    };

}]);

