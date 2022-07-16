using System.Collections.Generic;

namespace Core.Models
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }


        public virtual ICollection<Employee> Employees { get; set; }
    }
}