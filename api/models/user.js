var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var userSchema = new Schema({
    email: String,
    userName: String,
    password: String,
    role: Number   //1: Admin, 2:Distributor, 3: Facilitator, 4:Students
});

var User = mongoose.model('Useraccount', userSchema);


exports.isUserExisted = function(email){
    var deferred = Q.defer();

    if(!email){
        process.nextTick(function(){
            deferred.resolve(false);
        });
    }else{
        User.find({email: email}, function(err, userData){
            if(err) return deferred.reject(err);

            if(userData && userData.length === 1){
                return deferred.resolve(true);
            }else{
                return deferred.resolve(false);
            }
        })
    }

    return deferred.promise;
};

exports.addUser = function(user){
    var deferred = Q.defer();

    if(!user){
        process.nextTick(function(){
            deferred.reject(new Error('user can not be empty.'));
        });
    }else{
        var u = new User(user);
        u.save(function(err){
            if(err) return deferred.reject(err);

            return deferred.resolve(true);
        })
    }

    return deferred.promise;
};

exports.login = function(email, password){
    var deferred = Q.defer();

    var errorMessage = null;
    if(!email){
        errorMessage = "email can't be empty.";
    }

    if(!password){
        errorMessage = "password can't be empty.";
    }

    if(errorMessage){
        process.nextTick(function(){
            deferred.reject(new Error(errorMessage));
        })
    }else{
        console.log(email, password);
        User.findOne({
            email: email,
            password: password
        }, function(err, result){

            if(err) deferred.reject(err);

            console.log(result);
            if(result){
                deferred.resolve(result);
            } else {
                deferred.reject(new Error('user not exist'));
            }
        })
    }

    return deferred.promise;
}



















