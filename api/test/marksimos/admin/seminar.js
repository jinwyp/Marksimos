/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({ jar: true });
var adminApiPath = "http://localhost:3000/marksimos/api/admin/";
var utility = require('../../testUtility.js');
var Q = require('q');

describe("admin api 测试", function() {

    beforeEach(function(done) {
        var account = {
            email: "hcd_facilitator@hcdlearning.com",
            password: "hcdfacilitator@9876"
        };
        request.post(adminApiPath + "login", { form: account }, function(err, res, body) {
            if (/^[A-Za-z0-9]+$/.test(body.userId)) {
                done();
            }
        });
    });

    it("创建新的seminar(非法参数)", function(done) {
        var seminarInfo = {
            city: "shanghai",
            company_num: 0,//非法参数
            country: "China",
            description: utility.dateFormat("yyyy-MM-dd") + "-" + utility.randomInt(),
            simulation_span: 4,
            state: "shanghai",
            venue: utility.dateFormat("yyyy-MM-dd")
        };
        request.post(adminApiPath + "seminar", { form: seminarInfo }, function(err, res, body) {
            var seminarNew = eval("(" + body + ")");
            expect(seminarNew.message).toMatch(/^Invalid.+$/);
            done();
        });
    });

    it("创建新的seminar,并分配学生到seminar", function(done) {
        var seminarInfo = {
            city: "shanghai",
            company_num: 4,
            country: "China",
            description: utility.dateFormat("yyyy-MM-dd") + "-" + utility.randomInt(),
            simulation_span: 4,
            state: "shanghai",
            venue: utility.dateFormat("yyyy-MM-dd")
        };

        Q.nfcall(request.post, adminApiPath + "seminar", { form: seminarInfo }).then(function(value) {
            var seminar = eval("(" + value[1] + ")");
            expect(seminar.seminarId).toMatch(/^\d+$/);

            var studentInfoList = [
                {
                    company_id: 1,
                    email: "anilraparla@hcdlearning.com",
                    seminar_id: seminar.seminarId
                },
                {
                    company_id: 2,
                    email: "haosun@hcdlearning.com",
                    seminar_id: seminar.seminarId
                },
                {
                    company_id: 3,
                    email: "jinwang@hcdlearning.com",
                    seminar_id: seminar.seminarId
                },
                {
                    company_id: 4,
                    email: "yunsun@hcdlearning.com",
                    seminar_id: seminar.seminarId
                }];
            return studentInfoList;
        }).then(function(studentInfoList) {          
            return Q.all([
                Q.nfcall(request.post, adminApiPath + "assign_student_to_seminar", { form: studentInfoList[0] }),
                Q.nfcall(request.post, adminApiPath + "assign_student_to_seminar", { form: studentInfoList[1] }),
                Q.nfcall(request.post, adminApiPath + "assign_student_to_seminar", { form: studentInfoList[2] }),
                Q.nfcall(request.post, adminApiPath + "assign_student_to_seminar", { form: studentInfoList[3] })
            ]);
        }).spread(function(res1, res2, res3, res4) {           
            expect(res1[1]).toMatch(/.+success.+/);
            expect(res2[1]).toMatch(/.+success.+/);
            expect(res3[1]).toMatch(/.+success.+/);
            expect(res4[1]).toMatch(/.+success.+/);
        }).fail(function(err) {
            expect(err).toBe(null);
        }).done(done);
    });
});

