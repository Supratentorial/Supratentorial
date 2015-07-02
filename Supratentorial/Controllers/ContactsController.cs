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
    public class ContactsController : ApiController
    {
        private APIContext db = new APIContext();

        [Authorize]
        [Route("api/contacts")]
        [ResponseType(typeof(Contact))]
        [HttpGet]
        // GET: api/contacts
        public IHttpActionResult GetContacts(string searchString)
        {
            var contactList = new List<Contact>();
            if (String.IsNullOrEmpty(searchString))
            {
                return BadRequest();
            }
            else
            {
                var people = db.People.Where(person => person.FirstName.Contains(searchString)|| person.LastName.Contains(searchString));
                return Ok(contactList);
            }
        }

    }
}
