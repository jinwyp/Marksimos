/**
 * Created by jinwyp on 4/24/15.
 */


var glossaryModel = require('../../models/b2c/glossary.js');
var tagModel = require('../../models/b2c/tag.js');




exports.addGlossary = function(req, res, next){
    var validationErrors = glossaryModel.addValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var aa =[];

    if (Array.isArray(aa)) {
        console.log('value is Array!');
    }


    glossaryModel.createQ({
        name : req.body.name || '',
        description : req.body.description || '',
        question : req.body.question || '',
        answer : req.body.answer || '',
        type : req.body.type

    }).then(function(resultGlossary){
        if(!resultGlossary){
            throw new Error( "Cancel promise chains. save glossary to db failed.");
        }

        return res.status(200).send(result);
    }).fail(next).done();




    userModel.findOneQ({_id: facilitatorId})
    .then(function(dbFacilitator){
        if(!dbFacilitator){
            throw new Error("Cancel promise chains. Can't find facilitator.");
        }

        if(dbFacilitator.numOfLicense <= 0){
            throw new Error("Cancel promise chains. You don't have enough licenses.");
        }

        return userModel.updateQ({_id: facilitatorId}, {
            numOfLicense: dbFacilitator.numOfLicense - 1,
            numOfUsedLicense: dbFacilitator.numOfUsedLicense + 1
        });
    }).then(function(numAffected){
        if(numAffected === 0 || numAffected > 1){
            throw new Error( "Cancel promise chains. update facilitator failed, or update more than one facilitator.");
        }

        //get all seminar, create the next seminar id
        return seminarModel.find({}).sort({seminarId: "desc"}).execQ();
    }).then(function(allSeminars){
        if(!allSeminars || allSeminars.length === 0){
            seminar.seminarId = "10000";
        }else{
            seminar.seminarId = parseInt(allSeminars[0].seminarId) + 1;
        }

        return seminarModel.createQ(seminar);
    }).then(function(result){
        if(!result){
            throw new Error( "Cancel promise chains. save seminar to db failed.");
        }

        return res.status(200).send(result);
    }).fail(function(err){
        next(err);
    }).done();
};