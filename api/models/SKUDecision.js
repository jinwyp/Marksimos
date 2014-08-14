var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');
var util = require('util');
var logger = require('../../common/logger.js');

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

// tOneSKUDecisionSchema.pre('save', true, function(next, done){
//     var self = this;
//     var validationAction = {

//     }

//     function(doValidate(fields){
//         fields.forEach(function(field){
//             if(typeof validationAction[field] != 'function'){
//                 throw new Error('Cannot find validate action for ' + field);
//             }
//         })
//     })
// })
exports.remove =  function(seminarId, period, companyId, brandId, SKUID){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    var d = new SKUDecision(decision);

    d.save(function(err, result, numAffected){
        if(err){
            deferred.reject(err);
        }else if(numAffected!==1){
            deferred.reject(new Error("no result found in db"))
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};


exports.findOne = function(seminarId, period, companyId, brandId, SKUID){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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

    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
        SKUDecision.findOne({
            seminarId : seminarId,
            period    : period,
            d_CID     : companyId,
            d_BrandID : brandId,
            d_SKUID   : SKUID
        },function(err, doc){
            if(err){ return deferred.reject(err);}

            var fields = ['d_Advertising',
                          'd_AdditionalTradeMargin',
                          'd_FactoryPrice',
                          'd_RepriceFactoryStocks',
                          'd_IngredientsQuality',
                          'd_PackSize',
                          'd_ProductionVolume',
                          'd_PromotionalBudget',
                          'd_PromotionalEpisodes',
                          'd_TargetConsumerSegment',
                          'd_Technology',
                          'd_ToDrop',
                          'd_TradeExpenses',
                          'd_WholesalesBonusMinVolume',
                          'd_WholesalesBonusRate',
                          'd_WarrantyLength'];

            doc.modifiedField = [];                          
            fields.forEach(function(field){
                if(SKU[field] !== undefined){
                    doc.modifiedField.push(field);
                    doc[field] = SKU[field];
                }
            });

            logger.log(doc.modifiedField);
            doc.save(function(err, doc){         
                if(err){ return deferred.reject(err);}
                else{ return deferred.resolve(doc);}
            });
        });
  
    }
    return deferred.promise;
};



/**
 * Insert empty SKU decisions for all SKUs in the next period
 */
exports.insertEmptySKUDecision = function(seminarId, period){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    return exports.findAllInPeriod(seminarId, period-1)
    .then(function(allSKUDecisions){
        var p = Q();
        allSKUDecisions.forEach(function(SKUDecision){
            p = p.then(function(){
                return exports.save({
                    seminarId: seminarId,
                    period: period,
                    d_CID: SKUDecision.d_CID,  
                    d_BrandID: SKUDecision.d_BrandID, 
                    d_SKUID: SKUDecision.d_SKUID,
                    d_SKUName: SKUDecision.d_SKUName
                })
            })
        })
        return p;
    })
}





















