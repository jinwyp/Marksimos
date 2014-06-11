var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var Q = require('q');

exports.getDecision = function(seminarId, period, companyId){
    return Q.all([
        companyDecisionModel.findOne(seminarId, period, companyId),
        brandDecisionModel.findAll(seminarId, period, companyId),
        SKUDecisionModel.findAllInCompany(seminarId, period, companyId)
    ])
    .spread(function(companyDecision, brandDecisionList, SKUDecisionList){
        companyDecision = JSON.parse(JSON.stringify(companyDecision));
        brandDecisionList = JSON.parse(JSON.stringify(brandDecisionList));
        SKUDecisionList = JSON.parse(JSON.stringify(SKUDecisionList));
        
        //combine decisions
        brandDecisionList.forEach(function(brandDecision){
            var tempSKUDecisionList = [];
            for(var i=0; i<SKUDecisionList.length; i++){
                var SKUDecision = SKUDecisionList[i];
                if(SKUDecision.d_BrandID === brandDecision.d_BrandID){
                    tempSKUDecisionList.push(SKUDecision);
                }
            }
            brandDecision.d_SKUsDecisions = tempSKUDecisionList;
        })

        companyDecision.d_BrandsDecisions = brandDecisionList;

        return companyDecision; 
    });
}