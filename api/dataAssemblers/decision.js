var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var Q = require('q');

exports.getDecision = function(seminarId, period, companyId){
    return Q.all([
        companyDecisionModel.findOne(seminarId, period, companyId),
        brandDecisionModel.findAllInCompany(seminarId, period, companyId),
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

/**
 * @param {Number} period current period
 *
 */
exports.insertEmptyDecision = function(seminarId, period){

}

/**
 * Insert empty company decisions for all companies in the next period
 */
function insertEmptyCompanyDecision(seminarId, period){
    //find all company decisions in the last period
    companyDecisionModel.findAllInPeriod(seminarId, period - 1)
    .then(function(allCompanyDecisions){
        var p = Q();
        allCompanyDecisions.forEach(function(companyDecision){
            companyDecisionModel.save({
                seminarId: seminarId,
                period: period,
                d_CID: companyDecision.d_CID,   
                d_CompanyName: companyDecision.d_CompanyName
            })
        })
    })
}

/**
 * Insert empty brand decisions for all brands in the next period
 */
function insertEmptyBrandDecision(){

}

/**
 * Insert empty SKU decisions for all SKUs in the next period
 */
function insertEmptySKUDecision(){

}