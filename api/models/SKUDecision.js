var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');
var util = require('util');
var logger = require('../../common/logger.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var gameParameters = require('../gameParameters.js').parameters;
var utility = require('../../common/utility.js');
var simulationResultModel = require('./simulationResult.js');


var tOneSKUDecisionSchema = new Schema({
    seminarId                  : String,
    period                     : Number,
    d_CID                      : Number,
    d_BrandID                  : Number,
    d_SKUID                    : Number,
    d_SKUName                  : String,
    d_Advertising              : {type: Number, default: 0}, //consumer communication
    d_AdditionalTradeMargin    : {type: Number, default: 0},
    d_FactoryPrice             : {type: [Number], default: [0,0,0]},
    d_ConsumerPrice            : {type: Number, default: 0},
    d_RepriceFactoryStocks     : {type: Boolean, default: 0},
    d_IngredientsQuality       : {type: Number, default: 0},
    d_PackSize                 : {type: Number, default: 0},
    d_ProductionVolume         : {type: Number, default: 0}, 
    d_PromotionalBudget        : {type: Number, default: 0}, //consumer promotions
    d_PromotionalEpisodes      : {type: [Boolean], default: [false, false,false,false,false,false,false,false,false,false,false,false,false]}, //consumer promotions schedule
    d_TargetConsumerSegment    : {type: Number, default: 0},
    d_Technology               : {type: Number, default: 0},
    d_ToDrop                   : {type: Boolean, default: 0},
    d_TradeExpenses            : {type: Number, default: 0},
    d_WholesalesBonusMinVolume : {type: Number, default: 0},
    d_WholesalesBonusRate      : {type: Number, default: 0},
    d_WarrantyLength           : {type: Number, default: 0}
}); 

var SKUDecision = mongoose.model('SKUDecision', tOneSKUDecisionSchema);

tOneSKUDecisionSchema.pre('save', true, function(next, done){
    var self = this;
    var validateAction = {
        'd_Advertising'              : function(field){ validateAvailableBudget(field, self, done); },
        'd_AdditionalTradeMargin'    : function(field){ validateAdditionalTradeMargin(field, self, done); },
        'd_FactoryPrice'             : function(field){ validateFactoryPrice(field, self, done); },
        //'d_RepriceFactoryStocks'     : function(field){ validateRepriceFactoryStocks(field, self, done); },
        //'d_IngredientsQuality'       : function(field){ validateIngredientsQuality(field, self, done); },
        //'d_PackSize'                 : function(field){ validatePackSize(field, self, done); },
        //'d_ProductionVolume'         : function(field){ validateProductionVolume(field, self, done); },
        'd_PromotionalBudget'        : function(field){ validateAvailableBudget(field, self, done); },
        //'d_PromotionalEpisodes'      : function(field){ validatePromotionalEpisodes(field, self, done); },
        //'d_TargetConsumerSegment'    : function(field){ validateTargetConsumerSegment(field, self, done); },
        //'d_Technology'               : function(field){ validateTechnology(field, self, done); },
        //'d_ToDrop'                   : function(field){ validateToDrop(field, self, done); },
        'd_TradeExpenses'            : function(field){ validateAvailableBudget(field, self, done); },
        //'d_WholesalesBonusMinVolume' : function(field){ validateWholesalesBonusMinVolume(field, self, done); },
        //'d_WholesalesBonusRate'      : function(field){ validateWholesalesBonusRate(field, self, done); },
        //'d_WarrantyLength'           : function(field){ validateWarrantyLength(field, self, done); },
        //'d_ConsumerPrice'            : function(field){ validateConsumerPrice(field, self, done); },       
    }

    function doValidate(field){        
        logger.log('field:' + field);

        if(typeof validateAction[field] != 'function'){
            var validateErr = new Error('Cannot find validate action for ' + field);
            validateErr.msg = 'Cannot find validate action for ' + field;
            validateErr.modifiedField = field;
            return done(validateErr);
        }

        validateAction[field](field);        
    }

    doValidate(this.modifiedField);
    next();
})


//...Limits : [{msg : 'budgetLeft', value : 200}, {msg : 'para', value: 3000}]
function rangeCheck(input, lowerLimits, upperLimits){
    var maxOfLower = { value : 0 };
    var minOfUpper = { value : Infinity };
    lowerLimits.forEach(function(limit){
        if(limit.value > maxOfLower.value){ 
            maxOfLower.value = limit.value, maxOfLower.msg = limit.msg
        };
    });

    upperLimits.forEach(function(limit){
        if(limit.value < minOfUpper.value){ 
            minOfUpper.value = limit.value, minOfUpper.msg = limit.msg
        };
    })

    logger.log('minOfUpper:' + util.inspect(minOfUpper) + ', input:' + input);
    if(input < maxOfLower.value){
        var err = new Error('Input is out of range');
        err.msg = maxOfLower.msg;
        err.lower = maxOfLower.value;
        err.upper = minOfUpper.value;
        return err;
    } else if (input > minOfUpper.value){
        var err = new Error('Input is out of range');
        err.msg = minOfUpper.msg;
        err.lower = maxOfLower.value;
        err.upper = minOfUpper.value;        
        return err;
    } else {
        return undefined;
    }
}

//Factory Price Range:
//Lower limit: Max(UnitCost * (1 - pgen.man_MaxDumpingPercentage));
//Upper limit: Min(UnitCost * (1 + pgen.man_MaxMarkup),
//                 make sure cost of Additional trade margin cost < budget left,
//                 mare sure cost of WholeSales Bonus exceeds < budget left)
function validateFactoryPrice(field, curSKUDecision, done){
    logger.log('curSKUDecision:' +curSKUDecision);
    simulationResultModel.findOne(curSKUDecision.seminarId, curSKUDecision.period - 1).then(function(lastPeriodResult){
        companyResult = utility.findCompany(lastPeriodResult, curSKUDecision.d_CID);

        Q.spread([
            spendingDetailsAssembler.getSpendingDetails(curSKUDecision.seminarId, curSKUDecision.period, curSKUDecision.d_CID),            
            utility.unitCost(curSKUDecision.period, curSKUDecision.d_PackSize, curSKUDecision.d_IngredientsQuality, curSKUDecision.d_Technology, companyResult.c_CumulatedProductionVolumes, companyResult.c_AcquiredEfficiency, curSKUDecision.d_ProductionVolume),
            exports.findOne(curSKUDecision.seminarId, curSKUDecision.period, curSKUDecision.d_CID, curSKUDecision.d_BrandID, curSKUDecision.d_SKUID)
        ], function(spendingDetails, unitProductionCost, preSKUDecision){
            var budgetLeft = spendingDetails.companyData.availableBudget;
            var err, lowerLimits = [], upperLimits = [];

            lowerLimits.push({value : unitProductionCost * (1 - gameParameters.pgen.man_MaxDumpingPercentage), msg : 'Max dumping percentage : ' + gameParameters.pgen.man_MaxDumpingPercentage * 100 + '%'});
            upperLimits.push({value : unitProductionCost * (1 + gameParameters.pgen.man_MaxMarkup), msg : 'Max Markup percentage : ' + gameParameters.pgen.man_MaxMarkup * 100 + '% of Unit Production Cost'});
            upperLimits.push({value : utility.getFactoryPriceByConsumberPrice( (parseFloat(budgetLeft) + (preSKUDecision[field][0] * preSKUDecision.d_ProductionVolume * preSKUDecision.d_AdditionalTradeMargin)) / (curSKUDecision.d_ProductionVolume * curSKUDecision.d_AdditionalTradeMargin) ),             msg : 'Budget left is not enough for traditional trade margin.'});
            upperLimits.push({value : utility.getFactoryPriceByConsumberPrice( (parseFloat(budgetLeft) + (preSKUDecision[field][0] * preSKUDecision.d_WholesalesBonusMinVolume * preSKUDecision.d_WholesalesBonusRate)) / (curSKUDecision.d_WholesalesBonusRate * curSKUDecision.d_WholesalesBonusMinVolume) ), msg : 'Budget left is not enough for WholeSales bonus cost.'});

            logger.log('lowerLimits: ' + util.inspect(lowerLimits));
            logger.log('upperLimits: ' + util.inspect(upperLimits));
            err = rangeCheck(curSKUDecision[field][0],lowerLimits,upperLimits);      

            if(err != undefined){
                err.modifiedField = field;
                done(err);
            } else {
                //TODO: update consumer price automatically 
                done();
            }
        });

    }).fail(function(err){
        done(err);
    });
}

function validateAvailableBudget(field, currentInput, done){
    Q.spread([
        spendingDetailsAssembler.getSpendingDetails(currentInput.seminarId, currentInput.period, currentInput.d_CID),
        exports.findOne(currentInput.seminarId, currentInput.period, currentInput.d_CID, currentInput.d_BrandID, currentInput.d_SKUID)
    ], function(spendingDetails, oneSKUDecision){
        var budgetLeft = spendingDetails.companyData.availableBudget;
        var preInput = oneSKUDecision[field];

        //logger.log(budgetLeft + ' + ' + preInput + ' - ' + currentInput.d_Advertising);
        if(budgetLeft + preInput - currentInput[field] < 0){       
            var validateErr = new Error('Input is out of range');
            validateErr.msg = 'Available budget is not enough.';
            validateErr.modifiedField = field;
            validateErr.upper = budgetLeft + preInput;
            validateErr.lower = 0;
            done(validateErr);
        } else {   
            logger.log('Input ' + currentInput[field] + ' is OK, done()');                 
            done();
        }                
    })
}

function validateAdditionalTradeMargin(field, currentInput, done){
    if((currentInput[field] > 1) || (currentInput[field] < 0)){
        var validateErr = new Error('Input is out of range');
        validateErr.msg = 'Input is out of range: 0% ~ 100%';
        validateErr.modifiedField = field;
        return done(validateErr);
    }

    Q.spread([
        spendingDetailsAssembler.getSpendingDetails(currentInput.seminarId, currentInput.period, currentInput.d_CID),
        exports.findOne(currentInput.seminarId, currentInput.period, currentInput.d_CID, currentInput.d_BrandID, currentInput.d_SKUID)
    ], function(spendingDetails, oneSKUDecision){
        var budgetLeft = spendingDetails.companyData.availableBudget;

        var preEstimatedCost = oneSKUDecision[field] * oneSKUDecision.d_ProductionVolume * oneSKUDecision.d_ConsumerPrice;
        var currentEstimatedCost = currentInput[field] * oneSKUDecision.d_ProductionVolume * oneSKUDecision.d_ConsumerPrice;

        //logger.log('preEstimatedCost:' + preEstimatedCost + ', currentEstimatedCost:' + currentEstimatedCost);
        if(budgetLeft + preEstimatedCost - currentEstimatedCost < 0){       
            var validateErr = new Error('Input is out of range');
            validateErr.msg = 'Available budget is not enough.';
            validateErr.modifiedField = field;

            validateErr.upper = Math.min(1,
                                        (100 * gameParameters.pgen.retail_Markup)/(1 + gameParameters.pgen.retail_Markup),
                                        (budgetLeft + preEstimatedCost)/(oneSKUDecision.d_ProductionVolume * oneSKUDecision * d_ConsumerPrice));
            validateErr.lower = 0;
            done(validateErr);
        } else {   
            logger.log('Input ' + currentInput[field] + ' is OK, done()');                 
            done();
        }                
    })
}

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
                          'd_WarrantyLength',
                          'd_ConsumerPrice'];

            fields.forEach(function(field){
                if(SKU[field] !== undefined){
                    doc.modifiedField = field;
                    doc[field] = SKU[field];
                }
            });

            doc.save(function(err, doc){         
                if(err){ deferred.reject(err);}
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





















