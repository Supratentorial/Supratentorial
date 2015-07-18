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
using Supratentorial.Models.DTOs;
using System.Threading.Tasks;
using Microsoft.Azure.ActiveDirectory.GraphClient;
using Supratentorial.Utils;

namespace Supratentorial.Controllers
{
    public class MattersController : ApiController
    {
        private APIContext db = new APIContext();

        // GET: api/Matters
        public async Task<IHttpActionResult> GetMatters()
        {
            var matters = db.Matters.Include(matter => matter.Relationships).Include(matter => matter.UserMatterAssociations);
            var matterDTOs = new List<MatterDTO>();
            var staffDTOs = new List<UserDTO>();
            foreach (Matter matter in matters) { 
                var clientRelationships = await matter.Relationships.Where(r => r.RelationshipType.Name == "Client").ToListAsync();
                var clients = new List<ContactDTO>();
                foreach(Relationship relationship in clientRelationships){
                    var displayName = "";
                    var type = "";
                    
                    if(relationship.Contact.Person != null){
                        displayName = relationship.Contact.Person.FirstName + " " + relationship.Contact.Person.LastName;
                        type = "Person";
                    } else if(relationship.Contact.Company != null){
                        displayName = relationship.Contact.Company.TradingName + " " + relationship.Contact.Company.TradingSuffix;
                        type = "Company";
                    }
                    var clientDTO = new ContactDTO(){
                        ContactId = relationship.ContactId.GetValueOrDefault(),
                        DisplayName = displayName,
                        PhoneNumbers = relationship.Contact.PhoneNumbers,
                        EmailAddresses = relationship.Contact.EmailAddresses,
                        Addresses = relationship.Contact.Addresses,
                        Type = type
                    };
                    clients.Add(clientDTO);
                }
                foreach (UserMatterAssociation uma in matter.UserMatterAssociations) { 
                    ActiveDirectoryClient activeDirectoryClient = AuthenticationHelper.GetActiveDirectoryClient();
                    IUser user = activeDirectoryClient.Users.GetByObjectId(uma.UserId.ToString()).ExecuteAsync().Result;
                    var userDTO = new UserDTO()
                    {
                        DisplayName = user.DisplayName,
                        JobTitle = user.JobTitle,
                        FirstName = user.GivenName,
                        LastName = user.Surname
                    };
                }
                var matterDTO = new MatterDTO(){
                    Clients = clients,
                    MatterId = matter.MatterId,
                    MatterType = matter.Type,
                    Name = matter.Name,
                    PeopleInvolved = staffDTOs
                };
                matterDTOs.Add(matterDTO);
            }
            return Ok(matterDTOs);
        }

        // GET: api/Matters/5
        [ResponseType(typeof(Matter))]
        public IHttpActionResult GetMatter(int id)
        {
            Matter matter = db.Matters.Find(id);
            if (matter == null)
            {
                return NotFound();
            }

            return Ok(matter);
        }

        // PUT: api/Matters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMatter(int id, Matter matter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matter.MatterId)
            {
                return BadRequest();
            }

            db.Entry(matter).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatterExists(id))
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

        // POST: api/Matters
        [ResponseType(typeof(Matter))]
        public IHttpActionResult PostMatter(Matter matter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Matters.Add(matter);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = matter.MatterId }, matter);
        }

        // DELETE: api/Matters/5
        [ResponseType(typeof(Matter))]
        public IHttpActionResult DeleteMatter(int id)
        {
            Matter matter = db.Matters.Find(id);
            if (matter == null)
            {
                return NotFound();
            }

            db.Matters.Remove(matter);
            db.SaveChanges();

            return Ok(matter);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatterExists(int id)
        {
            return db.Matters.Count(e => e.MatterId == id) > 0;
        }
    }
}