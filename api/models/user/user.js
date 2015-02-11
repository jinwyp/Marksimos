var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var uuid = require('node-uuid');


var userRoleModel = require('./userrole.js');


var userSchema = new Schema({

    // system field
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: true},


    emailActivateToken: { type: String, default: uuid.v4() , select: true},
    emailActivated: {type: Boolean, default: false},
    activated: {type: Boolean, default: false},


    role: {type: Number, default: 4, required: true},  //1 admin, 2 distributor, 3 facilitator, 4  students,   5 B2C Enterprise
    studentType : {type: Number, default: 10, required: true}, //10 B2B students,  20 B2C students, 30 Both B2C and B2B students


    // 3rd facebook auth
    facebook : {
        id       : String,
        token    : String,
        email    : String,
        username : String
    },


    //user basic info
    gender       : Number,  // 1 male 2 female
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
    officialContactNumber: String,
    holdingCompany: String,
    division: String,


    //distributor and facilitator info
    numOfLicense: {type: Number, default: 0},
    numOfUsedLicense: {type: Number, default: 0},

    distributorId: {type: String, default: ''},
    facilitatorId: {type: String, default: ''},

    websiteLanguage:{type: String, default: 'zh_CN'} // 'zh_CN'  'en_US'

});





userSchema.virtual('roleName').get(function () {
    return userRoleModel.roleList[this.role].name ;
});

userSchema.virtual('roleId').get(function () {
    return this.role ;
});






userSchema.statics.register = function (newUser) {
    if(!mongoose.connection.readyState){
        throw new Error("mongoose is not connected.");
    }

    var deferred = Q.defer();

    newUser.password = User.generateHashPassword(newUser.password);

    User.findOne( {$or : [
        {username: newUser.username},
        {'email': newUser.email}
    ]}, function(err, userexisted) {
        // In case of any error return
        if (err) return deferred.reject(err);
        // already exists
        if (userexisted) {
            return deferred.reject(new Error('cancel register new user, because user or email is existed.'));
        }else {
            User.create(newUser, function(err, result){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        }
    });

    return deferred.promise;
};


userSchema.statics.updateByEmail = function(email, user){
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







userSchema.statics.registerValidations = function(req, userRoleId){
    req.checkBody('username', 'Username should be 6-20 characters').notEmpty().len(6, 20);
    req.checkBody('email', 'Email wrong format').notEmpty().isEmail();
    req.checkBody('password', 'Password should be 6-20 characters').notEmpty().len(6, 20);


    if(userRoleId === userRoleModel.roleList.student.id){
        req.checkBody('gender', 'Gender is required').notEmpty().isInt();
    }




    return req.validationErrors();
};


userSchema.statics.getStudentType = function(){
    return {
        B2B : 10,
        B2C : 20,
        BothB2CAndB2B : 30
    };
};


userSchema.statics.generateHashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.statics.verifyPassword = function(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
};






var User = mongoose.model("User", userSchema);
module.exports = User;










