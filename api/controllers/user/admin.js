var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');

var logger = require('../../../common/logger.js');
var util = require('util');
var utility = require('../../../common/utility.js');
var validator = require('validator');



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

    userModel.updateQ({_id: req.params.distributor_id}, distributor).then(function(numberAffected){
        if(numberAffected === 1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
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

    userModel.findQ(query).then(function(result){
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
                        .then(function(numAffected){
                            if(numAffected!==1){
                                throw {httpStatus: 400, message: 'failed to update distributor '
                                + distributorId + ' during updating facilitator ' + req.params.facilitator_id}
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

    p.then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
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

    userModel.findQ(query).then(function(allFacilitator){
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



exports.getSeminarOfFacilitator = function(req, res, next){
    var facilitatorId = req.user.id;

    var keywordFilter = req.query.filterKey;
    var status = req.query.status;

    //确保status.toString()一定成功
    if (status === undefined) {
        status = 'all';
    }
    switch (status.toString()) {
        case 'true':
            status = true;
            break;
        case 'false':
            status = false;
            break;
        default:
            status = 'all';
            break;
    }

    //组织query
    var query = {};
    query.$and = [{ facilitatorId: facilitatorId }];

    if (status !== 'all') {
        query.$and.push({ 'isInitialized': status });
    }

    if (keywordFilter) {
        var strRegex = ".*[" + keywordFilter.split('').join('][') + "].*";

        //不区分大小写
        var regex = { $regex: strRegex , $options: 'i' };
        query.$or = [
            { 'description': regex },
            { 'seminarId': regex },
            { 'venue': regex }
        ];
    }

    seminarModel.find(query, {seminarId:-1}).then(function(allSeminars){

        // 处理兼容老版本
        if(allSeminars.length > 0 ){
            allSeminars.forEach(function(seminarOld){

                if(seminarOld.companyAssignment.length > 0){
                    if(typeof seminarOld.companyAssignment[0].companyId == 'undefined'){

                        var companyList = [];

                        for(var j=0; j<seminarOld.companyAssignment.length; j++){

                            if( typeof seminarOld.companyAssignment[j] !== 'undefined'){

                                var companyNew = {
                                    companyId : j + 1,
                                    companyName : String.fromCharCode('A'.charCodeAt(0) + j ),
                                    studentList : []
                                };

                                for(var k=0; k<seminarOld.companyAssignment[j].length; k++) {
                                    companyNew.studentList.push(seminarOld.companyAssignment[j][k]);
                                }

                                companyList.push(companyNew);
                            }


                        }

                        seminarModel.update({seminarId: seminarOld.seminarId}, { $set: { companyAssignment: companyList }}).then(function(result){
                        }).done();

                    }
                }
            })
        }

        res.send(allSeminars);
    }).fail(function(err){
        next(err);
    }).done();
};



















exports.addStudent = function(req, res, next){
    req.body.organizationOrUniversity = req.body.university;

    var validationErrors = userModel.registerValidations(req, userRoleModel.roleList.student.id, userModel.getStudentType().B2B);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var facilitatorId = req.user.id;

    var newStudent = {
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,

        gender : req.body.gender,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        //birthday : req.body.birthday,
        //idcardNumber : req.body.idcardNumber,
        mobilePhone : req.body.mobilePhone,
        qq : req.body.qq,


        country       : req.body.country,
        state         : req.body.state,
        city          : req.body.city,

        majorsDegree : req.body.majorsDegree,
        //dateOfGraduation : req.body.dateOfGraduation,
        organizationOrUniversity : req.body.university,
        occupation               : req.body.occupation,

        facilitatorId  : facilitatorId,

        role : userRoleModel.roleList.student.id,
        studentType : req.body.studentType,

        activated      : true
    };

    userModel.register(newStudent).then(function(result){
        if(result) {
            throw new Error('Save new company to database error.');
        }

        return res.status(200).send({message: 'Register new company success'});

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
    }).then(function(numAffected){
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
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var student = {};
    var password = 'hcd1234';

    student.password = userModel.generateHashPassword(password);

    var student_id = req.body.student_id;

    userModel.findOneQ({
        _id: student_id
    }).then(function(dbStudent){
        if(!dbStudent){
            throw {httpStatus: 400, message: "student doesn't exist."}
        }

        return userModel.updateQ({_id: student_id}, student);
    }).then(function(numAffected){
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


exports.searchStudent = function(req, res, next){
    var username = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;
    //add for e4e

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

    if(username) query.username = username;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.findQ(query).then(function(result){
        res.send(result);
    }).fail(function(err){
        next(err);
    }).done();
}











