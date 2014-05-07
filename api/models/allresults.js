var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var allResultsSchema = new Schema({
    seminarId: String,
    allResults: []
});

var AllResults = mongoose.model("AllResults", allResultsSchema);


exports.updateAllResults = function(seminarId, allResults){
    var result = new AllResults({seminarId: seminarId, allResults: allResults});
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