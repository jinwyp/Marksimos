'use strict';

/*!
 * Module dependencies
 */
var mongoose = require('mongoose-q')(require('mongoose'), {spread:false});
var Schema = mongoose.Schema;
var schemaObjectId = Schema.Types.ObjectId;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');

var consts = require('../../consts.js');

var gameTokenModel = require('../../models/user/gameauthtoken.js');


/**
 * Mongoose schema
 */
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


/**
 * Mongoose plugin
 */
seminarSchema.plugin(mongooseTimestamps);



/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */
seminarSchema.statics.findSeminarByUserId = function (userid) {
    var that = this;
    return gameTokenModel.findOneQ({userId : userid }).then(function(gameToken){
        if(gameToken){
            return that.findOneQ({ seminarId : gameToken.seminarId})
        }
    });
};


seminarSchema.statics.update = function(query, seminar){
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



/**
 * Methods
 */



/**
 * Register Model
 */

var Seminar = mongoose.model("Seminar", seminarSchema);
module.exports = Seminar;























