using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class EventTemplate
    {
        public int EventTemplateId { get; set; }
        public int MatterTypeId { get; set; }
        public virtual MatterType MatterType { get; set; }
        public int EventTypeId { get; set; }
        public virtual EventType EventType { get; set; }
    }
}