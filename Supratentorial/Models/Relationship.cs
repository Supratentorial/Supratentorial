using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Relationship
    {
        public int RelationshipId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Status { get; set; }
        
        public int RelationshipTypeId { get; set; }
        public virtual RelationshipType RelationshipType { get; set; } //E.g. Client, Other side's solicitor

        public virtual Matter Matter { get; set; } //The matter this relationship pertains to
        public int MatterId { get; set; }

        public virtual Contact Contact { get; set; } //The individual at the other end of the relationship
        public int ContactId { get; set; }
    }
}