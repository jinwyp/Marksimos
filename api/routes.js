
var fileUploadModel = require('./models/user/fileupload.js');

var decisionController = require('./controllers/marksimos/decision.js');
var chartController = require('./controllers/marksimos/chart.js');
var reportController = require('./controllers/marksimos/report.js');
var initController = require('./controllers/marksimos/init.js');
var auth = require('./controllers/user/authentication.js');
var distributorController = require('./controllers/user/admin.js');
var studentController = require('./controllers/user/student.js');
var campaignController = require('./controllers/b2c/campaign.js');
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




/**********     Init Passport Auth     **********/
auth.initAuth();









/**********     Routes for rendering templates HCD Learning Website     **********/

apiRouter.get('/', function(req, res, next){
    res.redirect('/cn');
});

apiRouter.get('/admin', function(req, res, next){
    res.redirect('/marksimos/admin');
});








/**********     Routes for rendering templates E4E Website     **********/

apiRouter.get('/e4e', auth.authLoginToken({successRedirect: '/e4e/campaigns'}), function(req, res, next){
    res.render('b2c/registration/indexreg.ejs', {title : 'Welcome to HCD E4E | HCD Learning'});
});

apiRouter.get('/e4e/emailverify/registration', auth.activateRegistrationEmail);


apiRouter.get('/e4e/login', function(req, res, next){
    res.render('b2c/login.ejs', {title:'HCD E4E Sign in to Your Account| HCD Learning'});
});


apiRouter.get('/e4e/forgotpassword', function(req, res, next){
    res.render('b2c/forgotpassword/forgotpassword.ejs', {title:'Forgotten Your Password? | HCD Learning'});
});
apiRouter.get('/e4e/emailverify/changepassword', auth.forgotPasswordStep2);



apiRouter.get('/e4e/profile', auth.authLoginToken({failureRedirect: '/e4e/login'}), auth.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/e4e/login'}), function(req, res, next){
    res.render('b2c/profile.ejs', {title:'E4E User Home | HCD Learning'});
});


apiRouter.get('/e4e/campaigns/',  campaignController.campaignListPage);
apiRouter.get('/e4e/campaign/:campaignId', auth.authLoginToken({failureRedirect: '/e4e/login'}), auth.authRole(userRoleModel.right.marksimos.studentLogin, {failureRedirect: '/e4e/login'}), campaignController.campaignSingleInfoPage);








/**********     Routes for rendering templates MarkSimos User/Student     **********/

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











/**********     Routes for rendering templates Administrator     **********/

apiRouter.get('/marksimos/admin', function(req, res, next){
    res.render('marksimosadmin/adminlogin.ejs', {title : 'Admin | Log in'});
});

apiRouter.get('/marksimos/adminhome', auth.authLoginToken({failureRedirect: '/marksimos/admin'}), auth.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), function(req, res, next){
    res.render('marksimosadmin/adminhome.ejs', {title : 'Admin | Dashboard'});
});

apiRouter.get('/marksimos/adminhomereport/:seminar_id', auth.authLoginToken({failureRedirect: '/marksimos/admin'}), auth.authRole(userRoleModel.right.marksimos.adminLogin, {failureRedirect: '/marksimos/admin'}), seminarController.seminarInfoForFacilitator);










/**********     Set Content-Type for all API JSON response     **********/

apiRouter.all("/e4e/api/*", function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});

apiRouter.all("/marksimos/api/*", function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});










/**********     API For E4E Student     **********/
apiRouter.post('/e4e/api/registercompany', auth.registerB2CEnterprise);
apiRouter.post('/e4e/api/registerstudent', auth.registerB2CStudent);

apiRouter.post('/e4e/api/forgotpasswordstep1', auth.sendResetPasswordEmail);
apiRouter.post('/e4e/api/forgotpasswordstep2', auth.verifyResetPasswordCode);
apiRouter.post('/e4e/api/forgotpasswordstep3', auth.resetNewPassword);

apiRouter.put('/e4e/api/student/password', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), studentController.updateStudentB2CPassword);
apiRouter.put('/e4e/api/student', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), studentController.updateStudentB2CInfo);

apiRouter.post('/e4e/api/student/avatar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), fileUploadModel.multerUpload('studentavatar'), studentController.uploadStudentAvatar );

apiRouter.post('/e4e/api/team', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.teamInfoSingleCUD), studentController.updateTeam);
apiRouter.post('/e4e/api/team/student',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.teamInfoSingleGet), studentController.addStudentToTeam);
apiRouter.delete('/e4e/api/team/student/:student_id',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.teamInfoSingleCUD), studentController.removeStudentToTeam);

apiRouter.post('/e4e/api/campaigns/teams', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleGet), campaignController.addTeamToCampaign);






/**********     API For MarkSimos Student     **********/
apiRouter.post('/marksimos/api/login', auth.studentLogin);
apiRouter.get('/marksimos/api/logout', auth.logout);


// get seminar
apiRouter.get('/marksimos/api/user', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleGet), auth.getUserInfo);
apiRouter.get('/marksimos/api/student/seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfStudentGet), seminarController.getSeminarList);
apiRouter.get('/marksimos/api/choose_seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfStudentGet), seminarController.chooseSeminarForStudent);

//report
apiRouter.get('/marksimos/api/report/:report_name', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarSingleDecisionGet), reportController.getReport);

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










/**********     API For Administrator     **********/
apiRouter.post('/marksimos/api/admin/login', auth.adminLogin);

// get current admin role
apiRouter.get('/marksimos/api/admin/user', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.adminLogin), auth.getUserInfo);

apiRouter.get('/marksimos/api/admin/distributors', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoListGet), distributorController.searchDistributor);
apiRouter.post('/marksimos/api/admin/distributors', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoSingleCUD), distributorController.addDistributor);
apiRouter.put('/marksimos/api/admin/distributors/:distributor_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.distributorInfoSingleCUD), distributorController.updateDistributor);


apiRouter.get('/marksimos/api/admin/facilitators', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoListGet), distributorController.searchFacilitator);
apiRouter.post('/marksimos/api/admin/facilitators', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoSingleCUD), distributorController.addFacilitator);
apiRouter.put('/marksimos/api/admin/facilitators/:facilitator_id',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.facilitatorInfoSingleCUD), distributorController.updateFacilitator);


apiRouter.get('/marksimos/api/admin/students', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoListGet), distributorController.searchStudent);
apiRouter.post('/marksimos/api/admin/students', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.addStudent);
apiRouter.put('/marksimos/api/admin/students/:student_id', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.updateStudent);

apiRouter.post('/marksimos/api/admin/students/reset_password',  auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.studentInfoSingleCUD), distributorController.resetStudentPassword);


//Facilitator manager Campaign
apiRouter.get('/marksimos/api/admin/campaigns', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignInfoListGet), campaignController.searchCampaign);
apiRouter.post('/marksimos/api/admin/campaigns', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.addCampaign);
apiRouter.put('/marksimos/api/admin/campaigns', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.updateCampaign);
apiRouter.post('/marksimos/api/admin/campaigns/upload', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), fileUploadModel.multerUpload(), campaignController.uploadCampaignPics );


apiRouter.post('/marksimos/api/admin/campaigns/seminars', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.addMarkSimosSeminarToCampaign);
apiRouter.post('/marksimos/api/admin/campaigns/seminars/remove', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.removeMarkSimosSeminarFromCampaign);

apiRouter.post('/marksimos/api/admin/campaigns/teams', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.addTeamToCampaign);
apiRouter.post('/marksimos/api/admin/campaigns/teams/remove', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.campaignSingleCUD), campaignController.removeTeamFromCampaign);


//Facilitator manager seminars
apiRouter.get('/marksimos/api/admin/facilitator/seminar', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), seminarController.getSeminarOfFacilitator);
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

apiRouter.get('/marksimos/api/admin/questionnaire/:seminarId', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarListOfFacilitatorGet), questionnaireController.getQuestionnaireListForAdmin);

apiRouter.put('/marksimos/api/admin/sku/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateSKUDecision);
apiRouter.put('/marksimos/api/admin/brand/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateBrandDecision);
apiRouter.put('/marksimos/api/admin/company/decision', auth.authLoginToken(), auth.authRole(userRoleModel.right.marksimos.seminarDecisionsOfFacilitatorCUD), decisionController.updateCompanyDecision);











/**********     Database Init     **********/
apiRouter.get('/marksimos/api/initfaq', faqController.initFAQ);

apiRouter.get('/marksimos/api/create_admin', function (req,res,next) {

    var userList = [
        {
            "username": "hcd_administrator",
            "password": "admin1234@hcd",
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
            "password": "distributor@hcd5678",
            "email": "hcd_distributor@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "district": "Ren Min Lu",
            "street": "",
            "idcardNumber": "",
            "numOfUsedLicense": 0,
            "numOfLicense": 500000,
            "role": userRoleModel.roleList.distributor.id,
            "activated": true,
            "emailActivated": true,
            "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694"
        },
        {
            "_id": mongoose.Types.ObjectId("54609fb2700a570813b13540"),
            "username": "hcd_facilitator",
            "password": "hcdfacilitator@9876",
            "email": "hcd_facilitator@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "distributorId": "54609f0c700a570813b1353f",
            "numOfUsedLicense": 0,
            "numOfLicense": 100000,
            "role": userRoleModel.roleList.facilitator.id,
            "activated": true,
            "emailActivated": true,
            "emailActivateToken": "efe5ceba-fd21-445e-86b6-c5fa64f3c694"
        },
        {
            "_id": mongoose.Types.ObjectId("54d834bdeaf05dbd048120f8"),
            "username": "b2c_facilitator",
            "password": "hcdfacilitator@9876",
            "email": "b2c_facilitator@hcdlearning.com",
            "mobilePhone": "13564568304",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "distributorId": "54609f0c700a570813b1353f",
            "numOfUsedLicense": 0,
            "numOfLicense": 1000000000,
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
            "password": "123456",
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
            "username": "jinwang",
            "email": "jinwang@hcdlearning.com",
            "mobilePhone": "13564568304",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": "123456",
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
            "password": "123456",
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
            "username": "anilraparla",
            "email": "anilraparla@hcdlearning.com",
            "mobilePhone": "13916502743",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": "123456",
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
        },
        {
            "username": "yuekecheng",
            "email": "clarkyue@hcdlearning.com",
            "mobilePhone": "15900719671",
            "country": "China",
            "state": "shanghai",
            "city": "shanghai",
            "password": "123456",
            "facilitatorId": "54609fb2700a570813b13540",
            "idcardNumber": "321181198502273515",
            "occupation": "Student",
            "firstName": "clark",
            "lastName": "yue",
            "organizationOrUniversity": "",
            "majorsDegree": "",
            "studentType": 10,
            "role": userRoleModel.roleList.student.id,
            "activated": true,
            "emailActivated": false
        }
    ];
    userModel.find({role: userRoleModel.roleList.admin.id}).execQ().then(function (userResult) {
        if (userResult.length) {
            //已经存在管理员了，不进行初始化，只列出这些用户

            // 补充增加 b2c_facilitator 账号
            userModel.findOne({"username": "b2c_facilitator"}).execQ().then(function (userB2CResult) {
                console.log(userB2CResult);
                if(userB2CResult){
                    return res.status(400).send ({message: "already added."});
                }else{
                    userModel.create(userList[3], function (err, b2cFacilitatorResults) {
                        if (err) {
                            return res.status(400).send( {message: "add default admin and users failed."});
                        } else {
                            //for (var i=1; i<arguments.length; ++i) {
                            //    var user = arguments[i];
                            //    // do some stuff with candy
                            //}

                            return res.status(200).send(b2cFacilitatorResults);
                        }
                    });
                }
            }).fail(function(err){
                next (err);
            }).done();


        }else {
            //不存在管理员，需要初始化
            userModel.create(userList, function (err) {
                if (err) {
                    return res.status(400).send( {message: "add default admin and users failed."});
                } else {
                    //for (var i=1; i<arguments.length; ++i) {
                    //    var user = arguments[i];
                    //    // do some stuff with candy
                    //}

                    var userListResults = Array.prototype.slice.call(arguments, 1);
                    return res.status(200).send(userListResults);
                }
            });
        }
    }).fail(function(err){
        next (err);
    }).done();
});





module.exports = apiRouter;

