var chartDataModel = require('../models/chartData.js');
var util = require('util');

exports.getChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chartName;

    chartDataModel.getChartData(seminarId)
    .then(function(chart){
        res.send(chart[chartName]);
    })
    .fail(function(err){
        next(err);
    })
}

exports.getSegmentsLeadersByValueChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chartName;

    if(!seminarId){
        return next(new Error('seminarId cannot be empty.'));
    }

    if(!chartName){
        return next(new Error('chartName cannot be empty.'));
    }

    chartDataModel.getChartData(seminarId)
    .then(function(chart){
        if(!chart.segmentsLeadersByValue[chartName]){
            return next(new Error(util.format("chart %s does not exist.", chartName)));
        }
        res.send(chart.segmentsLeadersByValue[chartName]);
    })
    .fail(function(err){
        next(err);
    })
}


