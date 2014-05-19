var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var seminarSchema = new Schema({
    simulationSpan: Number,  //seminar有多少个round
    simulationVariant: String,
    targetMarket: String,
    teams: [],
    facilitatorId: String,
    isActive: Boolean
});

var teamSchema = new Schema({
    teamName: String,
    userIds: [String]
});

exports.getSeminarSetting = function(seminarId){
    var deferred = Q.defer();
    process.nextTick(function(){
        deferred.resolve({
            simulationSpan: 3,
            simulationVariant: 'FMCG',
            targetMarket: 'GENERIC'
        });
    });
    return deferred.promise;
}