var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var seminarSchema = new Schema({
    seminarId: String,
    simulationSpan: Number,  //seminar有多少个round
    simulationVariant: String,
    targetMarket: String,
    teams: [],
    facilitatorId: String,
    isFinished: Boolean, //if this seminar is finished

    allResults: [],
    productPortfolio: [],
    charts: [],
    reports: []
});

var teamSchema = new Schema({
    teamName: String,
    userIds: [String]
});

var Seminar = mongoose.model("Seminar", seminarSchema);

exports.add

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

exports.update = function(seminarId, seminar){
    return Seminar.update({seminarId: seminarId}, seminar).exec();
}

exports.insertEmptySeminar = function(seminarId){
    return Seminar.create({
        seminarId: seminarId,
        allResults: [],
        productPortfolio: [],
        charts: [],
        reports: []
    });
}

exports.remove = function(seminarId){
    return Seminar.remove({seminarId: seminarId}).exec();
}

exports.clearExistedData = function(seminarId){
    return Seminar.update({
        seminarId: seminarId
    }, 
    {
        allResults: [],
        productPortfolio: [],
        charts: [],
        reports: []
    }).exec();
}

exports.getChartData = function(seminarId){
    return Seminar.findOne({seminarId: seminarId})
    .exec().then(function(seminar){
        if(seminar){
            return seminar.charts;
        }
        return null;
    })
}

exports.getProductPortfolio = function(seminarId, companyId){
    return Seminar.findOne({seminarId: seminarId})
    .exec().then(function(seminar){
        if(seminar){
            for(var i=0; i<seminar.productPortfolio.length; i++){
                if(seminar.productPortfolio[i].companyId === companyId){
                    return seminar.productPortfolio[i];
                } 
            }
        }else{
            return null;
        }
    })
}