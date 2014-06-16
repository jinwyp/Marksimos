var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var initController = require('./controllers/init.js');
var decisionPageController = require('./controllers/decisionPage.js');
var util = require('util');


module.exports = function(app){
    app.post('/api/register', require('./controllers/user.js').register);
    app.post('/api/login', require('./controllers/user.js').login);

    app.get('/api/init', initController.init);

    app.get('/api/submitdecision', decisionController.submitDecision);

    //decision
    app.post('/api/sku/decision', decisionController.updateSKUDecision);

    app.post('/api/brand/decision', decisionController.updateBrandDecision);

    app.post('/api/company/decision', decisionController.updateCompanyDecision);

    //chart
    app.get('/api/chart/:chart_name', chartController.getChart);

    //make decision page
    app.get('/api/decision', decisionPageController.getDecision);
    app.get('/api/product_portfolio', decisionPageController.getProductPortfolio);
    app.get('/api/spending_details', decisionPageController.getSpendingDetails);
    app.get('/api/sku_info/:sku_id', decisionPageController.getSKUInfo);

    // app.get('*', function(req, res){
    //     res.send("404 page");
    // }) 
};