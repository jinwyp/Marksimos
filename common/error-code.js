function MKError(message, errorCode) {
    this.message = message;
    this.errorCode = errorCode;
}

MKError.prototype = Object.create(Error.prototype);
MKError.constructor = MKError;

MKError.errorCode = {
    common: {
        notUpdate: 10001
    }
};

module.exports = MKError;