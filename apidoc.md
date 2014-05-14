#API

## /api/init
初始化game

## /api/chart/:chartName
### Parameters
##### :chartName
  * market_share_in_value 
  * market_share_in_volume
  * mind_space_share
  * shelf_space_share
  * net_profit_by_companies
  * return_on_investment
  * investments_versus_budget
  * market_sales_value
  * market_sales_volume
  * total_inventory_at_factory
  * total_inventory_at_trade
  * segmentsLeaders_by_value_price_sensitive
  * segments_leaders_by_value_pretenders
  * segments_leaders_by_value_moderate
  * segments_leaders_by_value_goodLife
  * segments_leaders_by_value_ultimate
  * segments_leaders_by_value_pramatic
  * growth_rate_in_volume
  * growth_rate_in_value
  * net_market_price
  * segment_value_share_total_market

### Response
 
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

## /api/register
### POST
### parameter
####:email
####:password
### response


## url
### method
### parameters
### response
