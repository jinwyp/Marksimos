/**
 * Created by jinwyp on 7/8/14.
 */

var app = angular.module('marksimos.translation', []);


app.config(['$translateProvider', function($translateProvider){

// Adding a translation table for the English language
    $translateProvider.translations('en_US', {
        "ReportMenuCompanyStatus"     : "Company Status",
        "ReportMenuFinancialData"    :  "Financial Data",
        "ReportMenuInventoryReport"    :  "Inventory Report",
        "ReportMenuProfitabilityEvolution"    :  "Profitability Evolution",
        "ReportMenuMarketShare"    :  "Market Share",
        "ReportMenuCompetitorInformation"    :  "Competitor Information",
        "ReportMenuInvestmentProfits"    :  "Investment & Profits",
        "ReportMenuMarketSalesInventory"    :  "Market Sales & Inventory",
        "ReportMenuSegmentLeaderTop5"    :  "Segment Leader Top5",
        "ReportMenuPerceptionMap"    :  "Perception Map",
        "ReportMenuSegmentDistributions"    :  "Segment Distributions",
        "ReportMenuMarketEvolution"    :  "Market Evolution",
        "ReportMenuMarketTrends"    :  "Market Trends",
        "ReportMenuMarketIndicator"    :  "Market Indicator"
    });

    // Adding a translation table for the Russian language
    $translateProvider.translations('zh_CN', {
        "ReportMenuCompanyStatus"     : "公司基本信息",
        "ReportMenuFinancialData"    :  "财务报告",
        "ReportMenuInventoryReport"    :  "库存报告",
        "ReportMenuProfitabilityEvolution"    :  "盈利变化",
        "ReportMenuMarketShare"    :  "市场份额",
        "ReportMenuCompetitorInformation"    :  "竞争对手情报",
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