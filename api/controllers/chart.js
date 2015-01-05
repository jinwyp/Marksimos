var chartModel = require('../models/marksimos/chart.js');
var util = require('util');
var logger = require('../../common/logger.js');
var config           = require('../../common/config.js');


exports.getChart = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    var chartName = req.params.chart_name;
    var companyId = +req.query.companyId;

    if(!seminarId ){
        return res.send(500, {message: 'seminarId cannot be empty.'});
    }

    if(!chartName){
        return res.send(500, {message: 'chartName cannot be empty.'});
    }

    //chart name saved in db doesn't contain _
    var chartNameTemp = chartName.replace(/_/g,'');
    var userRole = req.session.userRole;

    chartModel.findOne(seminarId)
    .then(function(result){
        var allCharts = result.charts;
        var chart = null;
        for(var i=0; i<allCharts.length; i++){
            //find chart data by chart name
            if(allCharts[i].chartName.toLowerCase() === chartNameTemp.toLowerCase()){
                chart = allCharts[i];
                break;
            }
        }

        if(!chart){
            return res.send(500, {message: util.format("chart %s does not exist.", chartName)});
        }

        if(userRole === config.role.student && chartName==='inventory_report'){
            //this function changes data in chart object
            var chartData = filterChart(chart, companyId);
            return res.send(chartData);
        }

        res.send(chart.chartData);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get chart failed."})
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
        if(!chart || !companyId) {
            throw new Error("invalid parameter chart or invalid parameter companyId");
        }

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

