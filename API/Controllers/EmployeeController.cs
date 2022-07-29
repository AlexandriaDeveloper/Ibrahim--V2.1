using System;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Core.Models;
using API.DTOS;
using Core.Specification;
using API.Helper;
using Microsoft.Extensions.Hosting;

namespace API.Controllers
{
    public class EmployeeController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IEmployeeService _employeeService;
        private readonly IHostEnvironment _hostEnvironment;

        public EmployeeController(IUOW uow, IMapper mapper, IConfiguration config, IEmployeeService employeeService, IHostEnvironment hostEnvironment) : base(uow, mapper)
        {
            this._hostEnvironment = hostEnvironment;
            this._employeeService = employeeService;
            this._config = config;
        }


        [HttpPost("upload-phone")]
        public async Task<IActionResult> UploadPhoneFile([FromForm] IFormFile file)
        {

            if (file == null)
                return BadRequest();


            var tempPath = await CopyFile(file);
            NPOIService npoi = new NPOIService(tempPath);

            List<string> Sheets = npoi.GetSheetsName();
            DataTable dt = npoi.ReadSheets(Sheets);

            foreach (DataRow row in dt.Rows)
            {
                if (!string.IsNullOrEmpty(row.ItemArray[0].ToString()))
                {
                    var emp = await _uow.EmployeeRepository.GetEmployeeByNationalId(row.ItemArray[0].ToString());
                    if (emp != null)
                    {
                        emp.PhoneNumber = row.ItemArray[2].ToString();
                    }
                }
            }
            await _uow.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {

            if (file == null)
                return BadRequest();


            var tempPath = await CopyFile(file);
            NPOIService npoi = new NPOIService(tempPath);

            List<string> Sheets = npoi.GetSheetsName();
            DataTable dt = npoi.ReadSheets(Sheets);
            List<Employee> employees = _employeeService.EmployeeTableToEntity(dt);

            foreach (var employee in employees)
            {
                if (!await this._uow.EmployeeRepository.CheckEmployeeExistByNationalId(employee.NationalId))
                {

                    try
                    {
                        _uow.EmployeeRepository.Add(employee);
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
        public async Task<ActionResult<IReadOnlyList<Employee>>> GetEmployees([FromQuery] EmployeeParam empParam)
        {

            empParam.IncludeDpertment = true;
            // var empParam = new EmployeeParam();
            var spec = new EmployeeWithSpecification(empParam);

            var countSpec = new EmployeeWithCountAsyncSpecification(empParam);
            IReadOnlyList<Employee> employees = await _uow.EmployeeRepository.GetAll(spec);
            int count = await _uow.EmployeeRepository.CountAsync(countSpec);

            IReadOnlyList<EmployeeDto> employeeDtos = _mapper.Map<IReadOnlyList<EmployeeDto>>(employees);
            if (!empParam.IsPagination)
                return Ok(employeeDtos);

            return Ok(new Pagination<EmployeeDto>(empParam.PageIndex, empParam.PageSize, count, employeeDtos));
        }

        [HttpGet("download-phone")]
        public async Task<ActionResult> GetPhoneNumberExcelFile()
        {
            string fileName = "Blank-phone-number.xlsx";
            //string filePath = Path.Combine(_hostEnvironment.ContentRootPath, "Content\\" + fileName);
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Content\\" + fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();


            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
        [HttpPut]

        public async Task<ActionResult<IReadOnlyList<Employee>>> PutEmployee([FromBody] EmployeeDto employee)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            Employee empToDb = _mapper.Map<Employee>(employee);
            _uow.EmployeeRepository.Update(empToDb);
            await _uow.SaveChangesAsync();
            return Ok();

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(Guid id)
        {

            var empToDb = await _uow.EmployeeRepository.GetById(id);
            if (empToDb == null)
                return BadRequest();


            _uow.EmployeeRepository.Remove(empToDb);
            await _uow.SaveChangesAsync();
            return Ok();
        }

        private async Task<string> CopyFile(IFormFile file)
        {
            var tempPath = Path.GetTempPath() + file.FileName;
            if (System.IO.File.Exists(tempPath))
            {
                System.IO.File.Delete(tempPath);
            }
            using (var fileStream = new FileStream(tempPath, FileMode.Create))
            {

                await file.CopyToAsync(fileStream);
            }
            return tempPath;
        }
    }
}
