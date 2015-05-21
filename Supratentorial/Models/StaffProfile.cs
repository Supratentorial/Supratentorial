using System;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class StaffProfile
    {
        public int Id { get; set; }
        public DateTime CommencementDate { get; set; }
        public DateTime TerminationDate { get; set; }
        public string Position { get; set; }
    }
}
