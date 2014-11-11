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


exports.model = User;


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

exports.runOnce=function(arr){
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }
    var config = require('../../common/config.js');
    var pwd=require('../../common/utility.js').hashPassword('123456');
    return User.find({role:config.role.admin}).exec().then(function (userArr) {
        if(userArr.length){
            //已经存在管理员了，不进行初始化，只例出这些用户
            return User.find().exec().then(function(userArr){
                for(var k in userArr ){
                    arr.push(userArr[k]);
                }
            });
        }
        else {
            //不存在管理员，需要初始化
            var userArr=[
                {
                    "_id": mongoose.Types.ObjectId("54609acf700a570813b1353e"),
                    "username": "hcdadmin",
                    "password":pwd,
                    "email":     "admin@hcdglobal.com",
                    "numOfUsedLicense": 0,
                    "numOfLicense": 0,
                    "studentType"    : 10,
                    "role": config.role.admin,
                    "activated": false,
                    "emailActivated": true,
                    "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694",
                    "__v": 0
                },
                 {
                     "_id":  mongoose.Types.ObjectId("54609f0c700a570813b1353f"),
                     "username": "HCD Distributor",
                     "email": "distributor@hcdlearning.com",
                     "mobilePhone": "99999999999",
                     "country": "China",
                     "state": "shanghai",
                     "city": "shanghai",
                     "password": pwd,
                     "district": "Ren Min Lu",
                     "street": "",
                     "idcardNumber": "999999999999999999",
                     "numOfUsedLicense": 200,
                     "numOfLicense": 0,
                     "studentType": 10,
                     "role": config.role.distributor,
                     "activated": true,
                     "emailActivated": true,
                     "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694",
                     "__v": 0
                 },
                 {
                     "_id":  mongoose.Types.ObjectId("54609fb2700a570813b13540"),
                     "username": "HCD Facilitator",
                     "email": "hcd_facilitator@hcdlearning.com",
                     "mobilePhone": "99999999999",
                     "country": "China",
                     "state": "shanghai",
                     "city": "shanghai",
                     "password": pwd,
                     "distributorId": "54609f0c700a570813b1353f",
                     "numOfUsedLicense": 1,
                     "numOfLicense": 199,
                     "studentType": 10,
                     "role": config.role.facilitator,
                     "activated": false,
                     "emailActivated": true,
                     "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694",
                     "__v": 0
                 }
            ];
            for(var i=0;i<36;i++){
                var num=i>9? i.toString():"0"+i;
                userArr.push( {
                    "username": "Guest "+num,
                    "email": "guest"+i+"@hcdlearning.com",
                    "mobilePhone": "99999999999",
                    "country": "China",
                    "state": "shanghai",
                    "city": "shanghai",
                    "password": pwd,
                    "facilitatorId": "54609fb2700a570813b13540",
                    "idcardNumber": "",
                    "gender": null,
                    "occupation": "Student",
                    "firstName": "Guest "+num,
                    "lastName": "HCD",
                    "organizationOrUniversity": "",
                    "majorsDegree": "",
                    "numOfUsedLicense": 0,
                    "numOfLicense": 0,
                    "studentType": 10,
                    "role": config.role.student,
                    "activated": false,
                    "emailActivated": false,
                    "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694",
                    "__v": 0
                });
            }
            var deferred = Q.defer();
            return User.create(userArr,function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(undefined);
                    for(var k in userArr ){
                        arr.push(userArr[k]);
                    }
                }
            });
            return deferred.promise;
        }
    });
}









