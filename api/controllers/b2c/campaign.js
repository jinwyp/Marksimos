/**
 * Created by jinwyp on 3/5/15.
 */

'use strict';

var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var teamModel = require('../../models/user/team.js');
var seminarModel = require('../../models/marksimos/seminar.js');
var campaignModel = require('../../models/b2c/campaign.js');
var teamScoreModel = require('../../models/b2c/teamscore.js');

var fileUploadModel = require('../../models/user/fileupload.js');
var MKError = require('../../../common/error-code.js');

var MessageXSend = require('../../../common/submail/messageXSend.js');
var Q = require('q');

exports.campaignListPage = function(req, res, next){

    campaignModel.find({ activated: true}).populate('seminarListMarksimos').populate('teamList').populate('pictures.listCover').populate('pictures.firstCover').populate('pictures.benefit1').populate('pictures.benefit2').populate('pictures.benefit3').populate('pictures.qualification').populate('pictures.process').sort({createdAt: -1}).execQ().then(function(resultCampaign){
        if(resultCampaign.length == 0){
            return res.status(400).send( {message: "campaign doesn't exist."});
        }

        resultCampaign.forEach(function(campaign){
            var totalMembers = 0;
            campaign.teamList.forEach(function(team){
                totalMembers = totalMembers + team.memberList.length + 1;
            });
            campaign.totalMembers = totalMembers + campaign.memberNumberBase;
        });

        return res.render('b2c/campaign/campaignlist.ejs',{
            title : 'Bridge+ Campaign | Bridge+',
            campaignList: resultCampaign
        });

    }).fail(function(err){
        next(err);
    }).done();

};


exports.campaignSingleInfoPage = function(req, res, next){

    var validationErrors = campaignModel.campaignIdValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    campaignModel.findOne({_id: req.params.campaignId, activated: true}).populate('seminarListMarksimos').populate('teamList').populate('pictures.listCover').populate('pictures.firstCover').populate('pictures.benefit1').populate('pictures.benefit2').populate('pictures.benefit3').populate('pictures.qualification').populate('pictures.process').execQ().then(function(resultCampaign){
        if(!resultCampaign){
            return res.status(400).send( {message: "campaign doesn't exist."});
        }

        var totalMembers = 0;
        resultCampaign.teamList.forEach(function(team){
            totalMembers = totalMembers + team.memberList.length + 1;
        });
        resultCampaign.totalMembers = totalMembers  + resultCampaign.memberNumberBase;

        return res.render('b2c/campaign/campaign.ejs',{
            title : 'Bridge+ Campaign | Bridge+',
            campaign: resultCampaign
        });

    }).fail(function(err){
        next(err);
    }).done();

};


exports.campaignSingleInfo = function(req, res, next){

    var validationErrors = campaignModel.campaignIdValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    campaignModel.findOne({_id: req.params.campaignId, activated: true}).populate('seminarListMarksimos').populate('teamList').populate('pictures.listCover').populate('pictures.firstCover').populate('pictures.benefit1').populate('pictures.benefit2').populate('pictures.benefit3').populate('pictures.qualification').populate('pictures.process').lean().execQ().then(function(resultCampaign){
        if(!resultCampaign){
            return res.status(400).send( {message: "campaign doesn't exist."});
        }

        var totalMembers = 0;
        resultCampaign.teamList.forEach(function(team){
            totalMembers = totalMembers + team.memberList.length + 1;
        });

        resultCampaign.totalMembers = totalMembers + resultCampaign.memberNumberBase;;

        return res.status(200).send(resultCampaign);

    }).fail(function(err){
        next(err);
    }).done();

};











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
        pictures     : {firstCoverBackgroundColor:'#FFFFFF', processBackgroundColor : '#FFFFFF'},
        activated   : req.body.activated,
        memberNumberBase   : req.body.memberNumberBase

    });

    newCampaign.saveQ().then(function(savedDoc){

        if(savedDoc[1] !== 1 ){
            throw new Error('Cancel promise chains. Because Create Campaign failed. more or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Campaign create success'});

    }).fail(function(err){
        next(err);
    }).done();

};




exports.updateCampaign = function(req, res, next){
    var validationErrors = campaignModel.updateValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    campaignModel.findOneAndUpdateQ({ _id : req.body.id} ,
        { $set: {
            name        : req.body.name,
            description : req.body.description,
            location    : req.body.location,
            matchDate   : req.body.matchDate,
            activated   : req.body.activated,
            memberNumberBase   : req.body.memberNumberBase,
            "pictures.firstCoverBackgroundColor": req.body.firstCoverBackgroundColor,
            "pictures.processBackgroundColor": req.body.processBackgroundColor
        }}
    ).then(function(result){

        if(!result){
            throw new Error('Cancel promise chains. Because Create Campaign failed. more or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Campaign create success'});

    }).fail(function(err){
        next(err);
    }).done();

};





exports.uploadCampaignPics = function(req, res, next){

    var validationErrors = campaignModel.campaignIdValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    var uploadPicFields =[
        {fieldname : 'uploadListCover', modelFieldName : 'listCover'},
        {fieldname : 'uploadFirstCover', modelFieldName : 'firstCover'},
        {fieldname : 'uploadBenefit1' , modelFieldName : 'benefit1'},
        {fieldname : 'uploadBenefit2' , modelFieldName : 'benefit2'},
        {fieldname : 'uploadBenefit3' , modelFieldName : 'benefit3'},
        {fieldname : 'uploadQualification' , modelFieldName : 'qualification'},
        {fieldname : 'uploadProcess' , modelFieldName : 'process'}

    ];

    var currentFieldname, currentModelFieldname, fileid;

    for(var p in req.files) {
        if (req.files.hasOwnProperty(p)) {
            currentFieldname = p;
        }
    }

    uploadPicFields.forEach(function(object){
        if (object.fieldname === currentFieldname){
            currentModelFieldname = object.modelFieldName;
        }
    });


    fileUploadModel.creatFile(req.files, currentFieldname).then(function(result){

        if(!result ){
            throw new Error('Cancel promise chains. Because Upload campaign picture failed !');
        }
        fileid = result._id;
        return campaignModel.findOneQ({ _id : req.body.campaignId});

    }).then(function( resultCampaign){

        if(!resultCampaign ){
            throw new Error('Cancel promise chains. Because campaign not found!');
        }

        resultCampaign.pictures[currentModelFieldname] = fileid;
        return resultCampaign.saveQ();

    }).then(function( savedDoc){

        if(savedDoc[1] !== 1){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: 'Upload campaign picture success'});


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

    campaignModel.find(query).populate('seminarListMarksimos').populate('pictures.listCover').populate('pictures.firstCover').populate('pictures.benefit1').populate('pictures.benefit2').populate('pictures.benefit3').populate('pictures.qualification').populate('pictures.process').populate('teamList').sort({createdAt: -1}).exec(function(err, resultCampaign){

        if(err){
            next(err);
        }

        if(!resultCampaign){
            next( new Error('Cancel promise chains. Because campaign not found !') );
        }

        // Deep population is here
        var campaignOptions = [
            { path: 'teamList.memberList', model : 'User', select : userModel.selectFields() },
            { path: 'teamList.creator', model : 'User', select : userModel.selectFields()}
        ];

        teamModel.populate(resultCampaign, campaignOptions, function(err, resultTeam){
            if(err){
                next(err);
            }

            if(!resultTeam){
                next( new Error('Cancel promise chains. Because team not found !') );
            }

            return res.status(200).send(resultCampaign);

        });
    });
};




exports.searchTeamMarksimosScore = function(req, res, next) {
    var validationErrors = campaignModel.searchQueryValidations(req);

    if (validationErrors) {
        return res.status(400).send({message : validationErrors});
    }

    var searchKeyword = req.query.keyword || '';
    var activated = req.query.activated || 'all';

    var quantity = req.query.quantity || 5000;


    var query = {};

    if (activated !== 'all') {
        query.$and = [
            {activated : activated}
        ];
    }
    if (searchKeyword) {
        var strRegex = ".*[" + searchKeyword.split('').join('][') + "].*";
        var regex = {$regex : strRegex, $options : 'i'}; // $options : 'i' Means case insensitivity to match upper and lower cases. 不区分大小写

        query.$or = [
            {'name' : regex},
            {'description' : regex},
            {'location' : regex},
            {'matchDate' : regex}
        ];
    }

    var campaignIdList = [];

    campaignModel.findQ(query).then(function (resultCampaigns) {

        if (!resultCampaigns) {
            throw new MKError('Cancel promise chains. Because campaign not found!', MKError.errorCode.common.notFound);
        }

        campaignIdList = resultCampaigns.map(function (campaign) {
            return campaign._id;
        });

        return teamScoreModel.find({
            campaign: { $in: campaignIdList}
        }).limit(quantity).sort({ranking: 1, timeCostStatus: -1, timeCost: 1}).populate('team').populate('campaign').populate('marksimosSeminar').execQ();

    }).then(function (resultTeamScores) {
        if (!resultTeamScores) {
            throw new MKError('Cancel promise chains. Because TeamScores not found!', MKError.errorCode.common.notFound);
        }

        // Deep population is here
        var teamScoreOptions = [
            { path: 'team.memberList', model : 'User', select : userModel.selectFields() },
            {path : 'team.creator', model : 'User', select : userModel.selectFields()}
        ];

        return teamModel.populateQ(resultTeamScores, teamScoreOptions);

    }).then(function(resultTeamScoreList){

        if(!resultTeamScoreList){
            throw new MKError('Cancel promise chains. Because team score list not found !', MKError.errorCode.common.notFound);
        }

        return res.status(200).send(resultTeamScoreList);

    }).fail(next).done();

};


exports.countTeamJoinCampaign = function(req, res, next){

    var now = new Date();

    var dd = now.getDate();
    var mm = now.getMonth(); //January is 0!
    var yyyy = now.getFullYear();

    var query = {};

    query.joinCampaignTime = {
        "$gte": new Date(yyyy, mm, dd - 1),
        "$lt": new Date(yyyy, mm, dd)
    };

    var resultData = [];

    teamModel.find(query).populate('memberList').execQ().then(function(result1){
        if (!result1) {
            throw new MKError('Cancel promise chains. Because Team not found!', MKError.errorCode.common.notFound);
        }

        var tempCount = 0;

        if(result1.length > 0){
            result1.forEach(function(team){
                if(Array.isArray(team.memberList)){
                    tempCount = tempCount + team.memberList.length + 1;
                }
            });
        }


        resultData.push ({
            date : yyyy + '/' + (mm+1) + '/' + (dd-1),
            teamList : result1,
            count : result1.length,
            memberCount : tempCount
        });


        query.joinCampaignTime = {
            "$gte": new Date(yyyy, mm, dd),
            "$lt": new Date(yyyy, mm, dd + 1)
        };

        return teamModel.find(query).populate('memberList').execQ();

    }).then(function(result2){

        if (!result2) {
            throw new MKError('Cancel promise chains. Because Team not found!', MKError.errorCode.common.notFound);
        }

        var tempCount = 0;

        if(result2.length > 0){
            result2.forEach(function(team){
                if(Array.isArray(team.memberList)){
                    tempCount = tempCount + team.memberList.length + 1;
                }
            });
        }



        resultData.push ({
            date : yyyy + '/' + (mm+1) + '/' + dd,
            teamList : result2,
            count : result2.length,
            memberCount : tempCount
        });

        res.status(200).send(resultData);

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

    }).then(function(savedDoc){
        if(savedDoc[1] !== 1){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }

        dataSeminar.belongToCampaign = savedDoc[0]._id;
        dataSeminar.saveQ();

        return res.status(200).send({message: "Assign seminar to campaign success."});

    }).fail(function(err){
        next (err);
    }).done();
};



exports.removeMarkSimosSeminarFromCampaign = function(req, res, next){
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

        resultCampaign.seminarListMarksimos.forEach(function(seminar, index){

            if(dataSeminar._id.equals(seminar)){
                resultCampaign.seminarListMarksimos.splice(index, 1);
            }
        });

        return resultCampaign.saveQ();

    }).then(function(savedDoc){
        if(savedDoc[1] !== 1){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: "Remove seminar from campaign success."})

    }).fail(function(err){
        next (err);
    }).done();
};






exports.addTeamToCampaign = function(req, res, next){

    var validationErrors = campaignModel.addTeamValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    if(req.user.role === userRoleModel.roleList.student.id && req.user.username !== req.body.username ){
        // For student role
        return res.status(400).send( {message: 'only student own team can join campaign'} );
    }



    var dataTeam, dataUser ;

    userModel.findOneQ({username : req.body.username}).then(function(resultUser){

        if(!resultUser){
            throw new Error('Cancel promise chains. Because User not found !');
        }

        if(typeof resultUser.firstName === 'undefined' || typeof resultUser.currentLocation === 'undefined' || resultUser.firstName == '' || resultUser.currentLocation == ''){
            throw new Error('Cancel promise chains. Because team creator name and currentLocation can not empty!');
        }

        if(typeof resultUser.eductionBackgrounds === 'undefined' ||  resultUser.eductionBackgrounds.length < 1){
            throw new Error('Cancel promise chains. Because team creator eductionBackgrounds can not empty!');
        }

        dataUser = resultUser;
        return teamModel.findOne({creator : resultUser._id}).populate('memberList').execQ();

    }).then(function(resultTeam) {
        if (!resultTeam) {
            throw new Error('Cancel promise chains. Because Team not found !');
        }

        if(resultTeam.name == ''){
            throw new Error('Cancel promise chains. Because team name can not empty !');
        }

        if(resultTeam.memberList.length < 4){
            throw new Error('Cancel promise chains. Because team at least need 5 member !');
        }

        resultTeam.memberList.forEach(function(user){
            if(typeof user.firstName === 'undefined' || typeof user.currentLocation === 'undefined' || user.firstName == '' || user.currentLocation == ''){
                throw new Error('Cancel promise chains. Because team member name and currentLocation can not empty !');
            }
        });


        dataTeam = resultTeam;
        return campaignModel.findByIdQ(req.body.campaignId);

    }).then(function(resultCampaign){
        if(!resultCampaign){
            throw new Error('Cancel promise chains. Because Campaign not found !');
        }


        resultCampaign.teamList.forEach(function(team){

            if(dataTeam._id.equals(team)  ){
                throw new Error('Cancel promise chains. Because this team already assigned to this campaign !');
            }
        });

        resultCampaign.teamList.push(dataTeam._id);

        return resultCampaign.saveQ();

    }).then(function(savedDoc){
        if(savedDoc[1] !== 1){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }

        dataTeam.joinCampaignTime = new Date();
        dataTeam.save();

        var messageXSend = new MessageXSend();
        messageXSend.add_to(dataUser.mobilePhone);
        messageXSend.set_project('xyUwS4');

        var xsendQ = Q.nbind(messageXSend.xsend, messageXSend);
        xsendQ();

        return res.status(200).send({message: "Assign team to campaign success."});

    }).fail(function(err){
        next (err);
    }).done();
};




exports.removeTeamFromCampaign = function(req, res, next){
    var validationErrors = campaignModel.removeTeamValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var dataTeam ;
    teamModel.findByIdQ(req.body.teamId).then(function(resultTeam){

        if(!resultTeam){
            throw new Error('Cancel promise chains. Because Team not found !');
        }
        dataTeam = resultTeam;

        return campaignModel.findByIdQ(req.body.campaignId);

    }).then(function(resultCampaign){
        if(!resultCampaign){
            throw new Error('Cancel promise chains. Because Campaign not found !');
        }

        resultCampaign.teamList.forEach(function(team, index){

            if(dataTeam._id.equals(team)){
                resultCampaign.teamList.splice(index, 1);
            }
        });

        return resultCampaign.saveQ();

    }).then(function(savedDoc){
        if(savedDoc[1] !== 1){
            throw new Error('Cancel promise chains. Because Update campaign failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: "Remove team from campaign success."})

    }).fail(function(err){
        next (err);
    }).done();
};




