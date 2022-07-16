using System;

namespace Core.Specification
{
    public class EmployeeParam : Param
    {

        public string Name { get; set; } = null;
        public string NationalId { get; set; } = null;
        public string TabCode { get; set; } = null;
        public string TegaraCode { get; set; } = null;
        public Guid? DepartmentId { get; set; }
        public string PhoneNumber { get; set; } = null;

        public bool IncludeDpertment { get; set; } = false;

    }
}