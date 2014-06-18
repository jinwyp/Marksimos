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
    d_Advertising: {type: Number, default: 0}, //consumer communication
    d_AdditionalTradeMargin: {type: Number, default: 0},
    d_FactoryPrice: {type: [Number], default: [0,0,0]},
    d_ConsumerPrice: {type: Number, default: 0},
    d_RepriceFactoryStocks: {type: Boolean, default: 0},
    d_IngredientsQuality: {type: Number, default: 0},
    d_PackSize: {type: Number, default: 0},
    d_ProductionVolume: {type: Number, default: 0}, 
    d_PromotionalBudget: {type: Number, default: 0}, //consumer promotions
    d_PromotionalEpisodes: {type: [Boolean], default: [false, false,false,false,false,false,false,false,false,false,false,false,false]}, //consumer promotions schedule
    d_TargetConsumerSegment: {type: Number, default: 0},
    d_Technology: {type: Number, default: 0},
    d_ToDrop: {type: Boolean, default: 0},
    d_TradeExpenses: {type: Number, default: 0},
    d_WholesalesBonusMinVolume: {type: Number, default: 0},
    d_WholesalesBonusRate: {type: Number, default: 0},
    d_WarrantyLength: {type: Number, default: 0}
}); 

var SKUDecision = mongoose.model('SKUDecision', tOneSKUDecisionSchema);

exports.remove =  function(seminarId, period, companyId, brandId, SKUID){
    var deferred = Q.defer();
    SKUDecision.remove({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brandId,
        d_SKUID: SKUID
    }, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(undefined);
        }
    });
    return deferred.promise;
}

exports.removeAll =  function(seminarId){
    var deferred = Q.defer();
    SKUDecision.remove({seminarId: seminarId}, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(undefined);
        }
    });
    return deferred.promise;
}

exports.removeAllInBrand = function(seminarId, period, companyId){
    var deferred = Q.defer();
    SKUDecision.remove({
        seminarId: seminarId,
        d_CID: companyId
    }, 
    function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(undefined);
        }
    });
    return deferred.promise;
}

exports.save = function(decision){
    var deferred = Q.defer();
    var d = new SKUDecision(decision);

    d.save(function(err, result, numAffected){
        if(err){
            deferred.reject(err);
        }else if(numAffected!==1){
            deferred.reject(new Error("no result found in db"))
        }else{
            deferred.resolve(undefined);
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

exports.findAllInBrand = function(seminarId, period, companyId, brandId){
    var deferred = Q.defer();
    SKUDecision.find({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brandId
    })
    .sort({d_SKUID: 'asc'})
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

exports.findAllInCompany = function(seminarId, period, companyId){
    var deferred = Q.defer();

    SKUDecision.find({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
    })
    .sort({d_SKUID: 'asc'})
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

exports.findAllInPeriod = function(seminarId, period){
    var deferred = Q.defer();

    SKUDecision.find({
        seminarId: seminarId,
        period: period
    })
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

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





















