using Core.Models;

namespace Core.Specification
{
    public class DepartmentWithSpecification : Specification<Department>
    {
        public DepartmentWithSpecification(DepartmentParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.StartsWith(param.Name));
            }
            // if (param.IncludeEmployees)
            // {
            //     AddInclude(x => x.Employees);
            // }
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }


    public class DepartmentCountAsyncWithSpecification : Specification<Department>
    {
        public DepartmentCountAsyncWithSpecification(DepartmentParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.StartsWith(param.Name));
            }

            // ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }
}