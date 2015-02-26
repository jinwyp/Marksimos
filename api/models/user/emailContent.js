/**
 * Created by jinwyp on 2/26/15.
 */



module.exports = (function(){
    var content = {

        sample: {
            from: 'Jinwang<jinwang@hcdlearning.com>', // sender address
            to: 'jinwyp@163.com', // list of receivers
            subject: '来自SendCloud的第一封邮件！', // Subject line
            html: '你太棒了！你已成功的从SendCloud发送了一封测试邮件，接下来快登录前台去完善账户信息吧！' // html body
        },


        registration: {
            from: 'HCDLearing <jinwang.hcdlearning.com>',
            to: 'jinwang.163.com',
            subject: 'Your HCD Learning account: Email address verification',
            data : {
                userName : '',
                token : ''
            },

            html1: '<b>Dear ',
            html2: ' :</b> <br/> <br/>' +
            'In order to help maintain the security of your account, please verify your email address by clicking the following link: <br/>' +
            '<a href="http://www.hcdlearning.com/e4e/emailverify/registration?emailtoken=',
            html3: '">http://www.hcdlearning.com/e4e/emailverify/registration?emailtoken=' ,
            html4: '</a> <br/> <br/> <br/>' +
            'Thanks for helping us maintain the security of your account. <br/> <br/>' +
            'The HCD Learning Team <br/>' +
            '<a href="http://www.hcdlearning.com ">http://www.hcdlearning.com </a>'
        },



        resetPassword: {
            from: 'HCDLearing <jinwang.hcdlearning.com>',
            to: 'jinwang.163.com',
            subject: 'HCD Learning account password reset',
            data : {
                userName : '',
                token : ''
            },
            html1: '<b>Dear ',
            html2: ' :</b> <br/> <br/>' +
            'Changing your password is simple. Please use the link below within 24 hours. <br/>' +
            '<a href="http://www.hcdlearning.com/e4e/emailverify/changepassword?passwordtoken=',
            html3: '">http://www.hcdlearning.com/e4e/emailverify/changepassword?passwordtoken=' ,
            html4: '</a> <br/> <br/> <br/>' +
            'Thanks you. <br/> <br/>' +
            'The HCD Learning Team <br/>' +
            '<a href="http://www.hcdlearning.com ">http://www.hcdlearning.com </a>'
        }
    };



    return content;
})();
