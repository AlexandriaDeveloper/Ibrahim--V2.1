using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using API.DTOS;
using API.Helper;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.Specification;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DepartmentController : BaseController
    {
        private readonly IEmployeeService _employeeService;
        public DepartmentController(IUOW uow, IMapper mapper, IEmployeeService employeeService) : base(uow, mapper)
        {
            this._employeeService = employeeService;

        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] DepartmentUploadDto file)
        {

            if (file == null)
                return BadRequest();

            var tempPath = Path.GetTempPath() + file.FileUpload.FileName;
            if (System.IO.File.Exists(tempPath))
            {
                System.IO.File.Delete(tempPath);
            }
            using (var fileStream = new FileStream(tempPath, FileMode.Create))
            {

                await file.FileUpload.CopyToAsync(fileStream);
            }

            NPOIService npoi = new NPOIService(tempPath);

            List<string> Sheets = npoi.GetSheetsName();
            DataTable dt = npoi.ReadSheets(Sheets);
            List<Employee> employees = _employeeService.EmployeeTableToEntity(dt);

            foreach (var employee in employees)
            {

                var emp = await this._uow.EmployeeRepository.GetEmployeeByNationalId(employee.NationalId);
                if (emp != null)
                {

                    try
                    {
                        emp.DepartmentId = file.SelectedDepartmentId;
                        _uow.EmployeeRepository.Update(emp);
                    }
                    catch (System.Exception ex)
                    {

                        return BadRequest("خطأ بالملف" + ex.Message);
                    }


                }
                else
                {
                    ///TODOO UPDATE Department
                    // var empFromDb = await _uow.EmployeeRepository.GetEmployeeByNationalId(employee.NationalId);
                    // if (empFromDb != null)
                    // {
                    //     empFromDb.GetHashCode
                    //     _uow.EmployeeRepository.Update(employee);

                    // }

                }
            }
            await _uow.SaveChangesAsync();

            return Ok();

        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DepartmentListDto>>> GetDepartments([FromQuery] DepartmentParam param)
        {

            var spec = new DepartmentWithSpecification(param);



            var departmentsFromDb = await _uow.DepartmentRepository.GetAll(spec);

            var countspec = new DepartmentCountAsyncWithSpecification(param);
            var count = await _uow.DepartmentRepository.CountAsync(countspec);

            var departmentsToReturn = _mapper.Map<IReadOnlyList<DepartmentListDto>>(departmentsFromDb);

            foreach (var department in departmentsToReturn)
            {
                department.EmployeesCount = await _uow.EmployeeRepository.CountEmployeeByDepartmentId(department.Id);
            }
            if (!param.IsPagination)
            {
                return Ok(departmentsToReturn);
            }
            else
            {
                return Ok(new Pagination<DepartmentListDto>(param.PageIndex, param.PageSize, count, departmentsToReturn));
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetDepartments(Guid id)
        {
            var departmentFromDb = await _uow.DepartmentRepository.GetById(id);
            if (departmentFromDb == null)
            {
                return NotFound();
            }
            var departmentToReturn = _mapper.Map<DepartmentDto>(departmentFromDb);
            return Ok(departmentToReturn);
        }


        [HttpPost]
        public async Task<ActionResult> PostDepartment(DepartmentDto department)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var departmentToDb = _mapper.Map<Department>(department);
            _uow.DepartmentRepository.Add(departmentToDb);

            await _uow.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> PutDepartment(DepartmentDto department)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var departmentToDb = await _uow.DepartmentRepository.GetById(department.Id);
            if (departmentToDb == null)
            { return NotFound(); }
            departmentToDb.Name = department.Name;
            _uow.DepartmentRepository.Update(departmentToDb);

            await _uow.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(Guid id)
        {
            var departmentToDb = await _uow.DepartmentRepository.GetById(id);
            if (departmentToDb == null)
            { return NotFound(); }

            _uow.DepartmentRepository.Remove(departmentToDb);
            await _uow.SaveChangesAsync();
            return Ok();
        }
    }
}