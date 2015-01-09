/**
 * Created by jinwyp on 1/5/15.
 */
var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');


/**
 * User Role Model module.
 * @module Model User Role
 * @see module: api/model/user/userrole.js
 */


/**
 * Resource Permission Name Have Two Type : Resource Get(Read) and Resource CUD(create, update and delete)
 */

var appResource = {

    marksimos : {
        studentInfoSingleGet : 'studentInfoSingleGet',
        studentInfoSingleCUD : 'studentInfoSingleCUD',
        studentSeminarListGet : 'studentSeminarListGet',
        studentSeminarListCUD : 'studentSeminarListCUD'
    },
    etales: {}

};



/**
 * UserRoles  (Will Store in Schema)
 */

var roles = [
    {
        id : 1,
        name : 'admin',
        permissions :[ appResource.marksimos.studentInfoSingleGet ]
    },
    {
        id : 2,
        name : 'distributor',
        permissions :[]
    },
    {
        id : 3,
        name : 'facilitator',
        permissions :[]
    },
    {
        id : 4,
        name : 'student',
        permissions :[]
    },
    {
        id : 5,
        name : 'enterpriseb2c',
        permissions :[]
    }

];


