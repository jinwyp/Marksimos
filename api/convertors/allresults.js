/*
所有chart和report数据
*/
var consts = require('../consts.js');
var config = require('../config.js');

//Market Share
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

//Investment and Profits
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
    var companyNum = allResults[allResults.length - 1].onePeriodResult.p_Market.m_CompaniesCount;

    var result = {};

    for (var i = 0; i < allResults.length; i++) {
        var period = allResults[i].onePeriodResult;

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

//Market Sales and Inventory
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

//segment leader top 5
exports.segmentsLeadersByValue = function(allResults, segment){
    var currentPeriodIndex = allResults.length-1;
    var currentPeriodResult = allResults[currentPeriodIndex].onePeriodResult;

    var segmentNameAndIndex = config.segmentNameAndIndex;

    var segmentIndex = segmentNameAndIndex[segment];

    var valueSegmentShare = currentPeriodResult.p_SKUs.map(function(SKU){
        var brand = findBrand(currentPeriodResult, SKU.u_ParentBrandID);
        var brandName = brand.b_BrandName;

        var SKUName = brandName + SKU.u_SKUName;
        return {
            SKUName: SKUName,
            valueSegmentShare: SKU.u_ValueSegmentShare[segmentIndex]
        };
    });

    valueSegmentShare.sort(function(a, b){
        return b.valueSegmentShare - a.valueSegmentShare;
    })

    return valueSegmentShare.slice(0, 5);
}

//Market evolution
exports.growthRateInVolume = function(allResults){
    return extractMarketEvolutionChartData(allResults, function(market){
        return market.m_ChangeInVolume;
    });
};

exports.growthRateInValue = function(allResults){
    return extractMarketEvolutionChartData(allResults, function(market){
        return market.m_ChangeInValue;
    });
};

exports.netMarketPrice = function(allResults){
    return extractMarketEvolutionChartData(allResults, function(market){
        return market.m_ChangeInNetMarketPrice;
    });
};

exports.segmentValueShareTotalMarket = function(allResults){
    var currentPeriodIndex = allResults.length-1;
    var period = allResults[currentPeriodIndex].onePeriodResult;
    var market = period.p_Market;

    //there are only 6 segments
    var segmentNum = consts.ConsumerSegmentsMaxTotal - 1; 
    var segmentNames = config.segmentNames;

    var results = {
        segmentNames: [],
        charData: []
    };
    
    for(var i=0; i<segmentNum; i++){
        var segmentName = segmentNames[i];
        results.segmentNames.push(segmentName);
        results.charData.push(market.m_ValueSegmentShare[i]);
    }
    return results;
}

/**
 * Generate perception map chart
 * 
 * @method perceptionMap
 * @param {Object} exogenous parameters of the game
 */
exports.perceptionMap = function(allResults, exogenous){
    var periodResult = allResults[allResults.length-1].onePeriodResult;

    var result = [];
    for(var i=0; i < periodResult.p_Companies.length; i++){
        var company = periodResult.p_Companies[i];
        var companyName = company.c_CompanyName;
        var companyData = {
            companyName: companyName,
            brands: [],
            SKUs: [],
            exogenous: []
        };
        
        for(var j=0; j<periodResult.p_Brands.length; j++){
            var brand = periodResult.p_Brands[j];
            if(company.c_CompanyID === brand.b_ParentCompanyID){
                companyData.brands.push({
                    brandName: brand.b_BrandName,
                    imagePerception: brand.b_Perception[1],
                    valuePerception: brand.b_Perception[0]
                })
            }
        }

        for(var k=0; k<periodResult.p_SKUs.length; k++){
            var SKU = periodResult.p_SKUs[k];
            if(company.c_CompanyID === SKU.u_ParentCompanyID){
                companyData.SKUs.push({
                    SKUName: SKU.u_SKUName,
                    imagePerception: SKU.u_Perception[1],
                    valuePerception: SKU.u_Perception[0]
                })
            }
        }

        var exoSegmentsIdealPoints = exogenous.exo_SegmentsIdealPoints;
        for(var p=0; p<exoSegmentsIdealPoints.length; p++){
            var point = exoSegmentsIdealPoints[p];
            companyData.exogenous.push({
                segmentName: config.segmentNames[p],
                imagePerception: point[1],
                valuePerception: point[0]
            });
        }

        result.push(companyData);
    }
    return result;
}

/**
 * Helper function for some charts
 *
 * @method generateChartData
 * @param {Object} the JSON object got from allresults CGI
 * @param {Function} the function to get a certain field of JSON object
 * @return {Object} chart data
 */
function generateChartData(allResults, dataExtractor){
    var lastPeriodResult = allResults[allResults.length - 1].onePeriodResult;
    var companyNum = lastPeriodResult.p_Market.m_CompaniesCount;

    var result = {
        periods: [],
        companyNames: [],
        chartData: []
    };

    for (var i = 0; i < allResults.length; i++) {
        var period = allResults[i].onePeriodResult;
        var periodId = allResults[i].periodId;

        result.periods.push(periodId);
        var periodChartData = [];
        for (var j = 0; j < companyNum; j++) {
            var company = period.p_Companies[j];

            var companyName = company.c_CompanyName;
            if(result.companyNames.indexOf(companyName) === -1){
                result.companyNames.push(companyName);
            }

            periodChartData.push(dataExtractor(company));
        }
        result.chartData.push(periodChartData);
    }

    //throw new Error("some errros");

    return result;
}

/**
 * Helper function to generate MarketEvolution chart
 *
 * @method extractMarketEvolutionChartData
 * @param {Object} allResults the JSON object got from allresults CGI
 * @param {Function} dataExtractor the function to get a certain field of JSON object
 * @return {Object} chart data
 */
function extractMarketEvolutionChartData(allResults, dataExtractor){
    var segmentNum = consts.ConsumerSegmentsMaxTotal;
    var periodNum = allResults.length;
    var segmentNameAndIndex = config.segmentNameAndIndex;
    var segmentNames = config.segmentNames;

    var result = {
        periods: [],
        segmentNames: [],
        chartData: []
    };

    for(var i=0; i<periodNum; i++){
        var periodResult = allResults[i].onePeriodResult;
        var periodId = allResults[i].periodId;

        var market = periodResult.p_Market;

        result.periods.push(periodId);
        var segmentChartData = [];
        for(var j=0; j<segmentNum; j++){
            var segmentName = segmentNames[j];
            if(result.segmentNames.indexOf(segmentName) === -1){
                result.segmentNames.push(segmentName);
            }
            segmentChartData.push(dataExtractor(market)[j]);
        }
        result.chartData.push(segmentChartData);
    }
    return result;
}

/**
 * Find brand by brandId
 *
 * @method findBrand
 * @param {Object} currentPeriodResult data from allResults
 * @param {Function} u_ParentBrandID
 * @return {Object} the brand data from allResults
 */
function findBrand(currentPeriodResult, u_ParentBrandID){
    for(var i=0; i<currentPeriodResult.p_Brands.length; i++){
        var brand = currentPeriodResult.p_Brands[i];
        if(brand.b_BrandID === u_ParentBrandID){
            return brand;
        }
    }
}










