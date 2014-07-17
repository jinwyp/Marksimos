
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

exports.setSeminarId = function(req, seminarId){
    req.session.seminarId = seminarId;
}

exports.getSeminarId = function(req){
    return req.session.seminarId;
}

exports.setCompanyId = function(req, companyId){
    req.session.companyId = companyId;
}

exports.getCompanyId = function(req){
    return res.session.companyId;
}

exports.setCurrentPeriod = function(req, currentPeriod){
    req.session.currentPeriod = currentPeriod;
}

exports.getCurrentPeriod = function(req){
    return res.session.currentPeriod;
}
