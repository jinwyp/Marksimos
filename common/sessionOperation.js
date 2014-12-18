
/**
*
* @param {Boolean} loginStatus
*/
exports.setStudentLoginStatus = function(req, loginStatus){
    req.session.studentLoginStatus = loginStatus;
    req.session.adminLoginStatus = false;    
}

exports.getStudentLoginStatus = function(req){
    return req.session.studentLoginStatus;
}

exports.setAdminLoginStatus = function(req, loginStatus){
    req.session.adminLoginStatus = loginStatus;
    req.session.studentLoginStatus = false;
}

exports.getAdminLoginStatus = function(req){
    return req.session.adminLoginStatus;
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


exports.setCurrentPeriod = function(req, currentPeriod){
    req.session.currentPeriod = currentPeriod;
}

exports.getCurrentPeriod = function(req){
    return req.session.currentPeriod;
}

exports.setEmail = function(req, email){
    req.session.email = email;
}

exports.getEmail = function(req){
    return req.session.email;
}
