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

    seminarListMarksimos: [{ type: schemaObjectId, ref: 'Seminar' }]

});

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



/**
 * Methods
 */



/**
 * Register Model
 */


var Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
