/**
 * Created by jinwyp on 2/26/15.
 */

"use strict";

module.exports = {

    sample: {
        from: 'Jinwang<jinwang@hcdlearning.com>', // sender address
        to: 'jinwyp@163.com', // list of receivers
        subject: '来自SendCloud的第一封邮件！', // Subject line
        html: '你太棒了！你已成功的从SendCloud发送了一封测试邮件，接下来快登录前台去完善账户信息吧！' // html body
    },

    registration: {
        from: 'HCDLearing <jinwang@hcdlearning.com>',
        fromname : 'HCDLearning webmaster',
        to: 'jinwyp@163.com',

        subject: 'Your HCD Learning account: Email address verification',

        substitution_vars : {
            to : [],
            sub : {
                '%username%' : [],
                '%useremail%' : [],
                '%token%' : []
            }
        },
        template_invoke_name : 'registration',

        html: '',

        html1: '<html><body><div style=\'width: 500px; font-size: 12px; \'><br/><b>Dear ',
        html2: ' :</b><br/><br/>' +
        'In order to help maintain the security of your account, please verify your email address by clicking the following link: <br/>' +
        '<a href=\'http://www.hcdlearning.com/e4e/emailverify/registration?email=' ,
        html3: '&emailtoken=',
        html4: '\'>http://www.hcdlearning.com/e4e/emailverify/registration?email=' ,
        html5: '&emailtoken=' ,
        htmlend: '</a><br/><br/><br/>' +
        'Thanks for helping us maintain the security of your account. <br/><br/>' +
        'The HCD Learning Team<br/>' +
        '<a href=\'http://www.hcdlearning.com\'>http://www.hcdlearning.com</a> </div></body></html>'
    },


    resetPassword: {
        from: 'HCDLearing <jinwang@hcdlearning.com>',
        fromname : 'HCDLearning webmaster',
        to: 'jinwyp@163.com',

        subject: 'HCD Learning account password reset',

        substitution_vars : {
            to : [],
            sub : {
                '%username%' : [],
                '%useremail%' : [],
                '%token%' : []
            }
        },
        template_invoke_name : 'resetpassword',

        html: '',

        //html1: '<html><head></head><body><div style=\'width: 430px; font-size: 12px; color: #333333; font-family: Trebuchet MS,Verdana,Arial,Helvetica,sans-serif; \'><br/><b>Dear ',
        html1: '<html><body><div style=\'width: 500px; font-size: 12px; color: #333333; \'><br/><b>Dear ',
        html2: ' :</b><br/><br/>' +
        'Changing your password is simple. Please use the link below within 24 hours. <br/>' +
        '<a href=\'http://www.hcdlearning.com/e4e/emailverify/changepassword?username=',
        html3: '&passwordtoken=',
        html4: '\'>http://www.hcdlearning.com/e4e/emailverify/changepassword?username=' ,
        html5: '&passwordtoken=' ,
        htmlend: '</a> <br/> <br/> <br/>' +
        'Thanks you. <br/> <br/>' +
        'The HCD Learning Team<br/>' +
        '<a href=\'http://www.hcdlearning.com\'>http://www.hcdlearning.com</a></div></body></html>'
    }
};



