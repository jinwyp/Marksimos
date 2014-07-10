
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

exports.setUserRole = function(req, userRole){
    req.session.userRole = userRole;
}

exports.getUserRole = function(req){
    return req.session.userRole;
}
