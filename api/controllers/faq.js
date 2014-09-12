var faqModel = require('../models/faq.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');

exports.getFAQ = function(req,res,next){
	
    var faq={
        'reportName':'FAQ',
        'categories':[{
            "categoryName" : "FAQPageProductionCapacity",
            "questions" :[{
                'title':'FAQPageProductionCapacityQ1Title',
                'answer':'FAQPageProductionCapacityQ1Answer'
            },{
                'title':'FAQPageProductionCapacityQ2Title',
                'answer':'FAQPageProductionCapacityQ2Answer'
            },{
                'title':'FAQPageProductionCapacityQ3Title',
                'answer':'FAQPageProductionCapacityQ3Answer'
            },{
                'title':'FAQPageProductionCapacityQ4Title',
                'answer':'FAQPageProductionCapacityQ4Answer'
            },{
                'title':'FAQPageProductionCapacityQ5Title',
                'answer':'FAQPageProductionCapacityQ5Answer'
            },{
                'title':'FAQPageProductionCapacityQ6Title',
                'answer':'FAQPageProductionCapacityQ6Answer'
            }]
        },{
            "categoryName" : "FAQPageTechnology",
            "questions" :[{
                'title':'FAQPageTechnologyQ1Title',
                'answer':'FAQPageTechnologyQ1Answer'
            },{
                'title':'FAQPageTechnologyQ2Title',
                'answer':'FAQPageTechnologyQ2Answer'
            },{
                'title':'FAQPageTechnologyQ3Title',
                'answer':'FAQPageTechnologyQ3Answer'
            }]
        },{
            "categoryName" : "FAQPagePricing",
            "questions" :[{
                'title':'FAQPagePricingQ1Title',
                'answer':'FAQPagePricingQ1Answer'
            },{
                'title':'FAQPagePricingQ2Title',
                'answer':'FAQPagePricingQ2Answer'
            },{
                'title':'FAQPagePricingQ3Title',
                'answer':'FAQPagePricingQ3Answer'
            },{
                'title':'FAQPagePricingQ4Title',
                'answer':'FAQPagePricingQ4Answer'
            },{
                'title':'FAQPagePricingQ5Title',
                'answer':'FAQPagePricingQ5Answer'
            }]
        },{
            "categoryName" : "FAQPageProduct",
            "questions" :[{
                'title':'FAQPageProductQ1Title',
                'answer':'FAQPageProductQ1Answer'
            },{
                'title':'FAQPageProductQ2Title',
                'answer':'FAQPageProductQ2Answer'
            },{
                'title':'FAQPageProductQ3Title',
                'answer':'FAQPageProductQ3Answer'
            }]
        },{
            "categoryName" : "FAQPageBudget",
            "questions" :[{
                'title':'FAQPageBudgetQ1Title',
                'answer':'FAQPageBudgetQ1Answer'
            },{
                'title':'FAQPageBudgetQ2Title',
                'answer':'FAQPageBudgetQ2Answer'
            },{
                'title':'FAQPageBudgetQ3Title',
                'answer':'FAQPageBudgetQ3Answer'
            },{
                'title':'FAQPageBudgetQ4Title',
                'answer':'FAQPageBudgetQ4Answer'
            },{
                'title':'FAQPageBudgetQ5Title',
                'answer':'FAQPageBudgetQ5Answer'
            }]
        },{
            "categoryName" : "FAQPageSales",
            "questions" :[{
                'title':'FAQPageSalesQ1Title',
                'answer':'FAQPageSalesQ1Answer'
            },{
                'title':'FAQPageSalesQ2Title',
                'answer':'FAQPageSalesQ2Answer'
            },{
                'title':'FAQPageSalesQ3Title',
                'answer':'FAQPageSalesQ3Answer'
            }]
        },{
            "categoryName" : "FAQPageTrade",
            "questions" :[{
                'title':'FAQPageTradeQ1Title',
                'answer':'FAQPageTradeQ1Answer'
            },{
                'title':'FAQPageTradeQ2Title',
                'answer':'FAQPageTradeQ2Answer'
            }]
        },{
            "categoryName" : "FAQPageInventory",
            "questions" :[{
                'title':'FAQPageInventoryQ1Title',
                'answer':'FAQPageInventoryQ1Answer'
            }]
        }]
    }

    faqModel.findOne('FAQ')
	.then(function(result){
		if(result){
    		return res.send(result);
    	}else{
            return faqModel.insert(faq).then(function(result){
                if(!result){
                    throw {message: "failed to save faq to db."}  
                }
                res.send(result);
            })
    	}
	})
	.fail(function(err){
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: "find faqs failed."})
    })
    .done();
}

