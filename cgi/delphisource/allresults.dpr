program allresults;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, Windows, Classes, MA0_SharedElements, superobject,
  System.TypInfo, CgiCommonFunction, Generics.Collections;

var
  jo : ISuperObject;
  ctx: TSuperRttiContext;
  onePeriod: POnePeriodInfo;
  sValue: string;
  period: integer;
  params: TDictionary<String, String>;
  resultCode: Integer;
  DataDirectory: string;

begin
  SetMultiByteConversionCodePage(CP_UTF8);

  try
    WriteLn('Content-type: application/json');
    WriteLn;

    sValue := getVariable('QUERY_STRING');
    //sValue := 'seminar=TTT&period=-1';
    params := Explode(sValue);

    LoadConfigIni(DataDirectory, params['seminar']);

    ctx := TSuperRttiContext.Create;
    onePeriod := AllocMem(SizeOf(TOnePeriodInfo));
    resultCode := ReadResults(DataDirectory, params['seminar'],StrToInt(params['period']), onePeriod);

    if(resultCode<>ReadResultsOK) then raise Exception.Create('Read allResults failed, code: '+IntToStr(resultCode));

    jo := ctx.AsJson<TOnePeriodInfo>(onePeriod^);
    Writeln(jo.AsJSon());

  except
    on E: Exception do
      Writeln('{"message": "' + E.ClassName + ': ' + E.Message +'"}');
  end;
end.
