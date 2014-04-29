var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allResultSchema = new Schema({
    allResult: String
});

var allResultJson;

exports.updateAllResults = function(allResult){
    allReslutJson = JSON.parse(allResult);
    return allResultJson;
};