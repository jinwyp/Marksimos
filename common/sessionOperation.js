
/**
*
* @param {Boolean} loginStatus
*/
exports.setLoginStatus = function(req, loginStatus){
    req.session.loginStatus = loginStatus;
}

exports.getLoginStatus = function(req){
    return req.session.loginStatus;
}

