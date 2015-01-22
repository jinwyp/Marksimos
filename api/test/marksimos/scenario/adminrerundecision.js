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




describe("Admin API ReRun Decisions : ", function() {


    beforeEach(function(done) {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = newTimeout;

        var admin = adminList[0];
        request.post(adminApiPath + "login", { json: admin }, function(err, response, body) {

            if (/^[A-Za-z0-9]+$/.test(body.userId) || response.statusCode === 200) {
                done();

            }
        });
    });



    it("Submit One Periods For Company, Brand and SKU Decisions", function(done) {

        var deferred = Q.defer();

        var resultPromise = [];

        function companyAsync(company) {
            request.put(adminApiPath + "company/decision", { json: company }, function(err, response, body) {
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
            request.put(adminApiPath + "brand/decision", { json: brand }, function(err, response, body) {
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
            request.put(adminApiPath + "sku/decision", { json: sku }, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    deferred.resolve(response);
                }else{
                    console.log(body);
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }



        period2.forEach(function(company){

            var companyModify = {
                seminarId : semanerId,
                periodId : company.period,
                companyId : company.d_CID,
                company_data : {
                    //"d_InvestmentInServicing": company.d_InvestmentInServicing,
                    "d_InvestmentInTechnology": company.d_InvestmentInTechnology,
                    "d_InvestmentInEfficiency": company.d_InvestmentInEfficiency,
                    "d_RequestedAdditionalBudget": company.d_RequestedAdditionalBudget,
                    "d_IsAdditionalBudgetAccepted": company.d_IsAdditionalBudgetAccepted
                }
            };
            resultPromise.push(companyAsync(companyModify));


            company.brandDecisions.forEach(function(brand){

                var brandModify = {
                    seminarId : semanerId,
                    periodId : brand.period,
                    companyId : brand.d_CID,
                    brand_id : brand.d_BrandID,
                    brand_data : {
                        d_SalesForce : brand.d_SalesForce
                    }
                };
                resultPromise.push(brandAsync(brandModify));


                brand.SKUDecisions.forEach(function(sku){

                    var skuModify = {
                        seminarId : semanerId,
                        periodId : sku.period,
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
                    //for (var property in skuModify.sku_post) {
                    //    if ( typeof (skuModify.sku_post[property]) == "function") {
                    //        //obj[p]();
                    //    } else {
                    //
                    //        var temp ;
                    //        //temp[property]= skuModify.sku_post[property]
                    //        // property 为属性名称，obj[p]为对应属性的值
                    //        skuModify.sku_data = temp;
                    //    }
                    //
                    //    resultPromise.push(skuAsync(skuModify));
                    //}

                    //console.log("--------:::", skuModify);
                    resultPromise.push(skuAsync(skuModify));
                })


            });





        });



        Q.all(resultPromise).spread(function(){
            for (var i=0; i<arguments.length; i++){
                expect(arguments[i].statusCode).toBe(200);
            }

        }).done(done);


    });



    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});










