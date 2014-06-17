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

var CompanyDecision = mongoose.model('CompanyDecision', tDecisionSchema);

exports.remove =  function(seminarId, companyId){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else{
        CompanyDecision.remove({
            seminarId: seminarId,
            companyId: companyId
        }, 
        function(err){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(null);
            }
        });
    }

    return deferred.promise;
}

exports.removeAll =  function(seminarId){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else{
        CompanyDecision.remove({seminarId: seminarId}, function(err){
            if(err){
                return deferred.reject(err);
            }else{
                return deferred.resolve(null);
            }
        });
    }

    return deferred.promise;
}

exports.save = function(decision){
    var deferred = Q.defer();

    if(!decision){
        deferred.reject(new Error("Invalid argument decision."));
    }else{
        var d = new CompanyDecision(decision);
        d.save(function(err){
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
        deferred.reject(new Error("Invalid argument seminarId"));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else{
        CompanyDecision.findOne({
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
};

exports.updateCompanyDecision = function(seminarId, period, companyId, companyDecision){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId."));
    }else if(period===undefined){
        deferred.reject(new Error("Invalid argument period."));
    }else if(!companyId){
        deferred.reject(new Error("Invalid argument companyId."));
    }else if(!companyDecision){
        deferred.reject(new Error("Invalid argument companyDecision."))
    }else{
        CompanyDecision.update({
            seminarId: seminarId,
            period: period,
            d_CID: companyId
        },
        companyDecision,
        function(err, numAffected){
            if(err){
                return deferred.reject(err);
            }

            return deferred.resolve(numAffected);
        })
    }
    return deferred.promise;
}



