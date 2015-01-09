/**
 * Created by jinwyp on 1/5/15.
 */

var mongoose = require('mongoose-q')(require('mongoose'));
   , Schema = mongoose.Schema;
var uuid = require('node-uuid');
var Q = require('q');

var tokenSchema = new Schema({
    //����
    token: { type: String, required: true },
    //�û����
    userId: { type: String, required: true },
    //������Ϣ
    request: {
        ip: { type: String, required: false },
        userAgent: { type: String, required: false }
    },
    //����ʱ��
    expires: { type: Date, required: true }
});


var Token = mongoose.model("authenticationtoken", tokenSchema);
exports = module.exports = Token;

//Ĭ�Ϲ���ʱ��Ϊ40����
exports.defaultExpires = function () {
    return new Date(new Date().getTime() + 1000 * 60 * 40);
};


//����token
exports.saveToken = function (userInfo) {
    var expires = userInfo.expires || Token.defaultExpires();  
    var tokenInsert = new Token({
        token: uuid.v4(),
        userId: userInfo.userId,
        request: userInfo.request,//������Ϣ����ip,user agent
        expires: expires
    });
    return Q.nbind(Token.create, Token)(tokenInsert);
};


//����������ҵ���Ӧ�ļ�¼
exports.findToken = function (token) {
    return Q.nbind(Token.findOne, Token)({ token: token });
};


