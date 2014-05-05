var CompanyLengthMax = 15;
var BrandNameLengthMax = 5;
var SKUNameLengthMax = 2;
var SeminarIDLengthMax = 5;
var SeminarFullNameLengthMax = 40;
var UserNameLengthMax = 40;

var CompaniesMax = 6;
var BrandsMax = 5;
var SKUsMax = 5;

var AllBrandsMax = CompaniesMax * BrandsMax;
var AllSKUsMax = AllBrandsMax * SKUsMax;
var ConsumerSegmentsMax = 6;
var ConsumerSegmentsMaxTotal = ConsumerSegmentsMax + 1;

var TEN = 10;
var Last_CID = CompaniesMax;
var Last_CIDPlus = CompaniesMax + 1;
var Last_BID = TEN * Last_CID + BrandsMax;
var Last_SID = TEN * TEN * Last_CID + TEN * BrandsMax + SKUsMax;

var History_3 = -3;
var History_2 = -2;
var History_1 = -1;
var History_0 = 0;
var Period_0 = 0;
var Period_Max = 9;
var Period_Display = 6; //Max period number of chart&data which displayed in the form and reports
var Never = Period_Max + 1;

var WeeksInQuarter = 13;
var MonthsInYear = 12;

var EpisodesMax = WeeksInQuarter;
var EpisodesBeyondMax = EpisodesMax + 1;
var StocksMax = 4;
var StocksMaxTotal = StocksMax + 1;
var PriceMax = 2; //{ prices may be set for= current production (0); last period production (1); older production (2) }

var P_DimensionsMax = 2;

var TechnologyUltimateLevel = 20;
var IngredientsUltimateQuality = TechnologyUltimateLevel + 2;
var TechnologyToImproveFreshness = 11;
var AdditionalBudgetsMax = 2;

var SimulationName = 'MARKSIMOS';
var ReadParametersOK = 0;
var ReadExogenousOK = 0;
var ReadResultsOK = 0


module.exports = {
  CompanyLengthMax              : CompanyLengthMax,
  BrandNameLengthMax            : BrandNameLengthMax,
  SKUNameLengthMax              : SKUNameLengthMax,
  SeminarIDLengthMax            : SeminarIDLengthMax,
  SeminarFullNameLengthMax      : SeminarFullNameLengthMax,
  UserNameLengthMax             : UserNameLengthMax,

  CompaniesMax                  : CompaniesMax,
  BrandsMax                     : BrandsMax,
  SKUsMax                       : SKUsMax,

  AllBrandsMax                  : AllBrandsMax,
  AllSKUsMax                    : AllSKUsMax,
  ConsumerSegmentsMax           : ConsumerSegmentsMax,
  ConsumerSegmentsMaxTotal      : ConsumerSegmentsMaxTotal,

  TEN                           : TEN,
  Last_CID                      : Last_CID,
  Last_CIDPlus                  : Last_CIDPlus,
  Last_BID                      : Last_BID,
  Last_SID                      : Last_SID,

  History_3                     : History_3,
  History_2                     : History_2,
  History_1                     : History_1,
  History_0                     : History_0,
  Period_0                      : Period_0,
  Period_Max                    : Period_Max,
  Period_Display                : Period_Display,
  Never                         : Never,

  WeeksInQuarter                : WeeksInQuarter,
  MonthsInYear                  : MonthsInYear,

  EpisodesMax                   : EpisodesMax,
  EpisodesBeyondMax             : EpisodesBeyondMax,
  StocksMax                     : StocksMax,
  StocksMaxTotal                : StocksMaxTotal,
  PriceMax                      : PriceMax,

  P_DimensionsMax               : P_DimensionsMax,

  TechnologyUltimateLevel       : TechnologyUltimateLevel,
  IngredientsUltimateQuality    : IngredientsUltimateQuality,
  TechnologyToImproveFreshness  : TechnologyToImproveFreshness,
  AdditionalBudgetsMax          : AdditionalBudgetsMax,

  SimulationName                : SimulationName,
  ReadParametersOK              : ReadParametersOK,
  ReadExogenousOK               : ReadExogenousOK,
  ReadResultsOK                 : ReadResultsOK
};

