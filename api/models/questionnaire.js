var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');


/**
 * Mongoose schema
 */
var questionnaireSchema = new Schema({
	seminarId: String,
	email: String,
	q_OverallSatisfactionWithTheProgram: {type: [Number],default: [5, 5, 5, 5, 5, 5]},
	q_TeachingTeam:{type: [Number],default: [5, 5, 5]},
	q_Product:{type: [Number],default: [5, 5, 5, 5]},
	q_Interpreter:{type: Number,default: 5},
	q_TeachingSupport:{type: [Number],default: [5, 5]},
	q_MostBenefit: {type: Number,default: 1},
	q_WillRecommend: {type: Boolean,default: true},
	q_ReasonForRecommendOrNot: {type: String,default: ''},
	q_FeelAboutMarkSimos: {type: String,default: ''}
});




/**
 * Mongoose plugin
 */
questionnaireSchema.plugin(mongooseTimestamps);






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


var Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);
module.exports = Questionnaire;



