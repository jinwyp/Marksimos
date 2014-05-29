/**
 * Created by jinwyp on 5/29/14.
 */


var app = angular.module('marksimos.factory', []);

app.factory('currentUser',function(){

    var factory = {};

    var user = {
        name : 'aaa',
        company : 'Company A'
    };

    var seminar ={
        currentRound : -3, // -3,-2, -1, 0, 1, 2, 3, 4, 5, 6
        companylist : []
    };

    return factory;


});



app.factory('report',function($http){

    var apiPath = '/api/';

    var chartData = {
        series: [],
        data: []
    };





    var factory = {
        marketShareInValue : function(){
            return $http.get(apiPath + 'chart/market_share_in_value').then(function(result){
                console.log(result.data);


                if(angular.isObject(result.data) ){
                    if(angular.isArray(result.data.periods)){

                        angular.forEach(result.data.periods, function(value, key) {
                            console.log(value, key);

                            var oneLineData = {
                                x : "",
                                y : []
                            };

                            oneLineData.x = value.toString();
                            oneLineData.y = result.data.chartData[key];

                            angular.forEach(oneLineData.y, function(value, key) {
                                oneLineData.y[key] = Math.round(value*10000)/100;
                            });

                            this.data.push(oneLineData);
                        }, chartData);

                        chartData.series = result.data.companyNames;
                    }

                }



                return chartData;
            });
        }


    };

    return factory;


});