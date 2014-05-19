var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tOneBrandDecisionSchema = new Schema({
    seminarId: String,
    d_BrandID       : Number,
    d_BrandName     : String,
    d_SalesForce    : Number,
    d_SKUsDecisions : [Number]  //Array of d_SKUID
});

var BrandDecision = mongoose.model('BrandDecision', tOneBrandDecisionSchema);


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
