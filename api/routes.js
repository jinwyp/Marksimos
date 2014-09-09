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
var faqController = require('./controllers/faq.js');

var util = require('util');
var express = require('express');
var sessionOperation = require('../common/sessionOperation.js');


var config = require('../common/config.js');

var apiRouter = express.Router();

apiRouter.get('/viewsession', function(req, res){
    res.send(req.session);
});



/**********  API For Student  **********/

apiRouter.post('/marksimos/api/register', userController.register);
apiRouter.post('/marksimos/api/login', userController.login);
apiRouter.get('/marksimos/api/logout', requireLogin, userController.logout);


apiRouter.get('/marksimos/api/create_admin', function(req, res, next){
    var userModel = require('./models/user.js');

    userModel.remove({role: config.role.admin})
        .then(function(){
            return userModel.register({
                name: 'hcdadmin',
                password: require('../common/utility.js').hashPassword('123456'),
                email: 'admin@hcdglobal.com',
                role: config.role.admin,
                isActivated: true
            });
        })
        .then(function(result){
            if(!result){
                return res.send(400, {message: "add admin failed."});
            }
            return res.send(result);
        })
        .fail(function(err){
            res.send(500, err);
        })
        .done();
});




apiRouter.get('/marksimos/addFAQ', faqController.addFAQ);
apiRouter.get('/marksimos/findFAQ', faqController.findFAQ);



// get seminar
apiRouter.get('/marksimos/api/user', requireLogin, userController.getUser);
apiRouter.get('/marksimos/api/student/seminar', requireLogin, authorize('getSeminarOfStudent'), studentController.getSeminarOfStudent);
apiRouter.get('/marksimos/api/studentinfo', requireLogin, authorize('getStudent'),userController.getStudent);


//report
apiRouter.get('/marksimos/api/report/:report_name', requireLogin, reportController.getReport);
apiRouter.get('/marksimos/api/adminreport/:report_name', requireLogin, reportController.getReport);
apiRouter.get('/marksimos/api/choose_seminar', requireLogin, authorize('chooseSeminar'), seminarController.chooseSeminar);
apiRouter.get('/marksimos/api/submitdecision', requireLogin, decisionController.submitDecision);
//chart
apiRouter.get('/marksimos/api/chart/:chart_name', requireLogin, chartController.getChart);


//make decision page
apiRouter.put('/marksimos/api/sku/decision', requireLogin, decisionController.updateSKUDecision);
apiRouter.post('/marksimos/api/sku/decision', requireLogin, decisionController.addSKU);
apiRouter.delete('/marksimos/api/sku/decision/:brand_id/:sku_id', requireLogin, decisionController.deleteSKU);
apiRouter.put('/marksimos/api/brand/decision', requireLogin, decisionController.updateBrandDecision);
apiRouter.post('/marksimos/api/brand/decision', requireLogin, decisionController.addBrand);
apiRouter.delete('/marksimos/api/brand/decision', requireLogin, decisionController.deleteBrand);
apiRouter.put('/marksimos/api/company/decision', requireLogin, decisionController.updateCompanyDecision);


apiRouter.get('/marksimos/api/company', requireLogin, decisionController.getDecision);
apiRouter.get('/marksimos/api/product_portfolio', requireLogin, decisionController.getProductPortfolio);
apiRouter.get('/marksimos/api/spending_details', requireLogin, decisionController.getSpendingDetails);
apiRouter.get('/marksimos/api/future_projection_calculator/:sku_id', requireLogin, decisionController.getSKUInfo);
apiRouter.get('/marksimos/api/company/otherinfo', requireLogin, decisionController.getOtherinfo);



/**********  API For Administrator  **********/

apiRouter.get('/marksimos/api/admin/distributors', requireLogin, authorize('searchDistributor'), distributorController.searchDistributor);
apiRouter.post('/marksimos/api/admin/distributors', requireLogin, authorize('addDistributor'), distributorController.addDistributor);
apiRouter.put('/marksimos/api/admin/distributors/:distributor_id', requireLogin, authorize('updateDistributor'), distributorController.updateDistributor);


apiRouter.get('/marksimos/api/admin/facilitators', requireLogin, authorize('searchFacilitator'), facilitatorController.searchFacilitator);
apiRouter.post('/marksimos/api/admin/facilitators', requireLogin, authorize('addFacilitator'), facilitatorController.addFacilitator);
apiRouter.put('/marksimos/api/admin/facilitators/:facilitator_id', requireLogin, authorize('updateFacilitator'), facilitatorController.updateFacilitator);

apiRouter.get('/marksimos/api/admin/facilitator/seminar', requireLogin, authorize('getSeminarOfFacilitator'), facilitatorController.getSeminarOfFacilitator);


apiRouter.get('/marksimos/api/admin/students', requireLogin, authorize('searchStudent'), studentController.searchStudent);
apiRouter.post('/marksimos/api/admin/students', requireLogin, authorize('addStudent'), studentController.addStudent);
apiRouter.put('/marksimos/api/admin/students/:student_id', requireLogin, authorize('updateStudent'), studentController.updateStudent);


//get all seminars of the current student

apiRouter.post('/marksimos/api/admin/seminar', requireLogin, authorize('addSeminar'), seminarController.addSeminar);


apiRouter.post('/marksimos/api/admin/assign_student_to_seminar', requireLogin, authorize('assignStudentToSeminar'), seminarController.assignStudentToSeminar);
apiRouter.post('/marksimos/api/admin/remove_student_from_seminar', requireLogin, authorize('removeStudentFromSeminar'), seminarController.removeStudentFromSeminar);

apiRouter.post('/marksimos/api/admin/init', requireLogin, initController.init);
apiRouter.post('/marksimos/api/admin/runsimulation',  requireLogin, authorize('runSimulation'), initController.runSimulation);

// get current admin role
apiRouter.get('/marksimos/api/admin/user', requireLogin, userController.getUser);

//getQuestionnaire
apiRouter.get('/marksimos/api/questionnaire',requireLogin,questionnaireController.getQuestionnaire); 
//updateQuestionnaire
apiRouter.put('/marksimos/api/questionnaire',requireLogin,questionnaireController.updateQuestionnaire); 




function requireLogin(req, res, next){
    if(sessionOperation.getLoginStatus(req)){
        next();
    }else{
        res.send(400, {message: 'Login required.'});
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

        'updateFacilitator',
        'searchFacilitator',

        'updateStudent',
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
   
