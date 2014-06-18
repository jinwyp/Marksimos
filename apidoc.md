#API

## API json 返回状态码定义

格式如下,status 属性表示状态码
```

    {
        status: 0,
        message: "email can't be empty."
    }

```
### 服务器正常工作,没有挂掉的情况下返回码为 2xx,3xx 或4xx

##### 服务器正常工作, Get或Put数据请求正常返回 200 ,操作成功.
##### 服务器正常工作, Post数据请求正常返回 201 ,操作成功, 一般是Create操作
##### 服务器正常工作, Delete 数据请求正常返回 204, 操作成功.一般是delete操作, 返回值 body为空, 由于204响应被禁止包含任何消息体，因此它始终以消息头后的第一个空行结尾。

##### 服务器正常工作, Post或Put 请求后接受的数据格式不对,无法继续处理, 返回值 为409
##### 服务器正常工作, Post或Put 请求后 权限不够, 无法继续处理, 返回值 为401
##### 服务器正常工作, Get, Post或Put 请求后 路由页面出现错误 返回值 为404 Not Found

##### 服务器正常工作, 返回 3xx 一般为重定向,例如301为永久重定向, 302为临时重定向 303 为服务器跳转到新的路由页面上

##### 服务器挂掉的情况下返回码为 5xx

### HTTP 状态码 参考文献 [Wikipedia](http://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/) .



## /api/init
初始化game

## /api/chart/:chartName
### Parameters
##### :chartName
  * market_share_in_value 
  * market_share_in_volume
  * mind_space_share
  * shelf_space_share

  * total_investment
  * net_profit_by_companies
  * return_on_investment
  * investments_versus_budget

  * market_sales_value
  * market_sales_volume
  * total_inventory_at_factory
  * total_inventory_at_trade

  * segments_leaders_by_value_price_sensitive
  * segments_leaders_by_value_pretenders
  * segments_leaders_by_value_moderate
  * segments_leaders_by_value_good_life
  * segments_leaders_by_value_ultimate
  * segments_leaders_by_value_pragmatic

  * growth_rate_in_volume
  * growth_rate_in_value
  * net_market_price
  * segment_value_share_total_market

  * perception_map
  * inventory_report


### Response Format
 
    {
        "chartData": [
            [
                0.528017640113831,
                0.471982389688492
            ],
            [
                0.519770801067352,
                0.480229258537292
            ],
            [
                0.521866738796234,
                0.478133261203766
            ],
            [
                0.517049491405487,
                0.482950508594513
            ]
        ],
        "companyNames": [
            "公司A",
            "公司B"
        ],
        "periods": [
            -3,
            -2,
            -1,
            0
        ]
    }


    {
        "chartData": [
            {
                SKUName : "APONE_1",
                valueSegmentShare : 0.480229258537292
            },
            {
                SKUName : "APONE_2",
                valueSegmentShare : 0.160229258537292
            },
            {
                SKUName : "BOBOB_2",
                valueSegmentShare : 0.138133261203766
            }
        ]
    }


## /api/register
### Method
POST
### Parameters
* email
* password
* response

## /api/sku/decision

### Method
PUT

### Parameters
* brand_id
* sku_id
* sku_data

### response
失败的Response

    HTTP Status: 400, {status: 0, message: "Invalid parameter brand_id."}
    HTTP Status: 500, {status: 0, message: 'update failed.'}

成功的Response

    HTTP Status: 200, {status: 1, message: 'update success.'}

## /api/sku/decision

### Method
POST

### Parameters
* brand_id
* sku_name

## /api/sku/decision

### Method
DELETE

### Parameters
* brand_id
* sku_id

## /api/brand/decision

### Method
PUT

### Parameters
* brand_id
* brand_data


## /api/brand/decision

### Method
POST

### Parameters
brand_name
sku_name


## /api/brand/decision

### Method
DELETE

### Parameters
* brand_id

## /api/company/decision

### Method
PUT

### Parameters
* company_data

## /api/company/decision

### Method
POST

## /api/company/decision

### Method
DELETE

## /api/decision
Get all decisions of all brands in one company in the last period

### Method
GET

### Parameters
no parameters

## /api/product_portfolio
Get production portfolio information

### Method
GET

### Parameters
no parameters

## /api/spending_details
Get spending details

### Method
GET

### Parameters
no parameters


## /api/sku_info/:sku_id
Get SKU information

### Method
GET

### Parameters
* sku_id


## url
### method
### Parameters
### response
