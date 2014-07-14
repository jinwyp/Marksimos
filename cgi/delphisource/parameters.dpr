program exogenous;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, Windows, Classes, MA0_SharedElements, superobject,
  System.TypInfo, CgiCommonFunction, Generics.Collections;


var
  jo : ISuperObject;
  ctx: TSuperRttiContext;
  sValue: String;
  params: TDictionary<String, String>;
  GConfigureRecord: TConfigurationRecord;
  GenPar : TGeneralParameters;
  SegPar : TSegmentsParameters;
  jsonResult: String;
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
      //sValue := 'simulationVariant=FMCG&targetMarket=GENERIC';
      params := Explode(sValue);

      GConfigureRecord.cr_SimulationVariant := parseSimulationVariant(params['simulationVariant']);
      GConfigureRecord.cr_TargetMarket := parseTargetMarket(params['targetMarket']);

      WriteLn;
      resultCode := ReadParameters(GenPar, GConfigureRecord, SegPar);

      if(resultCode<>ReadParametersOK) then raise Exception.Create('Read parameter failed, code: '+IntToStr(resultCode));

      jo := ctx.AsJson<TGeneralParameters>(GenPar);

      jsonResult := jsonResult + '{"pgen": ';
      jsonResult := jsonResult +  jo.AsJSon(False, True);
      jsonResult := jsonResult + ',';

      jo := ctx.AsJson<TSegmentsParameters>(SegPar);

      jsonResult := jsonResult + '"pseg": ';
      jsonResult := jsonResult + jo.AsJSon(False, True);
      jsonResult := jsonResult + '}';

      jsonResult := StringReplace(jsonResult, ':NAN,', ':"",',
                          [rfReplaceAll, rfIgnoreCase]);

      Writeln(jsonResult);
    end;
    { TODO -oUser -cConsole Main : Insert code here }
  except
    on E: Exception do
      Writeln('{"message": "' + E.ClassName + ': ' + E.Message +'"}');
  end;
end.
