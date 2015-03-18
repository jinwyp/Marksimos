var nodemailer = require('nodemailer');

module.exports = (function(){
    var config = {

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
        case 'jinlocal2':
            config.fileUploadDirectory = '/Users/jinwyp/Documents/github/Marksimos/public/';
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'jinlocal':
            config.fileUploadDirectory = '/Users/jinwyp/Documents/github/Marksimos/public/';
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@127.0.0.1:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'jin':
            config.fileUploadDirectory = '/Users/jinwyp/Documents/github/Marksimos/public/';
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            //config.mongo_conn = 'mongodb://192.168.2.50/Marksimos';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'yuekecheng':
            config.fileUploadDirectory = 'D:/github/marksimos/public/';
            config.logDirectory = 'D:/github/marksimos/log';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'ludwik':
            config.fileUploadDirectory = '/Users/ludwik/code/actived/Marksimos/public/';
            config.logDirectory = '/Users/ludwik/code/actived/Marksimos/log/';
            config.host = 'http://localhost:3000/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.cgiService = 'http://localhost:8080/cgi-bin/marksimos/';
            break;
        case 'raven':
            config.fileUploadDirectory = '/Users/raven/desktop/code/Marksimos/public/';
            config.logDirectory = '/Users/raven/desktop/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.1.103:800/cgi-bin/';
            break;
        case 'development':
            config.fileUploadDirectory = '/Users/ludwik/code/Marksimos/public/';
            config.logDirectory = '/Users/ludwik/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'production':
            config.fileUploadDirectory = '/home/hcd/Marksimos/public/';
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
