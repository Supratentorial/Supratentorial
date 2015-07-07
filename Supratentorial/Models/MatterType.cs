using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class MatterType
    {
        public int MatterTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<RelationshipTemplate> Relationships { get; set; }
    }
}