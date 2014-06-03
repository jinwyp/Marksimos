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

exports.updateDiscontinue = function(seminarId, period, companyId, brandId, SKUID, isContinue){
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
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }

    return deferred.promise;
};

exports.updateProductionVolume = function(seminarId, period, companyId, brandId, SKUID, productionVolume){
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
    }else if(productionVolume===undefined){
        deferred.reject(new Error("Invalid argument productionVolume."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_ProductionVolume: productionVolume
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

exports.updateManufacturePrice = function(seminarId, period, companyId, brandId, SKUID, manufacturePrice){
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
    }else if(manufacturePrice===undefined){
        deferred.reject(new Error("Invalid argument manufacturePrice."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_FactoryPrice: manufacturePrice
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

exports.updateConsumerCommunication = function(seminarId, period, companyId, brandId, SKUID, consumerCommunication){
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
    }else if(consumerCommunication===undefined){
        deferred.reject(new Error("Invalid argument consumerCommunication."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_ConsumerPrice: consumerCommunication
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

exports.updateTargetConsumerSegment = function(seminarId, period, companyId, brandId, SKUID, targetConsumerSegment){
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
    }else if(targetConsumerSegment===undefined){
        deferred.reject(new Error("Invalid argument targetConsumerSegment."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_TargetConsumerSegment: targetConsumerSegment
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

exports.updateTradeExpenses = function(seminarId, period, companyId, brandId, SKUID, tradeExpenses){
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
    }else if(tradeExpenses===undefined){
        deferred.reject(new Error("Invalid argument tradeExpenses."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_TradeExpenses: tradeExpenses
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

exports.updateAdditionalTradeMargin = function(seminarId, period, companyId, brandId, SKUID, additionalTradeMargin){
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
    }else if(additionalTradeMargin===undefined){
        deferred.reject(new Error("Invalid argument additionalTradeMargin."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_AdditionalTradeMargin: additionalTradeMargin
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

exports.updateWholesaleMinimumVolume = function(seminarId, period, companyId, brandId, SKUID, wholesaleMinimumVolume){
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
    }else if(wholesaleMinimumVolume===undefined){
        deferred.reject(new Error("Invalid argument wholesaleMinimumVolume."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_WholesalesBonusMinVolume: wholesaleMinimumVolume
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

exports.updateWholesaleBonusRate = function(seminarId, period, companyId, brandId, SKUID, wholesaleBonusRate){
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
    }else if(wholesaleBonusRate===undefined){
        deferred.reject(new Error("Invalid argument wholesaleBonusRate."));
    }else{
        SKUDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId,
            d_BrandID: brandId,
            d_SKUID: SKUID
        },
        {
            d_WholesalesBonusRate: wholesaleBonusRate
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






















