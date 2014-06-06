var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var allResultsModel = require('../models/allResults.js');
var Q = require('q');
var logger = require('../../logger.js');

exports.companyData = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    Q.all([
        companyDecisionModel.findOne(seminarId, period, companyId),
        brandDecisionModel.findAll(seminarId, period, companyId),
        SKUDecisionModel.findAllInCompany(seminarId, period, companyId),
        allResultsModel.findOne(seminarId)
    ])
    .spread(function(companyDecision, brandDecisionList, SKUDecisionList, allResults){
        companyDecision = JSON.parse(JSON.stringify(companyDecision));
        brandDecisionList = JSON.parse(JSON.stringify(brandDecisionList));
        SKUDecisionList = JSON.parse(JSON.stringify(SKUDecisionList));

        //combine decisions
        var result = {};

        result.decision = {};

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
  
        result.decision.companyDecision = companyDecision;
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get company data failed."});
    });
}
