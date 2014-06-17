var decisionAssembler = require('../dataAssemblers/decision.js');
var productPortfolioAssembler = require('../dataAssemblers/productPortfolio.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var SKUInfoAssembler = require('../dataAssemblers/SKUinfo.js');
var Q = require('q');
var logger = require('../../logger.js');
var seminarModel = require('../models/seminar.js');
var utility = require('../utility.js');
var gameParameters = require('../gameParameters.js').parameters;

exports.getDecision = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period - 1;
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


exports.getOtherinfo = function(req, res, next){
    var seminarId = req.session.seminarId;
    var period = req.session.period;
    var companyId = req.session.companyId;

    Q.all([
        spendingDetailsAssembler.getSpendingDetails(seminarId, period, companyId),
        seminarModel.findOne(seminarId)
    ])
    .spread(function(spendingDetails, seminar){
        var totalInvestment = spendingDetails.companyData.totalInvestment;
        var lastPeriodResult = seminar.allResults[seminar.allResults.length-1];
        var companyResult = utility.findCompany(lastPeriodResult, companyId);

        var totalAvailableBudget = parseFloat(
                (
                    (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments - totalInvestment
                    ) / (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments)
                ).toFixed(2)
            );

        console.log(companyResult.c_TotalInvestmentBudget );
        console.log(companyResult.c_CumulatedInvestments);
        console.log(totalInvestment);

        var normalCapacity = parseFloat((spendingDetails.companyData.normalCapacity/companyResult.c_Capacity).toFixed(2));
        
        var overtimeCapacity = parseFloat(((companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity +  spendingDetails.companyData.normalCapacity
            )/ companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity).toFixed(2));

        res.send({
            totalAvailableBudget: totalAvailableBudget,
            normalCapacity: normalCapacity,
            overtimeCapacity: overtimeCapacity
        });
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get otherInfo failed."})
    })
    .done();
}



















