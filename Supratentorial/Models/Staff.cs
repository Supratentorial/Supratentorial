using System;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class Staff : Contact
    {
        public DateTime StartDate { get; set; }
    }
}
