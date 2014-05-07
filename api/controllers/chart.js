var chartDataModel = require('../models/chartData.js');

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

