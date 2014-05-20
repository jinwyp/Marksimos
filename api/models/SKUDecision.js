var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tOneSKUDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_SKUID: Number,
    d_SKUName: String,
    d_Advertising: Number,
    d_AdditionalTradeMargin: Number,
    d_FactoryPrice: [Number],
    d_ConsumerPrice: Number,
    d_RepriceFactoryStocks: Boolean,
    d_IngredientsQuality: Number,
    d_PackSize: String,
    d_ProductionVolume: Number,
    d_PromotionalBudget: Number,

    d_PromotionalEpisodes: [Boolean],
    d_TargetConsumerSegment: Number,
    d_Technology: Number,
    d_ToDrop: Boolean,
    d_TradeExpenses: Number,
    d_WholesalesBonusMinVolume: Number,
    d_WholesalesBonusRate: Number,
    d_WarrantyLength: String,
}); 

var SKUDecision = mongoose.model('SKUDecision', tOneSKUDecisionSchema);

exports.remove =  function(seminarId){
    var deferred = Q.defer();
    SKUDecision.remove({seminarId: seminarId}, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(null);
        }
    });
    return deferred;
}

exports.save = function(decision){
    var deferred = Q.defer();
    var decision = new SKUDecision(decision);
    decision.save(function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(null);
        }
    });
    return deferred.promise;
};


exports.find = function(seminarId, period, SKUID){
    var deferred = Q.defer();
    SKUDecision.find({
        seminarId: seminarId, 
        period: period, 
        d_SKUID: SKUID
    }, function(err, decision){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(decision);
        }
    });
    return deferred.promise;
};

exports.findAll = function(seminarId, period){
    var deferred = Q.defer();
    SKUDecision.find({seminarId: seminarId}, function(err, result){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(result);
        }
    })
    return deferred.promise;
}