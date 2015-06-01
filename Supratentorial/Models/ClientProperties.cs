using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    //TODO: Inherit from contact when EF7 supports inheritance.
    public class ClientProperties
    {
        public int Id { get; set; }
        public DateTime DivorceDate { get; set; }
        public DateTime MarriageDate { get; set; }
        public DateTime CohabitationDate { get; set; }
        public virtual ICollection<Matter> Matters { get; set; }
        
    }
}
