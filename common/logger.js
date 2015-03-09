var winston = require('winston');
var config = require('./config.js');

winston.add(winston.transports.File, { filename: config.logDirectory + 'appwinston.log' });
//winston.remove(winston.transports.Console);

exports.error = function(err){
    if(!err) return;

    if(err.message){
        winston.info("System Error: ",  err.message);
    }
    if(err.stack){
        winston.info(err.stack)
    }
};

exports.log = function(){
    var args = Array.prototype.slice.call(arguments,0);
    args.unshift("Debug Info: ");
    winston.info.apply(this, args);
};

