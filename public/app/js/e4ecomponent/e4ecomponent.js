(function () {
    'use strict';

    angular.module('marksimos.e4ecomponent', ['marksimos.templates', 'pascalprecht.translate', 'b2c.translation']);


    angular.module('marksimos.e4ecomponent').directive('profileBasicInfoForm', []);

    function basicInfoFormComponent() {
        return {
            restrict: 'E',
            scope: {
                currentUser: '=',
                update: '=',
                getPhoneVerifyCode: '&',
                sendPhoneVerifyCode: '&'
            },
            templateUrl: 'e4eprofilebasicinfoform.html',
            link: function(scope, elem, attrs, ctrl) {
                scope.css = {
                    formEditing: false,
                    mobileVerifyCodeResend: false,
                    mobileVerifyCodeTimeCounter: 60,
                    errorFields: {
                        qq: false,
                        mobilePhone: false,
                        mobilePhoneVerifyCode: false,
                        mobilePhoneWrongFormat: false
                    }
                };
                scope.formData = {};


            }
        };
    }

})();