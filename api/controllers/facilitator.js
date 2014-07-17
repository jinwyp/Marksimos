var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var seminarModel = require('../models/seminar.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');
var utility = require('../../common/utility.js');

exports.addFacilitator = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForFacilitator(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var distributorId = sessionOperation.getUserId(req);

    var facilitator = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: utility.hashPassword(req.body.password),
        role: config.role.facilitator,
        numOfLicense: req.body.num_of_license,
        isActive: true,
        distributorId: distributorId
    }

    userModel.findByEmail(req.body.email)
    .then(function(result){
        if(result){
            throw {httpStatus: 400, message: 'Email has been used, please choose another email.'};
        }else{
            return userModel.findOne({_id: distributorId})
        }
    })
    .then(function(distributor){
        if(!distributor){
            throw {message: "Can't find distributor in database: distributorId: " + distributorId};
        }

        if(distributor.numOfLicense - parseInt(req.body.num_of_license) <= 0){
            throw {httpStatus: 400, message: "You don't have enought license."};
        }

        return userModel.update({_id: distributorId}, {
            numOfLicense: distributor.numOfLicense - parseInt(req.body.num_of_license),
            numOfUsedLicense: distributor.numOfUsedLicense + parseInt(req.body.num_of_license)
        });
    })
    .then(function(numAffected){
        if(numAffected!==1){
            throw {message: 'update distributor failed during add facilitator.'}
        }
        return userModel.register(facilitator);
    })
    .then(function(result){
        if(!result){
            throw {message: 'add facilitator failed.'}
        }
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: 'add facilitator failed.'});
    })
    .done();
};

exports.updateFacilitator = function(req, res, next){
    var validateResult = utility.validateUser(req);
    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var facilitator = {};

    if(req.body.name) facilitator.name = req.body.name;
    if(req.body.phone) facilitator.phone = req.body.phone;
    if(req.body.country) facilitator.country = req.body.country;
    if(req.body.state) facilitator.state = req.body.state;
    if(req.body.city) facilitator.city = req.body.city;
    if(req.body.password) facilitator.password = utility.hashPassword(req.body.password);

    var userRole = sessionOperation.getUserRole(req);
    if(req.body.num_of_license && (userRole === config.role.admin || userRole === config.role.distributor)){
        facilitator.numOfLicense = req.body.num_of_license;
    }
    if(req.body.district) facilitator.district = req.body.district;
    if(req.body.street) facilitator.street = req.body.street;
    if(req.body.pincode) facilitator.pincode = req.body.pincode;

    if(Object.keys(facilitator).length === 0){
        return res.send(400, {message: "you have to provide at least one field to update."});
    }
    
    var distributorId = sessionOperation.getUserId(req);

    var p;

    //if the num_of_license is changed, we need to add or remove certain licenses
    //from the distributor
    if(req.body.num_of_license > 0){
        //find the facilitor to be updated.
        p = userModel.findOne({
            _id: req.params.facilitator_id
        })
        .then(function(dbFacilitator){
            //if this facilitator belongs to the current distributor
            if(dbFacilitator.distributorId === distributorId){
                var addedLicense = parseInt(req.body.num_of_license) - dbFacilitator.numOfLicense;
                return userModel.findOne({
                    _id: distributorId
                })
                .then(function(dbDistributor){
                    //if the distributor has enough license
                    if(dbDistributor.numOfLicense > addedLicense){
                        return userModel.update({
                            _id: distributorId
                        }, {
                            numOfUsedLicense: dbDistributor.numOfUsedLicense + addedLicense,
                            numOfLicense: dbDistributor.numOfLicense - addedLicense
                        })
                        .then(function(numAffected){
                            if(numAffected!==1){
                                throw {httpStatus: 400, message: 'failed to update distributor ' 
                                + distributorId + ' during updating facilitator ' + req.params.facilitator_id}
                            }else{
                                return userModel.update({_id: req.params.facilitator_id}, facilitator);
                            }
                        })
                    }else{
                        throw {httpStatus: 400, message: "you don't have enought license, you need " + addedLicense
                        + " more licenses, but you only have " + dbDistributor.numOfUsedLicense}
                    }
                })
            }else{
                throw {httpStatus: 400, message: "You are not authorized to update this facilitator."}
            }
        })
    }else{
        p = userModel.update({_id: req.params.facilitator_id}, facilitator);
    }

    p.then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
    })
    .fail(function(err){
        logger.error(err);
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        return res.send(500, {message: 'update facilitator failed.'});
    })
    .done();
};


exports.searchFacilitator = function(req, res, next){
    var name = req.query.name;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var isDisabled = req.query.user_status;

    var query = {
        role: config.role.facilitator
    };

    //only distributor and admin can search facilitators
    //distributor can only view its own facilitators
    if(sessionOperation.getUserRole(req) !== config.role.admin){
        query.distributorId = sessionOperation.getUserId(req);
    }

    if(name) query.name = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(isDisabled) query.isDisabled = isDisabled;

    userModel.find(query)
    .then(function(result){
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'search failed'})
    })
    .done();
};

exports.getSeminarOfFacilitator = function(req, res, next){
    var facilitatorId = sessionOperation.getUserId(req);

    seminarModel.find({facilitatorId: facilitatorId}, {})
    .then(function(allSeminars){
        res.send(allSeminars);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: "get seminar list faile."})
    })
    .done();
}



















