using System.Collections.Generic;
using System.IO;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.POIFS.FileSystem;
using System.Data;
using System;

namespace Infrastructure.Services
{
    public class NPOIService
    {
        private IWorkbook workbook;
        private DataTable dt;
        private NPOIService()
        {

        }

        public NPOIService(string file)
        {

            CreateWorkBook(file);
        }

        public void ReadExcel(FileInfo file)
        {

        }

        private void CreateWorkBook(string filePath)
        {


            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite))
            {
                var ext = Path.GetExtension(filePath).ToLower();

                if (ext == ".xls")
                {
                    workbook = new HSSFWorkbook(fs);
                }
                else if (ext == ".xlsx")
                {

                    workbook = new XSSFWorkbook(fs);
                }

            }

        }

        public List<string> GetSheetsName()
        {
            List<string> sheets = new List<string>();
            int sheersIndex = this.workbook.NumberOfSheets;

            for (int i = 0; i < sheersIndex; i++)
            {
                sheets.Add(workbook.GetSheetName(i));
            }
            return sheets;
        }

        public DataTable ReadSheets(List<string> sheets)
        {

            foreach (var sheetName in sheets)
            {
                ISheet sheet = workbook.GetSheet(sheetName);
                if (dt == null)
                {
                    dt = new DataTable();
                    CreateTableHeader(sheet);
                }
                SheetToDataTable(sheet);
            }
            return dt;
        }


        private void CreateTableHeader(ISheet sheet)
        {


            IRow headerRow = sheet.GetRow(sheet.FirstRowNum);
            for (int i = 0; i < headerRow.LastCellNum; i++)
            {
                ICell headerCell = headerRow.GetCell(i);

                // int colIndex = headerCell.ColumnIndex;
                if (headerCell == null)
                {
                    headerCell = headerRow.CreateCell(i);
                    headerCell.SetCellValue("Blank_" + i);
                }
                if (headerCell.CellType == CellType.String)
                    dt.Columns.Add(headerCell.StringCellValue.Trim());
            }
            //return dt;

        }
        private DataTable SheetToDataTable(ISheet sheet)
        {

            if (dt == null)
            {
                dt = new DataTable();
            }
            int rowIndex = 0;
            foreach (IRow row in sheet)
            {
                // skip header row 
                if (rowIndex++ == 0) continue;
                DataRow dataRow = dt.NewRow();

                for (int i = 0; i < row.LastCellNum; i++)
                {

                    var currentCell = row.GetCell(i);
                    if (currentCell == null)
                    {
                        currentCell = row.CreateCell(i);
                    }
                    if (currentCell.CellType == CellType.String)
                    {


                        dataRow[i] = currentCell.StringCellValue;
                    }
                    if (currentCell.CellType == CellType.Numeric)
                        dataRow[i] = currentCell.NumericCellValue.ToString();
                    if (currentCell.CellType == CellType.Formula)
                    {
                        // dataRow[i] = this.helper.EvaluateInCell(currentCell);

                    }
                }

                dt.Rows.Add(dataRow);
            }
            return dt;
        }


    }


}