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
using Supratentorial.Utils;
using Microsoft.Azure.ActiveDirectory.GraphClient;
using Microsoft.Azure.ActiveDirectory.GraphClient.Extensions;
using System.Threading.Tasks;

namespace Supratentorial.Controllers
{
    public class UsersController : ApiController
    {
        private APIContext db = new APIContext();

        [Authorize]
        public async Task<IHttpActionResult> GetUsers()
        {
            var userList = new List<UserDTO>();
            ActiveDirectoryClient activeDirectoryClient = AuthenticationHelper.GetActiveDirectoryClient();
            Task<IPagedCollection<IUser>> getUsersTask = activeDirectoryClient.Users.ExecuteAsync();
            IPagedCollection<IUser> pagedCollection = await getUsersTask;
            if (pagedCollection != null)
            {
                do
                {
                    List<IUser> usersList = pagedCollection.CurrentPage.ToList();
                    foreach (IUser user in usersList)
                    {
                        UserDTO dto = new UserDTO()
                        {
                            UserId = new Guid(user.ObjectId),
                            FirstName = user.GivenName,
                            LastName = user.Surname,
                            DisplayName = user.DisplayName
                        };
                        userList.Add(dto);
                    }
                    pagedCollection = await pagedCollection.GetNextPageAsync();
                } while (pagedCollection != null);
            }
            return Ok(userList);
        }

        // GET: api/Users/5
        [ResponseType(typeof(UserProfile))]
        public IHttpActionResult GetUser(int id)
        {
            UserProfile user = db.UserProfiles.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(Guid id, UserProfile user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [ResponseType(typeof(UserProfile))]
        public IHttpActionResult PostUser(UserProfile user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserProfiles.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(UserProfile))]
        public IHttpActionResult DeleteUser(int id)
        {
            UserProfile user = db.UserProfiles.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.UserProfiles.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(Guid id)
        {
            return db.UserProfiles.Count(e => e.UserId == id) > 0;
        }
    }
}