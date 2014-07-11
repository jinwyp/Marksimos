var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var logger = require('../../common/logger.js');
var util = require('util');
var sessionOperation = require('../../common/sessionOperation.js');

exports.addFacilitator = function(req, res, next){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    req.checkBody('name', '6 to 100 characters required.').notEmpty().len(6, 100);
    req.checkBody('phone', 'phone is empty.').notEmpty();
    req.checkBody('country', 'country is empty').notEmpty();
    req.checkBody('state', 'state is empty').notEmpty();
    req.checkBody('city', 'city is empty').notEmpty();
    req.checkBody('num_of_license', 'Invalid num of license').isInt();

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    //if phone contains characters other than number
    if(!validator.isNumeric(req.body.phone)){
        return res.send(400, {message: "Invalid phone."});
    }

    var distributorId = sessionOperation.getUserId(req);

    var facilitator = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: req.body.password,
        role: config.role.distributor,
        numOfLicense: req.body.num_of_license,
        isActive: true,
        distributorId: distributorId
    }

    userModel.findByEmail(req.body.email)
    .then(function(result){
        if(result){
            throw {httpStatus: 400, message: 'Email has been used, please choose another email.'};
        }else{
            return userModel.find({_id: distributorId})
        }
    })
    .then(function(distributor){
        if(!distributor){
            throw {message: "Can't find distributor in database: distributorId: " + distributorId};
        }

        if(distributor.numOfLicense - req.body.num_of_license <= 0){
            throw {httpStatus: 400, message: "You don't have enought license."};
        }

        return userModel.update({_id: distributorId}, {
            numOfLicense: distributor.numOfLicense - req.body.num_of_license,
            numOfUsedLicense: distributor.numOfUsedLicense + req.body.num_of_license
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
        res.send(err.httpStatus || 500, {message: 'add facilitator failed.'});
    })
    .done();
};

exports.updateFacilitator = function(req, res, next){
    req.checkParams('facilitator_id', 'Invalid facilitator_id').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    req.checkBody('name', '6 to 100 characters required.').notEmpty().len(6, 100);
    req.checkBody('phone', 'phone is empty.').notEmpty();
    req.checkBody('country', 'country is empty').notEmpty();
    req.checkBody('state', 'state is empty').notEmpty();
    req.checkBody('city', 'city is empty').notEmpty();
    req.checkBody('num_of_license', 'Invalid num of license').isInt();

    var errors = req.validationErrors();
    if(errors){
        return res.send(400, {message: util.inspect(errors)});
    }

    //if phone contains characters other than number
    if(!validator.isNumeric(req.body.phone)){
        return res.send(400, {message: "Invalid phone."});
    }

    var facilitator = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: req.body.password,
        role: config.role.distributor,
        numOfLicense: req.body.num_of_license,
        isActive: true,
        district: req.body.district || '',
        street: req.body.street || '',
        pincode: req.body.pincode || ''
    }

    userModel.update({_id: req.params.facilitator_id}, facilitator)
    .then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'update facilitator failed.'});
    })
};


exports.searchFacilitator = function(req, res, next){
    var name = req.query.name;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var isDisabled = req.query.user_status;

    var query = {};

    //only distributor and admin can search facilitators
    //distributor can only view its own facilitators
    if(sessionOperation.getUserRole(req) !== config.role.admin){
        query._id = sessionOperation.getUserId(req);
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
};




















