/**
 * Created by jinwyp on 3/5/15.
 */

'use strict';

var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');
var campaignModel = require('../../models/b2c/campaign.js');




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
    var validationErrors = campaignModel.searchQueryValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }
    var searchKeyword = req.query.keyword || '';
    var activated = req.query.activated || 'all';

    var query = {};

    if (activated !== 'all') {
        query.$and = [
            { activated: activated }
        ];
    }
    if (searchKeyword) {
        var strRegex = ".*[" + searchKeyword.split('').join('][') + "].*";
        var regex = { $regex: strRegex , $options: 'i' }; // $options : 'i' Means case insensitivity to match upper and lower cases. 不区分大小写

        query.$or = [
            { 'name': regex },
            { 'description': regex },
            { 'location': regex },
            { 'matchDate': regex }
        ];
    }

    campaignModel.find(query).populate('seminarListMarksimos').sort({createdAt: -1}).execQ().then(function(result){
        if(!result){
            throw new Error('Cancel promise chains. Because campaign not found !');
        }
        return res.status(200).send(result);

    }).fail(function(err){
        next(err);
    }).done();
};




exports.addMarkSimosSeminarToCampaign = function(req, res, next){

    var validationErrors = campaignModel.addSeminarValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var dataSeminar ;

    seminarModel.findOneQ({seminarId : req.body.seminarId}).then(function(resultSeminar){

        if(!resultSeminar){
            throw new Error('Cancel promise chains. Because Seminar not found !');
        }
        dataSeminar = resultSeminar;

        return campaignModel.findByIdQ(req.body.campaignId);
    }).then(function(resultCampaign){
        if(!resultCampaign){
            throw new Error('Cancel promise chains. Because Campaign not found !');
        }

        resultCampaign.seminarListMarksimos.forEach(function(seminar){

            if(dataSeminar._id.equals(seminar)  ){
                throw new Error('Cancel promise chains. Because this seminar already assigned to this campaign !');
            }
        });

        resultCampaign.seminarListMarksimos.push(dataSeminar._id);

        return resultCampaign.saveQ();

    }).then(function(saveDoc, numAffected){
        if(!saveDoc){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: "assign seminar to campaign success."})

    }).fail(function(err){
        next (err);
    }).done();
};



exports.removeMarkSimosSeminarFromCampaign = function(req, res, next){

};