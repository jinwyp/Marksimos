/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({ jar: true });
var adminApiPath = "http://localhost:3000/marksimos/api/admin/";
var utility = require('../../testUtility.js');
var Q = require('q');

var data = require('../fakedata.js');
var admin = data.admin[0];
var distributor = data.distributor[0];
var facilitator = data.facilitator[0];

var studentInfoList = data.createSeminarStudentList;

var originalTimeout;


describe("Admin API Create Distributor and Facilitator and Student", function() {

    beforeEach(function(done) {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        request.post(adminApiPath + "login", { form: admin }, function(err, res, body) {
            if (/^[A-Za-z0-9]+$/.test(body.userId)) {
                done();
            }
        });
    });

    it("创建 New Distributor (非法数据)", function(done) {
        var newDistributor = {

            username: "distributor1",
            password: "123456",
            email: "distributor1@163.com",

            mobilePhone: "",
            idcardNumber: "",

            country: "China",
            state: "shanghai",
            city: "shanghai",

            num_of_license_granted: 100


        };
        request.post(adminApiPath + "distributor", { json: newDistributor }, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });


    it("创建 New Distributor (正常数据)", function(done) {
        var newDistributor = {

            username: "distributor1",
            password: "123456",
            email: "distributor1@163.com",

            mobilePhone: "12345678901",
            idcardNumber: "",

            country: "China",
            state: "shanghai",
            city: "shanghai",

            num_of_license_granted: 100


        };


        Q.nfcall(request.post, adminApiPath + "distributor", { json: newDistributor }).then(function(value) {

            expect(value[1].role).toBe(2);

            return ;

        }).fail(function(err) {
            console.log(err);
        }).done(done);
    });
});




