using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models.DTOs
{
    public class ContactDTO
    {
        public ContactDTO(){
        }
        public int ContactId { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public ICollection<EmailAddress> EmailAddresses { get; set; }
        public ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public ICollection<Address> Addresses { get; set; }
    }
}