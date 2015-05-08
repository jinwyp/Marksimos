/**
 * Created by pengchengbi on 3/30/15.
 */
/*!
 * Module dependencies
 */
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Schema = mongoose.Schema;

var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');


/**
 * Mongoose schema
 */
var captchaSchema = new Schema({
    txt: { type: String, required: true },
    mobilePhone: {type: String, required: true}
});

/**
 * Mongoose plugin
 */
captchaSchema.plugin(mongooseTimestamps);



/**
 * Register Model
 */
var Captcha = mongoose.model("Captcha", captchaSchema);
module.exports = Captcha;