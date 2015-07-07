using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Matter
    {
        public int MatterId { get; set; }
        public string Type { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? InstructionsReceived { get; set; }
        public string Status { get; set; }
        public virtual ICollection<Relationship> Relationships { get; set; }
        public virtual ICollection<Event> Events { get; set; }

        public virtual ICollection<UserMatterAssociation> UserMatterAssociations { get; set; } //Relationships between Users and Matters (many to many)

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
