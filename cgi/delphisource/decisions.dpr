program decisions;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, Windows, Classes, MA0_SharedElements, superobject,
  System.TypInfo, uDecisionFileIO, CgiCommonFunction;


var
  decision: TDecision;
  sku: TOneSKUDecision;
  jo : ISuperObject;
  ctx: TSuperRttiContext;
  sListData: tStrings;
  sValue: string;
  iSize: string;
  sDati: string;
  jsonStr: string;

begin
  SetMultiByteConversionCodePage(CP_UTF8);
  sDati := '';
  sListData := TStringList.Create;
  sListData.Clear;

  try
    WriteLn('Content-type: application/json');

    ctx := TSuperRttiContext.Create;

    sValue := getVariable('REQUEST_METHOD');
    //sValue := 'GET';

    if sValue='GET' then
    begin
//        sValue := getVariable('QUERY_STRING');
//        Writeln(sValue);
        WriteLn;
        ReadDecisionRecord(0, 1, decision);
        ctx := TSuperRttiContext.Create;
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
        jo := TSuperObject.ParseFile('D:\\myfiles\\decision.json', False);
        //decision := ctx.AsType<TDecision>(jo);
        sku := ctx.AsType<TOneSKUDecision>(jo);
        //WriteDecisionRecord(0, 1, decision);
      finally
        ctx.Free
      end;
    end;
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
