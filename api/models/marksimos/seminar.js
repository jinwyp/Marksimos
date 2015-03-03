var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var schemaObjectId = Schema.Types.ObjectId;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');

var consts = require('../../consts.js');

var gameTokenModel = require('../../models/user/gameauthtoken.js');

var seminarSchema = new Schema({
    seminarId: String,

    description: String,
    country: String,
    state: String,
    city: String,
    venue: String,

    currentPeriod: {type: Number, default: consts.Period_0 + 1},
    simulationSpan: Number,  //seminar有多少个round
    companyNum: Number,  //team name list

    companyAssignment: [],

    isInitialized: {type: Boolean, default: false}, //if seminar is initialized
    isSimulationFinished: {type: Boolean, default: false}, //if all simulation has been executed.
    showLastPeriodScore: {type: Boolean, default: true},

    facilitatorId: String,

    belongToCampaign : { type: schemaObjectId, ref: 'Campaign' }
});

seminarSchema.plugin(mongooseTimestamps);

seminarSchema.statics.findSeminarByUserId = function (userid) {
    var that = this;
    return gameTokenModel.findOneQ({userId : userid }).then(function(gameToken){
        if(gameToken){
            return that.findOneQ({ seminarId : gameToken.seminarId})
        }
    });
};


var Seminar = mongoose.model("Seminar", seminarSchema);
exports.query = Seminar;


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
};

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





















