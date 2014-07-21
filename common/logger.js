var winston = require('winston');
var config = require('./config.js');

winston.add(winston.transports.File, { filename: config.logDirectory + 'app.log' });
//winston.remove(winston.transports.Console);

exports.error = function(err){
    if(!err) return;

    if(err.message){
        winston.info("Error: " + err.message);
    }
    
    if(err.stack){
        winston.info(err.stack)
    }
}

exports.log = function(message){
    winston.info(message);
}