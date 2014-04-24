var decisionController = require('./controllers/decision.js');

module.exports = function(app){
    app.use('/api/decision', decisionController.getDecision);
}