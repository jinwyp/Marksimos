var Q = require('q');
var request = require('request');

module.exports = function(reqUrl){
    var deferred = Q.defer();
    request(reqUrl, function(err, response, body){
        if(err){
            deferred.reject(err);
        }

        if(response.statusCode!==200){
            deferred.reject(new Error(response.statusCode.toString()));
        }

        var jsonData;
        try{
            jsonData = JSON.parse(body);
        }catch(parseError){
            deferred.promise;
        }

        deferred.resolve(jsonData);
        
    })
    return deferred.promise;
}