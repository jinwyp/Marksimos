/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', [ 'marksimos.component']);


marksimosapp.factory('currentUser',function(){
    var a = " Hello, World! ";
    this.sayHello = function() {
        return a;
    };
    this.seta = function(xx) {
        a = xx;
    };
});



// controller business logic
marksimosapp.controller('userLoginController', function AppCtrl ($scope,  $timeout, $http , currentUser) {

    $scope.css = {

    };

    $scope.data = {
        newUser : {
            email : '',
            password : ''
        }
    };




        $http.post('/api/register', {
            email: 'jinwyp@163.com',
            user_name: 'jinwyp',
            password: '123456'}
        ).success(function(data, status, headers, config){
            console.log(data);
        });



    $scope.login = function(form){

        if(form.$valid){
            $http.post('/api/login', $scope.data.newUser).success(function(data, status, headers, config){
                console.log(data);
            });
        }



    };


});
