using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.Property(x => x.Id).IsRequired().HasMaxLength(36);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(300);
            builder.Property(x => x.NationalId).IsRequired().IsFixedLength(true).HasMaxLength(14);

            builder.Property(x => x.TabCode).HasMaxLength(6);
            builder.Property(x => x.TegaraCode).HasMaxLength(6);

            builder.Property(x => x.Collage).HasMaxLength(50);

            builder.Property(x => x.Grade).HasMaxLength(200);
            builder.Property(x => x.PhoneNumber).HasMaxLength(11);
            builder.Property(x => x.Email).HasMaxLength(250);


            builder.Property(x => x.CreatedAt).HasMaxLength(36);
            builder.Property(x => x.IsDeleted).HasDefaultValue<bool>(false);


            builder.HasOne(x => x.Department).WithMany(x => x.Employees).OnDelete(DeleteBehavior.SetNull);


        }
    }
}