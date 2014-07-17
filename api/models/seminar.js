var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

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
    currentPeriod: {type: Number, default: 0}
});

var teamSchema = new Schema({
    teamName: String,
    userIds: [String]
});

var Seminar = mongoose.model("Seminar", seminarSchema);


exports.update = function(query, seminar){
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





















