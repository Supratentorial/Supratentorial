namespace Supratentorial.Migrations
{
    using Supratentorial.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Supratentorial.Models.APIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Supratentorial.Models.APIContext context)
        {
            // Deletes all data, from all tables, except for __MigrationHistory
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'");
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'IF OBJECT_ID(''?'') NOT IN (ISNULL(OBJECT_ID(''[dbo].[__MigrationHistory]''),0)) DELETE FROM ?'");
            context.Database.ExecuteSqlCommand("EXEC sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'");

            context.RelationshipTypes.AddOrUpdate<RelationshipType>(
                new RelationshipType { Name = "Client", Description = "The contact who is the client in a matter.", Status = "Active" },
                new RelationshipType { Name = "Other Side's Solicitor", Description = "The solicitor acting on behalf of the Other Side.", Status = "Active" }
                );
        }
    }
}
