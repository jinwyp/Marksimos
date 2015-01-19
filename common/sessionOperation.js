
/**
*
* @param {Boolean} loginStatus
*/






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

