(function () {
    'use strict';



    angular.module('marksimos.b2ccomponent', ['marksimos.templates', 'pascalprecht.translate', 'b2c.translation']);

    // base decorator required for other decorators(except `watchItemsDecorator`).
    angular.module('marksimos.b2ccomponent').provider('profileFormScopeBaseDecorator', function() {
        var me = {
            // data exporting to scope
            defaults: {
                css: {
                    formEditing: false,
                    errorFields: {}
                },
                formData: {}
            },
            $get: function() {
                return function(scope, formKeys, updateErrorHandler, beforeUpdate) {
                    formKeys = formKeys || [];

                    Object.keys(me.defaults).forEach(function(key) {
                        scope[key] = angular.copy(me.defaults[key]);
                    });

                    // method exporting to scope
                    scope.clickUpdateUserInfo = updateUserInfo;
                    scope.clickEditProfile = editProfile;
                    scope.clickCancelEditProfile = cancelEditProfile;

                    function updateUserInfo(form, data) {
                        if (form.$valid) {
                            scope.css.errorFields = {};

                            if (beforeUpdate) beforeUpdate();

                            scope.update({data: data || scope.formData}).then(function() {
                                cancelEditProfile();
                            }).catch(function(message) {

                                if (updateErrorHandler) updateErrorHandler(message);

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
                };
            }
        };

        return me;
    });

    angular.module('marksimos.b2ccomponent').factory('profileFormScopeAddItemDecorator', function() {
        return function(scope, itemsKey, beforeAddItem) {
            if (!scope.clickUpdateUserInfo)
                throw Error('`profileFormScopeBaseDecorator` should be called before this one');

            scope.clickAddItem = function(form) {
                var data;
                if (form.$valid) {
                    if (beforeAddItem) beforeAddItem();
                    var items = angular.copy(scope.currentUser[itemsKey]);
                    items.push(angular.copy(scope.formData));
                    data = {};
                    data[itemsKey] = items;
                }
                scope.clickUpdateUserInfo(form, data);
            };
        };
    });

    angular.module('marksimos.b2ccomponent').factory('profileFormScopeDeleteItemDecorator', function() {
        return function(scope, itemsKey) {
            if (!scope.clickUpdateUserInfo)
                throw Error('`profileFormScopeBaseDecorator` should be called before this one');

            scope.clickDeleteItem = function(index) {
                scope.formData[itemsKey] = angular.copy(scope.currentUser[itemsKey]);
                scope.formData[itemsKey].splice(index, 1);
                scope.clickUpdateUserInfo({$valid: true});
            };
        };
    });

    // Watch current user's items property, and copy it to form data if it's changed
    angular.module('marksimos.b2ccomponent').factory('profileFormScopeWatchItemsDecorator', function() {
        return function(scope, itemsKey) {
            scope.$watchCollection('currentUser.' + itemsKey, function() {
                if (scope.css.formEditing) {
                    angular.copy(scope.currentUser[itemsKey], scope.formData[itemsKey]);
                }
            });
        };
    });


    angular.module('marksimos.b2ccomponent').directive('profileBasicInfoForm', ['profileFormScopeBaseDecorator', basicInfoFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileEducationForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeDeleteItemDecorator', 'profileFormScopeWatchItemsDecorator', eductionFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewEducationForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeAddItemDecorator', newEducationFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileLanguageForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeDeleteItemDecorator', languageFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewLanguageForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeAddItemDecorator', newLanguageFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileWorkExperienceForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeDeleteItemDecorator', 'profileFormScopeWatchItemsDecorator', workExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewWorkExperienceForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeAddItemDecorator', newWorkExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileSocietyExperienceForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeDeleteItemDecorator', 'profileFormScopeWatchItemsDecorator', societyExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileNewSocietyExperienceForm', ['Constant', 'profileFormScopeBaseDecorator', 'profileFormScopeAddItemDecorator', newSocietyExperienceFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileChangePasswordForm', ['profileFormScopeBaseDecorator', changePasswordFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileMobilePhoneForm', ['$interval', 'profileFormScopeBaseDecorator', mobilePhoneFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileTeamForm', ['profileFormScopeBaseDecorator', teamFormComponent]);
    angular.module('marksimos.b2ccomponent').directive('profileTitleForm', ['profileFormScopeBaseDecorator', titleFormComponent]);


    function basicInfoFormComponent(profileFormScopeBaseDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilebasicinfoform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope, ['firstName', 'gender', 'birthday', 'currentLocation', 'qq']);
            }
        };
    }

    function eductionFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeDeleteItemDecorator, profileFormScopeWatchItemsDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileeducationform.html',
            link: function(scope, elem, attrs, ctrl) {
                var key = 'eductionBackgrounds';

                profileFormScopeBaseDecorator(scope, [key], null, function() {
                    for (var i = 0; i < scope.formData.eductionBackgrounds.length; i++) {
                        addAchievement(i);
                    }
                });

                profileFormScopeDeleteItemDecorator(scope, key);

                profileFormScopeWatchItemsDecorator(scope, key);

                scope.Constant = Constant;

                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickAddAchievement = addAchievement;

                function hideMutiSelect() {
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }

                function addAchievement(index) {
                    var eduction = scope.formData.eductionBackgrounds[index];
                    if (eduction && eduction._newAchievement) {
                        eduction.achievements.push(eduction._newAchievement);
                        eduction._newAchievement = null;
                    }
                }
            }
        };
    }

    function newEducationFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeAddItemDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileneweducationform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope);

                profileFormScopeAddItemDecorator(scope, 'eductionBackgrounds', addAchievement);

                scope.Constant = Constant;

                scope.clickHideMutiSelect = hideMutiSelect;
                scope.clickAddAchievement = addAchievement;

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
            }
        };
    }

    function languageFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeDeleteItemDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilelanguageform.html',
            link: function(scope, elem, attrs, ctrl) {
                var itemsKey = 'LanguageSkills';

                profileFormScopeBaseDecorator(scope, [itemsKey]);

                profileFormScopeDeleteItemDecorator(scope, itemsKey);

                scope.Constant = Constant;
            }
        };
    }

    function newLanguageFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeAddItemDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewlanguageform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope);

                profileFormScopeAddItemDecorator(scope, 'LanguageSkills', function() {

                });

                scope.Constant = Constant;
            }
        };
    }

    function workExperienceFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeDeleteItemDecorator, profileFormScopeWatchItemsDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofileworkexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var itemsKey = 'workExperiences';

                profileFormScopeBaseDecorator(scope, [itemsKey]);

                profileFormScopeDeleteItemDecorator(scope, itemsKey);

                profileFormScopeWatchItemsDecorator(scope, itemsKey);

                scope.Constant = Constant;

                scope.clickHideMutiSelect = hideMutiSelect;

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }
            }
        };
    }

    function newWorkExperienceFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeAddItemDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewworkexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope);

                profileFormScopeAddItemDecorator(scope, 'workExperiences');

                scope.Constant = Constant;

                scope.clickHideMutiSelect = hideMutiSelect;

                function hideMutiSelect(){
                    scope.css.currentJobIndustry = -1;
                    scope.css.currentMajor = -1;
                }
            }
        };
    }

    function societyExperienceFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeDeleteItemDecorator, profileFormScopeWatchItemsDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilesocietyexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                var key = 'societyExperiences';

                scope.Constant = Constant;

                profileFormScopeBaseDecorator(scope, [key]);

                profileFormScopeDeleteItemDecorator(scope, key);

                profileFormScopeWatchItemsDecorator(scope, key);
            }
        };
    }

    function newSocietyExperienceFormComponent(Constant, profileFormScopeBaseDecorator, profileFormScopeAddItemDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilenewsocietyexperienceform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope);

                profileFormScopeAddItemDecorator(scope, 'societyExperiences');

                scope.Constant = Constant;
            }
        };
    }

    function changePasswordFormComponent(profileFormScopeBaseDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilechangepasswordform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope);
            }
        };
    }

    function mobilePhoneFormComponent($interval, profileFormScopeBaseDecorator) {
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
                profileFormScopeBaseDecorator(scope, ['mobilePhone'], updateErrorHandler);

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

                function updateErrorHandler(message) {
                    if (message.errorCode == 30001) {
                        form.mobilePhone.$error.existed = true;
                        form.mobilePhone.$invalid = true;
                        form.mobilePhone.$valid = true;
                    }
                }
            }
        };
    }

    function teamFormComponent(profileFormScopeBaseDecorator) {
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
                profileFormScopeBaseDecorator(scope, ['team.name']);

                scope.clickRemoveStudentToTeam = removeStudentToTeam;
                scope.clickAddStudentToTeam = addStudentToTeam;

                function removeStudentToTeam(id) {
                    scope.removeStudentToTeam({id: id});
                }

                function addStudentToTeam(form) {
                    if (form.$valid) {
                        scope.addStudentToTeam({username: scope.formData.newTeamMember}).catch(function(message) {
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
            }
        };
    }

    function titleFormComponent(profileFormScopeBaseDecorator) {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofiletitleform.html',
            link: function(scope, elem, attrs, ctrl) {
                profileFormScopeBaseDecorator(scope, ['gameMarksimosPosition']);
            }
        };
    }


})();