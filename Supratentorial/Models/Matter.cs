using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Matter
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public virtual ICollection<Client> Client { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<Staff> StaffResponsible { get; set; }
    }
}
