var verifyApp = angular.module('verifyApp', []);

verifyApp.controller('verifyCtrl', [
    '$scope',
    '$location',
    '$rootScope',
    '$log',
    '$http',
    '$window',
    function($scope, $location, $rootScope, $log, $http, $window) {
        function GetRequest() {
            var url = document.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }

        var Request = GetRequest();

        $scope.loginError = false;

        $scope.result = {
            result: '',
            msg: ''
        }
        if (Request['email'] || Request['emailtoken']) {
            var email = Request['email'].substring(0, 3) + '***' + Request['email'].substring(Request['email'].length - 3, Request['email'].length);

            var data = {
                data: {
                    email: Request['email'],
                    token: Request['emailtoken']
                }
            };
            $http({
                url: 'http://121.40.121.46:1337/validate-email',
                method: 'POST',
                data: data,
                timeout: 7500
            }).then(function(data) {
                $scope.result.result = "Verify " + email + " Success";
                $scope.result.msg = "Thank you for your patience";
            }, function(data) {
                $scope.result.result = "Verify " + email + " Fail";
                $scope.result.msg = data.data.msg;
            });
        } else {
            $scope.result.result = "Verify Fail";
            $scope.result.msg = "Wrong Verify Url";
        }
    }
])