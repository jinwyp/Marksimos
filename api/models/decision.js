var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');


var tDecisionSchema = new Schema({
    d_CID                        : Number,
    d_CompanyName                : String,
    d_BrandsDecisions            : [tOneBrandDecisionSchema],
    d_IsAdditionalBudgetAccepted : boolean,
    d_RequestedAdditionalBudget  : Number,
    d_InvestmentInEfficiency     : Number,
    d_InvestmentInTechnology     : Number,
    d_InvestmentInServicing      : Number
});

var tOneBrandDecisionSchema = new Schema({
    d_BrandID       : Number,
    d_BrandName     : String,
    d_SalesForce    : Number,
    d_SKUsDecisions : TSKUsDecisions
});

var tOneSKUDecisionSchema = new Schema({
    d_SKUID                    : Number,
    d_SKUName                  : String,
    d_Advertising              : Number,
    d_AdditionalTradeMargin    : Number,
    d_FactoryPrice             : [],
    d_ConsumerPrice            : Number,
    d_RepriceFactoryStocks     : boolean;  
    d_IngredientsQuality       : Number; 
    d_PackSize                 : String;
    d_ProductionVolume         : Number;
    d_PromotionalBudget        : Number;
    d_PromotionalEpisodes      : [];
    d_TargetConsumerSegment    : Number;
    d_Technology               : Number;
    d_ToDrop                   : boolean;
    d_TradeExpenses            : single;
    d_WholesalesBonusMinVolume : single;
    d_WholesalesBonusRate      : single;
    d_WarrantyLength           : String; 
}); 

