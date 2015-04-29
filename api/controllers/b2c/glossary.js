/**
 * Created by jinwyp on 4/24/15.
 */


var glossaryModel = require('../../models/b2c/glossary.js');
var tagModel = require('../../models/b2c/tag.js');

var Segment = require('segment');


exports.addGlossary = function(req, res, next){
    var validationErrors = glossaryModel.addValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    if (!Array.isArray(req.body.tagList)) {
        return res.status(400).send( {message: 'Tag of Glossary is not array'} );
    }

    var tagsCreateOriginalTextArray = [];
    var tagsCreateResultIdArray = [];

    req.body.tagList.forEach(function( tag ){
        if(tag.text !== ""){
            tagsCreateOriginalTextArray.push(tag.text);
        }
    });

    tagModel.addTags(tagsCreateOriginalTextArray)
    .then(function(tags) {
        // 注意 createQ 后如果用Promise Q 返回的 有可能是 undefined 或 一个对象(只创建一个) 或 一个数组(创建多个数据)
        //if (typeof tags !== 'undefined') {
        //
        //    if (Array.isArray(tags)) {
        //        tags.forEach(function (tag) {
        //            tagsCreateResultIdArray.push(tag._id);
        //        });
        //    } else {
        //        tagsCreateResultIdArray.push(tags._id);
        //    }
        //}

        return tagModel.findQ({name : {$in : tagsCreateOriginalTextArray}});
    })
    .then(function(tagResult) {

        if (tagResult.length > 0) {
            tagResult.forEach(function (tag) {
                tagsCreateResultIdArray.push(tag._id);
            });
        }

        return glossaryModel.createQ({
            name : req.body.name || '',
            description : req.body.description || '',
            question : req.body.question || '',
            answer : req.body.answer || '',
            type : req.body.type,
            tagList : tagsCreateResultIdArray

        });
    })
    .then(function(resultGlossary){

        if(!resultGlossary){
            throw new Error( "Cancel promise chains. create glossary to db failed.");
        }

        return res.status(200).send(resultGlossary);

    }).fail(next).done();

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

    glossaryModel.find(query).sort({updatedAt:-1}).populate('tagList', tagModel.selectFields()).execQ().then(function(results){

        if(results){
            return res.status(200).send(results);
        }


    }).fail(next).done();

};





exports.searchGlossaryWithWord = function(req, res, next){

    var validationErrors = glossaryModel.searchWordValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var keywordSearch = req.body.keyword || '';
    var type = req.body.type || 'all';


    var segmentWord = new Segment();
    segmentWord.useDefault();

    var words = segmentWord.doSegment(keywordSearch);
    var wordsTextArray = [];
    var tagsResultIdArray = [];

    console.log("word: ", words);


    words.forEach(function( word ){
        wordsTextArray.push(word.w);
    });



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


    tagModel.findQ({name : { $in:wordsTextArray}})
    .then(function(tagResult) {

        if (tagResult.length > 0) {
            tagResult.forEach(function (tag) {
                tagsResultIdArray.push(tag._id);
            });
        }

        query.$or.push(
            { 'tagList': { $in: tagsResultIdArray } }
        );

        console.log("tagsResultIdArray: ", tagsResultIdArray);

        return glossaryModel.find(query).sort({updatedAt:-1}).execQ().then(function(results){

            if(results){
                return res.status(200).send(results);
            }


        }).fail(next).done();
    });











};





