var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('cookie-session');
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
