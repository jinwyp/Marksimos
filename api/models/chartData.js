var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');


var seminarChartSchema = new Schema({
    seminarId: String,
    charts: []
    // marketShareInValue: String,
    // marketShareInVolume: String,
    // mindSpaceShare: String,
    // shelfSpaceShare: String,

    // totalInvestment: String,
    // netProfitByCompanies: String,
    // returnOnInvestment: String,
    // investmentsVersusBudget: String,

    // marketSalesValue: String,
    // marketSalesVolume: String,
    // totalInventoryAtFactory: String,
    // totalInventoryAtTrade: String,

    // segmentsLeadersByValue: {
    //     'priceSensitive': String,
    //     'pretenders': String,
    //     'moderate': String,
    //     'goodLife': String,
    //     'ultimate': String,
    //     'pramatic': String
    // },

    // growthRateInVolume: String,
    // growthRateInValue: String,
    // netMarketPrice: String,
    // segmentValueShareTotalMarket: String
});


var SeminarChart = mongoose.model('ChartData', seminarChartSchema);

exports.removeChartData = function(seminarId){
    var deferred = Q.defer();

    SeminarChart.remove({seminarId: seminarId}, function(err){
        if(err) return deferred.reject(err);

        return deferred.resolve(null);
    })
    return deferred.promise;
}

exports.saveChartData = function(chartData){
    var deferred = Q.defer();
    var c = new SeminarChart(chartData);
    c.save(function(err){
        if(err) return deferred.reject(err);
        return deferred.resolve(null);
    })
    //return Q.nfcall(c.save, chartData);
    return deferred.promise;
}

exports.getChartData = function(seminarId){
    var deferred = Q.defer();
    SeminarChart.findOne({seminarId: seminarId}, function(err, chart){
        if(err) return defer.reject(err);

        return deferred.resolve(chart);
    })
    return deferred.promise;
}