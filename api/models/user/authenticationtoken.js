/**
 * Created by jinwyp on 1/5/15.
 */

var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var uuid = require('node-uuid');
var Q = require('q');
var mongooseTimestamps = require('mongoose-timestamp');
var logger = require('../../../common/logger.js');


var lastClearTime = null;
var SevenDay = 1000 * 60 * 60 * 24 * 7;
var OneDay = 1000 * 60 * 60 * 24;
var OneMinute = 1000 * 60;

var expiresTime = 1000 * 60 * 60 * 48; // 48 hours 2 days 1000 * 60 * 60 * 12
var expiresTimeRememberMe = 1000 * 60 * 60 * 24 * 30 * 6; // 6 month  1000 * 60 * 60 * 12



var tokenSchema = new Schema({
    //令牌
    token: { type: String, required: true },
    //用户编号
    
    userId: { type: String, required: true },
    
    //其他信息
    request: {
        ip: { type: String, required: false },
        userAgent: { type: String, required: false }
    },
    
    //过期时间
    expires: { type: Date, required: true }
});
tokenSchema.plugin(mongooseTimestamps);




tokenSchema.statics.defaultExpires = function (rememberme) {
    if(rememberme){
        return new Date(new Date().getTime() + expiresTimeRememberMe);
    }
    return new Date(new Date().getTime() + expiresTime);
};


//保存token
tokenSchema.statics.createToken = function (userInfo) {
    var expires = userInfo.expires || this.defaultExpires(userInfo.rememberMe);
    var tokenInsert = {
        token: uuid.v4(),
        userId: userInfo.userId,
        request: userInfo.request,//其他信息，如ip,user agent
        expires: expires
    };
    return this.createQ(tokenInsert) ;
};


//清除所有过期的token,一天清理一次
tokenSchema.statics.clearToken = function (userInfo) {
    var now = new Date();
    lastClearTime = now - OneMinute;

    //删除 从现在开始已过期1分钟的数据,防止边界问题
    Token.remove({ expires: { $lt: lastClearTime } }, function (err, rowNum) {
        logger.log("clear " + rowNum + " expired token.");
    });

    setTimeout(Token.clearToken, SevenDay);
};



var Token = mongoose.model("authenticationtoken", tokenSchema);
module.exports = Token;


