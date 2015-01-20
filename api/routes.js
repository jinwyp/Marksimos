var decisionController = require('./controllers/marksimos/decision.js');
var chartController = require('./controllers/marksimos/chart.js');
var reportController = require('./controllers/marksimos/report.js');
var initController = require('./controllers/marksimos/init.js');
var auth = require('./controllers/user/authentication.js');
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

var config = require('../common/config.js');

var apiRouter = express.Router();



/**********    Init Passport Auth    **********/
auth.initAuth();







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
apiRouter.post('/e4e/api/registercompany',auth.registerE4Ecompany);
apiRouter.post('/e4e/api/registerstudent',auth.registerE4Estudent);








/**********    Routes for rendering templates MarkSimos User/Student    **********/

apiRouter.get('/marksimos', auth.authLoginToken({failureRedirect: '/marksimos/login'}), auth.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
    res.redirect('/marksimos/intro');
});

apiRouter.get('/marksimos/login', function(req, res, next){
    res.render('marksimosuser/userlogin.ejs', { title : 'MarkSimos - Sign In'});
});

apiRouter.get('/marksimos/intro', auth.authLoginToken({failureRedirect: '/marksimos/login'}), auth.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
    res.render('marksimosuser/userintroduction.ejs', { title : 'MarkSimos - Introduction Videos'});
});

apiRouter.get('/marksimos/home', auth.authLoginToken({failureRedirect: '/marksimos/login'}), auth.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/marksimos/login'}), function(req, res, next){
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





/**********    Routes for rendering templates Administrator    **********/

apiRouter.get('/marksimos/admin', function(req, res, next){
    res.render('marksimosadmin/adminlogin.ejs', {title : 'Admin | Log in'});
});

apiRouter.get('/marksimos/adminhome', auth.authLoginToken({failureRedirect: '/marksimos/admin'}), auth.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), function(req, res, next){
    res.render('marksimosadmin/adminhome.ejs', {title : 'Admin | Dashboard'});
});

apiRouter.get('/marksimos/adminhomereport/:seminar_id', auth.authLoginToken({failureRedirect: '/marksimos/admin'}), auth.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), seminarController.chooseSeminarForFacilitator);
















/**********    API For MarkSimos Student    **********/
apiRouter.post('/marksimos/api/login', auth.studentLogin);
apiRouter.get('/marksimos/api/logout', auth.logout);


// get seminar
apiRouter.get('/marksimos/api/user', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleGet), auth.getUserInfo);
apiRouter.get('/marksimos/api/student/seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfStudentGet), studentController.getSeminarList);
apiRouter.get('/marksimos/api/studentinfo', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleGet), studentController.getSeminarInfo);

//report
apiRouter.get('/marksimos/api/report/:report_name', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), reportController.getReport);
apiRouter.get('/marksimos/api/choose_seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), seminarController.chooseSeminarForStudent);


//chart
apiRouter.get('/marksimos/api/chart/:chart_name', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), chartController.getChart);

//final score
apiRouter.get('/marksimos/api/finalscore', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), reportController.getStudentFinalScore);


//company info
apiRouter.get('/marksimos/api/company', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), decisionController.getDecision);
apiRouter.get('/marksimos/api/product_portfolio', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), decisionController.getProductPortfolio);
apiRouter.get('/marksimos/api/spending_details', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), decisionController.getSpendingDetails);
apiRouter.get('/marksimos/api/future_projection_calculator/:sku_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), decisionController.getSKUInfoFutureProjection);
apiRouter.get('/marksimos/api/company/otherinfo', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), decisionController.getOtherinfo);

//make decision page
apiRouter.put('/marksimos/api/sku/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.updateSKUDecision);
apiRouter.post('/marksimos/api/sku/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.addSKU);
apiRouter.delete('/marksimos/api/sku/decision/:company_id/:brand_id/:sku_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.deleteSKU);

apiRouter.put('/marksimos/api/brand/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.updateBrandDecision);
apiRouter.post('/marksimos/api/brand/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.addBrand);

apiRouter.put('/marksimos/api/company/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), decisionController.updateCompanyDecision);

//getQuestionnaire
apiRouter.get('/marksimos/api/questionnaire', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), questionnaireController.getQuestionnaire);
apiRouter.put('/marksimos/api/questionnaire', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionCUD), questionnaireController.submitQuestionnaire);

//getFaq
apiRouter.get('/marksimos/api/faq', faqController.getFAQ);



/**********  API For Administrator  **********/
apiRouter.post('/marksimos/api/admin/login', auth.adminLogin);

apiRouter.get('/marksimos/api/admin/distributors', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoListGet), distributorController.searchDistributor);
apiRouter.post('/marksimos/api/admin/distributors', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoSingleCUD), distributorController.addDistributor);
apiRouter.put('/marksimos/api/admin/distributors/:distributor_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoSingleCUD), distributorController.updateDistributor);


apiRouter.get('/marksimos/api/admin/facilitators', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoListGet), distributorController.searchFacilitator);
apiRouter.post('/marksimos/api/admin/facilitators', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoSingleCUD), distributorController.addFacilitator);
apiRouter.put('/marksimos/api/admin/facilitators/:facilitator_id',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoSingleCUD), distributorController.updateFacilitator);


apiRouter.get('/marksimos/api/admin/students', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoListGet), distributorController.searchStudent);
apiRouter.post('/marksimos/api/admin/students', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.addStudent);
apiRouter.put('/marksimos/api/admin/students/:student_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.updateStudent);

apiRouter.post('/marksimos/api/admin/resetPassword',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.resetStudentPassword);


//Facilitator manager seminars
apiRouter.get('/marksimos/api/admin/facilitator/seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), distributorController.getSeminarOfFacilitator);
apiRouter.post('/marksimos/api/admin/seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleCUD), seminarController.addSeminar);

apiRouter.post('/marksimos/api/admin/assign_student_to_seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarAssignStudentCUD), seminarController.assignStudentToSeminar);
apiRouter.post('/marksimos/api/admin/remove_student_from_seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarAssignStudentCUD), seminarController.removeStudentFromSeminar);

apiRouter.post('/marksimos/api/admin/seminar/:seminar_id/init', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarInit), initController.init());
apiRouter.post('/marksimos/api/admin/seminar/:seminar_id/runsimulation', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarRunRound), initController.runSimulation());



//facilitator decisions, report, chart
//note : To get full version of some reports, plz make sure user role != student
apiRouter.get('/marksimos/api/admin/seminar/:seminar_id/decisions', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), decisionController.getDecisionForFacilitator);

apiRouter.get('/marksimos/api/admin/report/:report_name', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), reportController.getReport);
apiRouter.get('/marksimos/api/admin/chart/:chart_name', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), chartController.getChart);
apiRouter.get('/marksimos/api/admin/finalscore/:seminarId', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), reportController.getAdminFinalScore);

apiRouter.get('/marksimos/api/admin/questionnaire/:seminarId', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), questionnaireController.getQuestionnaireList);

apiRouter.put('/marksimos/api/admin/sku/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateSKUDecision);
apiRouter.put('/marksimos/api/admin/brand/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateBrandDecision);
apiRouter.put('/marksimos/api/admin/company/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateCompanyDecision);



// get current admin role
apiRouter.get('/marksimos/api/admin/user', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.adminLogin), auth.getUserInfo);




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




module.exports = apiRouter;
   
