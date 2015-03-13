
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
    angular.module('b2clogin', ['marksimos.config', 'marksimos.commoncomponent', 'marksimos.websitecomponent',
        'marksimos.model', 'marksimos.filter', 'mgcrea.ngStrap', 'ngAnimate', 'angularFileUpload']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('b2clogin').controller('userLoginController', [ '$http', '$window', '$location', 'Student', function  ($http, $window, $location, Student) {

        /* jshint validthis: true */
        var vm = this;


        vm.css = {
            showRegForm : true,
            showForgotPasswordForm : true,
            resetPasswordForm : 'tokenForm',
            loginFailedInfo : false,
            usernameExistedInfo : false,
            emailNotExistedInfo : false,
            resetPasswordTokenNotExistedInfo : false
        };

        vm.newUser =  {
            username : '',
            email : '',
            password : '',
            passwordReInput : '',
            passwordResetVerifyCode : '',
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
        vm.clickForgetPasswordStep1 = forgetPasswordStep1;
        vm.clickForgetPasswordStep2 = forgetPasswordStep2;
        vm.clickResetPasswordStep3 = resetNewPassword;





        /**********  Function Declarations  **********/

        function userLogin(form){
            if(form.$valid){
                Student.login(vm.newUser).then(function(){

                    $window.location.href = "/e4e/profile" ;

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
                Student.forgetPasswordStep1(vm.newUser).then(function(result){

                    vm.css.showForgotPasswordForm = false;

                }).catch(function(err){
                    form.email.$valid = false;
                    form.email.$invalid = true;

                    vm.css.emailNotExistedInfo = true;

                });
            }
        }


        function forgetPasswordStep2(form){
            vm.css.resetPasswordTokenNotExistedInfo = false;

            if(form.$valid){
                Student.forgetPasswordStep2(vm.newUser).then(function(result){
                    vm.css.resetPasswordForm = 'inputPasswordForm';

                }).catch(function(err){
                    form.passwordreset.$valid = false;
                    form.passwordreset.$invalid = true;

                    vm.css.resetPasswordTokenNotExistedInfo = true;

                });
            }
        }


        function resetNewPassword(form){
            vm.css.resetPasswordTokenNotExistedInfo = false;

            if(form.$valid){
                Student.forgetPasswordStep3(vm.newUser).then(function(result){
                    vm.css.resetPasswordForm = 'resetPasswordFinished';

                }).catch(function(err){
                    vm.css.resetPasswordTokenNotExistedInfo = true;

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


    angular.module('b2clogin').controller('profileController', ['Student', '$alert', 'FileUploader', function(Student, $alert, FileUploader) {
        /* jshint validthis: true */
        var vm = this;

        vm.css = {
            addStudentFailedInfo: false,
            curTabIdx: 1,
            updateTeamNameDisabled: true,
            updateTeamNameFailedInfo: false,
            updateSuccessInfo: false,
            updateFailedInfo: false,
            updatePasswordSuccessInfo: false,
            updatePasswordFailedInfo: false,
            alertSuccessInfo: {
                content: '保存成功！',
                duration: 3,
                container: '#profile-alert-container',
                type: 'success',
                dismissable: false
            },
            alertFailedInfo: {
                content: '保存失败！',
                duration: 3,
                container: '#profile-alert-container',
                type: 'danger',
                dismissable: false
            }
        };

        vm.currentUser = {};
        vm.formDatas = [];
        vm.uploader = new FileUploader();


        /**********  Event Center  **********/
        vm.clickAddStudentToTeam = addStudentToTeam;
        vm.clickRemoveStudentToTeam = removeStudentToTeam;
        vm.clickUpdateTeamName = updateTeamName;
        vm.clickUpdateUserInfo = updateUserInfo;
        vm.clickUpdatePassword = updatePassword;
        vm.clickEdit = edit;
        vm.clickCancel = disable;


        /**********  Function Declarations  **********/

        function edit(index) {
            vm.css[index].disabled = false;
        }

        function disable(index) {
            vm.css[index].disabled = true;
        }

        function addStudentToTeam(form) {
            vm.css.addTeamFailedInfo = false;
            vm.css.addTeamSuccessInfo = false;

            if (form.$valid) {
                Student.addStudentToTeam({username: vm.newUser}).then(function(result) {
                    vm.css.addTeamSuccessInfo = true;
                    return app.getUserInfo();
                }).catch(function(err) {
                    form.$invalid = true;
                    form.$valid = false;
                    $alert(vm.css.alertFailedInfo);

                    vm.css.addTeamFailedInfo = true;
                });
            }
        }

        function removeStudentToTeam(id) {
            Student.removeStudentToTeam(id).then(function(result) {
                var members = vm.currentUser.team.memberList;
                members.some(function(member, i) {
                    if (member._id == id) {
                        members.splice(i, 1);
                        return true;
                    }
                });
            });
        }

        function updateTeamName(form) {
            vm.css.updateTeamNameFailedInfo = false;

            if (form.$valid) {
                if (vm.css.updateTeamNameDisabled) {
                    vm.css.updateTeamNameDisabled = false;
                } else {
                    Student.updateTeamName(vm.currentUser.team.name).then(function(result) {
                        $alert(vm.css.alertSuccessInfo);
                    }).catch(function(err) {
                        form.teamName.$valid = false;
                        form.teamName.$invalid = true;
                        $alert(vm.css.alertFailedInfo);

                        vm.css.updateTeamNameFailedInfo = true;
                    });
                    vm.css.updateTeamNameDisabled = true;
                }
            }
        }

        function updateUserInfo(form) {
            // todo, let what css info be false
            if (form.$valid) {
                var tabIdx = vm.css.curTabIdx;
                var data = vm.formDatas[tabIdx];
                data.clickSumbit = true;
                Student.updateStudentB2CInfo(data).then(function() {
                    Object.keys(data).forEach(function(key) {
                        if (key.indexOf('$') === 0) return;
                        vm.currentUser[key] = data[key];
                    });
                    vm.css[tabIdx].updateSuccessInfo = true;
                    disable(tabIdx);
                    $alert(vm.css.alertSuccessInfo);
                }).catch(function(err) {
                    vm.css[tabIdx].updateFailedInfo = true;
                    $alert(vm.css.alertFailedInfo)
                });
            }
        }

        function updatePassword(form) {
            vm.css.updatePasswordSuccessInfo = false;
            vm.css.updatePasswordFailedInfo = false;

            if (form.$valid) {
                Student.updatePassword(vm.currentUser.oldPassword, vm.currentUser.newPassword).then(function(result) {
                    vm.css.updatePasswordSuccessInfo = true;
                }).catch(function(err) {
                    vm.css.updatePasswordFailedInfo = true;
                });
            }
        }

        function onAfterAddngFile(item) {

        }


        var app = {
            init : function(){
                this.getUserInfo().then(function(data) {
                    // for the upload avatar form
                    vm.formDatas[0] = null;
                    // basic form
                    vm.formDatas[1] = {
                        gender: data.gender,
                        birthday: data.birthday,
                        clickSumbit: false
                    };
                    // school form
                    vm.formDatas[2] = {
                        organizationOrUniversity: data.organizationOrUniversity,
                        dateOfEnterCollege: data.dateOfEnterCollege,
                        majorsDegree: data.majorsDegree
                    };
                    vm.formDatas[3] = vm.formDatas[4] = null;
                    // contact form
                    vm.formDatas[5] = {
                        qq: data.qq
                    };
                    vm.formDatas.forEach(function(data, i) {
                        vm.css[i] = {
                            updateSuccessInfo: false,
                            updateFailedInfo: false,
                            disabled: true
                        };
                    });
                });
            },
            reRun : function(){

            },
            getUserInfo : function(){
                return Student.getStudent().then(function(result) {
                    return vm.currentUser = result.data;
                }).catch(function(err) {
                    console.log('load student info failed');
                });
            }
        };

        app.init();

    }]).directive('ngThumb', ['$window', function($window) { // todo, place it to here for now
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
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

    // Footer Fixed
    $(window).on('resize', function () {

        //console.log($('b2c-header').height() , $('footer').height() , $('.b2c-login-main').height() , $(window).height());

        //if ( $('b2c-header').height() + $('footer').height() + $('.b2c-container').height() < $(window).height()) {
        if(  $('.b2c-login-main').height() > 10 || $('.reg-verify-account').height() > 10 || $('.b2c-enter-email').height() > 10 || $('.b2c-enter-code').height() > 10 ){
            $('footer').addClass('b2c-footer-fix');
        }else{
            $('footer').removeClass('b2c-footer-fix');
        }
    }).trigger('resize');
});