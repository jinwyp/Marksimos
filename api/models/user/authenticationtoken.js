/**
 * Created by jinwyp on 1/5/15.
 */
var mongoose = require('mongoose')
   , Schema = mongoose.Schema;
var uuid = require('node-uuid');
var Q = require('q');

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
    return new Date(new Date().getTime() + 1000 * 60 * 40);
};


//保存token
exports.saveToken = function (userInfo) {
    var expires = userInfo.expires || Token.defaultExpires();  
    var tokenInsert = new Token({
        token: uuid.v4(),
        userId: userInfo.userId,
        request: userInfo.request,//其他信息，如ip,user agent
        expires: expires
    });
    return Q.nbind(Token.create, Token)(tokenInsert);
};


//根据用令牌找到相应的记录
exports.findToken = function (token) {
    return Q.nbind(Token.findOne, Token)({ token: token });
};




