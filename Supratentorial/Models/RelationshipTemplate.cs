using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class RelationshipTemplate
    {
        public int RelationshipTemplateId { get; set; }

        public int MatterTypeId { get; set; }
        public virtual MatterType MatterType { get; set; }
        
        public int RelationshipTypeId { get; set; }
        public virtual RelationshipType RelationshipType { get; set; }
    }
}