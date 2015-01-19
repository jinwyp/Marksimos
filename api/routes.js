var decisionController = require('./controllers/marksimos/decision.js');
var chartController = require('./controllers/marksimos/chart.js');
var reportController = require('./controllers/marksimos/report.js');
var initController = require('./controllers/marksimos/init.js');
var authController = require('./controllers/user/authentication.js');
var distributorController = require('./controllers/user/admin.js');
var studentController = require('./controllers/user/student.js');
var seminarController = require('./controllers/marksimos/seminar.js');
var questionnaireController = require('./controllers/questionnaire.js');
var faqController  =  require('./controllers/faq.js');
var utility = require('../common/utility.js')
var userModel = require('./models/user/user.js');
var userRoleModel = require('./models/user/userrole.js');
var logger = require('../common/logger.js');
var mongoose = require('mongoose');
var util = require('util');
var express = require('express');
var sessionOperation = require('../common/sessionOperation.js');

var config = require('../common/config.js');

var apiRouter = express.Router();



/**********    Init Passport Auth    **********/
authController.initAuth();







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
apiRouter.post('/e4e/api/registercompany',authController.registerE4Ecompany);
apiRouter.post('/e4e/api/registerstudent',authController.registerE4Estudent);








/**********    Routes for rendering templates MarkSimos User/Student    **********/

apiRouter.get('/marksimos', authController.authLoginToken({failureRedirect: '/marksimos/login'}), authController.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
    res.redirect('/marksimos/intro');
});

apiRouter.get('/marksimos/login', function(req, res, next){
    res.render('marksimosuser/userlogin.ejs', { title : 'MarkSimos - Sign In'});
});

apiRouter.get('/marksimos/intro', authController.authLoginToken({failureRedirect: '/marksimos/login'}), authController.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
    res.render('marksimosuser/userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
});

apiRouter.get('/marksimos/home', authController.authLoginToken({failureRedirect: '/marksimos/login'}), authController.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
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

apiRouter.get('/marksimos/adminhome', authController.authLoginToken({failureRedirect: '/marksimos/admin'}), authController.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), function(req, res, next){
    res.render('marksimosadmin/adminhome.ejs', {title : 'Admin | Dashboard'});
});

apiRouter.get('/marksimos/adminhomereport/:seminar_id', authController.authLoginToken({failureRedirect: '/marksimos/admin'}), authController.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), seminarController.chooseSeminarForFacilitator);
















/**********    API For MarkSimos Student    **********/
apiRouter.post('/marksimos/api/login', authController.studentLogin);
apiRouter.get('/marksimos/api/logout', authController.logout);



//getQuestionnaire
apiRouter.get('/marksimos/api/questionnaire', authController.authLoginToken(),questionnaireController.getQuestionnaire);
apiRouter.put('/marksimos/api/questionnaire', authController.authLoginToken(),questionnaireController.submitQuestionnaire);


// get seminar
apiRouter.get('/marksimos/api/user', authController.authLoginToken(), authController.getUserInfo);
apiRouter.get('/marksimos/api/student/seminar', authController.authLoginToken(), authorize('getSeminarOfStudent'), studentController.getSeminarList);
apiRouter.get('/marksimos/api/studentinfo', authController.authLoginToken(), authorize('getStudent'),studentController.getSeminarInfo);

//report
apiRouter.get('/marksimos/api/report/:report_name', authController.authLoginToken(), reportController.getReport);
apiRouter.get('/marksimos/api/choose_seminar', authController.authLoginToken(), authorize('getSeminarOfStudent'), seminarController.chooseSeminarForStudent);


//chart
apiRouter.get('/marksimos/api/chart/:chart_name', authController.authLoginToken(), chartController.getChart);

//final score
apiRouter.get('/marksimos/api/finalscore', authController.authLoginToken(), reportController.getStudentFinalScore);


//make decision page
apiRouter.put('/marksimos/api/sku/decision', authController.authLoginToken(), decisionController.updateSKUDecision);
apiRouter.post('/marksimos/api/sku/decision', authController.authLoginToken(), decisionController.addSKU);
apiRouter.delete('/marksimos/api/sku/decision/:company_id/:brand_id/:sku_id',   authController.authLoginToken(), decisionController.deleteSKU);

apiRouter.put('/marksimos/api/brand/decision', authController.authLoginToken(), decisionController.updateBrandDecision);
apiRouter.post('/marksimos/api/brand/decision', authController.authLoginToken(), decisionController.addBrand);

apiRouter.put('/marksimos/api/company/decision', authController.authLoginToken(), decisionController.updateCompanyDecision);


apiRouter.get('/marksimos/api/company', authController.authLoginToken(), decisionController.getDecision);
apiRouter.get('/marksimos/api/product_portfolio', authController.authLoginToken(), decisionController.getProductPortfolio);
apiRouter.get('/marksimos/api/spending_details', authController.authLoginToken(), decisionController.getSpendingDetails);
apiRouter.get('/marksimos/api/future_projection_calculator/:sku_id', authController.authLoginToken(), decisionController.getSKUInfoFutureProjection);
apiRouter.get('/marksimos/api/company/otherinfo', authController.authLoginToken(), decisionController.getOtherinfo);





/**********  API For Administrator  **********/
apiRouter.post('/marksimos/api/admin/login', authController.adminLogin);

apiRouter.get('/marksimos/api/admin/distributors',  authController.authLoginToken(), authorize('searchDistributor'), distributorController.searchDistributor);
apiRouter.post('/marksimos/api/admin/distributors',  authController.authLoginToken(), authorize('addDistributor'), distributorController.addDistributor);
apiRouter.put('/marksimos/api/admin/distributors/:distributor_id',  authController.authLoginToken(), authorize('updateDistributor'), distributorController.updateDistributor);


apiRouter.get('/marksimos/api/admin/facilitators',  authController.authLoginToken(), authorize('searchFacilitator'), distributorController.searchFacilitator);
apiRouter.post('/marksimos/api/admin/facilitators',  authController.authLoginToken(), authorize('addFacilitator'), distributorController.addFacilitator);
apiRouter.put('/marksimos/api/admin/facilitators/:facilitator_id',  authController.authLoginToken(), authorize('updateFacilitator'), distributorController.updateFacilitator);

apiRouter.get('/marksimos/api/admin/facilitator/seminar',  authController.authLoginToken(), authorize('getSeminarOfFacilitator'), distributorController.getSeminarOfFacilitator);
apiRouter.post('/marksimos/api/admin/seminar',  authController.authLoginToken(), authorize('addSeminar'), seminarController.addSeminar);


apiRouter.get('/marksimos/api/admin/students',  authController.authLoginToken(), authorize('searchStudent'), distributorController.searchStudent);
apiRouter.post('/marksimos/api/admin/students',  authController.authLoginToken(), authorize('addStudent'), distributorController.addStudent);
apiRouter.put('/marksimos/api/admin/students/:student_id',  authController.authLoginToken(), authorize('updateStudent'), distributorController.updateStudent);


//Facilitator manager seminars
apiRouter.post('/marksimos/api/admin/assign_student_to_seminar',  authController.authLoginToken(), authorize('assignStudentToSeminar'), seminarController.assignStudentToSeminar);
apiRouter.post('/marksimos/api/admin/remove_student_from_seminar',  authController.authLoginToken(), authorize('removeStudentFromSeminar'), seminarController.removeStudentFromSeminar);

apiRouter.post('/marksimos/api/admin/seminar/:seminar_id/init',  authController.authLoginToken(),  authorize('runSimulation'), initController.init());
apiRouter.post('/marksimos/api/admin/seminar/:seminar_id/runsimulation',   authController.authLoginToken(), authorize('runSimulation'), initController.runSimulation());



//facilitator decisions, report, chart
//note : To get full version of some reports, plz make sure user role != student
apiRouter.get('/marksimos/api/admin/seminar/:seminar_id/decisions',  authController.authLoginToken(), authorize('runSimulation'), decisionController.getDecisionForFacilitator);

apiRouter.get('/marksimos/api/admin/report/:report_name',  authController.authLoginToken(), reportController.getReport);
apiRouter.get('/marksimos/api/admin/chart/:chart_name',  authController.authLoginToken(), chartController.getChart);
apiRouter.get('/marksimos/api/admin/finalscore/:seminarId',  authController.authLoginToken(), reportController.getAdminFinalScore);

apiRouter.put('/marksimos/api/admin/sku/decision',  authController.authLoginToken(), authorize('modifyDecisions'), decisionController.updateSKUDecision);
apiRouter.put('/marksimos/api/admin/brand/decision',  authController.authLoginToken(), authorize('modifyDecisions'), decisionController.updateBrandDecision);
apiRouter.put('/marksimos/api/admin/company/decision',  authController.authLoginToken(), authorize('modifyDecisions'), decisionController.updateCompanyDecision);


//feedback
apiRouter.get('/marksimos/api/admin/questionnaire/:seminarId',  authController.authLoginToken(), questionnaireController.getQuestionnaireList);



//reset student password
apiRouter.post('/marksimos/api/admin/resetPassword',  authController.authLoginToken(), authorize('updateStudent'), distributorController.resetStudentPassword);


// get current admin role
apiRouter.get('/marksimos/api/admin/user',  authController.authLoginToken(), authController.getUserInfo);




/**********  Database Init  **********/

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
            "role": userRoleModel.roleList.admin.id,
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
            "role": userRoleModel.roleList.distributor.id,
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
            "role": userRoleModel.roleList.facilitator.id,
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
            "role": userRoleModel.roleList.student.id,
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
            "firstName": "jin",
            "lastName": "wang",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": userRoleModel.roleList.student.id,
            "activated": true,
            "emailActivated": false
        },
        {
            "username": "sunhao",
            "email": "haosun@hcdlearning.com",
            "mobilePhone": "18019419955",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("123456"),
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "hao",
            "lastName": "sun",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": userRoleModel.roleList.student.id,
            "activated": true,
            "emailActivated": false
        },
        {
            "username": "anil",
            "email": "anilraparla@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": utility.hashPassword("123456"),
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "anil",
            "lastName": "anil",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": userRoleModel.roleList.student.id,
            "activated": true,
            "emailActivated": false
        }
    ];
    userModel.query.find({role: userRoleModel.roleList.admin.id}).exec().then(function (userResult) {
        if (userResult.length) {
            //已经存在管理员了，不进行初始化，只列出这些用户
            return res.send(400, {message: "already added."});
        }else {
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
});
apiRouter.get('/marksimos/api/initfaq', faqController.initFAQ);
apiRouter.get('/marksimos/api/faq', faqController.getFAQ);



module.exports = apiRouter;
   
