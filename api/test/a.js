var request = require('request');
var userModel = require('../models/user.js');
var seminarModel = require('../models/seminar.js');
var Q = require('q');
var mongoose = require('mongoose');


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
    request.post('http://localhost:3000/api/distributors', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'distributor1@hcdglobal.com',
        password: '123456',
        name: 'hcd global',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 100
    });
}

function updateDistributor(){
    request.put('http://localhost:3000/api/distributors/53c88615d3691cca075a925f', function(err, res, body){
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
        num_of_license: 100
    });
}


function addFacilitator(){
    request.post('http://localhost:3000/api/facilitators', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        email: 'facilitator1@hcdglobal.com',
        password: '123456',
        name: 'hcd global',
        phone: '631122021',
        country: 'china',
        state: 'shanghai',
        city: 'shanghai',
        num_of_license: 50
    });
}

function updateFacilitator(){
    request.put('http://localhost:3000/api/facilitators/53c8863ebc6800ef078e8ac1', function(err, res, body){
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
        num_of_license: 50
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
        email: 'student2@hcdglobal.com',
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
    request.put('http://localhost:3000/api/students/53c886642c320f1308904a0a', function(err, res, body){
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
        pincode: '13911123971123821X',
        companyRole: 'Team Member'
    });
}

function addSeminar(){
    seminarModel.delete({})
    .then(function(){
        request.post('http://localhost:3000/api/seminar', function(err, res, body){
            if(err){
                console.log(JSON.stringify(err));
            }else{
                console.log(body);
            }
        }).form({
            description: 'test seminar',
            country: 'china',
            state: 'shanghai',
            city: 'hangzhou',
            venue: 'HCD 301',
            simulation_span: 4,
            company_num: 4
        });
    })
    .done();
}

function assignStudent(){
    request.post('http://localhost:3000/api/assign_student_to_seminar', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        student_id: '53c5f2c4c71f7f3fb6e6edb4',
        company_id: '2'
    });
}

function removeStudentFromSeminar(){
    request.post('http://localhost:3000/api/remove_student_from_seminar', function(err, res, body){
        if(err){
            console.log(JSON.stringify(err));
        }else{
            console.log(body);
        }
    }).form({
        student_id: '53c5f2c4c71f7f3fb6e6edb4',
        company_id: '2'
    });
}

function createTestData(){
    userModel.remove({})
    .then(function(){
        return seminarModel.delete({})
    })
    .then(function(){
        return userModel.insert({
            email: 'distributor@hcdglobal.com',
            password: '123456',
            name: 'hcd global',
            phone: '631122021',
            country: 'china',
            state: 'shanghai',
            city: 'shanghai',
            numOfLicense: 100,
            role: 2
        })
    })
    .then(function(){
        return userModel.findOne({email: 'distributor@hcdglobal.com'})
    })
    .then(function(distributor){
        return userModel.insert({
            email: 'facilitator@hcdglobal.com',
            password: '123456',
            name: 'hcd global',
            numOfLicense: 50,
            role: 3,
            distributorId: distributor._id
        })
    })
    .then(function(facilitator){
        return userModel.insert({
            email: 'student@hcdglobal.com',
            password: '123456',
            name: 'jim wozz',
            role: 4,
            facilitatorId: facilitator._id
        })
        .then(function(student){
            return seminarModel.insert({
                description: 'test seminar',
                country: 'china',
                state: 'shanghai',
                city: 'hangzhou',
                venue: 'HCD 301',
                facilitatorId: facilitator._id,
                simulationSpan: 4,
                companyNum: 4,
                seminarId: '10000',
                companyAssignment: [[student._id],[],[],[]],
                isFinished: false
            })
        })
    })
    .then(function(){
        console.log('finished.');
    })
    .fail(function(err){
        console.log(err);
    })
    .done();
}

//updateDistributor();
//updateFacilitator();

mongoose.connect('mongodb://localhost/Marksimos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(response,request) {
    createTestData();
});































