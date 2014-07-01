unit uDecisionFileIO;

interface

uses
  SysUtils, Windows, Messages, MA0_SharedElements;

Function ReadDecisionRecord(DataDirectory: string; seminar: string; pPeriodNumber: TPeriodNumber; pTeamNumber : TCIndx;
 var pDecision: TDecision): integer;

Function WriteDecisionRecord(DataDirectory: string; seminar: string; pPeriodNumber: TPeriodNumber; pTeamNumber:TCIndx;
  var pDecision: TDecision) : integer;

//Function ReadBackupRecord(pPeriodNumber: TPeriodNumber; pTeamNumber : TCIndx;
// var pDecision: TDecision): integer;
//
//Function WriteBackupRecord(pPeriodNumber: TPeriodNumber; pTeamNumber:TCIndx;
//  var pDecision: TDecision) : integer;

//function DoStrToWideChar(s: string): PWideChar;

implementation

Function ReadDecisionRecord(DataDirectory: string; seminar: string; pPeriodNumber: TPeriodNumber;  pTeamNumber : TCIndx;
  var pDecision: TDecision): integer;
var
  vFile    : file of TDecision;
  vFileName   : String;
  vTempResult : integer;
  lastChar: String;
begin
  lastChar :=  Copy(DataDirectory, Length(DataDirectory), 1);
  if lastChar <> '\' then
  begin
     DataDirectory := DataDirectory + '\';
  end;

  vFileName := DataDirectory + 'Decisions_Team' + IntToStr(pTeamNumber) + '.' + seminar;
  try
    AssignFile( vFile, vFileName );
    //add by Michael
   // FileMode := fmOpenRead;
    Reset( vFile );
    if ( pPeriodNumber < Period_0 ) then pPeriodNumber := Period_0;
    Seek( vFile, pPeriodNumber );
    //be sure periodNumber is in the decision file
    //if not, will not get read error
    //if not Eof(vFile) then
     Read( vFile, pDecision);
    CloseFile( vFile );
    vTempResult := 0;
  except
    on E: EInOutError do
    begin
      //ShowMessage( 'Error: '        + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
      vTempResult := E.ErrorCode;
      CloseFile( vFile );
    end;
  end;
  Result := vTempResult;
end;


Function WriteDecisionRecord(DataDirectory: string; seminar: string; pPeriodNumber: TPeriodNumber; pTeamNumber:TCIndx;
  var pDecision: TDecision) : integer;
var
  vFile    : file of TDecision;
  vFileName   : String;
  vTempResult : integer;
begin
  vFileName := DataDirectory + 'Decisions_Team' + IntToStr(pTeamNumber) + '.' + seminar;
  try
    AssignFile( vFile, vFileName );
    Reset( vFile );
    if ( pPeriodNumber < Period_0 ) then pPeriodNumber := Period_0;
    Seek( vFile, pPeriodNumber);
    Write( vFile, pDecision);
    CloseFile( vFile );
    vTempResult := 0;
  except
    on E: EInOutError do
    begin
   //   ShowMessage( 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
      vTempResult := E.ErrorCode;
      CloseFile( vFile );
    end;
  end;
  Result := vTempResult;
end;
//
//Function ReadBackupRecord(pPeriodNumber: TPeriodNumber;  pTeamNumber : TCIndx;
//  var pDecision: TDecision): integer;
//var
//  vFile    : file of TDecision;
//  vFileName   : String;
//  vFileNamesource : String;
//  vTempResult : integer;
//begin
//  vFileName := IncludeTrailingPathDelimiter(DataDirectory) + TeamsDecisionFileNames[pTeamNumber] + SeminarCode + '.bak';
//  vFileNamesource := IncludeTrailingPathDelimiter(DataDirectory) + TeamsDecisionFileNames[pTeamNumber] + SeminarCode;
//  if FileExists(vFileName) = false then
//      CopyFile(Pchar(vFileNamesource),Pchar(vFileName), true);
//
//    //showmessage(inttostr(pPeriodNumber) + inttostr( pTeamNumber));
//  try
//    AssignFile( vFile, vFileName );
//    Reset( vFile );
//    if ( pPeriodNumber < Period_0 ) then pPeriodNumber := Period_0;
//    Seek( vFile, pPeriodNumber );
//    //if not Eof(vFile) then
//    Read( vFile, pDecision);
//    CloseFile( vFile );
//    vTempResult := 0;
//  except
//    on E: EInOutError do
//    begin
//      //ShowMessage( 'Error: '        + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
//      vTempResult := E.ErrorCode;
//      CloseFile( vFile );
//    end;
//  end;
//  Result := vTempResult;
//end;
//
//Function WriteBackupRecord(pPeriodNumber: TPeriodNumber; pTeamNumber:TCIndx;
//  var pDecision: TDecision) : integer;
//var
//  vFile    : file of TDecision;
//  vFileName,vFileNamesource   : String;
//  vTempResult : integer;
//begin
//  vFileName := IncludeTrailingPathDelimiter(DataDirectory) + TeamsDecisionFileNames[pTeamNumber] + SeminarCode + '.bak';
//  vFileNamesource := IncludeTrailingPathDelimiter(DataDirectory) + TeamsDecisionFileNames[pTeamNumber] + SeminarCode;
//  if FileExists(vFileName) = false then
//      CopyFile(Pchar(vFileNamesource),Pchar(vFileName), true);
//
//  try
//    AssignFile( vFile, vFileName );
//    ReSet( vFile );
//    if ( pPeriodNumber < Period_0 ) then pPeriodNumber := Period_0;
//    Seek( vFile, pPeriodNumber);
//    //if not Eof(vFile) then
//    Write( vFile, pDecision);
//    CloseFile( vFile );
//    vTempResult := 0;
//  except
//    on E: EInOutError do
//    begin
//   //   ShowMessage( 'Error: ' + IntToStr( E.ErrorCode ) + #13 + #10 + vFileName + #13 + #10 + E.Message );
//      vTempResult := E.ErrorCode;
//      CloseFile( vFile );
//    end;
//  end;
//  Result := vTempResult;
//end;

//function DoStrToWideChar(s: string): PWideChar;
//var
//    Buff: array[0..255] of WideChar;
//    WChar: PWideChar;
//begin
//    WChar := StringToWideChar(s, Buff, Length(s) + 1);
//    Result := WChar;
//end;

end.
