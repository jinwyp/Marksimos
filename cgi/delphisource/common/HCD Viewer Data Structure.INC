{                                                                                                                            }
{                               H C D   R E S U L T S   V I E W I N G   M O D U L E                                          }
{                                                                                                                            }
{                                             Data  Structure                                                                }
{                                                                                                                            }
{                                                                                                                            }
{  Data viewer structure can be seen as a 4-dimensional matrix: sectors * pages * columns * rows.                            }
{                                                                                                                            }
{  In case of TRENDS data type:                                                                                              }
{     - rows represent data points, for instance: weeks or months                                                            }
{     - columns represent variables or objects, ( ex.: brands, or producers )                                                }
{       / Alternative is also possible i.e. objects in rows and data points in columns /                                     }
{     - pages represent facts, (ex.: market share or average price )                                                         }
{     - sectors represent markets, (ex.: country or consumer segment ).                                                      }
{  As each page/table (rows by columns) contains values within the same range, it may be reasonably converted into a chart.  }
{                                                                                                                            }
{  In case of REPORT data type:                                                                                              }
{     - rows represent facts,                                                                                                }
{     - columns represent objects of the same type (that can be mixed with periods), for instance:                           }
{       brand X in Q1, brand X in Q2, brand Y in Q1, brand Y in Q2, etc.                                                     }
{     - pages and sectors may represent periods or objects (ex.: Q1, Q2, Q3, etc., or SKUs, Brands, Companies ).             }
{  As each page/table (rows by columns) contains values from different ranges, converting it into a chart,                   }
{  although feasible, does not make much sense.                                                                              }
{                                                                                                                            }
{                                                                                                                            }

Const
  vd_WideCharArrayMax       =  63;
  vd_SectorsMax             =  10;
  vd_PagesMax               =  31;
  vd_ColumnsMax             =  76;
  vd_RowsMax                =  vd_ColumnsMax;
  vd_MaximumPercentageOfRAM =  15;
  vd_RangeConsistencyIndex  =   3;

Type
  Thcd_FontAttributes     = record
    font_color : TColor;
    font_style : TFontStyles;
  end;

  Thcd_RowDisplay         = record
    RowFont               : Thcd_FontAttributes;
    BackgroundColor       : TColor;
    RowHeight             : integer;
  end;
  Thcd_DataType           = ( TRENDS, REPORT );
  Thcd_GraphType          = ( LINE, VBAR, HBAR, PIE, SCATTER, BUBLE, LASTGRAPHTYPE );

  Thcd_WideCharArray      = array[0..vd_WideCharArrayMax] of WideChar;
  Thcd_SingleColumnData   = array[0..vd_RowsMax] of single;
  Thcd_SingleColumnLabels = array[0..vd_RowsMax] of Thcd_WideCharArray;
  Thcd_RowsFonts          = array[0..vd_RowsMax] of Thcd_FontAttributes;
  Thcd_RowsDisplay        = array[0..vd_RowsMax] of Thcd_RowDisplay;

  Thcd_PageColumn = record
                      pc_EnableSort : Boolean;
                      pc_Colour   : TColor;
                      pc_Name     : Thcd_WideCharArray;
                      //pc_NameFont : Thcd_FontAttributes;
                      pc_Values   : Thcd_SingleColumnData;
                    end;

  Thcd_Page       = record
  										page_ID										: Integer;
                      page_Name                 : Thcd_WideCharArray;
                      page_DataType             : Thcd_DataType;
                      page_DefaultChartType     : Thcd_GraphType;
                      page_RowsCount            : byte;
                      page_ColumnsCount         : byte;
                      page_ColumnHeadersTitle   : Thcd_WideCharArray;
                      page_RowHeadersTitle      : Thcd_WideCharArray;
                      page_RowHeadersAreNumeric : Boolean;
                      page_RowHeadersValues     : Thcd_SingleColumnData;
                      page_RowHeadersLabels     : Thcd_SingleColumnLabels;
                      //page_RowsFonts            : Thcd_RowsFonts;
                      //page_RowsDisplays         : Thcd_RowsDisplay;
                      page_Columns              : array[0..vd_ColumnsMax] of Thcd_PageColumn;
                    end;

  Thcd_Sector     = record
                      sector_Name               : Thcd_WideCharArray;
                      sector_PagesTitle         : Thcd_WideCharArray;
                      sector_PagesCount         : byte;
                      sector_Pages              : array[0..vd_PagesMax] of Thcd_Page;
                    end;

  Thcd_ViewData   = record
                      vd_CallerWindowHandle  : THandle;
                      vd_language            : THCD_language;
                      vd_CallerWindowCaption : Thcd_WideCharArray;
                      vd_WindowCaption       : Thcd_WideCharArray;
                      vd_SectorsTitle        : Thcd_WideCharArray;
                      vd_SectorsCount        : byte;
                      vd_Sectors             : array[0..vd_SectorsMax] of Thcd_Sector;
                    end;

  Thcd_PViewData = ^Thcd_ViewData;

















