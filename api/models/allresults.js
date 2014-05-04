var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var allResultSchema = new Schema({
    seminarId: String,
    allResult: []
});

var AllResults = mongoose.model("AllResult", allResultSchema);


exports.updateAllResults = function(seminarId, allResult){
    var result = new AllResults({seminarId: seminarId, allResult: allResult});
    result.save(function(err){
        var deferred = Q.defer();
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(null);
        }
        return deferred.promise;
    });
};