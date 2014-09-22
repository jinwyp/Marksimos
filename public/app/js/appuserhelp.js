/**
 * Created by raven on 9/8/14.
 */
(function () {
    'use strict';



// create module for custom directives

var marksimosapp = angular.module('marksimoshelp', ['pascalprecht.translate', 'marksimos.model', 'marksimos.websitecomponent',  'marksimos.filter', 'marksimos.translation']);


marksimosapp.controller('userHelpController',['$rootScope', '$scope', '$translate', '$sce', '$http', '$window', 'Help',function($rootScope, $scope, $translate, $sce, $http, $window, Help) {

    $scope.data ={
        faq : [],
        manualChinese : {},
        manualEnglish : {}
    };

    $rootScope.$on('$translateChangeSuccess', function () {
        if($translate.use()=="zh_CN"){
            $scope.faq = $scope.data.faq[1];
            $scope.manual = $scope.data.manualChinese;

        }else if($translate.use()=="en_US"){
            $scope.faq = $scope.data.faq[0];
            $scope.manual = $scope.data.manualEnglish;
        }
    });


    $scope.initPage = function() {

        $scope.isFAQShown=true;
        $scope.isVideoShown=false;
        $scope.isManualShown=false;
        $scope.questionsShown=[1,0,0,0,0,0,0,0];

        Help.getFAQ().then(function(faqResult){
            $scope.data.faq = faqResult;

            Help.getManualChinese().then(function(manualResult){
                $scope.data.manualChinese = manualResult;

                return Help.getManualEnglish();
            })
            .then(function(manualResult){
                $scope.data.manualEnglish = manualResult;

                if($translate.use()=="zh_CN"){
                    $scope.faq = $scope.data.faq[1];
                    $scope.manual = $scope.data.manualChinese;
                }else if($translate.use()=="en_US"){
                    $scope.faq = $scope.data.faq[0];
                    $scope.manual = $scope.data.manualEnglish;
                }
            });

        });
    };

    $scope.chickFAQ=function(index){
        $scope.firstCategory=false;
        $scope.questionsShown=[0,0,0,0,0,0,0,0];
        $scope.questionsShown[index]=1;
    };

    $scope.initPage();


    $scope.clickIntro=function(item){
        $scope.isFAQShown=false;$scope.isVideoShown=false;$scope.isManualShown=false;
        switch(item){
            case 'FAQ':$scope.isFAQShown=true;break;
            case 'Video':$scope.isVideoShown=true;break;
            case 'Manual':$scope.isManualShown=true;break;
        }
    };

}]);



}());
