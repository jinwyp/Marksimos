var chartModel = require('../../models/marksimos/chart.js');
var util = require('util');
var logger = require('../../../common/logger.js');
var userRoleModel = require('../../models/user/userrole.js');

exports.getChart = function(req, res, next){
    var seminarId = req.gameMarksimos.currentStudentSeminar.seminarId;

    if(req.user.role !== userRoleModel.roleList.student.id){
        seminarId = +req.query.seminarId;
    }

    if(!seminarId){
        return res.status(400).send( {message: "You don't choose a seminar."});
    }

    var chartName = req.params.chart_name;
    var companyId = +req.query.companyId;

    if(!chartName){
        return res.status(400).send( {message: 'chartName cannot be empty.'});
    }

    //chart name saved in db doesn't contain _
    var chartNameTemp = chartName.replace(/_/g,'');

    chartModel.findOne(seminarId).then(function(result){
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
            return res.status(400).send({message: util.format("chart %s does not exist.", chartName)});
        }

        if(req.user.role === userRoleModel.roleList.student.id && chartName==='inventory_report'){
            //this function changes data in chart object
            var chartData = filterChart(chart, companyId);
            return res.send(chartData);
        }
        res.send(chart.chartData);
    })
    .fail(function(err){
        logger.error(err);
        res.status(500).send( {message: "get chart failed."})
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

