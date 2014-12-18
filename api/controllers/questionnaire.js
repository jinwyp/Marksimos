var questionnaireModel = require('../models/questionnaire.js');
var seminarModel = require('../models/seminar.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');
var Q = require('q');
util = require('util');
exports.getQuestionnaire = function(req, res, next) {
    var seminarId = req.session.seminarId;
    var email = req.session.email;

    if (!seminarId) {
        return res.send(400, {
            message: "You don't choose a seminar."
        });
    }

    if (!email) {
        return res.send(400, {
            message: "Invalid email."
        });
    }

    var questionnaire = {
        seminarId: seminarId,
        email: email
    };

    questionnaireModel.findOne(seminarId, email)
        .then(function(result) {
            if (result) {
                return res.send(result);
            } else {
                return questionnaireModel.insert(questionnaire).then(function(result) {
                    if (!result) {
                        throw {
                            message: "failed to save questionnaire to db."
                        }
                    }
                    res.send(result);
                })
            }
        })
        .fail(function(err) {
            if (err.httpStatus) {
                return res.send(err.httpStatus, {
                    message: err.message
                });
            }
            res.send(500, {
                message: "get questionnaire failed."
            })
        })
        .done();
};

exports.updateQuestionnaire = function(req, res, next) {
    var seminarId = req.session.seminarId;
    var email = req.session.email;
    var location = req.body.location;
    var data = req.body.data;

    if (!seminarId) {
        return res.send(400, {
            message: "You don't choose a seminar."
        });
    }

    if (!email) {
        return res.send(400, {
            message: "Invalid email."
        });
    }

    if (!location) {
        return res.send(400, {
            message: 'Invalid Locatin.'
        });
    }

    if (!data) {
        return res.send(400, {
            message: 'Invalid data'
        });
    }

    var temQuestionnaire = {};
    temQuestionnaire[location] = data;
    // if(location=="q_WillRecommend"){
    //     temQuestionnaire.q_ReasonForRecommendOrNot="";
    // }
    questionnaireModel.update(seminarId, email, temQuestionnaire)
        .then(function(result) {
            res.send({
                message: 'update success.'
            });
        })
        .fail(function(err) {
            var message = JSON.stringify(err, ['message', 'lower', 'upper', 'modifiedField'], 2);
            res.send(403, message);
        })
        .done();

}

exports.submitQuestionnaire = function(req, res, next) {

   
    var seminarId = req.session.seminarId;
    var email = req.session.email;
    var questionnaire = req.body.questionnaire;
    var errorMsg = "";
    //服务器端变量不存在则要重新登录
    if (!seminarId || !email) {
        errorMsg = "Please re login.";
    }

    //客户端提交的变量验证 
    //q_OverallSatisfactionWithTheProgram   
    req.checkBody(['questionnaire', 'q_OverallSatisfactionWithTheProgram'], 'Ivalid q_OverallSatisfactionWithTheProgram.').isArrayLen(6).eachInt().eachBetween(1, 5);

    //q_TeachingTeam    
    req.checkBody(['questionnaire', 'q_TeachingTeam', ], 'Ivalid q_TeachingTeam.').isArrayLen(3).eachInt().eachBetween(1, 5);

    //q_Product   
    req.checkBody(['questionnaire', 'q_Product', ], 'Ivalid q_Product.').isArrayLen(4).eachInt().eachBetween(1, 5);

    //q_Product   
    req.checkBody(['questionnaire', 'q_Interpreter', ], 'Ivalid q_Interpreter.').isInt().between(1,5);

    //q_TeachingSupport    
    req.checkBody(['questionnaire', 'q_TeachingSupport', ], 'Ivalid q_TeachingSupport.').isArrayLen(2).eachInt().eachBetween(1, 5);
  

    //q_TeachingSupport    
    req.checkBody(['questionnaire', 'q_MostBenefit', ], 'Ivalid q_MostBenefit.').isInt().between(1, 3);



    var errors = req.validationErrors() || errorMsg;
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
        return;
    }
 
    questionnaireModel.query.update(
        { seminarId: seminarId, email: email },
        questionnaire,
        { upsert: true },
        function(err, numAffected) {
            if (err) {
                var message = Array.isArray(err)
                res.send(403, message);
            } else {
                res.send({
                    message: 'Update success.'
                });
            }
        });
}

exports.getQuestionnaireList = function(req, res, next) {
    //去除非法的seminarId
    var seminarId = +req.params.seminarId || 0;

    //查询数据库
    Q.all([
        seminarModel.query.findOne({ seminarId: seminarId }).select({ 'companies': true, 'companyAssignment': true }).exec(),
        questionnaireModel.query.find({ seminarId: seminarId }).exec()
    ]).spread(function(seminarResult, questionnaireResult) {
        if (seminarResult) {
            var result = seminarResult.companies, questionDic = {};
            //生成字典
            questionnaireResult.forEach(function(question) {
                questionDic[question.email] = question;
            });
            //拼接数据      
            seminarResult.companyAssignment.forEach(function(company, index) {
                var studentList = [];               
                company.studentList.forEach(function(email) {
                    studentList.push({ email: email, questionnaire: questionDic[email] })
                });               
                result[index].studentList = studentList;
            });
            //返回成功的数据
            res.send(200, result);
        }
        else {
            //未得到seminar，则很有可能是输入的seminarId无效
            res.send(400, { message: "Invalid seminarId." });
        }
    }, function(err) {
        //如果有异常，记录异常
        logger.error(err);
        //传递异常到异常处理代码
        next(err);
    }).done();
};