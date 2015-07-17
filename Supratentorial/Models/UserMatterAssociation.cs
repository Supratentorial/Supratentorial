using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class UserMatterAssociation
    {
        public Guid UserId { get; set; }
        [JsonIgnore]
        public virtual UserProfile UserProfile { get; set; }
        public int MatterId { get; set; }
        [JsonIgnore]
        public virtual Matter Matter { get; set; }
        public bool IsPrimaryPerson { get; set; }
    }
}