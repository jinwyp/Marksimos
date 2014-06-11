unit MA0_SharedElements;

Interface

uses
  SysUtils, Windows, Messages, HCD_SystemDefinitions;

{$I 'MA0 Global Constants.INC'}
{$I 'MA0 Global Types.INC'}
{$I 'MA0 Files Names.INC'}
{$I 'MA0 Global Variables.INC'}
{'MA0 Global Declared Constants and Arrays.INC'}
{'MA0 String IDs.INC'}
{'HCD Viewer Data Structure.INC'}

Function DLLStr( aStringID : Integer ) : String;
Function ReadExogenous( PeriodNumber : TPeriodNumber; ConfigRecord : TConfigurationRecord; var ExoRecord : TExogenous ) : Integer;
Function ReadParameters( var GenPar : TGeneralParameters; ConfigRecord : TConfigurationRecord; var SegPar : TSegmentsParameters ) : Integer;

//Function ReadExogenous( PeriodNumber : TPeriodNumber; vSimulationVariant : TSimulationVariant; var ExoRecord : TExogenous ) : Integer; overload;
//Function ReadParameters( var GenPar : TGeneralParameters; vSimulationVariant : TSimulationVariant; var SegPar : TSegmentsParameters ) : Integer;overload;


Function ReadResults( PeriodNumber : TPeriodNumber; var OnePeriodResults : POnePeriodInfo ) : Integer;
//Function ReadResults( PeriodNumber : TPeriodNumber; var OnePeriodResults : TOnePeriodInfo ) : Integer;
procedure WriteToLogfile(messa : string);

Implementation {-------------------------------------------------------------------------------------------------------------}

uses
  MA0_ImportedElements;


procedure WriteToLogfile(messa : string);
var
  filename, vPath : string;
  Logfile : TextFile;
begin
  vPath := ParamStr(0);
  vPath := ExtractFilePath(vPath);
  filename := IncludeTrailingPathDelimiter(vPath) + 'system.log';
  Assignfile(logfile, filename);
  if fileExists(filename) then
    append(logfile)
  else
    rewrite(logfile);
  try
    writeln(logfile, DateTimeToStr(now) + ' : ' + messa);
  finally
    close(logfile);
  end;
end;

Function DLLStr( aStringID : Integer ) : String;
begin
  Result := ReadStringFromDLL( CurrentLanguage, aStringID );
end;

//overload : use SimulationVariant intead of ConfigRecord
//Function ReadExogenous( PeriodNumber : TPeriodNumber; vSimulationVariant : TSimulationVariant;vTargetMarket : TTargetMarket; var ExoRecord : TExogenous ) : Integer;
//var
//  ExoFile    : file of TExogenous;
//  FileName   : String;
//  TempResult : Integer;
//  vPath : string;
//begin
//  vPath := ParamStr(0);
//  vPath := ExtractFilePath(vPath);
//  with ConfigRecord do
//    FileName := ExogenousFileName[vSimulationVariant, vTargetMarket];
//
//  FileName := IncludeTrailingPathDelimiter(vPath)+FileName;
//  try
//      try
//        AssignFile( ExoFile, FileName );
//        Reset( ExoFile );
//        Seek( ExoFile, PeriodNumber - History_3 );
//        Read( ExoFile, ExoRecord );
//        TempResult := ReadExogenousOK;
//      except
//        on E: EInOutError do
//        begin
//          ShowMessage( 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + FileName + #13 + #10 + E.Message );
//          TempResult := E.ErrorCode;
//        end;
//      end;
//  finally
//        CloseFile( ExoFile );
//  end;
//
//  Result := TempResult;
//
//end;

Function ReadExogenous( PeriodNumber : TPeriodNumber; ConfigRecord : TConfigurationRecord; var ExoRecord : TExogenous ) : Integer;
var
  ExoFile    : file of TExogenous;
  FileName   : String;
  TempResult : Integer;
  vPath : string;
begin
  vPath := ParamStr(0);
  vPath := ExtractFilePath(vPath);
  with ConfigRecord do FileName := ExogenousFileName[cr_SimulationVariant, cr_TargetMarket];
  FileName := IncludeTrailingPathDelimiter(vPath)+FileName;
  try
      try
        AssignFile( ExoFile, FileName );
        Reset( ExoFile );
        Seek( ExoFile, PeriodNumber - History_3 );
        Read( ExoFile, ExoRecord );
        TempResult := ReadExogenousOK;
      except
        on E: EInOutError do
        begin
          TempResult := E.ErrorCode;
        end;
      end;
  finally
        CloseFile( ExoFile );
  end;

  Result := TempResult;

end;

////overload : use SimulationVariant intead of ConfigRecord
//Function ReadParameters( var GenPar : TGeneralParameters; vSimulationVariant : TSimulationVariant;vTargetMarket : TTargetMarket; var SegPar : TSegmentsParameters ) : Integer;
//var
//  ParFile    : file of TParameters;
//  ParRecord  : TParameters;
//  FileName   : String;
//  TempResult : Integer;
//  vPath : string;
//begin
//  vPath := ParamStr(0);
//  vPath := ExtractFilePath(vPath);
//  //MessageBox(0,Pchar(vPath),'note',MB_OK);
//
//  with ConfigRecord do FileName := ParametersFileName[vSimulationVariant, vTargetMarket];
//  FileName := IncludeTrailingPathDelimiter(vPath)+FileName;
//  //WriteToLogfile(FileName);
//  try
//        try
//          AssignFile( ParFile, FileName );
//          Reset( ParFile );
//          Seek( ParFile, 0 );
//          //MessageBox(0,Pchar(FileName),'note',MB_OK);
//          Read( ParFile, ParRecord );
//          //MessageBox(0,'after read','note',MB_OK);
//          with ParRecord do
//          begin
//            GenPar := ParRecord.pgen;
//            SegPar := ParRecord.pseg;
//          end;
//          TempResult := ReadParametersOK;
//        except
//          on E: EInOutError do
//          begin
//            ShowMessage( 'Read Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + FileName + #13 + #10 + E.Message );
//            TempResult := E.ErrorCode;
//          end;
//        end;
//  finally
//        CloseFile( ParFile );
//  end;
//  Result := TempResult;
//
//end;
//
Function ReadParameters( var GenPar : TGeneralParameters; ConfigRecord : TConfigurationRecord; var SegPar : TSegmentsParameters ) : Integer;
var
  ParFile    : file of TParameters;
  ParRecord  : TParameters;
  FileName   : String;
  TempResult : Integer;
  vPath : string;
begin
  vPath := ParamStr(0);
  vPath := ExtractFilePath(vPath);
  //MessageBox(0,Pchar(vPath),'note',MB_OK);

  with ConfigRecord do FileName := ParametersFileName[cr_SimulationVariant, cr_TargetMarket];
  FileName := IncludeTrailingPathDelimiter(vPath)+FileName;
  //WriteToLogfile(FileName);
  try
        try
          AssignFile( ParFile, FileName );
          Reset( ParFile );
          Seek( ParFile, 0 );
          //MessageBox(0,Pchar(FileName),'note',MB_OK);
          Read( ParFile, ParRecord );
          //MessageBox(0,'after read','note',MB_OK);
          with ParRecord do
          begin
            GenPar := ParRecord.pgen;
            SegPar := ParRecord.pseg;
          end;
          TempResult := ReadParametersOK;
        except
          on E: EInOutError do
          begin
            TempResult := E.ErrorCode;
          end;
        end;
  finally
        CloseFile( ParFile );
  end;
  Result := TempResult;

end;

Function ReadResults( PeriodNumber : TPeriodNumber; var OnePeriodResults : POnePeriodInfo ) : Integer;
var
  ResultsFile : file of TOnePeriodInfo;
  FileName    :  String;
  TempResult  : Integer;
  RecNo       : Integer;

begin
  RecNo := PeriodNumber - History_3;
  FileName := IncludeTrailingPathDelimiter(DataDirectory) +  AllResultsFileName + SeminarCode;
  FileName := 'D:\\myfiles\\marksimons-data\\AllResults.TTT';
  if FileExists(FileName) = false then
  begin
      //MessageDlg('result file does not exist:' + FileName,mtWarning,[mbOK], 0);
      Result := -1;
      exit;
  end;

  try
      try
        AssignFile( ResultsFile, FileName);
        Reset( ResultsFile);
        Seek( ResultsFile, RecNo );
        Read( ResultsFile, OnePeriodResults^ );
        TempResult := ReadResultsOK;
      except
        on E: EInOutError do
        begin
         // ShowMessage( 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + FileName + #13 + #10 + E.Message );
          TempResult := E.ErrorCode;
        end;
      end;  { try }

  finally
      CloseFile( ResultsFile);
  end;

  Result := TempResult;

end;

//ReadResults method without using pointer
//Function ReadResults( PeriodNumber : TPeriodNumber; var OnePeriodResults : TOnePeriodInfo ) : Integer;
//var
//  ResultsFile : file of TOnePeriodInfo;
//  FileName    :  String;
//  TempResult  : Integer;
//  RecNo       : Integer;
//
//begin
//  RecNo := PeriodNumber - History_2;
//  FileName := IncludeTrailingPathDelimiter(DataDirectory) +  AllResultsFileName + SeminarCode;
//  FileName := 'D:\\myfiles\\marksimons-data\\AllResults.TTT';
//  if FileExists(FileName) = false then
//  begin
//      //MessageDlg('result file does not exist:' + FileName,mtWarning,[mbOK], 0);
//      Result := -1;
//      exit;
//  end;
//
//  try
//      try
//        AssignFile( ResultsFile, FileName);
//        Reset( ResultsFile);
//        Seek( ResultsFile, RecNo );
//        Read( ResultsFile, OnePeriodResults );
//        TempResult := ReadResultsOK;
//      except
//        on E: EInOutError do
//        begin
//         // ShowMessage( 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + FileName + #13 + #10 + E.Message );
//          TempResult := E.ErrorCode;
//        end;
//      end;  { try }
//
//  finally
//      CloseFile( ResultsFile);
//  end;
//
//  Result := TempResult;
//
//end;

begin

End.

