using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public abstract class Contact
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public virtual ICollection<string> MiddleNames { get; set; }
        public DateTime DateOfBirth { get; set; }
        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public virtual ICollection<EmailAddress> EmailAddresses { get; set; }
    }
}
