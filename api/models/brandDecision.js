var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');
var logger = require('../../common/logger.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var util = require('util');

var tOneBrandDecisionSchema = new Schema({
    seminarId: String,
    period: Number,
    d_CID: Number,
    d_BrandID       : Number,
    d_BrandName     : String,
    bs_PeriodOfBirth: {type: Number},    
    d_SalesForce    : {type: Number, default: 0},
    d_SKUsDecisions : [Number]  //Array of d_SKUID
});

var BrandDecision = mongoose.model('BrandDecision', tOneBrandDecisionSchema);

tOneBrandDecisionSchema.pre('save', true, function(next, done){
    var self = this;
    var validateAction = {
        //New product
        'd_BrandName'  : function(field){ validateBrandName(field, self, done); },
        //available budget validate
        'd_SalesForce' : function(field){
            Q.spread([
                spendingDetailsAssembler.getSpendingDetails(self.seminarId, self.period, self.d_CID),
                exports.findOne(self.seminarId, self.period, self.d_CID, self.d_BrandID)
            ], function(spendingDetails, oneBrandDecision){
                var budgetLeft = spendingDetails.companyData.availableBudget;
                var oldInput = oneBrandDecision.d_SalesForce;

                if(budgetLeft + oldInput - self.d_SalesForce < 0){       
                    var validateErr = new Error('Available budget is not enough.');
                    validateErr.modifiedField = field;
                    validateErr.upper = budgetLeft - oldInput;
                    validateErr.lower = 0;
                    done(validateErr);
                } else {   
                    done();
                }
            }).fail(function(err){
                done(err);
            }).done();
        },        
        'skip'                       : function(field){ process.nextTick(done); }

    }


    function doValidate(field){
        if(typeof validateAction[field] != 'function'){
            throw new Error('Cannot find validate action for ' + field);
        }
        validateAction[field](field);        
    }

    if(!this.modifiedField){ this.modifiedField = 'skip'; }
    doValidate(this.modifiedField);

//    var err = new Error('something went wrong:' + this.modifiedField + ', d_CID:' + this.d_CID);
    next();
});

//not only validate name, but also validate if this brand is allowed to created 
function validateBrandName(field, curBrandecision, done){
    if(curBrandecision.d_BrandName.length > 5){
        var err = new Error('Out of Brand name range');
        err.message = 'Out of Brand name range';
        return done(err);
    }

    exports.findAllInCompany(curBrandecision.seminarId, curBrandecision.period, curBrandecision.d_CID).then(function(Brands){
        var maxBrandID = 1;
        Brands.forEach(function(Brand){
            if(Brand.d_BrandID > maxBrandID){
                maxBrandID = Brand.d_BrandID;
            }
        })
        
        if(maxBrandID.toString()[maxBrandID.toString().length-1] === '5'){ return done(new Error("You already have 5 Brands."));}
                
        //logger.log('d_BrandName:' + curBrandecision.d_BrandName + ', Brands:' + Brands);
        var isNameExisted = Brands.some(function(Brand){             
            return Brand.d_BrandName == curBrandecision.d_BrandName; 
        });

        if(isNameExisted){
            return done(new Error('Name existed.'));            
        } else {
            //TODO: if kernel discontinue some brand/sku without re-organise ID, logic below will get screwed             
            if(maxBrandID != 1){
                curBrandecision.d_BrandID = maxBrandID + 1;    
                curBrandecision.d_SKUsDecisions.push((maxBrandID+1)*10 + 1);
            //this is first one Brand under company? 
            } else {
                done(new Error('This is first one Brand under company??'));
            }
            curBrandecision.bs_PeriodOfBirth = curBrandecision.period;
            done();
        }

    }, function(err){
        done(err);
    });
}

exports.remove =  function(seminarId, period, companyId, brandId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    BrandDecision.remove({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brandId
    }, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(null);
        }
    });
    return deferred.promise;
};

exports.removeAll =  function(seminarId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    BrandDecision.remove({seminarId: seminarId}, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve(null);
        }
    });
    return deferred.promise;
};


//Initialize process, create brand decision document based on binary files, skip all the validations
//set bs_PeriodOfBirth = 0
exports.initCreate = function(decision){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    var decision = new BrandDecision(decision);
    decision.bs_PeriodOfBirth = 0;
    decision.modifiedField = 'skip';

    decision.save(function(err, saveDecision, numAffected){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(saveDecision);
        }
    });
    return deferred.promise;
}

//User choose to launch new product, need name validation and create related SKU
exports.create = function(decision){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    var decision = new BrandDecision(decision);
    decision.bs_PeriodOfBirth = 0;
    decision.modifiedField = 'd_BrandName';

    decision.save(function(err, saveDecision, numAffected){
        if(err){
            deferred.reject(err);
        }else{            
            deferred.resolve(saveDecision.d_BrandID);
        }
    });
    return deferred.promise;
}


exports.findAllInCompany = function(seminarId, period, companyId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    BrandDecision.find({
        seminarId: seminarId,
        period: period,
        d_CID: companyId
    })
    .sort({d_BrandID: 'asc'})
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
    BrandDecision.find({
        seminarId: seminarId,
        period: period
    })
    .sort({d_BrandID: 'asc'})
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};

exports.findOne = function(seminarId, period, companyId, brandId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    BrandDecision.findOne({
        seminarId: seminarId,
        period: period,
        d_CID: companyId,
        d_BrandID: brandId
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });

    return deferred.promise;
};

exports.updateBrand = function(seminarId, period, companyId, brandId, brand){
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
    }else if(!brand){
        deferred.reject(new Error("Invalid argument SKU."))
    }else{
        BrandDecision.findOne({
            seminarId : seminarId,
            period    : period,
            d_CID     : companyId,
            d_BrandID : brandId
        },function(err, doc) {
            if(err){ return deferred.reject(err);}

            var fields = ['d_SalesForce'];
            fields.forEach(function(field){
                if(brand[field] !== undefined){
                    doc.modifiedField = field;
                    doc[field] = brand[field];
                }
            });

            doc.save(function(err, doc){         
                if(err){ return deferred.reject(err);}
                else{ return deferred.resolve(doc);}
            });
        });
    }
    return deferred.promise;
};


/**
 * Insert empty brand decisions for all brands in the next period
 */
exports.insertEmptyBrandDecision = function(seminarId, period){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    return exports.findAllInPeriod(seminarId, period - 1)
    .then(function(allBrandDecisions){
        var p = Q();
        allBrandDecisions.forEach(function(brandDecision){
            p = p.then(function(){
                return exports.save({
                    seminarId: seminarId,
                    period: period,
                    d_CID: brandDecision.d_CID,  
                    d_BrandID: brandDecision.d_BrandID, 
                    d_BrandName: brandDecision.d_BrandName,
                    d_SKUsDecisions: brandDecision.d_SKUsDecisions
                })
            })
        });
        return p;
    })
};
