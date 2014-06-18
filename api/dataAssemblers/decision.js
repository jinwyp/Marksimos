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
                console.log(typeof brandDecision.d_BrandID);
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
    insertEmptyCompanyDecision(seminarId, period);
    insertEmptyBrandDecision(seminarId, period);
    insertEmptySKUDecision(seminarId, period);
}

/**
 * Insert empty company decisions for all companies in the next period
 */
function insertEmptyCompanyDecision(seminarId, period){
    //find all company decisions in the last period
    return companyDecisionModel.findAllInPeriod(seminarId, period - 1)
    .then(function(allCompanyDecisions){
        var p = Q();
        allCompanyDecisions.forEach(function(companyDecision){
            p = p.then(function(){
                return companyDecisionModel.save({
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

/**
 * Insert empty brand decisions for all brands in the next period
 */
function insertEmptyBrandDecision(seminarId, period){
    return brandDecisionModel.findAllInPeriod(seminarId, period - 1)
    .then(function(allBrandDecisions){
        var p = Q();
        allBrandDecisions.forEach(function(brandDecision){
            p = p.then(function(){
                return brandDecisionModel.save({
                    seminarId: seminarId,
                    period: period,
                    d_CID: brandDecision.d_CID,  
                    d_BrandID: brandDecision.d_BrandID, 
                    d_BrandName: brandDecision.d_BrandName,
                    d_SKUsDecisions: brandDecision.d_SKUsDecisions
                })
            })
        })
        return p;
    })
}

/**
 * Insert empty SKU decisions for all SKUs in the next period
 */
function insertEmptySKUDecision(seminarId, period){
    return SKUDecisionModel.findAllInPeriod(seminarId, period-1)
    .then(function(allSKUDecisions){
        var p = Q();
        allSKUDecisions.forEach(function(SKUDecision){
            p = p.then(function(){
                return SKUDecisionModel.save({
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




