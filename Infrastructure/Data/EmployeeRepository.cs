using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        private readonly SallaryContext _context;
        public EmployeeRepository(SallaryContext context) : base(context)
        {
            this._context = context;
        }


        public async Task<bool> CheckEmployeeExistByNationalId(string nationalId)
        {
            return await _context.Employees.AnyAsync(x => x.NationalId == nationalId);
        }

        public async Task<Employee> GetEmployeeByNationalId(string nationalId)
        {
            return await _context.Employees.SingleOrDefaultAsync(x => x.NationalId == nationalId);
        }



        public async Task<int> CountEmployeeByDepartmentId(Guid departmentId)
        {
            return await _context.Employees.CountAsync(x => x.DepartmentId == departmentId);
        }
    }
}