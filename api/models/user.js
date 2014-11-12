var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var Q = require('q');
var uuid = require('node-uuid');


var userSchema = new Schema({

    // system field
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },


    emailActivateToken: { type: String, default: uuid.v4() },
    emailActivated: {type: Boolean, default: false},
    activated: {type: Boolean, default: false},


    role: {type: Number, default: 4},  //1 admin, 2 distributor, 3 facilitator, 4  students,   9 B2C Enterprise
    studentType : {type: Number, default: 10}, //10 B2B students,  20 B2C students, 30 Both B2C and B2B students


    // 3rd facebook auth
    facebook : {
        id       : String,
        token    : String,
        email    : String,
        username : String
    },

    //user basic info
    gender       : Number,
    birthday: Date,
    firstName    : String,
    lastName     : String,
    idcardNumber : String,
    mobilePhone  : String,
    qq           : String,


    //user degree info
    majorsDegree: String,
    dateOfGraduation: Date,
    organizationOrUniversity: String,
    occupation: String,


    //address
    country: String,
    state: String,
    city: String,
    district: String,
    street: String,


    //add for e4e company
    designation: String,
    officalContactNumber: String,
    holdingCompany: String,
    division: String,


    //distributor and facilitator info
    numOfLicense: {type: Number, default: 0},
    numOfUsedLicense: {type: Number, default: 0},

    distributorId: String,
    facilitatorId: String

});

var User = mongoose.model("User", userSchema);


exports.query = User;


exports.register = function(user){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();
    User.create(user, function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};


exports.updateByEmail = function(email, user){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
};

exports.update = function(query, user){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
};

exports.findByEmail = function(email){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    });

    return deferred.promise;
};

exports.findByEmailAndToken = function(email, token){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

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

exports.findOne = function(query){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    User.findOne(query, 
    function(err, result){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

exports.remove = function(query){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    
    var deferred = Q.defer();

    User.remove(query, function(err){
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(undefined);
        }
    })

    return deferred.promise;
}









