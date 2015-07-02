using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class UserProfile
    {
        public UserProfile() {
            this.RecentClients = new HashSet<Person>();
            this.FavouriteClients = new HashSet<Person>();
        }
        public Guid UserId { get; set; }
        public string PracticingCertificateNumber { get; set; }
        public virtual ICollection<Person> RecentClients { get; set; }
        public virtual ICollection<Person> FavouriteClients { get; set; }
        public LegalFirm Firm { get; set; }
        public string Title { get; set; } 
    }
}