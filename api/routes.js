var decisionController = require('./controllers/decision.js');

module.exports = function(app){
    app.get('/', function(req, res, next){
        res.render('index.ejs', {});
    });
    app.get('/api/decision', decisionController.getDecision);
}