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
    type: { type: Number, default: 10  }, // 10 Glossary  20 FAQ questions

    name: { type: String },
    description: { type: String },

    question: { type: String },
    answer: { type: String },


    tagList: [{ type: schemaObjectId, ref: 'Tag' }]

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

glossarySchema.statics.addValidations = function(req){

    req.checkBody('type', 'Glossary type should be int').notEmpty().isInt();

    if(req.body.type == 10){
        req.checkBody('name', 'Glossary name should be 2-50 characters').notEmpty().len(2, 200);
        req.checkBody('description', 'Glossary description should be 2-5000 characters').notEmpty().len(2, 5000);
    }else if(req.body.type == 20){
        req.checkBody('question', 'Glossary name should be 2-50 characters').notEmpty().len(2, 200);
        req.checkBody('answer', 'Glossary description should be 2-5000 characters').notEmpty().len(2, 5000);
    }


    //req.checkBody('activated', 'Campaign activated should Boolean true or false').notEmpty();

    return req.validationErrors();
};


glossarySchema.statics.searchWordValidations = function(req){

    //req.checkBody('type', 'Glossary type should be int').notEmpty().isInt();
    req.checkBody('keyword', 'Glossary keyword should be 2-200 characters').notEmpty().len(2, 200);


    //req.checkBody('activated', 'Campaign activated should Boolean true or false').notEmpty();

    return req.validationErrors();
};

/**
 * Methods
 */



/**
 * Register Model
 */


var glossary = mongoose.model("Glossary", glossarySchema);
module.exports = glossary;

