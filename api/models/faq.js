var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var faqSchema = new Schema({
	category  : String,
    questions : [questionSchema]
})

var questionSchema = mongoose.Schema({
    title : String,                   //TCategoriesTotal : 1~(2+1)
    answer : String
})


var FAQ = mongoose.model("FAQ", faqSchema);

exports.addOne = function(faq){
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

exports.find = function() {
	if (!mongoose.connection.readyState) {
		throw new Error("mongoose is not connected.");
	}

	var deferred = Q.defer();

	FAQ.find(function(err, results) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(results);
		}
	})
	return deferred.promise;
}
