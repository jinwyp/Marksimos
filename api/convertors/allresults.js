/*
所有chart和report数据
*/
var consts = require('../consts.js');

function generateChartData(allResults, dataExtractor){
    var companyNum = allResults[allResults.length - 1].p_Market.m_CompaniesCount;

    var result = {};

    for (var i = 0; i < allResults.length; i++) {
        var period = allResults[i];

        for (var j = 0; j < companyNum; j++) {
            var company = period.p_Companies[j];

            var companyName = company.c_CompanyName;

            if (!result[companyName]) {
                result[companyName] = [];
            }
            result[companyName].push(dataExtractor(company));
        }
    }

    return result;
}

exports.marketShareInValue = function(allResults) {
    return generateChartData(allResults, function(company){
        return company.c_ValueSegmentShare[consts.ConsumerSegmentsMaxTotal-1];
    })
}


exports.marketShareInVolume = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_VolumeSegmentShare[consts.ConsumerSegmentsMaxTotal-1];
    })
}

exports.mindSpaceShare = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_MindSpaceShare;
    })
}

exports.shelfSpaceShare = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_ShelfSpace;
    })
}

exports.totalInvestment = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_TotalSpending;
    })
}

exports.netProfitByCompanies = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_NetProfit;
    })
}

exports.returnOnInvestment = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_ReturnOnInvestment;
    })
}

exports.investmentsVersusBudget = function(allResults, seminarSetting){
    var companyNum = allResults[allResults.length - 1].p_Market.m_CompaniesCount;

    var result = {};

    for (var i = 0; i < allResults.length; i++) {
        var period = allResults[i];

        for (var j = 0; j < companyNum; j++) {
            var company = period.p_Companies[j];

            var companyName = company.c_CompanyName;

            if (!result[companyName]) {
                result[companyName] = [];
            }

            var percentage = (i+1)/seminarSetting.simulationSpan
                * (company.c_TotalInvestmentBudget - company.c_FutureXtraBudget);
            if(percentage > 0){
                percentage = company.c_CumulatedInvestments / percentage * 100;
            }else{
                percentage = 0;
            }
            result[companyName].push(percentage);
        }
    }

    return result;
}


exports.marketSalesValue = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_MarketSalesValue[consts.ConsumerSegmentsMaxTotal-1];
    })
}

exports.marketSalesVolume = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_MarketSalesVolume[consts.ConsumerSegmentsMaxTotal-1];
    })
}

exports.totalInventoryAtFactory = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_FactoryStocks[consts.StocksMaxTotal].s_Volume;
    })
}

exports.totalInventoryAtTrade = function(allResults){
    return generateChartData(allResults, function(company){
        return company.c_RetailStocks[consts.StocksMaxTotal].s_Volume + 
            company.c_WholesalesStocks[consts.StocksMaxTotal].s_Volume;
    })
}

exports.segmentsLeadersByValue = function(allResults, segment){
    var currentPeriodIndex = allResults.length-1;
    var currentPeriodAllResults = allResults[currentPeriodIndex];

    var segmentNameAndIndex = {
        'priceSensitive':0, 
        'pretenders': 1,
        'moderate': 2,
        'goodLife': 3,
        'ultimate': 4,
        'pramatic': 5
    };

    var segmentIndex = segmentNameAndIndex[segment];

    var valueSegmentShare = currentPeriodAllResults.p_SKUs.map(function(SKU){
        //SKU.u_ParentBrandIndx是从1开始的index, 所以需要减1
        var brand = currentPeriodAllResults.p_Brands[SKU.u_ParentBrandIndx-1];
        var brandName = brand.b_BrandName;

        var SKUName = brandName + SKU.u_SKUName;
        return {
            SKUName: SKUName,
            valueSegmentShare: SKU.u_ValueSegmentShare[segmentIndex]
        };
    });

    valueSegmentShare.sort(function(a, b){
        return a.valueSegmentShare - b.valueSegmentShare;
    })

    return valueSegmentShare.slice(0, 5);
}











