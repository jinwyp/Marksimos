/**
 * Created by jinwyp on 2/23/15.
 */

'use strict';

var util = require('util');
var fs = require('fs');
var hyperquest = require('hyperquest');



var sendCloud = {
    module : {
        mail : 'mail',
        stats : 'stats',
        list : 'list'
    },
    action : {
        send : 'send',
        sendTemplate : 'send_template'
    },
    format : {
        json : 'json',
        xml : 'xml'
    }
};


var serverSettings = {
    url : 'https://sendcloud.sohu.com/',
    sendCloudModule : 'mail',
    action : 'send',
    format : 'json',
    api_user : 'jinwyp_test_0XlCSJ',
    api_key : 'XuuMlW73jTugTig4',

    from : '',
    fromname : '',
    to : '',
    cc : '',
    subject : '',
    html : '',

    template_invoke_name : '',
    substitution_vars : '',

    headers : '',
    gzip_compress : 'false'
};


// Export createTransport method
module.exports.createEmailSender = function(sendmethod, serversettings) {
    sendmethod = sendmethod || 'webapi'; //  SMTP or WebAPI

    serversettings = serversettings || serverSettings;

    return new Nodemailer(sendmethod, serversettings);
};

/**
 * Creates an object for exposing the Nodemailer API
 *
 * @constructor
 * @param {Object} transporter Transport object instance to pass the mails to
 */
function Nodemailer(sendmethod, serversettings) {

    this.sendMethod = sendmethod;
    this.module = sendCloud.module[serversettings.sendCloudModule];
    this.action = sendCloud.action[serversettings.action];
    this.format = sendCloud.format[serversettings.format];

    this.serverSettings = serversettings;

}



Nodemailer.prototype.sendMail = function(mail, callback) {

    mail.from = mail.from || 'jinwyp@gmail.com'
    mail.to = mail.to || 'jinwyp@163.com'
    mail.subject = mail.subject || 'Hello'
    mail.html = mail.html || '<b>Hello world</b>'

    var queryUrl  = this.serverSettings.url + '/' + this.sendMethod + '/' + this.module + '.' + this.action + '.' + this.format;

    queryUrl = queryUrl + '/?api_user=' + this.serverSettings.api_user + '&api_key=' + this.serverSettings.api_key +
        '&from=' + mail.from + '&to=' + mail.to + '&subject=' + mail.subject + '&html=' + mail.html;

    var req = hyperquest(queryUrl, { method: 'GET' }, function(err, res){
        if (err) {
            return callback(err);
        }

        return callback(res);
    });

    req.pipe(process.stdout, { end: false });
    req.on('end', function () {
        console.log('Email Send End !!');
    });



};