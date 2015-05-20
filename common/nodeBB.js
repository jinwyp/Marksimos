'use strict';
var request = require('request');
var config = require('./config.js');

// newUserInfo: username, email, password
exports.registerNodeBB = function(newUserInfo, cb){
    request.post({
        url    : config.bbsService + 'api/v1/users',
        headers: {
            Authorization: 'Bearer ' + config.bbsToken
        },
        form   : newUserInfo
    }, function (err, res) {
        if (err) {
            console.log('Reister new user for NodeBB failed!' + err);
            return cb(err);
        }
        // TODO BUG Cannot read property uid of undefined
        if(typeof JSON.parse(res.body).payload.uid === 'undefined'){
            return cb( JSON.parse(res.body).payload);
        }

        return cb(null, JSON.parse(res.body).payload.uid);
    });
};


exports.resetNodeBBPassword = function(uid, passwordNew){
    request.put({
        url    : config.bbsService + 'api/v1/users/' + uid + '/password_reset',
        headers: {
            Authorization: 'Bearer ' + config.bbsToken
        },
        form   : {
            newPassword    : passwordNew
        }
    }, function(err, res){
        if (err) {
            console.log('reset password for NodeBB failed!' + err);
            return;
        }
    });
};


exports.loginNodeBB = function(username, password, cb){
    var j = request.jar();
    var requestWithCookie = request.defaults({jar:j});
    requestWithCookie(config.bbsService+'api/config', function(err, response){
        if(err){
            return cb(err);
        }
        requestWithCookie.post({
            url: config.bbsService+'login',
            headers: {
                'x-csrf-token': JSON.parse(response.body).csrf_token,
                'X-Requested-With:XMLHttpRequest': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': config.bbsService,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
                'Referer': config.bbsService + 'login'
            },
            form: {
                username: username,
                password: password,
                remember:'on',
                returnTo: config.bbsService
            }
        }, function(err, response){
            if(err){
                return cb(err);
            }
            cb(undefined, response.headers['set-cookie']);
        });
    });
};