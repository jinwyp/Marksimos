program decisions;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils;

begin
  try
    WriteLn('Content-type: application/json');
    WriteLn;
    Writeln('HELLO');
  except
    on E: Exception do
      Writeln(E.ClassName, ': ', E.Message);
  end;
end.
