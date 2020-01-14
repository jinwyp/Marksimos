var express = require('express');
var app = express();

var path = require('path');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var mongoose = require('mongoose');

var morgan = require('morgan');
var logger = require('./common/logger.js');



//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
var config = require('./common/config.js');
var router = require('./api/routes.js');				// get an instance of the express Router


var expressValidator = require('express-validator');
var customValidator = require('./common/express-custom-validator.js');


var fs = require('fs');
var passport = require('passport');



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

var morganFileStream = fs.createWriteStream(config.logDirectory + 'access-morgan.log', {'flags': 'a'});
var morganOption = {
    skip: function (req, res) { return res.statusCode < 400; }
};


if(app.get('env') === 'production'){
    app.use(morgan('dev', morganOption) );

}else{
    app.use(morgan('dev') );
}

app.use(morgan('combined', {
    stream: morganFileStream
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(expressValidator({
    customValidators: customValidator
}));

mongoose.connect(config.mongo_conn, {useMongoClient: true});

//app.use(session({
//    secret: 'marksimos',
//    store: new MongoStore({ mongooseConnection: mongoose.connection }),
//    resave: true,
//    saveUninitialized: true
//}));

app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize());
//app.use(passport.session());



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



    if((typeof err.message !== 'undefined' && err.message.toLowerCase().substr(0, 6) == 'cancel') || typeof err.errorCode !== 'undefined' ){
        // respond promise stop chains info with no system error

        logger.log('400 Error. ', 'Message:',  err.message);

        res.status(err.status || 400);

        // respond with json
        if (/application\/json/.test(req.get('accept'))) {
            res.send({
                title: '400 Data Error',
                message: err.message,
                errorCode: err.errorCode
            });
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
        logger.error(err);

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



app.set('port', config.port || 3000);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(response,request) {
    var server = app.listen(app.get('port'), function() {
      console.log('==== Express server listening on port ' + server.address().port);
    });

    var socketio = require('socket.io').listen(server);
    global.gsocketio = socketio;
    require('./common/socketio').init(socketio);
});




module.exports = app;
