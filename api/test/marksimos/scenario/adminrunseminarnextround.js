/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({ jar: true });
var adminApiPath = "http://localhost:3000/marksimos/api/admin/";
var utility = require('../../testUtility.js');
var Q = require('q');

var data = require('../fakedata.js');
var admin = data.adminList[0];
var seminarId = data.seminarId;

var originalTimeout;
var newTimeout = 10000;



describe("Admin API Run Seminar Next Round", function() {

    beforeEach(function(done) {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = newTimeout;

        request.post(adminApiPath + "login", { form: admin }, function(err, res, body) {
            if (/^[A-Za-z0-9]+$/.test(body.userId) || response.statusCode === 200) {
                done();
            }
        });
    });


    it("运行下一回合决策", function(done) {

        var deferred = Q.defer();

        function runSeminarAsync(runseminarId) {
            request.post(adminApiPath + "seminar/" + runseminarId + "/runsimulation", {form:{goingToNewPeriod : true, decisionsOverwriteSwitchers:[]}}  , function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }


        runSeminarAsync(seminarId).then(function(response){
            expect(response.statusCode).toBe(200);

        }).fail(function (err) {
            console.log(err);
        }).done(done);

    });



    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});




