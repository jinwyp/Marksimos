var reportModel      = require('../../models/marksimos/report.js');
var logger           = require('../../../common/logger.js');
var simulationResult = require('../../models/marksimos/simulationResult.js');
var seminarModel     = require('../../models/marksimos/seminar.js');
var userRoleModel    = require('../../models/user/userrole.js');

var teamScoreModel = require('../../models/b2c/teamscore.js');

var Q                = require('q');
var _                = require('underscore');






exports.getStudentFinalScore = function(req, res, next) {

    var seminarId = req.gameMarksimos.currentStudentSeminar.seminarId;



    if(req.user.role !== userRoleModel.roleList.student.id){
        seminarId = +req.params.seminarId;
    }

    if (!seminarId) {
        return res.send(400, { message: "You don't choose a seminar." });
    }


    var tempRoundTime = {};
    var seminarData = {};


    seminarModel.findOneQ({seminarId: seminarId}).then(function(resultSeminar) {
        if (!resultSeminar) {
            throw new Error("Cancel promise chains. seminar not found.");
        }

        seminarData = resultSeminar;
        
        return getFinalScore(seminarId);
    })
    .then(function(result) {
        //成功操作
        //获取并处理分数

        // 处理每个小组的提交锁定决策的时间
        if(seminarData.roundTime.length > 0){

            seminarData.roundTime.forEach(function(period){
                tempRoundTime['p' + period.period] = {};

                period.lockDecisionTime.forEach(function(company){

                    var time = {
                        days : 0,
                        leftDays : 0,
                        hours : 0,
                        leftHours : 0,
                        minutes : 0,
                        leftMinutes : 0,
                        seconds : 0
                    };


                    time.days = Math.floor(company.spendHour/(24*3600*1000));

                    //计算出小时数
                    time.leftDays = company.spendHour % (24*3600*1000);   //计算天数后剩余的毫秒数
                    time.hours = Math.floor(time.leftDays / (3600*1000) );

                    //计算相差分钟数
                    time.leftHours = time.leftDays % (3600*1000);        //计算小时数后剩余的毫秒数
                    time.minutes = Math.floor(time.leftHours / (60*1000));

                    //计算相差秒数
                    time.leftMinutes = time.leftHours % (60*1000);      //计算分钟数后剩余的毫秒数
                    time.seconds = Math.round(time.leftMinutes/1000);


                    tempRoundTime['p' + period.period]['c' + company.companyId] = {
                        lockStatus : company.lockStatus,
                        spendHour : company.spendHour || 0,
                        lockTime : company.lockTime || 0,
                        startTime : period.startTime,
                        hours : time.hours || 0,
                        minutes : time.minutes || 0,
                        seconds : time.seconds || 0
                    };

                });

            });


            result.scoreData.forEach(function(period, pindex){
                // 排除 起始的-3 -2 -1 0 阶段
                if(period.period > 0){
                    period.scores.forEach(function(score, sindex){

                        score.lockStatus = tempRoundTime['p'+ period.period]['c' + score.companyId].lockStatus;
                        score.spendHour = tempRoundTime['p'+ period.period]['c' + score.companyId].spendHour;
                        score.lockTime = tempRoundTime['p'+ period.period]['c' + score.companyId].lockTime;
                        score.startTime = tempRoundTime['p'+ period.period]['c' + score.companyId].startTime;
                        score.hours = tempRoundTime['p'+ period.period]['c' + score.companyId].hours;
                        score.minutes = tempRoundTime['p'+ period.period]['c' + score.companyId].minutes;
                        score.seconds = tempRoundTime['p'+ period.period]['c' + score.companyId].seconds;

                    });
                }

            });

        }



        // 保存比赛结果到teamScoreModel 里面
        if(seminarData.isSimulationFinished === true){
            var finalScoreList = _.sortBy(result.scoreData[result.scoreData.length - 1].scores, 'finalScore').reverse();
            var teamScoreList = [];


            finalScoreList.forEach(function(score, sindex){
                score.ranking = sindex + 1;

                seminarData.companyAssignment.forEach(function(company){
                    if(company.companyId === score.companyId){
                        if(company.teamList.length > 0){
                            score.teamid = company.teamList[0];
                        }
                    }
                });


                var companyScore = {
                    ranking : score.ranking,
                    marksimosScore : score.finalScore,
                    timeCost : score.spendHour,
                    marksimosSeminar : seminarData._id
                    //student : '',
                };

                if(score.teamid){
                    companyScore.team = score.teamid;
                }

                if(seminarData.belongToCampaign){
                    companyScore.campaign = seminarData.belongToCampaign;
                }

                if(score.lockStatus){
                    companyScore.timeCostStatus = 1;
                }else{
                    companyScore.timeCostStatus = 0;
                }

                teamScoreList.push(companyScore);

            });


            teamScoreModel.findQ({marksimosSeminar:seminarData._id}).then(function(results){

                if(results.length === 0){
                    teamScoreModel.createQ(teamScoreList);
                }

            }).fail(next).done();


        }


        if(req.user.role === userRoleModel.roleList.student.id){
            if (result.showLastPeriodScore) {
                //如果显示最后一阶段的分数，则正常输出
                return res.status(200).send(result.scoreData);
            } else {
                //如果不显示最后一阶段的分数，则数据length-1,原数据为排过序的数据
                if (result.scoreData && result.scoreData.length > 1) {
                    return res.status(200).send( result.scoreData.slice(0, result.scoreData.length - 1));
                }else {
                    return res.status(200).send( result.scoreData);
                }
            }
        }else{
            return res.status(200).send(result.scoreData);
        }


    }).fail(next).done();

};




exports.getReport = function(req, res, next){
    var seminarId = req.gameMarksimos.currentStudentSeminar.seminarId;

    if(req.user.role !== userRoleModel.roleList.student.id){
        seminarId = +req.query.seminarId;
    }

    if(!seminarId){
        return res.status(400).send( {message: "You don't choose a seminar."});
    }

    var companyId = +req.query.companyId;
    var reportName = req.params.report_name;

    if(!reportName){
        return res.status(400).send( {message: "Invalid parameter reportName."});
    }


    reportModel.findOne(seminarId, reportName)
    .then(function(report){
        if(report===null || report===undefined){
            return res.status(400).send( {message: "Report doesn't exist."})
        }

        if(req.user.role === userRoleModel.roleList.student.id && isReportNeedFilter(reportName)){
            return res.send(extractReportOfOneCompany(report, companyId));
        }

        res.send(report.reportData);
    })
    .fail(function(err){
        logger.error(err);
            res.status(500).send( {message: "fail to get report."});
    })
    .done();

};


function getFinalScore(seminarId) {

    return Q.all([
        simulationResult.findAll(seminarId),
        seminarModel.findOneQ({ seminarId: seminarId })
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
