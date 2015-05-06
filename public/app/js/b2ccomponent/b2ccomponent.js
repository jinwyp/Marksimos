(function () {
    'use strict';

    angular.module('marksimos.e4ecomponent', ['marksimos.templates', 'pascalprecht.translate', 'b2c.translation']);


    angular.module('marksimos.e4ecomponent').directive('profileBasicInfoForm', [basicInfoFormComponent]);

    angular.module('marksimos.e4ecomponent').directive('profileChangePasswordForm', [changePasswordFormComponent]);


    function basicInfoFormComponent() {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '&'
            },
            templateUrl: 'b2cprofilebasicinfoform.html',
            link: function(scope, elem, attrs, ctrl) {
                var formKeys = ['firstName', 'gender', 'birthday', 'currentLocation', 'qq'];
                scope.css = {
                    formEditing: false,
                    errorFields: {
                        qq: false
                    }
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
                        var value = scope.currentUser[key];
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
                        var value = scope.currentUser[key];
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

})();