unit HCD_SystemDefinitions;

Interface {==================================================================================================================}

Uses Windows, SysUtils, Messages;

{$A8}

type
  String874    = type AnsiString(874);    { Thai }
  String932    = type AnsiString(932);    { Japanese Shift-JIS }
  String936    = type AnsiString(936);    { Chinese Simplified }
  String949    = type AnsiString(949);    { Korean }
  String950    = type AnsiString(950);    { Chinese Traditional }
  String1250   = type AnsiString(1250);   { Central European  }
  String1251   = type AnsiString(1251);   { Cyrilic }
  String1252   = type AnsiString(1252);   { Western European }
  String1253   = type AnsiString(1253);   { Greek }
  String1254   = type AnsiString(1254);   { Turkish }
  String1255   = type AnsiString(1255);   { Hebrew }
  String1256   = type AnsiString(1256);   { Arabic }
  String1257   = type AnsiString(1257);   { Baltic }
  String1258   = type AnsiString(1258);   { Vietnamese }
  StringUTF7   = type AnsiString(65000);  { Unicode UTF-7 }
  StringUTF8   = type AnsiString(65001);  { Unicode UTF-8 }

  HCD_set = set of byte;

Const
  CHINESESIMPLIFIED_CODEPAGE    =  936;
  CHINESETRADITIONAL_CODEPAGE   =  950;
  CENTRALEUROPE_CODEPAGE        = 1250;
  CYRILIC_CODEPAGE              = 1251;
  WESTERNEUROPE_CODEPAGE        = 1252;
  GREEK_CODEPAGE                = 1253;
  TURKISH_CODEPAGE              = 1254;

  PathLengthMax                 =  2048;
  CharArrayMax                  =  1023;
  SmallCharArrayMax             =   127;
  WM_HCDMessage_NewData         = WM_User + 3;

Type

  THCD_CharArray        = array[0..CharArrayMax] of Char;
  THCD_SmallCharArray   = array[0..SmallCharArrayMax] of Char;
  THCD_PathCharArray    = array[0..PathLengthMax] of Char;
  THCD_Language         = ( CHINESE_PRC, CHINESE_TAI, CHINESE_H_K, CHINESE_MAC,
                            CHINESE_SGP, KOREAN,      VIETNAMESE,  JAPANESE,
                            ENGLISH_UK,  ENGLISH_US,  ENGLISH_AU,  FRENCH_FRA,
                            FRENCH_CND,  GERMAN,      PORTUGUESE,  SPANISH,
                            RUSSIAN,     GREEK,       POLISH,      TURKISH,
                            L20,         L21,         L22,         L23,
                            L24,         L25,         L26,         L27,
                            L28,         L29,         L30,         L31 );

var
  HCD_CodePage  : integer;


Implementation {=============================================================================================================}

End.

















