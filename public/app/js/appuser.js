/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', ['angularCharts', 'marksimos.component', 'marksimos.factory' ]);



// controller business logic
marksimosapp.controller('chartController', function AppCtrl ($scope,  $timeout, $http, report) {

    $scope.css = {
        menu : 'chart'
    };

    $scope.chart = {
        type : 'line',
        config : {
            title: 'Market Share in Value',
            tooltips: true,
            labels: false,
            legend: {
                display: true,
                position: 'left' //could be 'left, right'
            },
            innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
            lineLegend: 'lineEnd' // can be also 'lineEnd' or 'traditional', defaults to 'lineEnd'
//            mouseover: function() {},
//            mouseout: function() {},
//            click: function() {}
        }
    };

    $scope.dataReport1 = {
        series: ['A', 'B', 'C', 'D', 'F'],
        data : [
            {
                x : "Round 1",
                y: [100,500, 1000],
                tooltip:"this is tooltip"
            },
            {
                x : "Round 2",
                y: [300, 100, 100]
            },
            {
                x : "Round 3",
                y: [351, 210]
            },
            {
                x : "Round 4",
                y: [54, 0, 879]
            }]
    };


    report.marketShareInValue().then(function(data, status, headers, config){
        $scope.dataReport1 = data;
        console.log($scope.dataReport1);
    });



    $scope.switchHome = function(user){
        $scope.css.menu = 'home';
    };

    $scope.switchReport = function(){
        $scope.css.menu = 'chart';
    };


    $scope.showChart = function(){
        $scope.css.menu = 'chart';
    };


    $scope.config = {
        labels: false,
        title : "Not Products",
        legend : {
            display:true,
            position:'left'
        },
        innerRadius: 0
    };

    $scope.config1 = {
        labels: false,
        title : "Products",
        legend : {
            display:true,
            position:'right'
        },
        lineLegend: 'traditional'
    }
});

