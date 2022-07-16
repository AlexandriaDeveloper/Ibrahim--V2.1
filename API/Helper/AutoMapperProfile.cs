using API.DTOS;
using Core.Models;

namespace API.Helper
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Department, DepartmentListDto>()
            .ForMember(src => src.EmployeesCount, opt => opt.MapFrom(dest => dest.Employees.Count))

            .ReverseMap();


            CreateMap<Department, DepartmentDto>()
      .ReverseMap();
        }
    }
}