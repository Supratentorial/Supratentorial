using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class UserProfile
    {
        public Guid UserId { get; set; }
        public string PracticingCertificateNumber { get; set; }
        public ICollection<Person> RecentClients { get; set; }
        public ICollection<Person> FavouriteClients { get; set; }
        public LegalFirm Firm { get; set; }
        public string Title { get; set; } 
    }
}