(function () {
    'use strict';

    angular.module('marksimos.b2ccomponent', ['marksimos.templates', 'pascalprecht.translate', 'b2c.translation']);


    angular.module('marksimos.b2ccomponent').directive('profileBasicInfoForm', [basicInfoFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileEducationForm', ['Constant', eductionFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewEducationForm', ['Constant', newEducationFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileLanguageForm', ['Constant', languageFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewLanguageForm', ['Constant', newLanguageFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileWorkExperienceForm', ['Constant', workExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewWorkExperienceForm', ['Constant', newWorkExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileSocietyExperienceForm', ['Constant', societyExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewSocietyExperienceForm', ['Constant', newSocietyExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileChangePasswordForm', [changePasswordFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileMobilePhoneForm', ['$interval', mobilePhoneFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileTeamForm', [teamFormComponent]);


    function basicInfoFormComponent() {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilebasicinfoform.html',
            link: function(scope, elem, attrs, ctrl) {
                // will copy values from `currentUser` when click the edit button
                var formKeys = ['firstName', 'gender', 'birthday', 'currentLocation', 'qq'];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function eductionFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileeducationform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['eductionBackgrounds'];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickDeleteEducation = deleteEducation;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;
                scope.clickAddAchievement = addAchievement;

                scope.$watchCollection('currentUser.eductionBackgrounds', function() {
                    if (scope.css.formEditing) {
                        angular.copy(scope.currentUser.eductionBackgrounds, scope.formData.eductionBackgrounds);
                    }
                });

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }

                function deleteEducation(index) {
                    scope.formData.eductionBackgrounds = angular.copy(scope.currentUser.eductionBackgrounds);
                    scope.formData.eductionBackgrounds.splice(index, 1);
                    updateUserInfo({$valid: true});
                }

                function addAchievement(index) {
                    var eduction = scope.formData.eductionBackgrounds[index];
                    eduction.achievements.push(eduction._newAchievement);
                    eduction._newAchievement = null;
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }

            }
        };
    }

    function newEducationFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileneweducationform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = [];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;
                scope.clickAddAchievement = addAchievement;
                scope.clickAddNewEducation = addNewEducation;

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }

                function addAchievement() {
                    if (scope.formData.newAchievement) {
                        if (!scope.formData.achievements)
                            scope.formData.achievements = [];

                        scope.formData.achievements.push(scope.formData.newAchievement);
                        scope.formData.newAchievement = null;
                    }
                }

                function addNewEducation(form) {
                    if (form.$valid) {
                        addAchievement();
                        var newItem = angular.copy(scope.formData);
                        scope.formData.eductionBackgrounds = angular.copy(scope.currentUser.eductionBackgrounds);
                        scope.formData.eductionBackgrounds.push(newItem);
                    }
                    updateUserInfo(form);
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function languageFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilelanguageform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['LanguageSkills'];

                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickDeleteLanguage = deleteLanguage;
                scope.clickCancelEditProfile = cancelEditProfile;

                function deleteLanguage(index) {
                    scope.formData.LanguageSkills = angular.copy(scope.currentUser.LanguageSkills);
                    scope.formData.LanguageSkills.splice(index, 1);
                    updateUserInfo({$valid: true});
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }

            }
        };
    }

    function newLanguageFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewlanguageform.html',
            link: function(scope, elem, attrs, ctrl) {
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickAddNewLanguage = addNewLanguage;

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function addNewLanguage(form) {
                    if (form.$valid) {
                        var newItem = angular.copy(scope.formData);
                        scope.formData.LanguageSkills = angular.copy(scope.currentUser.LanguageSkills);
                        scope.formData.LanguageSkills.push(newItem);
                    }
                    updateUserInfo(form);
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function workExperienceFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileworkexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['workExperiences'];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickDeleteExperience = deleteExperience;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                scope.$watchCollection('currentUser.workExperiences', function() {
                    if (scope.css.formEditing) {
                        angular.copy(scope.currentUser.workExperiences, scope.formData.workExperiences);
                    }
                });

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }

                function deleteExperience(index) {
                    scope.formData.workExperiences = angular.copy(scope.currentUser.workExperiences);
                    scope.formData.workExperiences.splice(index, 1);
                    updateUserInfo({$valid: true});
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }

            }
        };
    }

    function newWorkExperienceFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewworkexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = [];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};
                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickAddNewExperience = addNewExperience;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }

                function addNewExperience(form) {
                    if (form.$valid) {
                        var newItem = angular.copy(scope.formData);
                        scope.formData.workExperiences = [];
                        angular.copy(scope.currentUser.workExperiences, scope.formData.workExperiences);
                        scope.formData.workExperiences.push(newItem);
                    }
                    updateUserInfo(form);
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function societyExperienceFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilesocietyexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['societyExperiences'];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickDeleteExperience = deleteExperience;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                scope.$watchCollection('currentUser.societyExperiences', function() {
                    if (scope.css.formEditing) {
                        angular.copy(scope.currentUser.societyExperiences, scope.formData.societyExperiences);
                    }
                });

                function deleteExperience(index) {
                    scope.formData.societyExperiences = angular.copy(scope.currentUser.societyExperiences);
                    scope.formData.societyExperiences.splice(index, 1);
                    updateUserInfo({$valid: true});
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }

            }
        };
    }

    function newSocietyExperienceFormComponent(Constant) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewsocietyexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = [];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};
                scope.Constant = Constant;

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickAddNewExperience = addNewExperience;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                function addNewExperience(form) {
                    if (form.$valid) {
                        var newItem = angular.copy(scope.formData);
                        scope.formData.societyExperiences = [];
                        angular.copy(scope.currentUser.societyExperiences, scope.formData.societyExperiences);
                        scope.formData.societyExperiences.push(newItem);
                    }
                    updateUserInfo(form);
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function changePasswordFormComponent() {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilechangepasswordform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = [];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function mobilePhoneFormComponent($interval) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&',
                getPhoneVerifyCode: '&',
                sendPhoneVerifyCode: '&'
            },
            templateUrl: 'b2cprofilemobilephoneform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['mobilePhone'];
                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                scope.clickSendMobileVerifyCode = sendMobileVerifyCode;
                scope.clickGetMobileVerifyCode = getMobileVerifyCode;

                function getMobileVerifyCode(form) {
                    scope.css.mobileVerifyCodeResend = false;
                    scope.css.errorFields.mobilePhoneVerifyCode = false;
                    scope.getPhoneVerifyCode().then(function(){

                        scope.css.mobileVerifyCodeResend = true;
                        scope.css.mobileVerifyCodeTimeCounter = 60;

                        var timer = $interval(function() {
                            if(scope.css.mobileVerifyCodeTimeCounter > 0){
                                scope.css.mobileVerifyCodeTimeCounter = scope.css.mobileVerifyCodeTimeCounter - 1;
                            }else {
                                $interval.cancel(timer);
                            }
                        }, 1000);

                    }).catch(function(err){
                        form.mobilePhoneVerifyCode.$setDirty();
                        form.mobilePhoneVerifyCode.$valid = false;
                        form.mobilePhoneVerifyCode.$invalid = true;

                        scope.css.errorFields.mobilePhoneWrongFormat = true;

                    });
                }

                function sendMobileVerifyCode(form) {
                    scope.css.mobileVerifyCodeResend = false;
                    scope.css.errorFields.mobilePhoneVerifyCode = false;

                    if (form.$valid) {
                        scope.sendPhoneVerifyCode({code: scope.formData.mobilePhoneVerifyCode}).then(function(){
                            scope.currentUser.phoneVerified = true;
                        }).catch(function(err){
                            form.mobilePhoneVerifyCode.$setDirty();
                            form.mobilePhoneVerifyCode.$valid = false;
                            form.mobilePhoneVerifyCode.$invalid = true;

                            scope.css.errorFields.mobilePhoneVerifyCode = true;

                            console.log(err);
                        });
                    }  else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }

    function teamFormComponent() {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&',
                removeStudentToTeam: '&',
                addStudentToTeam: '&'
            },
            templateUrl: 'b2cprofileteamform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['team.name'];

                scope.css = {
                    formEditing: false,
                    errorFields: {}
                };

                scope.formData = {};

                scope.clickUpdateUserInfo = updateUserInfo;
                scope.clickEditProfile = editProfile;
                scope.clickCancelEditProfile = cancelEditProfile;

                scope.clickRemoveStudentToTeam = removeStudentToTeam;
                scope.clickAddStudentToTeam = addStudentToTeam;

                function updateUserInfo(form) {
                    if (form.$valid) {
                        scope.css.errorFields = {};

                        scope.update({data: scope.formData}).then(function() {
                            cancelEditProfile();
                        }).catch(function(message) {
                            if (angular.isArray(message)) {
                                message.forEach(function(item) {
                                    form[item.param].$valid = false;
                                    form[item.param].$invalid = true;
                                    scope.css.errorFields[item.param] = true;
                                });
                            }
                        });
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function removeStudentToTeam(id) {
                    scope.removeStudentToTeam({id: id});
                }

                function addStudentToTeam(form) {
                    if (form.$valid) {
                        scope.addStudentToTeam({username: scope.formData.newTeamMember});
                    } else {
                        Object.keys(form).forEach(function(key) {
                            if (key[0] != '$') {
                                form[key].$setDirty();
                            }
                        });
                    }
                }

                function editProfile() {
                    scope.css.formEditing = true;
                    formKeys.forEach(function(key) {
                        var keys = key.split('.'),
                            value = scope.currentUser;
                        keys.forEach(function(k) {
                            if (!value) return;
                            value = value[k];
                        });
                        if (typeof value != 'undefined') {
                            scope.formData[key] = angular.copy(value);
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css = {
                        formEditing: false,
                        errorFields: {}
                    };
                    scope.formData = {};
                }
            }
        };
    }


})();