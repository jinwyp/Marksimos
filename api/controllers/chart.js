var chartDataModel = require('../models/chartData.js');
var util = require('util');

exports.getChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chartName;
    var companyId = req.session.companyId;

    if(!seminarId){
        return next(new Error('seminarId cannot be empty.'));
    }

    if(!chartName){
        return next(new Error('chartName cannot be empty.'));
    }

    chartDataModel.getChartData(seminarId)
    .then(function(allCharts){
        var chart = null;
        for(var i=0; i<allCharts.charts.length; i++){
            //chart name saved in db doesn't contain _
            var chartNameTemp = chartName.replace(/_/g,'');

            //find chart data by chart name
            if(allCharts.charts[i].chartName.toLowerCase() === chartNameTemp.toLowerCase()){
                chart = allCharts.charts[i];
                if(chartNameTemp==='inventoryReport'){
                    //this function changes data in chart object
                    filterChart(chart, companyId);
                }
                break;
            }
        }
        if(!chart){
            return next(new Error(util.format("chart %s does not exist.", chartName)));
        }

        res.json(chart.chartData);
    })
    .fail(function(err){
        next(err);
    })
    .done();

    /**
     * chart contains data of all the companies, 
     * this function removes chart data of other companies from chart
     *
     * @param {Object} chart chartData got from db
     * @param {Number} companyId
     */
    function filterChart(chart, companyId){
        if(!chart) throw new Error("invalid parameter chart");
        if(!companyId) throw new Error("invalid parameter companyId");

        var chartData = chart.chartData;
        var chartOfCurrentCompany;
        for(var j=0; j<chartData.length; j++){
            if(chartData[j].companyId === companyId){
                chartOfCurrentCompany = chartData[j];
                break;
            }
        }
        if(chartOfCurrentCompany){
            chart.chartData = [chartOfCurrentCompany];
        }
    }

    // function mapChartName(chartName){
    //     chartName = chartName.toLowerCase();
    //     var names = chartName.split('_');
    //     for(var i=1; i<names.length; i++){
    //         names[i] = names[i][0].toUpperCase() + names[i].substring(1);
    //     }

    //     return names.join('');
    // }
};

