using AutoMapper;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController : ControllerBase
    {
        protected readonly IUOW _uow;
        protected readonly IMapper _mapper;
        public BaseController(IUOW uow, IMapper mapper)
        {
            this._mapper = mapper;
            this._uow = uow;

        }
    }
}