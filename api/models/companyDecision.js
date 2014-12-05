var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var util = require('util');

var tDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_CID                                 : Number,
    d_CompanyName                         : String,
    d_BrandsDecisions                     : [Number], //Array of d_BrandID
    d_IsAdditionalBudgetAccepted          : {type: Boolean, default: true},
    d_RequestedAdditionalBudget           : {type: Number, default: 0},
    d_InvestmentInEfficiency              : {type: Number, default: 0},
    d_InvestmentInTechnology              : {type: Number, default: 0},
    d_InvestmentInServicing               : {type: Number, default: 0},
    bs_AdditionalBudgetApplicationCounter : {type: Number, default: 0},
    bs_BlockBudgetApplication             : {type: Boolean, default: false},
});

var CompanyDecision = mongoose.model('CompanyDecision', tDecisionSchema);

exports.query = CompanyDecision;


tDecisionSchema.pre('save', true, function(next, done){
    var self = this;
    var validateAction = {
        'd_RequestedAdditionalBudget' : function(field){ validateAdditionalBudget(field, self, done); },
        'd_InvestmentInEfficiency'    : function(field){ validateAvailableBudget(field, self, done); },
        'd_InvestmentInTechnology'    : function(field){ validateAvailableBudget(field, self, done); },
        'd_InvestmentInServicing'     : function(field){ validateAvailableBudget(field, self, done); },
        'skip'                        : function(field){ process.nextTick(done); }
    }

    function doValidate(field){
        if(typeof validateAction[field] != 'function'){
            var validateErr = new Error('Cannot find validate action for ' + field);
            validateErr.message = 'Cannot find validate action for ' + field;
            validateErr.modifiedField = field;
            return done(validateErr);
        }

        validateAction[field](field);
    }
    if(!this.modifiedField){ this.modifiedField = 'skip'; }
    doValidate(this.modifiedField);
    next();
})

function validateAdditionalBudget(field, curCompanyDecisionInput, done){

    Q.spread([
        spendingDetailsAssembler.getSpendingDetails(curCompanyDecisionInput.seminarId, curCompanyDecisionInput.period, curCompanyDecisionInput.d_CID),
        exports.findOne(curCompanyDecisionInput.seminarId, curCompanyDecisionInput.period, curCompanyDecisionInput.d_CID),
        exports.findOne(curCompanyDecisionInput.seminarId, curCompanyDecisionInput.period - 1, curCompanyDecisionInput.d_CID)
    ], function(spendingDetails, preCompanyDecisionInput, prePeriodCompanyDecision){

        var budgetLeft = parseFloat(spendingDetails.companyData.availableBudget);
        var err, lowerLimits = [],upperLimits = [];

        if(preCompanyDecisionInput.bs_BlockBudgetApplication){
            var err = new Error('You cannot applied budget more than twice.');
            done(err);
        } else {
            lowerLimits.push({value : 0, message: 'Cannot accept negative number.'});
            upperLimits.push({value : parseFloat(spendingDetails.companyData.averageBudgetPerPeriod), message : 'Cannot accept number bigger than ' + spendingDetails.companyData.averageBudgetPerPeriod});
            err = rangeCheck(curCompanyDecisionInput[field],lowerLimits,upperLimits);
            if(err != undefined){
                err.modifiedField = field;
                done(err);
            } else {
                //if user want to cancel application this period, reset counter make it = last period input
                if(curCompanyDecisionInput.d_RequestedAdditionalBudget == 0){
                    curCompanyDecisionInput.d_IsAdditionalBudgetAccepted = false;
                    if(prePeriodCompanyDecision.bs_AdditionalBudgetApplicationCounter != preCompanyDecisionInput.bs_AdditionalBudgetApplicationCounter){
                        curCompanyDecisionInput.bs_AdditionalBudgetApplicationCounter = prePeriodCompanyDecision.bs_AdditionalBudgetApplicationCounter;
                    }
                //if user input != 0 and counter hasn't been increased this period, do it
                } else if(prePeriodCompanyDecision.bs_AdditionalBudgetApplicationCounter == preCompanyDecisionInput.bs_AdditionalBudgetApplicationCounter){
                    curCompanyDecisionInput.bs_AdditionalBudgetApplicationCounter = curCompanyDecisionInput.bs_AdditionalBudgetApplicationCounter + 1;
                    curCompanyDecisionInput.d_IsAdditionalBudgetAccepted = true;
                }

                done();
            }

        }
    }).done();
}

function validateAvailableBudget(field, curCompanyDecisionInput, done){
    Q.spread([
        spendingDetailsAssembler.getSpendingDetails(curCompanyDecisionInput.seminarId, curCompanyDecisionInput.period, curCompanyDecisionInput.d_CID),
        exports.findOne(curCompanyDecisionInput.seminarId, curCompanyDecisionInput.period, curCompanyDecisionInput.d_CID)
    ], function(spendingDetails, preCompanyDecisionInput){
        var budgetLeft = parseFloat(spendingDetails.companyData.availableBudget);
        var err, lowerLimits = [],upperLimits = [];

        lowerLimits.push({value : 0, message: 'Cannot accept negative number.'});
        upperLimits.push({value : budgetLeft + preCompanyDecisionInput[field], message : 'Budget Left is not enough.'});
        err = rangeCheck(curCompanyDecisionInput[field],lowerLimits,upperLimits);
        if(err != undefined){
            err.modifiedField = field;
            done(err);
        } else {
            done();
        }
    }).done();
}

//...Limits : [{message : 'budgetLeft', value : 200}, {message : 'para', value: 3000}]
function rangeCheck(input, lowerLimits, upperLimits){
    var maxOfLower = { value : 0 };
    var minOfUpper = { value : Infinity };
    lowerLimits.forEach(function(limit){
        if(limit.value > maxOfLower.value){
            maxOfLower.value = limit.value, maxOfLower.message = limit.message
        };
    });

    upperLimits.forEach(function(limit){
        if(limit.value < minOfUpper.value){
            minOfUpper.value = limit.value, minOfUpper.message = limit.message
        };
    })

    if(input < maxOfLower.value){
        var err = new Error('Input is out of range');
        err.message = maxOfLower.message;
        err.lower = maxOfLower.value;
        err.upper = minOfUpper.value;
        return err;
    } else if (input > minOfUpper.value){
        var err = new Error('Input is out of range');
        err.message = minOfUpper.message;
        err.lower = maxOfLower.value;
        err.upper = minOfUpper.value;
        return err;
    } else {
        return undefined;
    }
}

exports.remove =  function(seminarId, companyId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    if(!decision){
        deferred.reject(new Error("Invalid argument decision."));
    }else{
        var d = new CompanyDecision(decision);

        CompanyDecision.remove({
            seminarId   : d.seminarId,
            period      : d.period,
            d_CID       : d.companyId,
        }, function(err){
            if(err){ return deferred.reject(err); }

            d.save(function(err, saveDecision, numAffected){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(saveDecision);
                }
            });
        })

    }

    return deferred.promise;
};

exports.findOne = function(seminarId, period, companyId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    }else if(!companyDecision){
        deferred.reject(new Error("Invalid argument companyDecision."))
    }else{
        CompanyDecision.findOne({
            seminarId: seminarId,
            period: period,
            d_CID: companyId
        },function(err, doc){
            if(err){return deferred.reject(err);}
            var fields = ['d_RequestedAdditionalBudget',
                          'd_InvestmentInEfficiency',
                          'd_InvestmentInTechnology',
                          'd_InvestmentInServicing'];

            fields.forEach(function(field){
                if(companyDecision[field] !== undefined){
                    doc.modifiedField = field;
                    doc[field] = companyDecision[field];
                }
            });

            doc.save(function(err, doc){
                if(err){ deferred.reject(err);}
                else{ return deferred.resolve(doc);}
            });
        });
    }
    return deferred.promise;
}

exports.findAllInPeriod = function(seminarId, period){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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



