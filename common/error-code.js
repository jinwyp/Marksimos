function MKError(message, errorCode) {
    this.message = message;
    this.errorCode = errorCode;
}

MKError.prototype = Object.create(Error.prototype);
MKError.constructor = MKError;

MKError.errorCode = {
    common: {
        notUpdate : 10001,
        notFound  : 10002,
        notCreate : 10003,
        alreadyExist : 10004
    },
    register: {
        captcha: 20001
    },
    userInfo: {
        phoneExisted: 30001
    }
};

module.exports = MKError;