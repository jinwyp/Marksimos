var express = require('express');
var app = express();

var path = require('path');

var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var session = require('cookie-session');
var expressValidator = require('express-validator');
var sessionOperation = require('./common/sessionOperation.js');
var config = require('./common/config.js');

var router = require('./api/routes.js');				// get an instance of the express Router

var fs = require('fs');




app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    fn(null, str);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon());


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());


app.use(session({
    secret: 'marksimos',
    maxage: 24 * 60 * 60000
}));
app.use(express.static(path.join(__dirname, 'public')));





// Router for all URL
app.use('/', router);



// catch 404 and forwarding to error handler
app.use(function(req, res, next){

    res.status(404);

    if (app.get('env') !== 'production') {

    }

    // respond with html page
    if (req.accepts('html')) {
        res.render('page404.ejs', {
            'title' : '404 Page Not Found',
            'url': req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: '404 Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});



app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);

    // respond with html page
    if (req.accepts('html')) {
        res.render('page500.ejs', {
            'title' : '500 System Error',
            'error': err });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ title: '500 System Error', message: err });
        return;
    }

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
