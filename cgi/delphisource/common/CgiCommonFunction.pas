unit CgiCommonFunction;

interface {-------------------------------------------------------------------------------------------------------------------}

uses
  SysUtils,
  Windows,
  Classes,
  iniFiles;


const
  dummyPeriod = 0;
  dummyTeam = 'MAY';

function getTeam(sListData : TStrings): string;
function getPeriod(sListData : TStrings): Integer;


function getVariable(name : string):string;
procedure Explode(sQuery: string; var Params:TStrings);

implementation {-------------------------------------------------------------------------------------------------------------------}

function getTeam(sListData : TStrings): string;
begin
  Result := dummyTeam;
  if sListData.IndexOfName('seminar') <> -1 then
    Result  := sListData.Values['seminar'];
end;

function getPeriod(sListData : tStrings): Integer;
begin
  Result := dummyPeriod;
  if sListData.IndexOfName('period') <> -1 then
     Result := StrToInt(sListData.Values['period']);
end;


function getVariable(name:string):string;
   {$IFNDEF LINUX}
var
    Buffer : array [0..2047] of char;
    {$ENDIF}
begin
    {$IFDEF LINUX}
  result := getenv(PChar(Name)); // or Unix/Linux with SysUtils.GetEnvironmentVariable(Name)
  {$ELSE}
  Buffer := '';
  GetEnvironmentVariable(PChar(Name), Buffer, SizeOf(Buffer));
  Result := Buffer;
    {$ENDIF}
end;

procedure Explode(sQuery: string; var Params: tStrings);
var
  nPos : Integer;
  s : string;
begin
  if Length(sQuery)>0 then
  begin
     nPos:=1;
     s:= sQuery;

     while nPos>0 do
     begin
       nPos := Pos('&',s);
	   WriteLn('A');
       if nPos>0 then
         begin
           Params.Add(Copy(s,1,nPos-1));
           s := Copy(s,nPos+1,Length(s)-nPos)
         end
       else
         Params.Add(s);
     end;
  end;
end;

end.

