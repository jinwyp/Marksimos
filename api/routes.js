var decisionController = require('./controllers/decision.js');

module.exports = function(app){
    app.use('/', function(req, res, next){res.send("Index");});
    app.use('/api/decision', decisionController.getDecision);
}