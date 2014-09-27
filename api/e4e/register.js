var logger = require('../../common/logger.js');

exports.companyRegister = function(req, res, next){
	logger.log('company'+req.body.userName);
	res.send(200,{'result':'success'});
}

exports.studentRegister = function(req, res, next){
	logger.log('student'+req.body);
	res.send(200,{'result':'success'});
}