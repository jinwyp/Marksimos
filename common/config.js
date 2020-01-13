var path = require('path');

module.exports = (function(){

    var basePath = path.resolve(__dirname, '../');
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
            'Small Pack',
            'Normal Pack',
            'Large Pack'
        ],

        messageConfig : {
            appid : 10129,
            appkey : '4868d6fa40cd727640518011e3549b29',
            signtype : 'normal'
        }
    };

    config.fileUploadDirectory = basePath + '/public/';
    config.logDirectory = basePath + '/log/';
    config.port = 3000;

    // console.log('=====config:', config);


    switch(process.env.NODE_ENV){
        case 'jinlocal':
            config.mongo_conn = 'mongodb://localhost/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            config.bbsService = 'http://community.hcd.com:4567/';
            config.bbsToken = '7d70d2de-4b09-4bf8-baf7-cd506e52f1ac';
            break;
        case 'jindocker':
            config.mongo_conn = 'mongodb://host.docker.internal:27017/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            config.bbsService = 'http://community.hcd.com:4567/';
            config.bbsToken = '7d70d2de-4b09-4bf8-baf7-cd506e52f1ac';
            break;
        case 'jin':
            //config.mongo_conn = 'mongodb://192.168.2.50/Marksimos';
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            config.bbsService = 'http://community.hcd.com:4567/';
            config.bbsToken = '7d70d2de-4b09-4bf8-baf7-cd506e52f1ac';
            break;
        case 'yuekecheng':
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@192.168.2.50:27017/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'ludwik':
            config.host = 'http://localhost:3000/';
            config.mongo_conn = 'mongodb://localhost/marksimos';
            config.cgiService = 'http://localhost:8080/cgi-bin/marksimos/';
            break;
        case 'raven':
            config.mongo_conn = 'mongodb://localhost/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.1.103:800/cgi-bin/';
            break;
        case 'ken':
            config.mongo_conn = 'mongodb://localhost/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            config.bbsService = 'http://bbs.test.com:4567/';
            config.domain = 'test.com';
            config.bbsToken = '02763566-35f4-48f8-8cb4-8322554e53d0';
            break;
        case 'development':
            config.mongo_conn = 'mongodb://localhost/marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.2.50/cgi-bin/';
            break;
        case 'production':
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@127.0.0.1:27017/marksimos';
            config.host = 'http://121.40.121.187:3000/';
            config.cgiService = 'http://10.171.251.169/cgi-bin/';
            config.bbsService = 'http://community.bridgeplus.cn/';
            config.domain = 'bridgeplus.cn';
            config.bbsToken = '2ac528cb-b29c-4841-b0e8-2438c01d9f44';
            break;
        case 'dockerproduction':
            config.mongo_conn = 'mongodb://marksimosdbadmin:marksimossunhao@127.0.0.1:27017/marksimos';
            config.host = 'http://121.40.121.187:3000/';
            config.cgiService = 'http://10.171.251.169/cgi-bin/';
            config.bbsService = 'http://community.bridgeplus.cn/';
            config.domain = 'bridgeplus.cn';
            config.bbsToken = '2ac528cb-b29c-4841-b0e8-2438c01d9f44';
            break;
        default:
            throw new Error("Invalid process.env.NODE_ENV");
    }

    return config;
})();
