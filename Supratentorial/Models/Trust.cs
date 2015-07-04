using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Trust
    {
        public Trust()
        {
            Trustees = new HashSet<Contact>();
        }

        public string Status { get; set; }
        public DateTime? DateOfTrust { get; set; }
        public ICollection<Contact> Trustees { get; set; }

        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }
    }
}