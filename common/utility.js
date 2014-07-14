var gameParameters = require('../api/gameParameters.js').parameters;
var cgiapi = require('../api/cgiapi.js');
var consts = require('../api/consts.js');
var config = require('./config.js');
var nodemailer = require('nodemailer');
var uuid = require('node-uuid');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');


exports.setSize = function(num){
    return num;
}

/**
 * Find brand by brandId
 *
 * @method findBrand
 * @param {Object} currentPeriodResult data from allResults
 * @param {Function} u_ParentBrandID
 * @return {Object} the brand data from allResults
 */
exports.findBrand = function(onePeriodResult, u_ParentBrandID){
    for(var i=0; i<onePeriodResult.p_Brands.length; i++){
        var brand = onePeriodResult.p_Brands[i];
        if(brand.b_BrandID === u_ParentBrandID){
            return brand;
        }
    }
}

exports.findSKU = function(onePeriodResult, SKUID){
    for(var i=0; i<onePeriodResult.p_SKUs.length; i++){
        var SKU = onePeriodResult.p_SKUs[i];
        if(SKUID === SKU.u_SKUID){
            return SKU;
        }
    }
}

exports.findCompany = function(onePeriodResult, companyId){
    for(var i=0; i<onePeriodResult.p_Companies.length; i++){
        var companyResult = onePeriodResult.p_Companies[i];
        if(companyResult.c_CompanyID === companyId){
            return companyResult;
        }
    }
}


exports.unitCost = function(periodNumber, packsize, ingredientsQuality, technologyLevel, previousCumulatedVolumes, efficiencyOfProduction, currentVolume){
    if(periodNumber === undefined) throw new Error("Invalid parameter periodNumber.");
    if(packsize === undefined) throw new Error("Invalid parameter packsize.");
    if(ingredientsQuality===undefined) throw new Error("Invalid parameter ingredientQuality.");
    if(technologyLevel === undefined) throw new Error("Invalid parameter technologyLevel.");
    if(previousCumulatedVolumes === undefined) throw new Error("Invalid parameter previousCumulatedVolumes.");
    if(efficiencyOfProduction === undefined) throw new Error("Invalid parameter efficiencyOfProduction.");
    if(currentVolume === undefined) throw new Error("Invalid patameter currentVolume.");

    var tLevel;
    var inflation;
    var QI;
    var TL;
    var costNow;

    var volumeNow = currentVolume * consts.ActualSize[packsize];

    volumeNow += previousCumulatedVolumes[technologyLevel];

    if(technologyLevel < consts.TechnologyUltimateLevel){
        for(var i = technologyLevel; i < consts.TechnologyUltimateLevel; i++){
            volumeNow += previousCumulatedVolumes[i] * gameParameters.pgen.firm_HigherTechnologyImpact;
        }
    }

    volumeNow = Math.max(volumeNow, gameParameters.pgen.sku_MinProductionVolume);

    return cgiapi.getExogenous(periodNumber)
    .then(function(exogenous){
        if(periodNumber < 0){
            inflation = Math.pow(1 + exogenous.exo_InflationRate, Math.abs(periodNumber));
        }else{
            inflation = 1.0;
        }

        QI = gameParameters.pgen.sku_CostIQSquare * ingredientsQuality * ingredientsQuality
            + gameParameters.pgen.sku_CostIQLinear * ingredientsQuality
            + gameParameters.pgen.sku_CostIQIntercept;

        TL = gameParameters.pgen.sku_CostTLSquare * technologyLevel * technologyLevel
            + gameParameters.pgen.sku_CostTLLinear * technologyLevel
            + gameParameters.pgen.sku_CostTLIntercept;

        costNow = exogenous.exo_IngredientsCost / inflation * QI
            + exogenous.exo_TechnologyExpense / inflation * TL;

        costNow *= Math.pow(volumeNow / gameParameters.pgen.sku_MinProductionVolume, gameParameters.pgen.sku_DefaultCostDrop);

        costNow = (costNow + exogenous.exo_LogisticsFixedCosts / inflation) * (1.00 - efficiencyOfProduction);

        costNow = costNow * consts.ActualSize[packsize];

        return costNow;
    })
}

exports.unitPrice = function(localtion, consumerPrice){
    var priceNow;

    switch(localtion){
        case 'RETAILERS': 
            priceNow = consumerPrice;
            break;
        case 'WHOLESALERS': 
            priceNow = consumerPrice / ( 1.0 + gameParameters.pgen.retail_Markup);
            break;
        default:
            priceNow = consumerPrice / ( 1.0 + gameParameters.pgen.retail_Markup);
            priceNow = priceNow / (1.0 + gameParameters.pgen.wholesale_Markup)
            break;
    }
    
    return priceNow;
}

exports.calculateTotalVolume = function(currentDecision){
    var totalVolume = 0;
    currentDecision.d_BrandsDecisions.forEach(function(brandDecision){
        brandDecision.d_SKUsDecisions.forEach(function(SKUDecision){
            totalVolume += SKUDecision.d_ProductionVolume * consts.ActualSize[SKUDecision.d_PackSize];
        })
    })
    return totalVolume;
}

exports.calculateTechnology = function(SKUResult){
    if(SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_Technology;
    }else if(SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_Technology;
    }else if(SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_Technology;
    }else{
        return SKUResult.u_ps_FactoryStocks[0].s_Technology;
    }
}

exports.calculateIngredientsQuality = function(SKUResult){
    if(SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_RetailStocks[consts.StocksMaxTotal].s_IngredientsQuality;
    }else if(SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_WholesaleStocks[consts.StocksMaxTotal].s_IngredientsQuality;
    }else if(SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_ps_Volume > 0){
        return SKUResult.u_ps_FactoryStocks[consts.StocksMaxTotal].s_IngredientsQuality;
    }else{
        return SKUResult.u_ps_FactoryStocks[0].s_IngredientsQuality;
    }
}

exports.generateAcivateToken = function(email){
    return uuid.v4();
}

exports.sendActivateEmail = function(toEmail, activateToken){
    var body = "Please click this link, blablabla"
    var linkText =  config.host + 'activate?email=' + toEmail + '&token=' + activateToken;
    body += "<a href='" + linkText + "'>"+ linkText +"</a>";

    return sendMail(toEmail,'HCD activate email', body);
}

/**
 * @param {String} subject：发送的主题
 * @param {String} html：发送的 html 内容
 */
function sendMail(toEmail, subject, html) {
     var deferred = Q.defer();
    var smtpTransport = nodemailer.createTransport('SMTP', {
        host: config.mail.host,
        auth: {user: config.mail.user, pass: config.mail.password},
    });

    console.log(config.mail.host);
   
    var mailOptions = {
        from: [config.mail.name, config.mail.user].join(' '),
        to: toEmail,
        subject: subject,
        html: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve({message: 'Message sent: ' + response.message});
        }
        smtpTransport.close();
    });

    return deferred.promise;
};

exports.hashPassword = function(password){
    return bcrypt.hashSync(password);
};

exports.comparePassword = function(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
};





























