module.exports = {
    cgiService: 'http://10.20.30.97/cgi-bin/',

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

    initPeriods: [-3, -2, -1, 0],  //Periods at the start of the game
    initCompanies: [1, 2], //Teams at the start of the game

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