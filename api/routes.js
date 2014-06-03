var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var initController = require('./controllers/init.js');
var util = require('util');


module.exports = function(app){
    app.post('/api/register', require('./controllers/user.js').register);
    app.post('/api/login', require('./controllers/user.js').login);

    app.get('/api/init', initController.init);

    app.get('/api/decision', decisionController.submitDecision);

    //decision
    app.post('/api/decision/sku/discontinue', decisionController.updateDiscontinue);
    app.post('/api/decision/sku/processing_technology', decisionController.updateProcessingTechnology);
    app.post('/api/decision/sku/ingredient_quality', decisionController.updateIngredientQuality);
    app.post('/api/decision/sku/package_size', decisionController.updatePackageSize);
    app.post('/api/decision/sku/production_volume', decisionController.updateProductionVolume);
    app.post('/api/decision/sku/manufacture_price', decisionController.updateManufacturePrice);
    app.post('/api/decision/sku/consumer_communication', decisionController.updateConsumerCommunication);
    app.post('/api/decision/sku/target_consumer_segment', decisionController.updateTargetConsumerSegment);
    app.post('/api/decision/sku/trade_expenses', decisionController.updateTradeExpenses);
    app.post('/api/decision/sku/additional_trade_margin', decisionController.updateAdditionalTradeMargin);
    app.post('/api/decision/sku/wholesale_minimum_volume', decisionController.updateWholesaleMinimumVolume);
    app.post('/api/decision/sku/wholesale_bonus_rate', decisionController.updateWholesaleBonusRate);

    //chart
    app.get('/api/chart/:chartName', chartController.getChart);

    // app.get('*', function(req, res){
    //     res.send("404 page");
    // }) 
};