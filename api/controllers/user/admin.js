var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var teamModel = require('../../models/user/team.js');
var seminarModel = require('../../models/marksimos/seminar.js');

var utility = require('../../../common/utility.js');
var MKError = require('../../../common/error-code.js');


exports.addDistributor = function(req, res, next){
    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.distributor.id);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var newDistributor = {
        username     : req.body.username,
        email        : req.body.email,
        password     : req.body.password,

        mobilePhone  : req.body.mobilePhone,
        idcardNumber : req.body.idcardNumber,

        country  : req.body.country,
        state    : req.body.state,
        city     : req.body.city,
        district : req.body.district || '',
        street   : req.body.street || '',

        role           : userRoleModel.roleList.distributor.id,
        activated      : true,
        numOfLicense   : req.body.numOfLicense

    };

    userModel.register(newDistributor).then(function(result){
        if(!result){
            throw new Error('Save new distributor to database error.');
        }

        return res.status(200).send({message: 'Register new distributor success'});

    }).fail(function(err){
        next(err);
    }).done();

};


exports.updateDistributor = function(req, res, next){
    if(!req.params.distributor_id){
        return res.send(400, {message: "distributor_id can't be empty."})
    }

    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.distributor.id);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    var distributor = {
        username: req.body.name,
        mobilePhone: req.body.mobilePhone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        role: userRoleModel.roleList.distributor.id,
        numOfLicense: req.body.num_of_license_granted,
        district: req.body.district || '',
        street: req.body.street || '',
        idcardNumber: req.body.idcardNumber || ''
    };

    userModel.updateQ({_id: req.params.distributor_id}, distributor).then(function(result){
        var numberAffected = result[0];
        if(numberAffected !== 1){
            throw new Error('Cancel promise chains. Because Update user failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.send({message: 'update success.'});
    }).fail(function(err){
        next(err);
    }).done();
};



exports.searchDistributor = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: userRoleModel.roleList.distributor.id
    };
    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.findQ(query, userModel.selectFields()).then(function(result){
        res.status(200).send(result);
    }).fail(function(err){
        next(err);
    }).done();
};


















exports.addFacilitator = function(req, res, next){
    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.facilitator.id);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var distributorId = req.user.id;


    var newFacilitator = {
        username     : req.body.username,
        email        : req.body.email,
        password     : req.body.password,

        mobilePhone  : req.body.mobilePhone,
        idcardNumber : req.body.idcardNumber,

        country  : req.body.country,
        state    : req.body.state,
        city     : req.body.city,
        district : req.body.district || '',
        street   : req.body.street || '',

        role           : userRoleModel.roleList.facilitator.id,
        activated      : true,
        numOfLicense   : req.body.numOfLicense, //update distributor license when you update this field.

        distributorId: distributorId

    };

    userModel.findOneQ({ _id: newFacilitator.distributorId}).then(function(resultDistributor){

        if(!resultDistributor){
            throw new Error("Cancel promise, Can't find this distributor: " + newFacilitator.distributorId);
        }else {

            if(resultDistributor.numOfLicense - parseInt(newFacilitator.numOfLicense) <= 0){
                throw new Error("Cancel promise, You don't have enough license to create a new facilitator.");
            }

            resultDistributor.numOfLicense = resultDistributor.numOfLicense - parseInt(newFacilitator.numOfLicense);
            resultDistributor.numOfUsedLicense = resultDistributor.numOfUsedLicense + parseInt(newFacilitator.numOfLicense);


            resultDistributor.saveQ().then(function(resultUpdatedDistributor){
                return userModel.register(newFacilitator);

            }).then(function(resultFacilitator){
                if(!resultFacilitator) {
                    throw new Error('Save new facilitator to database error.');
                }

                return res.status(200).send({message: 'Register new facilitator success'});

            }).fail(function(err){
                next(err);
            }).done();
        }

    }).fail(function(err){
        next(err);
    }).done();

};

exports.updateFacilitator = function(req, res, next){
    var validateResult = utility.validateUser(req);
    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var facilitator = {};

    if(req.body.username) facilitator.username = req.body.username;
    if(req.body.mobilePhone) facilitator.mobilePhone = req.body.mobilePhone;
    if(req.body.country) facilitator.country = req.body.country;
    if(req.body.state) facilitator.state = req.body.state;
    if(req.body.city) facilitator.city = req.body.city;
    if(req.body.password) facilitator.password = userModel.generateHashPassword(req.body.password);

    var userRole = req.user.roleId;
    if(req.body.num_of_license_granted && (userRole === userRoleModel.roleList.admin.id || userRole === userRoleModel.roleList.distributor.id)){
        facilitator.numOfLicense = req.body.num_of_license_granted;
    }
    if(req.body.district) facilitator.district = req.body.district;
    if(req.body.street) facilitator.street = req.body.street;
    if(req.body.idcardNumber) facilitator.idcardNumber = req.body.idcardNumber;

    if(Object.keys(facilitator).length === 0){
        return res.send(400, {message: "you have to provide at least one field to update."});
    }

    var distributorId = req.user.id;

    var p;

    //if the num_of_license is changed, we need to add or remove certain licenses
    //from the distributor
    if(req.body.num_of_license_granted > 0){
        //find the facilitor to be updated.
        p = userModel.findOneQ({
            _id: req.params.facilitator_id
        })
        .then(function(dbFacilitator){
            //if this facilitator belongs to the current distributor
            if(dbFacilitator.distributorId === distributorId){
                var addedLicense = parseInt(req.body.num_of_license_granted) - dbFacilitator.numOfLicense;
                return userModel.findOneQ({
                    _id: distributorId
                })
                .then(function(dbDistributor){
                    //if the distributor has enough license
                    if(dbDistributor.numOfLicense > addedLicense){
                        return userModel.updateQ({
                            _id: distributorId
                        }, {
                            numOfUsedLicense: dbDistributor.numOfUsedLicense + addedLicense,
                            numOfLicense: dbDistributor.numOfLicense - addedLicense
                        })
                        .then(function(result){
                            var numAffected = result[0];
                            if(numAffected!==1){
                                throw {httpStatus: 400, message: 'failed to update distributor ' + distributorId + ' during updating facilitator ' + req.params.facilitator_id};
                            }else{
                                return userModel.updateQ({_id: req.params.facilitator_id}, facilitator);
                            }
                        })
                    }else{
                        throw {httpStatus: 400, message: "you don't have enought license, you need " + addedLicense
                        + " more licenses, but you only have " + dbDistributor.numOfUsedLicense}
                    }
                })
            }else{
                throw {httpStatus: 400, message: "You are not authorized to update this facilitator."}
            }
        })
    }else{
        p = userModel.updateQ({_id: req.params.facilitator_id}, facilitator);
    }

    p.then(function(result){
        var numAffected = result[0];
        if(numAffected!==1){
            return res.send(400, {message: 'user does not exist.'});
        }
        return res.send({message: 'update success.'});
    }).fail(function(err){
        next(err);
    }).done();
};


exports.searchFacilitator = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: userRoleModel.roleList.facilitator.id
    };

    //only distributor and admin can search facilitators
    //distributor can only view its own facilitators
    if(req.user.roleId !== userRoleModel.roleList.admin.id){
        query.distributorId = req.user.id;
    }

    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.findQ(query, userModel.selectFields()).then(function(allFacilitator){
        if(allFacilitator.length === 0){
            return res.send([]);
        }

        allFacilitator = JSON.parse(JSON.stringify(allFacilitator));

        return userModel.findQ({role: userRoleModel.roleList.distributor.id}).then(function(allDistributor){
            for(var i=0; i< allFacilitator.length; i++){
                var facilitator = allFacilitator[i];
                var distributor = findDistributor(facilitator.distributorId, allDistributor);
                if(!distributor){
                    return res.send(500, {message: "distributor " + facilitator.distributorId + " doesn't exist."})
                }
                facilitator.distributorName = distributor.username;
            }

            res.send(allFacilitator);
        })
    }).fail(function(err){
        next(err);
    }).done();

    function findDistributor(distributorId, allDistributor){
        for(var i=0; i< allDistributor.length; i++){
            if(allDistributor[i]._id.toString() === distributorId){
                return allDistributor[i];
            }
        }
    }
};





















exports.addStudent = function(req, res, next){
    req.body.organizationOrUniversity = req.body.university;

    var validationErrors = userModel.registerValidations(req, req.body.userRole || userRoleModel.roleList.student.id, userModel.getStudentType().B2B);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var facilitatorId = req.user._id;

    var newStudent = {
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password,

        gender      : req.body.gender,

        //birthday : req.body.birthday,
        //idcardNumber : req.body.idcardNumber,
        mobilePhone : req.body.mobilePhone,
        country : req.body.country,
        state   : req.body.state,
        city    : req.body.city,

        //dateOfGraduation : req.body.dateOfGraduation,

        facilitatorId : facilitatorId,

        studentType : req.body.studentType,

        activated : true
    };

    if (req.body.userRole === userRoleModel.roleList.student.id) {

        newStudent.role = userRoleModel.roleList.student.id;
        newStudent.majorsDegree = req.body.majorsDegree;
        newStudent.firstName = req.body.firstName;
        newStudent.lastName = req.body.lastName;
        newStudent.qq = req.body.qq;
        newStudent.organizationOrUniversity = req.body.organizationOrUniversity;
        newStudent.occupation = req.body.occupation;

    } else if (req.body.userRole === userRoleModel.roleList.enterprise.id) {

        newStudent.role = userRoleModel.roleList.enterprise.id;
        newStudent.companyName = req.body.companyName;
        newStudent.companyAddress = req.body.companyAddress;
        newStudent.companyContactPerson = req.body.companyContactPerson;
        newStudent.companyContactPersonPosition = req.body.companyContactPersonPosition;
        newStudent.companyOfficeTelephone = req.body.companyOfficeTelephone;
    }


    userModel.register(newStudent).then(function(result){
        if(!result) {
            throw new MKError('Cancel promise chains. Because Create new B2B student or Enterprise failed.', MKError.errorCode.common.phoneExisted);
        }

        return res.status(200).send({message: 'Create new B2B student or Enterprise success'});

    }).fail(function(err){
        next(err);
    }).done();

};




exports.updateStudent = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var student = {};

    if(req.body.username) student.username = req.body.username;
    if(req.body.mobilePhone) student.mobilePhone = req.body.mobilePhone;
    if(req.body.country) student.country = req.body.country;
    if(req.body.state) student.state = req.body.state;
    if(req.body.city) student.city = req.body.city;
    if(req.body.password) student.password = userModel.generateHashPassword(req.body.password);
    if(req.body.idcardNumber) student.idcardNumber = req.body.idcardNumber;
    if(req.body.gender) student.gender = req.body.gender;
    if(req.body.occupation) student.occupation = req.body.occupation;
    if(req.body.firstname) student.firstName = req.body.firstname;
    if(req.body.lastname) student.lastName = req.body.lastname;
    if(req.body.university) student.organizationOrUniversity = req.body.university;
    if(req.body.majorsDegree) student.majorsDegree = req.body.majorsDegree;

    if(Object.keys(student).length === 0){
        return res.send(400, {message: "You should at least provide one field to update."})
    }

    var student_id = req.params.student_id;
    if(!student_id){
        return res.send(400, {message: "student_id can't be empty."})
    }

    userModel.findOneQ({
        _id: student_id
    }).then(function(dbStudent){
        if(!dbStudent){
            throw {httpStatus: 400, message: "student doesn't exist."}
        }

        if(dbStudent.facilitatorId !== req.user.id){
            throw {httpStatus: 400, message: "You are not authorized to update this student."}
        }

        return userModel.updateQ({_id: student_id}, student);
    }).then(function(result){
        var numAffected = result[0];

        if(numAffected !== 1){
            if(numAffected > 1){
                throw {httpStatus:400, message: "more than one row are updated."};
            }else{
                throw {httpStatus:400, message: "no student is updated." + student_id};
            }
        }
        res.send({message: "update student success."});
    }).fail(function(err){
        next(err);
    }).done();
};


exports.resetStudentPassword = function(req, res, next){

    var validationErrors = userModel.userIdValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2B);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    req.body.passwordNew = 'hcd1234';

    userModel.findOneQ({
        _id: req.body.student_id

    }).then(function(resultStudent){
        if(!resultStudent) {
            throw new Error('Cancel promise chains. Because student does not exist.');
        }

        resultStudent.password = req.body.passwordNew;

        return resultStudent.saveQ();

    }).then(function(savedDoc){
        if(savedDoc[1] !== 1 ){
            throw new Error('Cancel promise chains. Because Update Password failed. More or less than 1 record is updated. it should be only one !');
        }

        return res.status(200).send({message: 'Student password reset success. Password is ' + req.body.passwordNew + '.'});

    }).fail(function(err){
        next(err);
    }).done();
};



exports.searchStudent = function(req, res, next){

    var validationErrors = userModel.searchQueryValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    var activated = req.query.user_status;
    var role = req.query.role;

    var quantity = req.query.quantity || 5000;



    var query = {};

    if(activated) query.activated = activated;

    query.role = userRoleModel.roleList.student.id;
    if(role) query.role = role;

    if(req.query.student_type) query.studentType = req.query.student_type;

    if(req.query.username) query.username = req.query.username;
    if(req.query.email) query.email = req.query.email;

    //only facilitator and admin can search students
    //facilitator can only view its own students
    if(req.user.roleId !== userRoleModel.roleList.admin.id){
        query.facilitatorId = req.user.id;
    }


    var dataUserList;
    var userIdList = [];
    var dataTeamMap ={};

    userModel.find(query, userModel.selectFields()).sort({createdAt: -1}).lean().execQ().then(function(result){

        dataUserList = result;

        userIdList = result.map(function(user){
            return user._id;
        });

        return teamModel.find({creator: {$in:userIdList} }).populate('memberList').execQ();

    }).then(function(resultTeam) {

        resultTeam.forEach(function(team, index){
            dataTeamMap[team.creator] = team;
        });

        dataUserList.forEach(function(user){
            if(typeof dataTeamMap[user._id] !== 'undefined'){
                user.team = dataTeamMap[user._id];
            }
        });

        res.status(200).send(dataUserList);
    }).fail(function(err){
        next(err);
    }).done();
};



exports.listStudentNumberByDay = function(req, res, next){

    var query = {
        role : userRoleModel.roleList.student.id
    };

    if(req.query.student_type){
        query.studentType = req.query.student_type;
    }

    //only facilitator and admin can search students
    //facilitator can only view its own students
    if(req.user.roleId !== userRoleModel.roleList.admin.id){
        query.facilitatorId = req.user.id;
    }


    var now = new Date();

    var dd = now.getDate();
    var mm = now.getMonth(); //January is 0!
    var yyyy = now.getFullYear();


    query.createdAt = {
        "$gte": new Date(yyyy, mm, dd - 1),
        "$lt": new Date(yyyy, mm, dd)
    };

    var resultData = [];

    userModel.findQ(query, userModel.selectFields()).then(function(result1){

        resultData.push ({
            date : yyyy + '/' + (mm+1) + '/' + (dd-1),
            userList : result1,
            count : result1.length
        });


        query.createdAt = {
            "$gte": new Date(yyyy, mm, dd),
            "$lt": new Date(yyyy, mm, dd + 1)
        };

        return userModel.findQ(query, userModel.selectFields());

    }).then(function(result2){

        resultData.push ({
            date : yyyy + '/' + (mm+1) + '/' + dd,
            userList : result2,
            count : result2.length
        });

        res.status(200).send(resultData);

    }).fail(function(err){
        next(err);
    }).done();
};





