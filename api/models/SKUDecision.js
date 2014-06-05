var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tOneSKUDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_CID: Number,
    d_BrandID: Number,
    d_SKUID: Number,
    d_SKUName: String,
    d_Advertising: Number,
    d_AdditionalTradeMargin: Number,
    d_FactoryPrice: [Number],
    d_ConsumerPrice: Number,
    d_RepriceFactoryStocks: Boolean,
    d_IngredientsQuality: Number,
    d_PackSize: Number,
    d_ProductionVolume: Number,
    d_PromotionalBudget: Number,
    d_PromotionalEpisodes: [Boolean],
    d_TargetConsumerSegment: Number,
    d_Technology: Number,
    d_ToDrop: Boolean,
    d_TradeExpenses: Number,
    d_WholesalesBonusMinVolume: Number,
    d_WholesalesBonusRate: Number,
    d_WarrantyLength: Number,
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
    return deferred.promise;
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


exports.findOne = function(seminarId, period, companyId, brandId, SKUID){
    var deferred = Q.defer();
    SKUDecision.findOne({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brandId,
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

exports.findAll = function(seminarId, period, companyId, brandId){
    var deferred = Q.defer();
    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else{
        SKUDecision.find({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId
        }, function(err, result){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(result);
            }
        })
    }
    return deferred.promise;
};

exports.findAllInCompany = function(seminarId, period, companyId){
    var deferred = Q.defer();
    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else if(companyId === undefined){
        deferred.reject(new Error("Invalid argument companyId."));
    }else{
        SKUDecision.find({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
        }, function(err, result){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(result);
            }
        })
    }
    return deferred.promise;
};

exports.updateSKU = function(seminarId, period, companyId, brandId, SKUID, SKU){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId."));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else if(!companyId){
        deferred.reject(new Error("Invalid argument companyId."));
    }else if(!brandId){
        deferred.reject(new Error("Invalid argument brandId."));
    }else if(!SKUID){
        deferred.reject(new Error("Invalid argument SKUID."));
    }else if(SKU===undefined){
        deferred.reject(new Error("Invalid argument SKU."))
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        SKU,
        function(err, numAffected){
            if(err){
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }
    return deferred.promise;
};





















