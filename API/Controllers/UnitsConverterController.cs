using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitsConverterController : ControllerBase
    {
        public UnitsConverterController()
        {
        }

        [HttpPost]
        public ActionResult<Unit> ConvertUnit()
        {
            return Ok("sucess");
        }
    }
}
