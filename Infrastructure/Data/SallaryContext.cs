using System.Linq;
using System.Reflection;
using Core.Models;

using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Data
{

    public class SallaryContext : DbContext
    {

        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }



        public SallaryContext(DbContextOptions<SallaryContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var proerties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                foreach (var property in proerties)
                {
                    builder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                }
            }
            base.OnModelCreating(builder);
        }
    }
}