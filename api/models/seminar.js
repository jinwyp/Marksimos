var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var consts = require('../consts.js');

var seminarSchema = new Schema({
    seminarId: String,
    description: String,
    country: String,
    state: String,
    city: String,
    venue: String,


    simulationSpan: Number,  //seminar有多少个round
    companyNum: Number,  //team name list

    facilitatorId: String,

    createDate: Date,

    isFinished: {type: Boolean, default: false}, //if this seminar is finished

    companyAssignment: [],
    currentPeriod: {type: Number, default: consts.Period_0 + 1},

    companies: [],



    isInitialized: {type: Boolean, default: false}, //if seminar is initialized
    isSimulationFinished: {type: Boolean, default: false}, //if all simulation has been executed.
    showLastPeriodScore: {type: Boolean, default: true}
});

var teamSchema = new Schema({
    teamName: String,
    userIds: [String]
});

var Seminar = mongoose.model("Seminar", seminarSchema);


exports.update = function(query, seminar){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    Seminar.update(query, seminar)
    .exec(function(err, numAffected){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(numAffected);
        }
    });
    return deferred.promise;
}

exports.insert = function(seminar){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    Seminar.create(seminar, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

exports.remove = function(seminarId){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    Seminar.remove({seminarId: seminarId}, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    })
    return deferred.promise;
}

exports.findOne = function(query){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    Seminar.findOne(query, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

exports.find = function(query, sort){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    Seminar.find(query)
    .sort(sort)
    .exec(function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

exports.delete = function(query){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    var deferred = Q.defer();
    Seminar.remove(query, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    })
    return deferred.promise;
}





















