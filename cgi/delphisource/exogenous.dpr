program exogenous;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, Windows, Classes, MA0_SharedElements, superobject,
  System.TypInfo, CgiCommonFunction, Generics.Collections;


var
  jo : ISuperObject;
  ctx: TSuperRttiContext;
  FExogenous: ^TExogenous;
  sValue: String;
  params: TDictionary<String, String>;
  GConfigureRecord: TConfigurationRecord;
  jsonResult: string;
  resultCode: Integer;

function parseSimulationVariant(p: String): TSimulationVariant;
begin
  if p='FMCG' then
     Result := TSimulationVariant.FMCG
  else
    Result:= TSimulationVariant.DURABLES;
end;

function parseTargetMarket(p: String): TTargetMarket;
begin
  if p='GENERIC' then
     Result := TTargetMarket.GENERIC
  else if p='CHINESE' then
    Result:= TTargetMarket.CHINESE
  else if p='EMERGING' then
    Result:= TTargetMarket.EMERGING
  else
    Result:= TTargetMarket.DEVELOPED;
end;


begin
  SetMultiByteConversionCodePage(CP_UTF8);
  try
    WriteLn('Content-type: application/json');
    ctx := TSuperRttiContext.Create;

    sValue := getVariable('REQUEST_METHOD');
    //sValue := 'GET';
    if sValue='GET' then
    begin
      sValue := getVariable('QUERY_STRING');
      //sValue := 'period=0&simulationVariant=FMCG&targetMarket=GENERIC';
      params := Explode(sValue);

      GConfigureRecord.cr_SimulationVariant := parseSimulationVariant(params['simulationVariant']);
      GConfigureRecord.cr_TargetMarket := parseTargetMarket(params['targetMarket']);

      FExogenous := AllocMem(sizeof(TExogenous));

      WriteLn;

      resultCode := ReadExogenous(StrToInt(params['period']), GConfigureRecord, FExogenous^);

      if(resultCode<>ReadExogenousOK) then raise Exception.Create('Read exogenous failed, code:' + IntToStr(resultCode));
      jo := ctx.AsJson<TExogenous>(FExogenous^);

      jsonResult := jo.AsJSon(False, True);
      jsonResult := StringReplace(jsonResult, 'NAN,', '0,',
                          [rfReplaceAll, rfIgnoreCase]);
      Writeln(jsonResult);
    end;
    { TODO -oUser -cConsole Main : Insert code here }
  except
    on E: Exception do
      Writeln('{"message": "' + E.ClassName + ': ' + E.Message +'"}');
  end;
end.
