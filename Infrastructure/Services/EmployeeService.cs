using System;
using System.Data;
using System.Collections.Generic;
using Core.Models;

namespace Infrastructure.Services
{

    public interface IEmployeeService
    {
        List<Employee> EmployeeTableToEntity(DataTable employeeDataTable);
    }
    public class EmployeeService : IEmployeeService
    {
        public EmployeeService()
        {

        }


        public List<Employee> EmployeeTableToEntity(DataTable employeeDataTable)
        {

            List<Employee> employees = new List<Employee>();

            //ملف بطاقات
            if (employeeDataTable.Columns.Count == 7)
                foreach (DataRow row in employeeDataTable.Rows)
                {
                    string DOBYear = "";
                    string DOBMonth = row.ItemArray[0].ToString().Substring(3, 2);
                    string DOBDay = row.ItemArray[0].ToString().Substring(5, 2);
                    if (row.ItemArray[0].ToString().StartsWith("2"))
                    {
                        DOBYear = "19" + row.ItemArray[0].ToString().Substring(1, 2);
                    }
                    else if (row.ItemArray[0].ToString().StartsWith("3"))
                    {
                        DOBYear = "20" + row.ItemArray[0].ToString().Substring(1, 2);

                    }
                    employees.Add(new Employee()
                    {

                        NationalId = row.ItemArray[0].ToString(),
                        TabCode = row.ItemArray[4].ToString(),
                        Collage = row.ItemArray[2].ToString(),
                        Grade = row.ItemArray[3].ToString(),
                        Name = row.ItemArray[5].ToString(),
                        //28505190201376
                        DOB = new DateTime(int.Parse(DOBYear), int.Parse(DOBMonth), int.Parse(DOBDay)),
                        CreatedAt = DateTime.Now


                    });
                }
            //ملف بنوك
            else
            {
                // employees.Add(new Employee()
                // {

                //     NationalId = row.ItemArray[0].ToString(),
                //     TabCode = row.ItemArray[4].ToString(),
                //     Name = row.ItemArray[5].ToString()

                // });
            }
            return employees;
        }
    }
}