using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class Client : Contact
    {
        public DateTime DivorceDate { get; set; }
        public DateTime MarriageDate { get; set; }
        public DateTime CohabitationDAte { get; set; }
        public virtual ICollection<Matter> Matters { get; set; }
        
    }
}
