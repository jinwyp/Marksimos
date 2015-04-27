/**
 * Created by jinwyp on 4/22/15.
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
var tagSchema = new Schema({

    name: { type: String },
    description: { type: String }

});


/**
 * Mongoose plugin
 */
tagSchema.plugin(mongooseTimestamps);


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */

tagSchema.statics.updateValidations = function(req){

    req.checkBody('name', 'Tag name should be 2-100 characters').notEmpty().len(2, 100);
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


var tag = mongoose.model("Tag", tagSchema);
module.exports = tag;

