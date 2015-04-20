/**
 * Created by jinwyp on 4/20/15.
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
var chatMessageSchema = new Schema({

    text: { type: String },

    creator: { type: schemaObjectId, ref: 'User' },

    room : {
        roomNumber : { type: String},
        description: { type: String }
    }

});


/**
 * Mongoose plugin
 */
chatMessageSchema.plugin(mongooseTimestamps);


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */

chatMessageSchema.statics.createValidations = function(req){

    req.checkBody('message', 'Chat Message should be 2-300 characters').notEmpty().len(2, 300);
    //req.checkBody('description', 'Campaign description should be 2-10000 characters').notEmpty().len(2, 10000);

    //req.checkBody('activated', 'Campaign activated should Boolean true or false').notEmpty();

    return req.validationErrors();
};


/**
 * Methods
 */



/**
 * Register Model
 */


var chatMessage = mongoose.model("Chatmessage", chatMessageSchema);
module.exports = chatMessage;
