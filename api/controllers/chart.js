var seminarDataModel = require('../models/seminar.js');
var util = require('util');

exports.getChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chart_name;
    var companyId = req.session.companyId;

    if(!seminarId){
        return next(new Error('seminarId cannot be empty.'));
    }

    if(!chartName){
        return next(new Error('chartName cannot be empty.'));
    }

    //chart name saved in db doesn't contain _
    var chartNameTemp = chartName.replace(/_/g,'');

    seminarDataModel.getChartData(seminarId)
    .then(function(allCharts){
        var chart = null;
        for(var i=0; i<allCharts.length; i++){
            //find chart data by chart name
            if(allCharts[i].chartName.toLowerCase() === chartNameTemp.toLowerCase()){
                chart = allCharts[i];
                break;
            }
        }

        if(!chart){
            return next(new Error(util.format("chart %s does not exist.", chartName)));
        }

        if(chartName==='inventory_report'){
            //this function changes data in chart object
            var chartData = filterChart(chart, companyId);
            console.log(chartData)
            return res.send(chartData);
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
     {
        chartName: "inventoryReport",
        chartData: []
     }
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
            return chartOfCurrentCompany;
        }
    }
};

