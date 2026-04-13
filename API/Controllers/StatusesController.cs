using API.Application.DTOs;
using API.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusesService _service;
        public StatusesController(IStatusesService service) { _service = service; }

        /// <summary>Returns all statuses</summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatuses()
        {
            var statuses = await _service.GetAll();
            return Ok(statuses);
        }
    }
}
