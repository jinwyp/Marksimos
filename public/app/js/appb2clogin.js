
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
    angular.module('b2clogin', ['marksimos.config', 'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('b2clogin').controller('userLoginController', [ '$http', '$window', '$location', 'Student', function  ($http, $window, $location, Student) {

        /* jshint validthis: true */
        var vm = this;


        vm.css = {
            showRegForm : true,
            loginFailedInfo : false,
            usernameExistedInfo : false,
            emailNotExistedInfo : false
        };

        vm.newUser =  {
            username : '',
            email : '',
            password : '',
            passwordReInput : '',
            gender : "",
            clickSubmit : false,
            rememberMe : false
        };

        if(!angular.isUndefined($location.search().username)  ){
            vm.newUser.username = $location.search().username;
        }

        /**********  Event Center  **********/
        vm.clickregister = userRegister;
        vm.clicklogin = userLogin;
        vm.clickForgetPassword = forgetPasswordStep1;



        /**********  Function Declarations  **********/

        function userLogin(form){
            if(form.$valid){
                Student.login(vm.newUser).then(function(){

                    $window.location.href = "/e4e/userhome" ;

                }).catch(function(err){
                        form.username.$valid = false;
                        form.username.$invalid = true;
                        form.password.$valid = false;
                        form.password.$invalid = true;

                        vm.css.loginFailedInfo = true;
                });
            }
        }


        function userRegister(form){
            vm.newUser.clickSubmit = true;
            vm.css.usernameExistedInfo = false;

            if(form.$valid){

                Student.registerB2C(vm.newUser).then(function(){

                    vm.css.showRegForm = false;

                }).catch(function(err){
                    form.username.$valid = false;
                    form.username.$invalid = true;
                    form.email.$valid = false;
                    form.email.$invalid = true;

                    vm.css.usernameExistedInfo = true;
                });
            }
        }


        function forgetPasswordStep1(form){
            vm.css.emailNotExistedInfo = false;

            if(form.$valid){
                Student.forgetPassword(vm.newUser).then(function(result){
                    console.log(result.data);

                }).catch(function(err){
                    form.email.$valid = false;
                    form.email.$invalid = true;

                    vm.css.emailNotExistedInfo = true;

                });
            }
        }


        var app = {};
        app = {
            init : function(){

            },
            reRun : function(){

            }
        };

        app.init();

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