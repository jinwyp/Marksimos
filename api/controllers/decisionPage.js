var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var Q = require('q');
var logger = require('../../logger.js');

exports.companyData = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    Q.all([
        companyDecisionModel.findOne(seminarId, period, companyId),
        brandDecisionModel.findAll(seminarId, period, companyId),
        SKUDecisionModel.findAllInCompany(seminarId, period, companyId)
    ])
    .spread(function(companyDecision, brandDecisionList, SKUDecisionList){
        companyDecision = JSON.parse(JSON.stringify(companyDecision));
        brandDecisionList = JSON.parse(JSON.stringify(brandDecisionList));
        SKUDecisionList = JSON.parse(JSON.stringify(SKUDecisionList));

        //combine decisions
        var result = {};

        result.decision = {};

        for(var i=0; i<brandDecisionList.length; i++){
            brandDecisionList[i].d_SKUsDecisions = findSKUDecision(brandDecisionList[i].d_BrandID, SKUDecisionList);
        }

        companyDecision.d_BrandsDecisions = brandDecisionList;
  
        result.decision.companyDecision = companyDecision;
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get company data failed."});
    });

    function findSKUDecision(brandId, SKUDecisionList){
        return SKUDecisionList.filter(function(item){
            return item.d_BrandID === brandId;
        })
    }
}