var request = require('request');
var config = require('../config.js');
var url = require('url');
var util = require('util');

exports.getDecision = function(req, res, next){
    var team = req.query.team;
    var period = req.query.period;

    if(team===undefined || team===''){
        return res.json({errMsg: 'parameter error'});
    }

    if(period===undefined || team===''){
        return res.json({errMsg: 'parameter error'});
    }

    var reqUrl = config.cgiService + util.format('decisions.exe?period=%s&team=&s');
    request(reqUrl, function(err, response, body){
        if(err){
            return next(err);
        }
        if(response.statusCode!==200){
            return next(new Error(response.statusCode.toString()));
        }

        var jsonData;
        try{
            jsonData = JSON.parse(body);
        }catch(parseError){
            return next(parseError);
        }

        return res.json(jsonData);
    })
}