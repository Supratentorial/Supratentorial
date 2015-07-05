using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class MatterType
    {
        public int MatterTypeId { get; set; }
        public virtual ICollection<Relationship> Relationships { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}