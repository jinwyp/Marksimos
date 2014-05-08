var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var initController = require('./controllers/init.js');
var util = require('util');


module.exports = function(app){
    app.get('/', function(req, res, next){
        res.render('index.ejs', {});
    });

    app.get('/mainhome', function(req, res, next){
        res.render('usermainhome.ejs', {});
    });

    app.get('/api/init', initController.init);
    app.get('/api/decision', decisionController.getDecision);

    //chart
    app.get('/api/chart/:chartName', chartController.getChart);
    app.get('/api/chart/segmentsLeadersByValue/:chartName', chartController.getSegmentsLeadersByValueChart);

    // app.get('*', function(req, res){
    //     res.send("404 page");
    // })
};