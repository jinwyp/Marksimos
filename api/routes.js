var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var reportController = require('./controllers/report.js');
var initController = require('./controllers/init.js');
var decisionPageController = require('./controllers/decisionPage.js');
var userController = require('./controllers/user.js');
var util = require('util');


module.exports = function(app){
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);

    app.get('/api/init', initController.init);

    app.get('/api/submitdecision', decisionController.submitDecision);

    //chart
    app.get('/api/chart/:chart_name', chartController.getChart);

    //report
    app.get('/api/report/:report_name', reportController.getReport);
    app.get('/api/adminreport/:report_name', reportController.getReport);

    //make decision page
    app.put('/api/sku/decision', decisionController.updateSKUDecision);
    app.post('/api/sku/decision', decisionController.addSKU);
    app.delete('/api/sku/decision', decisionController.deleteSKU);

    app.put('/api/brand/decision', decisionController.updateBrandDecision);
    app.post('/api/brand/decision', decisionController.addBrand);
    app.delete('/api/brand/decision', decisionController.deleteBrand);

    app.put('/api/company/decision', decisionController.updateCompanyDecision);


    app.get('/api/company', decisionPageController.getDecision);
    app.get('/api/product_portfolio', decisionPageController.getProductPortfolio);
    app.get('/api/spending_details', decisionPageController.getSpendingDetails);
    app.get('/api/future_projection_calculator/:sku_id', decisionPageController.getSKUInfo);
    app.get('/api/company/otherinfo', decisionPageController.getOtherinfo);

    //app.get('/api/');
    // app.get('*', function(req, res){
    //     res.send("404 page");
    // }) 
};