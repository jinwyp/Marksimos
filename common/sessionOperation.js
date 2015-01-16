
/**
*
* @param {Boolean} loginStatus
*/
exports.setStudentLoginStatus = function(req, loginStatus){
    req.session.studentLoginStatus = loginStatus;
    req.session.adminLoginStatus = false;    
}

exports.getStudentLoginStatus = function (req){      
    return req.isAuthenticated() && req.user.role === 4;    
}

exports.setAdminLoginStatus = function(req, loginStatus){
    req.session.adminLoginStatus = loginStatus;
    req.session.studentLoginStatus = false;
}

exports.getAdminLoginStatus = function (req){
    return req.isAuthenticated() && (req.user.role === 1|| req.user.role === 2|| req.user.role === 3); 
};



exports.setUserRole = function(req, userRole){
    req.session.userRole = userRole;
};

exports.getUserRole = function (req){
    return req.user.role;    
};

exports.setUserId = function(req, userId){
    req.session.userId = userId;
};

exports.getUserId = function (req){
    return req.user.id;   
};

exports.setSeminarId = function(req, seminarId){
    req.session.seminarId = seminarId;
};

exports.getSeminarId = function(req){
    return req.session.seminarId;
}

exports.setCompanyId = function(req, companyId){
    req.session.companyId = companyId;
}

exports.getCompanyId = function(req){
    return req.session.companyId;
}

exports.setCurrentPeriod = function(req, currentPeriod){
    req.session.currentPeriod = currentPeriod;
}

exports.getCurrentPeriod = function (req){
    return req.session.currentPeriod;
}

exports.setEmail = function (req, email){
    req.session.email = email;
}

exports.getEmail = function(req){
    return req.user.email;   
}
