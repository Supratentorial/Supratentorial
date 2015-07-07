using Newtonsoft.Json;
using System;
namespace Supratentorial.Models
{
    public class EmailAddress
    {
        public int EmailId { get; set; }
        public string Address { get; set; }
        public bool IsPreferred { get; set; }
        public string Status { get; set; }

        public int ContactId { get; set; }
        [JsonIgnore]
        public virtual Contact Contact { get; set; }
    }
}
