var Q = require('q');
var request = require('request');

exports.get = function(reqUrl){
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
            deferred.reject(parseError);
        }

        deferred.resolve(jsonData);
        
    })
    return deferred.promise;
};

exports.post = function(reqUrl, data){
    var deferred = Q.defer();
    request.post(reqUrl, {form: data},function(err, response, body){
        if(err){
            deferred.reject(err);
        }

        if(response.statusCode!==200){
            deferred.reject(new Error(response.statusCode.toString()));
        }

        var jsonData;
        try{
            console.log("............"+body);
            jsonData = JSON.parse(body);          
        }catch(parseError){
            deferred.reject(parseError);
        }

        deferred.resolve(jsonData);
        
    })
    return deferred.promise;
}