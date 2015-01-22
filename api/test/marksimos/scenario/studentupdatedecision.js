/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({ jar: true });
var studentApiPath = "http://localhost:3000/marksimos/api/";
var adminApiPath = "http://localhost:3000/marksimos/api/admin/";
var utility = require('../../testUtility.js');
var Q = require('q');

var data = require('../fakedata.js');


var semanerId = '10069';



var originalTimeout;
var newTimeout = 10000;




describe("Student API Submit Decisions : ", function() {

    beforeEach(function(done) {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = newTimeout;

        var student = studentList[0];
        request.post(studentApiPath + "login", { json: student }, function(err, response, body) {

            if (/^[A-Za-z0-9]+$/.test(body.userId) || response.statusCode === 200) {

                request.get(studentApiPath + "choose_seminar?seminar_id=10051", { qs: {seminar_id:semanerId} }, function(err, response, body) {
                    if (!err && response.statusCode == 200) {
                        done();
                    }

                });

            }
        });
    });



    it("Submit One Periods For Company, Brand and SKU Decisions", function(done) {

        var deferred = Q.defer();

        var resultPromiseP1 = [];
        var resultPromiseP2 = [];
        var resultPromiseP3 = [];
        var resultPromiseP4 = [];

        function runSeminarAsync(runseminarId) {
            request.post(adminApiPath + "seminar/" + runseminarId + "/runsimulation", {}, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }


        function companyAsync(company) {
            request.put(studentApiPath + "company/decision", { json: company }, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }

        function brandAsync(brand) {
            request.put(studentApiPath + "brand/decision", { json: brand }, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }

        function skuAsync(sku) {
            request.put(studentApiPath + "sku/decision", { json: sku }, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }


        function runOneRound(company){

            var companyModify = {
                companyId : company.d_CID,
                company_data : {
                    //"d_InvestmentInServicing": company.d_InvestmentInServicing,
                    "d_InvestmentInTechnology": company.d_InvestmentInTechnology,
                    "d_InvestmentInEfficiency": company.d_InvestmentInEfficiency,
                    "d_RequestedAdditionalBudget": company.d_RequestedAdditionalBudget,
                    "d_IsAdditionalBudgetAccepted": company.d_IsAdditionalBudgetAccepted
                }
            };
            resultPromiseP1.push(companyAsync(companyModify));


            company.brandDecisions.forEach(function(brand){

                var brandModify = {
                    companyId : brand.d_CID,
                    brand_id : brand.d_BrandID,
                    brand_data : {
                        d_SalesForce : brand.d_SalesForce
                    }
                };
                resultPromiseP1.push(brandAsync(brandModify));


                brand.SKUDecisions.forEach(function(sku){

                    var skuModify = {
                        companyId : sku.d_CID,
                        brand_id : sku.d_BrandID,
                        sku_id : sku.d_SKUID,
                        sku_data  : {
                            "d_WholesalesBonusRate"      : sku.d_WholesalesBonusRate,
                            "d_WholesalesBonusMinVolume" : sku.d_WholesalesBonusMinVolume,
                            "d_TradeExpenses"            : sku.d_TradeExpenses,
                            "d_ToDrop"                   : sku.d_ToDrop,
                            "d_Technology"               : sku.d_Technology,
                            "d_TargetConsumerSegment"    : sku.d_TargetConsumerSegment,
                            "d_PromotionalEpisodes"      : sku.d_PromotionalEpisodes,
                            "d_PromotionalBudget"        : sku.d_PromotionalBudget,
                            "d_ProductionVolume"         : sku.d_ProductionVolume,
                            //"d_PackSize"                 : sku.d_PackSize,
                            "d_IngredientsQuality"       : sku.d_IngredientsQuality,
                            "d_RepriceFactoryStocks"     : sku.d_RepriceFactoryStocks,
                            //"d_ConsumerPrice"            : sku.d_ConsumerPrice,
                            "d_FactoryPrice"             : sku.d_FactoryPrice,
                            "d_AdditionalTradeMargin"    : sku.d_AdditionalTradeMargin,
                            "d_Advertising"              : sku.d_Advertising
                        },
                        sku_data : {}

                    };

                    resultPromiseP1.push(skuAsync(skuModify));
                })


            });

        }

        period1.forEach(runOneRound);


        Q.all(resultPromiseP1).spread(function(){
            for (var i=0; i<arguments.length; i++){
                expect(arguments[i].statusCode).toBe(200);
            }

            return runSeminarAsync(runseminarId)

        }).then(function(value){
            expect(value[0].statusCode).toBe(200);
        }).done(done);


    });



    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});











