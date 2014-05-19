var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var consts = require('../consts.js');
var Q = require('q');

var tDecisionSchema = new Schema({
    seminarId: String,
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

exports.save = function(decision){
    var deferred = Q.defer();
    var decision = new Decision(decision);
    decision.save(function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(null);
        }
    });
    return deferred.promise;
};

