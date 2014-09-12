/**
 * Created by raven on 9/8/14.
 */
'use strict';

// create module for custom directives
var marksimosapp = angular.module('marksimoshelp', ['pascalprecht.translate', 'marksimos.model', 'marksimos.websitecomponent',  'marksimos.filter', 'marksimos.translation']);



marksimosapp.controller('userHelpController',['$rootScope', '$scope', '$translate', '$sce', '$http', '$window', 'FAQ', 'Manual',function($rootScope, $scope, $translate, $sce, $http, $window, FAQ, Manual) {

    

    $rootScope.$on('$translateChangeSuccess', function (a,b) {
        if($translate.use()=="zh_CN"){
            FAQ.getZH_CN().then(function(faqResult){
                $scope.faq=faqResult;
                return Manual.getZH_CN();
            }).then(function(manualResult){
                $scope.manual=manualResult;
            });
        }else if($translate.use()=="en_US"){
            FAQ.getEN_US().then(function(faqResult){
                $scope.faq=faqResult;
                return Manual.getEN_US();
            }).then(function(manualResult){
                $scope.manual=manualResult;
            });
        }
    });


    $scope.initPage = function() {

        $scope.isFAQShown=true;
        $scope.isVideoShown=false;
        $scope.isManualShown=false;
        $scope.questionsShown=[1,0,0,0,0,0,0,0];

        if($translate.use()=="zh_CN"){
            FAQ.getZH_CN().then(function(faqResult){
                $scope.faq=faqResult;
                return Manual.getZH_CN();
            }).then(function(manualResult){
                $scope.manual=manualResult;
            });
        }else if($translate.use()=="en_US"){
            FAQ.getEN_US().then(function(faqResult){
                $scope.faq=faqResult;
                return Manual.getEN_US();
            }).then(function(manualResult){
                $scope.manual=manualResult;
            });
        }
    };

    $scope.chickFAQ=function(index){
        $scope.firstCategory=false;
        $scope.questionsShown=[0,0,0,0,0,0,0,0];
        $scope.questionsShown[index]=1;
    }

    $scope.initPage();


    $scope.clickIntro=function(item){
        $scope.isFAQShown=false;$scope.isVideoShown=false;$scope.isManualShown=false;
        switch(item){
            case 'FAQ':$scope.isFAQShown=true;break;
            case 'Video':$scope.isVideoShown=true;break;
            case 'Manual':$scope.isManualShown=true;break;
        }
    }

}]);

