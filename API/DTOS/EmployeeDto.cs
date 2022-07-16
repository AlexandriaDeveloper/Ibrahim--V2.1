using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class EmployeeDto

    {
        public System.Guid Id { get; set; }
        [Required]
        [MaxLength(300)]
        public string Name { get; set; }
        [MaxLength(6)]
        public string TabCode { get; set; }
        [MaxLength(6)]
        public string TegaraCode { get; set; }

        [MaxLength(50)]

        public string Collage { get; set; }
        [MaxLength(200)]
        public string Grade { get; set; }
        [Required]
        [MaxLength(14), MinLength(14)]
        public string NationalId { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [MaxLength(11), MinLength(11)]
        public string PhoneNumber { get; set; }
        public Guid? DepartmentId { get; set; } = null;
    }
}