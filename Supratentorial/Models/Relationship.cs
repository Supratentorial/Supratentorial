using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Relationship
    {
        public int RelationshipId { get; set; }
        public string Status { get; set; }
        public int MyProperty { get; set; }
        public RelationshipType Type { get; set; } //E.g. Client, Other side's solicitor
        public virtual Matter Matter { get; set; } //The matter this relationship pertains to
        public int MatterId { get; set; }

        public virtual Contact Contact { get; set; } //The individual at the other end of the relationship
        public int ContactId { get; set; }
    }
}