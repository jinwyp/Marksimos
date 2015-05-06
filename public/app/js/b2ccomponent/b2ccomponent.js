(function () {
    'use strict';

    angular.module('marksimos.e4ecomponent', ['marksimos.templates', 'pascalprecht.translate', 'b2c.translation']);


    angular.module('marksimos.e4ecomponent').directive('profileBasicInfoForm', [basicInfoFormComponent]);
    angular.module('marksimos.e4ecomponent').directive('profileChangePasswordForm', [changePasswordFormComponent]);
    angular.module('marksimos.e4ecomponent').directive('profileMobilePhoneForm', ['$interval', mobilePhoneFormComponent]);
    angular.module('marksimos.e4ecomponent').directive('profileTeamForm', [teamFormComponent]);


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
                            scope.formData[key] = value;
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css.formEditing = false;
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
                            scope.formData[key] = value;
                        }
                    });
                }

                function cancelEditProfile() {
                    scope.css.formEditing = false;
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
                            scope.formData[key] = value;
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
                            scope.formData[key] = value;
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