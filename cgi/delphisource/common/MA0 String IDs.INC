{                                                                              }
{                            D  R  A  G  O  N                                  }
{                                                                              }
{                              String IDs                                      }
{                                                                              }


Const
{--- Buttons model results -  it is an extension of standard Modal Result set ---}

mr_None                          =  0;
mr_Ok                            =  1;
mr_Cancel                        =  2;
mr_Abort                         =  3;
mr_Retry                         =  4;
mr_Ignore                        =  5;
mr_Yes                           =  6;
mr_No                            =  7;
mr_All                           =  8;

mr_Duplicate                     = 15;

mr_Help                          = 21;
mr_Setup                         = 22;
mr_Print                         = 23;
mr_Close                         = 24;
mr_Change                        = 25;
mr_Graphs                        = 26;
mr_Export                        = 27;
mr_Results                       = 28;
mr_Decision                      = 29;
mr_Copy                          = 30;
mr_SelectAll                     = 31;
mr_Variables                     = 32;
mr_Indexed                       = 33;
mr_Absolute                      = 34;
mr_Continue                      = 35;
mr_New                           = 36;
mr_Delete                        = 37;
mr_Next                          = 38;
mr_Back                          = 39;
mr_Done                          = 40;
mr_Info                          = 41;
mr_Save                          = 42;
mr_SaveAll                       = 43;
mr_Colour                        = 44;
mr_ResetAllDefaults              = 45;
mr_PageSetup                     = 46;
mr_PrintPreview                  = 47;
mr_IncreaseFont                  = 48;
mr_DecreaseFont                  = 49;
mr_HidePrevious                  = 50;
mr_ShowPrevious                  = 51;
mr_Browse                        = 52;
mr_CopyValues                    = 53;
mr_CopyFormulas                  = 54;

mbi_Empty                        = 70;
mbi_Info                         = 71;
mbi_YellowExclam                 = 72;
mbi_RedExclam                    = 73;
mbi_PageSetup                    = 74;
mbi_Question                     = 75;
mbi_StopHand                     = 76;
mbi_ThreeExclam                  = 77;

{--- IO Errors ---------------------------------------------------------------}

errIO_CannotReadDisk            = 100;
errIO_DiskWriteError            = 101;
errIO_FileNotAssigned           = 102;
errIO_FileNotOpen               = 103;
errIO_FileNotForInput           = 104;
errIO_FileNotForOutput          = 105;
errIO_InvalidFormat             = 106;

errIO_None                      = 150;
errIO_UnknownFunction           = 151;
errIO_FileNotFound              = 152;
errIO_PathNotFound              = 153;
errIO_TooManyFiles              = 154;
errIO_AccessDenied              = 155;
errIO_InvalidHandle             = 156;
errIO_InvalidMode               = 157;
errIO_NotEnoughDiskSpace        = 158;
errIO_InvalidDrive              = 159;
errIO_CannotRemoveDir           = 160;
errIO_CannotRename              = 161;
errIO_NoMoreFiles               = 162;

errIO_DiskReadOnly              = 170;
errIO_UnknownUnit               = 171;
errIO_DriveNotReady             = 172;
errIO_UnknownCommand            = 173;
errIO_CRCErrorInData            = 174;
errIO_BadDriveRequest           = 175;
errIO_DiskSeekError             = 176;
errIO_UnknownMediaType          = 177;
errIO_SectorNotFound            = 178;
errIO_PrintOutOfPaper           = 179;
errIO_DeviceWriteFault          = 180;
errIO_DeviceReadFault           = 181;
errIO_HardwareFailure           = 182;

errIO_DataFileDamaged           = 190;
errIO_UnknownError              = 191;
errIO_CannotCreateFolder        = 192;

errIO_TargetIsSource            = 200;
errIO_FileCopyError             = 201;
errIO_OverWriteRefused          = 202;

errIO_ProgramsDirNotFound       = 401;
errIO_NoDataFolder              = 402;
errIO_NoGroupCode               = 403;
errIO_ConfigRecordNotRead       = 404;
errIO_IniFileNotFound           = 405;
errIO_IniFileNotUpdated         = 406;

errIO_NoLanguageDLL             = 410;
errio_AlreadyInitialised        = 411;
errio_DataNotInitialised        = 412;

errio_NoDataFilesFound          = 420;

errdf_OK                        = 450;
errdf_AssignFailed              = 451;
errdf_ResetFailed               = 452;
errdf_RewriteFailed             = 453;
errdf_SeekFailed                = 454;
errdf_PreviousRecordExists      = 455;
errdf_ReadFailed                = 456;
errdf_WriteFailed               = 457;
errdf_CloseFailed               = 458;
errdf_WrongFileID               = 459;
errdf_CannotAcessFile           = 460;
errdf_FileCannotBeCreated       = 461;
errdf_DataFilesError            = 462;

{--- Generic MenuItems --------------------------------------------------------}

mi_File                         = 1100;
mi_ReturnToNavigator            = 1170;
mi_Quit                         = 1180;
mi_SaveAndExit                  = 1190;

mi_Decisions                    = 1200;

mi_Edit                         = 1300;

mi_View                         = 1400;

mi_Options                      = 1800;
mi_Language                     = 1810;

mi_Help                         = 1900;
mi_Index                        = 1910;
mi_Search                       = 1920;
mi_About                        = 1990;

mi_Language_hint                = 2810;
mi_ReturnToNavigator_Hint       = 2170;
mi_Quit_hint                    = 2180;
mi_SaveAndExit_hint             = 2190;


{--- Global Labels ------------------------------------------------------------}

lab_                                   = 10000;

lab_SKU                                = 10011;
lab_SKUs                               = 10012;
lab_AllSKUs                            = 10013;
lab_Brand                              = 10014;
lab_Brands                             = 10015;
lab_AllBrands                          = 10016;
lab_Company                            = 10017;
lab_Companies                          = 10018;

lab_Week                               = 10020;
lab_Weeks                              = 10021;
lab_Quarter                            = 10022;
lab_Quarters                           = 10023;

lab_Month                              = 10030;
lab_Months                             = 10031;
lab_Year                               = 10032;
lab_Years                              = 10033;

lab_Period                             = 10040;
lab_Periods                            = 10041;
lab_AllPeriods                         = 10042;
lab_Previous                           = 10043;
lab_Current                            = 10044;
lab_Next                               = 10045;

lab_ConsumerSegment                    = 10049;
lab_Segment                            = 10050;
lab_Segment_1                          = 10051;
lab_Segment_2                          = 10052;
lab_Segment_3                          = 10053;
lab_Segment_4                          = 10054;
lab_Segment_5                          = 10055;
lab_Segment_6                          = 10056;
lab_AllSegments                        = 10057;
lab_TargetSegment                      = 10058;


lab_Segments                           = 10060;
lab_ConsumerSegments                   = 10061;

lab_AvailableBudget                    = 10062;
lab_availableCapacity                  = 10063;
lab_CompanyName                        = 10065;
lab_CurrentPeriod                      = 10066;
lab_SeminarID                          = 10067;
lab_TeamNumber                         = 10068;

lab_Market                             = 10070;

lab_IngredientsQuality                 = 10078;
lab_AppliedTechnology                  = 10079;


lab_MlnPacks                           = 10160;
lab_Total                              = 10161;

lab_Administrator                      = 10170;

lab_Profile                            = 10180;
lab_Profiles                           = 10181;
lab_FinancialReports                   = 10192;
lab_Expected                           = 10193;

lab_Facts                              = 10200;

lab_Objects                            = 10201;

lab_Decision                           = 10210;
lab_Decisions                          = 10220;

lab_PackSize                           = 10229;
lab_PackSizeSmall                      = 10230;
lab_PackSizeNormal                     = 10231;
lab_PackSizeLarge                      = 10232;

lab_No                                 = 10241;
lab_Yes                                = 10242;
lab_N                                  = 10243;
lab_Y                                  = 10244;
lab_NY                                 = 10245;

lab_NotEnoughMemory                    = 10300;


lab_DemoVersion                        = 10401;
lab_License                            = 10402;
lab_Expires                            = 10403;
lab_Language                           = 10511;
lab_File                               = 10521;

lab_ChangeversusPrevious               = 10600;

lab_SKUMarketTrends                    = 10610;

lab_Team                               = 10620;

lab_CurrentDecisions                   = 10621;
lab_PreviousDecisions                  = 10622;
lab_PreviousPeriod                     = 10623;
lab_SpendingVersusBudget               = 10624;

{--- Team Navigator -----------------------------------------------------------}

tn_                                    = 11000;

tn_File                                = 11100;

tn_Decisions                           = 11200;

tn_Reports                             = 11300;

tn_MarketIndicators                    = 11400;

tn_Options                             = 11500;

tn_Help                                = 11600;


{--- Decisions ----------------------------------------------------------------}

dec_                                   = 12000;
dec_ErrorNotInteger                    = 12001;
dec_File                               = 12100;

dec_Brands                             = 12200;

dec_General                            = 12300;

dec_View                               = 12400;

dec_Options                            = 12500;

dec_Help                               = 12600;

dec_Main                               = 12700;
dec_Main_CaptionPeriod                 = 12701;
dec_Main_DeleteBrandMsg                = 12702;
dec_Main_ErrorLin754                   = 12703;
dec_Main_ErrorReadingMsg               = 12704;
dec_Main_FormCaption                   = 12705;
dec_Main_NotAuthorized                 = 12706;
dec_Main_OutofBudget                   = 12707;
dec_Main_QuitDecisionInputMsg          = 12708;
dec_Main_SaveChangesMsg                = 12709;
dec_Main_SaveMsg                       = 12710;
dec_Main_TabCaptionCustomerService     = 12711;
dec_Main_TabCaptionResearch            = 12712;
dec_Input                              = 12730;
dec_Input_ButtonAddNEWSKU              = 12731;
dec_Input_CellAdditionalTradeMargin    = 12732;
dec_Input_CellConsumerCommunication    = 12733;
dec_Input_CellConsumerPromotions       = 12734;
dec_Input_CellManufacturerPrice        = 12735;
dec_Input_CellProductionVolumn         = 12736;
dec_Input_CellPromotionsSchedule       = 12737;
dec_Input_CellRepriceStock             = 12738;
dec_Input_CellTergetConsumerSegment    = 12739;
dec_Input_CellTradeExpenses            = 12740;
dec_Input_CellWholesaleBonusRate       = 12741;
dec_Input_CellWholesaleMinimumVolume   = 12742;
dec_Input_DecisionsForBrand            = 12743;
dec_Input_MsgErrorComboboxOutRange     = 12744;
dec_Input_MsgTooMuchSKUs               = 12745;
dec_Input_MsgTradeMarginOutrange       = 12746;
dec_Input_NotFloatTypeMsg              = 12747;
dec_Input_NotIntTypeMsg                = 12748;
dec_Input_OutOfRangeMsg                = 12749;
dec_Input_RadioBasic                   = 12750;
dec_Input_RadioExtended                = 12751;
dec_Input_RadioLarge                   = 12752;
dec_Input_RadioMaximal                 = 12753;
dec_Input_RadioSmall                   = 12754;
dec_Input_RadioStandard                = 12755;
dec_Input_TableAddtionalTradeMargin    = 12756;
dec_Input_TableButtonDistinue          = 12757;
dec_Input_TableButtonNo                = 12758;
dec_Input_TableButtonYes               = 12759;
dec_Input_TableConsumerCommunication   = 12760;
dec_Input_TableConsumerPromotion       = 12761;
dec_Input_TableIngredientsquality      = 12762;
dec_Input_TableManufacturerPrice       = 12763;
dec_Input_TableMsgCannotDeleteOnlySKU  = 12764;
dec_Input_TableMsgProductionCapacityInsufficient = 12765;
dec_Input_TableMsgQDeleteSKU                     = 12766;
dec_Input_TableMsgWholesalebonusOutRange         = 12767;
dec_Input_TableNoSpecificTarget        = 12768;
dec_Input_TablePackagingSize           = 12769;
dec_Input_TableProcessingTech          = 12770;
dec_Input_TableProductionVolume        = 12771;
dec_Input_TableSalesforcecost          = 12772;
dec_Input_TableSalesforceMln           = 12773;
dec_Input_TableSKUName                 = 12774;
dec_Input_TableTradeExpenses           = 12775;
dec_Input_TableWarrantyLength          = 12776;
dec_Input_TableWholesaleBonusRate      = 12777;
dec_Input_TableWholesaleminiVolume     = 12778;
dec_LaunchNewBrandErrorMsg             = 12801;
dec_LaunchNewBrandMsg                  = 12802;
dec_Memo                               = 12810;
dec_Memo_AdditonalTradeMargin          = 12811;
dec_Memo_ConsumerCommunication         = 12812;
dec_Memo_ConsumerPromotions            = 12813;
dec_Memo_Discontinue                   = 12814;
dec_Memo_Efficiency                    = 12815;
dec_Memo_IngredientsQuality            = 12816;
dec_Memo_ManufaturerPrice              = 12817;
dec_Memo_PackagingSize                 = 12818;
dec_Memo_ProcessingTechnology          = 12819;
dec_Memo_ProductionVolume              = 12820;
dec_Memo_PromotionsSchedule            = 12821;
dec_Memo_SalesForce                    = 12822;
dec_Memo_TargetConsumerSegment         = 12823;
dec_Memo_Technology                    = 12824;
dec_Memo_TradeExpenses                 = 12825;
dec_Memo_WholesaleBonusRate            = 12826;
dec_Memo_WholesaleMinimumVolume        = 12827;
dec_Research                           = 12840;
dec_Research_ResearchandDevelopment    = 12841;
dec_Research_ResearchandDevelopmentDecision = 12842;
dec_Research_ResearchInvestPE          = 12843;
dec_Research_ResearchInvestPEmln       = 12844;
dec_Research_ResearchInvestPT          = 12845;
dec_Research_ResearchInvestPTmln       = 12846;
dec_SKUInfo                            = 12860;
dec_SKUInfo_AverageConsumerPrice       = 12861;
dec_SKUInfo_ConsumerCommunication      = 12862;
dec_SKUInfo_ConsumerPromotions         = 12863;
dec_SKUInfo_InPackUnits                = 12864;
dec_SKUInfo_InStandardUnits            = 12865;
dec_SKUInfo_MarketSales                = 12866;
dec_SKUInfo_RecommendedConsumerPrice   = 12867;
dec_SKUInfo_shipmentstoRetailers       = 12868;
dec_SKUInfo_StocksatFactory            = 12869;
dec_SKUInfo_StocksatRetailers          = 12870;
dec_SKUInfo_StocksatWholesalers        = 12871;
dec_SKUInfo_UnitProductionCost         = 12872;
dec_SKUInfo_WholesalePrice             = 12873;
dec_SKUNameErrorNameMsg                = 12874;
dec_SKUNameNewSKUMsg                   = 12875;
dec_Spending                           = 12900;
dec_Spending_AcquiredEfficiency        = 12901;
dec_Spending_AcquiredProductionVolume  = 12902;
dec_Spending_AcquiredTechnologyLevel   = 12903;
dec_Spending_AvailableBudget           = 12904;
dec_Spending_AvailableCapacity         = 12905;
dec_Spending_AverageBudget             = 12906;
dec_Spending_ConsumerCommunication     = 12907;
dec_Spending_ConsumerPromotions        = 12908;
dec_Spending_CumulatedPreviousInvestments = 12909;
dec_Spending_EstimatedTMC              = 12910;
dec_Spending_EstimatedWholesaleBonusCost = 12911;
dec_Spending_InitalAvailableBudget     = 12912;
dec_Spending_InvestPE                  = 12913;
dec_Spending_InvestPT                  = 12914;
dec_Spending_SalesForce                = 12915;
dec_Spending_SpendingVBudget           = 12916;
dec_Spending_StaffTraining             = 12917;
dec_Spending_Total                     = 12918;
dec_Spending_TotalInvestment           = 12919;
dec_Spending_TradeExpenses             = 12920;
dec_PromoScheduleMsg_Restored          = 12941;
dec_PromoScheduleMsg_SetToFull         = 12942;
dec_PromoScheduleMsg_SetToNull         = 12943;

dec_CompanyProfiles                    = 12950;
dec_DecisionInput                      = 12951;
dec_Delete                             = 12952;
dec_DeleteCurrentBrand                 = 12953;
dec_DeleteCurrentBrand_Hint            = 12954;
dec_DeleteNewSKU                       = 12955;
dec_DeleteNewSKU_Hint                  = 12956;
dec_LaunchNewBrand                     = 12957;
dec_LaunchNewBrand_hint                = 12958;
dec_SaveCurrentDecision                = 12959;
dec_SaveCurrentDecision_hint           = 12960;
dec_SaveDecisions                      = 12961;
dec_SpendingInformation                = 12962;
dec_SpendingInformation_hint           = 12963;

dec_AddNewSKU                          = 12964;
dec_NewSKUName                         = 12965;
dec_EnterNewBrandName                  = 12966;
dec_EnterNewSKUNameOfNewBrand          = 12967;

{--- Administrator Cockpit ----------------------------------------------------}

ac_                                    = 15000;

ac_File                                = 15100;

ac_Decisions                           = 15200;

ac_View                                = 15300;
ac_ViewCompetitiveIntelligence         = 15340;
ac_ViewProfitabilityEvolution          = 15360;

ac_Administrator                       = 15400;

ac_Options                             = 15500;

ac_Help                                = 15600;


{--- Facts --------------------------------------------------------------------}

fact_                                        = 55100;
fact_ConsumerSalesMlnPacks                   = 55101; {b, s, c}
fact_ConsumerNetSalesMlnUSD                  = 55102;
fact_MarketShareVolume                       = 55103;
fact_MarketShareValue                        = 55104;
fact_VolumeLostDueToOOSMlnPacksStd           = 55105;
fact_AverageNetMarketPrice                   = 55106;
fact_BrandAwareness                          = 55107;
fact_ValuePerception                         = 55108;
fact_ImagePerception                         = 55109;
fact_ShelfSpace                              = 55110;
fact_DistributionNumericalPercent            = 55111;
fact_VWDistributionPercent                   = 55112;
fact_PromotionalSpending                     = 55113;
fact_ConsumerPriceConverted                  = 55114;
fact_ConsumerPricePerPack                    = 55115;
fact_TotalRetailProfit                       = 55116;
fact_AdditionalRetailProfit                  = 55117;
fact_RegularRetailProfit                     = 55118;
fact_TotalWholesaleProfit                    = 55119;
fact_WholesaleVolumeDiscountProfit           = 55120;
fact_RegularWholesaleProfit                  = 55121;
fact_GrossProfit                             = 55122;
fact_NetProfit                               = 55123;
fact_GrossProfitMargin                       = 55124;
fact_NetProfitMargin                         = 55125;
fact_SalesForceCost                          = 55126;
fact_Advertising                             = 55127;
fact_TradeInvestment                         = 55128;
fact_ReturnOnInvestment                      = 55129;
fact_ObsoleteGoodsCost                       = 55130;
fact_DroppedGoodsCost                        = 55131;
fact_InventoryHoldingCost                    = 55132;
fact_CostOfGoodsSold                         = 55133;
fact_TotalMaterialCosts                      = 55134;
fact_OperatingProfit                         = 55135;
fact_OperatingProfitMargin                   = 55136;
fact_Amortisation                            = 55137;
fact_Taxes                                   = 55138;
fact_Interests                               = 55139;
fact_AverageProductionCost                   = 55140;
fact_AverageSellingPrice                     = 55141;
fact_AverageWholesalePrice                   = 55142;
fact_SalesValue                              = 55143;
fact_ProductionCostMlnUSD                    = 55144;
fact_InventoryValueMlnUSD                    = 55145;
fact_ConsumerSalesMlnUSD                     = 55146;
fact_MarketSalesValue                        = 55147;
fact_MarketSalesVolume                       = 55148;
fact_PriceIndex                              = 55149;
fact_ProducedVolumeMlnPacks                  = 55150;
fact_ShipmentsToWholesalersMlnPacks          = 55151;
fact_RetailersPurchasesMlnPacks              = 55152;
fact_RetailersOrdersMlnPacks                 = 55153;
fact_InventoryAtRetailersMlnPacks            = 55154;
fact_InventoryAtWholesalersMlnPacks          = 55155;
fact_InventoryatFactoryMlnPacks              = 55156;
fact_InventoryAtTotalTrade                   = 55157;
fact_MindspaceShare                          = 55158;
fact_AverageDisplayPrice                     = 55159;
fact_ShareInBrandTotalSalesValue             = 55160;
fact_ShareInBrandTotalGrossProfit            = 55161;
fact_ShareInBrandTotalOperatingProfit        = 55162;
fact_ShareInBrandTotalNetProfit              = 55163;
fact_ShareInBrandTotalTradeAndMrktExpenses   = 55164;
fact_ShareInBrandTotalSalesVolume            = 55165;
fact_Awareness                               = 55166;
fact_ConsumerPricePromotionsValue            = 55167;
fact_OtherMaterialCosts                      = 55168;
fact_AverageNetMarketPricePerPack            = 55169;
fact_ShareInCompanyTotalSalesValue           = 55170;
fact_ShareInCompanyTotalGrossProfit          = 55171;
fact_ShareInCompanyTotalOperatingProfit      = 55172;
fact_ShareInCompanyTotalNetProfit            = 55173;
fact_ShareInCompanyTotalTradeAndMrktExpenses = 55174;
fact_ShareInCompanyTotalSalesVolume          = 55175;
fact_OOSEpisodes                             = 55176;
fact_StockCoverAtRetailersInMonths           = 55177;
fact_StockCoverAtRetailersInWeeks            = 55178;
fact_StockCoverAtWholesalersInMonths         = 55179;
fact_StockCoverAtWholesalersInWeeks          = 55180;
fact_VolumeLostDueToOOSMlnPacks              = 55181;
fact_AdditionalTradeMarginCost               = 55182;
fact_TradeAndMarketingExpenses               = 55183;
fact_TradeAndMrktngExpensesAsPercentOfSales  = 55184;
fact_GeneralExpenses                         = 55185;
fact_VolumeDiscountCostMlnUSD                = 55186;
fact_ManufacturerSalesValue                  = 55187;
fact_InventoryAtRetailersMlnPacksStd         = 55188;
fact_InventoryAtWholesalersMlnPacksStd       = 55189;
fact_InventoryatFactoryMlnPacksStd           = 55190;
fact_InventoryAtTotalTradeStd                = 55191;
fact_RetailersPurchasesMlnPacksStd           = 55192;
fact_ProducedVolumeMlnPacksStd               = 55193;
fact_ShipmentsToWholesalersMlnPacksStd       = 55194;
fact_AverageWholesalePriceStd                = 55195;
fact_AverageSellingPriceStd                  = 55196;
fact_AverageProductionCostStd                = 55197;
fact_ChangeInProductionCapacity              = 55198;
fact_AvailableCapacityNextWithOvertime       = 55199; 
fact_AvailableTechnologyLevel                = 55200;
fact_AcquiredEfficiency                      = 55201;
fact_AcquiredProductionFlexibility           = 55202;
fact_CapacityUtilisationRate                 = 55203;
fact_AvailableCapacity                       = 55204;
fact_AvailableCapacityNext                   = 55205;
fact_AvailableCapacityWithOvertime           = 55206;
fact_VolumeShareInSegment                    = 55207;
fact_ValueShareInSegment                     = 55208;
fact_InvestmentInTechnologyLevel             = 55209;
fact_InvestmentInProductionEfficiency        = 55210;
fact_RequiredBudgetForSingleJumpIn_TL        = 55211;
fact_RequiredBudgetForDoubleJumpIn_TL        = 55212;
fact_RequiredBudgetForTwoPercJumpIn_PE       = 55213;
fact_RequiredBudgetForFivePercJumpIn_PE      = 55214;
fact_RequiredBudgetForTwoPercJumpIn_PF       = 55215;
fact_RequiredBudgetForFivePercJumpIn_PF      = 55216;
fact_TotalRetailGrossProfitMargin            = 55217;
fact_TotalWholesaleGrossProfitMargin         = 55218;
fact_ExtraBudgetFinancialCharge              = 55219;
fact_ExceptionalCost                         = 55220;
fact_GeneralExpensesAsPercentOfSales         = 55221;
fact_NetResult                               = 55222;
fact_TotalGeneralExpenses                    = 55223;
fact_Overhead                                = 55224;
fact_CapacityDisposalCost                    = 55225;
fact_OvertimeCost                            = 55226;
fact_AdditionalTradeMarginPercentage         = 55227;
fact_QuantityBonusRate                       = 55228;
fact_BonusMinimalQuantity                    = 55229;


fact_LastFact                                = 55299;


{--- Data Files Initialisation ------------------------------------------------}

init_OK                                = 62000;

init_Caption                           = 62131;
init_CurrentFolderIs                   = 62132;
init_IOErrorNone                       = 62133;
init_AlreadyInitialised                = 62134;
init_Abandonned                        = 62136;
init_CreationError                     = 62137;


init_Label                             = 62233;
init_Created                           = 62234;
init_ReinitCaption                     = 62235;
init_ReinitConfirm1                    = 62236;
init_ReinitConfirm2                    = 62237;
init_ReinitReject                      = 62238;

{--- Simulation ---------------------------------------------------------------}

sim_OK                                 = 63000;
sim_Caption                            = 63001;
sim_CurrentFolderIs                    = 63002;
sim_Errors                             = 63003;
sim_ResultsRead_OK                     = 63400;
sim_DecisionRead_OK                    = 63401;
sim_DecisionsProcessing_OK	       = 63402;
sim_InvestmentsShares_OK               = 63403;

sim_InitFirstEpisode_OK                = 63413;
sim_InitSubsequentEpisode_OK           = 63414;
sim_TradeOrders_OK                     = 63415;
sim_PurchaseIntentions_OK              = 63416;
sim_MarketSales_OK                     = 63417;
sim_FinaliseAnyEpisode_OK              = 63418;
sim_FinaliseLastEpisode_OK             = 63419;
sim_EpisodesLoop_OK                    = 63420;
sim_TechnologyAndCapacity_OK           = 63421;
sim_CompleteResults_OK                 = 63422;
sim_WriteResults_OK                    = 63430;
sim_BackupFiles_OK                     = 63440;


{--- Quick Charts -------------------------------------------------------------}

qc_                                    = 64000;
qc_ChartBackColourScheme               = 64001;
qc_WhenDisplayingAbsolute              = 64002;
qc_WhenDisplayingPercent               = 64003;
qc_LeftSideColour                      = 64004;
qc_RightSideColour                     = 64005;
qc_VarSelection                        = 64006;

qc_hint_                               = 64500;

qc_hint_Cumulated                      = 64502;
qc_hint_File                           = 64503;
qc_hint_GraphBackColour                = 64504;
qc_hint_HideMenu                       = 64505;
qc_hint_Line                           = 64506;
qc_hint_NextPeriod                     = 64507;
qc_hint_OptionsChart                   = 64508;
qc_hint_Pie                            = 64509;
qc_hint_PreviousPeriod                 = 64510;
qc_hint_PrintLandscape                 = 64511;
qc_hint_PrintPortrait                  = 64512;
qc_hint_RecallLastMenu                 = 64513;
qc_hint_ShowAbsolute                   = 64514;
qc_hint_ShowHideValues                 = 64515;
qc_hint_ShowMenu                       = 64516;
qc_hint_ShowPercentage                 = 64517;
qc_hint_VBar                           = 64518;
qc_hint_VerticalAxisScale              = 64519;
qc_hint_SelectVariables                = 64520;




