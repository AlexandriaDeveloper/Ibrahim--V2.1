using System;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<Employee> GetEmployeeByNationalId(string nationalId);
        Task<bool> CheckEmployeeExistByNationalId(string nationalId);
        Task<int> CountEmployeeByDepartmentId(Guid departmentId);
    }
}