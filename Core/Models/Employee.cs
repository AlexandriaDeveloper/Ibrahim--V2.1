using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Employee : BaseEntity
    {

        public string Name { get; set; }

        public string TabCode { get; set; }

        public string TegaraCode { get; set; }

        public string NationalId { get; set; }
        public string Collage { get; set; }
        public string Grade { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }


        public Guid? DepartmentId { get; set; }
        public Department Department { get; set; }


    }
}