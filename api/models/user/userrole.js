/**
 * Created by jinwyp on 1/5/15.
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



var roles = [
    {
        id : 1,
        name : 'admin',
        permissions :[ marksimos.studentInfoSingleGet ]
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

]


