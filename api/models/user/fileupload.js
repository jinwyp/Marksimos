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

var basePath = config.fileUploadDirectory;
var uploadPath = 'app/uploadimage/';

var defaultPath = uploadPath + 'default_file_path';
var tempPath = uploadPath + 'temp';

var targetPath = defaultPath;

mkdirp.sync(basePath + defaultPath);
mkdirp.sync(basePath + tempPath);




/**
 * Mongoose schema
 */
var fileStorageSchema = new Schema({

    name: { type: String },
    path:{ type: String },
    physicalAbsolutePath:{ type: String },
    uploadOriginalName: { type: String },
    uploadOriginalFileSize: { type: Number },

    mimetype: { type: String },
    encoding: { type: String },
    extension: { type: String },
    truncated: { type: Boolean , default: false},

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



var mimeTypeLimit = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/bmp',
    'image/gif',

];

var uploadFeatureList = [
    {
        name : 'studentProfile',
        prefix : 'student_profile',
        postBodyField : [
            {
                name : 'studentavatar',
                filePath : 'avatar'
            }
        ]
    },

    {
        name : 'adminCampaignInfo',
        prefix : 'admin_campaign',
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
        mkdirp.sync(basePath + uploadPath +  feature.prefix + '_' + field.filePath);
    });
});




FileStorage.multerUpload = function(fieldname){

    return multer({
        dest : basePath + tempPath,
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

        onFileUploadStart: function (file, req, res) {

            if (mimeTypeLimit.indexOf(file.mimetype) === -1 ) {
                return false;
            }

            if (uploadFieldsLimit.indexOf(file.fieldname) === -1 || fieldname !== file.fieldname ){
                //logger.log('Upload file failed! Form fieldname: ' + file.fieldname + '. File name: ' + file.originalname);
                return false;
            }else{
                //logger.log('Starting upload ... Form fieldname: '+ file.fieldname + '. File name: ' + file.originalname);
            }
        },

        onFileUploadComplete: function (file, req, res) {
            uploadFeatureList.forEach(function(feature){
                feature.postBodyField.forEach(function(field){

                    if(field.name ===  file.fieldname){
                        targetPath =  uploadPath +  feature.prefix + '_' + field.filePath + '/';
                    }
                });
            });

            // move to new folder path
            fs.renameSync(file.path, basePath + targetPath + file.name);

            file.path = targetPath + file.name;
            file.pathAbsolute = basePath + targetPath + file.name;

            //logger.log('Upload Finished. File name ' + file.originalname + ' uploaded to  ' + file.path);
        }
    });
};