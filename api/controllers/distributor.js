var validator = require('validator');
var config = require('../../common/config.js');
var userModel = require('../models/user.js');
var logger = require('../../common/logger.js');
var util = require('util');
var utility = require('../../common/utility.js');

exports.addDistributor = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForDistributor(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var distributor = {
        username: req.body.username,
        email: req.body.email,
        password: utility.hashPassword(req.body.password),
        mobilePhone: req.body.mobilePhone,
        idcardNumber: req.body.idcardNumber || '',

        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        district: req.body.district || '',
        street: req.body.street || '',

        role: config.role.distributor,
        emailActivated: true,
        activated: true,
        numOfLicense: req.body.num_of_license_granted


    };

    userModel.findByEmail(req.body.email)
    .then(function(result){
        if(result){
            return res.send(400, {message: 'Email has been used, please choose another email.'});
        }else{
            return userModel.register(distributor)
                .then(function(result){
                    res.send(result);
                })
        }
    })
    .fail(function(err){
        logger.error(err);
        res.send(400, {message: 'add distributor failed.'});
    })
    .done();
};

exports.updateDistributor = function(req, res, next){
    if(!req.params.distributor_id){
        return res.send(400, {message: "distributor_id can't be empty."})
    }

    var validateResult = utility.validateUser(req);
    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var distributor = {
        username: req.body.name,
        mobilePhone: req.body.mobilePhone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: utility.hashPassword(req.body.password),
        role: config.role.distributor,
        numOfLicense: req.body.num_of_license_granted,
        emailActivated: true,
        district: req.body.district || '',
        street: req.body.street || '',
        idcardNumber: req.body.idcardNumber || ''
    };

    userModel.update({_id: req.params.distributor_id}, distributor)
    .then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'update distributor failed.'});
    })
};

exports.searchDistributor = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: config.role.distributor
    };
    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.find(query)
    .then(function(result){
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'search failed'})
    })
};






















