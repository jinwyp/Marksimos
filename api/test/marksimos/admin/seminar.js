/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({jar: true});
var adminApiPath = "http://localhost:3000/marksimos/api/admin/";
var utility = require('../../testUtility.js');
function adminLogin(done) {
    var account = {
        email: "hcd_facilitator@hcdlearning.com",
        password: "hcdfacilitator@9876"
    };
    request.post(adminApiPath + "login", { form: account }, function(err, res, body) {      
        if (/^[A-Za-z0-9]+$/.test(body.userId)) {
            done();
        }
    });
}


describe("admin api 测试", function() {
    
    beforeEach(function(done) {
        adminLogin(done);
    });

    it("创建新的seminar", function(done) {
        var seminarInfo = {
            city: "shanghai",
            company_num: 3,
            country: "China",
            description: utility.dateFormat("yyyy-MM-dd") + "-" + utility.randomInt(),
            simulation_span: 4,
            state: "shanghai",
            venue: utility.dateFormat("yyyy-MM-dd")
        };
        request.post(adminApiPath + "seminar", { form: seminarInfo }, function(err, res, body) {
            var seminarNew = eval("(" + body + ")");
            expect(seminarNew.seminarId).toMatch(/^\d+$/);
            done();
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
  
    it("分配学生测试", function(done) {
        var data = {
            company_id: 1,
            email: "yunsun@hcdlearning.com",
            seminar_id: "10037"
        };
    });
});

