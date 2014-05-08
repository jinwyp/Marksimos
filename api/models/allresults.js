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
    var deferred = Q.defer();
    result.save(function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(allResults);
        }
        
    });
    return deferred.promise;
};