using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Supratentorial.Models;

namespace Supratentorial.Controllers
{
    public class PeopleController : ApiController
    {
        private APIContext db = new APIContext();

        [Route("api/people")]
        [HttpGet]
        // GET: api/people
        public IQueryable<Person> GetPeople(string lastName = "")
        {
            if (string.IsNullOrEmpty(lastName)) { return db.People; }
            else
            {
                return db.People.Where(person => person.LastName == lastName);
            }
        }

        [Route("api/people/{personId}")]
        // GET: api/people/5
        [ResponseType(typeof(Person))]
        public IHttpActionResult GetPerson(int personId)
        {
            Person person = db.People.Find(personId);
            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [Route("api/people/{personId}")]
        // PUT: api/people/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPerson(int personId, Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (personId != person.PersonId)
            {
                return BadRequest();
            }

            if (personId == 0)
            {
                return BadRequest();
            }

            db.Entry(person).State = EntityState.Modified;
            foreach (EmailAddress email in person.EmailAddresses)
            {
                db.Entry(email).State = email.EmailId == 0 ? EntityState.Added : EntityState.Modified;
            }
            foreach (PhoneNumber phone in person.PhoneNumbers)
            {
                db.Entry(phone).State = phone.PhoneId == 0 ? EntityState.Added : EntityState.Modified;
            }
            foreach (Address address in person.Addresses)
            {
                db.Entry(address).State = address.AddressId == 0 ? EntityState.Added : EntityState.Modified;
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(personId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        [Route("api/people")]
        // POST: api/people
        [ResponseType(typeof(Person))]
        public IHttpActionResult PostPerson(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.People.Add(person);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "people", id = person.PersonId }, person);
        }

        // DELETE: api/people/5
        [ResponseType(typeof(Person))]
        public IHttpActionResult DeletePerson(int id)
        {
            Person person = db.People.Find(id);
            if (person == null)
            {
                return NotFound();
            }

            db.People.Remove(person);
            db.SaveChanges();

            return Ok(person);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonExists(int id)
        {
            return db.People.Count(e => e.PersonId == id) > 0;
        }
    }
}