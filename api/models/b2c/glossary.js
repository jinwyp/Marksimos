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
var glossarySchema = new Schema({

    name: { type: String },
    description: { type: String },

    tags : {
        name : { type: String},
        description: { type: String }
    }

});


/**
 * Mongoose plugin
 */
glossarySchema.plugin(mongooseTimestamps);


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */

glossarySchema.statics.updateValidations = function(req){

    //req.sanitize('activated').toBoolean();

    //req.checkBody('name', 'Campaign name should be 2-50 characters').notEmpty().len(2, 50);
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


var glossary = mongoose.model("Chatmessage", glossarySchema);
module.exports = glossary;

