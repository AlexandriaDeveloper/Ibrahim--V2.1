using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.IdentityModels;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {

            if (!roleManager.Roles.Any())
            {
                var roles = new List<AppRole>
                {
                    new AppRole { Name = UserRoles.Member.ToString()},
                    new AppRole {Name = UserRoles.Admin.ToString()},
                     new AppRole {Name = UserRoles.PowerUser.ToString()}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

            }
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com",
                          DisplayImage="test"
                    },
                    new AppUser
                    {
                        DisplayName = "Bob",
                        Email = "bob@test.com",
                        UserName = "bob@test.com",
                        DisplayImage="test"

                    },

                };


                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, UserRoles.Member.ToString());
                    if (user.Email == "admin@test.com") await userManager.AddToRoleAsync(user, UserRoles.Admin.ToString());
                }


            }


        }
    }
}