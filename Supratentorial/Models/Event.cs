using System;

namespace Supratentorial.Models
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int EventTypeId { get; set; }
        public virtual EventType EventType { get; set; }
        public int MatterId { get; set; }
        public virtual Matter Matter { get; set; }
    }
}