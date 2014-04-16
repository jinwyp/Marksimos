unit MA0_ImportedElements;

interface

Uses
  HCD_SystemDefinitions,
  MA0_SharedElements;

Function UnitCost( ConfigRecord             : TConfigurationRecord;
                   PeriodNow                : TPeriodNumber;
                   PackSize                 : TPackSize;
                   QualityOfIngredients     : TIngredientsQuality;
                   LevelOfTechnology        : TTechnologyLevel;
                   PreviousCumulatedVolumes : TPerTechnologyLevelData;
                   EfficiencyOfProduction,
                   CurrentVolume            : single ) : single;

Function UnitPrice( ConfigRecord  : TConfigurationRecord;
                    Location      : TSupplyChainPlace;
                    ConsumerPrice : single ) : single;

Procedure PSStockSynthesis( var Stocks : T_ps_AllStocksInfos );

Procedure StockSynthesis( var Stocks : TAllStocksInfos );

Procedure BasicStockSynthesis( var Stocks : TBasicStocksInfos );

Function BrandIndex( aCompany : TCIndx; aProduct : T1CBIndx ) : TBIndx;

Function SKUIndex( aCompany : TCIndx; aProduct : T1CBIndx; anItem : T1BSIndx ) : TSIndx;

Function SetSize( aSet : HCD_set ) : byte;

Function ReadStringFromDLL( aLanguage : THCD_Language; aStringID : longint ) : THCD_CharArray;

Implementation {-------------------------------------------------------------------------------------------------------------}

Function UnitCost( ConfigRecord             : TConfigurationRecord;
                   PeriodNow                : TPeriodNumber;
                   PackSize                 : TPackSize;
                   QualityOfIngredients     : TIngredientsQuality;
                   LevelOfTechnology        : TTechnologyLevel;
                   PreviousCumulatedVolumes : TPerTechnologyLevelData;
                   EfficiencyOfProduction,
                   CurrentVolume            : single ) : single;                         external 'MA0_CommonFunctions.DLL';

Function UnitPrice( ConfigRecord  : TConfigurationRecord;
                    Location      : TSupplyChainPlace;
                    ConsumerPrice : single ) : single;                                   external 'MA0_CommonFunctions.DLL';

Procedure PSStockSynthesis( var Stocks : T_ps_AllStocksInfos );                          external 'MA0_CommonFunctions.DLL';

Procedure StockSynthesis( var Stocks : TAllStocksInfos );                                external 'MA0_CommonFunctions.DLL';

Procedure BasicStockSynthesis( var Stocks : TBasicStocksInfos );                         external 'MA0_CommonFunctions.DLL';

Function BrandIndex( aCompany : TCIndx; aProduct : T1CBIndx ) : TBIndx;                  external 'MA0_CommonFunctions.DLL';

Function SKUIndex( aCompany : TCIndx; aProduct : T1CBIndx; anItem : T1BSIndx ) : TSIndx; external 'MA0_CommonFunctions.DLL';

Function SetSize( aSet : HCD_set ) : byte;                                               external 'MA0_CommonFunctions.DLL';

Function ReadStringFromDLL( aLanguage : THCD_Language;
                            aStringID : longint ) : THCD_CharArray;
begin

end;


{Imports ====================================================================================================================}

End.
