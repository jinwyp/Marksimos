var decisionAssembler = require('../dataAssemblers/decision.js');
var productPortfolioAssembler = require('../dataAssemblers/productPortfolio.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var SKUInfoAssembler = require('../dataAssemblers/SKUinfo.js');
var Q = require('q');
var logger = require('../../logger.js');

exports.getDecision = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    decisionAssembler.getDecision(seminarId, period, companyId)
    .then(function(result){
        res.send(result)
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get company data failed."});
    })
    .done();
}

exports.getProductPortfolio = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    productPortfolioAssembler.getProductPortfolioForOneCompany(seminarId, period, companyId)
    .then(function(productPortfolioForOneCompany){
        res.send(productPortfolioForOneCompany);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get product portfolio failed."});
    })
    .done();
}

exports.getSpendingDetails = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    spendingDetailsAssembler.getSpendingDetails(seminarId, period, companyId)
    .then(function(spendingDetails){
        res.send(spendingDetails);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get spending details failed."});
    })
    .done();
}


exports.getSKUInfo = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    var SKUID = req.params.sku_id;

    if(!SKUID){
        return res.send(400, {message: "Invalid parameter sku_id."});
    }

    SKUInfoAssembler.getSKUInfo(seminarId, period, companyId, SKUID)
    .then(function(SKUInfo){
        res.send(SKUInfo);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get SKUInfo failed."});
    })
    .done();
}



















