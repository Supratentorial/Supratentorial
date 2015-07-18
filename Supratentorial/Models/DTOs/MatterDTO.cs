using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models.DTOs
{
    public class MatterDTO
    {

        public MatterDTO()
        {

        }
        public int MatterId { get; set; }
        public string Name { get; set; }
        public string MatterType { get; set; }
        public ICollection<ContactDTO> Clients { get; set; }
        public ICollection<UserDTO> PeopleInvolved { get; set; }
        public string Status { get; set; }
    }
}