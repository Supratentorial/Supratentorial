using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class SafeCustodyDocument
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public string DocumentAuthor { get; set; }
        public DateTime DocumentCreationDate { get; set; }
        //Refactor out into DocumentActions table
        public string ReasonForRemoval { get; set; }

        [JsonIgnore]
        public virtual Contact Contact { get; set; }
        public int ContactId { get; set; }
    }
}