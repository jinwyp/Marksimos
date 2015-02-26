/**
 * Created by jinwyp on 2/23/15.
 */

'use strict';

var util = require('util');
var fs = require('fs');
//var hyperquest = require('hyperquest');
var request = require('request');
var _ = require('underscore'); // npm install underscore to install


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



var serverSettingsDefault = {
    url : 'http://sendcloud.sohu.com/',
    sendCloudModule : 'mail',
    action : 'send',
    format : 'json',
    api_user : 'jinwyp_test_0XlCSJ',
    api_key : 'XuuMlW73jTugTig4',

    from : 'service@sendcloud.im',
    fromname : 'HCD Learning',
    to : 'jinwyp@163.com',
    cc : '',
    subject : '欢迎使用HCD Learning！',
    html : '欢迎使用HCD Learning！',

    template_invoke_name : '',
    substitution_vars : '',

    headers : '',
    gzip_compress : 'false'
};


// Export createTransport method
module.exports.createEmailSender = function(sendmethod, serversettings) {
    sendmethod = sendmethod || 'webapi'; //  SMTP or WebAPI

    var serversettings = serversettings || serverSettingsDefault;
    serversettings = _.extend(serverSettingsDefault, serversettings);


    return new NodemailerSendCloud(sendmethod, serversettings);
};



/**
 * Creates an object for exposing the NodemailerSendCloud API
 *
 * @constructor
 * @param {Object} transporter Transport object instance to pass the mails to
 */
function NodemailerSendCloud(sendmethod, serversettings) {

    this.sendMethod = sendmethod;
    this.module = sendCloud.module[serversettings.sendCloudModule];
    this.action = sendCloud.action[serversettings.action];
    this.format = sendCloud.format[serversettings.format];

    this.serverSettings = serversettings;

}



NodemailerSendCloud.prototype.sendMail = function(mail, callback) {

    mail.from = mail.from || serverSettingsDefault.from;
    mail.to = mail.to || serverSettingsDefault.to;
    mail.subject = mail.subject || serverSettingsDefault.subject;
    mail.html = mail.html || serverSettingsDefault.html;


    var queryUrl  = this.serverSettings.url + '/' + this.sendMethod + '/' + this.module + '.' + this.action + '.' + this.format;

    queryUrl = queryUrl + '?api_user=' + this.serverSettings.api_user + '&api_key=' + this.serverSettings.api_key +
        '&from=' + mail.from + '&to=' + mail.to + '&subject=' + mail.subject + '&html=' + mail.html;

    console.log("QURL:", queryUrl);

    request(queryUrl, function(error, response, body){

        if (error) {
            return callback(err);
        }

        if (response.statusCode == 200) {
            console.log("SSS", body);
            return callback(null, body);
        }else{
            console.log("FFF", response);
            return callback(null, response);
        }


    });




};