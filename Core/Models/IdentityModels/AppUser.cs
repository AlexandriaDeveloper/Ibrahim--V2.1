using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
namespace Core.Models.IdentityModels
{
    public class AppUser : IdentityUser
    {
        [MaxLength(200)]
        [Required]
        public string DisplayName { get; set; }
        public string DisplayImage { get; set; }
    }
}