using System;
using System.Collections.Generic;

namespace Supratentorial.Models
{
    public class Person
    {
        public Person()
        {
            this.PhoneNumbers = new HashSet<PhoneNumber>();
            this.EmailAddresses = new HashSet<EmailAddress>();
            this.SafeCustodyDocuments = new HashSet<SafeCustodyDocument>();
        }

        public int PersonId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleNames { get; set; }
        public string Title { get; set; }
        public DateTime DateOfBirth { get; set; }
        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public virtual ICollection<EmailAddress> EmailAddresses { get; set; }
        public virtual ICollection<SafeCustodyDocument> SafeCustodyDocuments { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }

        //Staff properties
        public StaffProperties StaffProperties { get; set; }


        //Real estate agent properties
        

        //iographical properties
        public BiographicalProperties BiographicalProperties { get; set; }
    }
}
