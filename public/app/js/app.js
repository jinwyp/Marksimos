/**
 * Created by jinwyp on 4/28/14.
 */

// create module for custom directives
var marksimosapp = angular.module('marksimos', ['angularCharts']);

// controller business logic
marksimosapp.controller('chartController', function AppCtrl ($scope,  $timeout, $http) {

    $http.get('/api/chart/marketShareInValue').success(function(data, status, headers, config){
        $scope.chartData = data;
        console.log($scope.chartData);
    });

        $scope.data = {
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




    $scope.chartType = 'bar';

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

