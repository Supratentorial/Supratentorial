using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Person
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleNames { get; set; }
        public string Title { get; set; }
        public DateTime? DateOfBirth { get; set; }

        //Real estate agent properties

        //Biographical properties
        public BiographicalProperties BiographicalProperties { get; set; }
        [JsonIgnore]
        public virtual Contact Contact { get; set; }
        public int ContactId { get; set; }
    }
}
