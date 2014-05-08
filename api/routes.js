var decisionController = require('./controllers/decision.js');
var chartController = require('./controllers/chart.js');
var initController = require('./controllers/init.js');


module.exports = function(app){
    app.get('/', function(req, res, next){
        res.render('index.ejs', {});
    });

    app.get('/mainhome', function(req, res, next){
        res.render('usermainhome.ejs', {});
    });

    app.get('/report', function(req, res, next){
        res.render('userreport.ejs', {});
    });


    app.get('/api/init', initController.init);
    app.get('/api/decision', decisionController.getDecision);

    //chart
    app.get('/api/chart/:chartName', chartController.getChart);
};