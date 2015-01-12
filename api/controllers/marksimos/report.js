var reportModel      = require('../../models/marksimos/report.js');
var logger           = require('../../../common/logger.js');
var simulationResult = require('../../models/marksimos/simulationResult.js');
var seminarModel     = require('../../models/marksimos/seminar.js');
var userRoleModel = require('../../models/user/userrole.js');
var Q                = require('q');
var _                = require('underscore');




exports.getStudentFinalScore = function(req, res, next) {

    //得到seminarId,学生从session中获取
    var seminarId = +req.session.seminarId;

    if (!seminarId) {
        return res.send(400, { message: "You don't choose a seminar." });
    }else{
        //获取并处理分数
        getFinalScore(seminarId).then(function(result) {
            //成功操作
            if (result.showLastPeriodScore) {
                //如果显示最后一阶段的分数，则正常输出
                res.status(200).send(result.scoreData);
            } else {
                //如果不显示最后一阶段的分数，则数据length-1,原数据为排过序的数据
                if (result.scoreData && result.scoreData.length > 1) {
                    res.send(200, result.scoreData.slice(0, result.scoreData.length - 1));
                }
                else {
                    res.send(200, result.scoreData);
                }
            }

        }).fail(function(err){
            logger.error(err);
            next(err);
        }).done();
    }
};


exports.getAdminFinalScore = function(req, res, next) {

    //得到seminarId,老师由参数传入
    var seminarId = +req.params.seminarId;

    if (!seminarId) {
        return res.send(400, { message: "You don't choose a seminar." });
    }else{
        //获取并处理分数
        getFinalScore(seminarId).then(function(result) {
            //成功操作
            res.status(200).send(result.scoreData);
        }).fail(function(err){
            logger.error(err);
            next(err);
        }).done();
    }

};


exports.getReport = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    var companyId = +req.query.companyId;
    var reportName = req.params.report_name;

    if(!reportName){
        return res.send(400, {message: "Invalid parameter reportName."});
    }

    var userRole = req.session.userRole;

    reportModel.findOne(seminarId, reportName)
    .then(function(report){
        if(report===null || report===undefined){
            return res.send(400, {message: "Report doesn't exist."})
        }

        if(userRole === userRoleModel.role.student.id && isReportNeedFilter(reportName)){
            return res.send(extractReportOfOneCompany(report, companyId));
        }

        res.send(report.reportData);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "fail to get report."});
    })
    .done();

};


function getFinalScore(seminarId) {

    return Q.all([
        simulationResult.findAll(seminarId),
        seminarModel.findOne({ seminarId: seminarId })
    ]).spread(function(requestedPeriodResultArr, seminarInfo) {
        var resultArr = {
            scoreData: [],
            showLastPeriodScore: seminarInfo.showLastPeriodScore
        };

        var initialPeriodResult;
        requestedPeriodResultArr.forEach(function(requestedPeriodResult) {

            if (requestedPeriodResult.period == 0) {
                //原来作为比较的阶段0
                initialPeriodResult = requestedPeriodResult;
            }

            if (requestedPeriodResult.period >= 0) {
                var period = requestedPeriodResult.period;
                var scores = [];
                var highest_SOM, lowest_SOM, highest_Profit, lowest_Profit;
                var a, b, c, d;

                for (var i = 0; i < requestedPeriodResult.p_Companies.length; i++) {
                    var originalSOM, originalProfit, originalBudget;
                    var scaledSOM, scaledProfit, scaledBudget, finalScore;

                    originalSOM = 100 * (requestedPeriodResult.p_Companies[i].c_ValueSegmentShare[6] - initialPeriodResult.p_Companies[i].c_ValueSegmentShare[6]);
                    originalProfit = requestedPeriodResult.p_Companies[i].c_CumulatedNetResults;

                    originalBudget = (period / seminarInfo.simulationSpan) * requestedPeriodResult.p_Companies[i].c_TotalInvestmentBudget;

                    if (originalBudget > 0) {
                        originalBudget = 100 * requestedPeriodResult.p_Companies[i].c_CumulatedInvestments / originalBudget;
                    } else {
                        originalBudget = 0;
                    }
                    scores.push({
                        companyId: requestedPeriodResult.p_Companies[i].c_CompanyID,
                        originalSOM: originalSOM,
                        originalProfit: originalProfit,
                        originalBudget: originalBudget
                    });
                };

                highest_SOM = _.max(scores, function(companyScore) { return companyScore.originalSOM; }).originalSOM;
                lowest_SOM = _.min(scores, function(companyScore) { return companyScore.originalSOM; }).originalSOM;
                highest_Profit = _.max(scores, function(companyScore) { return companyScore.originalProfit; }).originalProfit;
                lowest_Profit = _.min(scores, function(companyScore) { return companyScore.originalProfit; }).originalProfit;

                a = highest_SOM - lowest_SOM;
                c = highest_Profit - lowest_Profit;

                scores.forEach(function(companyScore) {
                    if (lowest_SOM < 0) { companyScore.scaledSOM = companyScore.originalSOM + a; }
                    else { companyScore.scaledSOM = companyScore.originalSOM; }

                    if (lowest_Profit < 0) { companyScore.scaledProfit = companyScore.originalProfit + c; }
                    else { companyScore.scaledProfit = companyScore.originalProfit; }
                });



                if (lowest_SOM < 0) {
                    lowest_SOM = lowest_SOM + a;
                    highest_SOM = highest_SOM + a;
                }

                if (lowest_Profit < 0) {
                    lowest_Profit = lowest_Profit + c;
                    highest_Profit = highest_Profit + c;
                }

                if (highest_SOM > lowest_SOM) {
                    a = 100 / (highest_SOM - lowest_SOM);
                    b = 100 - (a * highest_SOM);
                } else {
                    a = 0;
                    b = 50;
                }

                if (highest_Profit > lowest_Profit) {
                    c = 100 / (highest_Profit - lowest_Profit);
                    d = 100 - (c * highest_Profit);
                } else {
                    c = 0;
                    d = 50;
                }

                scores.forEach(function(companyScore) {
                    companyScore.scaledSOM = a * companyScore.scaledSOM + b;
                    if (companyScore.scaledSOM < 0) { companyScore.scaledSOM = 0; }

                    companyScore.scaledProfit = c * companyScore.scaledProfit + d;
                    if (companyScore.scaledProfit < 0) { companyScore.scaledProfit = 0; }

                    if (companyScore.originalBudget <= 100) {
                        companyScore.scaledBudget = 0;
                    } else {
                        companyScore.scaledBudget = 100 - companyScore.originalBudget;
                    }

                    companyScore.finalScore = initialPeriodResult.p_Market.m_fs_DeltaSOM_Weight * companyScore.scaledSOM + initialPeriodResult.p_Market.m_fs_Profits_Weight * companyScore.scaledProfit;
                    companyScore.finalScore = companyScore.finalScore + 2 * companyScore.scaledBudget;
                });

                resultArr.scoreData.push({ period: period, seminarId: seminarId, scores: scores });
            }

        });

        return resultArr;
    });
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
