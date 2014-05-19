var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var initController = require('./controllers/init.js');
var util = require('util');


module.exports = function(app){
    app.post('/api/register', require('./controllers/user.js').register);
    app.post('/api/login', require('./controllers/user.js').login);

    app.get('/api/init', initController.init);

    app.get('/api/decision', decisionController.getDecision);

    //chart
    app.get('/api/chart/:chartName', chartController.getChart);

    // app.get('*', function(req, res){
    //     res.send("404 page");
    // }) 
};