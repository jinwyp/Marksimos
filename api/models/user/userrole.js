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
        studentLogin : 'studentLogin',  // For Render ejs views of student
        adminLogin : 'adminLogin',      // For Render ejs views of admin

        studentInfoSingleGet : 'studentInfoSingleGet',  // For student
        studentInfoSingleCUD : 'studentInfoSingleCUD',  // For student
        studentInfoListGet   : 'studentInfoListGet',    // For admin facilitator

        distributorInfoSingleGet : 'distributorInfoSingleGet',
        distributorInfoSingleCUD : 'distributorInfoSingleCUD',
        distributorInfoListGet   : 'distributorInfoListGet',

        facilitatorInfoSingleGet : 'facilitatorInfoSingleGet',
        facilitatorInfoSingleCUD : 'facilitatorInfoSingleCUD',
        facilitatorInfoListGet   : 'facilitatorInfoListGet',


        glossarySingleGet   : 'glossarySingleGet',        // For  facilitator
        glossarySingleCUD   : 'glossarySingleCUD',        // For  facilitator
        glossaryInfoListGet : 'glossaryInfoListGet',      // For  facilitator


        teamInfoSingleGet : 'teamInfoSingleGet',  // For student
        teamInfoSingleCUD : 'teamInfoSingleCUD',  // For student
        teamInfoListGet   : 'teamInfoListGet',    // For student


        campaignSingleGet   : 'campaignSingleGet',        // For  facilitator
        campaignSingleCUD   : 'campaignSingleCUD',        // For  facilitator
        campaignInfoListGet : 'campaignInfoListGet',      // For  facilitator

        seminarSingleGet         : 'seminarSingleGet',        // For  facilitator
        seminarSingleCUD         : 'seminarSingleCUD',        // For  facilitator

        seminarSingleDecisionGet : 'seminarSingleDecisionGet',  // For student
        seminarSingleDecisionCUD : 'seminarSingleDecisionCUD',  // For student

        seminarAssignStudentCUD : 'seminarAssignStudentCUD',  // For  facilitator
        seminarInit             : 'seminarInit',              // For  facilitator
        seminarRunRound         : 'seminarRunRound',          // For  facilitator

        seminarListOfStudentGet          : 'seminarListOfStudentGet',      // For student
        seminarListOfFacilitatorGet      : 'seminarListOfFacilitatorGet',  // For  facilitator
        seminarDecisionsOfFacilitatorCUD : 'seminarDecisionsOfFacilitatorCUD'  // For  facilitator

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
        permissions :[
            appResource.marksimos.adminLogin,

            appResource.marksimos.distributorInfoSingleGet,
            appResource.marksimos.distributorInfoSingleCUD,
            appResource.marksimos.distributorInfoListGet,

            appResource.marksimos.facilitatorInfoSingleGet,
            appResource.marksimos.facilitatorInfoListGet,

            appResource.marksimos.studentInfoSingleGet,
            appResource.marksimos.studentInfoListGet

        ]
    },
    {
        id : 2,
        name : 'distributor',
        permissions :[
            appResource.marksimos.adminLogin,

            appResource.marksimos.distributorInfoSingleGet,
            appResource.marksimos.distributorInfoSingleCUD,

            appResource.marksimos.facilitatorInfoSingleGet,
            appResource.marksimos.facilitatorInfoSingleCUD,
            appResource.marksimos.facilitatorInfoListGet

        ]
    },
    {
        id : 3,
        name : 'facilitator',
        permissions :[
            appResource.marksimos.adminLogin,

            appResource.marksimos.facilitatorInfoSingleGet,
            appResource.marksimos.facilitatorInfoSingleCUD,

            appResource.marksimos.studentInfoSingleGet,
            appResource.marksimos.studentInfoSingleCUD,
            appResource.marksimos.studentInfoListGet,

            appResource.marksimos.glossarySingleGet,
            appResource.marksimos.glossarySingleCUD,
            appResource.marksimos.glossaryInfoListGet,

            appResource.marksimos.campaignSingleGet,
            appResource.marksimos.campaignSingleCUD,
            appResource.marksimos.campaignInfoListGet,


            appResource.marksimos.seminarSingleGet,
            appResource.marksimos.seminarSingleCUD,

            appResource.marksimos.seminarAssignStudentCUD,
            appResource.marksimos.seminarInit,
            appResource.marksimos.seminarRunRound,

            appResource.marksimos.seminarListOfFacilitatorGet,
            appResource.marksimos.seminarDecisionsOfFacilitatorCUD

        ]
    },
    {
        id : 4,
        name : 'student',
        permissions :[
            appResource.marksimos.studentLogin,

            appResource.marksimos.studentInfoSingleGet,
            appResource.marksimos.studentInfoSingleCUD,

            appResource.marksimos.teamInfoSingleGet,
            appResource.marksimos.teamInfoSingleCUD,
            appResource.marksimos.teamInfoListGet,

            appResource.marksimos.campaignSingleGet,

            appResource.marksimos.seminarListOfStudentGet,
            appResource.marksimos.seminarSingleDecisionGet,
            appResource.marksimos.seminarSingleDecisionCUD,

            appResource.marksimos.glossaryInfoListGet

        ]
    },
    {
        id : 9,
        name : 'enterprise',
        permissions :[]
    },

    {
        id : 10,
        name : 'mentor',
        permissions :[]
    }

];

var roleListResult = {};
var getRoleList = function (){
    roles.forEach(function(role){
        roleListResult[role.name] = role ;
        roleListResult[role.id] = role ;
    });
    return roleListResult;
};


/**
 * Authorize Resource Permission of specified Role.
 * @constructor
 * @param {string} resource - The resource  of the Resource Permission.
 * @param {string} userroleid - The userroleid of the user.
 */

var authorizeRolePermission = function(resource, userroleid){
    if (userroleid > 0){

        var role = roleListResult[userroleid];

        if(role.permissions.indexOf(resource) > -1){
            return true
        }
    }
    return false
};




/**
 * GameList  (Will Store in Schema)
 */

var games = [
    {
        id : 10,
        name : 'marksimos'
    },
    {
        id : 30,
        name : 'etales'
    }
];

var gameListResult = {};
var getGameList = function (){
    games.forEach(function(game){
        gameListResult[game.name] = game ;
        gameListResult[game.id] = game ;
    });
    return gameListResult
};

module.exports = {
    games : games,
    gameList : getGameList(),
    right : appResource,
    roles : roles,
    roleList : getRoleList(),
    authRolePermission : authorizeRolePermission
};