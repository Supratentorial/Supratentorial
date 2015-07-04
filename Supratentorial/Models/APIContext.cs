using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class APIContext : DbContext
    {
        public APIContext()
            : base("name=SupratentorialDB")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Matter> Matters { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Contact configuration
            modelBuilder.Entity<Contact>().HasMany<PhoneNumber>(contact => contact.PhoneNumbers).WithRequired(phone => phone.Contact).HasForeignKey(phone => phone.ContactId);
            modelBuilder.Entity<Contact>().HasMany<EmailAddress>(contact => contact.EmailAddresses).WithRequired(email => email.Contact).HasForeignKey(email => email.ContactId);
            modelBuilder.Entity<Contact>().HasMany<SafeCustodyDocument>(contact => contact.SafeCustodyDocuments).WithRequired(document => document.Contact).HasForeignKey(document => document.ContactId);

            //Person configuration
            modelBuilder.Entity<Person>().HasKey(p => p.ContactId); //Person PK = ContactId FK (one to one)
            modelBuilder.Entity<Person>().HasRequired(person => person.Contact).WithOptional(contact => contact.Person);
            modelBuilder.Entity<Person>().Property(p => p.LastName).IsRequired();
            modelBuilder.Entity<Person>().Property(p => p.FirstName).IsRequired();

            //Biographical configuration
            modelBuilder.Entity<BiographicalProperties>().HasKey(bio => bio.PersonId); //Bio PK = Person PK = Contact PK (one to one)
            modelBuilder.Entity<BiographicalProperties>().HasRequired(bio => bio.Person).WithOptional(person => person.BiographicalProperties);

            //Trust configuration
            modelBuilder.Entity<Trust>().HasKey(trust => trust.ContactId); //Trust PK = ContactId FK (one to one)
            modelBuilder.Entity<Trust>().HasRequired(trust => trust.Contact).WithOptional(contact => contact.Trust);
            modelBuilder.Entity<Trust>().HasMany<Contact>(trust => trust.Trustees);

            //Company configuration
            modelBuilder.Entity<Company>().HasKey(company => company.ContactId); //Company PK = ContactId FK (one to one)
            modelBuilder.Entity<Company>().HasRequired(company => company.Contact).WithOptional(contact => contact.Company);

            //Email configuration
            modelBuilder.Entity<EmailAddress>().HasKey(email => email.EmailId);

            //Phone configuration
            modelBuilder.Entity<PhoneNumber>().HasKey(phone => phone.PhoneId);

            //Address configuartion
            modelBuilder.Entity<Address>().HasKey(address => address.AddressId);

            //Relationship
            modelBuilder.Entity<RelationshipType>().HasKey(rt => rt.RelatioshipTypeId);

            //User
            modelBuilder.Entity<UserProfile>().HasKey(user => user.UserId);

        }

    }
}
