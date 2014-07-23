var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var chartSchema = new Schema({
    seminarId: String,
    charts: []
});

var Chart = mongoose.model("Chart", chartSchema);

exports.remove = function(seminarId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    var deferred = Q.defer();
    Chart.remove({seminarId: seminarId}, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    })
    return deferred.promise;
}

exports.insert = function(chart){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    Chart.create(chart, function(err){
        if(err){
            return deferred.reject(err);
        }else{
            return deferred.resolve();
        }
    })

    return deferred.promise;
}

exports.update = function(seminarId, chart){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    Chart.update({
        seminarId: seminarId
    },
    chart,
    function(err, numAffected){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(numAffected);
    })

    return deferred.promise;
}

exports.findOne = function(seminarId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    var deferred = Q.defer();

    Chart.findOne({
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


