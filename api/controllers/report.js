var reportModel = require('../models/report.js');
var logger = require('../../logger.js');

exports.getReport = function(req, res, next){
    var seminarId = req.session.seminarId;
    var companyId = req.session.companyId;
    var reportName = req.params.report_name;

    if(reportName === undefined){
        return res.send(400, {message: "Invalid parameter reportName."});
    }

    var userRole = req.session.userRole;

    reportModel.findOne(seminarId, reportName)
    .then(function(report){
        if(report===null || report===undefined){
            return res.send(400, {message: "Report doesn't exist."})
        }

        if(userRole!==1){
            return res.send(filterReport(report, companyId));
        }

        res.send(report.reportData);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "fail to get report."});
    })
    .done();

    function filterReport(report, companyId){
        return "filterd report."
    }
}