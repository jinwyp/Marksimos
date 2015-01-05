/**
 * Created by jinwyp on 1/5/15.
 */



var rolePermissions = {

    marksimosStudent : [],
    marksimosEnterprise : [],

    marksimosAdministrator : [],
    marksimosDistributor : [],
    marksimosFacilitator : []

};



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




