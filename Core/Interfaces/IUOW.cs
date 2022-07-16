using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUOW
    {

        IEmployeeRepository EmployeeRepository { get; }

        IDepartmentRepository DepartmentRepository { get; }
        Task<int> SaveChangesAsync();
    }
}