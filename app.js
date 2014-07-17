var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('cookie-session');
var session = require('express-session')
var expressValidator = require('express-validator');
var sessionOperation = require('./common/sessionOperation.js');
var config = require('./common/config.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'marksimos',
    maxage: 24 * 60000
}));
app.use(express.static(path.join(__dirname, 'public')));

//initialize session data
app.use(function(req, res, next){
   sessionOperation.setLoginStatus(req, true);

    // sessionOperation.setUserRole(req, config.role.student);
    // sessionOperation.setUserId(req, '53c5f2c4c71f7f3fb6e6edb4');

   sessionOperation.setUserRole(req, config.role.facilitator);
   sessionOperation.setUserId(req, '53c38dcb4acf1d1627290928');

    // sessionOperation.setUserRole(req, config.role.distributor);
    // sessionOperation.setUserId(req, '53c38da49f7576ef26b867e9');

    // sessionOperation.setUserRole(req, config.role.admin);
    // sessionOperation.setUserId(req, 'testid');

    req.session.seminarId = '10000';
    req.session.companyId = 2;
    req.session.currentPeriod = 1;
    next();
});

//set Content-Type for all API JSON resppnse
app.all("/api/*", function(req, res, next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});


//require('./api/routes.js')(app);
app.use( require('./api/routes.js'));
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
