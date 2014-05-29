unit CgiCommonFunction;

interface {-------------------------------------------------------------------------------------------------------------------}

uses
  SysUtils,
  Windows,
  Classes,
  Generics.Collections,
  iniFiles;


const
  dummyPeriod = 0;
  dummyTeam = 'MAY';

function urlDecode(url: string): string;
function getVariable(name : string):string;
function Split(rawStr: string; c: Char):TStringList;
function Explode(sQuery: string):TDictionary<String, string>;
procedure LoadConfigIni(var DataDirectory: string; seminar : string);

implementation {-------------------------------------------------------------------------------------------------------------------}

function urlDecode(url: string): string;
var i, s, g: Integer;
begin
  Result :='';

  for i := 1 to Length(url) do
  begin

    if url[i] = '%' then
    begin
      s := StrtoInt('$' + url[i + 1]) * 16;
      g := StrtoInt('$' + url[i + 2]);

      Result := Result + Chr(s + g);
    end
    else if not (((url[i - 1] = '%') and (url[i + 1] <> '%')) or ((url[i - 2] = '%') and (url[i - 1] <> '%') and (url[i + 1] = '%')) or ((url[i - 2] = '%') and (url[i - 1] <> '%') and (url[i + 1] <> '%'))) then
      Result := Result + url[i];

  end;
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



function Split(rawStr: string; c: Char):TStringList;
var
  nPos : Integer;
  s : string;
begin
  Result:=TStringList.Create;
  if Length(rawStr)>0 then
  begin
     nPos:=1;
     s:= rawStr;

     while nPos>0 do
     begin
       nPos := Pos(c,s);
       if nPos>0 then
         begin
           Result.Add(Copy(s,1,nPos-1));
           s := Copy(s,nPos+1,Length(s)-nPos)
         end
       else
         Result.Add(s);
     end;
  end;
end;

function Explode(sQuery: string):TDictionary<String, string>;
var
  parameters: TStringList;
  keyValue: TStringList;
  i: Integer;
begin
  Result :=  TDictionary<String, String>.Create;
  if Length(sQuery)>0 then
  begin
    parameters := Split(sQuery,'&');
    for i := 0 to parameters.Count-1 do
    begin
       keyValue := Split(parameters[i], '=');
       Result.Add(keyValue[0], keyValue[1]);
    end;
  end;
end;


procedure LoadConfigIni(var DataDirectory: string; seminar : string);
var
	ini : Tinifile;
begin
	ini := TIniFile.Create(ExtractFilePath(ParamStr(0)) + 'CgiConfig.ini');
	with ini do
	begin
	  DataDirectory := ini.ReadString('Options','DataDirectory','C:\Marksimos\');
    //DataDirectory := DataDirectory + seminar + '\';
	  ini.Free;
	end;
end;


end.

