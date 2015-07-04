using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string JobTitle { get; set; }
    }
}