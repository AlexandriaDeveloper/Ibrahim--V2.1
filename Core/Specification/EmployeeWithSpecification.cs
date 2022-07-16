using System;
using System.Linq.Expressions;
using Core.Models;

namespace Core.Specification
{
    public class EmployeeWithSpecification : Specification<Employee>
    {
        public EmployeeWithSpecification(EmployeeParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.StartsWith(param.Name));
            }
            if (!string.IsNullOrEmpty(param.TabCode))
            {
                AddCriteries(x => x.TabCode.Equals(param.TabCode));
            }
            if (!string.IsNullOrEmpty(param.TegaraCode))
            {
                AddCriteries(x => x.TegaraCode.Equals(param.TegaraCode));
            }
            if (param.DepartmentId.HasValue)
            {
                AddCriteries(x => x.Department.Id.Equals(param.DepartmentId));
            }
            if (!string.IsNullOrEmpty(param.NationalId))
            {
                AddCriteries(x => x.NationalId.StartsWith(param.NationalId));
            }
            if (param.IncludeDpertment)
            {
                AddInclude(x => x.Department);
            }

            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
    }


    public class EmployeeWithCountAsyncSpecification : Specification<Employee>
    {
        public EmployeeWithCountAsyncSpecification(EmployeeParam param) : base()
        {
            if (!string.IsNullOrEmpty(param.Name))
            {
                AddCriteries(x => x.Name.StartsWith(param.Name));
            }
            if (!string.IsNullOrEmpty(param.TabCode))
            {
                AddCriteries(x => x.TabCode.Equals(param.TabCode));
            }
            if (!string.IsNullOrEmpty(param.TegaraCode))
            {
                AddCriteries(x => x.TegaraCode.Equals(param.TegaraCode));

            }
            if (!string.IsNullOrEmpty(param.DepartmentId.ToString()))
            {
                AddCriteries(x => x.Department.Id.Equals(param.DepartmentId));
            }
            if (!string.IsNullOrEmpty(param.NationalId))
            {
                AddCriteries(x => x.NationalId.StartsWith(param.NationalId));
            }
        }
    }
}