var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');


var questionnaireSchema = new Schema({
	seminarId: String,
	email: String,
	q_OverallSatisfactionWithTheProgram: {type: [Number],default: [5, 5, 5, 5, 5, 5]},
	q_MostBenefit: {type: Number,default: 1},
	q_WillRecommend: {type: Boolean,default: true},
	q_ReasonForRecommendOrNot: String,
	q_FeelAboutMarkSimos: String
});


var Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

exports.findOne = function(seminarId, email) {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	Questionnaire.findOne({
		seminarId: seminarId,
		email: email
	}, function(err, result) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	})
	return deferred.promise;
}

exports.remove = function(query) {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	Questionnaire.remove(query, function(err) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(undefined);
		}
	})

	return deferred.promise;
}

exports.insert = function(questionnaire) {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	Questionnaire.create(questionnaire, function(err) {
		if (err) {
			return deferred.reject(err);
		}
		return deferred.resolve(undefined);
	});

	return deferred.promise;
};

exports.update = function(seminarId, email, Questionnaire) {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	Questionnaire.update({
			seminarId: seminarId,
			email: email
		},
		Questionnaire)
		.exec(function(err, numAffected) {
			if (err) {
				deferred.reject(err);
			} else if (numAffected !== 1) {
				deferred.reject(new Error("Can't update a Questionnaire which doesn't exist."));
			} else {
				deferred.resolve(numAffected);
			}
		});

	return deferred.promise;
};