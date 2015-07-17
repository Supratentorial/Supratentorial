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
    public class RelationshipTypeController : ApiController
    {
        private APIContext context = new APIContext();
        [Route("api/relationshiptypes")]
        [ResponseType(typeof(RelationshipType))]
        [HttpGet]
        // GET: api/mattertypes
        public IHttpActionResult GetRelationshipTypes()
        {
            return Ok(context.RelationshipTypes);
        }
    }
}
