using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Contact
    {

        public Contact()
        {
            this.PhoneNumbers = new HashSet<PhoneNumber>();
            this.EmailAddresses = new HashSet<EmailAddress>();
            this.SafeCustodyDocuments = new HashSet<SafeCustodyDocument>();
            this.Addresses = new HashSet<Address>();
        }
        public int ContactId { get; set; }
        public Person Person { get; set; }
        public Trust Trust { get; set; }
        public Company Company { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public virtual ICollection<EmailAddress> EmailAddresses { get; set; }
        public virtual ICollection<SafeCustodyDocument> SafeCustodyDocuments { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Relationship> MatterRelationships { get; set; }
    }
}