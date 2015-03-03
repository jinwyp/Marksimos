var questionnaireModel = require('../models/questionnaire.js');
var seminarModel = require('../models/marksimos/seminar.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');
var Q = require('q');
util = require('util');


exports.getQuestionnaire = function(req, res, next) {
    var seminarId = req.gameMarksimos.currentStudentSeminar.seminarId;
    var email = req.gameMarksimos.currentStudent.email;

    if (!seminarId) {
        return res.status(400).send( {
            message: "You don't choose a seminar."
        });
    }

    if (!email) {
        return res.status(400).send( {
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
                return res.send({
                    "seminarId": seminarId.toString(),
                    "q_FeelAboutMarkSimos": "",
                    "q_ReasonForRecommendOrNot": "",
                    "q_WillRecommend": true,
                    "q_MostBenefit": 1,
                    "q_TeachingSupport": [5, 5],
                    "q_Interpreter": 5,
                    "q_Product": [5, 5, 5, 5],
                    "q_TeachingTeam": [5, 5, 5],
                    "q_OverallSatisfactionWithTheProgram": [5, 5, 5, 5, 5, 5]
                })
            }
        })
        .fail(function(err) {
            if (err.httpStatus) {
                return res.status(400).send({
                    message: err.message
                });
            }
            res.status(500).send( {
                message: "get questionnaire failed."
            })
        })
        .done();
};

exports.submitQuestionnaire = function(req, res, next) {

    var seminarId = req.gameMarksimos.currentStudentSeminar.seminarId;
    var email = req.gameMarksimos.currentStudent.email;

    var questionnaire = req.body.questionnaire;
    var errorMsg = "";

    //客户端提交的变量验证 
    //q_OverallSatisfactionWithTheProgram   
    req.checkBody(['questionnaire', 'q_OverallSatisfactionWithTheProgram'], 'Ivalid q_OverallSatisfactionWithTheProgram.').isArrayLen(6).eachEqualInt().eachBetween(1, 5);

    //q_TeachingTeam    
    req.checkBody(['questionnaire', 'q_TeachingTeam', ], 'Ivalid q_TeachingTeam.').isArrayLen(3).eachEqualInt().eachBetween(1, 5);

    //q_Product   
    req.checkBody(['questionnaire', 'q_Product', ], 'Ivalid q_Product.').isArrayLen(4).eachEqualInt().eachBetween(1, 5);

    //q_Product   
    req.checkBody(['questionnaire', 'q_Interpreter', ], 'Ivalid q_Interpreter.').isInt().between(1,5);

    //q_TeachingSupport    
    req.checkBody(['questionnaire', 'q_TeachingSupport', ], 'Ivalid q_TeachingSupport.').isArrayLen(2).eachEqualInt().eachBetween(1, 5);
  

    //q_TeachingSupport    
    req.checkBody(['questionnaire', 'q_MostBenefit', ], 'Ivalid q_MostBenefit.').isInt().between(1, 3);



    var errors = req.validationErrors() || errorMsg;
    if (errors) {
        return res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    }
 
    questionnaireModel.query.update({ seminarId: seminarId, email: email }, questionnaire, { upsert: true },
        function(err, numAffected) {
            if (err) {
                var message = Array.isArray(err)
                res.status(400).send( message);
            } else {
                res.status(200).send({ message: 'Update success.' });
            }
        });
};


exports.getQuestionnaireListForAdmin = function(req, res, next) {
    //去除非法的seminarId
    var seminarId = +req.params.seminarId || 0;

    //查询数据库
    Q.all([
        seminarModel.query.findOne({ seminarId: seminarId }).select({ 'companies': true, 'companyAssignment': true }).exec(),
        questionnaireModel.query.find({ seminarId: seminarId }).exec()
    ]).spread(function(seminarResult, questionnaireResult) {
        if (seminarResult) {
            var result = [];
            var questionDic = {};

            //生成字典
            questionnaireResult.forEach(function(question) {
                questionDic[question.email] = question;
            });

            //拼接数据      
            seminarResult.companyAssignment.forEach(function(company, index) {
                var studentList = [];

                (company.studentList || []).forEach(function(email) {
                    studentList.push({
                        email: email,
                        questionnaire: questionDic[email]
                    });
                });

                result[index].studentList = studentList ;
                result[index].companyName = company.companyName ;
                result[index].companyId = company.companyId ;
            });
            //返回成功的数据
            res.status(200).send(result);

        }else {
            //未得到seminar，则很有可能是输入的seminarId无效
            res.status(400).send( { message: "Invalid seminarId." });
        }
    }, function(err) {
        //如果有异常，记录异常
        logger.error(err);
        //传递异常到异常处理代码
        next(err);
    }).done();
};
