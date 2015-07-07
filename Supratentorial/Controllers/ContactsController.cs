using Supratentorial.Models;
using Supratentorial.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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


        [Route("api/contacts")]
        [ResponseType(typeof(ContactDTO))]
        [HttpGet]
        // GET: api/contacts
        public IHttpActionResult GetContacts(string searchString)
        {
            var contactList = new List<ContactDTO>();
            if (String.IsNullOrEmpty(searchString))
            {
                return BadRequest();
            }
            else
            {
                var result = db.Contacts.Where(contact => contact.Person.FirstName.Contains(searchString) || contact.Person.LastName.Contains(searchString) || contact.Company.TradingName.Contains(searchString))
                    .Include(contact => contact.Person)
                    .Include(contact => contact.EmailAddresses)
                    .Include(contact => contact.PhoneNumbers)
                    .Include(contact => contact.Addresses);
                var companies = db.Contacts.Where(contact => contact.Company.TradingName.Contains(searchString)).Include(contact => contact.Company);
                foreach (var contact in result)
                {
                    ContactDTO contactDTO = new ContactDTO();
                    contactDTO.ContactId = contact.ContactId;
                    contactDTO.DisplayName = contact.Person.FirstName + " " + contact.Person.LastName;
                    contactDTO.EmailAddresses = contact.EmailAddresses;
                    contactDTO.PhoneNumbers = contact.PhoneNumbers;
                    contactDTO.Addresses = contact.Addresses;
                    contactList.Add(contactDTO);
                }
                return Ok(contactList);
            }
        }

        [Route("api/contacts/{contactId}")]
        // GET: api/contact/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult GetContactById(int contactId)
        {
            Contact contact = db.Contacts.Include(c => c.Person)
                .Include(c => c.PhoneNumbers)
                .Include(c => c.EmailAddresses)
                .Include(c => c.Addresses)
                .SingleOrDefault(c => c.ContactId == contactId);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [Route("api/contacts")]
        // POST: api/contact
        [ResponseType(typeof(Contact))]
        public IHttpActionResult PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contacts.Add(contact);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "contacts", id = contact.ContactId }, contact);
        }


        [Route("api/contacts/{contactId}")]
        // PUT: api/people/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContact(int contactId, Contact contact)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (contactId != contact.ContactId)
            {
                return BadRequest();
            }

            if (contactId == 0)
            {
                return BadRequest();
            }

            foreach (EmailAddress email in contact.EmailAddresses)
            {
                if (String.IsNullOrEmpty(email.Address))
                {
                    return BadRequest();
                }
                if (email.ContactId != contact.ContactId)
                {
                    return BadRequest("Email.ContactId of " + email.ContactId + " does not match Contact.ContactId of " + contact.ContactId +".");
                }
                db.Entry(email).State = email.EmailId == 0 ? EntityState.Added : EntityState.Modified;
            }
            foreach (PhoneNumber phone in contact.PhoneNumbers)
            {
                if (String.IsNullOrEmpty(phone.Number))
                {
                    return BadRequest("Phone.");
                }
                if (phone.ContactId != contact.ContactId) {
                    return BadRequest("Phone.ContactId of " + phone.ContactId + " does not match Contact.ContactId of " + contact.ContactId + ".");
                }
                db.Entry(phone).State = phone.PhoneId == 0 ? EntityState.Added : EntityState.Modified;
            }
            foreach (Address address in contact.Addresses)
            {
                db.Entry(address).State = address.AddressId == 0 ? EntityState.Added : EntityState.Modified;
            }
            db.Entry(contact).State = EntityState.Modified;
            db.Entry(contact.Person).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(contactId))
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

        // DELETE: api/people/5
        [Route("api/contacts/{contactId}")]
        [ResponseType(typeof(Contact))]
        public IHttpActionResult DeleteContact(int contactId)
        {
            Contact contact = db.Contacts.Find(contactId);
            if (contact == null)
            {
                return NotFound();
            }
            //Change to constant
            contact.ContactStatusId = 5;
            db.SaveChanges();
            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int id)
        {
            return db.Contacts.Count(e => e.ContactId == id) > 0;
        }
    }
}
