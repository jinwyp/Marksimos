/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives

var marksimosapp = angular.module('marksimoslogin', [ 'marksimos.component', 'marksimos.factory']);




// controller business logic
marksimosapp.controller('userLoginController', function  ($scope,  $timeout, $http, $window) {
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
             $http.post('/api/login', $scope.data.newUser).success(function(data, status, headers, config){



                $window.location.href = "/introduction" ;


            }).error(function(data, status, headers, config){
                 form.password.$valid = false;
                 form.password.$invalid = true;
                 $scope.css.newUser.passwordPrompt = true;
                 console.log(data);
            });
        }
    };

});




marksimosapp.controller('userIntroController', function  ($scope,  $timeout, $http, $window) {

    $scope.css = {
        intro : true
    };


    $scope.data = {

    };

    $scope.introVideosNext = function(){
        $scope.css.intro = false;
    };

    $scope.startGame = function(){
        $window.location.href = "/mainhome" ;
    };

});