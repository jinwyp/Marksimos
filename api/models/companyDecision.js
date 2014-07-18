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
    d_IsAdditionalBudgetAccepted : {type: Boolean, default: true},
    d_RequestedAdditionalBudget  : {type: Number, default: 0},
    d_InvestmentInEfficiency     : {type: Number, default: 0},
    d_InvestmentInTechnology     : {type: Number, default: 0},
    d_InvestmentInServicing      : {type: Number, default: 0}
});

var CompanyDecision = mongoose.model('CompanyDecision', tDecisionSchema);

exports.remove =  function(seminarId, companyId){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId"));
    }else{
        CompanyDecision.remove({
            seminarId: seminarId,
            d_CID: companyId
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
        d.save(function(err, savedDecision, numAffected){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(savedDecision);
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

exports.findAllInPeriod = function(seminarId, period){
    var deferred = Q.defer();

    CompanyDecision.find({
        seminarId: seminarId,
        period: period
    }, function(err, result){
        if(err) return deferred.reject(err);

        return deferred.resolve(result);
    })

    return deferred.promise;
}

/**
 * Insert empty company decisions for all companies in the next period
 */
exports.insertEmptyCompanyDecision = function(seminarId, period){
    //find all company decisions in the last period
    return exports.findAllInPeriod(seminarId, period - 1)
    .then(function(allCompanyDecisions){
        var p = Q();
        allCompanyDecisions.forEach(function(companyDecision){
            p = p.then(function(){
                return exports.save({
                    seminarId: seminarId,
                    period: period,
                    d_CID: companyDecision.d_CID,   
                    d_CompanyName: companyDecision.d_CompanyName,
                    d_BrandsDecisions: companyDecision.d_BrandsDecisions
                });
            });
        })
        return p;
    })
}



