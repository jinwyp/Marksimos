var reportModel = require('../models/report.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');

exports.getReport = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }
    
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

        if(userRole === config.role.student && isReportNeedFilter(reportName)){
            return res.send(extractReportOfOneCompany(report, companyId));
        }

        res.send(report.reportData);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "fail to get report."});
    })
    .done();

}

function isReportNeedFilter(report_name){
    return report_name==='financial_report' || report_name==='profitability_evolution';
}

/**
 * Filter out data of other companies
 */
function extractReportOfOneCompany(report, companyId){
    if(!report || !report.reportData) return;

    var tempReportData = [];
    for(var i=0; i<report.reportData.length; i++){
        if(report.reportData[i].companyId === companyId){
            tempReportData.push(report.reportData[i]); 
        }
    }
    
    return tempReportData;
}