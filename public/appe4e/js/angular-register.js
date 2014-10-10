/**
 * Created by raven on 9/27/14.
 */


(function () {
    'use strict';



// create module for custom directives
    var registerapp = angular.module('e4eregister', ['pascalprecht.translate', 'e4e.translation','e4e.directive','ui.bootstrap']);


            


    registerapp.controller('registerHeaderController',['$scope','$translate','$rootScope','$http','$window','$locale','$timeout',function($scope,$translate,$rootScope,$http,$window,$locale,$timeout){
        $scope.isEnglish=($translate.use()=="en_US");

        $scope.dateOptions = {
            showWees:false,
            'min-mode':"month"
        };

        $scope.birthOptions={
            showWees:false,
            'min-mode':"month"
            //'min-mode':"year"
        }

        

        $rootScope.$on('$translateChangeSuccess', function () {
            $scope.isEnglish=($translate.use()=="en_US");
        });
        
        var locales = {
            zh_CN: {"DATETIME_FORMATS": {"AMPMS": ["\u4e0a\u5348","\u4e0b\u5348"],"DAY": ["\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],"MONTH": ["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],"SHORTDAY": ["\u5468\u65e5","\u5468\u4e00","\u5468\u4e8c","\u5468\u4e09","\u5468\u56db","\u5468\u4e94","\u5468\u516d"],"SHORTMONTH": ["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],"fullDate": "y\u5e74M\u6708d\u65e5EEEE","longDate": "y\u5e74M\u6708d\u65e5","medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss","mediumDate": "y\u5e74M\u6708d\u65e5","mediumTime": "ah:mm:ss","short": "yy/M/d ah:mm","shortDate": "yy/M/d","shortTime": "ah:mm"},"NUMBER_FORMATS": {"CURRENCY_SYM": "\u00a5","DECIMAL_SEP": ".","GROUP_SEP": ",","PATTERNS": [{"gSize": 3,"lgSize": 3,"maxFrac": 3,"minFrac": 0,"minInt": 1,"negPre": "-","negSuf": "","posPre": "","posSuf": ""},{"gSize": 3,"lgSize": 3,"maxFrac": 2,"minFrac": 2,"minInt": 1,"negPre": "\u00a4\u00a0-","negSuf": "","posPre": "\u00a4\u00a0","posSuf": ""}]},"id": "zh-cn","pluralCat": function (n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}},
            en_US: {"DATETIME_FORMATS": {"AMPMS": ["AM","PM"],"DAY": ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"MONTH": ["January","February","March","April","May","June","July","August","September","October","November","December"],"SHORTDAY": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"SHORTMONTH": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"fullDate": "EEEE, MMMM d, y","longDate": "MMMM d, y","medium": "MMM d, y h:mm:ss a","mediumDate": "MMM d, y","mediumTime": "h:mm:ss a","short": "M/d/yy h:mm a","shortDate": "M/d/yy","shortTime": "h:mm a"},"NUMBER_FORMATS": {"CURRENCY_SYM": "$","DECIMAL_SEP": ".","GROUP_SEP": ",","PATTERNS": [{"gSize": 3,"lgSize": 3,"maxFrac": 3,"minFrac": 0,"minInt": 1,"negPre": "-","negSuf": "","posPre": "","posSuf": ""},{"gSize": 3,"lgSize": 3,"maxFrac": 2,"minFrac": 2,"minInt": 1,"negPre": "\u00a4-","negSuf": "","posPre": "\u00a4","posSuf": ""}]},"id": "en-us","pluralCat": function (n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}}
        };

        angular.copy(locales['en_US'], $locale);


        $scope.changeLanguage = function (langKey) {
            if($scope.dateOfGraduation!=undefined){
                $scope.dateOfGraduation=new Date($scope.dateOfGraduation.getTime());
            }
            if($scope.yearOfBirth!=undefined){
                $scope.yearOfBirth=new Date($scope.yearOfBirth.getTime());
            }
            $translate.use(langKey);
            angular.copy(locales[langKey], $locale);
        };

        $scope.open = function(type) {

            if(type=="Birth"){
                $timeout(function () {
                    $scope.isBirthOpened=true;
                });
            }
            else $timeout(function () {$scope.isGradOpened=true;});

        };

        $scope.submitCompanyRegister = function(){
            $scope.companyEmailError=false;
            var postData={ 
                nameOfContactPerson:$scope.nameOfContactPerson,
                designation:$scope.designation,
                officalContactNumber:$scope.officalContactNumber,
                holdingCompany:$scope.holdingCompany,
                division:$scope.division,
                mobileNumber:$scope.mobileNumber,
                email:$scope.companyEmail
            }
            $http({
                method:'POST',
                url:'/e4e/register/company',
                data:postData
            }).then(function(data){
                if(data.data.message=="Register success"){
                    $window.location.href = "/e4e/company-success?password="+data.data.password ;
                }else{
                    $scope.companyEmailError=true;
                }
            });
        }
        $scope.submitStudentRegister = function(){
            $scope.studentEmailError=false;

            var postData={ 
                userName:$scope.userName,
                firstName:$scope.firstName,
                lastName:$scope.lastName,
                yearOfBirth:$scope.yearOfBirth,
                majors:$scope.majors,
                university:$scope.university,
                dateOfGraduation:$scope.dateOfGraduation,
                email:$scope.studentEmail,
                qq:$scope.qq
            }
            $http({
                method:'POST',
                url:'/e4e/register/student',
                data:postData
            }).then(function(data){
                if(data.data.message=="Register success"){
                    $window.location.href = "/e4e/student-success?password="+data.data.password ;
                }else{
                    $scope.studentEmailError=true;
                }
            });
        }

        $scope.studentRegisterShow = true

        $scope.clickItem = function(item){
            $scope.studentRegisterShow = false;
            $scope.companyRegisterShow = false;

            if(item == "student"){
                $scope.studentRegisterShow = true;
            }else{
                $scope.companyRegisterShow = true;
            }
        }


    }]);


    registerapp.controller('registerSuccessController',['$scope','$translate','$rootScope','$http','$window','$locale','$timeout',function($scope,$translate,$rootScope,$http,$window,$locale,$timeout){
        function GetRequest() {
           var url = document.location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              var strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              }
           }
           return theRequest;
        }
        var Request = GetRequest();
        $scope.password=Request['password'];
    }]);


    // // controller company register
    // registerapp.controller('companyRegisterController', ['$scope', '$timeout', '$http', '$window', function($scope, $timeout, $http, $window) {
    //     $scope.title='company register'

    //     $scope.submitRegister = function(){
    //         var postData={ 
    //             userName:$scope.userName,
    //             companyName:$scope.companyName,
    //             holdingCompany:$scope.holdingCompany,
    //             division:$scope.division,
    //             numberOfEmployees:$scope.numberOfEmployees,
    //             compmayAddress:$scope.compmayAddress,
                
    //             nameOfContactPerson:$scope.nameOfContactPerson,
    //             designation:$scope.designation,
    //             officalContactNumber:$scope.officalContactNumber,
    //             mobileNumber:$scope.mobileNumber,
    //             email:$scope.email,

    //             companyFunction:$scope.companyFunction,
    //             companyRole:$scope.companyRole,
    //             numberOfPositions:$scope.numberOfPositions,
    //             jobDescription:$scope.jobDescription
    //         }
    //         $http({
    //             method:'POST',
    //             url:'/e4e/register/company',
    //             data:postData
    //         }).then(function(data){
    //             console.log(data);
    //             // if(data.data.result=="success"){
    //             //     $window.location.href="/e4e/register/company#step1";
    //             //     //$window.location.href = "/e4e/company-success" ;
    //             // }else{
    //             //     console.log('fail');
    //             // }
    //         });
    //     }
    // }]);







    // // controller student register
    // registerapp.controller('studentRegisterController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    //     $scope.title='student register';
        
    //     $scope.submitRegister = function(){
    //         var postData={ 
    //             userName:$scope.userName,
    //             firstName:$scope.firstName,
    //             lastName:$scope.lastName,
    //             age:$scope.age,
    //             country:$scope.country,
    //             address:$scope.address,
    //             email:$scope.email,
    //             qq:$scope.qq,
    //             highestEDU:$scope.highestEDU,
    //             marjors:$scope.marjors,
    //             university:$scope.university,
    //             scoreGPA:$scope.scoreGPA,
    //             achievements:$scope.achievements,
    //             yearOfGraduation:$scope.yearOfGraduation,
    //             monthOfGraduation:$scope.monthOfGraduation,
    //             currentYear:$scope.currentYear,
    //             uploadResume:$scope.uploadResume
    //         }
    //         $http({
    //             method:'POST',
    //             url:'/e4e/register/student',
    //             data:postData
    //         }).then(function(data){
    //             if(data.data.result=="success"){
    //                 $window.location.href = "/e4e/student-success" ;
    //             }else{
    //                 console.log('fail');
    //             }
    //         });
    //     }
    // }]);

}());




