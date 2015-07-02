using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class TrustProperties
    {
        public TrustProperties()
        {
            Trustees = new HashSet<Person>();
        }

        public int OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
        public string Status { get; set; }
        public DateTime? DateOfTrust { get; set; }
        public ICollection<Person> Trustees { get; set; }
    }
}