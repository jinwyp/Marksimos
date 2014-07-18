var decisionAssembler = require('../dataAssemblers/decision.js');
var productPortfolioAssembler = require('../dataAssemblers/productPortfolio.js');
var spendingDetailsAssembler = require('../dataAssemblers/spendingDetails.js');
var SKUInfoAssembler = require('../dataAssemblers/SKUinfo.js');
var Q = require('q');
var logger = require('../../common/logger.js');
var seminarModel = require('../models/seminar.js');
var utility = require('../../common/utility.js');
var gameParameters = require('../gameParameters.js').parameters;
var simulationResultModel = require('../models/simulationResult.js');


exports.getDecision = function(req, res, next){
    var seminarId = req.session.seminarId;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }
    
    var period = req.session.currentPeriod;
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

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
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

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
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

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    var period = req.session.currentPeriod;
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

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }
    
    var period = req.session.currentPeriod;
    var companyId = req.session.companyId;

    Q.all([
        spendingDetailsAssembler.getSpendingDetails(seminarId, period, companyId),
        simulationResultModel.findOne(seminarId, period)
    ])
    .spread(function(spendingDetails, lastPeriodResult){
        var totalInvestment = spendingDetails.companyData.totalInvestment;
        var companyResult = utility.findCompany(lastPeriodResult, companyId);

        var totalAvailableBudget = parseFloat(
                (
                    (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments - totalInvestment
                    ) / (companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments)
                ).toFixed(2)
            );
        var totalAvailableBudgetValue = companyResult.c_TotalInvestmentBudget - companyResult.c_CumulatedInvestments - totalInvestment;

        var normalCapacity = parseFloat((spendingDetails.companyData.normalCapacity/companyResult.c_Capacity).toFixed(2));
        var normalCapacityValue = spendingDetails.companyData.normalCapacity;
        
        var overtimeCapacity = parseFloat(((companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity +  spendingDetails.companyData.normalCapacity
            )/ companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity).toFixed(2));
        var overtimeCapacityValue = companyResult.c_Capacity * gameParameters.pgen.firm_OvertimeCapacity +  spendingDetails.companyData.normalCapacity;

        res.send({
            totalAvailableBudget: totalAvailableBudget,
            normalCapacity: normalCapacity,
            overtimeCapacity: overtimeCapacity,
            totalAvailableBudgetValue: totalAvailableBudgetValue,
            normalCapacityValue: normalCapacityValue,
            overtimeCapacityValue: overtimeCapacityValue
        });
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get otherInfo failed."})
    })
    .done();
}

















