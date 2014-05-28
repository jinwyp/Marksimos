var userModel = require('../models/user.js');
var logger = require('../../logger.js');

exports.register = function(req, res, next){
    var email = req.body.email;
    var userName = req.body.user_name;
    var password = req.body.password;

    if(!email){
        return res.json({status: 0, message: "email can't be empty."});
    }

    if(!password){
        return res.json({status: 0, message: "password can't be empty."});
    }

    email = email.trim();
    password = password.trim();
    if(userName) userName = userName.trim();

    userModel.isUserExisted(email)
    .then(function(result){
        if(result===false){
            return userModel.addUser({
                email: email,
                userName: userName,
                password: encryptPassword(password),
                role: 4
            }).then(function(){
                return res.json({status: 1, message: "register success."});
            }).fail(function(err){
                logger.error('failed to save user to db');
                throw err;
            })
        }else{
            return res.json({status: 1, message: "User is existed."});
        }
    }).fail(function(err){
        if(err){
            logger.error(JSON.stringify(err.message));
        }
        return res.json({status: 0, message: "register failed."});
    }).done();
};

exports.login = function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    if(!email){
        return res.json({status: 409, message: "email can't be empty."});
    }

    if(!password){
        return res.json({status: 409, message: "password can't be empty."})
    }

    email = email.trim();
    password = encryptPassword(password.trim());

    userModel.login(email, password)
    .then(function(result){
        req.session.user = {
            email: email
        };
//        res.cookie('clientToken', clientToken);
        res.json({status: 303, message: "login success."});

    }).fail(function(err){
        if(err){
            logger.error(err.message);
            return res.json({status: 401, message: "login failed."})
        }
    }).done();
}


function encryptPassword(password){
    return password;
}
























