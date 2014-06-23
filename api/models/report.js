var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var companyStatusReportAssembler = require('../dataAssemblers/companyStatusReport.js');
var cgiapi = require('../cgiapi.js');


var reportSchema = new Schema({
    seminarId: String,
    reportName: String,
    reportData: {}
});


var Report = mongoose.model("Report", reportSchema);

exports.findOne = function(seminarId, reportName){
    var deferred = Q.defer();

    Report.findOne({
        seminarId: seminarId,
        reportName: reportName
    }, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })
    return deferred.promise;
}

exports.remove = function(seminarId){
    var deferred = Q.defer();
    Report.remove({seminarId: seminarId}, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve();
        }
    })
    return deferred.promise;
};

exports.insert = function(report){
    var deferred = Q.defer();

    Report.create(report, function(err){
        if(err){
            return deferred.reject(err);
        }
        return deferred.resolve(undefined);
    });

    return deferred.promise;
};

exports.update = function(seminarId, report){
    var deferred = Q.defer();

    Report.update({
        seminarId: seminarId
    }, 
    report)
    .exec(function(err, numAffected){
        if(err){
            deferred.reject(err);
        }else if(numAffected!==1){
            deferred.reject(new Error("Can't update a report which doesn't exist."));
        }else{
            deferred.resolve(numAffected);
        }
    });

    return deferred.promise;
};

exports.initReport = function(seminarId, allResults){
    var queries = [];
    allResults.forEach(function(onePeriodResult){
        queries.push(cgiapi.getExogenous(onePeriodResult.period));
    })
    return Q.all(queries)
    .then(function(allExogenous){
        return exports.insert({
            seminarId: seminarId,
            reportName: "company_status",
            reportData: companyStatusReportAssembler.getCompanyStatusReport(allResults, allExogenous)
        })
    });
};



