var chartDataModel = require('../models/chartData.js');
var util = require('util');

exports.getChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chartName;

    if(!seminarId){
        return next(new Error('seminarId cannot be empty.'));
    }

    if(!chartName){
        return next(new Error('chartName cannot be empty.'));
    }

    chartDataModel.getChartData(seminarId)
    .then(function(allCharts){
        var chart = null;
        for(var i=0; i<allCharts.charts.length; i++){
            chartName = mapChartName(chartName);
            if(allCharts.charts[i].chartName.toLowerCase() === chartName.toLowerCase()){
                chart = allCharts.charts[i];
            }
        }
        if(!chart){
            return next(new Error(util.format("chart %s does not exist.", chartName)));
        }

        res.send(chart.chartData);
    })
    .fail(function(err){
        next(err);
    });

    function mapChartName(chartName){
        chartName = chartName.toLowerCase();
        switch(chartName){
            case 'market_share_in_value':
                return 'marketShareInValue';
            case 'market_share_in_volume':
                return 'marketShareInVolume';
            case 'mind_space_share':
                return 'mindSpaceShare';
            case 'shelf_space_share':
                return 'shelfSpaceShare';
            case 'total_investment':
                return 'totalInvestment';
            case 'net_profit_by_companies':
                return 'netProfitByCompanies';
            case 'return_on_investment':
                return 'returnOnInvestment';
            case 'investments_versus_budget':
                return 'investmentsVersusBudget';
            case 'market_sales_value':
                return 'marketSalesValue';
            case 'market_sales_volume':
                return 'marketSalesVolume';
            case 'total_inventory_at_factory':
                return 'totalInventoryAtFactory';
            case 'total_inventory_at_trade':
                return 'totalInventoryAtTrade';
            case 'segmentsLeaders_by_value_price_sensitive':
                return 'segmentsLeadersByValuePriceSensitive';
            case 'segments_leaders_by_value_pretenders':
                return 'segmentsLeadersByValuePretenders';
            case 'segments_leaders_by_value_moderate':
                return 'segmentsLeadersByValueModerate';
            case 'segments_leaders_by_value_goodLife':
                return 'segmentsLeadersByValueGoodLife';
            case 'segments_leaders_by_value_ultimate':
                return 'segmentsLeadersByValueUltimate';
            case 'segments_leaders_by_value_pramatic':
                return 'segmentsLeadersByValuePramatic';
            case 'growth_rate_in_volume':
                return 'growthRateInVolume';
            case 'growth_rate_in_value':
                return 'growthRateInValue';
            case 'net_market_price':
                return 'netMarketPrice';
            case 'segment_value_share_total_market':
                return 'segmentValueShareTotalMarket';
            default:
                return '';
        }
    }
}

exports.getSegmentsLeadersByValueChart = function(req, res, next){
    var seminarId = req.session.seminarId;
    var chartName = req.params.chartName;

    if(!seminarId){
        return next(new Error('seminarId cannot be empty.'));
    }

    if(!chartName){
        return next(new Error('chartName cannot be empty.'));
    }

    chartDataModel.getChartData(seminarId)
    .then(function(chart){
        if(!chart.segmentsLeadersByValue[chartName]){
            return next(new Error(util.format("chart %s does not exist.", chartName)));
        }
        res.send(chart.segmentsLeadersByValue[chartName]);
    })
    .fail(function(err){
        next(err);
    })
}


