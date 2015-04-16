
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
        vm.verifyUsername = verifyUsername;
        vm.verifyEmail = verifyEmail;

        vm.captchaImageNum = 1;




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
                    vm.captchaImageNum++;
                    if(err.data.message === 'Cancel captcha error') {
                        form.captcha.$valid = false;
                        form.captcha.$invalid = true;
                    }else{
                        form.username.$valid = false;
                        form.username.$invalid = true;
                        form.email.$valid = false;
                        form.email.$invalid = true;

                        vm.css.usernameExistedInfo = true;
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




    angular.module('b2clogin').controller('profileController', ['Student', '$alert', 'FileUploader', '$translate', '$location', '$interval', 'Constant', function(Student, $alert, FileUploader, $translate, $location, $interval, Constant) {
        /* jshint validthis: true */
        var vm = this;
        vm.css = {
            addStudentFailedInfo: false,
            currentTabIndex: 1,
            updateTeamNameDisabled: true,
            saving: false,

            formEditing: false,
            currentJobIndustry : -1,
            currentJobPosition : -1,

            //education background form editing states
            educationEditing: false,
            addEducationEditing: false,
            languageEditing: false,
            addLanguageEditing: false,

            //experience form editing states
            experienceEditing: false,
            addExperienceEditing: false,

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
        vm.clickAddStudentToTeam = addStudentToTeam;
        vm.clickRemoveStudentToTeam = removeStudentToTeam;
        vm.clickUpdateTeamName = updateTeamName;
        vm.clickUpdateUserInfo = updateUserInfo;
        vm.clickUpdatePassword = updatePassword;
        vm.clickEditProfile = editProfile;
        vm.clickSwitchTab = switchTab;
        vm.clickCancelEditProfile = cancelEditProfile;
        vm.clickGetMobileVerifyCode = getMobileVerifyCode;
        vm.clickSendMobileVerifyCode = sendMobileVerifyCode;
        vm.clickSetEditingState = setEditingState;
        vm.clickResetEditingState = resetEditingState;
        vm.clickAddNewLanguage = addNewLanguage;
        vm.clickDeleteEducation = deleteEducation;
        vm.clickDeleteLanguage = deleteLanguage;
        vm.clickAddNewAchievement = addNewAchievement;
        vm.clickAddNewAchievementToExistEducation = addNewAchievementToExistEducation;
        vm.clickDeleteExperience = deleteExperience;
        vm.clickDeleteNewEducation = deleteNewEducation;
        vm.clickDeleteNewExperience = deleteNewExperience;


        vm.hideMutiSelect = function(){
            vm.css.currentJobIndustry=-1;
            vm.css.currentJobPosition=-1;
        };


        /**********  Function Declarations  **********/
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

        function deleteNewExperience() {
            vm.css.addExperienceEditing = false;
            vm.newExperience = null;
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

        function deleteExperience(index) {
            vm.formData.workExperiences.splice(index, 1);
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

        function updateUserInfo(form, slient) {
            if (form.$valid) {
                vm.css.errorFields = {};

                if (vm.newEducation) {
                    if (!vm.newEducation.achievements) {
                        vm.newEducation.achievements = [];
                    }
                    vm.formData.eductionBackgrounds.push(vm.newEducation);
                }

                if (vm.newExperience) {
                    vm.formData.workExperiences.push(vm.newExperience);
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
                    angular.copy(vm.formData, vm.currentUser);

                    vm.newEducation = null;
                    vm.newLanguageSkill = null;
                    vm.newExperience = null;

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

        function getMobileVerifyCode(form) {
            vm.css.mobileVerifyCodeResend = false;
            vm.css.errorFields.mobilePhoneVerifyCode = false;
            if(form.$valid){

                Student.getPhoneVerifyCode().then(function(){

                    vm.css.mobileVerifyCodeResend = true;
                    vm.css.mobileVerifyCodeTimeCounter = 60;

                    var timer = $interval(function() {
                        if(vm.css.mobileVerifyCodeTimeCounter > 0){
                            vm.css.mobileVerifyCodeTimeCounter = vm.css.mobileVerifyCodeTimeCounter - 1;
                        }else {
                            $interval.cancel(timer);
                        }
                    }, 1000);

                }).catch(function(err){
                    form.mobilePhoneVerifyCode.$setDirty();
                    form.mobilePhoneVerifyCode.$valid = false;
                    form.mobilePhoneVerifyCode.$invalid = true;

                    vm.css.errorFields.mobilePhoneWrongFormat = true;

                });
            }
        }

        function sendMobileVerifyCode(form) {
            vm.css.mobileVerifyCodeResend = false;
            vm.css.errorFields.mobilePhoneVerifyCode = false;

            Student.sendPhoneVerifyCode(vm.formData.mobilePhoneVerifyCode).then(function(){
                vm.currentUser.phoneVerified = true;
            }).catch(function(err){
                form.mobilePhoneVerifyCode.$setDirty();
                form.mobilePhoneVerifyCode.$valid = false;
                form.mobilePhoneVerifyCode.$invalid = true;

                vm.css.errorFields.mobilePhoneVerifyCode = true;

                console.log(err);
            });
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
                if (+$location.hash() >= 0) {
                    switchTab(+$location.hash());
                }
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

                angular.copy(vm.currentUser, formData);

                formData.oldPassword = '';
                formData.newPassword = '';
                formData.rePassword = '';

                formData.teamName = vm.currentUser.team && vm.currentUser.team.name;
                formData.newTeamMember = '';

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