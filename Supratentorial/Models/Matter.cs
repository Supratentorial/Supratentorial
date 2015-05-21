using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Matter
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public virtual ICollection<ClientProfile> Client { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<StaffProfile> StaffResponsible { get; set; }
    }
}
