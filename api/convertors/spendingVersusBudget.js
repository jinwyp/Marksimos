
/**
 * @param {Object} allDecisions all decisions for all the companies
 */
exports.getAllSpendingVersusBudget = function(seminarId, allDecisions){
    var allSpendingVersusBudget = [];
    for(var i=0; i<allDecisions.length; i++){
        var decision = allDecisions[i];
        var spendingVersusBudgetForOneCompany = getSpendingVersusBudgetForOneCompany(seminarId, decision)
        allSpendingVersusBudget.push({
            companyId: decision.d_CID,
            spendingVersusBudget: spendingVersusBudgetForOneCompany
        });
    }
    return allSpendingVersusBudget;
}

function getSpendingVersusBudgetForOneCompany(seminarId, decision){
    var brandData = [];
    var companyData = {}

    for(var i=0; i<decision.d_BrandsDecisions.length; i++){
        var brandDecision = decision.d_BrandsDecisions[i];
        var brandDataRow = {};
        brandDataRow.brandName = brandDecision.d_BrandName;
        brandDataRow.salesForce = brandDecision.d_SalesForce;
        brandDataRow.consumerCommunication = 0;
        brandDataRow.consumerPromotion = 0;
        brandDataRow.tradeExpenses = 0;
        brandDataRow.estimatedAdditionalTradeMarginCost =0;
        brandDataRow.estimatedWholesaleBonusCost = 0;

        for(var j=0; j<brandDecision.d_SKUsDecisions.length; j++){
            var SKUDecision = brandDecision.d_SKUsDecisions[j];
            brandDataRow.consumerCommunication += parseInt(brandDecision.d_Advertising);
            brandDataRow.consumerPromotion += brandDecision.d_PromotionalBudget;
            brandDataRow.tradeExpenses += brandDecision.d_TradeExpenses;
            brandDataRow.estimatedAdditionalTradeMarginCost += brandDecision.d_AdditionalTradeMargin;
            brandDataRow.estimatedWholesaleBonusCost += brandDecision.d_WholesalesBonusRate;
        }
        brandData.push(brandDataRow);
    }

    return {
        brandData: brandData,
        companyData: companyData
    };
}