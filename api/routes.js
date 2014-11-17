var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var reportController = require('./controllers/report.js');
var initController = require('./controllers/init.js');
var userController = require('./controllers/user.js');
var distributorController = require('./controllers/distributor.js');
var facilitatorController = require('./controllers/facilitator.js');
var studentController = require('./controllers/student.js');
var seminarController = require('./controllers/seminar.js');
var questionnaireController = require('./controllers/questionnaire.js');
var faqController  =  require('./controllers/faq.js');
var utility = require('../common/utility.js')
var userModel = require('./models/user.js');
var logger = require('../common/logger.js');
var mongoose = require('mongoose');
var util = require('util');
var express = require('express');
var sessionOperation = require('../common/sessionOperation.js');

var config = require('../common/config.js');

var apiRouter = express.Router();



/**********    For Testing    **********/

apiRouter.get('/viewsession', function(req, res){
    res.send(req.session);
});





/**********    Routes for rendering templates HCD Learning Website    **********/

apiRouter.get('/', function(req, res, next){
    res.redirect('/cn');
});





/**********    set Content-Type for all API JSON resppnse    **********/

apiRouter.all("/e4e/api/*", function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});

apiRouter.all("/marksimos/api/*", function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});





/**********    Routes for rendering templates E4E Website    **********/

apiRouter.get('/e4e', function(req, res, next){
    res.render('e4e/index.ejs',{title:'HCD E4E'});
});

apiRouter.get('/e4e/register/company', function(req, res, next){
    res.render('e4e/company-register.ejs',{title:'HCD E4E'});
});

apiRouter.get('/e4e/register/student', function(req, res, next){
    res.render('e4e/student-register.ejs',{title:'HCD E4E'});
});

apiRouter.get('/e4e/company-success', function(req, res, next){
    res.render('e4e/company-success.ejs',{title:'HCD E4E'});
});
apiRouter.get('/e4e/student-success', function(req, res, next){
    res.render('e4e/student-success.ejs',{title:'HCD E4E'});
});




/**********   API For E4E   **********/
apiRouter.post('/e4e/api/registercompany',userController.registerE4Ecompany);
apiRouter.post('/e4e/api/registerstudent',userController.registerE4Estudent);








/**********    Routes for rendering templates MarkSimos User/Student    **********/

apiRouter.get('/marksimos', requireStudentLogin({ isRedirect : true }), function(req, res, next){
    res.redirect('/marksimos/intro');
});

apiRouter.get('/marksimos/login', function(req, res, next){
    res.render('marksimosuser/userlogin.ejs', { title : 'MarkSimos - Sign In'});
});

apiRouter.get('/marksimos/intro', requireStudentLogin({ isRedirect : true }), function(req, res, next){
    res.render('marksimosuser/userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
});

apiRouter.get('/marksimos/home', requireStudentLogin({ isRedirect : true }), function(req, res, next){
    res.render('marksimosuser/userhome.ejs', { title : 'MarkSimos - User Home'});
});



apiRouter.get('/marksimos/help', function(req, res, next){
    res.render('marksimosuser/userhelp.ejs', { title : 'MarkSimos - Help'});
});

//download file
apiRouter.get('/marksimos/download/manualeng', function(req, res, next){
    res.download('./public/app/file/MarkSimos_Participants_Manual.pdf');
});

apiRouter.get('/marksimos/download/manualchs', function(req, res, next){
    res.download('./public/app/file/MarkSimos_Participants_Manual_chs.pdf');
});

apiRouter.get('/marksimos/manual/zh_CN',function(req,res,next){
    res.render('marksimosuser/help/manual_cn.md',{layout:false});
});

apiRouter.get('/marksimos/manual/en_US',function(req,res,next){
    res.render('marksimosuser/help/manual_en.md',{layout:false});
});





// apiRouter.get('/activate', function(req, res, next){
//     var email = req.query.email;
//     var token = req.query.token;

//     if(!email){
//         return res.send(400, {message: 'email is required.'})
//     }

//     if(!token){
//         return res.send(400, {message: 'token is required.'})
//     }

//     userModel.findByEmailAndToken(email, token)
//         .then(function(result){
//             if(result){
//                 return userModel.updateByEmail(email, {
//                     emailActivated: true
//                 })
//                     .then(function(numAffected){
//                         if(numAffected === 1){
//                             return res.redirect('/login');
//                         }
//                         throw new Error('more or less than 1 record is updated. it should be only one.')
//                     });
//             }else{
//                 throw new Error('User does not exist.');
//             }
//         })
//         .fail(function(err){
//             logger.error(err);
//             res.send(500, {message: 'activate failed.'})
//         })
//         .done();
// });




/**********    Routes for rendering templates Administrator    **********/

apiRouter.get('/marksimos/admin', function(req, res, next){
    res.render('marksimosadmin/adminlogin.ejs', {title : 'Admin | Log in'});
});

apiRouter.get('/marksimos/adminhome', requireAdminLogin({isRedirect : true}), function(req, res, next){
    res.render('marksimosadmin/adminhome.ejs', {title : 'Admin | Dashboard'});
});

apiRouter.get('/marksimos/adminhomereport/:seminar_id', requireAdminLogin({isRedirect : true}), authorize('chooseSeminar'), seminarController.chooseSeminarForFacilitator);
















/**********    API For MarkSimos Student    **********/

apiRouter.post('/marksimos/api/register', userController.register);
apiRouter.post('/marksimos/api/login', userController.studentLogin);
apiRouter.get('/marksimos/api/logout', userController.logout);

apiRouter.get('/marksimos/api/create_admin', function (req,res,next) {

    var userList = [
        {
            "username": "hcd_administrator",
            "password": utility.hashPassword("admin1234@hcd"),
            "email": "hcd_administrator@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "role": config.role.admin,
            "activated": true,
            "emailActivated": true,
            "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694"
        },
        {
            "_id": mongoose.Types.ObjectId("54609f0c700a570813b1353f"),
            "username": "hcd_distributor",
            "email": "hcd_distributor@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("distributor@hcd5678"),
            "district": "Ren Min Lu",
            "street": "",
            "idcardNumber": "",
            "numOfUsedLicense": 0,
            "numOfLicense": 10000,
            "role": config.role.distributor,
            "activated": true,
            "emailActivated": true,
            "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694"
        },
        {
            "_id": mongoose.Types.ObjectId("54609fb2700a570813b13540"),
            "username": "hcd_facilitator",
            "email": "hcd_facilitator@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("hcdfacilitator@9876"),
            "distributorId": "54609f0c700a570813b1353f",
            "numOfUsedLicense": 0,
            "numOfLicense": 100,
            "role": config.role.facilitator,
            "activated": true,
            "emailActivated": true,
            "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694"
        },
        {
            "username": "sunyun",
            "email": "yunsun@hcdlearning.com",
            "mobilePhone": "13817304511",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("123456"),
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "yun",
            "lastName": "sun",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": config.role.student,
            "activated": true,
            "emailActivated": false
        },
        {
            "username": "jin",
            "email": "jinwang@hcdlearning.com",
            "mobilePhone": "13564568304",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("123456"),
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "yun1",
            "lastName": "sun",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": config.role.student,
            "activated": true,
            "emailActivated": false
        },
        {
            "username": "sunhao",
            "email": "haosun@hcdglobal.com",
            "mobilePhone": "18019419955",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("123456"),
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "yun2",
            "lastName": "sun",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": config.role.student,
            "activated": true,
            "emailActivated": false
        }
    ];
    userModel.query.find({role: config.role.admin}).exec().then(function (userResult) {
        if (userResult.length) {
            //已经存在管理员了，不进行初始化，只列出这些用户
            return res.send(400, {message: "already added."});
        }
        else {
            //不存在管理员，需要初始化
            userModel.query.create(userList, function (err, user) {
                if (err) {
                    return res.send(400, {message: "add users failed."});
                } else {
                    return res.send(userList);
                }
            });
        }
    });
})

// get FAQ

apiRouter.get('/marksimos/api/initfaq', faqController.initFAQ);
apiRouter.get('/marksimos/api/faq', faqController.getFAQ);

//getQuestionnaire
apiRouter.get('/marksimos/api/questionnaire',requireStudentLogin({isRedirect : false}),questionnaireController.getQuestionnaire);
apiRouter.put('/marksimos/api/questionnaire',requireStudentLogin({isRedirect : false}),questionnaireController.updateQuestionnaire);


// get seminar
apiRouter.get('/marksimos/api/user', requireStudentLogin({isRedirect : false}), userController.getUser);
apiRouter.get('/marksimos/api/student/seminar', requireStudentLogin({isRedirect : false}), authorize('getSeminarOfStudent'), studentController.getSeminarOfStudent);
apiRouter.get('/marksimos/api/studentinfo', requireStudentLogin({isRedirect : false}), authorize('getStudent'),userController.getStudent);

//report
apiRouter.get('/marksimos/api/report/:report_name', requireStudentLogin({isRedirect : false}), reportController.getReport);
apiRouter.get('/marksimos/api/choose_seminar', requireStudentLogin({isRedirect : false}), authorize('chooseSeminar'), seminarController.chooseSeminarForStudent);
apiRouter.get('/marksimos/api/submitdecision', requireStudentLogin({isRedirect : false}), decisionController.submitDecision);

apiRouter.get('/marksimos/api/finalscore/:period', requireStudentLogin({isRedirect : false}), reportController.getFinalScore);

//chart
apiRouter.get('/marksimos/api/chart/:chart_name', requireStudentLogin({isRedirect : false}), chartController.getChart);


//make decision page
apiRouter.put('/marksimos/api/sku/decision', requireStudentLogin({isRedirect : false}), decisionController.updateSKUDecision);
apiRouter.post('/marksimos/api/sku/decision', requireStudentLogin({isRedirect : false}), decisionController.addSKU);
apiRouter.delete('/marksimos/api/sku/decision/:brand_id/:sku_id', requireStudentLogin({isRedirect : false}), decisionController.deleteSKU);
apiRouter.put('/marksimos/api/brand/decision', requireStudentLogin({isRedirect : false}), decisionController.updateBrandDecision);
apiRouter.post('/marksimos/api/brand/decision', requireStudentLogin({isRedirect : false}), decisionController.addBrand);
apiRouter.delete('/marksimos/api/brand/decision', requireStudentLogin({isRedirect : false}), decisionController.deleteBrand);
apiRouter.put('/marksimos/api/company/decision', requireStudentLogin({isRedirect : false}), decisionController.updateCompanyDecision);


apiRouter.get('/marksimos/api/company', requireStudentLogin({isRedirect : false}), decisionController.getDecision);

apiRouter.get('/marksimos/api/product_portfolio', requireStudentLogin({isRedirect : false}), decisionController.getProductPortfolio);
apiRouter.get('/marksimos/api/spending_details', requireStudentLogin({isRedirect : false}), decisionController.getSpendingDetails);
apiRouter.get('/marksimos/api/future_projection_calculator/:sku_id', requireStudentLogin({isRedirect : false}), decisionController.getSKUInfo);
apiRouter.get('/marksimos/api/company/otherinfo', requireStudentLogin({isRedirect : false}), decisionController.getOtherinfo);





/**********  API For Administrator  **********/
apiRouter.post('/marksimos/api/admin/login', userController.adminLogin);

apiRouter.get('/marksimos/api/admin/distributors', requireAdminLogin({isRedirect : false}), authorize('searchDistributor'), distributorController.searchDistributor);
apiRouter.post('/marksimos/api/admin/distributors', requireAdminLogin({isRedirect : false}), authorize('addDistributor'), distributorController.addDistributor);
apiRouter.put('/marksimos/api/admin/distributors/:distributor_id', requireAdminLogin({isRedirect : false}), authorize('updateDistributor'), distributorController.updateDistributor);


apiRouter.get('/marksimos/api/admin/facilitators', requireAdminLogin({isRedirect : false}), authorize('searchFacilitator'), facilitatorController.searchFacilitator);
apiRouter.post('/marksimos/api/admin/facilitators', requireAdminLogin({isRedirect : false}), authorize('addFacilitator'), facilitatorController.addFacilitator);
apiRouter.put('/marksimos/api/admin/facilitators/:facilitator_id', requireAdminLogin({isRedirect : false}), authorize('updateFacilitator'), facilitatorController.updateFacilitator);

apiRouter.get('/marksimos/api/admin/facilitator/seminar', requireAdminLogin({isRedirect : false}), authorize('getSeminarOfFacilitator'), facilitatorController.getSeminarOfFacilitator);
apiRouter.post('/marksimos/api/admin/seminar', requireAdminLogin({isRedirect : false}), authorize('addSeminar'), seminarController.addSeminar);


apiRouter.get('/marksimos/api/admin/students', requireAdminLogin({isRedirect : false}), authorize('searchStudent'), studentController.searchStudent);
apiRouter.post('/marksimos/api/admin/students', requireAdminLogin({isRedirect : false}), authorize('addStudent'), studentController.addStudent);
apiRouter.put('/marksimos/api/admin/students/:student_id', requireAdminLogin({isRedirect : false}), authorize('updateStudent'), studentController.updateStudent);


//get all seminars of the current student
apiRouter.post('/marksimos/api/admin/assign_student_to_seminar', requireAdminLogin({isRedirect : false}), authorize('assignStudentToSeminar'), seminarController.assignStudentToSeminar);
apiRouter.post('/marksimos/api/admin/remove_student_from_seminar', requireAdminLogin({isRedirect : false}), authorize('removeStudentFromSeminar'), seminarController.removeStudentFromSeminar);

apiRouter.post('/marksimos/api/admin/init', requireAdminLogin({isRedirect : false}), initController.init());
apiRouter.post('/marksimos/api/admin/runsimulation/:seminar_id/:round',  requireAdminLogin({isRedirect : false}), authorize('runSimulation'), initController.runSimulation());

//reset student password
apiRouter.post('/marksimos/api/admin/resetPassword', requireAdminLogin({isRedirect : false}), authorize('updateStudent'), studentController.resetPassword);


// get current admin role
apiRouter.get('/marksimos/api/admin/user', requireAdminLogin({isRedirect : false}), userController.getUser);


//facilitator report & chart view
//note : To get full version of some reports, plz make sure user role != student
//TODO: decision modification for facilitator 
apiRouter.get('/marksimos/api/admin/report/:report_name', requireAdminLogin({isRedirect : false}), reportController.getReport);
apiRouter.get('/marksimos/api/admin/chart/:chart_name', requireAdminLogin({isRedirect : false}), chartController.getChart);
apiRouter.get('/marksimos/api/admin/finalscore/:period', requireAdminLogin({isRedirect : false}), reportController.getFinalScore);


function requireStudentLogin(params){
    return function(req, res, next){
        if(sessionOperation.getStudentLoginStatus(req)){
            next();
        }else{
            if(params.isRedirect){
                res.redirect('/marksimos/login');
            } else {
                res.send(400, {message: 'Student Login required.'});
            }
        }
    }
}

function requireAdminLogin(params){
    return function(req, res, next){
        if(sessionOperation.getAdminLoginStatus(req)){
            next();
        }else{
            if(params.isRedirect){
                res.redirect('/marksimos/admin');
            } else {
                res.send(400, {message: 'Admin Login required.'});
            }
        }
    }
}


/**
 * @param {String} resource identifier of url
 */
function authorize(resource){
    var authDefinition = {};
    authDefinition[config.role.admin] = [
        'addDistributor',
        'updateDistributor',
        'searchDistributor',

        'searchFacilitator',

        'searchStudent'
    ];
    authDefinition[config.role.distributor] = [
        'updateDistributor',

        'addFacilitator',
        'updateFacilitator',
        'searchFacilitator'
    ];
    authDefinition[config.role.facilitator] = [
        'updateFacilitator',

        'addStudent',
        'updateStudent',
        'searchStudent',

        'addSeminar',
        'chooseSeminar',

        'assignStudentToSeminar',
        'removeStudentFromSeminar',

        'getSeminarOfFacilitator',

        'runSimulation'
    ];
    authDefinition[config.role.student] = [
        'getStudent',
        'updateStudent',
        'chooseSeminar',
        'getSeminarOfStudent'
    ];

    return function authorize(req, res, next){
        var role = sessionOperation.getUserRole(req);
        //admin can do anything
        // if(role === config.role.admin){
        //     return next();
        // }

        if(authDefinition[role].indexOf(resource) > -1){
            next();
        }else{
            res.send(403, {message: 'You are not authorized.'});
        }
    }
}


module.exports = apiRouter;
   
