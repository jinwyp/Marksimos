/**
 * Created by jinwyp on 1/5/15.
 */

var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var uuid = require('node-uuid');
var Q = require('q');
var lastClearTime = null;
var aDay = 1000 * 60 * 60 * 24;
var min40 = 1000 * 60 * 40;
var aMinute = 1000 * 60;


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


var Token = mongoose.model("authenticationtoken", tokenSchema);
exports = module.exports = Token;

//默认过期时间为40分钟
exports.defaultExpires = function () {
    return new Date(new Date().getTime() + min40);
};

//清除所有过期的token,一天清理一次
clearToken = function () {
    var now = new Date();
    console.log('check');
    lastClearTime = now;
    //一分钟前
    var aMinuteAgo = now - aMinute;
    //删除已过期1分钟的数据,防止边界问题
    Token.remove({ expires: { $lt: aMinuteAgo } }, function (err, rowNum) {
        console.log("clear " + rowNum + " expired token.");
    });
    
    setTimeout(clearToken, aDay);
};
clearToken();

//保存token
exports.saveToken = function (userInfo) {
    var expires = userInfo.expires || Token.defaultExpires();
    var tokenInsert = new Token({
        token: uuid.v4(),
        userId: userInfo.userId,
        request: userInfo.request,//其他信息，如ip,user agent
        expires: expires
    });
    return Q.nbind(tokenInsert.save, tokenInsert)();
};


//根据用令牌找到相应的记录
exports.findToken = function (token) {
    return Q.nbind(Token.findOne, Token)({ token: token });
};


