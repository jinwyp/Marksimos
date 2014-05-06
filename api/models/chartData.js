var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');


var seminarChartSchema = new Schema({
    seminarId: String,
    marketShareInValue: String,
    marketShareInVolume: String,
    mindSpaceShare: String,
    shelfSpaceShare: String,
    totalInvestment: String,
    netProfitByCompanies: String,
    returnOnInvestment: String,
    investmentsVersusBudget: String,
    marketSalesValue: String,
    marketSalesVolume: String,
    totalInventoryAtFactory: String,
    totalInventoryAtTrade: String
});


var SeminarChart = mongoose.model('ChartData', seminarChartSchema);


exports.updateChartData = function(chartData){
    var deferred = Q.defer();
    var c = new SeminarChart(chartData);
    c.save(function(err){
        if(err) return deferred.reject(err);
        return deferred.resolve(null);
    })
    //return Q.nfcall(c.save, chartData);
    return deferred.promise;
}