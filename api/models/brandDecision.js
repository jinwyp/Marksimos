var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tOneBrandDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_CID: Number,
    d_BrandID       : Number,
    d_BrandName     : String,
    d_SalesForce    : Number,
    d_SKUsDecisions : [Number]  //Array of d_SKUID
});

var BrandDecision = mongoose.model('BrandDecision', tOneBrandDecisionSchema);

exports.remove =  function(seminarId){
    var deferred = Q.defer();
    BrandDecision.remove({seminarId: seminarId}, function(err){
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
    var decision = new BrandDecision(decision);
    decision.save(function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(null);
        }
    });
    return deferred.promise;
};

exports.findAll = function(seminarId, period, companyId){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else{
        BrandDecision.find({
            seminarId: seminarId,
            period: period,
            d_CID: companyId
        }, function(err, result){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(result);
            }
        })
    }
    return deferred.promise;
}
