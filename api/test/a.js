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
    request.put('http://localhost:3000/api/distributor/53c38da49f7576ef26b867e9', function(err, res, body){
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
        num_of_license: 1
    });
}

function updateFacilitator(){
    request.put('http://localhost:3000/api/facilitator/53c38dcb4acf1d1627290928', function(err, res, body){
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
        country: 'japan',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 2
    });
}

function addStudent(){
    request.post('http://localhost:3000/api/students', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'student1@hcdglobal.com',
        password: '123456',
        first_name: 'Bruce',
        last_name: 'Lee',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 1,
        pincode: '13911123971123821X'
    });
}

function updateStudent(){
    request.put('http://localhost:3000/api/students/53c4ed59ea13feae915eaa4c', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'student2@hcdglobal.com',
        password: '123456',
        first_name: 'Bruce',
        last_name: 'Lee',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'hangzhou',
        pincode: '13911123971123821X'
    });
}

updateStudent();






























