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
  team: Integer;
  DataDirectory: string;
  iSize: Integer;
  sDati: string;
  i: Integer;
  sTemp: string;
  resultCode: Integer;

  responseMsg : AnsiString;

begin
  SetMultiByteConversionCodePage(CP_UTF8);

  try
    WriteLn('Content-type: application/json');


    ctx := TSuperRttiContext.Create;

    //jo := TSuperObject.ParseFile('D:\\myfiles\\decision.json', True, True) ;
    //decision := ctx.AsType<TDecision>(jo);

    sValue := getVariable('REQUEST_METHOD');
    //sValue := 'GET';
    if sValue='GET' then
    begin
        sValue := getVariable('QUERY_STRING');
        //sValue := 'period=1&team=1&seminar=TTT';
        params := Explode(sValue);

        LoadConfigIni(DataDirectory, params['seminar']);
        //LoadConfigIni(DataDirectory, getSeminar(sListData));

        resultCode := ReadDecisionRecord(DataDirectory, params['seminar'], StrToInt(params['period']), StrToInt(params['team']), decision);
        if (resultCode<>0) then
        begin
          raise Exception.Create('read decision failed, code:'+IntToStr(resultCode));
        end
        else
        begin
          jo := ctx.AsJson<TDecision>(decision);
          responseMsg := jo.AsJSon(False, True);
        end;

    end
    else
    begin
      sValue := trim(getVariable('CONTENT_LENGTH'));
      if (sValue<>'') then
      begin
        iSize := strtoint(sValue);
        SetLength(sDati,iSize);

        for i:=1 to iSize do
          Read(sDati[i]);

        params := Explode(sDati);

        sTemp := urlDecode(params['decision']);

        jo := SO(sTemp);
        decision := ctx.AsType<TDecision>(jo);

        LoadConfigIni(DataDirectory, params['seminarId']);

        resultCode := WriteDecisionRecord(DataDirectory,
          params['seminarId'],
          StrToInt(params['period']),
          StrToInt(params['team']),
          decision);
        if(resultCode<>0) then
        begin
          raise Exception.Create('Write decision failed, code:' + IntToStr(resultCode));
        end
        else
        begin
          responseMsg := '{"message": "submit_decision_success"}';
        end;
        //Writeln(urlDecode(sDati));
        //Writeln('{"data": "' + params['decision'] + '"}');
      end;
    end;
  except
    on E: Exception do
    begin
      Writeln('Status: 400 Bad Request');
      responseMsg := '{"message": "' + E.ClassName + ': ' + E.Message +'"}';
    end;
  end;

  WriteLn;
  Writeln(responseMsg);
end.
