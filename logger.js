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