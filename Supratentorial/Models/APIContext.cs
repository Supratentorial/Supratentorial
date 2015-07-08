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
        public DbSet<RelationshipType> RelationshipTypes { get; set; }
        public DbSet<MatterType> MatterTypes { get; set; }
        public DbSet<ContactStatus> ContactStatuses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Contact configuration
            modelBuilder.Entity<Contact>().HasKey(c => c.ContactId);
            modelBuilder.Entity<Contact>().HasMany<PhoneNumber>(contact => contact.PhoneNumbers).WithRequired(phone => phone.Contact).HasForeignKey(phone => phone.ContactId);
            modelBuilder.Entity<Contact>().HasMany<EmailAddress>(contact => contact.EmailAddresses).WithRequired(email => email.Contact).HasForeignKey(email => email.ContactId);
            modelBuilder.Entity<Contact>().HasMany<SafeCustodyDocument>(contact => contact.SafeCustodyDocuments).WithRequired(document => document.Contact).HasForeignKey(document => document.ContactId);

            //Person configuration
            modelBuilder.Entity<Person>().HasKey(p => p.ContactId); //Person PK = ContactId FK (one to one)
            modelBuilder.Entity<Person>().HasRequired(person => person.Contact).WithOptional(contact => contact.Person);
            modelBuilder.Entity<Person>().Property(p => p.LastName).IsRequired();
            modelBuilder.Entity<Person>().Property(p => p.FirstName).IsRequired();
            modelBuilder.Entity<Person>().Property(p => p.DateOfBirth).HasColumnType("date");

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
            modelBuilder.Entity<EmailAddress>().Property(email => email.Address).IsRequired();

            //Phone configuration
            modelBuilder.Entity<PhoneNumber>().HasKey(phone => phone.PhoneId);

            //Address configuartion
            modelBuilder.Entity<Address>().HasKey(address => address.AddressId);

            //Relationship
            modelBuilder.Entity<Relationship>().HasRequired(r => r.RelationshipType).WithMany().HasForeignKey(r => r.RelationshipTypeId); //Look up table for relationship types. 
            modelBuilder.Entity<Relationship>().Property(r => r.DateCreated).HasColumnType("date");

            //RelationshipTypes
            modelBuilder.Entity<RelationshipType>().HasKey(rt => rt.RelationshipTypeId);

            //User
            modelBuilder.Entity<UserProfile>().HasKey(user => user.UserId);

            //Matter
            modelBuilder.Entity<Matter>().HasKey(matter => matter.MatterId);
            modelBuilder.Entity<Matter>().Property(m => m.DateCreated).HasColumnType("date");

            //UserMatterAssociation
            modelBuilder.Entity<UserMatterAssociation>().HasKey(uma => new { uma.UserId, uma.MatterId }); //Composite primary key for UMA table
            modelBuilder.Entity<UserMatterAssociation>().HasRequired(uma => uma.Matter).WithMany(m => m.UserMatterAssociations).HasForeignKey(uma => uma.MatterId);
            modelBuilder.Entity<UserMatterAssociation>().HasRequired(uma => uma.UserProfile).WithMany(m => m.UserMatterAssociations).HasForeignKey(uma => uma.UserId);

            //Event
            modelBuilder.Entity<Event>().HasRequired(e => e.EventType).WithMany().HasForeignKey(e => e.EventTypeId);

            //Relationship Template
            modelBuilder.Entity<RelationshipTemplate>().HasRequired(rt => rt.RelationshipType).WithMany().HasForeignKey(rt => rt.RelationshipTypeId);
        }

    }
}
