namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Matters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.People",
                c => new
                    {
                        PersonId = c.Int(nullable: false, identity: true),
                        LastName = c.String(nullable: false),
                        FirstName = c.String(nullable: false),
                        Title = c.String(),
                        DateOfBirth = c.DateTime(nullable: false),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.PersonId)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        AddressId = c.Int(nullable: false, identity: true),
                        UnitNumber = c.Int(nullable: false),
                        StreetNumber = c.Int(nullable: false),
                        State = c.String(),
                        Country = c.String(),
                        PostCode = c.Int(nullable: false),
                        IsMailing = c.Boolean(nullable: false),
                        IsResidential = c.Boolean(nullable: false),
                        Status = c.String(),
                        PersonId = c.Int(),
                        OrganisationId = c.Int(),
                    })
                .PrimaryKey(t => t.AddressId)
                .ForeignKey("dbo.Organisations", t => t.OrganisationId)
                .ForeignKey("dbo.People", t => t.PersonId)
                .Index(t => t.PersonId)
                .Index(t => t.OrganisationId);
            
            CreateTable(
                "dbo.Organisations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmailAddresses",
                c => new
                    {
                        EmailId = c.Int(nullable: false, identity: true),
                        Address = c.String(),
                        IsPreferred = c.Boolean(nullable: false),
                        PersonId = c.Int(nullable: false),
                        Organisation_Id = c.Int(),
                    })
                .PrimaryKey(t => t.EmailId)
                .ForeignKey("dbo.Organisations", t => t.Organisation_Id)
                .ForeignKey("dbo.People", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId)
                .Index(t => t.Organisation_Id);
            
            CreateTable(
                "dbo.BiographicalProperties",
                c => new
                    {
                        PersonId = c.Int(nullable: false),
                        DateOfDeath = c.DateTime(nullable: false),
                        PlaceOfDeath = c.String(),
                        CountryOfBirth = c.String(),
                        Nationality = c.String(),
                        Gender = c.String(),
                    })
                .PrimaryKey(t => t.PersonId)
                .ForeignKey("dbo.People", t => t.PersonId)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.PhoneNumbers",
                c => new
                    {
                        PhoneId = c.Int(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        AreaCode = c.Int(nullable: false),
                        CountryCode = c.Int(nullable: false),
                        Type = c.String(),
                        IsPreferred = c.Boolean(nullable: false),
                        PersonId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PhoneId)
                .ForeignKey("dbo.People", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.SafeCustodyDocuments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateAdded = c.DateTime(nullable: false),
                        DocumentAuthor = c.String(),
                        DocumentCreationDate = c.DateTime(nullable: false),
                        ReasonForRemoval = c.String(),
                        PersonId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.People", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.StaffProperties",
                c => new
                    {
                        PersonId = c.Int(nullable: false),
                        CommencementDate = c.DateTime(nullable: false),
                        TerminationDate = c.DateTime(nullable: false),
                        Position = c.String(),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.PersonId)
                .ForeignKey("dbo.People", t => t.PersonId)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.PersonId)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MyProperty = c.DateTime(nullable: false),
                        Notes = c.String(),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Matter_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StaffProperties", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Events", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.People", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.StaffProperties", "PersonId", "dbo.People");
            DropForeignKey("dbo.SafeCustodyDocuments", "PersonId", "dbo.People");
            DropForeignKey("dbo.PhoneNumbers", "PersonId", "dbo.People");
            DropForeignKey("dbo.EmailAddresses", "PersonId", "dbo.People");
            DropForeignKey("dbo.BiographicalProperties", "PersonId", "dbo.People");
            DropForeignKey("dbo.Addresses", "PersonId", "dbo.People");
            DropForeignKey("dbo.EmailAddresses", "Organisation_Id", "dbo.Organisations");
            DropForeignKey("dbo.Addresses", "OrganisationId", "dbo.Organisations");
            DropIndex("dbo.Events", new[] { "Matter_Id" });
            DropIndex("dbo.StaffProperties", new[] { "Matter_Id" });
            DropIndex("dbo.StaffProperties", new[] { "PersonId" });
            DropIndex("dbo.SafeCustodyDocuments", new[] { "PersonId" });
            DropIndex("dbo.PhoneNumbers", new[] { "PersonId" });
            DropIndex("dbo.BiographicalProperties", new[] { "PersonId" });
            DropIndex("dbo.EmailAddresses", new[] { "Organisation_Id" });
            DropIndex("dbo.EmailAddresses", new[] { "PersonId" });
            DropIndex("dbo.Addresses", new[] { "OrganisationId" });
            DropIndex("dbo.Addresses", new[] { "PersonId" });
            DropIndex("dbo.People", new[] { "Matter_Id" });
            DropTable("dbo.Events");
            DropTable("dbo.StaffProperties");
            DropTable("dbo.SafeCustodyDocuments");
            DropTable("dbo.PhoneNumbers");
            DropTable("dbo.BiographicalProperties");
            DropTable("dbo.EmailAddresses");
            DropTable("dbo.Organisations");
            DropTable("dbo.Addresses");
            DropTable("dbo.People");
            DropTable("dbo.Matters");
        }
    }
}
