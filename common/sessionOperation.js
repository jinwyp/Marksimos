
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

exports.setUserId = function(req, userId){
    req.session.userId = userId;
}

exports.getUserId = function(req){
    return req.session.userId;
}

exports.setSessionId = function(req, sessionId){
    req.session.sessionId = sessionId;
}

exports.getSessionId = function(req){
    return req.session.sessionId;
}
