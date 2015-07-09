using Supratentorial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Supratentorial.Controllers
{
    public class MatterTypeController : ApiController
    {
        private APIContext context = new APIContext();
        [Route("api/mattertypes")]
        [ResponseType(typeof(MatterType))]
        [HttpGet]
        // GET: api/mattertypes
        public IHttpActionResult GetMatterTypes()
        {
            return Ok(context.MatterTypes);
        }
    }
}
