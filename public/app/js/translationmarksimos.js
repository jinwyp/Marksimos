/**
 * Created by jinwyp on 7/8/14 and.
 */



/**
 * recommended
 *
 * no globals are left behind
 */

(function () {
    'use strict';


    angular.module('marksimos.translation', ['ngCookies']);


    angular.module('marksimos.translation').config(['$translateProvider',  function($translateProvider){

    // Adding a translation table for the English language
        $translateProvider.translations('en_US', {

            //Labels for Login
            "LoginPageLabelWelcome"           : "Welcome !",
            "LoginPageLabelSignIn"            : "Sign In",
            "LoginPageLabelEmail"             : "Username / Email :",
            "LoginPageLabelPassword"          : "Password :",
            "LoginPageLabelPasswordErrorInfo" : "Password Incorrect !",
            "LoginPageButtonSignIn"           : "Sign In",


            //Labels for Introduction
            "IntroPageSeminarListTitle" : "List of the Game Enrolled :",
            "IntroPageSeminarListLabelSeminarID" : "Seminar ID",
            "IntroPageSeminarListLabelSeminarDescription" : "Seminar Description",
            "IntroPageSeminarListLabelTotalRound" : "Total Round",
            "IntroPageSeminarListLabelCompetitor" : "Competitor",
            "IntroPageSeminarListLabelDateOfCommencement" : "Date of Commencement",
            "IntroPageSeminarListLabelSeminarStatus" : "Seminar Status",
            "IntroPageSeminarListLabelCountry" : "Country",
            "IntroPageSeminarListLabelProvince" : "Province(State)",
            "IntroPageSeminarListLabelCity" : "City",
            "IntroPageSeminarListLabelVenue" : "Venue",


            "IntroPageSentence1" : "Who am I?",
            "IntroPageSentence2" : "I am leading company",
            "IntroPageSentence3" : "I manage",
            "IntroPageSentence4" : "products",
            "IntroPageSentence5" : "under",
            "IntroPageSentence6" : "brands",
            "IntroPageSentence7" : "I compete with",
            "IntroPageSentence8" : "other companies",

            "IntroPageSentence21" : "My company’s mission is to get the",
            "IntroPageSentence22" : "highest Market Share",
            "IntroPageSentence23" : "and",
            "IntroPageSentence24" : "Profit",



            //Labels for Items on Home page - Top Menu Bar
            "HomePageMenuBarLabelsHome"     : "Home",
            "HomePageMenuBarLabelsReport"     : "Reports",
            "HomePageMenuBarLabelsDecision"   : "Decision",
            "HomePageMenuBarLabelsScore"      : "Score",
            "HomePageMenuBarLabelsLanguage"   : "Language",
            "HomePageMenuBarLabelsHelp"       : "Help",
            "HomePageMenuBarLabelsHelpFAQ"    : "FAQ",
            "HomePageMenuBarLabelsHelpVideo"  : "Video",
            "HomePageMenuBarLabelsHelpManual" : "Manual",
            "HomePageMenuBarLabelsAbout"      : "About MarkSimos",
            "HomePageMenuBarLabelsLogout"     : "Log Out",


            //Labels for Segment
            "HomePageSegmentLabelPriceSensitive" : "1 Price Sensitive",
            "HomePageSegmentLabelPretenders"     : "2 Pretenders",
            "HomePageSegmentLabelModerate"       : "3 Moderate",
            "HomePageSegmentLabelGoodLife"       : "4 Good Life",
            "HomePageSegmentLabelUltimate"       : "5 Ultimate",
            "HomePageSegmentLabelPragmatic"      : "6 Pragmatic",
            "HomePageSegmentLabelAllSegments"    : "All Segments",




            //Labels for Items on Home page - Second Menu Bar
            "HomePageSecondMenuBarLabelsCompany"           : "Company",
            "HomePageSecondMenuBarLabelsCompanies"         : "Companies",
            "HomePageSecondMenuBarLabelsMemberTotal"         : "Now",
            "HomePageSecondMenuBarLabelsMember"         : "members in the company to make decision",

            "HomePageSecondMenuBarLabelsTimeLeft"          : "left",
            "HomePageSecondMenuBarLabelsTimeLeftForSubmit" : "for submitting decision",
            "HomePageSecondMenuBarLabelsMission"           : "Mission: Market Share + Profit",
            "HomePageSecondMenuBarLabelsMakeDecision"      : "Make Decision",
            "HomePageSecondMenuBarCurrentPeriod"           : "Period",

            "HomePageSecondMenuBarCompareData"     : "Compare Data",
            "HomePageSecondMenuBarCompareDataBack" : "Back to Report",

            //Labels for Items on Home page - Three Boxes
            "HomePageYourCompanyTableLabel"                 : "Your Company",
            "HomePageYourCompanyCompanyStatus"              : "Company Status",
            "HomePageYourCompanyFinancialReport"            : "Financial Report",
            "HomePageYourCompanyInventoryReport"            : "Inventory Report",
            "HomePageYourCompanyProfitabilityEvolution"     : "Profitability Evolution",
            "HomePageYourCompetitorTableLabel"              : "Your Competitor",
            "HomePageYourCompetitorMarketShare"             : "Market Share",
            "HomePageYourCompetitorCompetitorIntelligence"  : "Competitor Intelligence",
            "HomePageYourCompetitorInvestmentsandProfits"   : "Investments and Profits",
            "HomePageYourCompetitorMarketSalesandInventory" : "Market Sales and Inventory",
            "HomePageMarketLandscapeTableLabel"             : "Market Landscape",
            "HomePageMarketLandscapeSegmentLeaderTop5"      : "Segment Leader Top 5",
            "HomePageMarketLandscapePerceptionMap"          : "Perception Map",
            "HomePageMarketLandscapeSegmentDistributions"   : "Segment Distributions",
            "HomePageMarketLandscapeMarketEvolution"        : "Market Evolution",
            "HomePageMarketLandscapeMarketTrends"           : "Market Trends",
            "HomePageMarketLandscapeMarketIndicators"       : "Market Indicators",


            //Labels for Items on Reports page - reports menu
            "ReportYourCompany"                : "Your Company",
            "ReportMenuCompanyStatus"          : "Company Status",
            "ReportMenuFinancialReport"        : "Financial Report",
            "ReportMenuInventoryReport"        : "Inventory Report",
            "ReportMenuProfitabilityEvolution" : "Profitability Evolution",

            "ReportYourCompetitors"            : "Your Competitors",
            "ReportMenuMarketShare"            : "Market Share",
            "ReportMenuCompetitorIntelligence" : "Competitor Intelligence",
            "ReportMenuInvestmentProfits"      : "Investment & Profits",
            "ReportMenuMarketSalesInventory"   : "Market Sales & Inventory",

            "ReportMarketLandscape"            : "Market Landscape",
            "ReportMenuSegmentLeaderTop5"      : "Segment Leader Top5",
            "ReportMenuPerceptionMap"          : "Perception Map",
            "ReportMenuSegmentDistributions"   : "Segment Distributions",
            "ReportMenuMarketEvolution"        : "Market Evolution",
            "ReportMenuMarketTrends"           : "Market Trends",
            "ReportMenuMarketIndicator"        : "Market Indicator",



            //Labels for Company Status Report Tab Menu
            "ReportTabLabelSKU"    : "SKU",
            "ReportTabLabelBrand"  : "Brand",
            "ReportTabLabelGlobal" : "Global",

            "ReportTabLabelTableChartDisplayLine"  : "Line Chart",
            "ReportTabLabelTableChartDisplayBar"   : "Bar Chart",
            "ReportTabLabelTableChartDisplayPoint" : "Point Chart",
            "ReportTabLabelTableChartDisplayArea"  : "Area Chart",
            "ReportTabLabelTableChartDisplayPie"   : "Pie Chart",

            //Labels for Company Status Report - SKU Level
            "ReportCompanyStatusSKUQuarter" : "Quarter",

            "ReportCompanyStatusSKUMarketShareValue"                             : "Market Share (value %)",
            "ReportCompanyStatusSKUMarketShareVolume"                            : "Market Share (volume %)",
            "ReportCompanyStatusSKUMarketSalesVolumeStd"                         : "Market Sales Volume (mln std. packs)",
            "ReportCompanyStatusSKULostSalesVolumeDueToOOSStd"                   : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportCompanyStatusSKUNumericalDistribution"                        : "Numerical Distribution (%)",
            "ReportCompanyStatusSKUVolumeWeightedDistribution"                   : "Volume-weighted Distribution (%)",
            "ReportCompanyStatusSKUShelfSpace"                                   : "Shelf Space (%)",
            "ReportCompanyStatusSKUAwareness"                                    : "Awareness (%)",
            "ReportCompanyStatusSKUAverageNetMarketPrice"                        : "Average Net Market Price ($/std. pack)",
            "ReportCompanyStatusSKUAverageDisplayPrice"                          : "Average Display Price ($/std. pack)",
            "ReportCompanyStatusSKUPriceRankingIndex"                            : "Price Ranking Index",
            "ReportCompanyStatusSKUTargetConsumerSegment"                        : "Target Consumer Segment",
            "ReportCompanyStatusSKUTargetConsumerSegmentExpectedValuePerception" : "Target Consumer Segment Expected Value Perception",
            "ReportCompanyStatusSKUValuePerception"                              : "Value Perception",
            "ReportCompanyStatusSKUTargetConsumerSegmentExpectedImagePerception" : "Target Consumer Segment Expected Image Perception",
            "ReportCompanyStatusSKUImagePerception"                              : "Image Perception",

            "ReportCompanyStatusSKUIngredientsQualityIndex"	:	"Ingredients Quality Index",
            "ReportCompanyStatusSKUAppliedTechnologyIndex"	:	"Applied Technology Index",

            "ReportCompanyStatusSKUMarketSalesValue"        : "Market Sales Value ($ mln)",
            "ReportCompanyStatusSKUConsumerPricePromotions" : "Consumer Price Promotions ($ mln)",
            "ReportCompanyStatusSKUMarketNetSalesValue"     : "Market Net Sales Value ($ mln)",

            "ReportCompanyStatusSKULostSalesVolumeDueToOOS"    : "Lost Sales Volume due to OOS (mln packs)",
            "ReportCompanyStatusSKUNumberOfOutOfStockEpisodes" : "Number of Out-of-stock Episodes",

            "ReportCompanyStatusSKUMarketSalesVolume"             : "Market Sales Volume (mln packs)",
            "ReportCompanyStatusSKURetailersPurchasesVolume"      : "Retailers Purchases Volume (mln packs)",
            "ReportCompanyStatusSKUShipmentsToWholesalers"        : "Shipments to Wholesalers (mln packs)",
            "ReportCompanyStatusSKUProductionVolume"              : "Production Volume (mln packs)",
            "ReportCompanyStatusSKUInventoryVolumeAtManufacturer" : "Inventory Volume At Manufacturer (mln packs)",
            "ReportCompanyStatusSKUInventoryVolumeAtWholesalers"  : "Inventory Volume At Wholesalers (mln packs)",
            "ReportCompanyStatusSKUInventoryVolumeAtRetailers"    : "Inventory Volume At Retailers (mln packs)",

            "ReportCompanyStatusSKUStocksCoverAtRetailers"   : "Stocks Cover At Retailers (weeks)",
            "ReportCompanyStatusSKUStocksCoverAtWholesalers" : "Stocks Cover At Wholesalers (weeks)",

            //Labels for Company Status Report - Brand Level
            "ReportCompanyStatusBrandMarketShareValue"           : "Market Share (value %)",
            "ReportCompanyStatusBrandMarketShareVolume"          : "Market Share (volume %)",
            "ReportCompanyStatusBrandMarketSalesVolumeStd"       : "Market Sales Volume (mln std. packs)",
            "ReportCompanyStatusBrandLostSalesVolumeDueToOOSStd" : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportCompanyStatusBrandNumericalDistribution"      : "Numerical Distribution (%)",
            "ReportCompanyStatusBrandVolumeWeightedDistribution" : "Volume-weighted Distribution (%)",
            "ReportCompanyStatusBrandShelfSpace"                 : "Shelf Space (%)",
            "ReportCompanyStatusBrandAwareness"                  : "Awareness (%)",
            "ReportCompanyStatusBrandAverageNetMarketPrice"      : "Average Net Market Price ($/std. pack)",
            "ReportCompanyStatusBrandAverageDisplayPrice"        : "Average Display Price ($/std. pack)",
            "ReportCompanyStatusBrandPriceRankingIndex"          : "Price Ranking Index",
            "ReportCompanyStatusBrandValuePerception"            : "Value Perception",
            "ReportCompanyStatusBrandImagePerception"            : "Image Perception",
            "ReportCompanyStatusBrandIngredientsQualityIndex"    : "Ingredients Quality Index",
            "ReportCompanyStatusBrandAppliedTechnologyIndex"     : "Applied Technology Index",

            "ReportCompanyStatusBrandMarketSalesValue"        : "Market Sales Value ($ mln)",
            "ReportCompanyStatusBrandConsumerPricePromotions" : "Consumer Price Promotions ($ mln)",
            "ReportCompanyStatusBrandMarketNetSalesValue"     : "Market Net Sales Value ($ mln)",

            "ReportCompanyStatusBrandLostSalesVolumeDueToOOS"    : "Lost Sales Volume due to OOS (mln packs)",
            "ReportCompanyStatusBrandNumberOfOutOfStockEpisodes" : "Number of Out-of-stock Episodes",

            "ReportCompanyStatusBrandMarketSalesVolume"             : "Market Sales Volume (mln packs)",
            "ReportCompanyStatusBrandRetailersPurchasesVolume"      : "Retailers Purchases Volume (mln packs)",
            "ReportCompanyStatusBrandShipmentsToWholesalers"        : "Shipments to Wholesalers (mln packs)",
            "ReportCompanyStatusBrandProductionVolume"              : "Production Volume (mln packs)",
            "ReportCompanyStatusBrandInventoryVolumeAtManufacturer" : "Inventory Volume At Manufacturer (mln packs)",
            "ReportCompanyStatusBrandInventoryVolumeAtWholesalers"  : "Inventory Volume At Wholesalers (mln packs)",
            "ReportCompanyStatusBrandInventoryVolumeAtRetailers"    : "Inventory Volume At Retailers (mln packs)",

            "ReportCompanyStatusBrandStocksCoverAtRetailers"   : "Stocks Cover At Retailers (weeks)",
            "ReportCompanyStatusBrandStocksCoverAtWholesalers" : "Stocks Cover At Wholesalers (weeks)",

            //Labels for Company Status Report - Global Level
            "ReportCompanyStatusGlobalMarketShareValue"           : "Market Share (value %)",
            "ReportCompanyStatusGlobalMarketShareVolume"          : "Market Share (volume %)",
            "ReportCompanyStatusGlobalMarketSalesVolumeStd"       : "Market Sales Volume (mln std. packs)",
            "ReportCompanyStatusGlobalLostSalesVolumeDueToOOSStd" : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportCompanyStatusGlobalNumericalDistribution"      : "Numerical Distribution (%)",
            "ReportCompanyStatusGlobalVolumeWeightedDistribution" : "Volume-weighted Distribution (%)",
            "ReportCompanyStatusGlobalShelfSpace"                 : "Shelf Space (%)",
            "ReportCompanyStatusGlobalMindSpaceShare"             : "Mind Space Share (%)",
            "ReportCompanyStatusGlobalAverageNetMarketPrice"      : "Average Net Market Price ($/std. pack)",
            "ReportCompanyStatusGlobalAverageDisplayPrice"        : "Average Display Price ($/std. pack)",
            "ReportCompanyStatusGlobalIngredientsQualityIndex"    : "Ingredients Quality Index",
            "ReportCompanyStatusGlobalAppliedTechnologyIndex"     : "Applied Technology Index",

            "ReportCompanyStatusGlobalMarketSalesValue"	:	"Market Sales Value ($ mln)",
            "ReportCompanyStatusGlobalConsumerPricePromotions"	:	"Consumer Price Promotions ($ mln)",
            "ReportCompanyStatusGlobalMarketNetSalesValue"	:	"Market Net Sales Value ($ mln)",

            "ReportCompanyStatusGlobalLostSalesVolumeDueToOOS"	:	"Lost Sales Volume due to OOS (mln packs)",

            "ReportCompanyStatusGlobalMarketSalesVolume"	:	"Market Sales Volume (mln packs)",
            "ReportCompanyStatusGlobalRetailersPurchasesVolume"	:	"Retailers Purchases Volume (mln packs)",
            "ReportCompanyStatusGlobalShipmentsToWholesalers"	:	"Shipments to Wholesalers (mln packs)",
            "ReportCompanyStatusGlobalProductionVolume"	:	"Production Volume (mln packs)",
            "ReportCompanyStatusGlobalInventoryVolumeAtManufacturer"	:	"Inventory Volume At Manufacturer (mln packs)",
            "ReportCompanyStatusGlobalInventoryVolumeAtWholesalers"	:	"Inventory Volume At Wholesalers (mln packs)",
            "ReportCompanyStatusGlobalInventoryVolumeAtRetailers"	:	"Inventory Volume At Retailers (mln packs)",

            "ReportCompanyStatusGlobalStocksCoverAtRetailers"	:	"Stocks Cover At Retailers (weeks)",
            "ReportCompanyStatusGlobalStocksCoverAtWholesalers"	:	"Stocks Cover At Wholesalers (weeks)",

            //Labels for Financial Report - Brand Level
            "ReportFinancialReportBrandSalesValue"                           : "Sales Value ($ mln)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodSalesValue" : "(%) Change Versus Previous period",
            "ReportFinancialReportBrandShareInBrandTotalSalesValue"          : "Share In Brand Total Sales Value (%)",
            "ReportFinancialReportBrandCostOfGoodsSold"                      : "Cost of Goods Sold ($ mln)",
            "ReportFinancialReportBrandObsoleteGoodsCost"                    : "Obsolete Goods Cost ($ mln)",
            "ReportFinancialReportBrandDiscontinuedGoodsCost"                : "Discontinued Goods Cost ($ mln)",
            "ReportFinancialReportBrandInventoryHoldingCost"                 : "Inventory Holding Cost ($ mln)",
            "ReportFinancialReportBrandTotalMaterialCost"                    : "Total Material Cost ($ mln)",

            "ReportFinancialReportBrandGrossProfit"                           : "Gross Profit ($ mln)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodGrossProfit" : "(%) Change Versus Previous Period",
            "ReportFinancialReportBrandGrossProfitMargin"                     : "Gross Profit Margin (%)",
            "ReportFinancialReportBrandShareInBrandGrossProfitLosses"         : "Share In Brand Gross Profit/Losses (%)",

            "ReportFinancialReportBrandAdvertising"                                  : "Advertising ($ mln)",
            "ReportFinancialReportBrandConsumerPromotionCost"                        : "Consumer Promotion Cost ($ mln)",
            "ReportFinancialReportBrandTradeInvestment"                              : "Trade Investment ($ mln)",
            "ReportFinancialReportBrandSalesForceCost"                               : "Sales Force Cost ($ mln)",
            "ReportFinancialReportBrandAdditionalTradeMarginCost"                    : "Additional Trade Margin Cost ($ mln)",
            "ReportFinancialReportBrandVolumeDiscountCost"                           : "Volume Discount Cost ($ mln)",
            "ReportFinancialReportBrandTotalTradeAndMarketingExpenses"               : "Total Trade and Marketing Expenses ($ mln)",
            "ReportFinancialReportBrandTradeAndMarketingExpensesasaOfSales"          : "Trade and Marketing Expenses as a (%) of Sales",
            "ReportFinancialReportBrandShareOfTradeAndMarketingExpensesInBrandTotal" : "Share of Trade and Marketing Expenses in Brand Total (%)",

            "ReportFinancialReportBrandGeneralExpenses" : "General Expenses ($ mln)",
            "ReportFinancialReportBrandAmortisation"    : "Amortisation ($ mln)",

            "ReportFinancialReportBrandOperatingProfit"                           : "Operating Profit ($ mln)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodOperatingProfit" : "(%) Change Versus Previous period",
            "ReportFinancialReportBrandOperatingProfitMargin"                     : "Operating Profit Margin (%)",
            "ReportFinancialReportBrandShareInBrandOperatingProfitLoss"           : "Share in Brand Operating Profit/Loss (%)",

            "ReportFinancialReportBrandInterests"             : "Interests ($ mln)",
            "ReportFinancialReportBrandTaxes"                 : "Taxes ($ mln)",
            "ReportFinancialReportBrandExceptionalCostProfit" : "Exceptional Cost/Profit ($ mln)",

            "ReportFinancialReportBrandNetProfit"                           : "Net Profit ($ mln)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodNetProfit" : "(%) Change Versus Previous period",
            "ReportFinancialReportBrandNetProfitMargin"                     : "Net Profit Margin (%)",
            "ReportFinancialReportBrandShareInBrandNetProfitLoss"           : "Share in Brand Net Profit/Loss (%)",

            "ReportFinancialReportBrandProductionCost" : "Production Cost ($ mln)",
            "ReportFinancialReportBrandInventoryValue" : "Inventory Value ($ mln)",

            //Labels for Financial Report - All Brands
            "ReportFinancialReportAllBrandSalesValue"                           : "Sales Value ($ mln)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodSalesValue" : "(%) Change Versus Previous period",
            "ReportFinancialReportAllBrandShareInCompanyTotalSalesValue"        : "Share In Company Total Sales Value (%)",
            "ReportFinancialReportAllBrandCostOfGoodsSold"                      : "Cost of Goods Sold ($ mln)",
            "ReportFinancialReportAllBrandObsoleteGoodsCost"                    : "Obsolete Goods Cost ($ mln)",
            "ReportFinancialReportAllBrandDiscontinuedGoodsCost"                : "Discontinued Goods Cost ($ mln)",
            "ReportFinancialReportAllBrandInventoryHoldingCost"                 : "Inventory Holding Cost ($ mln)",
            "ReportFinancialReportAllBrandTotalMaterialCost"                    : "Total Material Cost ($ mln)",

            "ReportFinancialReportAllBrandGrossProfit"                           : "Gross Profit ($ mln)",
            "ReportFinancialReportAllBrandChangeVersusPreviousperiodGrossProfit" : "(%) Change Versus Previous period",
            "ReportFinancialReportAllBrandGrossProfitMargin"                     : "Gross Profit Margin (%)",
            "ReportFinancialReportAllBrandShareInCompanyGrossProfitLosses"       : "Share In Company Gross Profit/Losses (%)",

            "ReportFinancialReportAllBrandAdvertising"                                  : "Advertising ($ mln)",
            "ReportFinancialReportAllBrandConsumerPromotionCost"                        : "Consumer Promotion Cost ($ mln)",
            "ReportFinancialReportAllBrandTradeInvestment"                              : "Trade Investment ($ mln)",
            "ReportFinancialReportAllBrandSalesForceCost"                               : "Sales Force Cost ($ mln)",
            "ReportFinancialReportAllBrandAdditionalTradeMarginCost"                    : "Additional Trade Margin Cost ($ mln)",
            "ReportFinancialReportAllBrandVolumeDiscountCost"                           : "Volume Discount Cost ($ mln)",
            "ReportFinancialReportAllBrandTotalTradeAndMarketingExpenses"               : "Total Trade and Marketing Expenses ($ mln)",
            "ReportFinancialReportAllBrandTradeAndMarketingExpensesasaOfSales"          : "Trade and Marketing Expenses as a (%) of Sales",
            "ReportFinancialReportAllBrandShareOfTradeAndMarketingExpensesInBrandTotal" : "Share of Trade and Marketing Expenses in Company Total (%)",

            "ReportFinancialReportAllBrandGeneralExpenses" : "General Expenses ($ mln)",
            "ReportFinancialReportAllBrandAmortisation"    : "Amortisation ($ mln)",

            "ReportFinancialReportAllBrandOperatingProfit"                           : "Operating Profit ($ mln)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodOperatingProfit" : "(%) Change Versus Previous period",
            "ReportFinancialReportAllBrandOperatingProfitMargin"                     : "Operating Profit Margin (%)",
            "ReportFinancialReportAllBrandShareInBrandOperatingProfitLoss"           : "Share in Company Operating Profit/Loss (%)",

            "ReportFinancialReportAllBrandInterests"             : "Interests ($ mln)",
            "ReportFinancialReportAllBrandTaxes"                 : "Taxes ($ mln)",
            "ReportFinancialReportAllBrandExceptionalCostProfit" : "Exceptional Cost/Profit ($ mln)",

            "ReportFinancialReportAllBrandNetProfit"                           : "Net Profit ($ mln)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodNetProfit" : "(%) Change Versus Previous period",
            "ReportFinancialReportAllBrandNetProfitMargin"                     : "Net Profit Margin (%)",
            "ReportFinancialReportAllBrandShareInCompanyNetProfitLoss"     : "Share in Company Net Profit/Loss (%)",

            "ReportFinancialReportAllBrandProductionCost" : "Production Cost ($ mln)",
            "ReportFinancialReportAllBrandInventoryValue" : "Inventory Value ($ mln)",

            //Labels for Inventory Report
            "ReportInventoryReportLabelCloseToExpireInventory" : "Close to Expire Inventory",
    //        "ReportInventoryReportLabelPreviousInventory"      : "Previous Inventory",
            "ReportInventoryReportLabelPreviousInventory"      : "Close to Expire Inventory",
            "ReportInventoryReportLabelFreshInventory"         : "Fresh Inventory",
            "ReportInventoryReportTableLabelX"                 : "Total Stock (millions of standard pack) = Factory Stock + Trade Stock + Retailer Stock",
            "ReportInventoryReportTableLabelY"                 : "Million Units",


            //Labels for Profitability Evolution - SKU Level
            "ReportProfitabilityEvolutionSKUQuarter" : "Quarter",

            "ReportProfitabilityEvolutionSKUManufacturerSalesValue" : "Manufacturer Sales Value ($ mln)",

            "ReportProfitabilityEvolutionSKUCostOfGoodsSold"       : "Cost of Goods Sold ($ mln)",
            "ReportProfitabilityEvolutionSKUInventoryHolding"      : "Inventory Holding ($ mln)",
            "ReportProfitabilityEvolutionSKUObsoleteGoods"         : "Obsolete Goods ($ mln)",
            "ReportProfitabilityEvolutionSKUDiscontinuedGoodsCost" : "Discontinued Goods Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUGrossProfit"           : "Gross Profit ($ mln)",

            "ReportProfitabilityEvolutionSKUAdvertising"                    : "Advertising ($ mln)",
            "ReportProfitabilityEvolutionSKUConsumerPromotionsCost"         : "Consumer Promotions Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUTradeInvestment"                : "Trade Investment ($ mln)",
            "ReportProfitabilityEvolutionSKUSalesForceCost"                 : "Sales Force Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUVolumeDiscountCost"             : "Volume Discount Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUAdditionalTradeMarginCost"      : "Additional Trade Margin Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUTotalTradeAndMarketingExpenses" : "Total Trade and Marketing Expenses ($ mln)",

            "ReportProfitabilityEvolutionSKUGeneralExpenses" : "General Expenses ($ mln)",
            "ReportProfitabilityEvolutionSKUAmortisation"    : "Amortisation ($ mln)",
            "ReportProfitabilityEvolutionSKUOperatingProfit" : "Operating Profit ($ mln)",

            "ReportProfitabilityEvolutionSKUInterests"             : "Interests ($ mln)",
            "ReportProfitabilityEvolutionSKUExceptionalCostProfit" : "Exceptional Cost/Profit ($ mln)",
            "ReportProfitabilityEvolutionSKUTaxes"                 : "Taxes ($ mln)",
            "ReportProfitabilityEvolutionSKUNetProfit"             : "Net Profit ($ mln)",

            "ReportProfitabilityEvolutionSKUSurchargeForSupplementaryInvestmentBudget"	:	"Surcharge for supplementary InvestmentBudget ($ mln)",
            "ReportProfitabilityEvolutionSKUNetResult"	:	"Net Result ($ mln)",

            "ReportProfitabilityEvolutionSKUShareInBrandTotalSalesValue"                  : "Share In Brand Total Sales Value (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandGrossProfitLosses"                : "Share In Brand Gross Profit/Losses (%)",
            "ReportProfitabilityEvolutionSKUShareOfTradeAndMarketingExpensesInBrandTotal" : "Share of Trade and Marketing Expenses In Brand Total (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandOperatingProfitLosses"            : "Share In Brand Operating Profit/Losses (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandNetProfitLosses"                  : "Share In Brand Net Profit/Losses (%)",

            "ReportProfitabilityEvolutionSKUGrossProfitMargin"                   : "Gross Profit Margin (%)",
            "ReportProfitabilityEvolutionSKUTradeAndMarketingExpensesasaOfSales" : "Trade and Marketing Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionSKUGeneralExpensesasaOfSales"           : "General Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionSKUOperatingProfitMargin"               : "Operating Profit Margin (%)",
            "ReportProfitabilityEvolutionSKUNetProfitMargin"                     : "Net Profit Margin (%)",

            "ReportProfitabilityEvolutionSKUReturnOnInvestment" : "Return on Investment (%)",

            "ReportProfitabilityEvolutionSKUAverageNetMarketPrice"             : "Average Net Market Price ($/pack)",
            "ReportProfitabilityEvolutionSKUAverageWholesalesPrice"            : "Average Wholesales Price ($/pack)",
            "ReportProfitabilityEvolutionSKUAverageManufacturerPrice"          : "Average Manufacturer Price ($/pack)",
            "ReportProfitabilityEvolutionSKUAverageProductionCost"             : "Average Production Cost ($/pack)",
            "ReportProfitabilityEvolutionSKUMarketSalesValue"                  : "Market Sales Value ($ mln)",
            "ReportProfitabilityEvolutionSKUConsumerPricePromotions"           : "Consumer Price Promotions ($ mln)",
            "ReportProfitabilityEvolutionSKUMarketNetSalesValue"               : "Market Net Sales Value ($ mln)",
            "ReportProfitabilityEvolutionSKUAdditionalRetailersMargin"         : "Additional Retailers Margin (%)",
            "ReportProfitabilityEvolutionSKUWholesalersBonusRate"              : "Wholesalers Bonus Rate (%)",
            "ReportProfitabilityEvolutionSKUMinimalPurchaseQualifyingForBonus" : "Minimal Purchase Qualifying for Bonus (mln std. packs)",
            "ReportProfitabilityEvolutionSKUProductionCost"                    : "Production Cost ($ mln)",
            "ReportProfitabilityEvolutionSKUInventoryValue"                    : "Inventory Value ($ mln)",

            //Labels for Profitability Evolution - Brand Level
            "ReportProfitabilityEvolutionBrandManufacturerSalesValue" : "Manufacturer Sales Value ($ mln)",

            "ReportProfitabilityEvolutionBrandCostOfGoodsSold"       : "Cost of Goods Sold ($ mln)",
            "ReportProfitabilityEvolutionBrandInventoryHolding"      : "Inventory Holding ($ mln)",
            "ReportProfitabilityEvolutionBrandObsoleteGoods"         : "Obsolete Goods ($ mln)",
            "ReportProfitabilityEvolutionBrandDiscontinuedGoodsCost" : "Discontinued Goods Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandGrossProfit"           : "Gross Profit ($ mln)",

            "ReportProfitabilityEvolutionBrandAdvertising"                    : "Advertising ($ mln)",
            "ReportProfitabilityEvolutionBrandConsumerPromotionsCost"         : "Consumer Promotions Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandTradeInvestment"                : "Trade Investment ($ mln)",
            "ReportProfitabilityEvolutionBrandSalesForceCost"                 : "Sales Force Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandVolumeDiscountCost"             : "Volume Discount Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandAdditionalTradeMarginCost"      : "Additional Trade Margin Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandTotalTradeAndMarketingExpenses" : "Total Trade and Marketing Expenses ($ mln)",

            "ReportProfitabilityEvolutionBrandGeneralExpenses" : "General Expenses ($ mln)",
            "ReportProfitabilityEvolutionBrandAmortisation"    : "Amortisation ($ mln)",
            "ReportProfitabilityEvolutionBrandOperatingProfit" : "Operating Profit ($ mln)",

            "ReportProfitabilityEvolutionBrandInterests"             : "Interests ($ mln)",
            "ReportProfitabilityEvolutionBrandExceptionalCostProfit" : "Exceptional Cost/Profit ($ mln)",
            "ReportProfitabilityEvolutionBrandTaxes"                 : "Taxes ($ mln)",
            "ReportProfitabilityEvolutionBrandNetProfit"             : "Net Profit ($ mln)",

            "ReportProfitabilityEvolutionBrandSurchargeForSupplementaryInvestmentBudget" : "Surcharge for supplementary InvestmentBudget ($ mln)",
            "ReportProfitabilityEvolutionBrandNetResult"                                 : "Net Result ($ mln)",

            "ReportProfitabilityEvolutionBrandShareInCompanyTotalSalesValue"                  : "Share In Company Total Sales Value (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyGrossProfitLosses"                : "Share In Company Gross Profit/Losses (%)",
            "ReportProfitabilityEvolutionBrandShareOfTradeAndMarketingExpensesInCompanyTotal" : "Share of Trade and Marketing Expenses In Company Total (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyOperatingProfitLosses"            : "Share In Company Operating Profit/Losses (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyNetProfitLosses"                  : "Share In Company Net Profit/Losses (%)",

            "ReportProfitabilityEvolutionBrandGrossProfitMargin"                   : "Gross Profit Margin (%)",
            "ReportProfitabilityEvolutionBrandTradeAndMarketingExpensesasaOfSales" : "Trade and Marketing Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionBrandGeneralExpensesasaOfSales"           : "General Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionBrandOperatingProfitMargin"               : "Operating Profit Margin (%)",
            "ReportProfitabilityEvolutionBrandNetProfitMargin"                     : "Net Profit Margin (%)",

            "ReportProfitabilityEvolutionBrandReturnOnInvestment" : "Return on Investment (%)",

            "ReportProfitabilityEvolutionBrandAverageNetMarketPrice"    : "Average Net Market Price ($/pack)",
            "ReportProfitabilityEvolutionBrandAverageWholesalesPrice"   : "Average Wholesales Price ($/pack)",
            "ReportProfitabilityEvolutionBrandAverageManufacturerPrice" : "Average Manufacturer Price ($/pack)",
            "ReportProfitabilityEvolutionBrandAverageProductionCost"    : "Average Production Cost ($/pack)",

            "ReportProfitabilityEvolutionBrandMarketSalesValue"        : "Market Sales Value ($ mln)",
            "ReportProfitabilityEvolutionBrandConsumerPricePromotions" : "Consumer Price Promotions ($ mln)",
            "ReportProfitabilityEvolutionBrandMarketNetSalesValue"     : "Market Net Sales Value ($ mln)",

            "ReportProfitabilityEvolutionBrandProductionCost"                    : "Production Cost ($ mln)",
            "ReportProfitabilityEvolutionBrandInventoryValue"                    : "Inventory Value ($ mln)",


            //Labels for Profitability Evolution - Global Level
            "ReportProfitabilityEvolutionGlobalManufacturerSalesValue" : "Manufacturer Sales Value ($ mln)",
            "ReportProfitabilityEvolutionGlobalCostOfGoodsSold"        : "Cost of Goods Sold ($ mln)",
            "ReportProfitabilityEvolutionGlobalInventoryHolding"       : "Inventory Holding ($ mln)",
            "ReportProfitabilityEvolutionGlobalObsoleteGoods"          : "Obsolete Goods ($ mln)",
            "ReportProfitabilityEvolutionGlobalDiscontinuedGoodsCost"  : "Discontinued Goods Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalGrossProfit"            : "Gross Profit ($ mln)",

            "ReportProfitabilityEvolutionGlobalAdvertising"                    : "Advertising ($ mln)",
            "ReportProfitabilityEvolutionGlobalConsumerPromotionsCost"         : "Consumer Promotions Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalTradeInvestment"                : "Trade Investment ($ mln)",
            "ReportProfitabilityEvolutionGlobalSalesForceCost"                 : "Sales Force Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalVolumeDiscountCost"             : "Volume Discount Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalAdditionalTradeMarginCost"      : "Additional Trade Margin Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalTotalTradeAndMarketingExpenses" : "Total Trade and Marketing Expenses ($ mln)",

            "ReportProfitabilityEvolutionGlobalOverhead"                                 : "Overhead ($ mln)",
            "ReportProfitabilityEvolutionGlobalInvestmentToImproveTechnologyLevel"       : "Investment to Improve Technology Level ($ mln)",
            "ReportProfitabilityEvolutionGlobalInvestmentToIncreaseProductionEfficiency" : "Investment to Increase Production Efficiency ($ mln)",

            "ReportProfitabilityEvolutionGlobalProductionCapacityDisposalCost" : "Production Capacity Disposal Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalOvertimeShiftsCost"             : "Overtime Shifts Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalTotalGeneralExpenses"           : "Total General Expenses ($ mln)",
            "ReportProfitabilityEvolutionGlobalAmortisation"                   : "Amortisation ($ mln)",
            "ReportProfitabilityEvolutionGlobalOperatingProfit"                : "Operating Profit ($ mln)",

            "ReportProfitabilityEvolutionGlobalInterests"             : "Interests ($ mln)",
            "ReportProfitabilityEvolutionGlobalExceptionalCostProfit" : "Exceptional Cost/Profit ($ mln)",
            "ReportProfitabilityEvolutionGlobalTaxes"                 : "Taxes ($ mln)",
            "ReportProfitabilityEvolutionGlobalNetProfit"             : "Net Profit ($ mln)",

            "ReportProfitabilityEvolutionGlobalSurchargeForSupplementaryInvestmentBudget" : "Surcharge for supplementary InvestmentBudget ($ mln)",
            "ReportProfitabilityEvolutionGlobalNetResult"                                 : "Net Result ($ mln)",

            "ReportProfitabilityEvolutionGlobalGrossProfitMargin"                   : "Gross Profit Margin (%)",
            "ReportProfitabilityEvolutionGlobalTradeAndMarketingExpensesasaOfSales" : "Trade and Marketing Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionGlobalGeneralExpensesasaOfSales"           : "General Expenses as a(%) of Sales",
            "ReportProfitabilityEvolutionGlobalOperatingProfitMargin"               : "Operating Profit Margin (%)",
            "ReportProfitabilityEvolutionGlobalNetProfitMargin"                     : "Net Profit Margin (%)",

            "ReportProfitabilityEvolutionGlobalReturnOnInvestment" : "Return on Investment (%)",

            "ReportProfitabilityEvolutionGlobalAverageNetMarketPrice"    : "Average Net Market Price ($/pack)",
            "ReportProfitabilityEvolutionGlobalAverageWholesalesPrice"   : "Average Wholesales Price ($/pack)",
            "ReportProfitabilityEvolutionGlobalAverageManufacturerPrice" : "Average Manufacturer Price ($/pack)",
            "ReportProfitabilityEvolutionGlobalAverageProductionCost"    : "Average Production Cost ($/pack)",

            "ReportProfitabilityEvolutionGlobalMarketSalesValue"        : "Market Sales Value ($ mln)",
            "ReportProfitabilityEvolutionGlobalConsumerPricePromotions" : "Consumer Price Promotions ($ mln)",
            "ReportProfitabilityEvolutionGlobalMarketNetSalesValue"     : "Market Net Sales Value ($ mln)",

            "ReportProfitabilityEvolutionGlobalProductionCost" : "Production Cost ($ mln)",
            "ReportProfitabilityEvolutionGlobalInventoryValue" : "Inventory Value ($ mln)",

            "ReportProfitabilityEvolutionGlobalCapacityUtilisationRate"         : "Capacity Utilisation Rate (%)",
            "ReportProfitabilityEvolutionGlobalChangeInProductionCapacity"      : "Change In Production Capacity (mln std. packs)",
            "ReportProfitabilityEvolutionGlobalNextPeriodAvailableProdCapacity" : "Next Period Available Prod. Capacity (mln std. packs)",

            "ReportProfitabilityEvolutionGlobalAvailableTechnologyLevel"                             : "Available Technology Level",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseTechnologyLevelBy1Step"  : "Extra Budget Required to Increase Technology Level by 1 Step",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseTechnologyLevelBy2Steps" : "Extra Budget Required to Increase Technology Level by 2 Steps",

            "ReportProfitabilityEvolutionGlobalAcquiredProductionAndLogisticsEfficiency"         : "Acquired Production and Logistics Efficiency (%)",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseEfficiencyBy2points" : "Extra Budget Required to Increase Efficiency by 2% points",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseEfficiencyBy5points" : "Extra Budget Required to Increase Efficiency by 5% points",

            "ReportProfitabilityEvolutionGlobalAcquiredProductionPlanningFlexibility"             : "Acquired Production Planning Flexibility (%)",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseFlexibilityBy2points" : "Extra Budget Required to Increase Flexibility by 2% points",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseFlexibilityBy5points" : "Extra Budget Required to Increase Flexibility by 5% points",

            //Labels for Market Share
            "ReportMarketShareChartTitleMarketShareInValue"  : "Market Share in Value (%)",
            "ReportMarketShareChartTitleMarketShareInVolume" : "Market Share in Volume (%)",
            "ReportMarketShareChartTitleMindSpaceShare"      : "Mind Space Share (%)",
            "ReportMarketShareChartTitleShelfSpaceShare"     : "Shelf Space Share (%)",

            //Labels for Competitor Intelligence
            "ReportCompetitorIntelligenceTableTitleTechnology"                               : "Technology",
            "ReportCompetitorIntelligenceTechnologyAcquiredProductionAndLogisticsEfficiency" : "Acquired Production and Logistics Efficiency (%)",
            "ReportCompetitorIntelligenceTechnologyAcquiredProductionPlanningFlexibility"    : "Acquired Production Planning Flexibility (%)",
            "ReportCompetitorIntelligenceTechnologyAvailableTechnologyLevel"                 : "Available Technology Level",

            "ReportCompetitorIntelligenceTableTitleMarketingSales"                : "Marketing & Sales",
            "ReportCompetitorIntelligenceMarketingSalesAdditionalTradeMarginCost" : "Additional Trade Margin Cost ($ mln)",
            "ReportCompetitorIntelligenceMarketingSalesAdvertising"               : "Advertising ($ mln)",
            "ReportCompetitorIntelligenceMarketingSalesConsumerPromotionsCost"    : "Consumer Promotions Cost ($ mln)",
            "ReportCompetitorIntelligenceMarketingSalesRetailerPurchaseVolume"    : "Retailers Purchase Volume (mln std. packs)",
            "ReportCompetitorIntelligenceMarketingSalesSalesForceCost"            : "Sales Force Cost ($ mln)",
            "ReportCompetitorIntelligenceMarketingSalesShipmentToWholesalers"     : "Shipments to Wholesalers (mln std. packs)",
            "ReportCompetitorIntelligenceMarketingSalesTradeInvestments"          : "Trade Investments ($ mln)",
            "ReportCompetitorIntelligenceMarketingSalesVolumeDiscountCost"        : "Volume Discount Cost ($ mln)",

            "ReportCompetitorIntelligenceTableTitleOperations"                      : "Operations",
            "ReportCompetitorIntelligenceOperationsCapacityUtilisationRate"         : "Capacity Utilisation Rate (%)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtManufacturer"   : "Inventory Volume at Manufacturer (mln std. packs)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtRetailers"      : "Inventory Volume at Retailers (mln std. packs)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtWholesalers"    : "Inventory Volume at Wholesalers (mln std. packs)",
            "ReportCompetitorIntelligenceOperationsNextPeriodAvailableProdCapacity" : "Next Period Available Prod.Capacity (mln std. packs)",
            "ReportCompetitorIntelligenceOperationsProductionVolume"                : "Production Volume (mln std. packs)",

            "ReportCompetitorIntelligenceTableTitleInvestments"                               : "Investments",
            "ReportCompetitorIntelligenceInvestmentsInvestmentToImproveTechnologyLevel"       : "Investment to Improve Technology Level ($ mln)",
            "ReportCompetitorIntelligenceInvestmentsInvestmentToIncreaseProductionEfficiency" : "Investment to Increase Production Efficiency ($ mln)",

            //Labels for Investments and Profits
            "ReportInvestmentsAndProfitsChartTitleTotalInvestment"        : "Total Investment ($ mln)",
            "ReportInvestmentsAndProfitsChartTitleNetProfitByCompanies"   : "Net Profit By Companies ($ mln)",
            "ReportInvestmentsAndProfitsChartTitleReturnOnInvestment"     : "Return on Investment (%)",
            "ReportInvestmentsAndProfitsChartTitleInvestmentVersusBudget" : "Investment Versus Budget (%)",

            //Labels for Market Sales and Inventory
            "ReportMarketSalesAndInventoryChartTitleMarketSalesValue"        : "Market Sales Value ($ mln)",
            "ReportMarketSalesAndInventoryChartTitleMarketSalesVolume"       : "Market Sales Volume (mln std. packs)",
            "ReportMarketSalesAndInventoryChartTitleTotalInventoryAtFactory" : "Total Inventory at Factory (mln std. packs)",
            "ReportMarketSalesAndInventoryChartTitleTotalInventoryAtTrade"   : "Total Inventory at Trade (mln std. packs)",
            "ReportMarketSalesAndInventoryChartBottomTextPeriod"   : "Period",

            //Labels for Segment Leader Top 5
            "ReportSegmentLeaderTop5ChartTitlePriceSensitive" : "1. Price Sensitive (%)",
            "ReportSegmentLeaderTop5ChartTitlePretenders"     : "2. Pretenders (%)",
            "ReportSegmentLeaderTop5ChartTitleModerate"       : "3. Moderate (%)",
            "ReportSegmentLeaderTop5ChartTitleGoodLife"       : "4. Good Life (%)",
            "ReportSegmentLeaderTop5ChartTitleUltimate"       : "5. Ultimate (%)",
            "ReportSegmentLeaderTop5ChartTitlePragmatic"      : "6. Pragmatic (%)",

            //Labels for Perception Map
            "ReportPerceptionMapAxisLabelSegment"         : "Segment",
            "ReportPerceptionMapAxisTitleValuePerception" : "Value Perception",
            "ReportPerceptionMapAxisTitleImagePerception" : "Image Perception",
            "ReportPerceptionMapHoverTooltipMarketShareValue" : "Market Share (Value %)",
            "ReportPerceptionMapHoverTooltipAverageDisplayPrice" : "Average Display Price",
            "ReportPerceptionMapHoverTooltipAppliedTechnologyIndex" : "Applied Technology Index",
            "ReportPerceptionMapHoverTooltipIngredientsQualityIndex" : "Ingredients Quality Index",
            "ReportPerceptionMapHoverTooltipAwareness" : "Awareness (%)",
            "ReportPerceptionMapHoverTooltipShelfSpace" : "Shelf Space (%)",
            "ReportPerceptionMapHoverTooltipValuePerceptionChange" : "Value Perception Change",
            "ReportPerceptionMapHoverTooltipImagePerceptionChange" : "Image Perception Change",

            //Labels for Segment Distributions
            "ReportSegmentDistributionsTableTitleMarketShareValue"      : "Market Share (value %)",
            "ReportSegmentDistributionsTableTitleMarketShareVolume"     : "Market Share (volume %)",
            "ReportSegmentDistributionsTableTitleMarketSalesValue"      : "Market Sales Value ($ mln)",
            "ReportSegmentDistributionsTableTitleMarketSalesVolume"     : "Market Sales Volume (mln std. packs)",
            "ReportSegmentDistributionsTableTitleAverageNetMarketPrice" : "Average Net Market Price ($/std. pack)",
            "ReportSegmentDistributionsTableTitleValuePerception"       : "Value Perception",
            "ReportSegmentDistributionsTableTitleImagePerception"       : "Image Perception",

            //Labels for Market Evolution
            "ReportMarketEvolutionChartTitleGrowthRateInVolume"             : "Growth Rate In Volume (Period -3 = 100)",
            "ReportMarketEvolutionChartTitleGrowthRateInValue"              : "Growth Rate In Value (Period -3 = 100)",
            "ReportMarketEvolutionChartTitleNetMarketPrice"                 : "Net Market Price (Period -3 = 100)",
            "ReportMarketEvolutionChartTitleSegmentValueShareInTotalMarket" : "Segment Value Share In Total Market (%)",

            //Labels for Market Trends - SKU Level
            "ReportMarketTrendsSKUTableTitleMarketFigures"            : "Market Figures", //Market Figures
            "ReportMarketTrendsSKUMarketFiguresAverageDisplayPrice"   : "Average Display Price ($/std. pack)",
            "ReportMarketTrendsSKUMarketFiguresAverageNetMarketPrice" : "Average Net Market Price ($/std. pack)",
            "ReportMarketTrendsSKUMarketFiguresBrandAwareness"        : "Brand Awareness (%)",
            "ReportMarketTrendsSKUMarketFiguresImagePerception"       : "Image Perception",
            "ReportMarketTrendsSKUMarketFiguresMarketNetSalesValue"   : "Market Net Sales Value ($ mln)",
            "ReportMarketTrendsSKUMarketFiguresMarketNetSalesVolume"  : "Market Net Sales Volume (mln std. packs)",
            "ReportMarketTrendsSKUMarketFiguresMarketShareValue"      : "Market Share (value %)",
            "ReportMarketTrendsSKUMarketFiguresMarketShareVolume"     : "Market Share (volume %)",

            "ReportMarketTrendsSKUTableTitleMiscellaneous"              : "Miscellaneous",		//Miscellaneous
            "ReportMarketTrendsSKUMiscellaneousLostSalesVolumeduetoOOS" : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportMarketTrendsSKUMiscellaneousNumericalDistribution"   : "Numerical Distribution (%)",
            "ReportMarketTrendsSKUMiscellaneousTotalInventoryAtTrade"   : "Total Inventory at Trade (mln std. packs)",
            "ReportMarketTrendsSKUMiscellaneousPriceRankingIndex"       : "Price Ranking Index",
            "ReportMarketTrendsSKUMiscellaneousShelfSpace"              : "Shelf Space (%)",

            "ReportMarketTrendsSKUTableTitleSegmentWiseValueShare"                      : "Value Share by Segment",		//Segment-wise Value Share
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePriceSensitiveSegment" : "Value Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePretendersSegment"     : "Value Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareModerateSegment"       : "Value Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareGoodLifeSegment"       : "Value Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareUltimateSegment"       : "Value Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePragmaticSegment"      : "Value Share (%) in 6. Pragmatic Segment",

            "ReportMarketTrendsSKUTableTitleSegmentWiseVolumeShare"                       : "Volume Share by Segment",	//Segment-wise Volume Share
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "Volume Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "Volume Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareModerateSegment"       : "Volume Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "Volume Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "Volume Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "Volume Share (%) in 6. Pragmatic Segment",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeWeightedDistribution"       : "Volume-weighted Distribution (%)",

            //Labels for Market Trends - Brand Level
            "ReportMarketTrendsBrandMarketFiguresAverageDisplayPrice"   : "Average Display Price ($/std. pack)",
            "ReportMarketTrendsBrandMarketFiguresAverageNetMarketPrice" : "Average Net Market Price ($/std. pack)",
            "ReportMarketTrendsBrandMarketFiguresBrandAwareness"        : "Brand Awareness (%)",
            "ReportMarketTrendsBrandMarketFiguresImagePerception"       : "Image Perception",
            "ReportMarketTrendsBrandMarketFiguresMarketNetSalesValue"   : "Market Net Sales Value ($ mln)",
            "ReportMarketTrendsBrandMarketFiguresMarketNetSalesVolume"  : "Market Net Sales Volume (mln std. packs)",
            "ReportMarketTrendsBrandMarketFiguresMarketShareValue"      : "Market Share (value %)",
            "ReportMarketTrendsBrandMarketFiguresMarketShareVolume"     : "Market Share (volume %)",

            "ReportMarketTrendsBrandMiscellaneousLostSalesVolumeduetoOOS" : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportMarketTrendsBrandMiscellaneousNumericalDistribution"   : "Numerical Distribution (%)",
            "ReportMarketTrendsBrandMiscellaneousTotalInventoryAtTrade"   : "Total Inventory at Trade (mln std. packs)",
            "ReportMarketTrendsBrandMiscellaneousPriceRankingIndex"       : "Price Ranking Index",
            "ReportMarketTrendsBrandMiscellaneousShelfSpace"              : "Shelf Space (%)",

            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePriceSensitiveSegment" : "Value Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePretendersSegment"     : "Value Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareModerateSegment"       : "Value Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareGoodLifeSegment"       : "Value Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareUltimateSegment"       : "Value Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePragmaticSegment"      : "Value Share (%) in 6. Pragmatic Segment",

            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "Volume Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "Volume Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareModerateSegment"       : "Volume Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "Volume Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "Volume Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "Volume Share (%) in 6. Pragmatic Segment",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeWeightedDistribution"       : "Volume-weighted Distribution (%)",

            //Labels for Market Trends - Global Level
            "ReportMarketTrendsGlobalMarketFiguresAverageNetMarketPrice" : "Average Net Market Price ($/std. pack)",
            "ReportMarketTrendsGlobalMarketFiguresMarketNetSalesValue"   : "Market Net Sales Value ($ mln)",
            "ReportMarketTrendsGlobalMarketFiguresMarketNetSalesVolume"  : "Market Net Sales Volume (mln std. packs)",
            "ReportMarketTrendsGlobalMarketFiguresMarketShareValue"      : "Market Share (value %)",
            "ReportMarketTrendsGlobalMarketFiguresMarketShareVolume"     : "Market Share (volume %)",

            "ReportMarketTrendsGlobalMiscellaneousLostSalesVolumeduetoOOS" : "Lost Sales Volume due to OOS (mln std. packs)",
            "ReportMarketTrendsGlobalMiscellaneousNumericalDistribution"   : "Numerical Distribution (%)",
            "ReportMarketTrendsGlobalMiscellaneousTotalInventoryAtTrade"   : "Total Inventory at Trade (mln std. packs)",
            "ReportMarketTrendsGlobalMiscellaneousPriceRankingIndex"       : "Price Ranking Index",
            "ReportMarketTrendsGlobalMiscellaneousShelfSpace"              : "Shelf Space (%)",

            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePriceSensitiveSegment" : "Value Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePretendersSegment"     : "Value Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareModerateSegment"       : "Value Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareGoodLifeSegment"       : "Value Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareUltimateSegment"       : "Value Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePragmaticSegment"      : "Value Share (%) in 6. Pragmatic Segment",

            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "Volume Share (%) in 1. Price Sensitive Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "Volume Share (%) in 2. Pretenders Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareModerateSegment"       : "Volume Share (%) in 3. Moderate Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "Volume Share (%) in 4. Good Life Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "Volume Share (%) in 5. Ultimate Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "Volume Share (%) in 6. Pragmatic Segment",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeWeightedDistribution"       : "Volume-weighted Distribution (%)",

            //Labels for Market Indicator
            "ReportMarketIndicatorCorporateTaxRate"	:	"Corporate Tax Rate",
            "ReportMarketIndicatorInflationRate"	:	"Inflation Rate",
            "ReportMarketIndicatorDepositRate"	:	"Deposit Rate",
            "ReportMarketIndicatorBorrowingRate"	:	"Borrowing Rate",
            "ReportMarketIndicatorAdditionalInvestmentBudgetSurchargeRate"	:	"Additional Investment Budget Surcharge Rate",
            "ReportMarketIndicatorInventoryHoldingCost"	:	"Inventory Holding Cost (as a % of inventory value)",
            "ReportMarketIndicatorObsoleteGoodsCost"	:	"Obsolete Goods Cost (as a % of purchase cost)",
            "ReportMarketIndicatorDiscontinuedGoodsCost"	:	"Discontinued Goods Cost (as a % of purchase cost)",



            //Labels for Items on Decision Page - Second Menu Bar

            "DecisionPageSecondMenuBarLabelsTotalAvailableBudget" : "Total Available Budget",
            "DecisionPageSecondMenuBarLabelsNormalCapacity"       : "Normal Capacity Left",
            "DecisionPageSecondMenuBarLabelsOvertimeCapacity"     : "Overtime Capacity Left",
            "DecisionPageSecondMenuBarLabelsAdditionalBudget"     : "Additional Budget",


            //Labels for Items on Decision Page - DecisionTab
            "DecisionPageDecisionTabMAKEDECISIONS"     : "MAKE DECISIONS",
            "DecisionPageDecisionTabMission"           : "Market Share + Profit",
            "DecisionPageDecisionTabAddNewBrand"       : "Add New Brand",
            "DecisionPageDecisionTabSalesForce"        : "Sales Force ($ mln)",
            "DecisionPageDecisionTabAddNewSKU"         : "Add New SKU",
            "DecisionPageDecisionTabName"              : "SKU Name",
            "DecisionPageDecisionTabLabelBrandName"    : "Brand Name :",
            "DecisionPageDecisionTabLabelFirstSKUName" : "First SKU Name :",
            "DecisionPageDecisionTabLabelSKUName"      : "SKU Name :",

            "DecisionPageDecisionTabDiscontinue"           : "Discontinue?",
            "DecisionPageDecisionTabProcessingTechnology"  : "Processing Technology",
            "DecisionPageDecisionTabIngredientsQuality"    : "Ingredients Quality",
            "DecisionPageDecisionTabPackagingSize"         : "Packaging Size",
            "DecisionPageDecisionTabPackagingSizeSmall"    : "Small",
            "DecisionPageDecisionTabPackagingSizeStandard" : "Standard",
            "DecisionPageDecisionTabPackagingSizeLarge"    : "Large",

            "DecisionPageDecisionTabProductionVolume"               : "Production Volume (mln packs)",
            "DecisionPageDecisionTabManufacturerPrice"              : "Manufacturer Price ($)",
            "DecisionPageDecisionTabRepriceFactoryStock"            : "Reprice Factory Stock?",
            "DecisionPageDecisionTabConsumerCommunication"          : "Consumer Communication ($ mln)",
            "DecisionPageDecisionTabTargetConsumerSegment"          : "Target Consumer Segment",
            "DecisionPageDecisionTabConsumerPromotions"             : "Consumer Promotions ($ mln)",
            "DecisionPageDecisionTabConsumerPromotionsSchedule"     : "Consumer Promotions Schedule",
            "DecisionPageDecisionTabConsumerPromotionsScheduleWeek" : "Week",
            "DecisionPageDecisionTabTradeExpenses"                  : "Trade Expenses ($ mln)",
            "DecisionPageDecisionTabAdditionalTradeMargin"          : "Additional Trade Margin (%)",
            "DecisionPageDecisionTabWholesaleMinimumVolume"         : "Wholesale Minimum Volume (mln packs)",
            "DecisionPageDecisionTabWholesaleBonusRate"             : "Wholesale Bonus Rate (%)",

            "DecisionPageDecisionNewProductDevelopmentInvestment"                                 : "New Product Development Investment",
            "DecisionPageDecisionNewProductDevelopmentInvestmentInvestmentInProductionEfficiency" : "Investment in Production Efficiency ($ mln)",
            "DecisionPageDecisionNewProductDevelopmentInvestmentInvestmentInProcessingTechnology" : "Investment in Processing Technology ($ mln)",

            "DecisionPageDecisionNewProductDevelopmentInvestmentName"                                                   : "Name",
            "DecisionPageDecisionNewProductDevelopmentInvestmentRequiredAmount"                                         : "Required Amount ($ mln)",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseEfficiencyBy25points"      : "Extra Budget Required to Increase Efficiency by 2% / 5% points",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseFlexibilityBy25points"     : "Extra Budget Required to Increase Flexibility by 2% / 5% points",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseTechnologyLevelBy12points" : "Extra Budget Required to Increase Technology Level by 1 / 2 Step(s)",
            "DecisionPageDecisionNewProductDevelopmentInvestmentNote"                                                   : "Note: Investment on Efficiency could increase Flexibility at the same time",


            "DecisionPageDecisionTabProcessingTechnologyFrontendValidation" : "Must be integer",
            "DecisionPageDecisionTabIngredientsQualityFrontendValidation"   : "Must be integer",
            "DecisionPageDecisionTabProductionVolumeFrontendValidation"     : "Must be integer",
            "DecisionPageDecisionTabManufacturerPriceFrontendValidation"    : "Must be float",

            "DecisionPageDecisionTabConsumerCommunicationFrontendValidation"  : "Must be integer",
            "DecisionPageDecisionTabConsumerPromotionsFrontendValidation"     : "Must be integer",
            "DecisionPageDecisionTabTradeExpensesFrontendValidation"          : "Must be integer",
            "DecisionPageDecisionTabAdditionalTradeMarginFrontendValidation"  : "Must be less than 100",
            "DecisionPageDecisionTabWholesaleMinimumVolumeFrontendValidation" : "Must be integer",
            "DecisionPageDecisionTabWholesaleBonusRateFrontendValidation"     : "Must be less than 100",



            //Labels for Items on Decision Page - Future Projections Calculator
            "DecisionPageFutureProjectionsTableTitleDATAREFERENCE"		:	"DATA REFERENCE",

            "DecisionPageFutureProjectionsCalculatorLabel"       : "Future Projection Calculator",
            "DecisionPageFutureProjectionsCalculatorTablePeriod" : "Period",

            "DecisionPageFutureProjectionsCalculatorTable1InPackUnits"     : "In Pack Units",
            "DecisionPageFutureProjectionsCalculatorTable1InStandardUnits" : "In Standard Units",

            "DecisionPageFutureProjectionsCalculatorTable1StocksAtFactory"     : "Stocks at Factory (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1StocksAtWholesales"  : "Stocks at Wholesalers (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1StocksAtRetailers"   : "Stocks at Retailers  (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1UnitProductionCost"  : "Unit Production Cost ($)",
            "DecisionPageFutureProjectionsCalculatorTable1WholesalePrice"      : "Wholesale Price ($)",
            "DecisionPageFutureProjectionsCalculatorTable1RecommendedConsumer" : "Recommended Consumer Price ($)",

            "DecisionPageFutureProjectionsCalculatorTable2MarketSales"           : "Market Sales (mln Packs)",
            "DecisionPageFutureProjectionsCalculatorTable2ShipmentsToRetailers"  : "Shipments to retailers (mln Packs)",
            "DecisionPageFutureProjectionsCalculatorTable2UnitProductionCost"    : "Unit Production Cost ($)",
            "DecisionPageFutureProjectionsCalculatorTable2AverageConsumerPrice"  : "Average Consumer Price",
            "DecisionPageFutureProjectionsCalculatorTable2ConsumerCommunication" : "Consumer Communication ($ mln)",
            "DecisionPageFutureProjectionsCalculatorTable2ConsumerPromotions"    : "Consumer Promotions ($ mln)",

            "DecisionPageFutureProjectionsCalculatorTable3SKUExpectedSales"        : "SKU: Expected Sales",
            "DecisionPageFutureProjectionsCalculatorTable3AdditionalInformation"   : "Additional Information (SKU)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedMaximalSales"    : "Expected Maximal Sales ($ mln)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedGrossMargin"     : "Expected Gross Margin (%)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedOperatingMargin" : "Expected Operating Margin (%)",


            //Labels for Items on Decision Page - Product Portfolio
            "DecisionPageProductPortfolioLabel"		:	"Product Portfolio",

            "DecisionPageProductPortfolioTable1CurrentProduction"  : "Current Production",
            "DecisionPageProductPortfolioTable1SKUName"            : "SKU Name",
            "DecisionPageProductPortfolioTable1TargetSegment"      : "Target Segment",
            "DecisionPageProductPortfolioTable1FactoryPrice"       : "Factory Price",
            "DecisionPageProductPortfolioTable1IngredientsQuality" : "Ingredients Quality",
            "DecisionPageProductPortfolioTable1TechnologyLevel"    : "Technology Level",
            "DecisionPageProductPortfolioTable1ProductionVolume"   : "Production Volume",

            "DecisionPageProductPortfolioTable2PreviousInventory"             : "Previous Inventory",
            "DecisionPageProductPortfolioTable2SKUName"                       : "SKU Name",
            "DecisionPageProductPortfolioTable2AverageFactoryPrice"           : "Average Factory Price",
            "DecisionPageProductPortfolioTable2AverageIngredientQuality"      : "Average Ingredient Quality",
            "DecisionPageProductPortfolioTable2AverageTechnologyLevel"        : "Average Technology Level",
            "DecisionPageProductPortfolioTable2TotalInventoryVolumeAtFactory" : "Total Inventory Volume at Factory",


            //Labels for Items on Decision Page - Spending Details
            "DecisionPageSpendingDetailsLabel" : "Spending Details",

            "DecisionPageSpendingDetailsTable1BrandName" : "Brand Name",
            "DecisionPageSpendingDetailsTable1Total"     : "Total",

            "DecisionPageSpendingDetailsTable1SalesForce"                         : "Sales Force ($ mln)",
            "DecisionPageSpendingDetailsTable1ConsumerCommunication"              : "Consumer Communication ($ mln)",
            "DecisionPageSpendingDetailsTable1ConsumerPromotions"                 : "Consumer Promotions ($ mln)",
            "DecisionPageSpendingDetailsTable1TradeExpenses"                      : "Trade Expenses ($ mln)",
            "DecisionPageSpendingDetailsTable1EstimatedAdditionalTradeMarginCost" : "Estimated Additional Trade Margin Cost ($ mln)",
            "DecisionPageSpendingDetailsTable1EstimatedWholesaleBonusCost"        : "Estimated Wholesale Bonus Cost ($ mln)",

            "DecisionPageSpendingDetailsTable2Company"		:	"Company",
            "DecisionPageSpendingDetailsTable2Total"		:	"Total",


            "DecisionPageSpendingDetailsTable2InvestmentInProductionEfficiency"    : "Investment in Production Efficiency ($ mln)",
            "DecisionPageSpendingDetailsTable2InvestmentInProcessingTechnology"    : "Investment in Processing Technology ($ mln)",
            "DecisionPageSpendingDetailsTable2TotalInvestment"                     : "(-) Estimated Spending this period ($ mln)",
            "DecisionPageSpendingDetailsTable2AverageBudgetPerPeriod"              : "Average Budget per Period ($ mln)",
            "DecisionPageSpendingDetailsTable2TotalInvestmentBudget"               : "Total Investment Budget ($ mln)",
            "DecisionPageSpendingDetailsTable2CumulatedPreviousInvestments"        : "(-) Cumulated Previous Investments ($ mln)",
            "DecisionPageSpendingDetailsTable2AvailableBudget"                     : "(=) Estimated Total Budget Left ($ mln)",
            "DecisionPageSpendingDetailsTable2NormalCapacity"                      : "Normal Capacity Left This Period (mln Packs)",
            "DecisionPageSpendingDetailsTable2AvailableOvertimeCapacityExtension"  : "Available Overtime Capacity Extension Left This Period (mln Packs)",
            "DecisionPageSpendingDetailsTable2AcquiredEfficiency"                  : "Acquired Efficiency (%)",
            "DecisionPageSpendingDetailsTable2AcquiredProductionVolumeFlexibility" : "Acquired Production Volume Flexibility (%)",
            "DecisionPageSpendingDetailsTable2AcquiredTechnologyLevel"             : "Acquired Technology Level",

            //Labels for Final Score page
            "FinalScorePageScore"          : "Score",
            "FinalScorePageButtonOriginal" : "Original",
            "FinalScorePageButtonRescaled" : "Rescaled",
            "FinalScorePageWeightFactor"   : "Weight / Factor",

            "FinalScorePageIncrementalMarketShare"         : "Incremental market share (value)",
            "FinalScorePageCumulatedNetProfit"             : "Cumulated net profit",
            "FinalScorePageSpendingVersusBudgets"          : "Spending versus budgets",

            "FinalScorePageShareInBrandTotalSalesValue"    : "Share in Brand Total Sales Value",
            "FinalScorePageAchievementOfInitialObjectives" : "Achievement of initial objectives",
            "FinalScorePageFinalScore"                     : "Final Score",

            "FinalScorePageCompany"             : "Company",
            "FinalScorePagePeriod"              : "Period",
            "FinalScorePageCongratulations"     : "Congratulations ! You finish the game",
            "FinalScorePageCongratulationsInfo" : "Please take 5 minutes to provide feedback to MarkSimos. Your feedback will help us to improve our service",
            "FinalScorePageProvideFeedback"     : "Provide Feedback",
            "FinalScorePageThank"               : "Thank you !",
            "FinalScorePageThankInfo"           : "Thank you for your feedback",

            "FinalScoreAdminPanelLabel"           : "Decisions and Results",
            "FinalScoreAdminPanelDecisionsButton" : "All Decisions",
            "FinalScoreAdminPanelResultsButton"   : "All Results",
            "FinalScoreAdminPanelReRunButton" : "Rerun Last Period Decisions",
            "FinalScoreAdminPanelReRunSaveButton" : "Save",


            //Labels for Questionnaire Page
            "QuestionnairePageQuestionnaire"                             : "Questionnaire",
            "QuestionnairePageVeryPoor"                                  : "Very poor",
            "QuestionnairePageAverage"                                   : "Average",
            "QuestionnairePageExcellent"                                 : "Excellent",
            "QuestionnairePageOverallSatisfactionWiththeProgram"         : "Overall Satisfaction With the Program",
            "QuestionnairePageChallengeStrategicThinkingAbility"         : "Challenge strategic thinking ability",
            "QuestionnairePageDevelopAnIntegratedPerspective"            : "Develop an integrated perspective",
            "QuestionnairePageTestPersonalAbilityOfBalancingRisks"       : "Test personal ability of balancing risks",
            "QuestionnairePageChallengeLeadershipAndTeamworkAbility"     : "Challenge leadership and teamwork ability",
            "QuestionnairePageChallengeAnalysisAndDecisionMakingAbility" : "Challenge analysis and decision-making ability",
            "QuestionnairePageSimulationInteresting"                     : "Simulation interesting",
            "QuestionnairePageTeachingTeam"                              : "Teaching Team",
            "QuestionnairePageFacilitator"                               : "Facilitator",
            "QuestionnairePageNormanYen"                                 : "Norman Yen",
            "QuestionnairePageFeedbackOnSimulationDecisions"             : "Feedback on simulation decisions",
            "QuestionnairePageExpandingViewAndInspireThinking"           : "Expanding view and inspire thinking",
            "QuestionnairePageLectures"                                  : "Lectures",
            "QuestionnairePageProduct"                                   : "Product",
            "QuestionnairePageOverallProductUsageExperience"             : "Overall Product Usage Experience",
            "QuestionnairePageUserInterfaceExperience"                   : "User Interface Experience",
            "QuestionnairePageEaseOfNavigation"                          : "Ease of Navigation",
            "QuestionnairePageClarityOfWordsUsed"                        : "Clarity of words used",
            "QuestionnairePageInterpreter"                               : "Interpreter",
            "QuestionnairePageOlive"                                     : "Olive",
            "QuestionnairePageAccuracyANDPresentation"                   : "Accuracy & Presentation",
            "QuestionnairePageTeachingSupport"                           : "Teaching Support",
            "QuestionnairePageMayYu"                                     : "May Yu",
            "QuestionnairePageHelpfulness"                               : "Helpfulness",
            "QuestionnairePageQualityOfTechnicalSupport"                 : "Quality of Technical Support",

            "QuestionnairePageOthers"             : "Others",
            "QuestionnairePageMostBenefit"        : "Which format of the program would benefit you the most",
            "QuestionnairePageJoinProgram"        : "Join Program with other companies",
            "QuestionnairePageCompanyInHouse"     : "Company In-House Program with other functions",
            "QuestionnairePageOpenClass"          : "Open class",
            "QuestionnairePageRecommendMarkSimos" : "Would you like to recommend MarkSimos to other companies or business school",
            "QuestionnairePageYes"                : "Yes",
            "QuestionnairePageNo"                 : "No",
            "QuestionnairePageBringYou"           : "What is the best benefit or experience MarkSimos bring to you ? Is there something special you learned that you like was unique / different compared to what you learned before",
            "QuestionnaireSubmit"                 : "Submit Feedback",

            //Labels for Help page
            "HelpPageMenuFAQ"                     : "FAQ",
            "HelpPageMenuVideo"                   : "Video",
            "HelpPageMenuManual"                  : "Manual",

            //Labels for FAQ Page
            "FAQPageTitle"                        : "Frequently Asked Questions",
            "FAQPageSubTitle"                     : "This FAQ will attempt to cover the most asked questions about Marksimos game.",

            "ManualPageTitle"    : "Manual",
            "ManualPageDownload" : "Download"







        });










        // Adding a translation table for the Chinese language
        $translateProvider.translations('zh_CN', {


            //Labels for Login
            "LoginPageLabelWelcome" : "欢迎使用MarkSimos !",
            "LoginPageLabelSignIn" : "登录",
            "LoginPageLabelEmail" : "用户名 / 邮箱 :",
            "LoginPageLabelPassword" : "密码 :",
            "LoginPageLabelPasswordErrorInfo" : "邮箱或密码错误 !",
            "LoginPageButtonSignIn" : "点击登录",


            //Labels for Introduction
            "IntroPageSeminarListTitle"                   : "目前已有的游戏列表",
            "IntroPageSeminarListLabelSeminarID"          : "课程号",
            "IntroPageSeminarListLabelSeminarDescription" : "课程说明",
            "IntroPageSeminarListLabelTotalRound"         : "总阶段数",
            "IntroPageSeminarListLabelCompetitor"         : "参与竞争者",
            "IntroPageSeminarListLabelDateOfCommencement" : "开始时间",
            "IntroPageSeminarListLabelSeminarStatus"      : "课程状态",
            "IntroPageSeminarListLabelCountry"            : "国家",
            "IntroPageSeminarListLabelProvince"           : "省(州)",
            "IntroPageSeminarListLabelCity"               : "城市",
            "IntroPageSeminarListLabelVenue"              : "地点或场所",


            "IntroPageSentence1" : "我的角色",
            "IntroPageSentence2" : "我正在接管公司",
            "IntroPageSentence3" : "运营管理",
            "IntroPageSentence4" : "单品，",
            "IntroPageSentence5" : "共",
            "IntroPageSentence6" : "个品牌",
            "IntroPageSentence7" : "还要与另外",
            "IntroPageSentence8" : "个对手竞争",


            "IntroPageSentence21" : "公司的最终目标是要获得",
            "IntroPageSentence22" : "最高的市场份额",
            "IntroPageSentence23" : "和",
            "IntroPageSentence24" : "净利润",


            //Labels for Items on Home page - Top Menu Bar
            "HomePageMenuBarLabelsHome"       : "首页",
            "HomePageMenuBarLabelsReport"     : "报告",
            "HomePageMenuBarLabelsDecision"   : "决策",
            "HomePageMenuBarLabelsScore"      : "得分",
            "HomePageMenuBarLabelsLanguage"   : "语言",
            "HomePageMenuBarLabelsHelp"       : "帮助",
            "HomePageMenuBarLabelsHelpFAQ"    : "FAQ",
            "HomePageMenuBarLabelsHelpVideo"  : "视频",
            "HomePageMenuBarLabelsHelpManual" : "手册",
            "HomePageMenuBarLabelsAbout"      : "关于 MarkSimos",
            "HomePageMenuBarLabelsLogout"     : "登出",

            //Labels for Segment
            "HomePageSegmentLabelPriceSensitive" : "1 价格敏感型",
            "HomePageSegmentLabelPretenders"     : "2 虚荣型",
            "HomePageSegmentLabelModerate"       : "3 适中型",
            "HomePageSegmentLabelGoodLife"       : "4 享受生活型",
            "HomePageSegmentLabelUltimate"       : "5 追求极致型",
            "HomePageSegmentLabelPragmatic"      : "6 实用型",
            "HomePageSegmentLabelAllSegments"    : "所有消费者类型",



            //Labels for Items on Home page - Second Menu Bar
            "HomePageSecondMenuBarLabelsCompany"           : "公司",
            "HomePageSecondMenuBarLabelsCompanies"         : "个公司",
            "HomePageSecondMenuBarLabelsMemberTotal"         : "现在共",
            "HomePageSecondMenuBarLabelsMember"         : "个人员参与公司决策",
            "HomePageSecondMenuBarLabelsTimeLeft"          : "剩余",
            "HomePageSecondMenuBarLabelsTimeLeftForSubmit" : "时间做决策",
            "HomePageSecondMenuBarLabelsMission"           : "目标：市场份额+净利润",
            "HomePageSecondMenuBarLabelsMakeDecision"      : "做决策",
            "HomePageSecondMenuBarCurrentPeriod"           : "阶段",

            "HomePageSecondMenuBarCompareData"     : "数据报告对比",
            "HomePageSecondMenuBarCompareDataBack" : "返回数据报告",

            //Labels for Items on Home page - Three Boxes
            "HomePageYourCompanyTableLabel"                 : "您的公司",
            "HomePageYourCompanyCompanyStatus"              : "公司基本信息",
            "HomePageYourCompanyFinancialReport"            : "财务报告",
            "HomePageYourCompanyInventoryReport"            : "库存报告",
            "HomePageYourCompanyProfitabilityEvolution"     : "盈利变化",
            "HomePageYourCompetitorTableLabel"              : "你的竞争对手",
            "HomePageYourCompetitorMarketShare"             : "市场份额",
            "HomePageYourCompetitorCompetitorIntelligence"  : "竞争对手情报",
            "HomePageYourCompetitorInvestmentsandProfits"   : "投资与利润",
            "HomePageYourCompetitorMarketSalesandInventory" : "销售与库存状况",
            "HomePageMarketLandscapeTableLabel"             : "市场前景",
            "HomePageMarketLandscapeSegmentLeaderTop5"      : "细分市场领导者",
            "HomePageMarketLandscapePerceptionMap"          : "感知图",
            "HomePageMarketLandscapeSegmentDistributions"   : "细分市场数据",
            "HomePageMarketLandscapeMarketEvolution"        : "市场演变趋势",
            "HomePageMarketLandscapeMarketTrends"           : "市场趋势",
            "HomePageMarketLandscapeMarketIndicators"       : "宏观市场参数",


            //Labels for Items on Reports page - reports menu
            "ReportYourCompany"                : "你的公司",
            "ReportMenuCompanyStatus"          : "公司基本信息",
            "ReportMenuFinancialReport"        : "财务报告",
            "ReportMenuInventoryReport"        : "库存报告",
            "ReportMenuProfitabilityEvolution" : "盈利变化",
            "ReportYourCompetitors"            : "你的竞争对手",
            "ReportMenuMarketShare"            : "市场份额",
            "ReportMenuCompetitorIntelligence" : "竞争对手情报",
            "ReportMenuInvestmentProfits"      : "投资与利润",
            "ReportMenuMarketSalesInventory"   : "销售与库存状况",
            "ReportMarketLandscape"            : "市场前景",
            "ReportMenuSegmentLeaderTop5"      : "细分市场领导者",
            "ReportMenuPerceptionMap"          : "感知图",
            "ReportMenuSegmentDistributions"   : "细分市场数据",
            "ReportMenuMarketEvolution"        : "市场演变趋势",
            "ReportMenuMarketTrends"           : "市场趋势",
            "ReportMenuMarketIndicator"        : "宏观市场参数",


            //Labels for Company Status Report Tab Menu
            "ReportTabLabelSKU"    : "按单品",
            "ReportTabLabelBrand"  : "按品牌",
            "ReportTabLabelGlobal" : "公司",

            "ReportTabLabelTableChartDisplayLine" : "折线图",
            "ReportTabLabelTableChartDisplayBar" : "柱状图",
            "ReportTabLabelTableChartDisplayPoint" : "散点图",
            "ReportTabLabelTableChartDisplayArea"  : "面积图",
            "ReportTabLabelTableChartDisplayPie"   : "饼图",

            //Labels for Company Status Report - SKU Level
            "ReportCompanyStatusSKUQuarter" : "阶段",

            "ReportCompanyStatusSKUMarketShareValue"                             : "市场份额 (销售额 %)",
            "ReportCompanyStatusSKUMarketShareVolume"                            : "市场份额 (销量 %)",
            "ReportCompanyStatusSKUMarketSalesVolumeStd"                         : "市场销量 (百万标准包)",
            "ReportCompanyStatusSKULostSalesVolumeDueToOOSStd"                   : "因缺货损失的销售量 (百万标准包)",
            "ReportCompanyStatusSKUNumericalDistribution"                        : "数值分销率 (%)",
            "ReportCompanyStatusSKUVolumeWeightedDistribution"                   : "加权分销率 (%)",
            "ReportCompanyStatusSKUShelfSpace"                                   : "货架空间 (%)",
            "ReportCompanyStatusSKUAwareness"                                    : "知名度 (%)",
            "ReportCompanyStatusSKUAverageNetMarketPrice"                        : "平均净市场价 ($/标准包)",
            "ReportCompanyStatusSKUAverageDisplayPrice"                          : "平均陈列价格 ($/标准包)",
            "ReportCompanyStatusSKUPriceRankingIndex"                            : "价格排序指数",
            "ReportCompanyStatusSKUTargetConsumerSegment"                        : "目标细分市场",
            "ReportCompanyStatusSKUTargetConsumerSegmentExpectedValuePerception" : "目标细分市场 预计 价值感知",
            "ReportCompanyStatusSKUValuePerception"                              : "价值感知",
            "ReportCompanyStatusSKUTargetConsumerSegmentExpectedImagePerception" : "目标细分市场 预计 形象感知",
            "ReportCompanyStatusSKUImagePerception"                              : "形象感知",

            "ReportCompanyStatusSKUIngredientsQualityIndex" : "成分质量指数",
            "ReportCompanyStatusSKUAppliedTechnologyIndex"  : "应用的技术指数",

            "ReportCompanyStatusSKUMarketSalesValue"        : "市场销售额 (RMB 百万)",
            "ReportCompanyStatusSKUConsumerPricePromotions" : "消费者价格促销 (RMB 百万)",
            "ReportCompanyStatusSKUMarketNetSalesValue"     : "市场净销售额  (RMB 百万)",

            "ReportCompanyStatusSKULostSalesVolumeDueToOOS"    : "因缺货损失的销售量 (百万包)",
            "ReportCompanyStatusSKUNumberOfOutOfStockEpisodes" : "缺货周数",

            "ReportCompanyStatusSKUMarketSalesVolume"             : "市场销售量 (百万包)",
            "ReportCompanyStatusSKURetailersPurchasesVolume"      : "零售商购买量 (百万包)",
            "ReportCompanyStatusSKUShipmentsToWholesalers"        : "经销商购买量 (百万包)",
            "ReportCompanyStatusSKUProductionVolume"              : "产量 (百万包)",
            "ReportCompanyStatusSKUInventoryVolumeAtManufacturer" : "厂商持有的库存量 (百万包)",
            "ReportCompanyStatusSKUInventoryVolumeAtWholesalers"  : "经销商持有的库存量 (百万包)",
            "ReportCompanyStatusSKUInventoryVolumeAtRetailers"    : "零售商持有的库存量 (百万包)",

            "ReportCompanyStatusSKUStocksCoverAtRetailers"   : "零售商的库存维持期 (周)",
            "ReportCompanyStatusSKUStocksCoverAtWholesalers" : "经销商的库存维持期 (周)",

            //Labels for Company Status Report - Brand Level
            "ReportCompanyStatusBrandMarketShareValue"           : "市场份额 (销售额 %)",
            "ReportCompanyStatusBrandMarketShareVolume"          : "市场份额 (销量 %)",
            "ReportCompanyStatusBrandMarketSalesVolumeStd"       : "市场销量 (百万标准包)",
            "ReportCompanyStatusBrandLostSalesVolumeDueToOOSStd" : "因缺货损失的销售量 (百万标准包)",
            "ReportCompanyStatusBrandNumericalDistribution"      : "数值分销率 (%)",
            "ReportCompanyStatusBrandVolumeWeightedDistribution" : "加权分销率 (%)",
            "ReportCompanyStatusBrandShelfSpace"                 : "货架空间 (%)",
            "ReportCompanyStatusBrandAwareness"                  : "知名度 (%)",
            "ReportCompanyStatusBrandAverageNetMarketPrice"      : "平均净市场价 ($/标准包)",
            "ReportCompanyStatusBrandAverageDisplayPrice"        : "平均陈列价格 ($/标准包)",
            "ReportCompanyStatusBrandPriceRankingIndex"          : "价格排序指数",
            "ReportCompanyStatusBrandValuePerception"            : "价值感知",
            "ReportCompanyStatusBrandImagePerception"            : "形象感知",
            "ReportCompanyStatusBrandIngredientsQualityIndex"    : "成分质量指数",
            "ReportCompanyStatusBrandAppliedTechnologyIndex"     : "应用的技术指数",

            "ReportCompanyStatusBrandMarketSalesValue"	:	"市场销售额 (RMB 百万)",
            "ReportCompanyStatusBrandConsumerPricePromotions"	:	"消费者价格促销 (RMB 百万)",
            "ReportCompanyStatusBrandMarketNetSalesValue"	:	"市场净销售额  (RMB 百万)",
            "ReportCompanyStatusBrandLostSalesVolumeDueToOOS"	:	"因缺货损失的销售量 (百万包)",
            "ReportCompanyStatusBrandNumberOfOutOfStockEpisodes"	:	"缺货周数",
            "ReportCompanyStatusBrandMarketSalesVolume"	:	"市场销售量 (百万包)",
            "ReportCompanyStatusBrandRetailersPurchasesVolume"	:	"零售商购买量 (百万包)",
            "ReportCompanyStatusBrandShipmentsToWholesalers"	:	"经销商购买量 (百万包)",
            "ReportCompanyStatusBrandProductionVolume"	:	"产量 (百万包)",
            "ReportCompanyStatusBrandInventoryVolumeAtManufacturer"	:	"厂商持有的库存量 (百万包)",
            "ReportCompanyStatusBrandInventoryVolumeAtWholesalers"	:	"经销商持有的库存量 (百万包)",
            "ReportCompanyStatusBrandInventoryVolumeAtRetailers"	:	"零售商持有的库存量 (百万包)",

            "ReportCompanyStatusBrandStocksCoverAtRetailers"	:	"零售商的库存维持期 (周)",
            "ReportCompanyStatusBrandStocksCoverAtWholesalers"	:	"经销商的库存维持期 (周)",

            //Labels for Company Status Report - Global Level
            "ReportCompanyStatusGlobalMarketShareValue"           : "市场份额 (销售额 %)",
            "ReportCompanyStatusGlobalMarketShareVolume"          : "市场份额 (销量 %)",
            "ReportCompanyStatusGlobalMarketSalesVolumeStd"       : "市场销量 (百万标准包)",
            "ReportCompanyStatusGlobalLostSalesVolumeDueToOOSStd" : "因缺货损失的销售量 (百万标准包)",
            "ReportCompanyStatusGlobalNumericalDistribution"      : "数值分销率 (%)",
            "ReportCompanyStatusGlobalVolumeWeightedDistribution" : "加权分销率 (%)",
            "ReportCompanyStatusGlobalShelfSpace"                 : "货架空间 (%)",
            "ReportCompanyStatusGlobalMindSpaceShare"             : "思维空间份额（%）",
            "ReportCompanyStatusGlobalAverageNetMarketPrice"      : "平均净市场价 ($/标准包)",
            "ReportCompanyStatusGlobalAverageDisplayPrice"        : "平均陈列价格 ($/标准包)",
            "ReportCompanyStatusGlobalIngredientsQualityIndex"    : "成分质量指数",
            "ReportCompanyStatusGlobalAppliedTechnologyIndex"     : "应用的技术指数",

            "ReportCompanyStatusGlobalMarketSalesValue"        : "市场销售额 (RMB 百万)",
            "ReportCompanyStatusGlobalConsumerPricePromotions" : "消费者价格促销 (RMB 百万)",
            "ReportCompanyStatusGlobalMarketNetSalesValue"     : "市场净销售额  (RMB 百万)",

            "ReportCompanyStatusGlobalLostSalesVolumeDueToOOS" : "因缺货损失的销售量 (百万包)",

            "ReportCompanyStatusGlobalNumberOfOutOfStockEpisodes"	:	"缺货周数",
            "ReportCompanyStatusGlobalMarketSalesVolume"	:	"市场销售量 (百万包)",
            "ReportCompanyStatusGlobalRetailersPurchasesVolume"	:	"零售商购买量 (百万包)",
            "ReportCompanyStatusGlobalShipmentsToWholesalers"	:	"经销商购买量 (百万包)",
            "ReportCompanyStatusGlobalProductionVolume"	:	"产量 (百万包)",
            "ReportCompanyStatusGlobalInventoryVolumeAtManufacturer"	:	"厂商持有的库存量 (百万包)",
            "ReportCompanyStatusGlobalInventoryVolumeAtWholesalers"	:	"经销商持有的库存量 (百万包)",
            "ReportCompanyStatusGlobalInventoryVolumeAtRetailers"	:	"零售商持有的库存量 (百万包)",
            "ReportCompanyStatusGlobalStocksCoverAtRetailers"	:	"零售商的库存维持期 (周)",
            "ReportCompanyStatusGlobalStocksCoverAtWholesalers"	:	"经销商的库存维持期 (周)",

            //Labels for Financial Report - Brand Level
            "ReportFinancialReportBrandSalesValue"	:	"销售额 (RMB 百万)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodSalesValue"	:	"(%) 相对于上阶段的改变",
            "ReportFinancialReportBrandShareInBrandTotalSalesValue"	:	"占该品牌总销售额的份额 (%)",
            "ReportFinancialReportBrandCostOfGoodsSold"	:	"售出商品成本 (RMB 百万)",
            "ReportFinancialReportBrandObsoleteGoodsCost"	:	"处理商品成本 (RMB 百万)",
            "ReportFinancialReportBrandDiscontinuedGoodsCost"	:	"停产商品成本 (RMB 百万)",
            "ReportFinancialReportBrandInventoryHoldingCost"	:	"库存持有成本 (RMB 百万)",
            "ReportFinancialReportBrandTotalMaterialCost"	:	"总材料成本 (RMB 百万)",

            "ReportFinancialReportBrandGrossProfit"	:	"毛利额 (RMB 百万)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodGrossProfit"	:	"(%) 相对于上阶段的改变",
            "ReportFinancialReportBrandGrossProfitMargin"	:	"毛利率 (%)",
            "ReportFinancialReportBrandShareInBrandGrossProfitLosses"	:	"占该品牌 毛利/负毛利 的份额 (%)",

            "ReportFinancialReportBrandAdvertising"	:	"广告费用 (RMB 百万)",
            "ReportFinancialReportBrandConsumerPromotionCost"	:	"促销成本 (RMB 百万)",
            "ReportFinancialReportBrandTradeInvestment"	:	"零售终端费用 (RMB 百万)",
            "ReportFinancialReportBrandSalesForceCost"	:	"销售团队成本 (RMB 百万)",
            "ReportFinancialReportBrandAdditionalTradeMarginCost"	:	"额外零售终端返利 (RMB 百万)",
            "ReportFinancialReportBrandVolumeDiscountCost"	:	"经销商进货折扣成本 (RMB 百万)",
            "ReportFinancialReportBrandTotalTradeAndMarketingExpenses"	:	"总的通路和营销费用 (RMB 百万)",
            "ReportFinancialReportBrandTradeAndMarketingExpensesasaOfSales"	:	"通路和营销费用占销售额的百分比",
            "ReportFinancialReportBrandShareOfTradeAndMarketingExpensesInBrandTotal"	:	"占该品牌通路和营销总额的份额 (%)",

            "ReportFinancialReportBrandGeneralExpenses"	:	"一般性开支 (RMB 百万)",
            "ReportFinancialReportBrandAmortisation"	:	"摊销费用 (RMB 百万)",

            "ReportFinancialReportBrandOperatingProfit"	:	"运营利润 (RMB 百万)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodOperatingProfit"	:	"(%) 相对于上阶段的改变",
            "ReportFinancialReportBrandOperatingProfitMargin"	:	"运营利润率 (%)",
            "ReportFinancialReportBrandShareInBrandOperatingProfitLoss"	:	"占该品牌 运营利润/运营亏损 的份额 (%)",

            "ReportFinancialReportBrandInterests"	:	"利息 (RMB 百万)",
            "ReportFinancialReportBrandTaxes"	:	"税 (RMB 百万)",
            "ReportFinancialReportBrandExceptionalCostProfit"	:	"额外开支/利润  (RMB 百万)",

            "ReportFinancialReportBrandNetProfit"	:	"净利润 (RMB 百万)",
            "ReportFinancialReportBrandChangeVersusPreviousPeriodNetProfit"	:	"(%) 相对于上阶段的改变",
            "ReportFinancialReportBrandNetProfitMargin"	:	"净利率 (%)",
            "ReportFinancialReportBrandShareInBrandNetProfitLoss"	:	"占该品牌 净利润/净亏损 的份额 (%)",

            "ReportFinancialReportBrandProductionCost"	:	"生产成本 (RMB 百万)",
            "ReportFinancialReportBrandInventoryValue"	:	"库存价值 (RMB 百万)",


            //Labels for Financial Report - All Brands
            "ReportFinancialReportAllBrandSalesValue"                           : "销售额 (RMB 百万)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodSalesValue" : "(%) 相对于上阶段的改变",
            "ReportFinancialReportAllBrandShareInCompanyTotalSalesValue"        : "占公司总销售额的份额 (%)",
            "ReportFinancialReportAllBrandCostOfGoodsSold"                      : "售出商品成本 (RMB 百万)",
            "ReportFinancialReportAllBrandObsoleteGoodsCost"                    : "处理商品成本 (RMB 百万)",
            "ReportFinancialReportAllBrandDiscontinuedGoodsCost"                : "停产商品成本 (RMB 百万)",
            "ReportFinancialReportAllBrandInventoryHoldingCost"                 : "库存持有成本 (RMB 百万)",
            "ReportFinancialReportAllBrandTotalMaterialCost"                    : "总材料成本 (RMB 百万)",

            "ReportFinancialReportAllBrandGrossProfit"                                  : "毛利额 (RMB 百万)",
            "ReportFinancialReportAllBrandChangeVersusPreviousperiodGrossProfit"        : "(%) 相对于上阶段的改变",
            "ReportFinancialReportAllBrandGrossProfitMargin"                            : "毛利率 (%)",
            "ReportFinancialReportAllBrandShareInCompanyGrossProfitLosses"              : "占公司 总毛利/总负毛利 的份额 (%)",
            "ReportFinancialReportAllBrandAdvertising"                                  : "广告费用 (RMB 百万)",
            "ReportFinancialReportAllBrandConsumerPromotionCost"                        : "促销成本 (RMB 百万)",
            "ReportFinancialReportAllBrandTradeInvestment"                              : "零售终端费用 (RMB 百万)",
            "ReportFinancialReportAllBrandSalesForceCost"                               : "销售团队成本 (RMB 百万)",
            "ReportFinancialReportAllBrandAdditionalTradeMarginCost"                    : "额外零售终端返利 (RMB 百万)",
            "ReportFinancialReportAllBrandVolumeDiscountCost"                           : "经销商进货折扣成本 (RMB 百万)",
            "ReportFinancialReportAllBrandTotalTradeAndMarketingExpenses"               : "总的通路和营销费用 (RMB 百万)",
            "ReportFinancialReportAllBrandTradeAndMarketingExpensesasaOfSales"          : "通路和营销费用占销售额的百分比",
            "ReportFinancialReportAllBrandShareOfTradeAndMarketingExpensesInBrandTotal" : "占公司通路和营销总费用的份额 (%)",

            "ReportFinancialReportAllBrandGeneralExpenses" : "一般性开支 (RMB 百万)",
            "ReportFinancialReportAllBrandAmortisation"    : "摊销费用 (RMB 百万)",

            "ReportFinancialReportAllBrandOperatingProfit"                           : "运营利润 (RMB 百万)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodOperatingProfit" : "(%) 相对于上阶段的改变",
            "ReportFinancialReportAllBrandOperatingProfitMargin"                     : "运营利润率 (%)",
            "ReportFinancialReportAllBrandShareInBrandOperatingProfitLoss"           : "占公司 总运营利润/总运营亏损 的份额 (%)",

            "ReportFinancialReportAllBrandInterests"	:	"利息 (RMB 百万)",
            "ReportFinancialReportAllBrandTaxes"	:	"税 (RMB 百万)",
            "ReportFinancialReportAllBrandExceptionalCostProfit"	:	"额外开支/利润  (RMB 百万)",

            "ReportFinancialReportAllBrandNetProfit"	:	"净利润 (RMB 百万)",
            "ReportFinancialReportAllBrandChangeVersusPreviousPeriodNetProfit"	:	"(%) 相对于上阶段的改变",
            "ReportFinancialReportAllBrandNetProfitMargin"	:	"净利率 (%)",
            "ReportFinancialReportAllBrandShareInCompanyNetProfitLoss"	:	"占公司 净利润/净亏损 的份额 (%)",

            "ReportFinancialReportAllBrandProductionCost"	:	"生产成本 (RMB 百万)",
            "ReportFinancialReportAllBrandInventoryValue"	:	"库存价值 (RMB 百万)",


            //Labels for Inventory Report
            "ReportInventoryReportLabelCloseToExpireInventory" : "将要过期的库存",
    //        "ReportInventoryReportLabelPreviousInventory"      : "以前的库存",
            "ReportInventoryReportLabelPreviousInventory"      : "将要过期的库存",
            "ReportInventoryReportLabelFreshInventory"         : "新库存",
            "ReportInventoryReportTableLabelX"                 : "总库存 (百万标准包) = 工厂库存＋渠道以及零售商库存",
            "ReportInventoryReportTableLabelY"                 : "百万件",


            //Labels for Profitability Evolution - SKU Level
            "ReportProfitabilityEvolutionSKUQuarter"	:	"阶段",

            "ReportProfitabilityEvolutionSKUManufacturerSalesValue" : "厂商销售额 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUCostOfGoodsSold"       : "售出商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUInventoryHolding"      : "库存持有成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUObsoleteGoods"         : "处理商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUDiscontinuedGoodsCost" : "停产商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUGrossProfit"           : "毛利额 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUAdvertising"                    : "广告费用 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUConsumerPromotionsCost"         : "促销成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUTradeInvestment"                : "零售终端费用 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUSalesForceCost"                 : "销售团队成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUVolumeDiscountCost"             : "经销商进货折扣成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUAdditionalTradeMarginCost"      : "额外零售终端返利 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUTotalTradeAndMarketingExpenses" : "总的通路和营销费用 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUGeneralExpenses" : "一般性开支 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUAmortisation"    : "摊销费用 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUOperatingProfit" : "运营利润 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUInterests"             : "利息 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUExceptionalCostProfit" : "额外开支/利润  (RMB 百万)",
            "ReportProfitabilityEvolutionSKUTaxes"                 : "税 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUNetProfit"             : "净利润 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUSurchargeForSupplementaryInvestmentBudget"	:	"追加投资预算产生的额外费用 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUNetResult"	:	"净利额 (RMB 百万)",

            "ReportProfitabilityEvolutionSKUShareInBrandTotalSalesValue"	:	"占该品牌总销售额的份额 (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandGrossProfitLosses"	:	"占该品牌 毛利/负毛利 的份额 (%)",
            "ReportProfitabilityEvolutionSKUShareOfTradeAndMarketingExpensesInBrandTotal"	:	"占公司通路和营销总费用的份额 (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandOperatingProfitLosses"	:	"占该品牌 运营利润/运营亏损 的份额 (%)",
            "ReportProfitabilityEvolutionSKUShareInBrandNetProfitLosses"	:	"占该品牌 净利润/净亏损 的份额 (%)",

            "ReportProfitabilityEvolutionSKUGrossProfitMargin"	:	"毛利率 (%)",
            "ReportProfitabilityEvolutionSKUTradeAndMarketingExpensesasaOfSales"	:	"通路和营销费用占销售额的百分比",
            "ReportProfitabilityEvolutionSKUGeneralExpensesasaOfSales"	:	"一般费用占销售额的百分比",
            "ReportProfitabilityEvolutionSKUOperatingProfitMargin"	:	"运营利润率 (%)",
            "ReportProfitabilityEvolutionSKUNetProfitMargin"	:	"净利率 (%)",

            "ReportProfitabilityEvolutionSKUReturnOnInvestment"	:	"投资回报率 (%)",

            "ReportProfitabilityEvolutionSKUAverageNetMarketPrice"	:	"平均净市场价 ($/包)",
            "ReportProfitabilityEvolutionSKUAverageWholesalesPrice"	:	"平均批发价 ($/包)",
            "ReportProfitabilityEvolutionSKUAverageManufacturerPrice"	:	"平均出厂价 ($/包)",
            "ReportProfitabilityEvolutionSKUAverageProductionCost"	:	"平均生产成本 ($/包)",

            "ReportProfitabilityEvolutionSKUMarketSalesValue"	:	"市场销售额 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUConsumerPricePromotions"	:	"消费者价格促销 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUMarketNetSalesValue"	:	"市场净销售额  (RMB 百万)",

            "ReportProfitabilityEvolutionSKUAdditionalRetailersMargin"	:	"给零售商的额外折扣 (%)",
            "ReportProfitabilityEvolutionSKUWholesalersBonusRate"	:	"经销商进货折扣率 (%)",
            "ReportProfitabilityEvolutionSKUMinimalPurchaseQualifyingForBonus"	:	"享受进货折扣的最低订货量 (百万标准包)",

            "ReportProfitabilityEvolutionSKUProductionCost"	:	"生产成本 (RMB 百万)",
            "ReportProfitabilityEvolutionSKUInventoryValue"	:	"库存价值 (RMB 百万)",

            //Labels for Profitability Evolution - Brand Level
            "ReportProfitabilityEvolutionBrandManufacturerSalesValue" : "厂商销售额 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandCostOfGoodsSold"       : "售出商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandInventoryHolding"      : "库存持有成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandObsoleteGoods"         : "处理商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandDiscontinuedGoodsCost" : "停产商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandGrossProfit"           : "毛利额 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandAdvertising"                    : "广告费用 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandConsumerPromotionsCost"         : "促销成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandTradeInvestment"                : "零售终端费用 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandSalesForceCost"                 : "销售团队成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandVolumeDiscountCost"             : "经销商进货折扣成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandAdditionalTradeMarginCost"      : "额外零售终端返利 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandTotalTradeAndMarketingExpenses" : "总的通路和营销费用 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandGeneralExpenses" : "一般性开支 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandAmortisation"    : "摊销费用 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandOperatingProfit" : "运营利润 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandInterests"             : "利息 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandExceptionalCostProfit" : "额外开支/利润  (RMB 百万)",
            "ReportProfitabilityEvolutionBrandTaxes"                 : "税 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandNetProfit"             : "净利润 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandSurchargeForSupplementaryInvestmentBudget" : "追加投资预算产生的额外费用 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandNetResult"                                 : "净利额 (RMB 百万)",

            "ReportProfitabilityEvolutionBrandShareInCompanyTotalSalesValue"                  : "占公司总销售额的份额 (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyGrossProfitLosses"                : "占公司 毛利/负毛利 的份额 (%)",
            "ReportProfitabilityEvolutionBrandShareOfTradeAndMarketingExpensesInCompanyTotal" : "占公司通路和营销总费用的份额 (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyOperatingProfitLosses"            : "占公司 总运营利润/总运营亏损 的份额 (%)",
            "ReportProfitabilityEvolutionBrandShareInCompanyNetProfitLosses"                  : "占公司 净利润/净亏损 的份额 (%)",

            "ReportProfitabilityEvolutionBrandGrossProfitMargin"	:	"毛利率 (%)",
            "ReportProfitabilityEvolutionBrandTradeAndMarketingExpensesasaOfSales"	:	"通路和营销费用占销售额的百分比",
            "ReportProfitabilityEvolutionBrandGeneralExpensesasaOfSales"	:	"一般费用占销售额的百分比",
            "ReportProfitabilityEvolutionBrandOperatingProfitMargin"	:	"运营利润率 (%)",
            "ReportProfitabilityEvolutionBrandNetProfitMargin"	:	"净利率 (%)",

            "ReportProfitabilityEvolutionBrandReturnOnInvestment"	:	"投资回报率 (%)",

            "ReportProfitabilityEvolutionBrandAverageNetMarketPrice"    : "平均净市场价 ($/包)",
            "ReportProfitabilityEvolutionBrandAverageWholesalesPrice"   : "平均批发价 ($/包)",
            "ReportProfitabilityEvolutionBrandAverageManufacturerPrice" : "平均出厂价 ($/包)",
            "ReportProfitabilityEvolutionBrandAverageProductionCost"    : "平均生产成本 ($/包)",

            "ReportProfitabilityEvolutionBrandMarketSalesValue"        : "市场销售额 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandConsumerPricePromotions" : "消费者价格促销 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandMarketNetSalesValue"     : "市场净销售额  (RMB 百万)",

            "ReportProfitabilityEvolutionBrandProductionCost" : "生产成本 (RMB 百万)",
            "ReportProfitabilityEvolutionBrandInventoryValue" : "库存价值 (RMB 百万)",

            //Labels for Profitability Evolution - Global Level
            "ReportProfitabilityEvolutionGlobalManufacturerSalesValue" : "厂商销售额 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalCostOfGoodsSold"        : "售出商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalInventoryHolding"       : "库存持有成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalObsoleteGoods"          : "处理商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalDiscontinuedGoodsCost"  : "停产商品成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalGrossProfit"            : "毛利额 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalAdvertising"                    : "广告费用 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalConsumerPromotionsCost"         : "促销成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalTradeInvestment"                : "零售终端费用 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalSalesForceCost"                 : "销售团队成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalVolumeDiscountCost"             : "经销商进货折扣成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalAdditionalTradeMarginCost"      : "额外零售终端返利 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalTotalTradeAndMarketingExpenses" : "总的通路和营销费用 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalOverhead"                                 : "管理费用 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalInvestmentToImproveTechnologyLevel"       : "技术水平投资 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalInvestmentToIncreaseProductionEfficiency" : "生产效率投资 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalProductionCapacityDisposalCost" : "产能处置成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalOvertimeShiftsCost"             : "加班成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalTotalGeneralExpenses"           : "一般性费用总额  (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalAmortisation"                   : "摊销费用 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalOperatingProfit"                : "运营利润 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalInterests"             : "利息 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalExceptionalCostProfit" : "额外开支/利润  (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalTaxes"                 : "税 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalNetProfit"             : "净利润 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalSurchargeForSupplementaryInvestmentBudget" : "追加投资预算产生的额外费用 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalNetResult"                                 : "净利额 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalGrossProfitMargin"                   : "毛利率 (%)",
            "ReportProfitabilityEvolutionGlobalTradeAndMarketingExpensesasaOfSales" : "通路和营销费用占销售额的百分比",
            "ReportProfitabilityEvolutionGlobalGeneralExpensesasaOfSales"           : "一般费用占销售额的百分比",
            "ReportProfitabilityEvolutionGlobalOperatingProfitMargin"               : "运营利润率 (%)",
            "ReportProfitabilityEvolutionGlobalNetProfitMargin"                     : "净利率 (%)",

            "ReportProfitabilityEvolutionGlobalReturnOnInvestment" : "投资回报率 (%)",

            "ReportProfitabilityEvolutionGlobalAverageNetMarketPrice"    : "平均净市场价 ($/包)",
            "ReportProfitabilityEvolutionGlobalAverageWholesalesPrice"   : "平均批发价 ($/包)",
            "ReportProfitabilityEvolutionGlobalAverageManufacturerPrice" : "平均出厂价 ($/包)",
            "ReportProfitabilityEvolutionGlobalAverageProductionCost"    : "平均生产成本 ($/包)",

            "ReportProfitabilityEvolutionGlobalMarketSalesValue"        : "市场销售额 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalConsumerPricePromotions" : "消费者价格促销 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalMarketNetSalesValue"     : "市场净销售额  (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalProductionCost" : "生产成本 (RMB 百万)",
            "ReportProfitabilityEvolutionGlobalInventoryValue" : "库存价值 (RMB 百万)",

            "ReportProfitabilityEvolutionGlobalCapacityUtilisationRate"         : "产能利用率 (%)",
            "ReportProfitabilityEvolutionGlobalChangeInProductionCapacity"      : "产能变化 (百万标准包)",
            "ReportProfitabilityEvolutionGlobalNextPeriodAvailableProdCapacity" : "下一阶段产能 (百万标准包)",

            "ReportProfitabilityEvolutionGlobalAvailableTechnologyLevel"                             : "最高技术水平",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseTechnologyLevelBy1Step"  : "每提高一个级别的技术水平，预计所需的额外预算",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseTechnologyLevelBy2Steps" : "每提高两个级别的技术水平，预计所需的额外预算 ",

            "ReportProfitabilityEvolutionGlobalAcquiredProductionAndLogisticsEfficiency"         : "当前拥有的生产效率 (%)",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseEfficiencyBy2points" : "提高2%生产灵活性，预计所需的额外预算 ",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseEfficiencyBy5points" : "提高5%生产灵活性，预计所需的额外预算",

            "ReportProfitabilityEvolutionGlobalAcquiredProductionPlanningFlexibility"             : "当前拥有的生产灵活度 (%)",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseFlexibilityBy2points" : "提高2%生产灵活性，预计所需的额外预算",
            "ReportProfitabilityEvolutionGlobalExtraBudgetRequiredToIncreaseFlexibilityBy5points" : "提高5%生产灵活性，预计所需的额外预算",


            //Labels for Market Share
            "ReportMarketShareChartTitleMarketShareInValue"  : "市场份额 （按销售额计%)",
            "ReportMarketShareChartTitleMarketShareInVolume" : "市场份额 （按销量计%)",
            "ReportMarketShareChartTitleMindSpaceShare"      : "思维空间份额（%）",
            "ReportMarketShareChartTitleShelfSpaceShare"     : "货架空间份额（%）",

            //Labels for Competitor Intelligence
            "ReportCompetitorIntelligenceTableTitleTechnology"                               : "技术",
            "ReportCompetitorIntelligenceTechnologyAcquiredProductionAndLogisticsEfficiency" : "当前拥有的生产效率 (%)",
            "ReportCompetitorIntelligenceTechnologyAcquiredProductionPlanningFlexibility"    : "当前拥有的生产灵活度 (%)",
            "ReportCompetitorIntelligenceTechnologyAvailableTechnologyLevel"                 : "最高技术水平",

            "ReportCompetitorIntelligenceTableTitleMarketingSales"                : "市场营销和销售",
            "ReportCompetitorIntelligenceMarketingSalesAdditionalTradeMarginCost" : "额外零售终端返利 (RMB 百万)",
            "ReportCompetitorIntelligenceMarketingSalesAdvertising"               : "广告费用 (RMB 百万)",
            "ReportCompetitorIntelligenceMarketingSalesConsumerPromotionsCost"    : "促销成本 (RMB 百万)",
            "ReportCompetitorIntelligenceMarketingSalesRetailerPurchaseVolume"    : "零售商购买量 (百万标准包)",
            "ReportCompetitorIntelligenceMarketingSalesSalesForceCost"            : "销售团队成本 (RMB 百万)",
            "ReportCompetitorIntelligenceMarketingSalesShipmentToWholesalers"     : "经销商购买量 (百万标准包)",
            "ReportCompetitorIntelligenceMarketingSalesTradeInvestments"          : "零售终端费用 (RMB 百万)",
            "ReportCompetitorIntelligenceMarketingSalesVolumeDiscountCost"        : "经销商进货折扣成本 (RMB 百万)",

            "ReportCompetitorIntelligenceTableTitleOperations"                      : "运营",
            "ReportCompetitorIntelligenceOperationsCapacityUtilisationRate"         : "产能利用率 (%)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtManufacturer"   : "厂商持有的库存量 (百万标准包)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtRetailers"      : "零售商持有的库存量 (百万标准包)",
            "ReportCompetitorIntelligenceOperationsInventoryVolumeAtWholesalers"    : "经销商持有的库存量 (百万标准包)",
            "ReportCompetitorIntelligenceOperationsNextPeriodAvailableProdCapacity" : "下一阶段产能 (百万标准包)",
            "ReportCompetitorIntelligenceOperationsProductionVolume"                : "产量 (百万标准包)",

            "ReportCompetitorIntelligenceTableTitleInvestments"                               : "投资",
            "ReportCompetitorIntelligenceInvestmentsInvestmentToImproveTechnologyLevel"       : "技术水平投资 (RMB 百万)",
            "ReportCompetitorIntelligenceInvestmentsInvestmentToIncreaseProductionEfficiency" : "生产效率投资 (RMB 百万)",

            //Labels for Investments and Profits
            "ReportInvestmentsAndProfitsChartTitleTotalInvestment"        : "预计的当期投资总额 (RMB 百万)",
            "ReportInvestmentsAndProfitsChartTitleNetProfitByCompanies"   : "公司净利额  (RMB 百万)",
            "ReportInvestmentsAndProfitsChartTitleReturnOnInvestment"     : "投资回报率（%)",
            "ReportInvestmentsAndProfitsChartTitleInvestmentVersusBudget" : "投资占预算比例(%)",


            //Labels for Market Sales and Inventory
            "ReportMarketSalesAndInventoryChartTitleMarketSalesValue"        : "市场销售额 (RMB 百万)",
            "ReportMarketSalesAndInventoryChartTitleMarketSalesVolume"       : "市场销售量 (百万标准包)",
            "ReportMarketSalesAndInventoryChartTitleTotalInventoryAtFactory" : "工厂中的库存量 (百万标准包)",
            "ReportMarketSalesAndInventoryChartTitleTotalInventoryAtTrade"   : "渠道中的库存量 (百万标准包)",
            "ReportMarketSalesAndInventoryChartBottomTextPeriod"   : "阶段",

            //Labels for Segment Leader Top 5
            "ReportSegmentLeaderTop5ChartTitlePriceSensitive" : "1. 价格敏感型 (%)",
            "ReportSegmentLeaderTop5ChartTitlePretenders"     : "2. 虚荣型 (%)",
            "ReportSegmentLeaderTop5ChartTitleModerate"       : "3. 适中型 (%)",
            "ReportSegmentLeaderTop5ChartTitleGoodLife"       : "4. 享受生活型 (%)",
            "ReportSegmentLeaderTop5ChartTitleUltimate"       : "5. 追求极致型 (%)",
            "ReportSegmentLeaderTop5ChartTitlePragmatic"      : "6. 实用型 (%)",

            //Labels for Perception Map
            "ReportPerceptionMapAxisLabelSegment"         : "消费者细分",
            "ReportPerceptionMapAxisTitleValuePerception" : "价值感知",
            "ReportPerceptionMapAxisTitleImagePerception" : "形象感知",
            "ReportPerceptionMapHoverTooltipMarketShareValue"        : "市场份额 (销售额 %)",
            "ReportPerceptionMapHoverTooltipAverageDisplayPrice"     : "平均陈列价格 ($/标准包)",
            "ReportPerceptionMapHoverTooltipAppliedTechnologyIndex"  : "应用的技术指数",
            "ReportPerceptionMapHoverTooltipIngredientsQualityIndex" : "成分质量指数",
            "ReportPerceptionMapHoverTooltipAwareness"               : "知名度 (%)",
            "ReportPerceptionMapHoverTooltipShelfSpace"              : "货架空间 (%)",
            "ReportPerceptionMapHoverTooltipValuePerceptionChange"   : "价值感知浮动",
            "ReportPerceptionMapHoverTooltipImagePerceptionChange"   : "形象感知浮动",

            //Labels for Segment Distributions
            "ReportSegmentDistributionsTableTitleMarketShareValue"      : "市场份额 (销售额 %)",
            "ReportSegmentDistributionsTableTitleMarketShareVolume"     : "市场份额 (销量 %)",
            "ReportSegmentDistributionsTableTitleMarketSalesValue"      : "市场销售额 (RMB 百万)",
            "ReportSegmentDistributionsTableTitleMarketSalesVolume"     : "市场销售量 (百万标准包)",
            "ReportSegmentDistributionsTableTitleAverageNetMarketPrice" : "平均净市场价 ($/标准包)",
            "ReportSegmentDistributionsTableTitleValuePerception"       : "价值感知",
            "ReportSegmentDistributionsTableTitleImagePerception"       : "形象感知",

            //Labels for Market Evolution
            "ReportMarketEvolutionChartTitleGrowthRateInVolume"             : "基于销量的增长率 (阶段-3 = 100)",
            "ReportMarketEvolutionChartTitleGrowthRateInValue"              : "基于销售额的增长率 (阶段-3 = 100)",
            "ReportMarketEvolutionChartTitleNetMarketPrice"                 : "净市场价 (阶段-3 = 100)",
            "ReportMarketEvolutionChartTitleSegmentValueShareInTotalMarket" : "细分市场占总市场的销售份额（%）",

            //Labels for Market Trends - SKU Level
            "ReportMarketTrendsSKUTableTitleMarketFigures"            : "市场数据",	//Market Figures
            "ReportMarketTrendsSKUMarketFiguresAverageDisplayPrice"   : "平均陈列价格 ($/标准包)",
            "ReportMarketTrendsSKUMarketFiguresAverageNetMarketPrice" : "平均净市场价 ($/标准包)",
            "ReportMarketTrendsSKUMarketFiguresBrandAwareness"        : "品牌知名度 (%)",
            "ReportMarketTrendsSKUMarketFiguresImagePerception"       : "形象感知",
            "ReportMarketTrendsSKUMarketFiguresMarketNetSalesValue"   : "市场净销售额  (RMB 百万)",
            "ReportMarketTrendsSKUMarketFiguresMarketNetSalesVolume"  : "市场销量  (百万标准包)",
            "ReportMarketTrendsSKUMarketFiguresMarketShareValue"      : "市场份额 (销售额 %)",
            "ReportMarketTrendsSKUMarketFiguresMarketShareVolume"     : "市场份额 (销量 %)",

            "ReportMarketTrendsSKUTableTitleMiscellaneous"              : "其他",	//Miscellaneous
            "ReportMarketTrendsSKUMiscellaneousLostSalesVolumeduetoOOS" : "因缺货损失的销售量 (百万标准包)",
            "ReportMarketTrendsSKUMiscellaneousNumericalDistribution"   : "数值分销率 (%)",
            "ReportMarketTrendsSKUMiscellaneousTotalInventoryAtTrade"   : "渠道中的库存量 (百万标准包)",
            "ReportMarketTrendsSKUMiscellaneousPriceRankingIndex"       : "价格排序指数",
            "ReportMarketTrendsSKUMiscellaneousShelfSpace"              : "货架空间 (%)",

            "ReportMarketTrendsSKUTableTitleSegmentWiseValueShare"                      : "占细分市场销售额的 (%)",	//Value Share by Segment
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePriceSensitiveSegment" : "占细分市场销售额的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePretendersSegment"     : "占细分市场销售额的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareModerateSegment"       : "占细分市场销售额的 (%) 3. 适中型 市场",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareGoodLifeSegment"       : "占细分市场销售额的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueShareUltimateSegment"       : "占细分市场销售额的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsSKUSegmentWiseValueShareValueSharePragmaticSegment"      : "占细分市场销售额的 (%) 6. 实用型 市场",

            "ReportMarketTrendsSKUTableTitleSegmentWiseVolumeShare"                       : "占细分市场销量的(%)",	//Segment-wise Volume Share
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "占细分市场销量的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "占细分市场销量的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareModerateSegment"       : "占细分市场销量的 (%) 3. 适中型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "占细分市场销量的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "占细分市场销量的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "占细分市场销量的 (%) 6. 实用型 市场",
            "ReportMarketTrendsSKUSegmentWiseVolumeShareVolumeWeightedDistribution"       : "加权分销率 (%)",


            //Labels for Market Trends - Brand Level
            "ReportMarketTrendsBrandMarketFiguresAverageDisplayPrice"   : "平均陈列价格 ($/标准包)",
            "ReportMarketTrendsBrandMarketFiguresAverageNetMarketPrice" : "平均净市场价 ($/标准包)",
            "ReportMarketTrendsBrandMarketFiguresBrandAwareness"        : "品牌知名度 (%)",
            "ReportMarketTrendsBrandMarketFiguresImagePerception"       : "形象感知",
            "ReportMarketTrendsBrandMarketFiguresMarketNetSalesValue"   : "市场净销售额  (RMB 百万)",
            "ReportMarketTrendsBrandMarketFiguresMarketNetSalesVolume"  : "市场销量  (百万标准包)",
            "ReportMarketTrendsBrandMarketFiguresMarketShareValue"      : "市场份额 (销售额 %)",
            "ReportMarketTrendsBrandMarketFiguresMarketShareVolume"     : "市场份额 (销量 %)",

            "ReportMarketTrendsBrandMiscellaneousLostSalesVolumeduetoOOS" : "因缺货损失的销售量 (百万标准包)",
            "ReportMarketTrendsBrandMiscellaneousNumericalDistribution"   : "数值分销率 (%)",
            "ReportMarketTrendsBrandMiscellaneousTotalInventoryAtTrade"   : "渠道中的库存量 (百万标准包)",
            "ReportMarketTrendsBrandMiscellaneousPriceRankingIndex"       : "价格排序指数",
            "ReportMarketTrendsBrandMiscellaneousShelfSpace"              : "货架空间 (%)",

            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePriceSensitiveSegment" : "占细分市场销售额的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePretendersSegment"     : "占细分市场销售额的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareModerateSegment"       : "占细分市场销售额的 (%) 3. 适中型 市场",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareGoodLifeSegment"       : "占细分市场销售额的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueShareUltimateSegment"       : "占细分市场销售额的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsBrandSegmentWiseValueShareValueSharePragmaticSegment"      : "占细分市场销售额的 (%) 6. 实用型 市场",

            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "占细分市场销量的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "占细分市场销量的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareModerateSegment"       : "占细分市场销量的 (%) 3. 适中型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "占细分市场销量的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "占细分市场销量的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "占细分市场销量的 (%) 6. 实用型 市场",
            "ReportMarketTrendsBrandSegmentWiseVolumeShareVolumeWeightedDistribution"       : "加权分销率 (%)",

            //Labels for Market Trends - Global Level
            "ReportMarketTrendsGlobalMarketFiguresAverageNetMarketPrice" : "平均净市场价 ($/标准包)",
            "ReportMarketTrendsGlobalMarketFiguresMarketNetSalesValue"   : "市场净销售额 (RMB 百万)",
            "ReportMarketTrendsGlobalMarketFiguresMarketNetSalesVolume"  : "市场销量  (百万标准包)",
            "ReportMarketTrendsGlobalMarketFiguresMarketShareValue"      : "市场份额 (销售额 %)",
            "ReportMarketTrendsGlobalMarketFiguresMarketShareVolume"     : "市场份额 (销量 %)",

            "ReportMarketTrendsGlobalMiscellaneousLostSalesVolumeduetoOOS" : "因缺货损失的销售量 (百万标准包)",
            "ReportMarketTrendsGlobalMiscellaneousNumericalDistribution"   : "数值分销率 (%)",
            "ReportMarketTrendsGlobalMiscellaneousTotalInventoryAtTrade"   : "渠道中的库存量 (百万标准包)",
            "ReportMarketTrendsGlobalMiscellaneousPriceRankingIndex"       : "价格排序指数",
            "ReportMarketTrendsGlobalMiscellaneousShelfSpace"              : "货架空间 (%)",

            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePriceSensitiveSegment" : "占细分市场销售额的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePretendersSegment"     : "占细分市场销售额的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareModerateSegment"       : "占细分市场销售额的 (%) 3. 适中型 市场",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareGoodLifeSegment"       : "占细分市场销售额的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueShareUltimateSegment"       : "占细分市场销售额的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsGlobalSegmentWiseValueShareValueSharePragmaticSegment"      : "占细分市场销售额的 (%) 6. 实用型 市场",

            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePriceSensitiveSegment" : "占细分市场销量的 (%) 1. 价格敏感型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePretendersSegment"     : "占细分市场销量的 (%) 2. 虚荣型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareModerateSegment"       : "占细分市场销量的 (%) 3. 适中型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareGoodLifeSegment"       : "占细分市场销量的 (%) 4. 享受生活型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeShareUltimateSegment"       : "占细分市场销量的 (%) 5. 追求极致型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeSharePragmaticSegment"      : "占细分市场销量的 (%) 6. 实用型 市场",
            "ReportMarketTrendsGlobalSegmentWiseVolumeShareVolumeWeightedDistribution"       : "加权分销率 (%)",

            //Labels for Market Indicators
            "ReportMarketIndicatorCorporateTaxRate"	:	"公司税率",
            "ReportMarketIndicatorInflationRate"	:	"通货膨胀率",
            "ReportMarketIndicatorDepositRate"	:	"存款利率",
            "ReportMarketIndicatorBorrowingRate"	:	"借贷利率",
            "ReportMarketIndicatorAdditionalInvestmentBudgetSurchargeRate"	:	"其他投资预算附加费率",
            "ReportMarketIndicatorInventoryHoldingCost"	:	"库存持有成本（%库存量）",
            "ReportMarketIndicatorObsoleteGoodsCost"	:	"过期商品成本（%采购成本）",
            "ReportMarketIndicatorDiscontinuedGoodsCost"	:	"停产商品成本（%采购成本）",




            //Labels for Items on Decision Page - Second Menu Bar
            "DecisionPageSecondMenuBarLabelsTotalAvailableBudget" : "全部可用预算金额",
            "DecisionPageSecondMenuBarLabelsNormalCapacity"       : "剩余正常产能",
            "DecisionPageSecondMenuBarLabelsOvertimeCapacity"     : "剩余额外加班产能",
            "DecisionPageSecondMenuBarLabelsAdditionalBudget"     : "申请额外预算",


            //Labels for Items on Decision Page - DecisionTab
            "DecisionPageDecisionTabMAKEDECISIONS" : "制定决策",
            "DecisionPageDecisionTabMission"       : "目标: 市场份额+净利润",
            "DecisionPageDecisionTabAddNewBrand"   : "添加新品牌",
            "DecisionPageDecisionTabSalesForce"    : "销售团队 (RMB 百万)",
            "DecisionPageDecisionTabAddNewSKU"     : "添加新产品",
            "DecisionPageDecisionTabName"          : "产品名称",
            "DecisionPageDecisionTabLabelBrandName"    : "新品牌名称 :",
            "DecisionPageDecisionTabLabelFirstSKUName" : "首个新产品名称 :",
            "DecisionPageDecisionTabLabelSKUName"      : "新产品名称 :",

            "DecisionPageDecisionTabDiscontinue"           : "是否停止运营?",
            "DecisionPageDecisionTabProcessingTechnology"  : "生产技术",
            "DecisionPageDecisionTabIngredientsQuality"    : "原料质量",
            "DecisionPageDecisionTabPackagingSize"         : "包装规格",
            "DecisionPageDecisionTabPackagingSizeSmall"    : "小包装",
            "DecisionPageDecisionTabPackagingSizeStandard" : "标准包装",
            "DecisionPageDecisionTabPackagingSizeLarge"    : "大包装",

            "DecisionPageDecisionTabProductionVolume"               : "产量(百万件)",
            "DecisionPageDecisionTabManufacturerPrice"              : "出厂价($)",
            "DecisionPageDecisionTabRepriceFactoryStock"            : "重新定价工厂库存?",
            "DecisionPageDecisionTabConsumerCommunication"          : "广告投入 (RMB 百万)",
            "DecisionPageDecisionTabTargetConsumerSegment"          : "目标细分市场",
            "DecisionPageDecisionTabConsumerPromotions"             : "促销 (RMB 百万)",
            "DecisionPageDecisionTabConsumerPromotionsSchedule"     : "促销日程",
            "DecisionPageDecisionTabConsumerPromotionsScheduleWeek" : "周",
            "DecisionPageDecisionTabTradeExpenses"                  : "零售终端费用 (RMB 百万)",
            "DecisionPageDecisionTabAdditionalTradeMargin"          : "额外零售终端返利 (%)",
            "DecisionPageDecisionTabWholesaleMinimumVolume"         : "经销商最低订货量 (百万件)",
            "DecisionPageDecisionTabWholesaleBonusRate"             : "经销商进货折扣率 (%)",

            "DecisionPageDecisionNewProductDevelopmentInvestment"                                 : "生产技术以及生产效率研发投入",
            "DecisionPageDecisionNewProductDevelopmentInvestmentInvestmentInProductionEfficiency" : "生产效率的投资 (RMB 百万)",
            "DecisionPageDecisionNewProductDevelopmentInvestmentInvestmentInProcessingTechnology" : "生产技术的投资 (RMB 百万)",

            "DecisionPageDecisionNewProductDevelopmentInvestmentName"                                                   : "名称",
            "DecisionPageDecisionNewProductDevelopmentInvestmentRequiredAmount"                                         : "所需投资金额 (RMB 百万)",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseEfficiencyBy25points"      : "提高 2% / 5%生产效率，预计所需的额外预算",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseFlexibilityBy25points"     : "提高 2% / 5%生产灵活性，预计所需的额外预算",
            "DecisionPageDecisionNewProductDevelopmentInvestmentExtraBudgetRequiredToIncreaseTechnologyLevelBy12points" : "每提高一个/两个级别的技术水平，预计所需的额外预算",
            "DecisionPageDecisionNewProductDevelopmentInvestmentNote"                                                   : "注意: 在提高生产效率中的预算投入将等量影响生产灵活性 ",


            "DecisionPageDecisionTabProcessingTechnologyFrontendValidation"   : "必须为整数",
            "DecisionPageDecisionTabIngredientsQualityFrontendValidation"     : "必须为整数",
            "DecisionPageDecisionTabProductionVolumeFrontendValidation"       : "必须为整数",
            "DecisionPageDecisionTabManufacturerPriceFrontendValidation"      : "整数或两位小数",

            "DecisionPageDecisionTabConsumerCommunicationFrontendValidation"  : "必须为整数",
            "DecisionPageDecisionTabConsumerPromotionsFrontendValidation"     : "必须为整数",
            "DecisionPageDecisionTabTradeExpensesFrontendValidation"          : "必须为整数",
            "DecisionPageDecisionTabAdditionalTradeMarginFrontendValidation"  : "必须为100内整数",
            "DecisionPageDecisionTabWholesaleMinimumVolumeFrontendValidation" : "必须为整数",
            "DecisionPageDecisionTabWholesaleBonusRateFrontendValidation"     : "必须为100内整数",


            //Labels for Items on Decision Page - Future Projections Calculator
            "DecisionPageFutureProjectionsTableTitleDATAREFERENCE"		:	"数据参考",

            "DecisionPageFutureProjectionsCalculatorLabel"       : "预期数据计算器",
            "DecisionPageFutureProjectionsCalculatorTablePeriod" : "阶段",

            "DecisionPageFutureProjectionsCalculatorTable1InPackUnits"          : "按实际包装单位",
            "DecisionPageFutureProjectionsCalculatorTable1InStandardUnits"      : "按标准包装单位",

            "DecisionPageFutureProjectionsCalculatorTable1StocksAtFactory"      : "工厂库存 (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1StocksAtWholesales"   : "经销商库存 (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1StocksAtRetailers"   : "零售商库存 (mln)",
            "DecisionPageFutureProjectionsCalculatorTable1UnitProductionCost"   : "单位生产成本 ($)",
            "DecisionPageFutureProjectionsCalculatorTable1WholesalePrice"      : "经销商供货价 ($)",
            "DecisionPageFutureProjectionsCalculatorTable1RecommendedConsumer" : "建议零售价 ($)",

            "DecisionPageFutureProjectionsCalculatorTable2MarketSales"           : "市场销量 （百万件）",
            "DecisionPageFutureProjectionsCalculatorTable2ShipmentsToRetailers"  : "零售商到货量 （百万件）",
            "DecisionPageFutureProjectionsCalculatorTable2UnitProductionCost"    : "单位生产成本 ($)",
            "DecisionPageFutureProjectionsCalculatorTable2AverageConsumerPrice"  : "平均零售终端价格",
            "DecisionPageFutureProjectionsCalculatorTable2ConsumerCommunication" : "广告投入 (RMB 百万)",
            "DecisionPageFutureProjectionsCalculatorTable2ConsumerPromotions"    : "促销 (RMB 百万)",

            "DecisionPageFutureProjectionsCalculatorTable3SKUExpectedSales"		:	"预计销售状况",
            "DecisionPageFutureProjectionsCalculatorTable3AdditionalInformation"		:	"额外信息 (SKU)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedMaximalSales"		:	"预期最大销售额 (RMB 百万)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedGrossMargin"		:	"预期毛利率 (%)",
            "DecisionPageFutureProjectionsCalculatorTable3ExpectedOperatingMargin"		:	"预期营运利润率 (%)",


            //Labels for Items on Decision Page - Product Portfolio
            "DecisionPageProductPortfolioLabel" : "产品组合",

            "DecisionPageProductPortfolioTable1CurrentProduction"  : "当前产品",
            "DecisionPageProductPortfolioTable1SKUName"            : "单品名称",
            "DecisionPageProductPortfolioTable1TargetSegment"      : "目标细分市场",
            "DecisionPageProductPortfolioTable1FactoryPrice"       : "出厂价(实际包装/标准包装)",
            "DecisionPageProductPortfolioTable1IngredientsQuality" : "原料质量",
            "DecisionPageProductPortfolioTable1TechnologyLevel"    : "技术水平",
            "DecisionPageProductPortfolioTable1ProductionVolume"   : "产品数量",

            "DecisionPageProductPortfolioTable2PreviousInventory"             : "工厂以往库存",
            "DecisionPageProductPortfolioTable2SKUName"                       : "单品名称",
            "DecisionPageProductPortfolioTable2AverageFactoryPrice"           : "平均出厂价(实际包装/标准包装)",
            "DecisionPageProductPortfolioTable2AverageIngredientQuality"      : "平均原料质量",
            "DecisionPageProductPortfolioTable2AverageTechnologyLevel"        : "平均技术水平",
            "DecisionPageProductPortfolioTable2TotalInventoryVolumeAtFactory" : "工厂总库存量",


            //Labels for Items on Decision Page - Spending Details
            "DecisionPageSpendingDetailsLabel" : "当前预算使用状况",

            "DecisionPageSpendingDetailsTable1BrandName" : "品牌名称",
            "DecisionPageSpendingDetailsTable1Total"     : "总额",

            "DecisionPageSpendingDetailsTable1SalesForce"                         : "销售团队 (RMB 百万)",
            "DecisionPageSpendingDetailsTable1ConsumerCommunication"              : "广告投入 (RMB 百万)",
            "DecisionPageSpendingDetailsTable1ConsumerPromotions"                 : "促销 (RMB 百万)",
            "DecisionPageSpendingDetailsTable1TradeExpenses"                      : "零售终端费用 (RMB 百万)",
            "DecisionPageSpendingDetailsTable1EstimatedAdditionalTradeMarginCost" : "预计的额外零售终端返利成本 (RMB 百万)",
            "DecisionPageSpendingDetailsTable1EstimatedWholesaleBonusCost"        : "预计的经销商进货让利成本 (RMB 百万)",

            "DecisionPageSpendingDetailsTable2Company"                             : "公司",
            "DecisionPageSpendingDetailsTable2Total"                               : "总额",
            "DecisionPageSpendingDetailsTable2InvestmentInProductionEfficiency"    : "生产效率的投资 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2InvestmentInProcessingTechnology"    : "生产技术的投资 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2TotalInvestment"                     : "(-) 预计的当期投资总额 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2AverageBudgetPerPeriod"              : "每阶段平均预算 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2TotalInvestmentBudget"               : "总预算 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2CumulatedPreviousInvestments"        : "(-) 累计前期投资 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2AvailableBudget"                     : "(=) 预计的剩余预算 (RMB 百万)",
            "DecisionPageSpendingDetailsTable2NormalCapacity"                      : "剩余正常产能 (mln Packs)",
            "DecisionPageSpendingDetailsTable2AvailableOvertimeCapacityExtension"  : "剩余额外加班产能 (mln Packs)",
            "DecisionPageSpendingDetailsTable2AcquiredEfficiency"                 : "当前拥有的生产效率 (%)",
            "DecisionPageSpendingDetailsTable2AcquiredProductionVolumeFlexibility" : "当前拥有的生产灵活度 (%)",
            "DecisionPageSpendingDetailsTable2AcquiredTechnologyLevel"             : "最高技术水平",

            //Labels for Final Score page
            "FinalScorePageScore"          : "最终得分",
            "FinalScorePageButtonOriginal" : "原始",
            "FinalScorePageButtonRescaled" : "调整",
            "FinalScorePageWeightFactor"   : "权重 / 因素",

            "FinalScorePageIncrementalMarketShare" : "相对增长的市场份额 (按零售销售额计)",
            "FinalScorePageCumulatedNetProfit"     : "累计净利润",
            "FinalScorePageSpendingVersusBudgets"  : "支出相对于预算",

            "FinalScorePageShareInBrandTotalSalesValue"    : "Share in Brand Total Sales Value",
            "FinalScorePageAchievementOfInitialObjectives" : "Achievement of initial objectives",
            "FinalScorePageFinalScore"                     : "最终得分",

            "FinalScorePageCompany"                        : "公司",
            "FinalScorePagePeriod"                         : "阶段",
            "FinalScorePageCongratulations"                : "祝贺 ! 你已完成游戏",
            "FinalScorePageCongratulationsInfo"            : "麻烦您花一些时间填写反馈. 您的反馈将更好的改进我们的产品",
            "FinalScorePageProvideFeedback"                : "Provide Feedback",
            "FinalScorePageThank"                          : "谢谢 !",
            "FinalScorePageThankInfo"                      : "您宝贵的意见会更好的改进我们的产品!",

            "FinalScoreAdminPanelLabel"           : "公司决策和结果",
            "FinalScoreAdminPanelDecisionsButton" : "显示所有阶段所有公司的决策",
            "FinalScoreAdminPanelResultsButton"   : "显示结果",
            "FinalScoreAdminPanelReRunButton"   : "重新运行上一轮决策",
            "FinalScoreAdminPanelReRunSaveButton" : "保存",

            //Labels for Questionnaire Page
            "QuestionnairePageQuestionnaire"                             : "问卷调查",
            "QuestionnairePageVeryPoor"                                  : "Very poor",
            "QuestionnairePageAverage"                                   : "Average",
            "QuestionnairePageExcellent"                                 : "Excellent",
            "QuestionnairePageOverallSatisfactionWiththeProgram"         : "Overall Satisfaction With the Program",
            "QuestionnairePageChallengeStrategicThinkingAbility"         : "Challenge strategic thinking ability",
            "QuestionnairePageDevelopAnIntegratedPerspective"            : "Develop an integrated perspective",
            "QuestionnairePageTestPersonalAbilityOfBalancingRisks"       : "Test personal ability of balancing risks",
            "QuestionnairePageChallengeLeadershipAndTeamworkAbility"     : "Challenge leadership and teamwork ability",
            "QuestionnairePageChallengeAnalysisAndDecisionMakingAbility" : "Challenge analysis and decision-making ability",
            "QuestionnairePageSimulationInteresting"                     : "Simulation interesting",
            "QuestionnairePageTeachingTeam"                              : "Teaching Team",
            "QuestionnairePageFacilitator"                               : "Facilitator",
            "QuestionnairePageNormanYen"                                 : "Norman Yen",
            "QuestionnairePageFeedbackOnSimulationDecisions"             : "Feedback on simulation decisions",
            "QuestionnairePageExpandingViewAndInspireThinking"           : "Expanding view and inspire thinking",
            "QuestionnairePageLectures"                                  : "Lectures",
            "QuestionnairePageProduct"                                   : "Product",
            "QuestionnairePageOverallProductUsageExperience"             : "Overall Product Usage Experience",
            "QuestionnairePageUserInterfaceExperience"                   : "User Interface Experience",
            "QuestionnairePageEaseOfNavigation"                          : "Ease of Navigation",
            "QuestionnairePageClarityOfWordsUsed"                        : "Clarity of words used",
            "QuestionnairePageInterpreter"                               : "Interpreter",
            "QuestionnairePageOlive"                                     : "Olive",
            "QuestionnairePageAccuracyANDPresentation"                   : "Accuracy & Presentation",
            "QuestionnairePageTeachingSupport"                           : "Teaching Support",
            "QuestionnairePageMayYu"                                     : "May Yu",
            "QuestionnairePageHelpfulness"                               : "Helpfulness",
            "QuestionnairePageQualityOfTechnicalSupport"                 : "Quality of Technical Support",

            "QuestionnairePageOthers"             : "Others",
            "QuestionnairePageMostBenefit"        : "Which format of the program would benefit you the most",
            "QuestionnairePageJoinProgram"        : "Join Program with other companies",
            "QuestionnairePageCompanyInHouse"     : "Company In-House Program with other functions",
            "QuestionnairePageOpenClass"          : "Open class",
            "QuestionnairePageRecommendMarkSimos" : "Would you like to recommend MarkSimos to other companies or business school",
            "QuestionnairePageYes"                : "Yes",
            "QuestionnairePageNo"                 : "No",
            "QuestionnairePageBringYou"           : "What is the best benefit or experience MarkSimos bring to you ? Is there something special you learned that you like was unique / different compared to what you learned before",
            "QuestionnaireSubmit"                 : "提交反馈",

            //Labels for help page
            "HelpPageMenuFAQ"                     : "常见问题",
            "HelpPageMenuVideo"                   : "视频介绍",
            "HelpPageMenuManual"                  : "使用手册",

            //Labels for FAQ Page
            "FAQPageTitle"                        : "常见问题",
            "FAQPageSubTitle"                     : '"常见问题"将包含在MarkSimos项目实施中学员问得最多的问题.',

            "ManualPageTitle"    : "使用手册",
            "ManualPageDownload" : "下载"




        });

        // Tell the module what language to use by default
//        $translateProvider.preferredLanguage('en_US');
        $translateProvider.preferredLanguage('zh_CN');

        $translateProvider.useCookieStorage();
    }]);


})();