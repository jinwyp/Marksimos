var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('cookie-session');
var session = require('express-session')
var expressValidator = require('express-validator');
var sessionOperation = require('./common/sessionOperation.js');
var config = require('./common/config.js');

var fs = require('fs');
var morgan = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon());

var morganFileStream = fs.createWriteStream(config.logDirectory + 'access.log');
app.use(morgan('dev', {stream: morganFileStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'marksimos',
    maxage: 24 * 60 * 60000
}));
app.use(express.static(path.join(__dirname, 'public')));

//initialize session data
app.use(function(req, res, next){
    sessionOperation.setLoginStatus(req, true);

    if(process.env.NODE_ENV === 'suyuan'){
        // sessionOperation.setUserRole(req, config.role.student);
        // sessionOperation.setUserId(req, '53cdcd0c6f50f03fad9b0006');

        sessionOperation.setUserRole(req, config.role.facilitator);
        sessionOperation.setUserId(req, '53cf756d07f03b0000d4ea5f');
        
        // sessionOperation.setUserRole(req, config.role.distributor);
        // sessionOperation.setUserId(req, '53ce25d8e2e03de6ec7b2f37');
    }

    // sessionOperation.setUserRole(req, config.role.student);
    // sessionOperation.setUserId(req, '53c886642c320f1308904a0a');

    // sessionOperation.setUserRole(req, config.role.facilitator); //a
    // sessionOperation.setUserId(req, '53ccb4822672e9d139488a4a'); //a

    // sessionOperation.setUserRole(req, config.role.distributor);
    // sessionOperation.setUserId(req, '53c8ae4dbf604cf543f7b639');

    // sessionOperation.setUserRole(req, config.role.admin);
    // sessionOperation.setUserId(req, 'testid');

    req.session.seminarId = '10000';
    req.session.companyId = 1;

    if(req.session.currentPeriod === undefined){
       req.session.currentPeriod = 1;
    }
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
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.json(500, {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.json(500, {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3000);


mongoose.connect(config.mongo_conn);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(response,request) {
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
});


module.exports = app;
