var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_CID                        : Number,
    d_CompanyName                : String,
    d_BrandsDecisions            : [Number], //Array of d_BrandID
    d_IsAdditionalBudgetAccepted : Boolean,
    d_RequestedAdditionalBudget  : Number,
    d_InvestmentInEfficiency     : Number,
    d_InvestmentInTechnology     : Number,
    d_InvestmentInServicing      : Number
});

var Decision = mongoose.model('Decision', tDecisionSchema);

exports.remove =  function(seminarId){
    var deferred = Q.defer();

    if(!seminarId){
        process.nextTick(function(){
            deferred.reject(new Error("Invalid argument seminarId"));
        })
    }else{
        Decision.remove({seminarId: seminarId}, function(err){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(null);
            }
        });
    }

    return deferred;
}

exports.save = function(decision){
    var deferred = Q.defer();

    if(!decision){
        process.nextTick(function(){
            deferred.reject(new Error("Invalid argument decision."));
        })
    }else{
        var decision = new Decision(decision);
        decision.save(function(err){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(null);
            }
        });
    }
    
    return deferred.promise;
};

exports.findOne = function(seminarId, period, companyId){
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
        Decision.findOne({
            seminarId: seminarId,
            period: period,
            //d_CID: companyId
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



