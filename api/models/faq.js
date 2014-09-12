var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var faqSchema = new Schema({
	reportNmae  : String,
	categories  : [categorySchema]
})
var categorySchema = mongoose.Schema({
	categoryName  : String,
    questions : [questionSchema]
})

var questionSchema = mongoose.Schema({
    title : String,                   //TCategoriesTotal : 1~(2+1)
    answer : String
})


var FAQ = mongoose.model("FAQ", faqSchema);

exports.insert = function(faq){
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}
	var deferred = Q.defer();
	FAQ.create(faq, function(err,result) {
		if (err) {
			return deferred.reject(err);
		}
		return deferred.resolve(result);
	});
	return deferred.promise;
}

exports.findOne = function(reportName) {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	FAQ.findOne({
		reportName: reportName
	}, function(err, result) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(result);
		}
	});
	return deferred.promise;
}
