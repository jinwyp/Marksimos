module.exports = (function(){
    var config = {
        passwordSalt: 'hcd',

        role: {
            admin: 1,
            distributor: 2,
            facilitator: 3,
            student: 4
        },

        mail: {
            host: 'mail.hcdglobal.com',
            user: 'test@hcdglobal.com',
            password: 'hcd1234##',
            name: 'HCD'
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
                'FreshInventory',
                'PreviousInventory',
                'CloseToEXpireInventory' 
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
            config.logDirectory = '/Users/ludwik/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://10.20.30.97/cgi-bin/'; 
            break;
        case 'jin':
            config.logDirectory = '/Users/jinwyp/Documents/github/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://10.20.30.97/cgi-bin/';
            break;
        case 'ludwik':
            config.logDirectory = '/Users/ludwik/code/actived/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://localhost:8080/cgi-bin/marksimos/';            
            break;            
        case 'development':
            config.logDirectory = '/Users/ludwik/code/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://10.20.30.97/cgi-bin/';
            break;
        case 'raven':
            config.logDirectory = '/Users/raven/desktop/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://localhost:3000/';
            config.cgiService = 'http://192.168.1.103:800/cgi-bin/';
            break;
        case 'production':
            config.logDirectory = '/home/hcd/Marksimos/log/';
            config.mongo_conn = 'mongodb://localhost/Marksimos';
            config.host = 'http://121.40.121.187:3000/';
            config.cgiService = 'http://10.171.251.169/cgi-bin/';
            break;
        default:
            throw new Error("Invalid process.env.NODE_ENV");
    }

    return config;
})();
