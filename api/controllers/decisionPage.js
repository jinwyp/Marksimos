var companyDecisionModel = require('../models/companyDecision.js');
var brandDecisionModel = require('../models/brandDecision.js');
var SKUDecisionModel = require('../models/SKUDecision.js');
var seminarModel = require('../models/seminar.js');
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
        seminarModel.getProductPortfolio(seminarId, companyId)
    ])
    .spread(function(companyDecision, brandDecisionList, SKUDecisionList, productPortfolio){
        companyDecision = JSON.parse(JSON.stringify(companyDecision));
        brandDecisionList = JSON.parse(JSON.stringify(brandDecisionList));
        SKUDecisionList = JSON.parse(JSON.stringify(SKUDecisionList));
        productPortfolio = JSON.parse(JSON.stringify(productPortfolio));

        //combine decisions
        var result = {};

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
  
        result.companyDecision = companyDecision;
        result.productPortfolio = productPortfolio.productPortfolioForOneCompany;

        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get company data failed."});
    });
}
