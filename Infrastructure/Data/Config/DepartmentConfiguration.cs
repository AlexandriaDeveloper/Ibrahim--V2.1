using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.Property(x => x.Id).IsRequired().HasMaxLength(36);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(300);


            builder.Property(x => x.CreatedBy).HasMaxLength(36);
            builder.Property(x => x.IsDeleted).HasDefaultValue<bool>(false);



        }
    }
}