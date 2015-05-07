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




seminarSchema.statics.updateValidations = function(req){

    req.assert('id', 'Seminar mongoose ID should be 24 characters').notEmpty().len(24, 24);
    req.sanitize('showLastPeriodScore').toBoolean();

    return req.validationErrors();
};



seminarSchema.statics.studentEmailValidations = function(req){

    if(req.body.studentemail !== ''){

        if(req.body.studentemail.indexOf('@') > -1 ){
            req.checkBody('studentemail', 'Invalid email.').notEmpty().isEmail();
            req.body.email = req.body.studentemail;

        }else{
            req.checkBody('studentemail', 'Username should be 6-20 characters').notEmpty().len(6, 20);
            req.body.username = req.body.studentemail;
        }

    }else{

        if(req.body.studentemail.indexOf('@') > -1 ){
            req.checkBody('teamcreatoremail', 'Invalid email.').notEmpty().isEmail();
            req.body.email = req.body.teamcreatoremail;

        }else{
            req.checkBody('teamcreatoremail', 'Username should be 6-20 characters').notEmpty().len(6, 20);
            req.body.username = req.body.studentemail;
        }

    }

    return req.validationErrors();
};


/**
 * Methods
 */



/**
 * Register Model
 */

var Seminar = mongoose.model("Seminar", seminarSchema);
module.exports = Seminar;























