/**
 * Created by jinwyp on 3/12/15.
 */

'use strict';

/*!
 * Module dependencies
 */
var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var schemaObjectId = Schema.Types.ObjectId;

var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');
var config = require('../../../common/config.js');
var logger = require('../../../common/logger.js');

var multer = require('multer');
var mkdirp = require('mkdirp');
var fs = require('fs');

var baseUrl = config.fileUploadDirectory;
var defaultPath = 'default_file_path';
var tempPath = baseUrl + 'temp';
var targetPath = baseUrl + defaultPath;

mkdirp.sync(baseUrl + defaultPath);
mkdirp.sync( tempPath);



/**
 * Mongoose schema
 */
var fileStorageSchema = new Schema({

    name: { type: String },
    path:{ type: String },
    uploadOriginalName: { type: String },
    uploadOriginalFileSize: { type: String },

    description: { type: String }

});

/**
 * Mongoose plugin
 */
fileStorageSchema.plugin(mongooseTimestamps);


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */

fileStorageSchema.statics.updateValidations = function(req){

    req.checkBody('name', 'Team name should be 2-50 characters').notEmpty().len(2, 50);
    //req.checkBody('description', 'Team description should be 2-50 characters').notEmpty().len(2, 50);

    return req.validationErrors();

};

/**
 * Methods
 */



/**
 * Register Model
 */


var FileStorage = mongoose.model("FileStorage", fileStorageSchema);
module.exports = FileStorage;


var uploadFeatureList = [
    {
        name : 'studentProfile',
        filePath : 'student_profile',
        postBodyField : [
            {
                name : 'studentavatar',
                filePath : 'avatar'
            }
        ]
    },

    {
        name : 'adminCampaignInfo',
        filePath : 'admin_campaign',
        postBodyField : [
            {
                name : 'list',
                filePath : 'list'
            },
            {
                name : 'title',
                filePath : 'title'
            }
        ]
    }

];

var uploadFieldsLimit = [];

uploadFeatureList.forEach(function(feature){
    feature.postBodyField.forEach(function(field){
        uploadFieldsLimit.push(field.name);
        mkdirp.sync(baseUrl +  feature.filePath + '_' + field.filePath);
    });
});




FileStorage.multerUpload = function(){

    return multer({
        dest : tempPath,
        limits: {
            fieldNameSize: 100,
            fields : 30,
            fieldSize : 1024,

            files: 2,
            fileSize: 1 * 1024 * 1024
        },
        rename: function (fieldname, filename, req, res) {
            var datenow = new Date();
            var datenowString = datenow.getFullYear() + '_' + datenow.getMonth() + '_' + datenow.getDate() + '_' + datenow.getHours() + '_' + datenow.getMinutes() + '_' + datenow.getSeconds() + '_';
            return datenowString + filename.replace(/\W+/g, '_').toLowerCase() +  '_' + datenow.getTime();
        },
        //changeDest: function(dest, req, res) {
        //
        //    for (var key in req.body) {
        //        if(req.body.hasOwnProperty(key)  ){
        //
        //            uploadFeatureList.forEach(function(feature){
        //                feature.postBodyField.forEach(function(field){
        //
        //                    if(field.name === req.body[field.name]){
        //                        return baseUrl +  feature.filePath + '_' + field.filePath
        //                    }
        //                });
        //            });
        //        }
        //    }
        //
        //    return dest;
        //},
        onFileUploadStart: function (file, req, res) {

            if (uploadFieldsLimit.indexOf(file.fieldname) === -1)  {
                logger.log('Upload file failed! Form fieldname: ' + file.fieldname + '. File name: ' + file.originalname);
                return false;
            }else{
                logger.log('Starting upload ... Form fieldname: '+ file.fieldname + '. File name: ' + file.originalname);
            }

        },
        onFileUploadComplete: function (file, req, res) {


            uploadFeatureList.forEach(function(feature){
                feature.postBodyField.forEach(function(field){

                    if(field.name ===  file.fieldname){
                        targetPath =  baseUrl +  feature.filePath + '_' + field.filePath;
                    }
                });
            });

            //fs.renameSync(file.path, targetPath + file.name);

            logger.log('Upload Finished. File name ' + file.originalname + ' uploaded to  ' + file.path);
            console.log(req.files);
            //return res.send({message:"File uploaded."});
        }
    });
};