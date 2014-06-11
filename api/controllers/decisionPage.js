var decisionAssembler = require('../dataAssemblers/decision.js');
var productPortfolioAssembler = require('../dataAssemblers/productPortfolio.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
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
}
