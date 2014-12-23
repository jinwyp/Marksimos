/// <reference path="../../../node_modules/jasmine/lib/jasmine.js" />
var request = require('request').defaults({ jar: true });
var studentApiPath = "http://localhost:3000/marksimos/api/";
var utility = require('../../testUtility.js');
var Q = require('q');



describe("Student API Submit Decisions : ", function() {

    var studentList =[
        //{
        //    email : 'anilraparla@hcdlearning.com',
        //    password : '123456'
        //},
        {
            email : 'haosun@hcdlearning.com',
            password : '123456'
        },{
            email : 'jinwang@hcdlearning.com',
            password : '123456'
        },{
            email : 'yunsun@hcdlearning.com',
            password : '123456'
        }

    ];


    var semanerId = '10051';
    var period1 =[
        {
            companyId : 1,
            "d_InvestmentInServicing": 0,
            "d_InvestmentInTechnology": 110,
            "d_InvestmentInEfficiency": 190,
            "d_RequestedAdditionalBudget": 50,
            brandDecisions:[
                {
                    "brand_id": 11,
                    "brandName": "APONE",
                    "seminarId": semanerId,
                    "d_SalesForce": 40
                },
                {
                    "brand_id": 12,
                    "brandName": "ACOOP",
                    "seminarId": semanerId,
                    "d_SalesForce": 40
                },
                {
                    "brand_id": 13,
                    "brandName": "AOLIV",
                    "seminarId": semanerId,
                    "d_SalesForce": 40
                }
            ],
            skuDecisions :[
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 11,
                    sku_id : 111,
                    sku_data : {

                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 240,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 6.84999990463257,
                        "d_FactoryPrice": [
                            4.82938528060913,
                            4.82938528060913,
                            4.82938528060913
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 11,
                    sku_id : 112,
                    sku_data : {

                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 10,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            true,
                            false,
                            false,
                            true,
                            false,
                            false,
                            true,
                            false,
                            false,
                            true,
                            false,
                            false,
                            true
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 2,
                        "d_PackSize": 0,
                        "d_IngredientsQuality": 4,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 3.262320023246011,
                        "d_FactoryPrice": [
                            2.3,
                            3.06683588027954,
                            3.06683588027954
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 11,
                    sku_id : 113,
                    sku_data : {

                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 2,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 150,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 7.19999980926514,
                        "d_FactoryPrice": [
                            5.07614183425903,
                            5.07614183425903,
                            5.07614183425903
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 12,
                    sku_id : 121,
                    sku_data : {

                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 10,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 7,
                        "d_TargetConsumerSegment": 5,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 1,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 9,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 22.69440016171138,
                        "d_FactoryPrice": [
                            16,
                            17.6254940032959,
                            17.6254940032959
                        ],
                        "d_AdditionalTradeMargin": 0.02,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 13,
                    sku_id : 131,
                    sku_data : {

                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 6,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 40,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 9.5,
                        "d_FactoryPrice": [
                            6.69768762588501,
                            6.69768762588501,
                            6.69768762588501
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 1,
                    brand_id : 13,
                    sku_id : 132,
                    sku_data : {

                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 6,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 10,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 6,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 10.8000001907349,
                        "d_FactoryPrice": [
                            7.61421346664429,
                            7.61421346664429,
                            7.61421346664429
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }


                }
            ]
        },
        {
            companyId : 2,
            "d_InvestmentInServicing": 0,
            "d_InvestmentInTechnology": 190,
            "d_InvestmentInEfficiency": 200,
            "d_RequestedAdditionalBudget": 0,
            brandDecisions:[
                {
                    "brand_id": 21,
                    "brandName": "BOBOB",
                    "seminarId": semanerId,
                    "d_SalesForce": 60
                },
                {
                    "brand_id": 22,
                    "brandName": "BSOFE",
                    "seminarId": semanerId,
                    "d_SalesForce": 60
                },
                {
                    "brand_id": 23,
                    "brandName": "BJUNE",
                    "seminarId": semanerId,
                    "d_SalesForce": 50
                }
            ],
            skuDecisions :[
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 21,
                    sku_id : 211,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 10,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 4,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 1,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 6,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 8.935920063673855,
                        "d_FactoryPrice": [
                            6.3,
                            6.34517765045166,
                            6.34517765045166
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 21,
                    sku_id : 212,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 10,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 5,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 4,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 14.6000003814697,
                        "d_FactoryPrice": [
                            10.293288230896,
                            10.293288230896,
                            10.293288230896
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 21,
                    sku_id : 213,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 10,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 30,
                        "d_PackSize": 0,
                        "d_IngredientsQuality": 4,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 3.625,
                        "d_FactoryPrice": [
                            2.55569648742676,
                            2.55569648742676,
                            2.55569648742676
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 22,
                    sku_id : 221,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.02,
                        "d_WholesalesBonusMinVolume": 5,
                        "d_TradeExpenses": 5,
                        "d_ToDrop": false,
                        "d_Technology": 7,
                        "d_TargetConsumerSegment": 5,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 40,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 9,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 12.6000003814697,
                        "d_FactoryPrice": [
                            8.88324928283691,
                            8.88324928283691,
                            8.88324928283691
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 23,
                    sku_id : 231,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.02,
                        "d_WholesalesBonusMinVolume": 5,
                        "d_TradeExpenses": 10,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 50,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 14,
                        "d_FactoryPrice": [
                            9.87027645111084,
                            9.87027645111084,
                            9.87027645111084
                        ],
                        "d_AdditionalTradeMargin": 0.02,
                        "d_Advertising": 20
                    }


                },
                {
                    seminarId : semanerId,
                    companyId : 2,
                    brand_id : 23,
                    sku_id : 232,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.02,
                        "d_WholesalesBonusMinVolume": 5,
                        "d_TradeExpenses": 10,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 2,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 25,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 6,
                        "d_RepriceFactoryStocks": true,
                        "d_ConsumerPrice": 7.55000019073486,
                        "d_FactoryPrice": [
                            5.32289934158325,
                            5.32289934158325,
                            5.32289934158325
                        ],
                        "d_AdditionalTradeMargin": 0.02,
                        "d_Advertising": 20
                    }


                }
            ]
        },
        {
            companyId : 3,
            "d_InvestmentInServicing": 0,
            "d_InvestmentInTechnology": 200,
            "d_InvestmentInEfficiency": 450,
            "d_RequestedAdditionalBudget": 0,
            brandDecisions:[
                {
                    "brand_id": 31,
                    "brandName": "CASAH",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                },
                {
                    "brand_id": 32,
                    "brandName": "CEEKE",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                },
                {
                    "brand_id": 33,
                    "brandName": "CCHIN",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                }
            ],
            skuDecisions :[
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 31,
                    sku_id : 311,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.01,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 6,
                        "d_TargetConsumerSegment": 2,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            true,
                            true
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 20,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 8,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 9.914616070647659,
                        "d_FactoryPrice": [
                            6.99,
                            6.55668354034424,
                            6.55668354034424
                        ],
                        "d_AdditionalTradeMargin": 0.02,
                        "d_Advertising": 10
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 31,
                    sku_id : 312,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.05,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 6,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            true,
                            true,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 10,
                        "d_ProductionVolume": 10,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 8,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 15.588216111075502,
                        "d_FactoryPrice": [
                            10.99,
                            11.209813117981,
                            11.209813117981
                        ],
                        "d_AdditionalTradeMargin": 0.1,
                        "d_Advertising": 5
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 31,
                    sku_id : 313,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0.01,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 6,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            true,
                            true,
                            true,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 30,
                        "d_ProductionVolume": 50,
                        "d_PackSize": 0,
                        "d_IngredientsQuality": 8,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 3.4041600242567065,
                        "d_FactoryPrice": [
                            2.4,
                            2.52044558525085,
                            2.52044558525085
                        ],
                        "d_AdditionalTradeMargin": 0.01,
                        "d_Advertising": 20
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 32,
                    sku_id : 321,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 4,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 10,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 12.76560009096265,
                        "d_FactoryPrice": [
                            9,
                            10.0817823410034,
                            10.0817823410034
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 32,
                    sku_id : 322,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 4,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 10,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 12.76560009096265,
                        "d_FactoryPrice": [
                            9,
                            11.7033281326294,
                            11.7033281326294
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 3,
                    brand_id : 33,
                    sku_id : 331,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 2,
                        "d_TradeExpenses": 10,
                        "d_ToDrop": false,
                        "d_Technology": 7,
                        "d_TargetConsumerSegment": 5,
                        "d_PromotionalEpisodes": [
                            true,
                            true,
                            true,
                            true,
                            true,
                            false,
                            false,
                            true,
                            true,
                            true,
                            true,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 20,
                        "d_ProductionVolume": 30,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 9,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 14.169816100968541,
                        "d_FactoryPrice": [
                            9.99,
                            8.24873065948486,
                            8.24873065948486
                        ],
                        "d_AdditionalTradeMargin": 0.02,
                        "d_Advertising": 50
                    }


                }
            ]
        },
        {
            companyId : 4,
            "d_InvestmentInServicing": 0,
            "d_InvestmentInTechnology": 0,
            "d_InvestmentInEfficiency": 0,
            "d_RequestedAdditionalBudget": 0,
            brandDecisions:[
                {
                    "brand_id": 41,
                    "brandName": "DOPOL",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                },
                {
                    "brand_id": 42,
                    "brandName": "DOOOP",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                },
                {
                    "brand_id": 43,
                    "brandName": "DOYAL",
                    "seminarId": semanerId,
                    "d_SalesForce": 0
                }
            ],
            skuDecisions :[
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 41,
                    sku_id : 411,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 4,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 7.15000009536743,
                        "d_FactoryPrice": [
                            5.04089117050171,
                            5.04089117050171,
                            5.04089117050171
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 41,
                    sku_id : 412,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 4,
                        "d_TargetConsumerSegment": 1,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 2,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 14.3999996185303,
                        "d_FactoryPrice": [
                            10.1522836685181,
                            10.1522836685181,
                            10.1522836685181
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 42,
                    sku_id : 421,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 4,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 7.44999980926514,
                        "d_FactoryPrice": [
                            5.25239706039429,
                            5.25239706039429,
                            5.25239706039429
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 42,
                    sku_id : 422,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 5,
                        "d_TargetConsumerSegment": 3,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 0,
                        "d_IngredientsQuality": 5,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 3.75,
                        "d_FactoryPrice": [
                            2.64382410049438,
                            2.64382410049438,
                            2.64382410049438
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 43,
                    sku_id : 431,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 7,
                        "d_TargetConsumerSegment": 6,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 7,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 11.25,
                        "d_FactoryPrice": [
                            7.931471824646,
                            7.931471824646,
                            7.931471824646
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }
                },
                {
                    seminarId : semanerId,
                    companyId : 4,
                    brand_id : 43,
                    sku_id : 432,
                    sku_data : {
                        
                        "d_WholesalesBonusRate": 0,
                        "d_WholesalesBonusMinVolume": 0,
                        "d_TradeExpenses": 0,
                        "d_ToDrop": false,
                        "d_Technology": 7,
                        "d_TargetConsumerSegment": 5,
                        "d_PromotionalEpisodes": [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ],
                        "d_PromotionalBudget": 0,
                        "d_ProductionVolume": 0,
                        "d_PackSize": 1,
                        "d_IngredientsQuality": 9,
                        "d_RepriceFactoryStocks": false,
                        "d_ConsumerPrice": 12.5500001907349,
                        "d_FactoryPrice": [
                            8.84799766540527,
                            8.84799766540527,
                            8.84799766540527
                        ],
                        "d_AdditionalTradeMargin": 0,
                        "d_Advertising": 0
                    }


                }
            ]
        }

    ];



    var originalTimeout;


    beforeEach(function(done) {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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




    it("Submit SKU Decisions", function(done) {

        var deferred = Q.defer();

        var resultPromise = [];

        function companyAsync(company) {
            request.put(studentApiPath + "company/decision", { json: company }, function(err, response, seminar) {
                if (!err && response.statusCode == 200) {

                    deferred.resolve(response);
                }else{
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }

        function brandAsync(brand) {
            request.put(studentApiPath + "brand/decision", { json: brand }, function(err, response, seminar) {
                if (!err && response.statusCode == 200) {

                    deferred.resolve(response);
                }else{
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }

        function skuAsync(sku) {
            request.put(studentApiPath + "sku/decision", { json: sku }, function(err, response, seminar) {
                if (!err && response.statusCode == 200) {

                    deferred.resolve(response);
                }else{
                    deferred.reject(new Error(err));
                }
            });

            return deferred.promise;
        }







        period1.forEach(function(company){

            var companyModify = {
                companyId : company.companyId,
                company_data : {
                    "d_InvestmentInServicing": company.d_InvestmentInServicing,
                    "d_InvestmentInTechnology": company.d_InvestmentInTechnology,
                    "d_InvestmentInEfficiency": company.d_InvestmentInEfficiency,
                    "d_RequestedAdditionalBudget": company.d_RequestedAdditionalBudget,
                }
            };

            resultPromise.push(companyAsync(companyModify));


            company.brandDecisions.forEach(function(brand){

                var brandModify = {
                    companyId : company.companyId,
                    brand_id : brand.brand_id,
                    brand_data : {
                        d_SalesForce : brand.d_SalesForce
                    }
                };

                resultPromise.push(brandAsync(brandModify));

            });

            company.skuDecisions.forEach(function(sku){

                var skuModify = sku;

                for (var property in sku.sku_data) {
                    if ( typeof (sku.sku_data[property]) == "function") {
                        //obj[p]();
                    } else {
                        // property 为属性名称，obj[p]为对应属性的值
                        skuModify.sku_data[property] = sku.sku_data[property];
                    }
                }

                resultPromise.push(skuAsync(skuModify));

            })



        });



        Q.all(resultPromise).spread(function(){
            for (var i=0; i<arguments.length; i++){
                expect(arguments[i].statusCode).toBe(200);
            }

        }).fin(function(){
          done();
        }).done();


    });



    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});




