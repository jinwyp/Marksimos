var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tDecisionSchema = new Schema({
    d_CID                        : Number,
    d_CompanyName                : String,
    d_BrandsDecisions            : [tOneBrandDecisionSchema],
    d_IsAdditionalBudgetAccepted : Boolean,
    d_RequestedAdditionalBudget  : Number,
    d_InvestmentInEfficiency     : Number,
    d_InvestmentInTechnology     : Number,
    d_InvestmentInServicing      : Number
});

var TDecision = mongoose.model('TDecision', tDecisionSchema);

var tOneBrandDecisionSchema = new Schema({
    d_BrandID       : Number,
    d_BrandName     : String,
    d_SalesForce    : Number,
    d_SKUsDecisions : [tOneSKUDecisionSchema]
});

var TOneBrandDecision = mongoose.model('TOneBrandDecision', tOneBrandDecisionSchema);

var tOneSKUDecisionSchema = new Schema({
    d_SKUID                    : Number,
    d_SKUName                  : String,
    d_Advertising              : Number,
    d_AdditionalTradeMargin    : Number,
    d_FactoryPrice             : [],
    d_ConsumerPrice            : Number,
    d_RepriceFactoryStocks     : Boolean, 
    d_IngredientsQuality       : Number,
    d_PackSize                 : String,
    d_ProductionVolume         : Number,
    d_PromotionalBudget        : Number,

    d_PromotionalEpisodes      : [],
    d_TargetConsumerSegment    : Number,
    d_Technology               : Number,
    d_ToDrop                   : Boolean,
    d_TradeExpenses            : Number,
    d_WholesalesBonusMinVolume : Number,
    d_WholesalesBonusRate      : Number,
    d_WarrantyLength           : String, 
}); 

var TOneSKUDecision = mongoose.model('TOneSKUDecision', tOneSKUDecisionSchema);


exports.saveDecision = function(decision){
    var decision = new TDecision(decision);
    decision.save(function(err){
        var deferred = Q.defer();
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(null);
        }
        return deferred.promise;
    });
};

