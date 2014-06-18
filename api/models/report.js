var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var reportSchema = new Schema({
    seminarId: String,
    companyStatus: {}
});


var Report = mongoose.model("Report", reportSchema);

exports.remove = function(seminarId){
    var deferred = Q.defer();
    Report.remove({seminarId: seminarId}, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    })
    return deferred.promise;
}

exports.insert = function(seminarId, report){
    var deferred = Q.defer();

    Report.create(report,
    function(err){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(undefined);
    });

    return deferred.promise;
}

exports.update = function(seminarId, report){
    var deferred = Q.defer();

    Report.update({
        seminarId: seminarId
    }, 
    report)
    .exec(function(err, numAffected){
        if(err){
            deferred.reject(err);
        }else if(numAffected!==1){
            deferred.reject(new Error("Can't update a report which doesn't exist."));
        }else{
            deferred.resolve(numAffected);
        }
    });

    return deferred.promise;
}