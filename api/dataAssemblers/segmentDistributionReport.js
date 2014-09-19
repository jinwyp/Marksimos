exports.getSegmentDistributionReport = function(allResults, allExogenous){
    var segmentDistributionReport = {};

    segmentDistributionReport.averageNetMarketPriceStdPack = generateAverageNetMarketPriceStdPackReport(allResults);
    
    var periods = allResults.map(function(item){return item.period;});
    segmentDistributionReport.imagePerception = generateImagePerceptionReport(allExogenous, periods);
    segmentDistributionReport.valuePerception = generateValuePerceptionReport(allExogenous, periods);
    
    segmentDistributionReport.marketSaleValue = generateMarketSaleValueReport(allResults);
    segmentDistributionReport.marketSaleVolume = generateMarketSaleVolumeReport(allResults);;

    segmentDistributionReport.marketShareValue = generateMarketShareValueReport(allResults);
    segmentDistributionReport.marketShareVolume = genereateMarketShareVolumeReport(allResults);

    return segmentDistributionReport;
}

function generateAverageNetMarketPriceStdPackReport(allResults){
    var result = [];

    for(var i=0; i<allResults.length; i++){
        var onePeriodResult = allResults[i];

        result.push({
            period:  onePeriodResult.period,
            priceSensitive: onePeriodResult.p_Market.m_AverageNetMarketPrice[0],
            pretenders: onePeriodResult.p_Market.m_AverageNetMarketPrice[1],
            moderate: onePeriodResult.p_Market.m_AverageNetMarketPrice[2],
            goodLife: onePeriodResult.p_Market.m_AverageNetMarketPrice[3],
            ultimate: onePeriodResult.p_Market.m_AverageNetMarketPrice[4],
            pragmatic: onePeriodResult.p_Market.m_AverageNetMarketPrice[5],
            allSegments: onePeriodResult.p_Market.m_AverageNetMarketPrice[6]
        })
    }

    return result;
}

function generateImagePerceptionReport(allExogenous, periods){
    var result = [];

    for(var i=0; i<allExogenous.length; i++){
        var onePeriodExogenous = allExogenous[i];

        result.push({
            period:  periods[i],
            priceSensitive: onePeriodExogenous.exo_SegmentsIdealPoints[0][1],
            pretenders: onePeriodExogenous.exo_SegmentsIdealPoints[1][1],
            moderate: onePeriodExogenous.exo_SegmentsIdealPoints[2][1],
            goodLife: onePeriodExogenous.exo_SegmentsIdealPoints[3][1],
            ultimate: onePeriodExogenous.exo_SegmentsIdealPoints[4][1],
            pragmatic: onePeriodExogenous.exo_SegmentsIdealPoints[5][1],
            allSegments: 0
        })
    }

    return result;
}

function generateValuePerceptionReport(allExogenous, periods){
    var result = [];

    for(var i=0; i<allExogenous.length; i++){
        var onePeriodExogenous = allExogenous[i];

        result.push({
            period:  periods[i],
            priceSensitive: onePeriodExogenous.exo_SegmentsIdealPoints[0][0],
            pretenders: onePeriodExogenous.exo_SegmentsIdealPoints[1][0],
            moderate: onePeriodExogenous.exo_SegmentsIdealPoints[2][0],
            goodLife: onePeriodExogenous.exo_SegmentsIdealPoints[3][0],
            ultimate: onePeriodExogenous.exo_SegmentsIdealPoints[4][0],
            pragmatic: onePeriodExogenous.exo_SegmentsIdealPoints[5][0],
            allSegments: 0
        })
    }

    return result;
}

function generateMarketSaleVolumeReport(allResults){
    var result = [];

    for(var i=0; i<allResults.length; i++){
        var onePeriodResult = allResults[i];

        result.push({
            period:  onePeriodResult.period,
            priceSensitive: onePeriodResult.p_Market.m_SegmentsSalesVolume[0],
            pretenders: onePeriodResult.p_Market.m_SegmentsSalesVolume[1],
            moderate: onePeriodResult.p_Market.m_SegmentsSalesVolume[2],
            goodLife: onePeriodResult.p_Market.m_SegmentsSalesVolume[3],
            ultimate: onePeriodResult.p_Market.m_SegmentsSalesVolume[4],
            pragmatic: onePeriodResult.p_Market.m_SegmentsSalesVolume[5],
            allSegments: onePeriodResult.p_Market.m_SegmentsSalesVolume[6]
        })
    }

    return result;
}

function generateMarketSaleValueReport(allResults){
    var result = [];

    for(var i=0; i<allResults.length; i++){
        var onePeriodResult = allResults[i];

        result.push({
            period:  onePeriodResult.period,
            priceSensitive: onePeriodResult.p_Market.m_SegmentsNetSalesValue[0],
            pretenders: onePeriodResult.p_Market.m_SegmentsNetSalesValue[1],
            moderate: onePeriodResult.p_Market.m_SegmentsNetSalesValue[2],
            goodLife: onePeriodResult.p_Market.m_SegmentsNetSalesValue[3],
            ultimate: onePeriodResult.p_Market.m_SegmentsNetSalesValue[4],
            pragmatic: onePeriodResult.p_Market.m_SegmentsNetSalesValue[5],
            allSegments: onePeriodResult.p_Market.m_SegmentsNetSalesValue[6]
        })
    }

    return result;
}


function generateMarketShareValueReport(allResults){
    var result = [];

    for(var i=0; i<allResults.length; i++){
        var onePeriodResult = allResults[i];

        result.push({
            period:  onePeriodResult.period,
            priceSensitive: onePeriodResult.p_Market.m_ValueSegmentShare[0],
            pretenders: onePeriodResult.p_Market.m_ValueSegmentShare[1],
            moderate: onePeriodResult.p_Market.m_ValueSegmentShare[2],
            goodLife: onePeriodResult.p_Market.m_ValueSegmentShare[3],
            ultimate: onePeriodResult.p_Market.m_ValueSegmentShare[4],
            pragmatic: onePeriodResult.p_Market.m_ValueSegmentShare[5],
            allSegments: onePeriodResult.p_Market.m_ValueSegmentShare[6]
        })
    }

    return result;
}


function genereateMarketShareVolumeReport(allResults){
    var result = [];

    for(var i=0; i<allResults.length; i++){
        var onePeriodResult = allResults[i];

        result.push({
            period:  onePeriodResult.period,
            priceSensitive: onePeriodResult.p_Market.m_VolumeSegmentShare[0],
            pretenders: onePeriodResult.p_Market.m_VolumeSegmentShare[1],
            moderate: onePeriodResult.p_Market.m_VolumeSegmentShare[2],
            goodLife: onePeriodResult.p_Market.m_VolumeSegmentShare[3],
            ultimate: onePeriodResult.p_Market.m_VolumeSegmentShare[4],
            pragmatic: onePeriodResult.p_Market.m_VolumeSegmentShare[5],
            allSegments: onePeriodResult.p_Market.m_VolumeSegmentShare[6]
        })
    }

    return result;
}





















