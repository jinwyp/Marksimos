# 环境设置



## 基本环境配置

### 前端包与依赖管理 使用Bower工具

* 安装Bower

1. 安装Bower到默认全局环境下
``` npm install -g bower ```

2. 安装Bower到当前项目下并写入package.json文件里面
``` npm install bower --save-dev ```


* 安装前段的包与库资源,通过编辑 bower.json 文件,然后运行 ：
``` bower install ```

* 查看已安装的前段的包
``` bower list ```




### 后端(NodeJS)依赖安装：

* 编辑后端依赖列表文件 package.json 文件,然后运行
``` npm install --save-dev ```

* 查看当前已安装的包
``` npm ls ```



##后端Delphi CGI环境配置




# 代码架构说明

## 前端

## 后端




#Delphi 代码说明#
##Directory layout##
```
trunk
├── AdminCockpit
│   ├── MA0\ Brands\ Market\ Studies.INC  				  ------> Organize reports&charts based on result 
│   ├── MA0\ Companies\ Market\ Studies.INC
│   ├── MA0\ SKUs\ Market\ Studies.INC
│   ├── MA0_Brands_PerceptionMaps.pas
│   ├── MA0_Brands_Profiles.pas
│   ├── MA0_Brands_ProfitabilityEvolution.pas
│   ├── MA0_Companies_PerceptionMaps.pas
│   ├── MA0_Companies_Profiles.pas
│   ├── MA0_Companies_ProfitabilityEvolution.pas
│   ├── MA0_CompetitiveIntelligence.pas
│   ├── MA0_ConsumersSurvey.pas
│   ├── MA0_FinalScores.dfm
│   ├── MA0_FinalScores.pas
│   ├── MA0_FinancialReports.pas
│   ├── MA0_FinancialReports_TN.pas
│   ├── MA0_MarketSurveys.pas
│   ├── MA0_SKUs_PerceptionMaps.pas
│   ├── MA0_SKUs_Profiles.pas
│   ├── MA0_SKUs_ProfitabilityEvolution.pas
│   ├── MA0_Segments_PerceptionMaps.pas
│   └── uAdminUtilities.pas                       ------> InitializeFilesAndRun : a example for running [I]
├── Common
│   ├── HCD\ Viewer\ Data\ Structure.INC 				  ------> Data structure for viewer 
│   ├── HCD_SystemDefinitions.pas                         ------> Global Constants #1
│   ├── MA0\ Files\ Names.INC 							  ------> Binary constant file names
│   ├── MA0\ Global\ Constants.INC  				      ------> Global Constants #2
│   ├── MA0\ Global\ Declared\ Constants\ and\ Arrays.INC ------> Global Constants #3
│   ├── MA0\ Global\ Types.INC 							  ------> Global Type (Result&Decision)
│   ├── MA0\ Global\ Variables.INC 						  ------> Gloabl variables (useless)
│   ├── MA0\ String\ IDs.INC 						      ------> String IDs (useless)
│   ├── MA0_AdministratorImportedElements.pas             ------> Loading DLL [I][K] in dynamic way
│   ├── MA0_ImportedElements.pas 						  ------> using CommonFunctions.DLL
│   ├── MA0_Indices.pas                                   ------> calculate Brand/SKU idx
│   ├── MA0_SharedElements.pas                            ------> Loading result of module [E][P] 
│   ├── MA0_StocksSynthesis.pas 	 					  ------> stocks synthesis (useless)
│   ├── MA0_UnitCostPrice.pas                             ------> unitCost calculation function
│   └── uDecisionFileIO.pas                               ------> Deicision Binary I/O
├── Data\ Viewer
├── Decisions
├── Execs
├── Exogenous
├── Initialisation
├── Kernel
├── Parameters
└── ...
```
##Marksimos charts implementation : where to find related field?##

**Unit location**
```
trunk/AdminCockpit/uTeamMainForm.pas
```

Company info series line chart:
```
procedure FillChartWithCompany(...);
```

Market/Segment info series line chart:
```
procedure FillChartMarketEvolution(…);
```

Segment share series pie chart:
```
procedure FillChartSegmentShare(…);
```

SKU leader series bar chart:
```
procedure FillChartSegmentLeader(…);
```

SKU/Brand perception map:
```
procedure CreateTreeBrands(…);
procedure CreateMapBrands(…);
procedure CreateTreeSkus(…);
procedure CreateMapSkus(…);
```

SKU perception map pop info:
```
chartSKUMouseMove
```

SKU/Brand inventory map:
```
procedure CreateTreeInventorySkus(…);
procedure CreateMapInventorySkus(…);
```

##Marksimos reports implementation : where to find related field?##

Company status:
```
trunk/AdminCockpit/MA0_Companies_Profiles.pas
trunk/AdminCockpit/MA0_Brands_Profiles.pas
trunk/AdminCockpit/MA0_SKUs_Profiles.pas
```

Financial data -> Financial report:
```
trunk/AdminiCockpit/MA0_FinancialReports.pas
trunk/AdminiCockpit/MA0_FinancialReports_TN.pas
```

Financial data -> Profitability Evolution:
```
trunk/AdminCockpit/MA0_Companies_ProfitabilityEvolution.pas
trunk/AdminCockpit/MA0_Brands_ProfitabilityEvolution.pas
trunk/AdminCockpit/MA0_SKUs_ProfitabilityEvolution.pas
```

Segment distribution:
```
trunk/AdminCockpit/MA0_ConsumerSurvey.pas
```

Competitor info -> Competitor intelligence 
```
trunk/AdminCockpit/MA0_CompetitveIntelligence.pas
```

Competitor info -> Market Trends
```
trunk/AdminCockpit/MA0_MarketSurveys.pas
trunk/AdminCockpit/MA0 Companies Market Studies.INC
trunk/AdminCockpit/MA0 Brands Market Studies.INC
trunk/AdminCockpit/MA0 SKUs Market Studies.INC
```







# Mongo 安装后

==> Caveats
To have launchd start mongodb at login:
    ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
Then to load mongodb now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
Or, if you don't want/need launchctl, you can just run:
    mongod --config /usr/local/etc/mongod.conf



