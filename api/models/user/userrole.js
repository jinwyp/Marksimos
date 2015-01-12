/**
 * Created by jinwyp on 1/5/15.
 */

/**
 * User Role Model module.
 * @module Model User Role
 * @see module: api/model/user/userrole.js
 */

var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');



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
        id : 9,
        name : 'enterprise',
        permissions :[]
    }

];

var roleResult = {};
var getRole = function (){
    roles.forEach(function(role){
        roleResult[role.name] = role ;
        roleResult[role.id] = role ;
    });
    console.log(roleResult);
    return roleResult
};





var apps = {

    marksimos : {
        id : 10,
        name : 'marksimos'
    },
    etales: {
        id : 20,
        name : 'etales'
    }

};


module.exports = {
    apps : apps,
    appResource : appResource,
    roles : roles,
    role : getRole()

};