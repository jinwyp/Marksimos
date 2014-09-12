var questionnaireModel = require('../models/questionnaire.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');

exports.getQuestionnaire =function(req,res,next){
	var seminarId=req.session.seminarId;
	var email=req.session.email;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    if(!email){
        return res.send(400, {message: "Invalid email."});
    }

    var questionnaire={
    	seminarId:seminarId,
    	email:email,
    }

    questionnaireModel.findOne(seminarId,email)
    .then(function(result){
    	if(result){
    		return res.send(result);
    	}else{
    		return questionnaireModel.insert(questionnaire).then(function(result){
                if(!result){
                    throw {message: "failed to save questionnaire to db."}  
                }
                res.send(result);
            })
    	}
    })
    .fail(function(err){
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: "get questionnaire failed."})
    })
    .done();
}

exports.updateQuestionnaire=function(req,res,next){
    var seminarId=req.session.seminarId;
    var email=req.session.email;
    var location=req.body.location;
    var data=req.body.data;

    if(!seminarId){
        return res.send(400, {message: "You don't choose a seminar."});
    }

    if(!email){
        return res.send(400, {message: "Invalid email."});
    }

    if(!location){
        return res.send(400,{message:'Invalid Locatin.'});
    }

    if(!data){
        return res.send(400,{message:'Invalid data'});
    }
    
    var temQuestionnaire = {};
    temQuestionnaire[location]=data;
    // if(location=="q_WillRecommend"){
    //     temQuestionnaire.q_ReasonForRecommendOrNot="";
    // }
    questionnaireModel.update(seminarId,email,temQuestionnaire)
    .then(function(result){
        res.send({message: 'update success.'});
    })
    .fail(function(err){
        var message = JSON.stringify(err, ['message', 'lower', 'upper', 'modifiedField'], 2);
        res.send(403, message);        
    })
    .done(); 

}
