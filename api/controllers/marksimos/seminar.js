var seminarModel = require('../../models/marksimos/seminar.js');
var gameTokenModel = require('../../models/user/gameauthtoken.js');
var userModel = require('../../models/user/user.js');
var userRoleModel = require('../../models/user/userrole.js');
var teamModel = require('../../models/user/team.js');
var chatmessageModel = require('../../models/b2c/chatmessage.js');

var logger = require('../../../common/logger.js');
var consts = require('../../consts.js');
var utility = require('../../../common/utility.js');
var socketio = require('../../../common/socketio.js');



/**
 * Seminar API for Facilitator
 */


exports.addSeminar = function(req, res, next){
    var validationErrors = seminarModel.createValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    if(!Array.isArray(req.body.roundTime)){
        return res.status(400).send( {message: 'round time is wrong format, should be int'} );
    }


    var seminar = {};

    var facilitatorId = req.user.id;


    seminar.description = req.body.description;
    seminar.country = req.body.country;
    seminar.state = req.body.state;
    seminar.city = req.body.city;
    seminar.venue = req.body.venue;
    seminar.facilitatorId = facilitatorId;
    seminar.simulationSpan = req.body.simulation_span;
    seminar.companyNum = req.body.company_num;
    
    seminar.companyAssignment = [];

    var companyNameList = utility.createCompanyArray(seminar.companyNum);
    for(var i = 0; i<seminar.companyNum; i++){

        seminar.companyAssignment.push({
            companyId: i + 1,
            companyName: companyNameList[i],
            studentList : [],
            teamList : []
        });
    }


    seminar.roundTime = [];
    var tempRoundTime = {};

    req.body.roundTime.forEach(function(time, index){
        if(typeof time.period !== 'undefined' && typeof time.hour !== 'undefined'){
            tempRoundTime[time.period] = time.hour;
        }
    });


    for(var j = 1; j<=seminar.simulationSpan; j++){

        var oneRoundTime = {
            period : j,
            roundTimeHour : tempRoundTime[j] || 0,
            lockDecisionTime : seminar.companyAssignment
        };

        seminar.roundTime.push(oneRoundTime);
    }



    userModel.findOneQ({_id: facilitatorId})
    .then(function(dbFacilitator){
        if(!dbFacilitator){
            throw new Error("Cancel promise chains. Can't find facilitator.");
        }

        if(dbFacilitator.numOfLicense <= 0){
            throw new Error("Cancel promise chains. You don't have enough licenses.");
        }

        return userModel.updateQ({_id: facilitatorId}, {
            numOfLicense: dbFacilitator.numOfLicense - 1,
            numOfUsedLicense: dbFacilitator.numOfUsedLicense + 1
        });
    }).then(function(result){
        var numAffected = result[0];
        if(numAffected !== 1){
            throw new Error( "Cancel promise chains. update facilitator failed, or update more than one facilitator.");
        }

        //get all seminar, create the next seminar id
        return seminarModel.find({}).sort({seminarId: "desc"}).execQ();
    }).then(function(allSeminars){
        if(!allSeminars || allSeminars.length === 0){
            seminar.seminarId = "10000";
        }else{
            seminar.seminarId = parseInt(allSeminars[0].seminarId) + 1;
        }

        return seminarModel.createQ(seminar);
    }).then(function(result){
        if(!result){
            throw new Error( "Cancel promise chains. save seminar to db failed.");
        }

        return res.status(200).send(result);
    }).fail(function(err){
        next(err);
    }).done();
};






exports.updateSeminar = function(req, res, next){
    var validationErrors = seminarModel.updateValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    seminarModel.findOneQ({_id: req.body.id}).then(function(resultSeminar){
        if(!resultSeminar){
            throw new Error( "Cancel promise chains. seminar not found.");
        }

        resultSeminar.showLastPeriodScore = req.body.showLastPeriodScore;

        return resultSeminar.saveQ();
    }).then(function(result){
        if(result[1] !== 1){
            throw new Error( "Cancel promise chains. update seminar failed, No seminar or more than one seminar update.");
        }

        return res.status(200).send(result);
    }).fail(function(err){
        next(err);
    }).done();
};


exports.updateSeminarUnlockDecision = function(req, res, next){
    var validationErrors = seminarModel.seminarIdValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    if(!Array.isArray(req.body.unlockDecision)){
        return res.status(400).send( {message: 'Unlock Decision is not a array'} );
    }

    seminarModel.findOneQ({seminarId: req.params.seminar_id}).then(function(resultSeminar){
        if(!resultSeminar){
            throw new Error( "Cancel promise chains. seminar not found.");
        }

        if(resultSeminar.roundTime.length > 0){
            resultSeminar.roundTime.forEach(function(period){
                if(period.period === resultSeminar.currentPeriod){
                    period.lockDecisionTime.forEach(function(company){
                        if(req.body.unlockDecision[company.companyId - 1] === true){
                            company.lockStatus = false;
                        }
                    });
                }
            });
        }

        return resultSeminar.saveQ();
    }).then(function(result){
        if(result[1] > 1){
            throw new Error( "Cancel promise chains. update seminar failed, No seminar or more than one seminar update.");
        }

        return res.status(200).send(result);
    }).fail(next).done();
};






exports.assignStudentToSeminar = function(req, res, next){

    req.checkBody('seminar_id', 'Invalid seminar id.').notEmpty().isInt();
    req.checkBody('company_id', 'Invalid company id.').notEmpty().isInt();

    var seminarId = req.body.seminar_id;
    var companyId = +req.body.company_id;


    //var validationErrors = req.validationErrors();

    var validationErrors = seminarModel.studentEmailValidations(req);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }


    var userData;

    userModel.findOneQ({$or : [
        { username: req.body.username},
        { email: req.body.email}

    ]}).then(function(resultUser){

        if(!resultUser){
            throw new Error('Cancel promise chains. Because User not found !');
        }

        userData = resultUser;

        return seminarModel.findOneQ({seminarId: seminarId});
    }).then(function(resultSeminar){
        if (!resultSeminar) {
            throw new Error('Cancel promise chains. Because Seminar not found !');
        }

        var companyAssignment = resultSeminar.companyAssignment;
        var isStudentAssignedToSeminar = false;
        var isTeamAssignedToSeminar = false;

        if(req.body.studentemail !== ''){

            for(var i=0; i < companyAssignment.length; i++){
                if(companyAssignment[i].studentList.indexOf(userData.email) > -1){
                    isStudentAssignedToSeminar = true;
                    throw new Error('Cancel promise chains. Because email have already assigned to this seminar!');
                }
            }

            //if this student has not been added to this seminar, add it
            if(!isStudentAssignedToSeminar){
                seminarModel.findOneAndUpdateQ({ 'seminarId': seminarId, 'companyAssignment.companyId': companyId }, {
                    '$addToSet': { 'companyAssignment.$.studentList': userData.email }

                }).then(function(saveDoc){
                    if(!saveDoc){
                        throw new Error('Cancel promise chains. Because Update seminar failed. More or less than 1 record is updated. it should be only one !');
                    }
                    return res.status(200).send({message: "assign student to seminar success."});
                }).fail(function(err){
                    next (err);
                }).done();
            }

        }else{
            teamModel.findOne({creator : userData._id}).populate('memberList').execQ().then(function(resultTeam) {

                if (!resultTeam) {
                    throw new Error('Cancel promise chains. Because Team not found !');
                }

                companyAssignment.forEach(function(company){

                    if(typeof company.teamList !== 'undefined'){
                        if(company.teamList.indexOf(resultTeam._id.toString()) > -1){
                            isTeamAssignedToSeminar = true;
                            throw new Error('Cancel promise chains. Because team have already assigned to this seminar!');
                        }
                    }

                });

                if(!isTeamAssignedToSeminar){

                    companyAssignment.forEach(function(company){
                        if(company.companyId == companyId) {

                            company.studentList.push(userData.email);

                            resultTeam.memberList.forEach(function(student) {

                                if(company.studentList.indexOf(student.email) === -1){
                                    company.studentList.push(student.email);
                                }

                            });



                            if(typeof company.teamList !== 'undefined'){
                                company.teamList.push(resultTeam._id.toString());
                            }

                        }

                    });
                    return seminarModel.findOneAndUpdateQ({ 'seminarId': seminarId }, {
                        companyAssignment : companyAssignment
                    });
                }

            }).then(function(saveDoc){
                if(!saveDoc){
                    throw new Error('Cancel promise chains. Because Update seminar failed. More or less than 1 record is updated. it should be only one !');
                }
                return res.status(200).send({message: "assign team to seminar success."})
            }).fail(function(err){
                next (err);
            }).done();

        }

    }).fail(function(err){
        next (err);
    }).done();
};




exports.removeStudentFromSeminar = function(req, res, next){

    req.checkBody('seminar_id', 'Invalid seminar id.').notEmpty().isInt();

    var email, teamid;

    if(req.body.studentemail !== ''){
        req.checkBody('studentemail', 'Invalid email.').notEmpty().isEmail();
        email = req.body.studentemail;
    }else{
        req.checkBody('teamid', 'User ID should be 24 characters').notEmpty().len(24, 24);
        teamid = req.body.teamid;
    }

    var validationErrors = req.validationErrors();

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var seminarId = req.body.seminar_id;

    seminarModel.findOneQ({seminarId: seminarId}).then(function(resultSeminar){
        if(!resultSeminar){
            throw new Error( "seminar "+ seminarId + " doesn't exist.");
        }

        var companyAssignment = resultSeminar.companyAssignment;

        if(req.body.studentemail !== ''){

            for(var i=0; i<companyAssignment.length; i++){
                //if this student is in this company
                if(companyAssignment[i].studentList.indexOf(email) > -1){

                    for(var j=0; j<companyAssignment[i].studentList.length; j++){
                        if(companyAssignment[i].studentList[j] === email){
                            companyAssignment[i].studentList.splice(j, 1);
                        }
                    }
                }
            }

            return seminarModel.updateQ({seminarId: seminarId}, {
                companyAssignment: companyAssignment
            });

        }else{

            return teamModel.findOne({_id : teamid}).populate('memberList').populate('creator').execQ().then(function(resultTeam) {
                if (!resultTeam) {
                    throw new Error('Cancel promise chains. Because Team not found !');
                }

                companyAssignment.forEach(function(company){

                    if(typeof company.teamList !== 'undefined'){
                        if(company.teamList.indexOf(resultTeam._id.toString()) > -1){

                            company.teamList.forEach(function(teamid, index){


                                if(teamid === resultTeam._id.toString()){
                                    company.teamList.splice(index, 1);
                                }

                            });

                            resultTeam.memberList.forEach(function(teamstudent){
                                company.studentList.forEach(function(studentemail, studentindex){

                                    if(teamstudent.email === studentemail){
                                        company.studentList.splice(studentindex, 1);
                                    }
                                });
                            });

                            company.studentList.forEach(function(studentemail, studentindex){

                                if(resultTeam.creator.email === studentemail){
                                    company.studentList.splice(studentindex, 1);
                                }
                            });
                        }
                    }

                });

                return seminarModel.updateQ({seminarId: seminarId}, {
                    companyAssignment: companyAssignment
                });

            });

        }



    }).then(function(result){
        var numberAffected = result[0];
        if(numberAffected!==1){
            throw new Error('Cancel promise chains. Because Because Update seminar failed. More or less than 1 record is updated. it should be only one !');
        }
        return res.status(200).send({message: "Remove team from seminar success."})

    }).fail(function(err){
        next(err);
    }).done();
};





exports.getSeminarOfFacilitator = function(req, res, next){

    var facilitatorId = req.user._id;

    var keywordFilter = req.query.filterKey || '';
    var status = req.query.status || 'all';

    var query = {};
    query.$and = [
        { facilitatorId: facilitatorId }
    ];

    if (status !== 'all') {
        query.$and.push({ 'isInitialized': status });
    }

    if (keywordFilter) {
        var strRegex = ".*[" + keywordFilter.split('').join('][') + "].*";
        var regex = { $regex: strRegex , $options: 'i' }; // $options : 'i' Means case insensitivity to match upper and lower cases. 不区分大小写

        query.$or = [
            { 'description': regex },
            { 'seminarId': regex },
            { 'venue': regex }
        ];
    }

    seminarModel.find(query).sort({seminarId:-1}).execQ().then(function(allSeminars){

        // 处理Team 信息
        var teamList = [];
        var teamListHashTable = {};

        var companyRoundTimeMap = {};


        allSeminars.forEach(function(seminar){
            seminar.companyAssignment.forEach(function(company){

                if(typeof company.teamList !== 'undefined'){
                    company.teamList.forEach(function(teamid){
                        teamList.push(teamid);
                    });
                }

                //company.totalRoundTime = companyRoundTimeMap[company.companyName];

            });


            if(Array.isArray(seminar.roundTime)){
                seminar.roundTime.forEach(function(period){

                    period.lockDecisionTime.forEach(function(company){
                        companyRoundTimeMap[company.companyName] = companyRoundTimeMap[company.companyName] || 0 ;
                        if(company.lockStatus){
                            companyRoundTimeMap[company.companyName] = companyRoundTimeMap[company.companyName] + company.spendHour;
                        }else{
                            companyRoundTimeMap[company.companyName] = companyRoundTimeMap[company.companyName] + period.roundTimeHour * 1000*60*60;
                        }
                    });
                });
            }

        });


        teamModel.find({ '_id': { $in: teamList} }).populate('creator', userModel.selectFields() ).populate('memberList', userModel.selectFields() ).execQ().then(function(results){

            results.forEach(function(team){
                teamListHashTable[team._id] = team;
            });


            allSeminars.forEach(function(seminar){
                seminar.companyAssignment.forEach(function(company){
                    company.teamListData = [];
                    company.totalRoundTime = 0;
                    company.totalRoundTime = companyRoundTimeMap[company.companyName];

                    if(typeof company.teamList !== 'undefined'){
                        company.teamList.forEach(function(teamid){
                            company.teamListData.push(teamListHashTable[teamid]);
                        });
                    }

                });
            });

            res.status(200).send(allSeminars);

        }).fail(function(err){
            next(err);
        }).done();


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

                        seminarModel.updateQ({seminarId: seminarOld.seminarId}, { $set: { companyAssignment: companyList }}).then(function(result){
                        }).done();

                    }
                }
            });
        }


    }).fail(function(err){
        next(err);
    }).done();
};









exports.seminarInfoForFacilitator = function(req, res, next){
    var seminarId = req.params.seminar_id;

    if(!seminarId){
        return res.send(400, {message: "Invalid seminar_id"});
    }

    seminarModel.findOneQ({seminarId: seminarId}).then(function(dbSeminar){
        if(!dbSeminar){
            return res.send(400, {message: "seminar " + seminarId + " doesn't exist."});
        }

        return res.render('marksimosadmin/adminmarksimosreport.ejs',{
            title : 'Admin | Report',
            seminarId: seminarId
        });
    }).fail(function(err){
        next(err);
    }).done();

};






/**
 * Seminar API for Student
 */


exports.getSeminarList = function(req, res, next){
    var email = req.user.email;
    var assignedSeminars = [];

    seminarModel.find({
        companyAssignment : {$elemMatch : {studentList: { $in: [email] }} },
        isInitialized :true
    }).sort({isSimulationFinished : 1 , seminarId: -1}).execQ().then(function(allSeminars){

        for(var i=0; i<allSeminars.length; i++){

            var seminar = allSeminars[i];

            for(var j=0; j<seminar.companyAssignment.length; j++){

                if( typeof seminar.companyAssignment[j].studentList  !== 'undefined'){
                    if(seminar.companyAssignment[j].studentList.indexOf(email) > -1){
                        if(seminar.isInitialized ){
                            assignedSeminars.push(seminar);
                            break;
                        }
                    }
                }
            }
        }

        return res.status(200).send(assignedSeminars);
    }).fail(function(err){
        err.message = "get seminar list failed.";
        next(err);
    }).done();
};




exports.chooseSeminarForStudent = function(req, res, next){
    var seminarId = req.query.seminar_id;

    req.checkQuery('seminar_id', 'Invalid seminar_id').isInt();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send('There have been validation errors: ' + util.inspect(errors), 400);
    }

    seminarModel.findOneQ({seminarId: seminarId}).then(function(dbSeminar){
        if(!dbSeminar){
            return res.status(400).send( {message: "seminar " + seminarId + " doesn't exist."});
        }else{

            var newGameToken = {
                userId: req.user.id,
                gameId: userRoleModel.gameList.marksimos.id,
                seminarId: dbSeminar.seminarId
            };

            gameTokenModel.findOneAndUpdateQ({ userId: req.user.id }, newGameToken, { upsert : true } ).then(function(gameToken){

                return res.status(200).send({message: "choose seminar success."});

            }).fail(function(err){
                err.message = "save game token failed!";
                next(err);
            }).done();
        }

    }).fail(function(err){
        err.message = "choose seminar failed !";
        next(err);
    }).done();
};








/**
 * Seminar Socket.IO API
 */


exports.sendChatMessageSeminar = function(req, res, next) {

    var validationErrors = chatmessageModel.createValidations(req, req.user.role);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    var socketRoom;

    if(userRoleModel.roleList.facilitator.id === req.user.role){
        socketRoom = req.body.seminarRoom;
    }else if(userRoleModel.roleList.student.id === req.user.role){
        socketRoom = req.gameMarksimos.socketRoom.seminar;
    }

    chatmessageModel.createQ({
        text: req.body.message,
        creator: req.user._id,
        room: {
            roomNumber: socketRoom
        }
    }).then(function(resultMessage){

        if(!resultMessage ){
            throw new Error('Cancel promise chains. Because Create New ChatMessage failed !');
        }

        return res.status(200).send({message: 'Create New Chat Message success'});

    }).fail(next).done();

    socketio.emitMarksimosChatMessageSeminar(socketRoom, req.user, req.body.message);
};



exports.sendChatMessageSeminarCompany = function(req, res, next) {

    var validationErrors = chatmessageModel.createValidations(req, req.user.role);

    if(validationErrors){
        return res.status(400).send( {message: validationErrors} );
    }

    chatmessageModel.createQ({
        text: req.body.message,
        creator: req.user._id,
        room: {
            roomNumber: req.gameMarksimos.socketRoom.company
        }
    }).then(function(resultMessage){

        if(!resultMessage ){
            throw new Error('Cancel promise chains. Because Create New ChatMessage failed !');
        }

        return res.status(200).send({message: 'Create New Chat Message success'});

    }).fail(next).done();

    socketio.emitMarksimosChatMessageCompany(req.gameMarksimos.socketRoom.company, req.user, req.body.message);
};















