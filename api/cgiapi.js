var request = require('./promises/request.js');
var url = require('url');
var config = require('./config.js');
var util = require('util');

/**
 * Get exogenous, exogenous are some parameters of the game
 * 
 * @method getExogenous
 * @param {Object} seminarSetting {simulationVariant, targetMarket}
 *
 */
exports.getExogenous = function(period){
    var simulationVariant = 'FMCG';
    var targetMarket = 'GENERIC';

    var reqUrl = url.resolve(config.cgiService,
        util.format('exogenous.exe?period=%s&simulationVariant=%s&targetMarket=%s',
            period, simulationVariant, targetMarket));
    return request.get(reqUrl);
}

