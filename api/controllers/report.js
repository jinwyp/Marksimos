var reportModel      = require('../models/report.js');
var logger           = require('../../common/logger.js');
var config           = require('../../common/config.js');
var simulationResult = require('../models/simulationResult.js');
var seminarModel     = require('../models/seminar.js');
var Q                = require('q');
var _                = require('underscore');

exports.getFinalScore = function(req, res, next){
    var seminarId = req.session.seminarId;    
    var period = req.params.period;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    Q.all([
        simulationResult.findOne(seminarId, period),
        simulationResult.findOne(seminarId, 0),
        seminarModel.findOne(seminarId)
    ]).spread(function(requestedPeriodResult, initialPeriodResult, seminarInfo){
        var scores = [];
        var highest_SOM, lowest_SOM, highest_Profit, lowest_Profit;
        var a, b, c, d;
        
        for (var i = 0; i < requestedPeriodResult.p_Companies.length; i++) {
            var originalSOM, originalProfit, originalBudget;
            var scaledSOM, scaledProfit, scaledBudget, finalScore;

            originalSOM = 100 * (requestedPeriodResult.p_Companies[i].c_ValueSegmentShare[6] - initialPeriodResult.p_Companies[i].c_ValueSegmentShare[6]);
            originalProfit = requestedPeriodResult.p_Companies[i].c_CumulatedNetResults;

            originalBudget = (period/seminarInfo.simulationSpan) * requestedPeriodResult.p_Companies[i].c_TotalInvestmentBudget;

            if(originalBudget > 0){
                originalBudget =  100 * requestedPeriodResult.p_Companies[i].c_CumulatedInvestments / originalBudget;
            } else {
                originalBudget = 0;
            }

            scores.push({
                companyId      : requestedPeriodResult.p_Companies[i].c_CompanyID,
                originalSOM    : originalSOM,
                originalProfit : originalProfit,
                originalBudget : originalBudget,                
            });
        };

        console.log(scores);

        highest_SOM    = _.max(scores, function(companyScore){ return companyScore.originalSOM; }).originalSOM;
        lowest_SOM     = _.min(scores, function(companyScore){ return companyScore.originalSOM; }).originalSOM;
        highest_Profit = _.max(scores, function(companyScore){ return companyScore.originalProfit; }).originalProfit;
        lowest_Profit  = _.min(scores, function(companyScore){ return companyScore.originalProfit; }).originalProfit;
        
        a = highest_SOM - lowest_SOM;
        c = highest_Profit - lowest_Profit;

        scores.forEach(function(companyScore){
            if(lowest_SOM < 0){ companyScore.scaledSOM = companyScore.originalSOM + a; }
            else { companyScore.scaledSOM = companyScore.originalSOM; }

            if(lowest_Profit < 0){ companyScore.scaledProfit = companyScore.originalProfit + c; }
            else { companyScore.scaledProfit = companyScore.originalProfit; }
        })

        

        if(lowest_SOM < 0){
            lowest_SOM = lowest_SOM + a;
            highest_SOM = highest_SOM + a;
        }

        if(lowest_Profit < 0){
            lowest_Profit = lowest_Profit + c;
            highest_Profit = highest_Profit + c;
        }

        // console.log('highest_SOM:' + highest_SOM);
        // console.log('lowest_SOM:' + lowest_SOM);
        // console.log('highest_Profit:' + highest_Profit);
        // console.log('lowest_Profit:' + lowest_Profit);

        if(highest_SOM > lowest_SOM){
            a = 100 / (highest_SOM - lowest_SOM);
            b = 100 - (a * highest_SOM);
        } else {
            a = 0;
            b = 50;
        }        

        if (highest_Profit > lowest_Profit){
            c = 100 / (highest_Profit - lowest_Profit);
            d = 100 - (c * highest_Profit);
        } else {
            c = 0;
            d = 50;            
        }

        scores.forEach(function(companyScore){
            companyScore.scaledSOM = a * companyScore.scaledSOM + b;
            if(companyScore.scaledSOM < 0){ companyScore.scaledSOM = 0; }

            companyScore.scaledProfit = c * companyScore.scaledProfit + d;
            if(companyScore.scaledProfit < 0){ companyScore.scaledProfit = 0; }

            if(companyScore.originalBudget <= 100){
                companyScore.scaledBudget = 0;
            } else {
                companyScore.scaledBudget = 100 - companyScore.originalBudget;
            }

            companyScore.finalScore =  initialPeriodResult.p_Market.m_fs_DeltaSOM_Weight * companyScore.scaledSOM + initialPeriodResult.p_Market.m_fs_Profits_Weight * companyScore.scaledProfit;
            //a = 1 + initialPeriodResult.p_Market.m_fs_BudgetExcess_ScalingFactor * companyScore.scaledBudget / 100;
            companyScore.finalScore = companyScore.finalScore + 2 * companyScore.scaledBudget;          
        });

        res.send(200, { period : period, seminarId : seminarId, scores : scores } );

    }).fail(function(err){
        res.send(403, err.message);
    }).done();
    
}


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