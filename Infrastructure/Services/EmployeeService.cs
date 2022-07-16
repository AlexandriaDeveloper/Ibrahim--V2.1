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
            /*
            
            
                    [0] [object]:
                    "22405260200066"
                    [1] [object]:
                    "2-اخرى بطاقات حكومية"
                    [2] [object]:
                    {}
                    [3] [object]:
                    {}
                    [4] [object]:
                    "9"
                    [5] [object]:
                    "حفيظة محمد البنا"
                    [6] [object]:
                    {}

            */
            //ملف بطاقات
            if (employeeDataTable.Columns.Count == 7)
                foreach (DataRow row in employeeDataTable.Rows)
                {
                    employees.Add(new Employee()
                    {

                        NationalId = row.ItemArray[0].ToString(),
                        TabCode = row.ItemArray[4].ToString(),
                        Collage = row.ItemArray[2].ToString(),
                        Grade = row.ItemArray[3].ToString(),
                        Name = row.ItemArray[5].ToString(),
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