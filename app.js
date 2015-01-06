var express = require('express');
var app = express();

var path = require('path');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var morgan = require('morgan');


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var expressValidator = require('express-validator');
var sessionOperation = require('./common/sessionOperation.js');
var config = require('./common/config.js');
var customValidator = require('./common/express-custom-validator.js');
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

app.use(favicon(path.join(__dirname, '/public/cn/assets/img/hcd-icon.ico')));

var morganFileStream = fs.createWriteStream(config.logDirectory + 'accessmorgan.log');
app.use(morgan('dev', {stream: morganFileStream}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator({
    customValidators: customValidator
}));


//app.use(session({
//    secret: 'marksimos',
//    maxage: 24 * 60 * 60000
//}));
mongoose.connect(config.mongo_conn);

app.use(session({
    secret: 'marksimos',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());




// Router for all URL
app.use('/', router);



// catch 404 and forwarding to error handler
app.use(function(req, res, next){

    res.status(404);

    if (app.get('env') !== 'production') {

    }

    // respond with json
    if (/application\/json/.test(req.get('accept'))) {
        res.send({ message: '404 Not found! URL: ' + req.url });
        return;
    }


    // respond with html page
    res.set('Content-Type', 'text/html; charset=utf-8');
    if (req.accepts('html')) {

        res.render('page404.ejs', {
            'title' : '404 Page Not Found',
            'url': req.url });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});



app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().

    console.log(typeof err.message,  err.message);
    if(typeof err.message !== 'undefined' && err.message.toLowerCase().substr(0, 6) == 'cancel' ){
        // respond promise stop chains info with no system error
        res.status(err.status || 400);

        // respond with json
        if (/application\/json/.test(req.get('accept'))) {
            res.send({
                title: '400 Data Error',
                message: err.message });
            return;
        }

        res.set('Content-Type', 'text/html; charset=utf-8');
        // respond with html page
        if (req.accepts('html')) {
            res.render('page500.ejs', {
                'title' : '400 Data Error',
                'error': err.message });
            return;
        }

    }else{
        // respond 500 system error
        res.status(err.status || 500);

        // respond with json
        if (/application\/json/.test(req.get('accept'))) {
            res.send({
                title: '500 System Error',
                message: err.message  });
            return;
        }

        res.set('Content-Type', 'text/html; charset=utf-8');
        // respond with html page
        if (req.accepts('html')) {
            res.render('page500.ejs', {
                'title' : '500 System Error',
                'error': err.message  });
            return;
        }



    }



});



app.set('port', process.env.PORT || 3000);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(response,request) {
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
});




module.exports = app;
