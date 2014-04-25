var decisionController = require('./controllers/decision.js');
var marketshareController = require('./controllers/marketshare.js');

module.exports = function(app){
    app.get('/api/decision', decisionController.getDecision);
    app.get('/api/marketshare', marketshareController.getMarketshare);
}