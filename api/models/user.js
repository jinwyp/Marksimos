var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var userSchema = new Schema({
    name: String,
    email: String,
    phone: String,

    //address
    country: String,
    state: String,
    city: String,
    district: String,
    street: String,


    activateToken: String,
    isActive: {type: Boolean, default: false},
    isDisabled: {type: Boolean, default: false},
    password: String,
    
    role: {type: Number, default: 4}, //1 admin, 2 distributor, 3 facilitator, 4 students

    numOfLicense: {type: Number, default: 0},
    leftLicense: Number,

    //facilitator field
    distributorId: String,
    
    //student fileds
    pincode: String,
    gender: Number,
    occupation: Number,
    firstName: String,
    lastName: String,
    univercity: String,
    organization: String,
    highestEducationalDegree: String,

    facilitatorId: String
});

var User = mongoose.model("User", userSchema);

exports.register = function(user){
    var deferred = Q.defer();

    User.create(user, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

exports.updateByEmail = function(email, user){
    var deferred = Q.defer();

    User.update({
        email: email
    }
    ,user
    , function(err, numAffected){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(numAffected);
        }
    });

    return deferred.promise; 
}

exports.update = function(query, user){
    var deferred = Q.defer();

    User.update(query
    , user
    , function(err, numAffected){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(numAffected);
        }
    });

    return deferred.promise; 
}

exports.findByEmail = function(email){
    var deferred = Q.defer();

    User.findOne({
        email: email
    }, 
    function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

exports.findByEmailAndToken = function(email, token){
    var deferred = Q.defer();

    User.findOne({
        email: email,
        activateToken: token
    }, 
    function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

exports.find = function(query){
    var deferred = Q.defer();

    User.find(query, 
    function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}











