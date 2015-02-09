var request = require('request').defaults({ jar: true });
var studentApiPath = "http://localhost:3000/marksimos/api/";
var utility = require('../../testUtility.js');
var Q = require('q');



var data = require('../fakedata.js');

var student = data.studentList[0];
var seminarId ;



if(gulpArguments.sid > 10000) {
    seminarId = gulpArguments.sid;

    describe("Student API  Questionnaire", function () {

        var questionnaireList = [
            //有效的
            {
                "q_FeelAboutMarkSimos"                : "",
                "q_ReasonForRecommendOrNot"           : "",
                "q_WillRecommend"                     : true,
                "q_MostBenefit"                       : 1,
                "q_TeachingSupport"                   : [5, 5],
                "q_Interpreter"                       : 5,
                "q_Product"                           : [5, 5, 5, 5],
                "q_TeachingTeam"                      : [5, 5, 5],
                "q_OverallSatisfactionWithTheProgram" : [5, 5, 5, 5, 5, 5]
            },
            //无效的数据
            {
                "q_FeelAboutMarkSimos"                : "",
                "q_ReasonForRecommendOrNot"           : "",
                "q_WillRecommend"                     : true,
                "q_MostBenefit"                       : 1,
                "q_TeachingSupport"                   : [5, 6], //不能为6
                "q_Interpreter"                       : 5,
                "q_Product"                           : [5, 5, 5, 5],
                "q_TeachingTeam"                      : [5, 5, 5],
                "q_OverallSatisfactionWithTheProgram" : [5, 5, 5, 5, 5, 5]
            }
        ];

        beforeEach(function (done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

            request.post(studentApiPath + "login", {json : student}, function (err, response, body) {
                if (/^[A-Za-z0-9]+$/.test(body.userId) || response.statusCode === 200) {
                    request.get(studentApiPath + "choose_seminar?seminar_id=" + seminarId, {qs : {seminar_id : seminarId}}, function (err, response, body) {
                        if (!err && response.statusCode == 200) {
                            done();
                        }
                    });
                }
            });

        });

        it("Submit Questionnaire-Invalid Email", function (done) {
            Q.nfcall(request.put, studentApiPath + "questionnaire", {json : {questionnaire : questionnaireList[1]}}).then(function (value) {
                expect(value[1]).toMatch(/.+validation errors.+q_TeachingSupport.+/);
                expect(value[0].statusCode).toBe(400);
            }).fail(function (err) {
                expect(err).toBe(undefined);
            }).done(done);
        });

        it("Submit Questionnaire Success", function (done) {
            Q.nfcall(request.put, studentApiPath + "questionnaire", {json : {questionnaire : questionnaireList[0]}}).then(function (value) {
                expect(value[1].message).toBe("Update success.");
            }).fail(function (err) {
                expect(err).toBe(undefined);
            }).done(done);
        });


    });


}