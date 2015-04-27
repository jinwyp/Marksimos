/**
 * Created by jinwyp on 4/24/15.
 */


var tagModel = require('../../models/b2c/tag.js');




exports.addTag = function(req, res, next){
    var validationErrors = tagModel.addValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    tagModel.createQ({
        name : req.body.name || '',
        description : req.body.description || ''

    }).then(function(resultTag){
        if(!resultTag){
            throw new Error( "Cancel promise chains. save glossary to db failed.");
        }

        return res.status(200).send(resultTag);
    }).fail(next).done();


};




exports.updateTag = function(req, res, next){

};





exports.searchTag = function(req, res, next){

    var keywordSearch = req.query.keyword || '';

    var query = {};


    if (keywordSearch) {
        var strRegex = ".*[" + keywordSearch.split('').join('][') + "].*";
        var regex = { $regex: strRegex , $options: 'i' }; // $options : 'i' Means case insensitivity to match upper and lower cases. 不区分大小写

        query.$or = [
            { 'name': regex }
        ];
    }

    tagModel.find(query).sort({updatedAt:-1}).execQ().then(function(results){

        if(results){
            return res.status(200).send(results);
        }


    }).fail(next).done();

};





