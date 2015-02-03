
/**
 * Created by jinwyp on 1/30/15.
 */

/**
 * recommended
 *
 * no globals are left behind
 */





(function () {
    'use strict';



    /********************  Create New Module For Controllers ********************/
    angular.module('b2clogin', [ 'marksimos.websitecomponent', 'marksimos.model']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('b2clogin').controller('userLoginController', ['$scope', '$http', '$window', function  ($scope, $http, $window) {
        $scope.css = {
            newUser : {
                passwordPrompt : false
            }
        };

        $scope.data = {
            newUser : {
                username : '',
                email : '',
                password : '',
                passwordReInput : '',
                gender : ""
            }
        };


        $scope.login = function(form){
            if(form.$valid){
                Student.login($scope.data.newUser).then(function(){

                    $window.location.href = "/marksimos/intro" ;

                }, function(err){
                    form.password.$valid = false;
                    form.password.$invalid = true;
                    $scope.css.newUser.passwordPrompt = true;
                });
            }
        };

        $scope.register = function(form){
            if(form.$valid){
                Student.login($scope.data.newUser).then(function(){

                    $window.location.href = "/marksimos/intro" ;

                }, function(err){
                    form.password.$valid = false;
                    form.password.$invalid = true;
                    $scope.css.newUser.passwordPrompt = true;
                });
            }
        };

    }]);








}());


















$(function () {

    $('.switch-button a').each(function (idx) {
        $(this).on('mouseenter', function (e) {           
            $('.switch-button .selected').removeClass("selected");
            $(this).addClass("selected");
            if (idx === 1) {
                $(".pic-1,.pic-2,.pic-3").stop().animate({'margin-top':'-275px'}, 500, 'swing');
            }
            else {
                $(".pic-1,.pic-2,.pic-3").stop().animate({ 'margin-top': '20px' }, 500,'swing');
            }
        });
    });


    // Detecting IE
    var oldIE;
    if ($('html').is('.ie6, .ie7, .ie8')) {
        oldIE = true;
    }

    if (oldIE) {
        $(".pic").on("mouseenter mouseleave", function (e) {
            if (e.type === 'mouseenter') {
                $(this).find('.back').stop().fadeIn(100, function () {
                    $(this).parent().find('.front').hide();
                });
            }
            else {
                $(this).find('.front').show();
                $(this).find('.back').stop().fadeOut(100);
            }
        }).trigger("mouseleave");
    }


    $(window).on('resize', function () {
        if ($('header').height() + $('footer').height() + $('main').height() < $(window).height()) {
            $('footer').addClass('b2c-footer-fix');
        }
        else { 
            $('footer').removeClass('b2c-footer-fix');
        }
    }).trigger('resize');
});