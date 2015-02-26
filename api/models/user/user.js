var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');

var userRoleModel = require('./userrole.js');
var config = require('../../../common/config.js');


var userSchema = new Schema({

    // system field
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: true},


    emailActivateToken: { type: String, default: uuid.v4()},
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


    //user address
    country: String,
    state: String,
    city: String,
    district: String,
    street: String,


    //For B2C E4E Enterprise
    companyName : String,
    companyAddress : String,
    companyContactPerson : String,
    companyContactMobileNumber: String,
    companyOfficeTelephone: String,



    //distributor and facilitator info
    numOfLicense: {type: Number, default: 0},
    numOfUsedLicense: {type: Number, default: 0},

    distributorId: {type: String, default: ''},
    facilitatorId: {type: String, default: ''},

    websiteLanguage:{type: String, default: 'zh_CN'} // 'zh_CN'  'en_US'

});
userSchema.plugin(mongooseTimestamps);




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
            return deferred.reject(new Error('cancel register new user, because username or email is existed.'));
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


userSchema.statics.sendEmail = function(targetEmail, subject, html) {
    var deferred = Q.defer();

    var smtpTransport = config.mailTransporter;


    var mailOptions = {
        from: config.mailContent.from,
        to: targetEmail,
        subject: subject,
        text: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log('Email send error : ' + error);
            deferred.reject(error);
        } else {
            console.log('Email already send : ' + response);
            deferred.resolve({message: 'Email already send : ' + response.message});
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







userSchema.statics.registerValidations = function(req, userRoleId, studentType){

    studentType = studentType || 20

    req.checkBody('username', 'Username should be 6-20 characters').notEmpty().len(6, 20);
    req.checkBody('email', 'Email wrong format').notEmpty().isEmail();
    req.checkBody('password', 'Password should be 6-20 characters').notEmpty().len(6, 20);


    if(userRoleId === userRoleModel.roleList.student.id && studentType === 20){
        req.checkBody('gender', 'Gender is required').notEmpty().isInt();
    }

    if(userRoleId === userRoleModel.roleList.student.id && studentType === 10){
        req.checkBody('gender', 'Gender is required').optional().isInt();
        req.checkBody('mobilePhone', 'mobilePhone wrong format').notEmpty().isMobilePhone('zh-CN');


        req.checkBody('country', 'country is required').notEmpty();
        req.checkBody('state', 'state is required').notEmpty();
        req.checkBody('city', 'city is required').notEmpty();

        req.checkBody('qq', 'qq number format wrong' ).optional().isInt();
        req.checkBody('firstname', '2 to 50 characters required.').optional().len(2, 50);
        req.checkBody('lastname', '2 to 50 characters required.').optional().len(2, 50);
        req.checkBody('idcardNumber', '18 to 19 characters required.').optional().matches( /^\d{17}([0-9]|X)$/ );


        //req.checkBody('occupation', '2 to 100 characters required.').optional().len(2, 100);
        req.checkBody('organizationOrUniversity', '2 to 100 characters required.').optional().len(2, 100);

        req.checkBody('studentType', 'Student B2B or B2C Type is required.').notEmpty().isInt();

    }


    if(userRoleId === userRoleModel.roleList.enterprise.id){
        req.checkBody('companyName', 'Company Name is required').notEmpty().len(4, 100);
    }


    if(userRoleId === userRoleModel.roleList.distributor.id){
        req.checkBody('mobilePhone', 'mobilePhone wrong format').notEmpty().isMobilePhone('zh-CN');
        req.checkBody('idcardNumber', '18 to 19 characters required.').matches( /^\d{17}([0-9]|X)$/ );

        req.checkBody('country', 'country is required').notEmpty();
        req.checkBody('state', 'state is required').notEmpty();
        req.checkBody('city', 'city is required').notEmpty();

        req.checkBody('numOfLicense', 'License number must be between 1 to 99999 integer number.').notEmpty().isInt();

    }


    if(userRoleId === userRoleModel.roleList.facilitator.id){
        req.checkBody('mobilePhone', 'mobilePhone wrong format').notEmpty().isMobilePhone('zh-CN');
        req.checkBody('idcardNumber', '18 to 19 characters required.').matches( /^\d{17}([0-9]|X)$/ );

        req.checkBody('country', 'country is required').notEmpty();
        req.checkBody('state', 'state is required').notEmpty();
        req.checkBody('city', 'city is required').notEmpty();

        req.checkBody('numOfLicense', 'License number must be between 1 to 99999 integer number.').notEmpty().isInt();
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










