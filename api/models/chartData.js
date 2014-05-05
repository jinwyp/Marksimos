var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');


var chartDataSchema = new Schema({
    seminarId: String,
    marketShareInValue: String,
    marketShareInVolume: String,
    mindSpaceShare: String,
    shelfSpaceShare: String
});


var ChartData = mongoose.model('ChartData', chartDataSchema);


exports.updateChartData = function(chartData){
    var deferred = Q.defer();
    var c = new ChartData(chartData);
    c.save(function(err){
        if(err) return deferred.reject(err);
        return deferred.resolve(null);
    })
    //return Q.nfcall(c.save, chartData);
    return deferred.promise;
}