var faqModel = require('../models/faq.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');

exports.addFAQ =function(req,res,next){
	var faq=[{
            "category" : "FAQPageProductionCapacity",
            "questions" :[
                {
                	"title" : "1. Can you improve Production Capacity according to your own requirement?",
                	"answer" : "No, you can't. If your company is exceeding the capacity utilization rate of 90% for consecutive 2 periods, the capacity will be automatically increased in the next period. Similarly, if the total output represents less than 60% of production capacity, it is automatically reduced in the next period."
                },
                {
                	"title" : "2. Once you increase Production Capacity, will the investment in Production Capacity be deducted from Total Initial Budget?",
                	"answer" : "No, it will not."
                },
                {
                	"title" : "3. What are the benefits from increasing Production Volume Flexibility?",
                	"answer" : "If the company has high level of Production Volume Flexibility, the production department will be able to adjust the production volume automatically within certain scale (no more than 30% of current production volume). In this case, if the market requirement is higher than the established production volume, production department is able to increase the volume to reduce the loss of out-of-stocks. On the other hand, if the market requirement is less than the established production volume, production department is able to reduce the volume in order to reduce the inventories."
                },
                {
                	"title" : "4. How to increase Production Volume Flexibility?",
                	"answer" : "Add certain amount to Investment in Production Efficiency and you will increase your Production Volume Flexibility. If you need to increase both Production Efficiency and Production Volume Flexibility, add both investments amount together and enter to Investment in Production Efficiency. Please keep in mind that the increase of Production Efficiency can indirectly help to lift up Production Volume Flexibility."
                },
                {
                	"title" : "5. What is the difference between Normal Capacity and Overtime Capacity?",
                	"answer" : "Overtime shifts allow extending production ability by at most 30%. The incremental volume is associated with additional costs which represent about 27% increase compared to the regular production cost. In Competitive Intelligence, all the capacities refer to Normal Capacity."
                },
                {
                	"title" : "6. Why you can't produce any product while the company's Normal Capacity is still remaining?",
                	"answer" : "Production Volume is affected by both Trade Expense and Wholesaler Bonus Rate indirectly and both of them have direct reaction with your remaining budgets. The higher Production Volume, the higher rate of Trade Expense and Wholesaler Bonus Rate will be. Your company will limit the Production Volume according to the remaining total budgets."
                }       
            ]
    },{
        "category" : "FAQPageTechnology",
        "questions" :[
            {
            	"title" : "1. Why the Technology Level does not increase in the next period when you have already invested in Applied Technology Level?",
            	"answer" : "All the amounts in the Investment in R&D are estimated investment budgets. Will the company reach the certain technology level also depends on other companies' investment amounts. In the same situation, it's much easier for the company to reach the higher technology level when their investment is higher than others."
            },
            {
            	"title" : "2. Why the 'Applied Technology Level' doesn't have any change in the Market Profiles after investing in processing technology?",
            	"answer" : "Please double check both distribution and manufacturer's inventories. The Applied Technology Level for SKU in Market Profiles refers to SKU's technology level of actual market sales products. If SKU's technology level in Market Profiles doesn't have any change after the investment, it means previous period inventories are still for sales in the market."
            },
            {
            	"title" : "3. Will the costs increase once you increase your Technology Level?",
            	"answer" : "Generally, the higher Technology Level will increase the production cost. When your cumulated production volume is very high with a certain Technology Level, the production cost will be reduced obviously by Production Efficiency. In some extreme situations, high investment in Technology Level also can lower the production costs comparing to applying lower Technology Level."
            }
        ]
    },{
        "category" : "FAQPagePricing",
        "questions" :[
            {
            	"title" : "1. Why the decision interface shows 'Error / input value out of range' when you enter the same manufacture price comparing with the one in previous period?",
            	"answer" : "Please double check the production costs in current period. Production cost differs in each period. Generally, the higher accumulated production volume, the cheaper production costs are. Manufacturers enjoy relative flexibility in setting prices between 50% to 300% of product manufacturing cost price."
            },
            {
            	"title" : "2. What is Net Average Market Price?",
            	"answer" : "Net Average Market Price is also called 'Actual Market Sales Price' which refers to actual retail sales price after deducting all the discounts. If retailer sells different batches of SKUs, Net Average Market Price will average the actual sales price for all different batches of inventories."
            },
            {
            	"title" : "3. Why the Retailer Displayed Price is different from the Manufacturer Suggested Price?",
            	"answer" : "First, please double check the package size. Manufacturer sets the price according to the SKUs' actual package sizes. Retailer sets the price according to the SKUs' standard package sizes. Second, some deviations between +5% are commonly observed by retailer, and in some extreme situation +15% is also possible. Third, if the retailer cells different batches products, the displayed price is the actual sales price."
            },
            {
            	"title" : "4. What is Price Ranking Index (P.R.I.)?",
            	"answer" : "P.I.R. reflects the relative price of a certain SKU in the sales market. The higher the index, the higher the price will be, vice versa. Detail algorithm: all the on-sales SKUs in the marketing are ordered by retail price (net price after promotion) from high to low. The price rank indexes of the first and second SKU are 100, the price rank index of the last SKU is 10 and the others are converted according to the proportion. That is the price rank index of SKU."
            },
            {
            	"title" : "5. Why Net Average Market Price is different from Average Displayed Price?",
            	"answer" : "There are 2 possible reasons. First, Net Average Market Price is calculated by SKU's actual package size, and Average Market Displayed Price is calculated by standard package size. Second, Net Average Market Price is net price before promotion, and Average Market Displayed Price is net price after promotion."
            }
        ]
    },{
        "category" : "FAQPageProduct",
        "questions" :[
            {
            	"title" : "1. Can you change the package sizes for current SKUs?",
            	"answer" : "No, you can't. The package size for a specific SKU can only be set at the launch moment."
            },
            {
            	"title" : "2. What is the relationship between package size and target segment of SKU?",
            	"answer" : "Package size has no direct relationship with target segment of SKU. With the same package size, the consumers will have higher value perception when the prices are lower."
            },
            {
            	"title" : "3. Will the SKU stop for sales immediately after choosing 'Discontinue'?",
            	"answer" : "No, it won't. If 'YES' is entered, the corresponding SKU is discontinued at the end of period."
            }
        ]
    },{
        "category" : "FAQPageBudget",
        "questions" :[
            {
            	"title" : "1. Why you can't make any investment while the 'Available Budget' bar shows still having remaining budget?",
            	"answer" : "Please check the 'Spending Information' on the left side of decision interface and all budget spending information is refer to the 'Available Budget'."
            },
            {
            	"title" : "2. Why the 'Available Budget' bar doesn't change after reducing the investment amounts?",
            	"answer" : "In this situation please close the software and reopen it to refresh the database."
            },
            {
            	"title" : "3. Will the profit your company has made increase the T.I.B. at the end of each period",
            	"answer" : "No, it won't. The total investment budget is all the same for each company. The profit you have made in each period will be accumulated but will not increase the total investment budget."
            },
            {
            	"title" : "4. Why the budget at the end of previous period is different from the one at the beginning of current period?",
            	"answer" : "The A.I.B is an estimated amount for each period. The actual expense at the end of the period is also affected by: - Actual Wholesale Bonus=actual wholesaler's orders × wholesale bonus rate - Actual Retail Bonus=actual market sales volume × additional trade margin Additionally, remaining budget will be adjusted by inflation rate at the end of each period."
            },
            {
            	"title" : "5. Why is the budget increased at the beginning of current period and it shows 'unavailable' at the end of the last period?",
            	"answer" : "The 'Available Budget' bar shows the estimated available amounts and the remaining budget is affected by actual wholesale orders and actual market sales volume. If sales decrease, the amounts for Trade Expense or Promotions will be decreased as well. In this situation, the remaining budgets will be increased compared to the last period."
            }
        ]
    },{
        "category" : "FAQPageSales",
        "questions" :[
            {
            	"title" : "1. What is the difference between Numerical Distribution and Volume-weighted Distribution?",
            	"answer" : "Numerical Distribution is percentage of covered outlets of total retail outlets in the whole market. Volume-weighted Distribution is the sales value percentage of covered outlets of total market share."
            },
            {
            	"title" : "2. Why sales volume is different in 'Financial Reports' and 'Market Profiles'?",
            	"answer" : "The sales volume in 'Financial Reports' is also called 'first sales' which refers to manufacturer's total sales value. The sales volume in 'Market Profiles' is also called 'secondary sales' which refers to the actual market sales value. First sales=manufacturer price/per SKU×total manufacturer sales volume .Secondary sales=average displayed price/per SKU×actual total market sales volume."
            },
            {
            	"title" : "3. Will the market size be changed during the simulation?",
            	"answer" : "You can check each consumer segment's sales volume and value from the 'Market Evolution' in the software's main interface. All the consumer segment size will be increased or decreased by the decision you make."
            }
        ]
    },{
        "category" : "FAQPageTrade",
        "questions" :[
            {
            	"title" : "1. What does Promotion specific refer to?",
            	"answer" : "Promotion in MarkSimos only refers to retail price reduction. All effects are showed on the actual retail sales price."
            },
            {
            	"title" : "2. What does Trade Expense refer to? What's the difference between Trade Expense and Additional Trade Margin?",
            	"answer" : "Trade Expense covers costs of better display, in-store communication, product sampling, information booths, etc. Additional Trade Margin helps to incentivize the retails not only to allocate larger shelf space   but also to increase volume orders. Trade Expense refers to certain amount fees which retail will spend on better displaying and acquiring more shelf space. Additional Trade Margin is the extra cash profit for retailer. It helps to incentivise retail to increase volume orders. Eg: SKU's actual retail sales price is 10RMB, margin rate is 10%, and actual sales volume is 100 million. Total margin=10×10%×1000000=100mln RMB."
            }
        ]
    },{
        "category" : "FAQPageInventory",
        "questions" :[
            {
            	"title" : "1. Does the 'Inventory Report' on the main screen include the distribution inventories?",
            	"answer" : "Yes. Inventory Report shows all the SKUs' inventory information which includes manufacturer's inventory, wholesaler's inventory and retail's inventory."
            }
        ]
    }];
	faqModel.addOne(faq)
	.then(function(result){
		if(result){
    		return res.send(result);
            return 
    	}else{
    		throw new Error('Add faq failed.');
    	}
	})
	.fail(function(err){
        if(err.httpStatus){
            return res.send(err.httpStatus, {message: err.message});
        }
        res.send(500, {message: "add faq failed."})
    })
    .done();

}

exports.getFAQ = function(req,res,next){
	faqModel.find()
	.then(function(results){
		if(results){
    		return res.send(results);
    	}else{
    		throw new Error('find faqs failed.');
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

