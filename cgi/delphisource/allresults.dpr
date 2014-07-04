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

begin
  SetMultiByteConversionCodePage(CP_UTF8);

  try
    WriteLn('Content-type: application/json');
    WriteLn;

    sValue := getVariable('REQUEST_METHOD');
    if sValue='GET' then
    begin
      sValue := getVariable('QUERY_STRING');
      params := Explode(sValue);

      ctx := TSuperRttiContext.Create;
      onePeriod := AllocMem(SizeOf(TOnePeriodInfo));
      resultCode := ReadResults(StrToInt(params['period']), onePeriod);

      if(resultCode<>ReadResultsOK) then raise Exception.Create('Read allResults failed, code: '+IntToStr(resultCode));

      jo := ctx.AsJson<TOnePeriodInfo>(onePeriod^);
      Writeln(jo.AsJSon());
    end;
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
