program decisions;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils, MA0_SharedElements, superobject,
  uDecisionFileIO;

var
  decision: TDecision;
  jo : ISuperObject;
  ctx: TSuperRttiContext;

begin
  try
    WriteLn('Content-type: application/json');
    WriteLn;

    ReadDecisionRecord(0, 1, decision);

    //WriteDecisionRecord(0, 1, decision);
    ctx := TSuperRttiContext.Create;
    jo := ctx.AsJson<TDecision>(decision);
    Writeln(jo.AsJSon(False, False));
    Writeln('HELO');
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
