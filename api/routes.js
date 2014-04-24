var decisionController = require('./controllers/decision.js');

module.exports = function(app){
    app.get('/', function(req, res, next){res.send("Index");});
    app.get('/api/decision', decisionController.getDecision);
}