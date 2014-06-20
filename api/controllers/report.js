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

        res.send(report.reportData);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "fail to get report."});
    })
    .done();

    function filterReportByRole(report, companyId){
        if(report === undefined){
            throw new Error("Invalid parameter report.");
        }

        if(companyId === undefined){
            throw new Error("Invalid parameter companyId.");
        }

        for(var i = 0; i < report.reportData.company.length; i++){
            var companyReport = report.reportData.company[i];
            if(companyReport.companyId === companyId){
                return companyReport;
            }
        }
    }
}