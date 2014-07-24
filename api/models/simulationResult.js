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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    SimulationResult.create(simulationResult, function(err, result){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(result);
    });

    return deferred.promise;
}

exports.findAll = function(seminarId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    SimulationResult.findOne({
        seminarId: seminarId,
        period: period
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

exports.remove = function(query){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    var deferred = Q.defer();

    SimulationResult.remove(query, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
}














