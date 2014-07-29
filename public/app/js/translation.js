/**
 * Created by jinwyp on 7/8/14.
 */

var app = angular.module('marksimos.translation', []);


app.config(['$translateProvider', function($translateProvider){

// Adding a translation table for the English language
    $translateProvider.translations('en_US', {
		
		//Labels for reports menu
        "ReportMenuCompanyStatus"     : "Company Status",
        "ReportMenuFinancialReport"    :  "Financial Report",
        "ReportMenuInventoryReport"    :  "Inventory Report",
        "ReportMenuProfitabilityEvolution"    :  "Profitability Evolution",
        "ReportMenuMarketShare"    :  "Market Share",
        "ReportMenuCompetitorIntelligence"    :  "Competitor Intelligence",
        "ReportMenuInvestmentProfits"    :  "Investment & Profits",
        "ReportMenuMarketSalesInventory"    :  "Market Sales & Inventory",
        "ReportMenuSegmentLeaderTop5"    :  "Segment Leader Top5",
        "ReportMenuPerceptionMap"    :  "Perception Map",
        "ReportMenuSegmentDistributions"    :  "Segment Distributions",
        "ReportMenuMarketEvolution"    :  "Market Evolution",
        "ReportMenuMarketTrends"    :  "Market Trends",
        "ReportMenuMarketIndicator"    :  "Market Indicator"

		//Labels for Company Status Report - SKU Level
		"ReportCompanyStatusSKUMarketShare(value%)"	:	"Market Share (value %)"
		"ReportCompanyStatusSKUMarketShare(volume%)"	:	"Market Share (volume %)"
		"ReportCompanyStatusSKUMarketSalesVolume(mlnstd.packs)"	:	"Market Sales Volume (mln std. packs)"		
		"ReportCompanyStatusSKULostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std. packs)"
		"ReportCompanyStatusSKUNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportCompanyStatusSKUVolume-weightedDistribution (%)"	:	"Volume-weighted Distribution (%)"
		"ReportCompanyStatusSKUShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportCompanyStatusSKUAwareness(%)"	:	"Awareness (%)"
		"ReportCompanyStatusSKUAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std. pack)"
		"ReportCompanyStatusSKUAverageDisplayPrice($/std.pack)"	:	"Average Display Price ($/std. pack)"
		"ReportCompanyStatusSKUPriceRankingIndex"	:	"Price Ranking Index"
		"ReportCompanyStatusSKUTargetConsumer Segment"	:	"Target Consumer Segment"
		"ReportCompanyStatusSKUTargetConsumerSegmentExpectedValuePerception"	:	"Target Consumer Segment Expected Value Perception"
		"ReportCompanyStatusSKUValuePerception"	:	"Value Perception"
		"ReportCompanyStatusSKUTargetConsumerSegmentExpectedImagePerception"	:	"Target Consumer Segment Expected Image Perception"
		"ReportCompanyStatusSKUImagePerception"	:	"Image Perception"
		"ReportCompanyStatusSKUIngredientsQualityIndex"	:	"Ingredients Quality Index"
		"ReportCompanyStatusSKUAppliedTechnologyIndex"	:	"Applied Technology Index"
		"ReportCompanyStatusSKUMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportCompanyStatusSKUConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportCompanyStatusSKUMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportCompanyStatusSKULostSalesVolumeduetoOOS(mlnpacks)"	:	"Lost Sales Volume due to OOS (mln packs)"
		"ReportCompanyStatusSKUNumberofOut-of-stockEpisodes"	:	"Number of Out-of-stock Episodes"
		"ReportCompanyStatusSKUMarketSalesVolume(mln packs)"	:	"Market Sales Volume (mln packs)"
		"ReportCompanyStatusSKURetailersPurchasesVolume(mln packs)"	:	"Retailers Purchases Volume (mln packs)"
		"ReportCompanyStatusSKUShipmentstoWholesalers(mln packs)"	:	"Shipments to Wholesalers (mln packs)"
		"ReportCompanyStatusSKUProductionVolume(mln packs)"	:	"Production Volume (mln packs)"
		"ReportCompanyStatusSKUInventoryVolumeAtManufacturer(mln packs)"	:	"Inventory Volume At Manufacturer (mln packs)"
		"ReportCompanyStatusSKUInventoryVolumeAtWholesalers(mln packs)"	:	"Inventory Volume At Wholesalers (mln packs)"
		"ReportCompanyStatusSKUInventoryVolumeAtRetailers(mln packs)"	:	"Inventory Volume At Retailers (mln packs)"
		"ReportCompanyStatusSKUStocksCoverAtRetailers(weeks)"	:	"Stocks Cover At Retailers (weeks)"
		"ReportCompanyStatusSKUStocksCoverAtWholesalers(weeks)"	:	"Stocks Cover At Wholesalers (weeks)"
		
		
		//Labels for Company Status Report - Brand Level
		"ReportCompanyStatusBrandMarketShare(value%)"	:	"Market Share (value %)"
		"ReportCompanyStatusBrandMarketShare(volume%)"	:	"Market Share (volume %)"
		"ReportCompanyStatusBrandMarketSalesVolume(mlnstd.packs)"	:	"Market Sales Volume (mln std. packs)"		
		"ReportCompanyStatusBrandLostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std. packs)"
		"ReportCompanyStatusBrandNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportCompanyStatusBrandVolume-weightedDistribution(%)"	:	"Volume-weighted Distribution (%)"
		"ReportCompanyStatusBrandShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportCompanyStatusBrandAwareness(%)"	:	"Awareness (%)"
		"ReportCompanyStatusBrandAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std. pack)"
		"ReportCompanyStatusBrandAverageDisplayPrice($/std.pack)"	:	"Average Display Price ($/std. pack)"
		"ReportCompanyStatusBrandPriceRankingIndex"	:	"Price Ranking Index"
		"ReportCompanyStatusBrandValuePerception"	:	"Value Perception"
		"ReportCompanyStatusBrandImagePerception"	:	"Image Perception"
		"ReportCompanyStatusBrandIngredientsQualityIndex"	:	"Ingredients Quality Index"
		"ReportCompanyStatusBrandAppliedTechnologyIndex"	:	"Applied Technology Index"
		"ReportCompanyStatusBrandMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportCompanyStatusBrandConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportCompanyStatusBrandMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportCompanyStatusBrandLostSalesVolumeduetoOOS(mlnpacks)"	:	"Lost Sales Volume due to OOS (mln packs)"
		"ReportCompanyStatusBrandumberofOut-of-stockEpisodes"	:	"Number of Out-of-stock Episodes"
		"ReportCompanyStatusBrandMarketSalesVolume(mlnpacks)"	:	"Market Sales Volume (mln packs)"
		"ReportCompanyStatusBrandRetailersPurchasesVolume(mlnpacks)"	:	"Retailers Purchases Volume (mln packs)"
		"ReportCompanyStatusBrandShipmentstoWholesalers(mlnpacks)"	:	"Shipments to Wholesalers (mln packs)"
		"ReportCompanyStatusBrandProductionVolume(mlnpacks)"	:	"Production Volume (mln packs)"
		"ReportCompanyStatusBrandInventoryVolumeAtManufacturer(mlnpacks)"	:	"Inventory Volume At Manufacturer (mln packs)"
		"ReportCompanyStatusBrandInventoryVolumeAtWholesalers(mlnpacks)"	:	"Inventory Volume At Wholesalers (mln packs)"
		"ReportCompanyStatusBrandInventoryVolumeAtRetailers(mlnpacks)"	:	"Inventory Volume At Retailers (mln packs)"
		"ReportCompanyStatusBrandStocksCoverAtRetailers(weeks)"	:	"Stocks Cover At Retailers (weeks)"
		"ReportCompanyStatusBrandStocksCoverAtWholesalers(weeks)"	:	"Stocks Cover At Wholesalers (weeks)"
		
		
		//Labels for Company Status Report - Global Level
		"ReportCompanyStatusGlobalMarketShare(value%)"	:	"Market Share (value %)"
		"ReportCompanyStatusGlobalMarketShare(volume%)"	:	"Market Share (volume %)"
		"ReportCompanyStatusGlobalMarketSalesVolume(mlnstd.packs)"	:	"Market Sales Volume (mln std. packs)"		
		"ReportCompanyStatusGlobalLostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std. packs)"
		"ReportCompanyStatusGlobalNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportCompanyStatusGlobalVolume-weightedDistribution(%)"	:	"Volume-weighted Distribution (%)"
		"ReportCompanyStatusGlobalShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportCompanyStatusGlobalMindSpaceShare(%)"	:	"Mind Space Share (%)"
		"ReportCompanyStatusGlobalAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std. pack)"
		"ReportCompanyStatusGlobalAverageDisplayPrice($/std.pack)"	:	"Average Display Price ($/std. pack)"
		"ReportCompanyStatusGlobalIngredientsQualityIndex"	:	"Ingredients Quality Index"
		"ReportCompanyStatusGlobalAppliedTechnologyIndex"	:	"Applied Technology Index"
		"ReportCompanyStatusGlobalMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportCompanyStatusGlobalConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportCompanyStatusGlobalMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportCompanyStatusGlobalLostSalesVolumeduetoOOS(mlnpacks)"	:	"Lost Sales Volume due to OOS (mln packs)"
		"ReportCompanyStatusGlobalumberofOut-of-stockEpisodes"	:	"Number of Out-of-stock Episodes"
		"ReportCompanyStatusGlobalMarketSalesVolume(mlnpacks)"	:	"Market Sales Volume (mln packs)"
		"ReportCompanyStatusGlobalRetailersPurchasesVolume(mlnpacks)"	:	"Retailers Purchases Volume (mln packs)"
		"ReportCompanyStatusGlobalShipmentstoWholesalers(mlnpacks)"	:	"Shipments to Wholesalers (mln packs)"
		"ReportCompanyStatusGlobalProductionVolume(mlnpacks)"	:	"Production Volume (mln packs)"
		"ReportCompanyStatusGlobalInventoryVolumeAtManufacturer(mlnpacks)"	:	"Inventory Volume At Manufacturer (mln packs)"
		"ReportCompanyStatusGlobalInventoryVolumeAtWholesalers(mlnpacks)"	:	"Inventory Volume At Wholesalers (mln packs)"
		"ReportCompanyStatusGlobalInventoryVolumeAtRetailers(mlnpacks)"	:	"Inventory Volume At Retailers (mln packs)"
		"ReportCompanyStatusGlobalStocksCoverAtRetailers(weeks)"	:	"Stocks Cover At Retailers (weeks)"
		"ReportCompanyStatusGlobalStocksCoverAtWholesalers(weeks)"	:	"Stocks Cover At Wholesalers (weeks)"
		
		
		
		//Labels for Financial Report - Brand Level
		"ReportFinancialReportBrandSales Value($mln)"	:	"Sales Value ($ mln)"
		"ReportFinancialReportBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportBrandShareInBrandTotalSalesValue(%)"	:	"Share In Brand Total Sales Value (%)"
		"ReportFinancialReportBrandCostofGoodsSold($mln)"	:	"Cost of Goods Sold ($ mln)"
		"ReportFinancialReportBrandObsoleteGoodsCost($mln)"	:	"Obsolete Goods Cost ($ mln)"
		"ReportFinancialReportBrandDiscontinuedGoodsCost($mln)"	:	"Discontinued Goods Cost ($ mln)"
		"ReportFinancialReportBrandInventoryHoldingCost($mln)"	:	"Inventory Holding Cost ($ mln)"
		"ReportFinancialReportBrandTotalMaterialCost($mln)"	:	"Total Material Cost ($ mln)"
		"ReportFinancialReportBrandGrossProfit($mln)"	:	"Gross Profit ($ mln)"
		"ReportFinancialReportBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportBrandGrossProfitMargin(%)"	:	"Gross Profit Margin (%)"
		"ReportFinancialReportBrandShareInBrandGrossProfit/Losses(%)"	:	"Share In Brand Gross Profit/Losses (%)"
		"ReportFinancialReportBrandAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportFinancialReportBrandConsumerPromotionCost($mln)"	:	"Consumer Promotion Cost ($ mln)"
		"ReportFinancialReportBrandTradeInvestment($mln)"	:	"Trade Investment ($ mln)"
		"ReportFinancialReportBrandSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportFinancialReportBrandAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportFinancialReportBrandVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportFinancialReportBrandTotalTradeandMarketingExpenses($mln)"	:	"Total Trade and Marketing Expenses ($ mln)"
		"ReportFinancialReportBrandTradeandMarketingExpensesasa(%)ofSales"	:	"Trade and Marketing Expenses as a (%) of Sales"
		"ReportFinancialReportBrandShareofTradeandMarketingExpensesinBrandTotal(%)"	:	"Share of Trade and Marketing Expenses in Brand Total (%)"
		"ReportFinancialReportBrandGeneralExpenses($mln)"	:	"General Expenses ($ mln)"
		"ReportFinancialReportBrandAmortisation($mln)"	:	"Amortisation ($ mln)"
		"ReportFinancialReportBrandOperatingProfit($mln)"	:	"Operating Profit ($ mln)"
		"ReportFinancialReportBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportBrandOperatingProfitMargin($mln)"	:	"Operating Profit Margin ($ mln)"
		"ReportFinancialReportBrandShareinBrandOperatingProfit/Loss(%)"	:	"Share in Brand Operating Profit/Loss (%)"
		"ReportFinancialReportBrandInterests($mln)"	:	"Interests ($ mln)"
		"ReportFinancialReportBrandTaxes($mln)"	:	"Taxes($mln)"
		"ReportFinancialReportBrandExceptionalCost/Profit($mln)"	:	"Exceptional Cost/Profit ($ mln)"
		"ReportFinancialReportBrandNetProfit($mln)"	:	"Net Profit ($ mln)"
		"ReportFinancialReportBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportBrandNetProfitMargin(%)"	:	"Net Profit Margin (%)"
		"ReportFinancialReportBrandShareinBrandOperatingProfit/Loss(%)"	:	"Share in Brand Operating Profit/Loss (%)"
		"ReportFinancialReportBrandProductionCost($mln)"	:	"Production Cost ($ mln)"
		"ReportFinancialReportBrandInventoryValue($mln)"	:	"Inventory Value ($ mln)"


		//Labels for Financial Report - All Brands
		"ReportFinancialReportAllBrandSales Value($mln)"	:	"Sales Value ($ mln)"
		"ReportFinancialReportAllBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportAllBrandShareInCompanyTotalSalesValue(%)"	:	"Share In Company Total Sales Value (%)"
		"ReportFinancialReportAllBrandCostofGoodsSold($mln)"	:	"Cost of Goods Sold ($ mln)"
		"ReportFinancialReportAllBrandObsoleteGoodsCost($mln)"	:	"Obsolete Goods Cost ($ mln)"
		"ReportFinancialReportAllBrandDiscontinuedGoodsCost($mln)"	:	"Discontinued Goods Cost ($ mln)"
		"ReportFinancialReportAllBrandInventoryHoldingCost($mln)"	:	"Inventory Holding Cost ($ mln)"
		"ReportFinancialReportAllBrandTotalMaterialCost($mln)"	:	"Total Material Cost ($ mln)"
		"ReportFinancialReportAllBrandGrossProfit($mln)"	:	"Gross Profit ($ mln)"
		"ReportFinancialReportAllBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportAllBrandGrossProfitMargin(%)"	:	"Gross Profit Margin (%)"
		"ReportFinancialReportAllBrandShareInCompanyGrossProfit/Losses(%)"	:	"Share In Company Gross Profit/Losses (%)"
		"ReportFinancialReportAllBrandAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportFinancialReportAllBrandConsumerPromotionCost($mln)"	:	"Consumer Promotion Cost ($ mln)"
		"ReportFinancialReportAllBrandTradeInvestment($mln)"	:	"Trade Investment ($ mln)"
		"ReportFinancialReportAllBrandSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportFinancialReportAllBrandAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportFinancialReportAllBrandVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportFinancialReportAllBrandTotalTradeandMarketingExpenses($mln)"	:	"Total Trade and Marketing Expenses ($ mln)"
		"ReportFinancialReportAllBrandTradeandMarketingExpensesasa(%)ofSales"	:	"Trade and Marketing Expenses as a (%) of Sales"
		"ReportFinancialReportAllBrandShareofTradeandMarketingExpensesinBrandTotal(%)"	:	"Share of Trade and Marketing Expenses in Brand Total (%)"
		"ReportFinancialReportAllBrandGeneralExpenses($mln)"	:	"General Expenses ($ mln)"
		"ReportFinancialReportAllBrandAmortisation($mln)"	:	"Amortisation ($ mln)"
		"ReportFinancialReportAllBrandOperatingProfit($mln)"	:	"Operating Profit ($ mln)"
		"ReportFinancialReportAllBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportAllBrandOperatingProfitMargin($mln)"	:	"Operating Profit Margin ($ mln)"
		"ReportFinancialReportAllBrandShareinBrandOperatingProfit/Loss(%)"	:	"Share in Brand Operating Profit/Loss (%)"
		"ReportFinancialReportAllBrandInterests($mln)"	:	"Interests ($ mln)"
		"ReportFinancialReportAllBrandTaxes($mln)"	:	"Taxes($mln)"
		"ReportFinancialReportAllBrandExceptionalCost/Profit($mln)"	:	"Exceptional Cost/Profit ($ mln)"
		"ReportFinancialReportAllBrandNetProfit($mln)"	:	"Net Profit ($ mln)"
		"ReportFinancialReportAllBrand(%)ChangeVersusPreviousperiod"	:	"(%) Change Versus Previous period"
		"ReportFinancialReportAllBrandNetProfitMargin(%)"	:	"Net Profit Margin (%)"
		"ReportFinancialReportAllBrandShareinBrandOperatingProfit/Loss(%)"	:	"Share in Brand Operating Profit/Loss (%)"
		"ReportFinancialReportAllBrandProductionCost($mln)"	:	"Production Cost ($ mln)"
		"ReportFinancialReportAllBrandInventoryValue($mln)"	:	"Inventory Value ($ mln)"
		
		
		//Labels for Inventory Report
		"ReportInventoryReportLabelClosetoexpireInventory"	:	"Close to expire Inventory"
		"ReportInventoryReportLabelPreviousInventory"	:	"Previous Inventory"
		"ReportInventoryReportLabelFreshInventory"	:	"Fresh Inventory"
		

		//Labels for Profitability Evolution - SKU Level
		"ReportProfitabilityEvolutionSKUManufacturerSalesValue($mln)"	:	"Manufacturer Sales Value ($ mln)"
		"ReportProfitabilityEvolutionSKUCostofGoodsSold($mln)"	:	"Cost of Goods Sold ($ mln)"
		"ReportProfitabilityEvolutionSKUInventoryHolding($mln)"	:	"Inventory Holding ($ mln)"
		"ReportProfitabilityEvolutionSKUObsoleteGoods($mln)"	:	"Obsolete Goods ($ mln)"
		"ReportProfitabilityEvolutionSKUDiscontinuedGoodsCost($mln)"	:	"Discontinued Goods Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUGross Profit($mln)"	:	"Gross Profit ($ mln)"
		"ReportProfitabilityEvolutionSKUAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportProfitabilityEvolutionSKUConsumerPromotionsCost($mln)"	:	"Consumer Promotions Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUTradeInvestment($mln)"	:	"Trade Investment ($ mln)"
		"ReportProfitabilityEvolutionSKUSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUTotalTradeandMarketingExpenses($mln)"	:	"Total Trade and Marketing Expenses ($ mln)"
		"ReportProfitabilityEvolutionSKUGeneralExpenses($mln)"	:	"General Expenses ($ mln)"
		"ReportProfitabilityEvolutionSKUAmortisation($mln)"	:	"Amortisation ($ mln)"
		"ReportProfitabilityEvolutionSKUOperatingProfit($mln)"	:	"Operating Profit ($ mln)"
		"ReportProfitabilityEvolutionSKUInterests($mln)"	:	"Interests ($ mln)"
		"ReportProfitabilityEvolutionSKUExceptionalCost/Profit($mln)"	:	"Exceptional Cost/Profit ($ mln)"
		"ReportProfitabilityEvolutionSKUTaxes($mln)"	:	"Taxes ($ mln)"
		"ReportProfitabilityEvolutionSKUNetProfit($mln)"	:	"Net Profit ($ mln)"
		"ReportProfitabilityEvolutionSKUSurchargeforsupplementaryInvestmentBudget($mln)"	:	"Surcharge for supplementary InvestmentBudget ($ mln)"
		"ReportProfitabilityEvolutionSKUNetResult($mln)"	:	"Net Result ($ mln)"
		"ReportProfitabilityEvolutionSKUShareInBrandTotalSalesValue(%)"	:	"Share In Brand Total Sales Value (%)"
		"ReportProfitabilityEvolutionSKUShareInBrandGrossProfit/Losses(%)"	:	"Share In Brand Gross Profit/Losses (%)"
		"ReportProfitabilityEvolutionSKUShareofTradeandMarketingExpensesInBrandTotal(%)"	:	"Share of Trade and Marketing Expenses In Brand Total (%)"
		"ReportProfitabilityEvolutionSKUShareInBrandOperatingProfit/Losses(%)"	:	"Share In Brand Operating Profit/Losses (%)"
		"ReportProfitabilityEvolutionSKUShareInBrandNetProfit/Losses(%)"	:	"Share In Brand Net Profit/Losses (%)"
		"ReportProfitabilityEvolutionSKUGrossProfitMargin(%)"	:	"Gross Profit Margin (%)"
		"ReportProfitabilityEvolutionSKUTradeandMarketingExpensesasa(%)ofSales"	:	"Trade and Marketing Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionSKUGeneralExpensesasa(%)ofSales"	:	"General Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionSKUOperatingProfitMargin(%)"	:	"Operating Profit Margin (%)"
		"ReportProfitabilityEvolutionSKUNetProfitMargin(%)"	:	"Net Profit Margin (%)"
		"ReportProfitabilityEvolutionSKUReturnonInvestment(%)"	:	"Return on Investment (%)"
		"ReportProfitabilityEvolutionSKUAverageNetMarketPrice($/pack)"	:	"Average Net Market Price ($/pack)"
		"ReportProfitabilityEvolutionSKUAverageWholesalesPrice($/pack)"	:	"Average Wholesales Price ($/pack)"
		"ReportProfitabilityEvolutionSKUAverageManufacturerPrice($/pack)"	:	"Average Manufacturer Price ($/pack)"
		"ReportProfitabilityEvolutionSKUAverageProductionCost($/pack)"	:	"Average Production Cost ($/pack)"
		"ReportProfitabilityEvolutionSKUMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportProfitabilityEvolutionSKUConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportProfitabilityEvolutionSKUMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportProfitabilityEvolutionSKUAdditionalRetailersMargin(%)"	:	"Additional Retailers Margin (%)"
		"ReportProfitabilityEvolutionSKUWholesalersBonusRate(%)"	:	"Wholesalers Bonus Rate (%)"
		"ReportProfitabilityEvolutionSKUMinimalPurchaseQualifyingforBonus(mlnstd.packs)"	:	"Minimal Purchase Qualifying for Bonus (mln std. packs)"
		"ReportProfitabilityEvolutionSKUProductionCost($mln)"	:	"Production Cost ($ mln)"
		"ReportProfitabilityEvolutionSKUInventoryValue($mln)"	:	"Inventory Value ($ mln)"
		
		
//Labels for Profitability Evolution - Brand Level
		"ReportProfitabilityEvolutionBrandManufacturerSalesValue($mln)"	:	"Manufacturer Sales Value ($ mln)"
		"ReportProfitabilityEvolutionBrandCostofGoodsSold($mln)"	:	"Cost of Goods Sold ($ mln)"
		"ReportProfitabilityEvolutionBrandInventoryHolding($mln)"	:	"Inventory Holding ($ mln)"
		"ReportProfitabilityEvolutionBrandObsoleteGoods($mln)"	:	"Obsolete Goods ($ mln)"
		"ReportProfitabilityEvolutionBrandDiscontinuedGoodsCost($mln)"	:	"Discontinued Goods Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandGross Profit($mln)"	:	"Gross Profit ($ mln)"
		"ReportProfitabilityEvolutionBrandAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportProfitabilityEvolutionBrandConsumerPromotionsCost($mln)"	:	"Consumer Promotions Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandTradeInvestment($mln)"	:	"Trade Investment ($ mln)"
		"ReportProfitabilityEvolutionBrandSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandTotalTradeandMarketingExpenses($mln)"	:	"Total Trade and Marketing Expenses ($ mln)"
		"ReportProfitabilityEvolutionBrandGeneralExpenses($mln)"	:	"General Expenses ($ mln)"
		"ReportProfitabilityEvolutionBrandAmortisation($mln)"	:	"Amortisation ($ mln)"
		"ReportProfitabilityEvolutionBrandOperatingProfit($mln)"	:	"Operating Profit ($ mln)"
		"ReportProfitabilityEvolutionBrandInterests($mln)"	:	"Interests ($ mln)"
		"ReportProfitabilityEvolutionBrandExceptionalCost/Profit($mln)"	:	"Exceptional Cost/Profit ($ mln)"
		"ReportProfitabilityEvolutionBrandTaxes($mln)"	:	"Taxes ($ mln)"
		"ReportProfitabilityEvolutionBrandNetProfit($mln)"	:	"Net Profit ($ mln)"
		"ReportProfitabilityEvolutionBrandSurchargeforsupplementaryInvestmentBudget($mln)"	:	"Surcharge for supplementary InvestmentBudget ($ mln)"
		"ReportProfitabilityEvolutionBrandNetResult($mln)"	:	"Net Result ($ mln)"
		"ReportProfitabilityEvolutionBrandShareInCompanyTotalSalesValue(%)"	:	"Share In Company Total Sales Value (%)"
		"ReportProfitabilityEvolutionBrandShareInCompanyGrossProfit/Losses(%)"	:	"Share In Company Gross Profit/Losses (%)"
		"ReportProfitabilityEvolutionBrandShareofTradeandMarketingExpensesInCompanyTotal(%)"	:	"Share of Trade and Marketing Expenses In Company Total (%)"
		"ReportProfitabilityEvolutionBrandShareInCompanyOperatingProfit/Losses(%)"	:	"Share In Company Operating Profit/Losses (%)"
		"ReportProfitabilityEvolutionBrandShareInCompanyNetProfit/Losses(%)"	:	"Share In Company Net Profit/Losses (%)"
		"ReportProfitabilityEvolutionBrandGrossProfitMargin(%)"	:	"Gross Profit Margin (%)"
		"ReportProfitabilityEvolutionBrandTradeandMarketingExpensesasa(%)ofSales"	:	"Trade and Marketing Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionBrandGeneralExpensesasa(%)ofSales"	:	"General Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionBrandOperatingProfitMargin(%)"	:	"Operating Profit Margin (%)"
		"ReportProfitabilityEvolutionBrandNetProfitMargin(%)"	:	"Net Profit Margin (%)"
		"ReportProfitabilityEvolutionBrandReturnonInvestment(%)"	:	"Return on Investment (%)"
		"ReportProfitabilityEvolutionBrandAverageNetMarketPrice($/pack)"	:	"Average Net Market Price ($/pack)"
		"ReportProfitabilityEvolutionBrandAverageWholesalesPrice($/pack)"	:	"Average Wholesales Price ($/pack)"
		"ReportProfitabilityEvolutionBrandAverageManufacturerPrice($/pack)"	:	"Average Manufacturer Price ($/pack)"
		"ReportProfitabilityEvolutionBrandAverageProductionCost($/pack)"	:	"Average Production Cost ($/pack)"
		"ReportProfitabilityEvolutionBrandMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportProfitabilityEvolutionBrandConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportProfitabilityEvolutionBrandMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportProfitabilityEvolutionBrandAdditionalRetailersMargin(%)"	:	"Additional Retailers Margin (%)"
		"ReportProfitabilityEvolutionBrandWholesalersBonusRate(%)"	:	"Wholesalers Bonus Rate (%)"
		"ReportProfitabilityEvolutionBrandMinimalPurchaseQualifyingforBonus(mlnstd.packs)"	:	"Minimal Purchase Qualifying for Bonus (mln std. packs)"
		"ReportProfitabilityEvolutionBrandProductionCost($mln)"	:	"Production Cost ($ mln)"
		"ReportProfitabilityEvolutionBrandInventoryValue($mln)"	:	"Inventory Value ($ mln)"
		
		
		//Labels for Profitability Evolution - Global Level
		"ReportProfitabilityEvolutionGlobalManufacturerSalesValue($mln)"	:	"Manufacturer Sales Value ($ mln)"
		"ReportProfitabilityEvolutionGlobalCostofGoodsSold($mln)"	:	"Cost of Goods Sold ($ mln)"
		"ReportProfitabilityEvolutionGlobalInventoryHolding($mln)"	:	"Inventory Holding ($ mln)"
		"ReportProfitabilityEvolutionGlobalObsoleteGoods($mln)"	:	"Obsolete Goods ($ mln)"
		"ReportProfitabilityEvolutionGlobalDiscontinuedGoodsCost($mln)"	:	"Discontinued Goods Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalGross Profit($mln)"	:	"Gross Profit ($ mln)"
		"ReportProfitabilityEvolutionGlobalAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportProfitabilityEvolutionGlobalConsumerPromotionsCost($mln)"	:	"Consumer Promotions Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalTradeInvestment($mln)"	:	"Trade Investment ($ mln)"
		"ReportProfitabilityEvolutionGlobalSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalTotalTradeandMarketingExpenses($mln)"	:	"Total Trade and Marketing Expenses ($ mln)"
		"ReportProfitabilityEvolutionGlobalOverhead($mln)"	:	"Overhead ($ mln)"
		"ReportProfitabilityEvolutionGlobalInvestmenttoImproveTechnologyLevel($mln)"	:	"Investment to Improve Technology Level ($ mln)"
		"ReportProfitabilityEvolutionGlobalInvestmenttoIncreaseProductionEfficiency($mln)"	:	"Investment to Increase Production Efficiency ($ mln)"
		"ReportProfitabilityEvolutionGlobalProductionCapacityDisposalCost($mln)"	:	"Production Capacity Disposal Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalOvertimeShiftsCost($mln)"	:	"Overtime Shifts Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalTotalGeneralExpenses($mln)"	:	"Total General Expenses ($ mln)"
		"ReportProfitabilityEvolutionGlobalAmortisation($mln)"	:	"Amortisation ($ mln)"
		"ReportProfitabilityEvolutionGlobalOperatingProfit($mln)"	:	"Operating Profit ($ mln)"
		"ReportProfitabilityEvolutionGlobalInterests($mln)"	:	"Interests ($ mln)"
		"ReportProfitabilityEvolutionGlobalExceptionalCost/Profit($mln)"	:	"Exceptional Cost/Profit ($ mln)"
		"ReportProfitabilityEvolutionGlobalTaxes($mln)"	:	"Taxes ($ mln)"
		"ReportProfitabilityEvolutionGlobalNetProfit($mln)"	:	"Net Profit ($ mln)"
		"ReportProfitabilityEvolutionGlobalSurchargeforsupplementaryInvestmentBudget($mln)"	:	"Surcharge for supplementary InvestmentBudget ($ mln)"
		"ReportProfitabilityEvolutionGlobalNetResult($mln)"	:	"Net Result ($ mln)"
		"ReportProfitabilityEvolutionGlobalGrossProfitMargin(%)"	:	"Gross Profit Margin (%)"
		"ReportProfitabilityEvolutionGlobalTradeandMarketingExpensesasa(%)ofSales"	:	"Trade and Marketing Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionGlobalGeneralExpensesasa(%)ofSales"	:	"General Expenses as a(%) of Sales"
		"ReportProfitabilityEvolutionGlobalOperatingProfitMargin(%)"	:	"Operating Profit Margin (%)"
		"ReportProfitabilityEvolutionGlobalNetProfitMargin(%)"	:	"Net Profit Margin (%)"
		"ReportProfitabilityEvolutionGlobalReturnonInvestment(%)"	:	"Return on Investment (%)"
		"ReportProfitabilityEvolutionGlobalAverageNetMarketPrice($/pack)"	:	"Average Net Market Price ($/pack)"
		"ReportProfitabilityEvolutionGlobalAverageWholesalesPrice($/pack)"	:	"Average Wholesales Price ($/pack)"
		"ReportProfitabilityEvolutionGlobalAverageManufacturerPrice($/pack)"	:	"Average Manufacturer Price ($/pack)"
		"ReportProfitabilityEvolutionGlobalAverageProductionCost($/pack)"	:	"Average Production Cost ($/pack)"
		"ReportProfitabilityEvolutionGlobalMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportProfitabilityEvolutionGlobalConsumerPricePromotions($mln)"	:	"Consumer Price Promotions ($ mln)"
		"ReportProfitabilityEvolutionGlobalMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportProfitabilityEvolutionGlobalProductionCost($mln)"	:	"Production Cost ($ mln)"
		"ReportProfitabilityEvolutionGlobalInventoryValue($mln)"	:	"Inventory Value ($ mln)"
		"ReportProfitabilityEvolutionGlobalCapacityUtilisationRate(%)"	:	"Capacity Utilisation Rate (%)"
		"ReportProfitabilityEvolutionGlobalChangeInProductionCapacity(mlnstd.packs)"	:	"Change In Production Capacity (mln std. packs)"
		"ReportProfitabilityEvolutionGlobalNextPeriodAvailableProd.Capacity(mlnstd.packs)"	:	"Next Period Available Prod. Capacity (mln std. packs)"
		"ReportProfitabilityEvolutionGlobalAvailableTechnologyLevel"	:	"Available Technology Level"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseTechnologyLevelby1Step"	:	"Extra Budget Required to Increase Technology Level by 1 Step"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseTechnologyLevelby2Steps"	:	"Extra Budget Required to Increase Technology Level by 2 Steps"
		"ReportProfitabilityEvolutionGlobalAcquiredProductionandLogisticsEfficiency(%)"	:	"Acquired Production and Logistics Efficiency (%)"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseEfficiencyby2%points"	:	"Extra Budget Required to Increase Efficiency by 2% points"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseEfficiencyby5%points"	:	"Extra Budget Required to Increase Efficiency by 5% points"
		"ReportProfitabilityEvolutionGlobalAcquiredProductionPlanningFlexibility(%)"	:	"Acquired Production Planning Flexibility (%)"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseFlexibilityby2%points"	:	"Extra Budget Required to Increase Flexibility by 2% points"
		"ReportProfitabilityEvolutionGlobalExtraBudgetRequiredtoIncreaseFlexibilityby5%points"	:	"Extra Budget Required to Increase Flexibility by 5% points"


		//Labels for Market Share
		"ReportMarketShareChartTitleMarketShareinValue(%)"	:	"Market Share in Value (%)"
		"ReportMarketShareChartTitleMarketShareinVolume(%)"	:	"Market Share in Volume (%)"
		"ReportMarketShareChartTitleMindSpaceShare(%)"	:	"Mind Space Share (%)"
		"ReportMarketShareChartTitleShelfSpaceShare(%)"	:	"Shelf Space Share (%)"

		
		//Labels for Competitor Intelligence
		"ReportCompetitorIntelligenceTableTitleTechnology"	:	"Technology"		
		"ReportCompetitorIntelligenceTechnologyAcquiredProductionandLogisticsEfficiency(%)"	:	"Acquired Production and Logistics Efficiency (%)"
		"ReportCompetitorIntelligenceTechnologyAcquiredProductionPlanningFlexibility(%)"	:	"Acquired Production Planning Flexibility (%)"
		"ReportCompetitorIntelligenceTechnologyAvailableTechnologyLevel"	:	"Available Technology Level"
		"ReportCompetitorIntelligenceTableTitleMarketing&Sales"	:	"Marketing & Sales"
		"ReportCompetitorIntelligenceMarketing&SalesAdditionalTradeMarginCost($mln)"	:	"Additional Trade Margin Cost ($ mln)"
		"ReportCompetitorIntelligenceMarketing&SalesAdvertising($mln)"	:	"Advertising ($ mln)"
		"ReportCompetitorIntelligenceMarketing&SalesConsumerPromotionsCost($mln)"	:	"Consumer Promotions Cost ($ mln)"
		"ReportCompetitorIntelligenceMarketing&SalesRetailerPurchaseVolume(mlnstd.packs)"	:	"Retailer Purchase Volume(mln std. packs)"
		"ReportCompetitorIntelligenceMarketing&SalesSalesForceCost($mln)"	:	"Sales Force Cost ($ mln)"
		"ReportCompetitorIntelligenceMarketing&SalesShipmenttoWholesalers(mlnstd.packs)"	:	"Shipment to Wholesalers (mln std. packs)"
		"ReportCompetitorIntelligenceMarketing&SalesTradeInvestments($mln)"	:	"Trade Investments ($ mln)"
		"ReportCompetitorIntelligenceMarketing&SalesVolumeDiscountCost($mln)"	:	"Volume Discount Cost ($ mln)"
		"ReportCompetitorIntelligenceTableTitleOperations"	:	"Operations"
		"ReportCompetitorIntelligenceOperationsCapacityUtilisationRate(%)"	:	"Capacity Utilisation Rate (%)"
		"ReportCompetitorIntelligenceOperationsInventoryVolumeatManufacturer(mlnstd.packs)"	:	"Inventory Volume at Manufacturer (mln std. packs)"
		"ReportCompetitorIntelligenceOperationsInventoryVolumeatRetailers(mlnstd.packs)"	:	"Inventory Volume at Retailers (mln std. packs)"
		"ReportCompetitorIntelligenceOperationsInventoryVolumeatWholesalers(mlnstd.packs)"	:	"Inventory Volume at Wholesalers (mln std. packs)"
		"ReportCompetitorIntelligenceOperationsNextPeriodAvailableProd.Capacity(mlnstd.packs)"	:	"Next Period Available Prod.Capacity (mln std. packs)"
		"ReportCompetitorIntelligenceOperationsProductionVolume(mlnstd.packs)"	:	"Production Volume (mln std. packs)"
		"ReportCompetitorIntelligenceTableTitleOperations"	:	"Investments"
		"ReportCompetitorIntelligenceInvestmentsInvestmenttoImproveTechnologyLevel($mln)"	:	"Investment to Improve Technology Level ($ mln)"
		"ReportCompetitorIntelligenceInvestmentsInvestmenttoIncreaseProductionEfficiency($mln)"	:	"Investment to Increase Production Efficiency ($ mln)"
		 
		//Labels for Investments and Profits
		"ReportInvestmentsandProfitsChartTitleTotalInvestment($mln)"	:	"Total Investment ($ mln)"		 
		"ReportInvestmentsandProfitsChartTitleNetProfitByCompanies($mln)"	:	"Net Profit By Companies ($ mln)"
		"ReportInvestmentsandProfitsChartTitleReturnonInvestment(%)"	:	"Return on Investment (%)"
		"ReportInvestmentsandProfitsChartTitleInvestmentversusBudget(%)"	:	"Investment versus Budget(%)"
		 
		 
		//Labels for Market Sales and Inventory
		"ReportMarketSalesandInventoryChartTitleMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"		 
		"ReportMarketSalesandInventoryChartTitleMarketSalesVolume(mlnstd.packs)"	:	"Market Sales Volume (mln std. packs)"
		"ReportMarketSalesandInventoryChartTitleTotalInventoryatFactory(mlnstd.packs)"	:	"Total Inventory at Factory (mln std. packs)"
		"ReportMarketSalesandInventoryChartTitleTotalInventoryatTrade(mlnstd.packs)"	:	"Total Inventory at Trade (mln std. packs)"
		 

		//Labels for Segment Leader Top 5
		"ReportSegmentLeaderTop5ChartTitlePriceSensitive(%)"	:	"Price Sensitive (%)"		 
		"ReportSegmentLeaderTop5ChartTitlePretenders(%)"	:	"Pretenders (%)"
		"ReportSegmentLeaderTop5ChartTitleModerate(%)"	:	"Moderate (%)"
		"ReportSegmentLeaderTop5ChartTitleGoodLife(%)"	:	"Good Life (%)"
		"ReportSegmentLeaderTop5ChartTitleUltimate(%)"	:	"Ultimate (%)"
		"ReportSegmentLeaderTop5ChartTitlePragmatic(%)"	:	"Pragmatic (%)"
		
		//Labels for Perception Map
		"ReportPerceptionMapAxisTitleValuePerception"	:	"Value Perception"
		"ReportPerceptionMapAxisTitleImagePerception"	:	"Image Perception"
		"ReportPerceptionMapLabelCompanyA"	:	"Company A"
		"ReportPerceptionMapLabelCompanyB"	:	"Company B"
		"ReportPerceptionMapLabelCompanyC"	:	"Company C"
		"ReportPerceptionMapLabelCompanyD"	:	"Company D"
		"ReportPerceptionMapLabelCompanyE"	:	"Company E"
		"ReportPerceptionMapLabelCompanyF"	:	"Company F"
		 
		 
		//Labels for Segment Distributions
		"ReportSegmentDistributionsTableTitleMarketShare(Value%)"	:	"Market Share (Value %)"
		"ReportSegmentDistributionsTableTitleMarketShare(Volume%)"	:	"Market Share (Volume %)"
		"ReportSegmentDistributionsTableTitleMarketSalesValue($mln)"	:	"Market Sales Value ($ mln)"
		"ReportSegmentDistributionsTableTitleMarketSalesVolume(mlnstd.packs)"	:	"Market Sales Volume (mln std. packs)"
		"ReportSegmentDistributionsTableTitleAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std.pack)"
		"ReportSegmentDistributionsTableTitleValuePerception"	:	"Value Perception"
		"ReportSegmentDistributionsTableTitleImagePerception"	:	"Image Perception"

		 
		//Labels for Market Evolution
		"ReportMarketEvolutionChartTitleGrowthRateInVolume(Period-3=100)"	:	"Growth Rate In Volume (Period -3 = 100)"	
		"ReportMarketEvolutionChartTitleGrowthRateInValue(Period-3=100)"	:	"Growth Rate (%) In Value (Period -3 = 100)"
		"ReportMarketEvolutionChartTitleNetMarketPrice(Period-3=100)"	:	"Net Market Price (Period -3 = 100)"
		"ReportMarketEvolutionChartTitleSegmentValueShareInTotalMarket(%)"	:	"Segment Value Share In Total Market (%)"
		 
		 
		//Labels for Market Trends - SKU Level
		"ReportMarketTrendsSKUTableTitleMarketFigures"	:	"Market Figures"	//Market Figures
		"ReportMarketTrendsSKUMarketFiguresAverageDisplayPrice($/std.pack)"	:	"Average Display Price ($/std.pack)" 
		"ReportMarketTrendsSKUMarketFiguresAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std.pack)"
		"ReportMarketTrendsSKUMarketFiguresBrandAwareness(%)"	:	"Brand Awareness(%)"
		"ReportMarketTrendsSKUMarketFiguresImagePerception"	:	"Image Perception"
		"ReportMarketTrendsSKUMarketFiguresMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportMarketTrendsSKUMarketFiguresMarketNetSalesVolume(mlnstd.packs)"	:	"Market Net Sales Volume (mln std.packs)"
		"ReportMarketTrendsSKUMarketFiguresMarketShare(Value%)"	:	"Market Share (Value %)"
		"ReportMarketTrendsSKUMarketFiguresMarketShare(Volume%)"	:	"Market Share (Volume %)"
		"ReportMarketTrendsSKUTableTitleMiscellaneous"	:	"Miscellaneous"		//Miscellaneous
		"ReportMarketTrendsSKUMiscellaneousLostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std.packs)"
		"ReportMarketTrendsSKUMiscellaneousNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportMarketTrendsSKUMiscellaneousTotalInventoryatTrade(mlnstd.packs)"	:	"Total Inventory at Trade (mln std.packs)"
		"ReportMarketTrendsSKUMiscellaneousPriceRankingIndex"	:	"Price Ranking Index"
		"ReportMarketTrendsSKUMiscellaneousShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportMarketTrendsSKUTableTitleSegmentwiseValueShare"	:	"Segment-wise Value Share"		//Segment-wise Value Share
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in1.PriceSensitiveSegment"	:	"Value Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in2.PretendersSegment"	:	"Value Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in3.ModerateSegment"	:	"Value Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in4.GoodLifeSegment"	:	"Value Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in5.UltimateSegment"	:	"Value Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareValueShare(%)in6.PragmaticSegment"	:	"Value Share (%) in 6. Pragmatic Segment"
		"ReportMarketTrendsSKUTableTitleSegmentwiseVolumeShare"	:	"Segment-wise Volume Share"		//Segment-wise Value Share
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in1.PriceSensitiveSegment"	:	"Volume Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in2.PretendersSegment"	:	"Volume Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in3.ModerateSegment"	:	"Volume Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in4.GoodLifeSegment"	:	"Volume Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in5.UltimateSegment"	:	"Volume Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsSKUSegmentwiseValueShareVolumeShare(%)in6.PragmaticSegment"	:	"Volume Share (%) in 6. Pragmatic Segment"
		
		
		
		//Labels for Market Trends - Brand Level
		"ReportMarketTrendsBrandTableTitleMarketFigures"	:	"Market Figures"	//Market Figures
		"ReportMarketTrendsBrandMarketFiguresAverageDisplayPrice($/std.pack)"	:	"Average Display Price ($/std.pack)" 
		"ReportMarketTrendsBrandMarketFiguresAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std.pack)"
		"ReportMarketTrendsBrandMarketFiguresBrandAwareness(%)"	:	"Brand Awareness(%)"
		"ReportMarketTrendsBrandMarketFiguresImagePerception"	:	"Image Perception"
		"ReportMarketTrendsBrandMarketFiguresMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportMarketTrendsBrandMarketFiguresMarketNetSalesVolume(mlnstd.packs)"	:	"Market Net Sales Volume (mln std.packs)"
		"ReportMarketTrendsBrandMarketFiguresMarketShare(Value%)"	:	"Market Share (Value %)"
		"ReportMarketTrendsBrandMarketFiguresMarketShare(Volume%)"	:	"Market Share (Volume %)"
		"ReportMarketTrendsBrandTableTitleMiscellaneous"	:	"Miscellaneous"		//Miscellaneous
		"ReportMarketTrendsBrandMiscellaneousLostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std.packs)"
		"ReportMarketTrendsBrandMiscellaneousNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportMarketTrendsBrandMiscellaneousTotalInventoryatTrade(mlnstd.packs)"	:	"Total Inventory at Trade (mln std.packs)"
		"ReportMarketTrendsBrandMiscellaneousPriceRankingIndex"	:	"Price Ranking Index"
		"ReportMarketTrendsBrandMiscellaneousShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportMarketTrendsBrandTableTitleSegmentwiseValueShare"	:	"Segment-wise Value Share"		//Segment-wise Value Share
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in1.PriceSensitiveSegment"	:	"Value Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in2.PretendersSegment"	:	"Value Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in3.ModerateSegment"	:	"Value Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in4.GoodLifeSegment"	:	"Value Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in5.UltimateSegment"	:	"Value Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareValueShare(%)in6.PragmaticSegment"	:	"Value Share (%) in 6. Pragmatic Segment"
		"ReportMarketTrendsBrandTableTitleSegmentwiseVolumeShare"	:	"Segment-wise Volume Share"		//Segment-wise Value Share
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in1.PriceSensitiveSegment"	:	"Volume Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in2.PretendersSegment"	:	"Volume Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in3.ModerateSegment"	:	"Volume Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in4.GoodLifeSegment"	:	"Volume Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in5.UltimateSegment"	:	"Volume Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsBrandSegmentwiseValueShareVolumeShare(%)in6.PragmaticSegment"	:	"Volume Share (%) in 6. Pragmatic Segment"
		
		
		//Labels for Market Trends - Global Level
		"ReportMarketTrendsGlobalTableTitleMarketFigures"	:	"Market Figures"	//Market Figures
		"ReportMarketTrendsGlobalMarketFiguresAverageNetMarketPrice($/std.pack)"	:	"Average Net Market Price ($/std.pack)"
		"ReportMarketTrendsGlobalMarketFiguresMarketNetSalesValue($mln)"	:	"Market Net Sales Value ($ mln)"
		"ReportMarketTrendsGlobalMarketFiguresMarketNetSalesVolume(mlnstd.packs)"	:	"Market Net Sales Volume (mln std.packs)"
		"ReportMarketTrendsGlobalMarketFiguresMarketShare(Value%)"	:	"Market Share (Value %)"
		"ReportMarketTrendsGlobalMarketFiguresMarketShare(Volume%)"	:	"Market Share (Volume %)"
		"ReportMarketTrendsGlobalTableTitleMiscellaneous"	:	"Miscellaneous"		//Miscellaneous
		"ReportMarketTrendsGlobalMiscellaneousLostSalesVolumeduetoOOS(mlnstd.packs)"	:	"Lost Sales Volume due to OOS (mln std.packs)"
		"ReportMarketTrendsGlobalMiscellaneousNumericalDistribution(%)"	:	"Numerical Distribution (%)"
		"ReportMarketTrendsGlobalMiscellaneousTotalInventoryatTrade(mlnstd.packs)"	:	"Total Inventory at Trade (mln std.packs)"
		"ReportMarketTrendsGlobalMiscellaneousPriceRankingIndex"	:	"Price Ranking Index"
		"ReportMarketTrendsGlobalMiscellaneousShelfSpace(%)"	:	"Shelf Space (%)"
		"ReportMarketTrendsGlobalTableTitleSegmentwiseValueShare"	:	"Segment-wise Value Share"		//Segment-wise Value Share
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in1.PriceSensitiveSegment"	:	"Value Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in2.PretendersSegment"	:	"Value Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in3.ModerateSegment"	:	"Value Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in4.GoodLifeSegment"	:	"Value Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in5.UltimateSegment"	:	"Value Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareValueShare(%)in6.PragmaticSegment"	:	"Value Share (%) in 6. Pragmatic Segment"
		"ReportMarketTrendsGlobalTableTitleSegmentwiseVolumeShare"	:	"Segment-wise Volume Share"		//Segment-wise Value Share
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in1.PriceSensitiveSegment"	:	"Volume Share (%) in 1. Price Sensitive Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in2.PretendersSegment"	:	"Volume Share (%) in 2. Pretenders Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in3.ModerateSegment"	:	"Volume Share (%) in 3. Moderate Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in4.GoodLifeSegment"	:	"Volume Share (%) in 4. Good Life Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in5.UltimateSegment"	:	"Volume Share (%) in 5. Ultimate Segment"
		"ReportMarketTrendsGlobalSegmentwiseValueShareVolumeShare(%)in6.PragmaticSegment"	:	"Volume Share (%) in 6. Pragmatic Segment"		
		
		 
		 
    });

    // Adding a translation table for the Russian language
    $translateProvider.translations('zh_CN', {
        "ReportMenuCompanyStatus"     : "公司基本信息",
        "ReportMenuFinancialReport"    :  "财务报告",
        "ReportMenuInventoryReport"    :  "库存报告",
        "ReportMenuProfitabilityEvolution"    :  "盈利变化",
        "ReportMenuMarketShare"    :  "市场份额",
        "ReportMenuCompetitorIntelligence"    :  "竞争对手情报",
        "ReportMenuInvestmentProfits"    :  "投资与利润",
        "ReportMenuMarketSalesInventory"    :  "销售与库存状况",
        "ReportMenuSegmentLeaderTop5"    :  "细分市场领导者",
        "ReportMenuPerceptionMap"    :  "感知图",
        "ReportMenuSegmentDistributions"    :  "细分市场数据",
        "ReportMenuMarketEvolution"    :  "市场演变趋势",
        "ReportMenuMarketTrends"    :  "市场趋势",
        "ReportMenuMarketIndicator"    :  "宏观市场参数"
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US');
}]);