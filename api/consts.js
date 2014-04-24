module.exports = {
  CompanyLengthMax              : 15,
  BrandNameLengthMax            :  5,
  SKUNameLengthMax              :  2,
  SeminarIDLengthMax            :  5,
  SeminarFullNameLengthMax      : 40,
  UserNameLengthMax             : 40,

  CompaniesMax                  : 6,
  BrandsMax                     : 5,
  SKUsMax                       : 5,

  AllBrandsMax                  : this.CompaniesMax * this.BrandsMax,
  AllSKUsMax                    : this.AllBrandsMax * this.SKUsMax,
  ConsumerSegmentsMax           : 6,
  ConsumerSegmentsMaxTotal      : this.ConsumerSegmentsMax + 1,  

  TEN                           : 10,
  Last_CID                      : this.CompaniesMax,
  Last_CIDPlus                  : this.CompaniesMax + 1,
  Last_BID                      : this.TEN * this.Last_CID + this.BrandsMax,
  Last_SID                      : this.TEN * this.TEN * this.Last_CID + this.TEN * this.BrandsMax + this.SKUsMax,

  History_3                     : -3,
  History_2                     : -2,
  History_1                     : -1,
  History_0                     : 0,
  Period_0                      : 0,
  Period_Max                    : 9,
  Period_Display                : 6,       //Max period number of chart&data which displayed in the form and reports
  Never                         : this.Period_Max + 1,

  WeeksInQuarter                : 13,
  MonthsInYear                  : 12,

  EpisodesMax                   : this.WeeksInQuarter,
  EpisodesBeyondMax             : this.EpisodesMax + 1,
  StocksMax                     : 4,
  StocksMaxTotal                : this.StocksMax + 1,  
  PriceMax                      : 2, //{ prices may be set for: current production (0), last period production (1), older production (2) }

  P_DimensionsMax               : 2,

  TechnologyUltimateLevel       : 20,
  IngredientsUltimateQuality    : this.TechnologyUltimateLevel + 2,
  TechnologyToImproveFreshness  : 11,
  AdditionalBudgetsMax          : 2,

  SimulationName                : 'MARKSIMOS', 
  ReadParametersOK              : 0,
  ReadExogenousOK               : 0,
  ReadResultsOK                 : 0
};

