var sessionOperation = require('../../../common/sessionOperation.js');
var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var seminarModel = require('../../models/marksimos/seminar.js');

var logger = require('../../../common/logger.js');
var util = require('util');
var utility = require('../../../common/utility.js');
var validator = require('validator');



exports.addDistributor = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForDistributor(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var distributor = {
        username: req.body.username,
        email: req.body.email,
        password: utility.hashPassword(req.body.password),
        mobilePhone: req.body.mobilePhone,
        idcardNumber: req.body.idcardNumber || '',

        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        district: req.body.district || '',
        street: req.body.street || '',

        role: userRoleModel.roleList.distributor.id,
        emailActivated: true,
        activated: true,
        numOfLicense: req.body.num_of_license_granted


    };

    userModel.findByEmail(req.body.email)
    .then(function(result){
        if(result){
            return res.send(400, {message: 'Email has been used, please choose another email.'});
        }else{
            return userModel.register(distributor)
                .then(function(result){
                    res.send(result);
                })
        }
    })
    .fail(function(err){
        logger.error(err);
        res.send(400, {message: 'add distributor failed.'});
    })
    .done();
};

exports.updateDistributor = function(req, res, next){
    if(!req.params.distributor_id){
        return res.send(400, {message: "distributor_id can't be empty."})
    }

    var validateResult = utility.validateUser(req);
    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var distributor = {
        username: req.body.name,
        mobilePhone: req.body.mobilePhone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        password: utility.hashPassword(req.body.password),
        role: userRoleModel.roleListdistributor.id,
        numOfLicense: req.body.num_of_license_granted,
        emailActivated: true,
        district: req.body.district || '',
        street: req.body.street || '',
        idcardNumber: req.body.idcardNumber || ''
    };

    userModel.update({_id: req.params.distributor_id}, distributor)
    .then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
    })
    .fail(function(err){
        logger.error(err);
        return res.send(500, {message: 'update distributor failed.'});
    })
};

exports.searchDistributor = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: userRoleModel.roleListdistributor.id
    };
    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.find(query)
    .then(function(result){
        res.send(result);
    })
    .fail(function(err){
        logger.error(err);
        res.send(500, {message: 'search failed'})
    })
};


















exports.addFacilitator = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForFacilitator(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var distributorId = req.user.id;

    var facilitator = {
        username: req.body.username,
        email: req.body.email,
        password: utility.hashPassword(req.body.password),
        mobilePhone: req.body.mobilePhone,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        district: req.body.district || '',
        street: req.body.street || '',

        role: userRoleModel.roleListfacilitator.id,
        activated: true,
        emailActivated: true,

        numOfLicense: req.body.num_of_license_granted, //update distributor license when you update this field.
        distributorId: distributorId
    };

    userModel.findByEmail(req.body.email)
        .then(function(result){
            if(result){
                return res.send(400, {message: 'Email has been used, please choose another email.'});
            }else{
                return userModel.findOne({_id: distributorId})
            }
        })
        .then(function(distributor){
            if(!distributor){
                throw {message: "Can't find distributor in database: distributorId: " + distributorId};
            }

            if(distributor.numOfLicense - parseInt(req.body.num_of_license) <= 0){
                throw {httpStatus: 400, message: "You don't have enought license."};
            }

            return userModel.update({_id: distributorId}, {
                numOfLicense: distributor.numOfLicense - parseInt(req.body.num_of_license_granted),
                numOfUsedLicense: distributor.numOfUsedLicense + parseInt(req.body.num_of_license_granted)
            });
        })
        .then(function(numAffected){
            if(numAffected!==1){
                throw {message: 'update distributor failed during add facilitator.'}
            }
            return userModel.register(facilitator);
        })
        .then(function(result){
            if(!result){
                throw {message: 'add facilitator failed.'}
            }
            res.send(result);
        })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            res.send(500, {message: 'add facilitator failed.'});
        })
        .done();
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
    if(req.body.password) facilitator.password = utility.hashPassword(req.body.password);

    var userRole = req.user.roleId;
    if(req.body.num_of_license_granted && (userRole === userRoleModel.roleListadmin.id || userRole === userRoleModel.roleListdistributor.id)){
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
        p = userModel.findOne({
            _id: req.params.facilitator_id
        })
            .then(function(dbFacilitator){
                //if this facilitator belongs to the current distributor
                if(dbFacilitator.distributorId === distributorId){
                    var addedLicense = parseInt(req.body.num_of_license_granted) - dbFacilitator.numOfLicense;
                    return userModel.findOne({
                        _id: distributorId
                    })
                        .then(function(dbDistributor){
                            //if the distributor has enough license
                            if(dbDistributor.numOfLicense > addedLicense){
                                return userModel.update({
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
                                            return userModel.update({_id: req.params.facilitator_id}, facilitator);
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
        p = userModel.update({_id: req.params.facilitator_id}, facilitator);
    }

    p.then(function(numAffected){
        if(numAffected===1){
            return res.send({message: 'update success.'});
        }else{
            return res.send(400, {message: 'user does not exist.'});
        }
    })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            return res.send(500, {message: 'update facilitator failed.'});
        })
        .done();
};

exports.searchFacilitator = function(req, res, next){
    var name = req.query.username;
    var email = req.query.email;
    var country = req.query.country;
    var state = req.query.state;
    var city = req.query.city;
    var activated = req.query.user_status;

    var query = {
        role: userRoleModel.roleListfacilitator.id
    };

    //only distributor and admin can search facilitators
    //distributor can only view its own facilitators
    if(req.user.roleId !== userRoleModel.roleListadmin.id){
        query.distributorId = req.user.id;
    }

    if(name) query.username = name;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.find(query)
        .then(function(allFacilitator){
            if(allFacilitator.length === 0){
                return res.send([]);
            }

            allFacilitator = JSON.parse(JSON.stringify(allFacilitator));

            return userModel.find({role: userRoleModel.roleListdistributor.id})
                .then(function(allDistributor){
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
        })
        .fail(function(err){
            logger.error(err);
            res.send(500, {message: 'search failed'})
        })
        .done();

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

    var filterKey = req.query.filterKey;
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

    if (filterKey) {
        var strRegex = ".*[" + filterKey.split('').join('][') + "].*";
        //不区分大小写
        var regex = { $regex: strRegex , $options: 'i' };
        query.$or = [
            { 'description': regex },
            { 'seminarId': regex },
            { 'venue': regex },
        ];
    }

    seminarModel.find(query, {seminarId:-1})
        .then(function(allSeminars){

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
                            })

                        }
                    }
                })
            }

            res.send(allSeminars);
        })
        .fail(function(err){
            logger.error(err);
            res.send(500, {message: "get seminar list faile."})
        })
        .done();
};










exports.addStudent = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var checkRequiredFieldResult = utility.checkRequiredFieldForStudent(req);
    if(checkRequiredFieldResult){
        return res.send(400, {message: checkRequiredFieldResult});
    }

    var facilitatorId = req.user.id;

    var student = {
        username      : req.body.username,
        email         : req.body.email,
        password      : utility.hashPassword(req.body.password),
        mobilePhone   : req.body.mobilePhone,

        country       : req.body.country,
        state         : req.body.state,
        city          : req.body.city,


        role           : userRoleModel.roleListstudent.id,
        emailActivated : true,
        activated      : true,
        studentType    : req.body.student_type,
        facilitatorId  : facilitatorId,

        idcardNumber             : req.body.idcardNumber || '',
        gender                   : req.body.gender || '',
        occupation               : req.body.occupation || '',
        firstName                : req.body.firstname,
        lastName                 : req.body.lastname,
        organizationOrUniversity : req.body.university || '',
        majorsDegree             : req.body.majorsDegree || ''

    };

    userModel.findOne({
        email: req.body.email
    })
        .then(function(result){
            if(result){
                return res.send(400, {message: 'Email has been used, please choose another email.'});
            }else{
                return userModel.register(student);
            }
        })
        .then(function(result){
            if(!result){
                throw {message: "failed to save student to db."}
            }
            res.send(result);
        })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            res.send(500, {message: "add student failed."})
        })
        .done();
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
    if(req.body.password) student.password = utility.hashPassword(req.body.password);
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

    userModel.findOne({
        _id: student_id
    })
        .then(function(dbStudent){
            if(!dbStudent){
                throw {httpStatus: 400, message: "student doesn't exist."}
            }

            if(dbStudent.facilitatorId !== req.user.id){
                throw {httpStatus: 400, message: "You are not authorized to update this student."}
            }

            return userModel.update({_id: student_id}, student);
        })
        .then(function(numAffected){
            if(numAffected !== 1){
                if(numAffected > 1){
                    throw {httpStatus:400, message: "more than one row are updated."};
                }else{
                    throw {httpStatus:400, message: "no student is updated." + student_id};
                }
            }
            res.send({message: "update student success."});
        })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            res.send(500, {message: "failed to update student."});
        })
        .done();
};

exports.resetStudentPassword = function(req, res, next){
    var validateResult = utility.validateUser(req);

    if(validateResult){
        return res.send(400, {message: validateResult});
    }

    var student = {};
    var password = 'hcd1234';

    student.password = utility.hashPassword(password);

    var student_id = req.body.student_id;

    userModel.findOne({
        _id: student_id
    })
        .then(function(dbStudent){
            if(!dbStudent){
                throw {httpStatus: 400, message: "student doesn't exist."}
            }

            return userModel.update({_id: student_id}, student);
        })
        .then(function(numAffected){
            if(numAffected !== 1){
                if(numAffected > 1){
                    throw {httpStatus:400, message: "more than one row are updated."};
                }else{
                    throw {httpStatus:400, message: "no student is updated." + student_id};
                }
            }
            res.send({message: "update student success."});
        })
        .fail(function(err){
            logger.error(err);
            if(err.httpStatus){
                return res.send(err.httpStatus, {message: err.message});
            }
            res.send(500, {message: "failed to update student."});
        })
        .done();
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
        role : userRoleModel.roleListstudent.id
    };

    if(req.query.student_type){
        query.studentType = req.query.student_type;
    }


    //only facilitator and admin can search students
    //facilitator can only view its own students
    if(req.user.roleId !== userRoleModel.roleListadmin.id){
        query.facilitatorId = req.user.id;
    }

    if(username) query.username = username;
    if(email) query.email = email;
    if(country) query.country = country;
    if(state) query.state = state;
    if(city) query.city = city;
    if(activated) query.activated = activated;

    userModel.find(query)
        .then(function(result){
            res.send(result);
        })
        .fail(function(err){
            logger.error(err);
            res.send(500, {message: 'search failed'})
        })
        .done();
}











