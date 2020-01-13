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
var uploadPath = basePath + 'app/uploadimage/';

var defaultPath = uploadPath + 'default_file_path';

mkdirp.sync(defaultPath);



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
                name : 'uploadListCover',
                filePath : 'listcover'
            },
            {
                name : 'uploadFirstCover',
                filePath : 'firstcover'
            },
            {
                name : 'uploadBenefit1',
                filePath : 'benefit'
            },
            {
                name : 'uploadBenefit2',
                filePath : 'benefit'
            },
            {
                name : 'uploadBenefit3',
                filePath : 'benefit'
            },
            {
                name : 'uploadQualification',
                filePath : 'qualification'
            },
            {
                name : 'uploadProcess',
                filePath : 'process'
            }
        ]
    }

];




var uploadFieldsLimit = [];

uploadFeatureList.forEach(function(feature){
    feature.postBodyField.forEach(function(field){
        uploadFieldsLimit.push(field.name);
        mkdirp.sync(uploadPath +  feature.prefix + '_' + field.filePath);
    });
});



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


fileStorageSchema.statics.creatFile = function (file, fieldname) {

    if( typeof file[fieldname] !== 'undefined' ) {
        var tempFile = file[fieldname][0];
        console.log(tempFile)


        return FileStorage.createQ({
            name: tempFile.filename,
            path: tempFile.path.replace(basePath, ''),
            physicalAbsolutePath: tempFile.path,

            uploadOriginalName: tempFile.originalname,
            uploadOriginalFileSize : tempFile.size,
            description : tempFile.fieldname,

            mimetype: tempFile.mimetype,
            encoding: tempFile.encoding,
            extension: tempFile.extension,
            truncated: tempFile.truncated
        });

    }else{
        throw new Error('Cancel. Because Upload File failed !');
    }

};


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





FileStorage.multerUpload = function(fieldname){
    fieldname = fieldname || '';

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var targetPath = '';

            uploadFeatureList.forEach(function(feature){
                feature.postBodyField.forEach(function(field){

                    if(field.name ===  file.fieldname){
                        targetPath = uploadPath + feature.prefix + '_' + field.filePath;
                    }
                });
            });

            cb(null, targetPath);
        },
        filename: function (req, file, cb) {

            function prefix(numberInput){
                if (numberInput<10) {
                    return '0' + numberInput.toString();
                }

                return numberInput.toString();
            }

            var dateNow = new Date();
            var dateNowString = dateNow.getFullYear().toString() + prefix(dateNow.getMonth()+1) + prefix(dateNow.getDate()) + '_' + prefix(dateNow.getHours()) + prefix(dateNow.getMinutes()) + prefix(dateNow.getSeconds()) + '_' + dateNow.getTime();

            cb(null, dateNowString + '_' + file.originalname.replace(/[^A-Za-z0-9_^\.]+/g, '_').toLowerCase() );
        }
    });


    return multer({
        storage: storage,
        limits: {
            fieldNameSize: 100,
            fields : 30,
            fieldSize : 1024,

            files: 2,
            fileSize: 1 * 1024 * 1024
        },

        fileFilter: function (req, file, cb) {

            if (mimeTypeLimit.indexOf(file.mimetype) === -1 ) {
                logger.log('Upload file failed! File mimetype : ' + file.mimetype + '. File name: ' + file.originalname);
                return cb(null, false);
            }

            if (uploadFieldsLimit.indexOf(file.fieldname) === -1 ) {
                logger.log('Upload file failed! Form fieldname: ' + file.fieldname + '. File name: ' + file.originalname);
                return cb(null, false);
            }

            if(fieldname !== '' && fieldname !== file.fieldname){
                logger.log('Upload file failed! Form fieldname: ' + file.fieldname + '. File name: ' + file.originalname);
                return cb(null, false);
            }

            logger.log('Starting upload ... Form fieldname: '+ file.fieldname + '. File name: ' + file.originalname);
            cb(null, true);
        },

    }).fields([{name: fieldname }]);
};
