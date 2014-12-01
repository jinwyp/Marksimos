var faqModel = require('../models/faq.js');
var logger = require('../../common/logger.js');
var config = require('../../common/config.js');





var faq = [
    {
        'reportName' : 'FAQ',
        'language' : 'en_US',
        'categories' : [
            {
                "name" : "Production Capacity",
                "questions" :[{
                    "title" : "Can you improve Production Capacity according to your own requirement?",
                    "answer" : "No, you can't. If your company is exceeding the capacity utilization rate of 90% for consecutive 2 periods, the capacity will be automatically increased in the next period. Similarly, if the total output represents less than 60% of production capacity, it is automatically reduced in the next period."
                },{
                    "title" : "Once you increase Production Capacity, will the investment in Production Capacity be deducted from Total Initial Budget?",
                    "answer" : "No, it will not."
                },{
                    "title" : "What are the benefits from increasing Production Volume Flexibility?",
                    "answer" : "If the company has high level of Production Volume Flexibility, the production department will be able to adjust the production volume automatically within certain scale (no more than 30% of current production volume). In this case, if the market requirement is higher than the established production volume, production department is able to increase the volume to reduce the loss of out-of-stocks. On the other hand, if the market requirement is less than the established production volume, production department is able to reduce the volume in order to reduce the inventories."
                },{
                    "title" : "How to increase Production Volume Flexibility?",
                    "answer" : "Add certain amount to Investment in Production Efficiency and you will increase your Production Volume Flexibility. If you need to increase both Production Efficiency and Production Volume Flexibility, add both investments amount together and enter to Investment in Production Efficiency. Please keep in mind that the increase of Production Efficiency can indirectly help to lift up Production Volume Flexibility."
                },{
                    "title" : "What is the difference between Normal Capacity and Overtime Capacity?",
                    "answer" : "Overtime shifts allow extending production ability by at most 30%. The incremental volume is associated with additional costs which represent about 27% increase compared to the regular production cost. In Competitive Intelligence, all the capacities refer to Normal Capacity."
                },{
                    "title" : "Why you can't produce any product while the company's Normal Capacity is still remaining?",
                    "answer" : "Production Volume is affected by both Trade Expense and Wholesaler Bonus Rate indirectly and both of them have direct reaction with your remaining budgets. The higher Production Volume, the higher rate of Trade Expense and Wholesaler Bonus Rate will be. Your company will limit the Production Volume according to the remaining total budgets."
                }]
            },
            {
                "name" : "Technology",
                "questions" :[{
                    "title" : "Why the Technology Level does not increase in the next period when you have already invested in Applied Technology Level?",
                    "answer" : "All the amounts in the Investment in R&D are estimated investment budgets. Will the company reach the certain technology level also depends on other companies' investment amounts. In the same situation, it's much easier for the company to reach the higher technology level when their investment is higher than others."
                },{
                    "title" : "Why the 'Applied Technology Level' doesn't have any change in the Market Profiles after investing in processing technology?",
                    "answer" : "Please double check both distribution and manufacturer's inventories. The Applied Technology Level for SKU in Market Profiles refers to SKU's technology level of actual market sales products. If SKU's technology level in Market Profiles doesn't have any change after the investment, it means previous period inventories are still for sales in the market."
                },{
                    "title" : "Will the costs increase once you increase your Technology Level?",
                    "answer" : "Generally, the higher Technology Level will increase the production cost. When your cumulated production volume is very high with a certain Technology Level, the production cost will be reduced obviously by Production Efficiency. In some extreme situations, high investment in Technology Level also can lower the production costs comparing to applying lower Technology Level."
                }]
            },
            {
                "name" : "Pricing",
                "questions" :[{
                    "title" : "Why the decision interface shows 'Error / input value out of range' when you enter the same manufacture price comparing with the one in previous period?",
                    "answer" : "Please double check the production costs in current period. Production cost differs in each period. Generally, the higher accumulated production volume, the cheaper production costs are. Manufacturers enjoy relative flexibility in setting prices between 50% to 300% of product manufacturing cost price."
                },{
                    "title" : "What is Net Average Market Price?",
                    "answer" : "Net Average Market Price is also called 'Actual Market Sales Price' which refers to actual retail sales price after deducting all the discounts. If retailer sells different batches of SKUs, Net Average Market Price will average the actual sales price for all different batches of inventories."
                },{
                    "title" : "Why the Retailer Displayed Price is different from the Manufacturer Suggested Price?",
                    "answer" : "First, please double check the package size. Manufacturer sets the price according to the SKUs' actual package sizes. Retailer sets the price according to the SKUs' standard package sizes. Second, some deviations between +5% are commonly observed by retailer, and in some extreme situation +15% is also possible. Third, if the retailer cells different batches products, the displayed price is the actual sales price."
                },{
                    "title" : "What is Price Ranking Index (P.R.I.)?",
                    "answer" : "P.I.R. reflects the relative price of a certain SKU in the sales market. The higher the index, the higher the price will be, vice versa. Detail algorithm: all the on-sales SKUs in the marketing are ordered by retail price (net price after promotion) from high to low. The price rank indexes of the first and second SKU are 100, the price rank index of the last SKU is 10 and the others are converted according to the proportion. That is the price rank index of SKU."
                },{
                    "title" : "Why Net Average Market Price is different from Average Displayed Price?",
                    "answer" : "There are 2 possible reasons. First, Net Average Market Price is calculated by SKU's actual package size, and Average Market Displayed Price is calculated by standard package size. Second, Net Average Market Price is net price before promotion, and Average Market Displayed Price is net price after promotion."
                }]
            },
            {
                "name" : "Product",
                "questions" :[{
                    "title" : "Can you change the package sizes for current SKUs?",
                    "answer" : "No, you can't. The package size for a specific SKU can only be set at the launch moment."
                },{
                    "title" : "What is the relationship between package size and target segment of SKU?",
                    "answer" : "Package size has no direct relationship with target segment of SKU. With the same package size, the consumers will have higher value perception when the prices are lower."
                },{
                    "title" : "Will the SKU stop for sales immediately after choosing 'Discontinue'?",
                    "answer" : "No, it won't. If 'YES' is entered, the corresponding SKU is discontinued at the end of period."
                }]
            },
            {
                "name" : "Budget",
                "questions" :[{
                    "title" : "Why you can't make any investment while the 'Available Budget' bar shows still having remaining budget?",
                    "answer" : "Please check the 'Spending Information' on the left side of decision interface and all budget spending information is refer to the 'Available Budget'."
                },{
                    "title" : "Why the 'Available Budget' bar doesn't change after reducing the investment amounts?",
                    "answer" : "In this situation please close the software and reopen it to refresh the database."
                },{
                    "title" : "Will the profit your company has made increase the T.I.B. at the end of each period",
                    "answer" : "No, it won't. The total investment budget is all the same for each company. The profit you have made in each period will be accumulated but will not increase the total investment budget."
                },{
                    "title" : "Why the budget at the end of previous period is different from the one at the beginning of current period?",
                    "answer" : "The A.I.B is an estimated amount for each period. The actual expense at the end of the period is also affected by: - Actual Wholesale Bonus=actual wholesaler's orders × wholesale bonus rate - Actual Retail Bonus=actual market sales volume × additional trade margin Additionally, remaining budget will be adjusted by inflation rate at the end of each period."
                },{
                    "title" : "Why is the budget increased at the beginning of current period and it shows 'unavailable' at the end of the last period?",
                    "answer" : "The 'Available Budget' bar shows the estimated available amounts and the remaining budget is affected by actual wholesale orders and actual market sales volume. If sales decrease, the amounts for Trade Expense or Promotions will be decreased as well. In this situation, the remaining budgets will be increased compared to the last period."
                }]
            },
            {
                "name" : "Sales",
                "questions" :[{
                    "title" : "What is the difference between Numerical Distribution and Volume-weighted Distribution?",
                    "answer" : "Numerical Distribution is percentage of covered outlets of total retail outlets in the whole market. Volume-weighted Distribution is the sales value percentage of covered outlets of total market share."
                },{
                    "title" : "Why sales volume is different in 'Financial Reports' and 'Market Profiles'?",
                    "answer" : "The sales volume in 'Financial Reports' is also called 'first sales' which refers to manufacturer's total sales value. The sales volume in 'Market Profiles' is also called 'secondary sales' which refers to the actual market sales value. First sales=manufacturer price/per SKU×total manufacturer sales volume .Secondary sales=average displayed price/per SKU×actual total market sales volume."
                },{
                    "title" : "Will the market size be changed during the simulation?",
                    "answer" : "You can check each consumer segment's sales volume and value from the 'Market Evolution' in the software's main interface. All the consumer segment size will be increased or decreased by the decision you make."
                }]
            },
            {
                "name" : "Trade",
                "questions" :[{
                    "title" : "What does Promotion specific refer to?",
                    "answer" : "Promotion in MarkSimos only refers to retail price reduction. All effects are showed on the actual retail sales price."
                },{
                    "title" : "What does Trade Expense refer to? What's the difference between Trade Expense and Additional Trade Margin?",
                    "answer" : "Trade Expense covers costs of better display, in-store communication, product sampling, information booths, etc. Additional Trade Margin helps to incentivize the retails not only to allocate larger shelf space   but also to increase volume orders. Trade Expense refers to certain amount fees which retail will spend on better displaying and acquiring more shelf space. Additional Trade Margin is the extra cash profit for retailer. It helps to incentivise retail to increase volume orders. Eg: SKU's actual retail sales price is 10RMB, margin rate is 10%, and actual sales volume is 100 million. Total margin=10×10%×1000000=100mln RMB."
                }]
            },
            {
                "name" : "Inventory",
                "questions" :[{
                    "title" : "Does the 'Inventory Report' on the main screen include the distribution inventories?",
                    "answer" : "Yes. Inventory Report shows all the SKUs' inventory information which includes manufacturer's inventory, wholesaler's inventory and retail's inventory."
                }]
            }
        ]

    },
    {
        'reportName' : 'FAQ',
        'language' : 'zh_CN',
        'categories' : [
            {
                "name" : "生产能力",
                "questions" :[
                    {
                        "title" : "产能可以根据需要调整么?",
                        answer : "不能. 但是如果公司在过去连续两个阶段的产能利用率高于90%，公司会自动调高下阶段的产能。反之,如果在过去连续两个阶段的产能利用率低于60%, 公司会自动调低下阶段的产能。"
                    },
                    {
                        "title" : "提高产能会占用总投资预算么",
                        answer : "不会。增加产能的成本不会占用总投资预算。"
                    },
                    {
                        "title" : "提高生产灵活性有什么好处",
                        answer : "如果公司拥有较高的生产灵活性，生产部门有能力在一定范围内自动调整产量（最多不超过目前产量的30%），以应对市场需求的变化。这样一来，如果市场需求比既定产量高，生产部门能及时增加生产，减少缺货；如果市场需求比既定产量低，生产部门能及时减少生产，减少库存。"
                    },
                    {
                        "title" : "如何增加生产灵活性？",
                        answer : "在“生产效率的投资”这一栏填写你计划投入的金额，可以增加生产灵活性。如果你同时需要提高生产效率和生产灵活性，在提高相同幅度的前提下，选择金额大的数字填入“生产效率的投资”一栏。说明：生产效率的提升会间接提升生产灵活性。"
                    },
                    {
                        "title" : "可用产能和额外加班产能，有什么区别？",
                        answer : "可用产能指公司的正常产能；额外加班产能是指通过加班而获得的产能，生产成本是正常成本的1.27 倍。“竞争情报”中各公司的产能指“正常产能”。"
                    },
                    {
                        "title" : "为什么明明公司还有剩余产能，却不能生产？",
                        answer : "产量间接受额外零售终端让利和经销商进货折扣两项制约，这两项和你的剩余预算有直接关系。产量越高，预计的终端让利金额和经销商折扣越大。公司会根据剩余预算总额限制你的产量。"
                    }]
            },
            {
                "name" : "技术",
                "questions" :[
                    {
                        "title" : "为什么投资了生产技术水平，下阶段技术水平却没有增长？",
                        answer : "研发投资中的提示信息为预计投资额，能否实现技术水平的增长取决于其他公司的投资情况。在社会总资源有限的情况下，投资额高的公司更容易获得成功。"
                    },
                    {
                        "title" : "为什么明明调整了生产技术水平，“信息汇总”里显示的“应用的技术水平”却没有变化？",
                        answer : "请查看渠道库存和工厂库存。信息汇总里单品所使用的技术水平指在市场中实际所销售产品的技术水平。如果生产技术调整了，市场报告里的技术水平却没有变化，说明市场上仍在销售前期库存产品。"
                    },
                    {
                        "title" : "生产技术调高了，成本一定会提高么？",
                        answer : "一般来说所使用的生产技术水平越高，生产成本就越高。但是，如果在某个技术水平上累积的产量比较高，规模效率会明显低成本，甚至低于采用较低技术水平生产的产品成本。"
                    }]
            },
            {
                "name" : "定价",
                "questions" :[
                    {
                        "title" : "为什么现阶段的出厂价和上阶段一致，提示信息却显示“错误、超过输入范围”？",
                        "answer" : "请检查产品的现阶段生产成本。每个阶段的生产成本会有差异，一般来说，累积的产量越高，生产成本越低。出厂价以当阶段生产成本为依据，是当阶段生产成本的50%到300%。"
                    },
                    {
                        "title" : "什么是平均净市场价？",
                        "answer" : "平均净市场价，又称“实际客户成交价”。由于有可能存在促销活动, 消费者实际支付价格可能低于陈列价，净市场价是包含促销因素后的消费者实际支付价格，平均净市场价是把当阶段实际销售商品的价格进行平均后所得。"
                    },
                    {
                        "title" : "为什么市场陈列价和公司建议零售价不一致？",
                        "answer" : "请首先确认包装规格：工厂定价以实际包装规格计价，终端陈列价一律折算成标准包装计价。其次，零售商可以在建议零售价的正负5% ~ 15%的范围内随机调整零售价。第三，零售商可能会进不同批次的商品, 平均陈列价是把零售商所持有的不同批次商品的价格进行平均后所获得。"
                    },
                    {
                        "title" : "什么是价格排序指数？",
                        "answer" : "价格排序指数反映在市场上所有销售产品中某单品的相对价格高低。指数越高，价格越贵，反之越便宜。具体计算方法如下：把市场上所有在售单品的实际零售价（扣除促销因素后的净价）从高到低排序，排在第一和第二位的单品的价格指数设为100, 排在最低的价格指数设为10, 其他商品价格相对于最高、最低价折算后的结果，就是该单品的价格排序指数。"
                    },
                    {
                        "title" : "为什么平均净市场价和平均陈列价不一样？",
                        "answer" : "平均净市场价包含了促销因素，是消费者实际支付价格；而平均陈列价零售商所持有的不同批次商品的价格进行平均后所获得。"
                    }]
            },
            {
                "name" : "产品",
                "questions" :[
                    {
                        "title" : "现有产品的包装规格可以调整么？",
                        "answer" : "不可以。只有新推出的产品才能选择所需的包装规格，产品一旦推出，包装规格不可再做调整。"
                    },
                    {
                        "title" : "包装规格和产品定位有什么关系？",
                        "answer" : "包装规格和产品定位没有直接关系。如果包装规格相同，定价越低，消费者感知的价值越高。"
                    },
                    {
                        "title" : "选择停产后，产品会立刻停止销售么？",
                        "answer" : "不会。选择停产后，产品在该阶段仍可以销售，直到该阶段结束。"
                    }]
            },
            {
                "name" : "财政预算案",
                "questions" :[
                    {
                        "title" : "为什么预算状态条显示还有预算，却无法增加投资额？",
                        "answer" : "请检查“预算使用信息”，以预算使用信息表内的“预计剩余预算”为准。"
                    },
                    {
                        "title" : "为什么明明减少了投资预算，预算状态条和“预计剩余预算”一栏却没有变化？",
                        "answer" : "请关闭所有窗口，重新打开，即可获得更新后的剩余预算。"
                    },
                    {
                        "title" : "如果公司赢利，赢利部分会增加总投资预算吗？",
                        "answer" : "不能。每家公司的总投资预算都一样，赢利部分不能增加既定的总投资预算，但是会增加公司的累计赢利。"
                    },
                    {
                        "title" : "为什么上阶段预算和本阶段的实际报告有出入？",
                        "answer" : "每阶段输入的预算为预计费用，阶段末的实际费用支出受以下因素影响：1	经销商实际进货量 X 经销商进货折扣率=给经销商的实际让利 2 零售商实际销售量 X 额外的零售终端让利 = 给零售商的实际让利, 另外剩余预算会根据每阶段的通货膨胀率按比例调整。"
                    },
                    {
                        "title" : "为什么预算状态条显示预算基本用完，下阶段打开决策时却显示预算增加了？",
                        "answer" : "预算状态条显示的是预计预算，在阶段末受经销商实际进货量、零售商的实际销量影响。如果销量下降，所需支付的额外零售终端让利或促销费用会相应减少，因此阶段末剩余预算和阶段初显示预算相比有变化。"
                    }]
            },
            {
                "name" : "销售",
                "questions" :[
                    {
                        "title" : "加权分销和数值分销的区别是什么？",
                        "answer" : "数值分销，又称“铺货率”，是用覆盖的终端数量除以市场总的终端数量得出的结果。加权分销，是用所覆盖终端的销售额除以市场总销售额得出的结果，反映分销效率。"
                    },
                    {
                        "title" : "为什么“公司财务报告”里的销售额和“信息汇总”里的市场销售额不一致？",
                        "answer" : "“公司财务报告”里的销售额指生产商的出货金额，也称作“一级销售”；而“信息汇总”里的市场销售额是单品在市场中的实际销售出去的金额，又称作“二级销售”。前者以出厂价乘以出厂数量；后者以实际销售量乘以平均陈列价。"
                    },
                    {
                        "title" : "细分市场的规模会变化么？",
                        "answer" : "“细分市场数据”里可以查阅每个细分市场的总销量和总销售额。细分市场的规模受各组决策的影响，在市场共同作用下增长或萎缩。"
                    }]
            },
            {
                "name" : "贸易",
                "questions" :[
                    {
                        "title" : "促销具体指什么？",
                        "answer" : "“营销在线”中的促销仅指针对终端消费者的价格促销，直接体现在实际终端零售价。"
                    },
                    {
                        "title" : "零售终端费用具体指什么？和零售终端让利有什么区别？",
                        "answer" : "零售终端费用有助于生产商在零售终端获得更好的货架支持和陈列等。零售终端让利是生产商为激励零售商而支付的返利支持。前者是给零售商的费用，零售商会把该费用用于更好陈列你的产品，有助于获得更多货架空间；后者是生产商给零售商的直接现金让利，有助于推动零售商更好销售你的产品。举例：假设某单品的市场零售价为10 元，生产商制订的零售终端让利为10%，当期市场销量为100 万件，实际零售终端让利额为10 元* 10% * 100 万件=100 万元"
                    }]
            },
            {
                "name" : "库存",
                "questions" :[
                    {
                        "title" : "主界面的“库存报告”，包括渠道库存吗？",
                        "answer" : "是。库存报告显示的单品库存信息包括工厂库存、经销商库存和零售商库存。"
                    }]
            }
        ]

    }
];




exports.initFAQ = function(req,res,next){

    faqModel.remove({reportName: 'FAQ'})
        .then(function(){
            return faqModel.insert(faq[0]).then(function(result){
                if(!result){
                    return res.send(500, {message: "save english faq to db failed."});
                }else{
                    return faqModel.insert(faq[1]);
                }
        })
        .then(function(result){
            if(!result){
                return res.send(500, {message: "save chinese faq to db failed."});
            }else{
                res.send(200, {message: "save faq success"})
            }
        })
        .fail(function(err){
            logger.error(err);
            res.send(500, {message: "save faq failed."})
        })
        .done();
    });

};



exports.getFAQ = function(req,res,next){

    faqModel.findByReportName('FAQ').then(function(result){
		if(result.length > 0){
    		return res.send(result);

    	}else{
            return res.send(500, {message: "not found faq."});
    	}
	})
	.fail(function(err){
        logger.error(err);
        res.send(500, {message: "find faqs failed."})
    })
    .done();
};

