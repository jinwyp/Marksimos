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

    if (!Array.isArray(req.body.tagList)) {
        return res.status(400).send( {message: 'Tag of Glossary is not array'} );
    }

    var tagsCreate = [];
    var tagsResult = [];

    req.body.tagList.forEach(function( tag ){
        if(tag.text !== ""){
            tagsCreate.push({
                name : tag.text
            });
        }
    });


    tagModel.update({}, tagsCreate, {upsert: true}, function (err) {
        if (err) res.status(400).send( {message: 'Tag create error'} );

        for (var i=1; i<arguments.length; ++i) {
            tagsResult.push(arguments[i]._id);
        }

        console.log(tagsResult);

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

            return res.status(200).send(resultGlossary);
        }).fail(next).done();

    });



};




exports.updateGlossary = function(req, res, next){

};





exports.searchGlossary = function(req, res, next){

    var keywordSearch = req.query.keyword || '';
    var type = req.query.type || 'all';

    var query = {};

    if (type !== 'all') {
        query.$and = [
            { type: type }
        ];
    }

    if (keywordSearch) {
        var strRegex = ".*[" + keywordSearch.split('').join('][') + "].*";
        var regex = { $regex: strRegex , $options: 'i' }; // $options : 'i' Means case insensitivity to match upper and lower cases. 不区分大小写

        query.$or = [
            { 'name': regex },
            { 'question': regex }
        ];
    }

    glossaryModel.find(query).sort({updatedAt:-1}).execQ().then(function(results){

        if(results){
            return res.status(200).send(results);
        }


    }).fail(next).done();

};





