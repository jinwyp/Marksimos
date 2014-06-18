var preGeneratedDataModel = require('../models/preGeneratedData.js');
var Q = require('q');

exports.getCompanyStatusReport = function(seminarId){
    return Q.all([
        preGeneratedDataModel.findOne(seminarId)
    ])
    .spread(function(preGeneratedData){
        var allResults = preGeneratedData.allResults;

        var result = {
            company: {},
            brand: {},
            SKU: {}
        };


    })
}

function generateCompanyReport(allResults){
    var companyReport = [];

    allResults.forEach(function(onePeriodResult){
        var onePeriodCompanyReport = {};

        onePeriodCompanyReport.period = onePeriodResult.period;

        onePeriodCompanyReport. = ;
    })
}