var winston = require('winston');

winston.add(winston.transports.File, { filename: 'somefile.log' });
winston.remove(winston.transports.Console);

exports.error = function(err){
    if(!err) return;

    if(err.message){
        console.log("Error: " + err.message);
    }
    
    if(err.stack){
        console.log(err.stack)
    }
}

exports.log = function(message){
    console.log(message);
}