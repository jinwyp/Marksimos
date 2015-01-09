/**
 * Created by jinwyp on 1/7/15.
 */
var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');




var gameAuthTokenSchema = new Schema({

    // system field
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    gameId: { type: Number, required: true },
    seminarId: { type: String, required: true, select: true}



});