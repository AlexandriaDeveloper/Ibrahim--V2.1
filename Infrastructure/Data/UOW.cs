using System.Threading.Tasks;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UOW : IUOW
    {

        private readonly SallaryContext _context;


        private IEmployeeRepository _employeeRepository;
        private IDepartmentRepository _departmentRepository;
        public UOW(SallaryContext context)
        {
            this._context = context;
        }


        public IEmployeeRepository EmployeeRepository => _employeeRepository = _employeeRepository ?? new EmployeeRepository(_context);
        public IDepartmentRepository DepartmentRepository => _departmentRepository = _departmentRepository ?? new DepartmentRepository(_context);
        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }



    }
}