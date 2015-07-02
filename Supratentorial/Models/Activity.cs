using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Activity
    {
        public int ActivityId { get; set; }
        public string Verb { get; set; }
        public int TargetId { get; set; }
        public int UserId { get; set; }
        public virtual UserProfile User { get; set; }
    }
}