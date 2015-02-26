var nodemailer = require('nodemailer');

module.exports = (function(){
    var config = {

        mailTransporter : nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jinwyp@gmail.com',
                pass: 'jinwyp2011'
            }
        }),

        //mailTransporter : nodemailer.createTransport( {
        //    host: "smtp.163.com", // 主机
        //    secure: true, // 使用 SSL
        //    port: 465, // SMTP 端口
        //    auth: {
        //        user: "jinwyp", // 账号
        //        pass: "jinwyp2011" // 密码
        //    }
        //}),

        mail: {
            host: 'mail.hcdglobal.com',
            user: 'test@hcdglobal.com',
            password: 'hcd1234##',
            name: 'HCD'
        },
        mailContent: {
            from: 'HCD <jinwyp.163.com>',
            to: 'jinwang.hcdlearning.com',
            subject: 'Hello world',
            text: 'Hello world, I am a test mail!',
            html: '<b>Hello world, I am a test mail!</b>'
        },

        segmentNameAndIndex: {
            'priceSensitive':0,
            'pretenders': 1,
            'moderate': 2,
            'goodLife': 3,
            'ultimate': 4,
            'pragmatic': 5,
            'allSegments': 6
        },
        segmentNames: [
            'priceSensitive',
            'pretenders',
            'moderate',
            'goodLife',
            'ultimate',
            'pragmatic',
            'allSegments'
        ],

        segmentNamesOnProductPortfolio: [
            '1. Price Sensitive',
            '2. Pretenders',
            '3. Moderate',
            '4. Good Life',
            '5. Ultimate',
            '6. Pragmatic'
        ],

        inventoryNames: {
            'FMCG': [
                'Fresh Inventory',
                'Previous Inventory',
                'Close to Expire Inventory'
            ],
            'DURABLES': [
                'Latest Stock',
                'one-year old Stock',
                'Two-year old Stock',
                'Three-year old Stock',
                'Oldest Stock'
            ]
        },

        packsizeDescription: [
            "Small Pack",
            "Normal Pack",
            "Large Pack"
        ]
    };

    switch(process.env.NODE_ENV){
        case 'suyuan':
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'jinlocal':
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@127.0.0.1:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'jin':
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            //config.mongo_conn = 'mongodb://192.168.2.50/Marksimos';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'yuekecheng':
            config.logDirectory = 'D:/github/marksimos/log';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'ludwik':
            config.logDirectory = '/Users/ludwik/code/actived/Marksimos/log/';
            config.host = 'http://localhost:3000/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.cgiService = 'http://localhost:8080/cgi-bin/marksimos/';
            break;
        case 'development':
            config.logDirectory = '/Users/ludwik/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'raven':
            config.logDirectory = '/Users/raven/desktop/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.1.103:800/cgi-bin/';
            break;
        case 'production':
            config.logDirectory = '/home/hcd/Marksimos/log/';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@127.0.0.1:27017/Marksimos';
            config.host = 'http://121.40.121.187:3000/';
            config.cgiService = 'http://10.171.251.169/cgi-bin/';
            break;
        default:
            throw new Error("Invalid process.env.NODE_ENV");
    }

    return config;
})();
