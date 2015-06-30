using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class ContactDTO
    {
        public Guid ContactGuid { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}