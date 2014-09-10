var marksimosapp = angular.module('marksimoshelp', ['pascalprecht.translate', 'marksimos.model', 'marksimos.websitecomponent',  'marksimos.filter', 'marksimos.translation','ngSanitize','btford.markdown']);

marksimosapp.controller('userHelpController',['$scope', '$sce', '$http', '$window', 'FAQ', function($scope, $sce, $http, $window, FAQ) {


    $scope.initPage = function() {



        $scope.isFAQShown=true;
        $scope.isVideoShown=false;
        $scope.isManualShown=false;
        $scope.questionsShown=[1,0,0,0,0,0,0,0];

        FAQ.getFAQ().then(function(doc){
            console.log(doc);
            $scope.faqs=doc;
            return $http({
                url:'/marksimos/manual',
                method:'GET'
            });
        }).then(function(data){
            $scope.manual=data.data;
        });
    };

    $scope.chickFAQ=function(index){
        $scope.firstCategory=false;
        $scope.questionsShown=[0,0,0,0,0,0,0,0];
        $scope.questionsShown[index]=1;
    }

    $scope.trustAsHtml = function(data) {
        return $sce.trustAsHtml(data);
    };

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