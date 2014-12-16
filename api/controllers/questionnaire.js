var questionnaireModel = require('../models/questionnaire.js');
var seminarModel = require('../models/seminar.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');
var Q = require('q');
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

exports.submitQuestionnaire = function(req,res,next){
    var seminarId = req.session.seminarId;
    var email = req.session.email;
    var questionnaire = req.body.questionnaire;
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


    if (!questionnaire) {
        return res.send(400, {
            message: 'Invalid questionnaire'
        });
    }

    questionnaireModel.update(seminarId, email, questionnaire)
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

exports.getQuestionnaireList = function(req, res, next) {
    //去除非法的seminarId
    var seminarId = +req.params.seminarId || 0;

    //查询数据库
    Q.all([
        seminarModel.query.findOne({ seminarId: seminarId }).select({ 'companies': true, 'companyAssignment': true }).exec(),
        questionnaireModel.query.find({ seminarId: seminarId }).exec()
    ]).spread(function(seminarResult, questionnaireResult) {
        if (seminarResult) {

            //处理结果，使之类似['A','B','C'......]
            var companyNameList = [], studentList = [], questionnaire = {};
            seminarResult.companies.forEach(function(companyInfo) {
                companyNameList.push(companyInfo.companyName);
            });

            //处理结果，使之类似[{companyName:'A',email:'s1@A.com'},......]
            seminarResult.companyAssignment.forEach(function(listStudent, index) {
                listStudent.forEach(function(student) {
                    studentList.push({ companyName: companyNameList[index], email: student });
                });
            });
            //处理结果，使之类似{'s1@A.com':{...},...}
            questionnaireResult.forEach(function(question) {
                questionnaire[question.email] = question;
            });
            //返回成功的数据
            res.send(200, { companyList: companyNameList, studentList: studentList, questionnaire: questionnaire });
        }
        else {
            //未得到seminar，则很有可能是输入的seminarId无效
            res.send(400, { message: "Invalid seminarId." });
        }
    }, function(err) {
        //如果有异常，记录异常
        logger.error(err);
        res.send(500, { message: "get questionnaire list failed." });
    }).done();
};