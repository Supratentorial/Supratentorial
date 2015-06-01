using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class BiographicalProperties
    {
        public DateTime DateOfDeath { get; set; }
        public string PlaceOfDeath { get; set; }
        public string CountryOfBirth { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }

        public int PersonId { get; set; }
        public virtual Person Person { get; set; }
    }
}