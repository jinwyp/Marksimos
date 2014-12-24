var request = require('request').defaults({ jar: true });
var studentApiPath = "http://localhost:3000/marksimos/api/";
var utility = require('../../testUtility.js');
var Q = require('q');
describe("Student API  Questionnaire", function () {
    var studentList = [
        {
            email : 'anilraparla@hcdlearning.com',
            password : '123456'
        },
        {
            email : 'haosun@hcdlearning.com',
            password : '123456'
        }, {
            email : 'jinwang@hcdlearning.com',
            password : '123456'
        }, 
        {
            email : 'yunsun@hcdlearning.com',
            password : '123456'
        }
    ];
    var semanerId = '10051';
    
    var questionnaireList = [
        //有效的
        {                
            "q_FeelAboutMarkSimos": "", 
            "q_ReasonForRecommendOrNot": "", 
            "q_WillRecommend": true, 
            "q_MostBenefit": 1, 
            "q_TeachingSupport": [5, 5], 
            "q_Interpreter": 5, 
            "q_Product": [5, 5, 5, 5], 
            "q_TeachingTeam": [5, 5, 5], 
            "q_OverallSatisfactionWithTheProgram": [5, 5, 5, 5, 5, 5]
        },
        //无效的数据
        {   
            "q_FeelAboutMarkSimos": "", 
            "q_ReasonForRecommendOrNot": "", 
            "q_WillRecommend": true, 
            "q_MostBenefit": 1, 
            "q_TeachingSupport": [5, 6], //不能为6
            "q_Interpreter": 5, 
            "q_Product": [5, 5, 5, 5], 
            "q_TeachingTeam": [5, 5, 5], 
            "q_OverallSatisfactionWithTheProgram": [5, 5, 5, 5, 5, 5]
        }
    ];

    beforeEach(function (done) {
        request.post(studentApiPath + "login", { json: studentList[2] }, function (err, response, body) {            
            if (/^[A-Za-z0-9]+$/.test(body.userId) || response.statusCode === 200) {                
                request.get(studentApiPath + "choose_seminar?seminar_id="+ semanerId, { qs: { seminar_id: semanerId } }, function (err, response, body) {
                    if (!err && response.statusCode == 200) {
                        done();
                    }
                });
            }
        });

    });
    

    it("Submit Questionnaire", function (done) {
        Q.nfcall(request.put, studentApiPath + "questionnaire", { json: { questionnaire: questionnaireList[0] } }).then(function (value) {
            expect(value[1].message).toBe("Update success.");
        }).fail(function (err) {
            expect(err).toBe(undefined);
        }).done(done);
    });
    

    it("Submit Questionnaire-Invalid Email", function (done) {
        Q.nfcall(request.put, studentApiPath + "questionnaire", { json: { questionnaire: questionnaireList[1] } }).then(function (value) {
            expect(value[1]).toMatch(/.+validation errors.+q_TeachingSupport.+/);
            expect(value[0].statusCode).toBe(400);
        }).fail(function (err) {
            expect(err).toBe(undefined);
        }).done(done);
    });

   

});
