var companyDecisionModel = require('./companyDecision.js');
var brandDecisionModel = require('./brandDecision.js');
var SKUDecisionModel = require('./SKUDecision.js');
var decisionAssembler = require('../dataAssemblers/decision.js');
var Q = require('q');

/**
 * @param {Number} period current period
 *
 */
exports.insertEmptyDecision = function(seminarId, period){
    return Q.all([
        companyDecisionModel.insertEmptyCompanyDecision(seminarId, period),
        brandDecisionModel.insertEmptyBrandDecision(seminarId, period),
        SKUDecisionModel.insertEmptySKUDecision(seminarId, period)
    ])
}

/* decisions start */
exports.removeExistedDecisions = function(seminarId){
    return Q.all([
            companyDecisionModel.removeAll(seminarId),
            brandDecisionModel.removeAll(seminarId),
            SKUDecisionModel.removeAll(seminarId)
        ]);
}

/**
 * Split allDecisions into companyDecision, brandDecison, and SKUDecision,
 * then save them to db
 *
 */
exports.saveDecision = function(seminarId, allDecisions){
    var p = Q();
    allDecisions.forEach(function(decision){
        p = p.then(function(){
            return Q.all([
                exports.saveCompanyDecision(decision, seminarId, decision.period),
                exports.saveBrandDecision(decision, seminarId, decision.period),
                exports.saveSKUDecision(decision, seminarId, decision.period)
            ]);
        })
    })
    return p;
}

exports.saveCompanyDecision = function(decision, seminarId, period){
    var companyDecision = decisionAssembler.getCompanyDecision(decision);
    companyDecision.seminarId = seminarId;
    companyDecision.period = period;

    return companyDecisionModel.save(companyDecision);
}

exports.saveBrandDecision = function(decision, seminarId, period){
    var brandDecisions = decisionAssembler.getBrandDecisions(decision);

    var d = Q();
    brandDecisions.forEach(function(brandDecision){
        brandDecision.seminarId = seminarId;
        brandDecision.period = period;
        d = d.then(function(){
            return brandDecisionModel.initCreate(brandDecision)
        });
    });
    return d;
}

exports.saveSKUDecision = function(decision, seminarId, period){
    var SKUDecisions = decisionAssembler.getSKUDecisions(decision);
    var d = Q();

    SKUDecisions.forEach(function(SKUDecision){
        SKUDecision.seminarId = seminarId;
        SKUDecision.period = period;
        d = d.then(function(){
            return SKUDecisionModel.initCreate(SKUDecision)
        })
    });
    
    return d;
}














