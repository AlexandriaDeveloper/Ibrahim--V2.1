using Core.Interfaces;
using Core.Models;

namespace Infrastructure.Data
{
    public class DepartmentRepository : GenericRepository<Department>, IDepartmentRepository
    {
        private readonly SallaryContext _context;
        public DepartmentRepository(SallaryContext context) : base(context)
        {
            this._context = context;
        }



    }
}