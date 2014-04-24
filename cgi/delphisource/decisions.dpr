program decisions;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, Windows, Classes, MA0_SharedElements, superobject,
  System.TypInfo, uDecisionFileIO, CgiCommonFunction, Generics.Collections;

var
  decision: TDecision;
  jo : ISuperObject;
  ctx: TSuperRttiContext;
  params: TDictionary<String, String>;
  sValue: string;
  period: integer;
  team: Integer;

begin
  SetMultiByteConversionCodePage(CP_UTF8);

  try
    WriteLn('Content-type: application/json');

    ctx := TSuperRttiContext.Create;

    sValue := getVariable('REQUEST_METHOD');

    if sValue='GET' then
    begin
        sValue := getVariable('QUERY_STRING');
        //sValue := 'period=0&team=1';
        params := Explode(sValue);

        WriteLn;
        ReadDecisionRecord(StrToInt(params['period']), StrToInt(params['team']), decision);
        jo := ctx.AsJson<TDecision>(decision);
        Writeln(jo.AsJSon(False, True));
    end
    else
    begin
//      sValue := trim(getVariable('CONTENT_LENGTH'));
//      if (sValue<>'') then
//      begin
//        iSize := strtoint(sValue);
//        SetLength(sDati,iSize);
//        sValue := getVariable('HTTP_CONTENT_TYPE');
//        if (Trim(sValue)<>'') and (Trim(sValue) <> 'application/x-www-form-urlencoded') then
//          bUpload := true;
//
//      end;
      WriteLn;

      try
        //jo := SO;
        //jo := TSuperObject.ParseFile('D:\\myfiles\\decision.json', False);
        //decision := ctx.AsType<TDecision>(jo);
        //sku := ctx.AsType<TOneSKUDecision>(jo);

//        jo := TSuperObject.ParseFile('D:\\myfiles\\all_results.json', False);
//        onePeriodNotAPointer := ctx.AsType<TOnePeriodInfo>(jo);
        //WriteDecisionRecord(0, 1, decision);
      finally
        ctx.Free
      end;
    end;
  except
    on E: Exception do
    begin
      Writeln(E.ClassName, ': ', E.Message);
    end;
  end;
end.
