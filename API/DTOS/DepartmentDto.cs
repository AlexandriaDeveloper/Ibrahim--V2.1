using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.DTOS
{
    public class DepartmentDto
    {
        public System.Guid Id { get; set; }
        [Required]
        [MaxLength(300)]
        public string Name { get; set; }

    }
    public class DepartmentListDto
    {
        public System.Guid Id { get; set; }
        [Required]
        [MaxLength(300)]
        public string Name { get; set; }

        public int EmployeesCount { get; set; }
    }
    public class DepartmentUploadDto
    {
        public Guid SelectedDepartmentId { get; set; }
        public IFormFile FileUpload { get; set; }

    }
}