using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class APIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public APIContext()
            : base("name=APIContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Person configuration
            modelBuilder.Entity<Person>().HasKey(p => p.PersonId);
            modelBuilder.Entity<Person>().Property(p => p.LastName).IsRequired();
            modelBuilder.Entity<Person>().Property(p => p.FirstName).IsRequired();
            modelBuilder.Entity<Person>().HasMany<PhoneNumber>(person => person.PhoneNumbers).WithRequired(person => person.Person).HasForeignKey(phone => phone.PersonId);
            modelBuilder.Entity<Person>().HasMany<EmailAddress>(person => person.EmailAddresses).WithRequired(person => person.Person).HasForeignKey(email => email.PersonId);
            modelBuilder.Entity<Person>().HasMany<SafeCustodyDocument>(person => person.SafeCustodyDocuments).WithRequired(person => person.Person).HasForeignKey(document => document.PersonId);
            modelBuilder.Entity<Person>().HasOptional<BiographicalProperties>(person => person.BiographicalProperties).WithRequired(b => b.Person);
            modelBuilder.Entity<Person>().HasOptional<StaffProperties>(person => person.StaffProperties).WithRequired(s => s.Person);


            //Email configuration
            modelBuilder.Entity<EmailAddress>().HasKey(email => email.EmailId);

            //Phone configuration
            modelBuilder.Entity<PhoneNumber>().HasKey(phone => phone.PhoneId);

            //Staff properties configuration
            modelBuilder.Entity<BiographicalProperties>().HasKey(person => person.PersonId);
            modelBuilder.Entity<StaffProperties>().HasKey(person => person.PersonId);

            //Address configuartion
            modelBuilder.Entity<Address>().HasKey(address => address.AddressId);

            //Relationship
            modelBuilder.Entity<RelationshipType>().HasKey(rt => rt.RelatioshipTypeId);

        }

        public DbSet<Matter> Matters { get; set; }
        public DbSet<Person> People { get; set; }

        public System.Data.Entity.DbSet<Supratentorial.Models.Organisation> Organisations { get; set; }
    }
}
