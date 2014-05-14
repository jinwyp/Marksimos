var request = require('request');

function register(){
    request.post('http://localhost:3000/api/register', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'yuansu@hcdglobal.com',
        password: '123456'
    });
}

register();