using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Matter
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? InstructionsReceived { get; set; }
        public string Status { get; set; }
        public virtual ICollection<Relationship> Relationships { get; set; }
        public virtual ICollection<Event> Events { get; set; }

        public virtual ICollection<UserProfile> StaffAssisting { get; set; }
        public virtual UserProfile PrimaryPerson { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
