module.exports = {
    cgiService: 'http://10.20.30.97/cgi-bin/',

    initPeriods: [-3, -2, -1, 0],  //Periods at the start of the game
    initTeams: [1, 2], //Teams at the start of the game

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
    }
};