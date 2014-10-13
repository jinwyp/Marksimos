# 环境设置



## 基本环境配置


### 前端包与依赖管理 使用Bower工具

* 安装Bower

1. 安装Bower到默认全局环境下
``` npm install -g bower ```

2. 安装Bower到当前项目下并写入package.json文件里面
``` npm install bower --save ```


* 安装前段的包与库资源,通过编辑 bower.json 文件, 运行命令为 ：
``` bower install ```

* 查看已安装的前段的包
``` bower list ```

* 安装前端的包与库资源,同时自动写入 bower.json 文件, 运行命令为 ：
``` bower install -S```
``` bower install --save```


### 后端(NodeJS)依赖安装：

* 编辑后端依赖列表文件 package.json 文件, 运行命令为
``` npm install --save-dev ```

* 查看当前已安装的包
``` npm ls ```



### Mongo 数据库安装：

* Mac下使用 Homebrew 安装 ``` brew install mongodb ```

* 安装完成后 可以

To have launchd start mongodb at login:
    ``` ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents ```

Then to load mongodb now:
    ``` launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist ```

Or, if you don't want/need launchctl, you can just run:
    ``` mongod --config /usr/local/etc/mongod.conf ```




* 运行mongo, 并指定数据库路径(默认路径在/usr/local/var/mongodb) ``` mongod --dbpath <path to data directory> ``` (请确保当前用户对数据库文件路径有读写权限)

* 或运行mongo, 并指定配置文件路径(默认的配置文件在 /usr/local/etc/mongod.conf) ``` mongod --dbpath <path to data directory> ```

* mongo 的配置文件范例

```
    // Store data in /usr/local/var/mongodb instead of the default /data/db
    // dbpath = /usr/local/var/mongodb
    dbpath = /Users/jinwyp/Documents/mongodata

    // Append logs to /usr/local/var/log/mongodb/mongo.log
    // logpath = /usr/local/var/log/mongodb/mongo.log

    logpath = /Users/jinwyp/Documents/mongolog/mongo.log
    logappend = true


    // Only accept local connections
    bind_ip = 127.0.0.1


    // fork = true
    // port = 27017
    // quiet = true
    // journal = true

```

### 关闭Mongo
* 使用mongo shell 关闭 命令如下
use admin
db.shutdownServer();

* 使用kill -2 PID 关闭, Mac下查看mongo PID : ps aux | grep mongod



[From 官方文档](http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/)





## 后端Delphi CGI环境配置

### Delphi 部署时 配置 \cgi-bin\CgiConfig 需要更改 相应的配置 注意windows server 的64或32位路径不同





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

##Marksimos decision module implementation : where to find related field?##

Portfolio structure 
```
trunk/Decisions/uPortfoliostructure.pas
```

SKU info pop window
```
trunk/Decisions/uSKUInfoMain.pas
```

Spending Info window
```
trunk/Decisions/uFromSpendingVersusBudget/pas
```

Research development reference window
```
trunk/Decisions/uFormResearchDev.pas
trunk/Decisions/uFormInvestmentRD.pas
```

Data input validation
```
uFormBrandDecision.pas
```






# 生产环境 部署问题Q&A

## 解决80端口无法访问问题, 通过设置iptables 把80转发到3000
### [From stackoverflow](http://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode/23281401#23281401 "Port 80")


Port 80
What I do on my cloud instances is I redirect port 80 to port 3000 with this command:

sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
Then I launch my Node.js on port 3000. Requests to port 80 will get mapped to port 3000.

You should also edit your /etc/rc.local file and add that line minus the sudo. That will add the redirect when the machine boots up. You don't need sudo in /etc/rc.local because the commands there are run as root when the system boots.

Logs
Use the forever module to launch your Node.js with. It will make sure that it restarts if it ever crashes and it will redirect console logs to a file.

Launch on Boot
Add your Node.js start script to the file you edited for port redirection, /etc/rc.local. That will run your Node.js launch script when the system starts.

Digital Ocean & other VPS
This not only applies to Linode, but Digital Ocean, AWS EC2 and other VPS providers as well. However, on RedHat based systems /etc/rc.local is /ect/rc.d/local.


# 服务器数据库配置


启动
```
sudo service mongod start
```
停止
```
sudo service mongod stop
```
修改配置文件
```
sudo vi /etc/mongodb.conf
```


# 运行
NODE_ENV=production nodemon app.js





