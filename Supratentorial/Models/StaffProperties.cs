using System;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class StaffProperties
    {
        public DateTime CommencementDate { get; set; }
        public DateTime TerminationDate { get; set; }
        public string Position { get; set; }

        public int PersonId { get; set; }
        public virtual Person Person { get; set; }
    }
}
