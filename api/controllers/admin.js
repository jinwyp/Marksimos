var validator = require('validator');
var config = require('../config.js');
var userModel = require('../models/user.js');
var logger = require('../../logger.js');
var util = require('util');

exports.addDistributor = function(req, res, next){
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

    var distributor = {
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: req.body.password,
        role: config.role.distributor,
        numOfLicense: req.body.num_of_license,
        isActive: true
    }

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
    req.checkParams('user_id', 'Invalid user_id').notEmpty();
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

    var distributor = {
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

    userModel.update({_id: req.params.user_id}, distributor)
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























