using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public virtual ICollection<string> MiddleNames { get; set; }
        public string Title { get; set; }
        public DateTime DateOfBirth { get; set; }
        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public virtual ICollection<EmailAddress> EmailAddresses { get; set; }

        //Staff properties
        public StaffProfile StaffProfile { get; set; }


        //Real estate agent properties
        

        //iographical properties
        public BiographicalProperties BiographicalProperties { get; set; }
    }
}
