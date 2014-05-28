var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('cookie-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'marksimos',
    maxage: 24 * 60000
}));
app.use(express.static(path.join(__dirname, 'public')));

//initialize session data
app.use(function(req, res, next){
    req.session.userId = 'testid';
    req.session.seminarId = 'TTT';
    req.session.companyId = 2;
    req.session.period = 0;
    req.session.team = 0;
    next();
})

//set Content-Type for all API JSON resppnse
app.use(function(req, res, next){
    if(req.path.indexOf('/api')===0){
        res.set('Content-Type', 'application/json; charset=utf-8');
    }
    next();
})

app.get('/test', function(req, res, next){
    var chartDataModel = require('./api/models/chartData.js');
    chartDataModel.getChartData('TTT')
    .then(function(allCharts){
        test1(allCharts);
        console.log(allCharts);
    })
    .fail(function(err){
        console.log(err);
    }).done();
    res.send('123');

    function test1(allCharts){
        delete allCharts.seminarId;
        allCharts.seminarId = allCharts;
    }
})

require('./api/routes.js')(app);
require('./routes.js')(app);

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.json(500, {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.json(500, {
//         message: err.message,
//         error: {}
//     });
// });


app.set('port', process.env.PORT || 3000);


mongoose.connect('mongodb://localhost/Marksimos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(response,request) {
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
});


module.exports = app;
