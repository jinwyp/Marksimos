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

var multer = require('multer');
var mkdirp = require('mkdirp');


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


FileStorage.multerUpload = function(targetpath){

    var baseUrl = './public/app/uploadimage/';
    var targetPath = targetpath || 'defaultfilepath';
    var tempPath = baseUrl + 'temp';
    console.log("a--------------", tempPath);
    return multer({
        dest : tempPath,
        limits: {
            fieldNameSize: 100,
            files: 2,
            fileSize: 1 * 1024 * 1024
        },
        rename: function (fieldname, filename, req, res) {
            var datenow = new Date();
            var datenowString = datenow.getFullYear() + '_' + datenow.getMonth() + '_' + datenow.getDate() + '_' + datenow.getHours() + '_' + datenow.getMinutes() + '_' + datenow.getSeconds() + '_';
            return datenowString + filename.replace(/\W+/g, '_').toLowerCase() +  '_' + datenow.getTime();
        },
        onFileUploadStart: function (file, req, res) {
            console.log('Upload field : ', file.fieldname + '. File name : ' + file.originalname + ' is starting ...')

            targetPath = mkdirp.sync(baseUrl + targetPath);

        },
        onFileUploadComplete: function (file, req, res) {
            console.log('Upload Finished. File name ' + file.originalname + ' uploaded to  ' + file.path);
            console.log(req.files);
            //return res.send({message:"File uploaded."});
        }
    });
};