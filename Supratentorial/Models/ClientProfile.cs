using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class ClientProfile : Contact
    {
        public DateTime DivorceDate { get; set; }
        public DateTime MarriageDate { get; set; }
        public DateTime CohabitationDAte { get; set; }
        public virtual ICollection<Matter> Matters { get; set; }
        
    }
}
