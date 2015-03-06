/**
 * Created by jinwyp on 3/5/15.
 */

'use strict';

var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');
var campaignModel = require('../../models/user/campaign.js');




exports.addCampaign = function(req, res, next){
    var validationErrors = campaignModel.updateValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var newCampaign = new campaignModel({
        name        : req.body.name,
        description : req.body.description,
        location    : req.body.location || '',
        matchDate   : req.body.matchDate || '',
        creator     : req.user._id,
        activated   : req.body.activated

    });

    newCampaign.saveQ().then(function(result){

        if(!result){
            throw new Error('Cancel promise chains. Because Create Campaign failed. more or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Campaign create success'});

    }).fail(function(err){
        next(err);
    }).done();

};



exports.searchCampaign = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: userRoleModel.roleList.distributor.id
    };
    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.findQ(query).then(function(result){
        res.status(200).send(result);
    }).fail(function(err){
        next(err);
    }).done();
};

