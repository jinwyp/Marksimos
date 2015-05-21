
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
    angular.module('b2clogin', ['pascalprecht.translate', 'b2c.config', 'marksimos.commoncomponent', 'marksimos.websitecomponent', 'marksimos.b2ccomponent', 'marksimos.model', 'marksimos.filter', 'mgcrea.ngStrap', 'ngAnimate', 'angularFileUpload']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('b2clogin').controller('userLoginController', [ '$http', '$window', '$location', '$interval', 'Student', function  ($http, $window, $location, $interval, Student) {

        /* jshint validthis: true */
        var vm = this;


        vm.css = {
            showRegForm : true,
            showForgotPasswordForm : true,
            resetPasswordForm : 'tokenForm',
            loginFailedInfo : false,
            usernameExistedInfo : false,
            emailNotExistedInfo : false,
            resetPasswordTokenNotExistedInfo : false,
            mobileVerifyCodeResend : false,
            mobileVerifyCodeTimeCounter : 60
        };

        vm.newUser =  {
            username : '',
            email : '',
            password : '',
            passwordReInput : '',
            passwordResetVerifyCode : '',
//            gender : "",
            mobilePhone: "",
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
        vm.verifyUsername = verifyUsername;
        vm.verifyEmail = verifyEmail;
        vm.verifyPhone = verifyPhone;
        vm.getCaptcha = getCaptcha;

        vm.captchaImageNum = 1;

        /**********  Function Declarations  **********/

        function getCaptcha(form) {
            vm.css.mobileVerifyCodeResend = true;
            vm.css.mobileVerifyCodeTimeCounter = 60;
            var timer = $interval(function() {
                if(vm.css.mobileVerifyCodeTimeCounter > 0){
                    vm.css.mobileVerifyCodeTimeCounter = vm.css.mobileVerifyCodeTimeCounter - 1;
                }else {
                    $interval.cancel(timer);
                }
            }, 1000);

            Student.getCaptcha(vm.newUser.mobilePhone).then(function(){

            }).catch(function(err){
                form.mobilePhone.$setDirty();
                form.mobilePhone.$valid = false;
                form.mobilePhone.$invalid = true;
                vm.css.mobileVerifyCodeTimeCounter = 0;
            });
        }

        function verifyPhone(mobilePhone) {
            return Student.verifyPhone(mobilePhone);
        }

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
                    if(err.data.errorCode === 20001) {
                        form.captcha.$valid = false;
                        form.captcha.$invalid = true;
                    }
                    else{
                        form.username.$valid = false;
                        form.username.$invalid = true;
                        form.email.$valid = false;
                        form.email.$invalid = true;
                    }
                });
            }
        }

        function verifyUsername(username) {
            return Student.verifyUsername(username);
        }

        function verifyEmail(email) {
            return Student.verifyEmail(email);
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




    angular.module('b2clogin').controller('profileController', ['Student', '$alert', 'FileUploader', '$translate', '$location', '$interval', 'Constant', '$q', function(Student, $alert, FileUploader, $translate, $location, $interval, Constant, $q) {
        /* jshint validthis: true */
        var vm = this;
        vm.css = {
            addStudentFailedInfo: false,
            currentTab: 'basicInfo',
            updateTeamNameDisabled: true,
            saving: false,

            formEditing: false,
            currentJobIndustry : -1,
            currentMajor : -1,

            //education background form editing states
            educationEditing: false,
            addEducationEditing: false,
            languageEditing: false,
            addLanguageEditing: false,

            alertInfo: {
                duration: 2,
                template: '',
                container: '#profile-alert-container'
            },
            defaultAvatar: 'app/css/images/profile_avatar_2.png',
            errorFields: {},
            mobileVerifyCodeResend : false,
            mobileVerifyCodeTimeCounter : 60
        };
        vm.css.alertSuccessInfo = angular.extend({}, vm.css.alertInfo, {template: 'profile-alert-success.html'});
        vm.css.alertFailedInfo = angular.extend({}, vm.css.alertInfo, {template: 'profile-alert-failed.html'});
        vm.css.alertUserNotFound = angular.extend({}, vm.css.alertInfo, {template: 'profile-alert-user-not-found.html'});
        vm.css.alertTeamNameIsExist = angular.extend({}, vm.css.alertInfo, {template: 'profile-alert-team-name-exist.html'});
        vm.css.alertInvalidPassword = angular.extend({}, vm.css.alertInfo, {template: 'profile-alert-invalid-password.html'});

        vm.currentUser = {};
        vm.newEducation = null;
        vm.newLanguageSkill = null;
        vm.newAchievement = null;
        vm.newExperience = null;

        vm.formData = {};
        vm.Constant = Constant;

        vm.uploader = new FileUploader({
            url : '/e4e/api/student/avatar',
            alias : 'studentavatar',
            onAfterAddingFile : onAfterAddingFile,
            onSuccessItem: onSuccessItem,
            onErrorItem: onErrorItem
        });


        /**********  Event Center  **********/
        vm.clickUpdateUserInfo = updateUserInfo;
        vm.clickUpdatePassword = updatePassword;
        vm.clickEditProfile = editProfile;
        vm.clickSwitchTab = switchTab;
        vm.clickHideMutiSelect = hideMutiSelect;

        vm.clickCancelEditProfile = cancelEditProfile;
        vm.clickSetEditingState = setEditingState;
        vm.clickResetEditingState = resetEditingState;
        vm.clickAddNewLanguage = addNewLanguage;
        vm.clickDeleteEducation = deleteEducation;
        vm.clickDeleteLanguage = deleteLanguage;
        vm.clickAddNewAchievement = addNewAchievement;
        vm.clickAddNewAchievementToExistEducation = addNewAchievementToExistEducation;
        vm.clickDeleteNewEducation = deleteNewEducation;

        vm.updateBasicInfo = function(data) {
            return Student.updateStudentB2CInfo(data)
                .then(updateSuccessHandler)
                .catch(updateFailedHandler);
        };

        vm.updatePassword = function(data) {
            return Student.updatePassword(data.oldPassword, data.newPassword)
                .then(updateSuccessHandler)
                .catch(updateFailedHandler);
        };

        vm.getPhoneVerifyCode = function() {
            return Student.getPhoneVerifyCode();
        };

        vm.sendPhoneVerifyCode = function(code) {
            return Student.sendPhoneVerifyCode(code);
        };

        vm.updateTeamName = function(data) {
            return Student.updateTeamName(data['team.name'])
                .then(updateSuccessHandler)
                .catch(updateFailedHandler);
        };

        vm.removeStudentToTeam = function(id) {
            return Student.removeStudentToTeam(id)
                .then(updateSuccessHandler)
                .catch(updateFailedHandler);
        };

        vm.addStudentToTeam = function(name) {
            return Student.addStudentToTeam(name)
                .then(updateSuccessHandler)
                .catch(updateFailedHandler);
        };

        function updateSuccessHandler() {
            app.getUserInfo();
            $alert(vm.css.alertSuccessInfo);
        }

        function updateFailedHandler(err) {
            var alertInfo = vm.css.alertFailedInfo;

            // see details in error-code.js
            if (err.data.errorCode == 10002) {
                alertInfo = vm.css.alertUserNotFound;
            } else if (err.data.errorCode == 10004) {
                alertInfo = vm.css.alertTeamNameIsExist;
            }
            $alert(alertInfo);
            return $q.reject(err.data);
        }


        /**********  Function Declarations  **********/

        function hideMutiSelect(){
            vm.css.currentJobIndustry = -1;
            vm.css.currentMajor = -1;
        }

        function editProfile(specificForm) {
            vm.css.formEditing = true;
            if(specificForm) {
                vm.css[specificForm] = true;
            }
        }

        function deleteEducation(index) {
            vm.formData.eductionBackgrounds.splice(index, 1);
        }

        function deleteNewEducation() {
            vm.css.addEducationEditing = false;
            vm.newEducation = null;
        }

        function addNewLanguage() {
            if (!vm.newLanguageSkill.language || !vm.newLanguageSkill.level) {
                return;
            }

            var isExist = vm.formData.LanguageSkills.some(function(lan, i) {
                if (lan.language == vm.newLanguageSkill.language) {
                    vm.formData.LanguageSkills[i] = vm.newLanguageSkill;
                    return true;
                }
            });
            if (!isExist) {
                vm.formData.LanguageSkills.push(vm.newLanguageSkill);
            }
            vm.newLanguageSkill = null;
        }

        function deleteLanguage(index) {
            vm.formData.LanguageSkills.splice(index, 1);
        }

        function addNewAchievement() {
            if (!vm.newEducation) {
                vm.newEducation = {
                    achievements: []
                };
            }
            if (!vm.newEducation.achievements) {
                vm.newEducation.achievements = [];
            }

            vm.newEducation.achievements.push(vm.newAchievement);
            vm.newAchievement = null;
        }

        function addNewAchievementToExistEducation(index) {
            var education = vm.formData.eductionBackgrounds[index];
            education.achievements.push(education._newAchievement);
            education._newAchievement = null;
        }

        function setEditingState(state) {
            angular.extend(vm.css, state);
        }

        function resetEditingState() {
            angular.extend(vm.css, {
                formEditing: false,
                educationEditing: false,
                addEducationEditing: false,
                languageEditing: false,
                experienceEditing: false,
                addExperienceEditing: false
            });
        }

        function switchTab(tab) {
            if (vm.css.currentTab == tab) return;
            vm.css.currentTab = tab;
            cancelEditProfile();
        }

        function cancelEditProfile() {
            vm.css.formEditing = false;
            app.resetForm();
        }

        function updateUserInfo(form, slient) {
            if (form.$valid) {
                vm.css.errorFields = {};

                if (vm.newEducation) {
                    if (!vm.newEducation.achievements) {
                        vm.newEducation.achievements = [];
                    }
                    vm.formData.eductionBackgrounds.push(vm.newEducation);
                }

                if (vm.newAchievement) {
                    addNewAchievement();
                }

                if (vm.newLanguageSkill) {
                    addNewLanguage();
                }

                if (vm.formData.eductionBackgrounds) {
                    vm.formData.eductionBackgrounds.forEach(function(education, i) {
                        if (education._newAchievement) {
                            addNewAchievementToExistEducation(i);
                        }
                    });
                }


                vm.css.saving = true;
                Student.updateStudentB2CInfo(vm.formData).then(function() {
                    app.getUserInfo();

                    vm.newEducation = null;
                    vm.newLanguageSkill = null;

                    if (!slient) {
                        $alert(vm.css.alertSuccessInfo);
                        cancelEditProfile();
                        resetEditingState();
                    }
                }).catch(function(err) {
                    $alert(vm.css.alertFailedInfo);
                    if (err.data && err.data.message) {
                        err.data.message.forEach(function(item) {
                            form[item.param].$valid = false;
                            form[item.param].$invalid = true;
                            vm.css.errorFields[item.param] = true;
                        });
                    }
                }).finally(function() {
                    vm.css.saving = false;
                });
            } else {
                Object.keys(form).forEach(function(key){
                    if (key[0] != '$') {
                        form[key].$setDirty();
                    }
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
                $alert(vm.css.alertInvalidPassword);
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
                if ($location.hash().length > 0) {
                    switchTab($location.hash());
                } else switchTab('basicInfo');

                this.getUserInfo();
            },
            reRun : function(){

            },
            getUserInfo : function(){
                return Student.getStudent().then(function(result) {
                    vm.currentUser = result.data;
                    app.resetForm();
                }).catch(function(err) {
                    console.log('load student info failed');
                });
            },
            resetForm: function() {

                angular.copy(vm.currentUser, vm.formData);

                vm.formData.oldPassword = '';
                vm.formData.newPassword = '';
                vm.formData.rePassword = '';

                vm.formData.teamName = vm.currentUser.team && vm.currentUser.team.name;
                vm.formData.newTeamMember = '';

                vm.css.errorFields = {};
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





    angular.module('b2clogin').controller('campaignController', ['Student', '$modal', '$translate', '$location', '$q', '$anchorScroll', function(Student, $modal, $translate, $location, $q, $anchorScroll) {
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
            if (vm.css.hasEntered) {
                Student.removeTeamToCampaign({
                    teamId: vm.currentUser.team._id,
                    campaignId: vm.campaignId
                }).then(function() {
                    $modal({container: 'body', template: 'campaign-modal-cancel-enter-success.html'});
                    vm.css.hasEntered = false;
                });
            } else {
                Student.addTeamToCampaign({
                    username: vm.currentUser.username,
                    campaignId: vm.campaignId
                }).then(function() {
                    $modal({container: 'body', template: 'campaign-modal-enter-success.html'});
                    vm.css.hasEntered = true;
                }).catch(function() {
                    $modal({container: 'body', template: 'campaign-modal-enter-tip-complete-info.html'});
                });
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
                });
            }
        };

        app.init();
    }]);


    angular.module('b2clogin').controller('aboutController', ['$anchorScroll', function($anchorScroll) {
        $anchorScroll();
    }]);


    angular.module('b2clogin').controller('activityController', ['$anchorScroll', function($anchorScroll) {
        $anchorScroll();
    }]);


    angular.module('b2clogin').controller('introController', ['$location', '$scope', function($location, $scope) {
        var vm = this;
        $scope.$on('$locationChangeSuccess', function() {
            vm.hash = $location.hash();
            if (!vm.hash.length) {
                vm.hash = 'competition';
            }
        });
    }]);

    angular.module('b2clogin').controller('cooperateController', ['$location', '$scope', function($location, $scope) {
        var vm = this;
        $scope.$on('$locationChangeSuccess', function() {
            vm.hash = $location.hash();
            if (!vm.hash.length) {
                vm.hash = 'tab1';
            }
        });
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
/*    $(window).on('resize', function () {

        //console.log($('b2c-header').height() , $('footer').height() , $('.b2c-login-main').height() , $(window).height());

        //if ( $('b2c-header').height() + $('footer').height() + $('.b2c-container').height() < $(window).height()) {
        if(  $('.b2c-login-main').height() > 10 || $('.reg-verify-account').height() > 10 || $('.b2c-enter-email').height() > 10 || $('.b2c-enter-code').height() > 10 ){
            $('footer').addClass('b2c-footer-fix');
        }else{
            $('footer').removeClass('b2c-footer-fix');
        }
    }).trigger('resize');*/
});