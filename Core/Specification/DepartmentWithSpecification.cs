using Core.Models;

namespace Core.Specification
{
    public class DepartmentWithSpecification : Specification<Department>
    {
        public DepartmentWithSpecification(DepartmentParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.Contains(param.Name));
            }
            // if (param.IncludeEmployees)
            // {
            //     AddInclude(x => x.Employees);
            // }
            if (param.IsPagination)
                ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }


    public class DepartmentCountAsyncWithSpecification : Specification<Department>
    {
        public DepartmentCountAsyncWithSpecification(DepartmentParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.Contains(param.Name));
            }

            // ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }
}