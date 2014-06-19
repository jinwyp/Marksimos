var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var simulationResultSchema = new Schema({
    seminarId: String,
    period: Number,
    p_Companies: [],
    p_Number: Number,
    p_Brands: [],
    p_Type: Number,
    p_SKUs: [],
    p_Market: {}
});

var SimulationResult = mongoose.model("SimulationResult", simulationResultSchema);

exports.insert = function(simulationResult){
    var deferred = Q.defer();

    SimulationResult.create(simulationResult, function(err){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(undefined);
    });

    return deferred.promise;
}

exports.findAll = function(seminarId){
    var deferred = Q.defer();

    SimulationResult.find({seminarId: seminarId})
    .sort({period: 'asc'})
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

exports.removeAll = function(seminarId){
    var deferred = Q.defer();

    SimulationResult.remove({seminarId: seminarId}, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
}

exports.findOne = function(seminarId, period){
    var deferred = Q.defer();

    SimulationResult.findOne({seminarId: seminarId}, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}















