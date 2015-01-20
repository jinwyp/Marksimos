/**
 * Created by raven on 9/8/14.
 */

/**
 * recommended
 *
 * no globals are left behind
 */


(function () {
    'use strict';



    /********************  Create New Module For Controllers ********************/
    angular.module('marksimoshelp', ['pascalprecht.translate', 'marksimos.config', 'marksimos.websitecomponent', 'marksimos.model', 'marksimos.filter', 'marksimos.translation']);



    /********************  Use This Module To Set New Controllers  ********************/
    angular.module('marksimoshelp').controller('userHelpController',['$rootScope', '$scope', '$translate', '$http', '$q', '$window', 'Help',function($rootScope, $scope, $translate,  $http, $q, $window, Help) {

        $scope.data ={
            allFaq :[],
            currentFaq : {},
            currentFaqCategory : {},
            currentManual : {},
            manualChinese : {},
            manualEnglish : {}
        };

        $scope.css = {
            navTab : 'FAQ',
            language : 'en_US'
        };

        $rootScope.$on('$translateChangeSuccess', function () {
            if($translate.use()=="zh_CN"){
                $scope.data.currentFaq = $scope.data.allFaq[1];
                $scope.data.currentManual = $scope.data.manualChinese;
                $scope.css.language = "zh_CN";

            }else if($translate.use()=="en_US"){
                $scope.data.currentFaq = $scope.data.allFaq[0];
                $scope.data.currentManual = $scope.data.manualEnglish;
                $scope.css.language = "en_US";
            }
            $scope.data.currentFaqCategory = $scope.data.currentFaq.categories[0];
        });


        var app = {
            initOnce : function(){
                this.loadingData();
            },

            loadingData : function(){
                $scope.questionsShown=[1,0,0,0,0,0,0,0];

                Help.getFAQ().then(function(faqResult){
                    $scope.data.allFaq = faqResult;

                    Help.getManualChinese().then(function(manualResult){
                        $scope.data.manualChinese = manualResult;

                        return Help.getManualEnglish();
                    }).then(function(manualResult){
                        $scope.data.manualEnglish = manualResult;

                        if($translate.use()=="zh_CN"){
                            $scope.data.currentFaq = $scope.data.allFaq[1];
                            $scope.data.currentManual = $scope.data.manualChinese;
                            $scope.css.language = "zh_CN";

                        }else if($translate.use()=="en_US"){
                            $scope.data.currentFaq = $scope.data.allFaq[0];
                            $scope.data.currentManual = $scope.data.manualEnglish;
                            $scope.css.language = "en_US";
                        }
                        $scope.data.currentFaqCategory = $scope.data.currentFaq.categories[0];
                    });

                });
            }
        };


        app.initOnce();


        $scope.clickMenuTab = function(menu){
            $scope.css.navTab = menu;
        };

        $scope.chickFAQTab = function(category){
            $scope.data.currentFaqCategory = category;
        };

    }]);



}());
