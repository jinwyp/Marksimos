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

function login(){
    request.post('http://localhost:3000/api/login', function(err, res, body){
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

function addDistributor(){
    request.post('http://localhost:3000/api/distributor', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'distributor@hcdglobal.com',
        password: '123456',
        name: 'hcd global',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 10
    });
}

function updateDistributor(){
    request.put('http://localhost:3000/api/distributor/53bf43054efec60000e1e3de', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'distributor@hcdglobal.com',
        password: '123456789',
        name: 'hcd global',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 10
    });
}


function addFacilitator(){
    request.post('http://localhost:3000/api/facilitator', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'facilitator@hcdglobal.com',
        password: '123456',
        name: 'hcd global',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 10
    });
}

addFacilitator();






























