var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');


var preGeneratedDataSchema = new Schema({
    seminarId: String,

    allResults: [],
    charts: [],
    reports: []
});

var PreGeneratedData = mongoose.model('PreGeneratedData', preGeneratedDataSchema);

exports.insert = function(seminarId, preGeneratedData){
    var deferred = Q.defer();
    PreGeneratedData.create(preGeneratedData, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(undefined);
        }
    });
    return deferred.promise;
}

exports.remove = function(seminarId){
    var deferred = Q.defer();

    PreGeneratedData.remove({
        seminarId: seminarId
    },
    function(err){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(undefined);
    })

    return deferred.promise;
}

exports.findOne = function(seminarId){
    var deferred = Q.defer();

    PreGeneratedData.findOne({
        seminarId: seminarId
    },
    function(err, result){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(result);
    })

    return deferred.promise;
}

exports.update = function(seminarId, data){
    var deferred = Q.defer();

    PreGeneratedData.update({
        seminarId: seminarId
    },
    data,
    function(err, numAffected){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(numAffected);
    })

    return deferred.promise;
}