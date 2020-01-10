/**
 * Created by jinwyp on 3/3/15.
 */

'use strict';

/*!
 * Module dependencies
 */
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Schema = mongoose.Schema;
var schemaObjectId = Schema.Types.ObjectId;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');


/**
 * Mongoose schema
 */
var campaignSchema = new Schema({

    name: { type: String },
    description: { type: String },
    location: { type: String },
    matchDate: { type: String },

    creator: { type: schemaObjectId, ref: 'User' },

    seminarListMarksimos: [{ type: schemaObjectId, ref: 'Seminar' }],
    teamList: [{ type: schemaObjectId, ref: 'Team' }],

    pictures : {
        listCover : {type: schemaObjectId, ref: 'FileStorage'},
        firstCover : {type: schemaObjectId, ref: 'FileStorage'},
        firstCoverBackgroundColor : {type: String, default: '#FFFFFF'},

        benefit1 : {type: schemaObjectId, ref: 'FileStorage'},
        benefit2 : {type: schemaObjectId, ref: 'FileStorage'},
        benefit3 : {type: schemaObjectId, ref: 'FileStorage'},
        qualification : {type: schemaObjectId, ref: 'FileStorage'},
        process : {type: schemaObjectId, ref: 'FileStorage'},
        processBackgroundColor : {type: String, default: '#FFFFFF'}
    },

    memberNumberBase: { type: Number, default: 0 },

    activated: { type: Boolean, default: false }

}, { usePushEach: true });

/**
 * Mongoose plugin
 */
campaignSchema.plugin(mongooseTimestamps);


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */

campaignSchema.statics.updateValidations = function(req){

    req.sanitize('activated').toBoolean();

    req.checkBody('name', 'Campaign name should be 2-50 characters').notEmpty().len(2, 50);
    req.checkBody('description', 'Campaign description should be 2-10000 characters').notEmpty().len(2, 10000);

    req.checkBody('activated', 'Campaign activated should Boolean true or false').notEmpty();

    return req.validationErrors();
};


campaignSchema.statics.searchQueryValidations = function(req){
    if (req.query.keyword) {
        req.checkQuery('keyword', 'Campaign name should be 2-500 characters').optional().len(2, 500);
    }
    req.checkQuery('activated', 'Campaign activated should Boolean true or false').optional();

    return req.validationErrors();
};

campaignSchema.statics.addSeminarValidations = function(req){

    req.assert('seminarId', 'Seminar ID should be 5-9 characters').notEmpty().len(5, 9);
    req.assert('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);

    return req.validationErrors();
};


campaignSchema.statics.addTeamValidations = function(req){
    req.checkBody('username', 'Username should be 6-20 characters').notEmpty().len(6, 20);
    //req.checkBody('teamId', 'Team ID should be 24 characters').notEmpty().len(24, 24);
    req.checkBody('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);

    return req.validationErrors();
};

campaignSchema.statics.removeTeamValidations = function(req){
    req.checkBody('teamId', 'Team ID should be 24 characters').notEmpty().len(24, 24);
    req.checkBody('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);

    return req.validationErrors();
};


campaignSchema.statics.campaignIdValidations = function(req){
    req.assert('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);

    return req.validationErrors();
};


/**
 * Methods
 */



/**
 * Register Model
 */


var Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
