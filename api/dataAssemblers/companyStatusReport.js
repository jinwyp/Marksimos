var preGeneratedDataModel = require('../models/preGeneratedData.js');
var Q = require('q');
var utility = require('../utility.js');
var consts = require('../consts.js');

exports.getCompanyStatusReport = function(allResults){
    var result = {
        company: {},
        brand: {},
        SKU: {}
    };

    result.company = generateCompanyReport(allResults);

    return result;
}

function generateCompanyReport(allResults){
    var allCompanyReport = [];
    allResults[0].p_Companies.forEach(function(company){
        if(!isCompanyExist(company.c_CompanyID, allCompanyReport)){
            allCompanyReport.push({
                companyId: company.c_CompanyID
            })
        }
    })

    allCompanyReport.forEach(function(companyReport){
        allResults.forEach(function(onePeriodResult){
            for(var i=0; i<onePeriodResult.p_Companies.length; i++){
                var companyResult = onePeriodResult.p_Companies[i];
                if(companyResult.c_CompanyID === companyReport.companyId){
                    if(!companyReport.marketShare){
                        companyReport.marketShare = [];
                    }
                    companyReport.marketShare.push(companyResult.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1]);
                    break;
                }
            }
        })
    })

    return allCompanyReport;

    function isCompanyExist(companyId, allCompanyReport){
        return allCompanyReport.some(function(companyReport){
            return companyReport.companyId === companyId;
        })
    }
}