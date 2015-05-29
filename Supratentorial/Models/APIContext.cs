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
    
        public APIContext() : base("name=APIContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Person configuration
            modelBuilder.Entity<Contact>().Property(c => c.LastName).IsRequired();
            modelBuilder.Entity<Contact>().Property(c => c.FirstName).IsRequired();
        }

        public DbSet<Matter> Matters { get; set; }
        public DbSet<Contact> Contacts { get; set; }
    }
}
