unit MA0_AdministratorImportedElements;

interface

Uses
  Windows, Messages,
  MA0_SharedElements;


Function InitialiseFiles( ConfigInfo : TConfigurationRecord ) : integer;
Function RunOnePeriod( ConfigInfo : TConfigurationRecord;  PeriodNow : TPeriodNumber ) : integer;

Implementation {-------------------------------------------------------------------------------------------------------------}

//Function InitialiseFiles( ConfigInfo : TConfigurationRecord ) : integer;     external 'MA0_Initialisation.DLL';

//Function RunOnePeriod( ConfigInfo : TConfigurationRecord; PeriodNow : TPeriodNumber ) : integer;     external 'MA0_Kernel.DLL';

//动态调用============================================================================
Function InitialiseFiles( ConfigInfo : TConfigurationRecord ) : integer;
type
  TInitialiseFiles = Function( ConfigInfo : TConfigurationRecord ) : integer;
var
  myInitialiseFiles : TInitialiseFiles;
  OneHandle : THandle;
  lpFarProc : FARPROC;
begin
  OneHandle := LoadLibrary('MA0_Initialisation.DLL'); //动态载入DLL，并返回其句柄
  try
      if OneHandle <> 0 then
      begin
          lpFarProc := GetProcAddress(OneHandle, 'InitialiseFiles');
          if lpFarProc = nil then
          begin
              Writeln('InitialiseFiles Error.');
          end
          else
          begin
              @myInitialiseFiles := lpFarProc;
              Result := myInitialiseFiles(ConfigInfo);
          end;
      end
      else
         Writeln('Can not find library files.');
  finally
      FreeLibrary(OneHandle); //调用完毕收回DLL占用的资源
  end;
end;

Function RunOnePeriod( ConfigInfo : TConfigurationRecord; PeriodNow : TPeriodNumber ) : integer;
type
  TRunOnePeriod = Function( ConfigInfo : TConfigurationRecord; PeriodNow : TPeriodNumber ) : integer;
var
  myRunOnePeriod : TRunOnePeriod;
  OneHandle : THandle;
  lpFarProc : FARPROC;
begin
  OneHandle := LoadLibrary('MA0_Kernel.DLL'); //动态载入DLL，并返回其句柄
  try
      if OneHandle <> 0 then
      begin
          lpFarProc := GetProcAddress(OneHandle, 'RunOnePeriod');
          if lpFarProc = nil then
          begin
              Writeln('RunOnePeriod error.');
          end
          else
          begin
              @myRunOnePeriod := lpFarProc;
              Result := myRunOnePeriod(ConfigInfo,PeriodNow);
          end;
      end
      else
         Writeln('Can not find library files.');

  finally
      FreeLibrary(OneHandle); //调用完毕收回DLL占用的资源
  end;

end;
{Imports ====================================================================================================================}

End.
