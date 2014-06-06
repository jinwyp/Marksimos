var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

/*
 * allResults : {
    periodId: -3,
    onePeriodResult: {}
 }
 */
var allResultsSchema = new Schema({
    seminarId: String,
    allResults: []
});

var AllResults = mongoose.model("AllResults", allResultsSchema);

exports.remove = function(seminarId){
    return AllResults.remove({seminarId: seminarId}).exec()
};


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

exports.findOne = function(seminarId){
    var deferred = Q.defer();

    if(!seminarId){
        deferred.reject(new Error("Invalid argument seminarId."));
    }else{
        AllResults.findOne({
            seminarId: seminarId
        },
        function(err, result){
            if(err) return deferred.reject(err);

            return deferred.resolve(result);
        })
    }

    return deferred.promise;
};