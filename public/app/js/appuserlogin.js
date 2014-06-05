/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
<<<<<<< HEAD
var marksimosapp = angular.module('marksimos', [ 'marksimos.component']);


marksimosapp.factory('currentUser',function(){
    var user = {
        name : 'aaa',
        company : 'Company A'
    };

    var seminar ={
        currentRound : -3, // -3,-2, -1, 0, 1, 2, 3, 4, 5, 6
        companylist : []
    };
    return {

    }
});
=======
var marksimosapp = angular.module('marksimos', [ 'marksimos.component', 'marksimos.factory']);
>>>>>>> FETCH_HEAD



// controller business logic
marksimosapp.controller('userLoginController', function AppCtrl ($scope,  $timeout, $http, $window) {
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
                if(data.status == 303){
                    $window.location.href = "/introduction" ;
                }else if(data.status == 401){

                    console.log(data);

                    form.password.$valid = false;
                    form.password.$invalid = true;
                    $scope.css.newUser.passwordPrompt = true;
                }
            }).error(function(data, status, headers, config){

            });
        }
    };

});





marksimosapp.controller('userIntroController', function AppCtrl ($scope,  $timeout, $http, $window, currentUser) {

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