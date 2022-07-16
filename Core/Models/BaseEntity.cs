using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class BaseEntity
    {

        [Required]
        public Guid Id { get; set; }
        [MaxLength(200)]
        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}