
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
    angular.module('b2clogin', ['pascalprecht.translate', 'b2c.config', 'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter', 'mgcrea.ngStrap', 'ngAnimate', 'angularFileUpload']);



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

                    $window.location.href = "/e4e/campaigns" ;

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




    angular.module('b2clogin').controller('profileController', ['Student', '$alert', 'FileUploader', '$translate', function(Student, $alert, FileUploader, $translate) {
        /* jshint validthis: true */
        var vm = this;

        vm.css = {
            addStudentFailedInfo: false,
            currentTabIndex: 1,
            updateTeamNameDisabled: true,
            formEditing: false,
            alertSuccessInfo: {
                content: '保存成功！',
                duration: 2,
                container: '#profile-alert-container',
                type: 'success',
                dismissable: false
            },
            alertFailedInfo: {
                content: '保存失败！',
                duration: 2,
                container: '#profile-alert-container',
                type: 'danger',
                dismissable: false
            },
            defaultAvatar: 'app/css/images/profile_avatar_2.png'
        };

        vm.currentUser = {};
        vm.formData = {};
        vm.uploader = new FileUploader({
            url : '/e4e/api/student/avatar',
            alias : 'studentavatar',
            onAfterAddingFile : onAfterAddingFile,
            onSuccessItem: onSuccessItem,
            onErrorItem: onErrorItem
        });


        /**********  Event Center  **********/
        vm.clickAddStudentToTeam = addStudentToTeam;
        vm.clickRemoveStudentToTeam = removeStudentToTeam;
        vm.clickUpdateTeamName = updateTeamName;
        vm.clickUpdateUserInfo = updateUserInfo;
        vm.clickUpdatePassword = updatePassword;
        vm.clickEditProfile = editProfile;
        vm.clickSwitchTab = switchTab;
        vm.clickCancelEditProfile = cancelEditProfile;


        /**********  Function Declarations  **********/

        function editProfile() {
            vm.css.formEditing = true;
        }

        function switchTab(index) {
            if (vm.css.currentTabIndex == index) return;
            vm.css.currentTabIndex = index;
            cancelEditProfile();
        }

        function cancelEditProfile() {
            vm.css.formEditing = false;
            app.resetForm();
        }

        function addStudentToTeam(form) {
            vm.css.addTeamFailedInfo = false;
            vm.css.addTeamSuccessInfo = false;

            if (form.$valid) {
                Student.addStudentToTeam({username: vm.formData.newTeamMember}).then(function(result) {
                    app.getUserInfo();
                }).catch(function(err) {
                    form.$invalid = true;
                    form.$valid = false;
                    $alert(vm.css.alertFailedInfo);
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
                if (!vm.css.formEditing) {
                    vm.css.formEditing = true;
                } else {
                    var teamName = vm.formData.teamName;
                    Student.updateTeamName(teamName).then(function(result) {
                        vm.currentUser.team.name = teamName;
                        $alert(vm.css.alertSuccessInfo);
                    }).catch(function() {
                        form.teamName.$valid = false;
                        form.teamName.$invalid = true;
                        $alert(vm.css.alertFailedInfo);
                    });
                    vm.css.formEditing = false;
                }
            }
        }

        function updateUserInfo(form) {
            // todo, let what css info be false
            if (form.$valid) {
                Student.updateStudentB2CInfo(vm.formData).then(function() {
                    Object.keys(vm.formData).forEach(function(key) {
                        vm.currentUser[key] = vm.formData[key];
                    });
                    $alert(vm.css.alertSuccessInfo);
                    cancelEditProfile();
                }).catch(function() {
                    $alert(vm.css.alertFailedInfo);
                });
            }
        }

        function updatePassword(form) {
            if (form.$valid) {
                Student.updatePassword(vm.formData.oldPassword, vm.formData.newPassword).then(function(result) {
                    $alert(vm.css.alertSuccessInfo);
                }).catch(function(err) {
                    $alert(vm.css.alertFailedInfo);
                });
            } else {
                $alert(angular.extend({}, vm.css.alertFailedInfo, {content: '密码信息无效！'}));
            }
        }

        // file upload
        function onAfterAddingFile() {
            // only holds the last uploaded file in the queue
            if (vm.uploader.queue.length > 1) {
                vm.uploader.removeFromQueue(0);
            }
        }

        function onSuccessItem() {
            app.getUserInfo().then(function() {
                $alert(vm.css.alertSuccessInfo);
            }).catch(function() {
                $alert(vm.css.alertFailedInfo);
            });
        }

        function onErrorItem() {
            $alert(vm.css.alertFailedInfo);
        }


        var app = {
            init : function(){
                this.getUserInfo().then(function() {
                    app.resetForm();
                });
            },
            reRun : function(){

            },
            getUserInfo : function(){
                return Student.getStudent().then(function(result) {
                    vm.currentUser = result.data;
                }).catch(function(err) {
                    console.log('load student info failed');
                });
            },
            resetForm: function() {
                var formData = vm.formData;

                angular.forEach(vm.currentUser, function(data, key) {
                    if (!angular.isObject(data)) {
                        formData[key] = data;
                    }
                });
                formData.oldPassword = '';
                formData.newPassword = '';
                formData.rePassword = '';

                formData.teamName = vm.currentUser.team && vm.currentUser.team.name;
                formData.newTeamMember = '';
            }
        };

        app.init();

    }]);

    angular.module('b2clogin').controller('campaignlistController', ['Student', '$alert', '$translate', function(Student, $alert, $translate) {
        /* jshint validthis: true */
        var vm = this;

        vm.css = {};

        vm.currentUser = {};


        /**********  Event Center  **********/



        /**********  Function Declarations  **********/




        var app = {
            init : function(){
                this.getUserInfo();
            },
            reRun : function(){

            },
            getUserInfo : function(){
                return Student.getStudent().then(function(result) {
                    vm.currentUser = result.data;
                }).catch(function(err) {
                    console.log('load student info failed');
                });
            }
        };

        app.init();
    }]);


    angular.module('b2clogin').controller('campaignController', ['Student', '$modal', '$translate', '$location', '$anchorScroll', '$q', function(Student, $modal, $translate, $location, $anchorScroll, $q) {
        /* jshint validthis: true */
        var vm = this;

        vm.css = {};

        vm.currentUser = {};

        vm.campaignId = $location.absUrl().split('/');
        vm.campaignId = vm.campaignId[vm.campaignId.length - 1].substr(0, 24);
        /**********  Event Center  **********/

        vm.clickStudentEnter = studentEnter;



        /**********  Function Declarations  **********/
        function studentEnter() {
            if (vm.css.hasEntered) return;
            var hasTeam = vm.currentUser && vm.currentUser.team;

            if (hasTeam) {

                Student.addTeamToCampaign({
                    username: vm.currentUser.username,
                    campaignId: vm.campaignId
                }).then(function() {
                    $modal({container: 'body', template: 'campaign-modal-enter-success.html'});
                });
            } else {
                $modal({container: 'body', template: 'campaign-modal-enter-tip-complete-info.html'});
            }
        }



        var app = {
            init : function(){
                this.getUserInfo();
                $anchorScroll();
            },
            reRun : function(){

            },
            getUserInfo : function(){
                $q.all([Student.getCampaign(vm.campaignId), Student.getStudent()]).then(function(results) {
                    vm.campaign = results[0].data;
                    vm.currentUser = results[1].data;

                    vm.css.hasEntered = vm.campaign.teamList && vm.campaign.teamList.some(function(team) {
                        return team._id == vm.currentUser.team._id;
                    });
                }).catch(function(err) {
                    console.log('load student info failed');
                    console.log(err);
                });
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