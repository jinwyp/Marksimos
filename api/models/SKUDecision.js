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


exports.findBySKU = function(seminarId, period, SKUID){
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

exports.findAll = function(seminarId, period, companyId, brandId){
    var deferred = Q.defer();
    if(!seminarId){
        process.nextTick(function(){
            deferred.reject(new Error("Invalid argument seminarId"));
        })
    }else if(period===undefined){
        process.nextTick(function(){
            deferred.reject(new Error("Invalid argument period."));
        })
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

exports.discontinue = function(seminarId, period, companyId, brandId, SKUID, isContinue){
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
    }else if(isContinue===undefined){
        deferred.reject(new Error("Invalid argument isContinue."))
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_ToDrop: isContinue
        },
        function(err, numAffected){
            if(err){
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }
    return deferred.promise;
};

exports.updateProcessingTechnology = function(seminarId, period, companyId, brandId, SKUID, technology){
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
    }else if(technology===undefined){
        deferred.reject(new Error("Invalid argument technology."))
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_Technology: technology
        },
        function(err, numAffected){
            if(err){
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }
    return deferred.promise;
};

exports.updateIngredientQuality = function(seminarId, period, companyId, brandId, SKUID, quality){
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
    }else if(quality===undefined){
        deferred.reject(new Error("Invalid argument quality."))
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_IngredientsQuality: quality
        },
        function(err, numAffected){
            if(err){
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }
    return deferred.promise;
};

exports.updatePackageSize = function(seminarId, period, companyId, brandId, SKUID, packageSize){
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
    }else if(packageSize===undefined){
        deferred.reject(new Error("Invalid argument packageSize."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_PackSize: packageSize
        },
        function(err, numAffected){
            if(err){
                deferred.reject(err);
            }

            deferred.resolve(numAffected);
        })
    }

    return deferred.promise;
};


























