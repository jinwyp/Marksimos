var sessionOperation = require('../common/sessionOperation.js');

// exports.loginStatusIsFalse = function(req, res, next){
//     if(!sessionOperation.getLoginStatus(req)){
//         next();
//     }else{
//         res.send({message: 'You have logged in.'});
//     }
// }

exports.needLogin = function(req, res, next){
    if(sessionOperation.getLoginStatus(req)){
        next();
    }else{
        res.redirect('/login');
    }
}

exports.adminpageLogin = function(req, res, next){
    if(sessionOperation.getLoginStatus(req)){
        next();
    }else{
        res.redirect('/adminlogin');
    }
}