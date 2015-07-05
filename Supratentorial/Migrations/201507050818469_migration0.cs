namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration0 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        ContactId = c.Int(nullable: false, identity: true),
                        IsDeleted = c.Boolean(nullable: false),
                        Trust_ContactId = c.Int(),
                    })
                .PrimaryKey(t => t.ContactId)
                .ForeignKey("dbo.Trusts", t => t.Trust_ContactId)
                .Index(t => t.Trust_ContactId);
            
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
                        Type = c.String(),
                        IsArchived = c.Boolean(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AddressId)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Companies",
                c => new
                    {
                        ContactId = c.Int(nullable: false),
                        TradingName = c.String(),
                        CompanySuffix = c.String(),
                        TradingSuffix = c.String(),
                        AustralianBusinessNumber = c.Int(nullable: false),
                        SoleDirector = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ContactId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.EmailAddresses",
                c => new
                    {
                        EmailId = c.Int(nullable: false, identity: true),
                        Address = c.String(nullable: false),
                        IsPreferred = c.Boolean(nullable: false),
                        IsArchived = c.Boolean(nullable: false),
                        DateArchived = c.DateTime(),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EmailId)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Relationships",
                c => new
                    {
                        RelationshipId = c.Int(nullable: false, identity: true),
                        DateCreated = c.DateTime(nullable: false),
                        Status = c.String(),
                        RelationshipTypeId = c.Int(nullable: false),
                        MatterId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                        RelationshipType_RelatioshipTypeId = c.Int(),
                    })
                .PrimaryKey(t => t.RelationshipId)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.Matters", t => t.MatterId, cascadeDelete: true)
                .ForeignKey("dbo.RelationshipTypes", t => t.RelationshipType_RelatioshipTypeId)
                .Index(t => t.MatterId)
                .Index(t => t.ContactId)
                .Index(t => t.RelationshipType_RelatioshipTypeId);
            
            CreateTable(
                "dbo.Matters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        DateCreated = c.DateTime(nullable: false, storeType: "date"),
                        InstructionsReceived = c.DateTime(),
                        Status = c.String(),
                        PrimaryPerson_UserId = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfiles", t => t.PrimaryPerson_UserId)
                .Index(t => t.PrimaryPerson_UserId);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        Author_ContactId = c.Int(),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.People", t => t.Author_ContactId)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Author_ContactId)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.People",
                c => new
                    {
                        ContactId = c.Int(nullable: false),
                        LastName = c.String(nullable: false),
                        FirstName = c.String(nullable: false),
                        MiddleNames = c.String(),
                        Title = c.String(),
                        DateOfBirth = c.DateTime(storeType: "date"),
                        UserProfile_UserId = c.Guid(),
                        UserProfile_UserId1 = c.Guid(),
                    })
                .PrimaryKey(t => t.ContactId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.UserProfiles", t => t.UserProfile_UserId)
                .ForeignKey("dbo.UserProfiles", t => t.UserProfile_UserId1)
                .Index(t => t.ContactId)
                .Index(t => t.UserProfile_UserId)
                .Index(t => t.UserProfile_UserId1);
            
            CreateTable(
                "dbo.BiographicalProperties",
                c => new
                    {
                        PersonId = c.Int(nullable: false),
                        DateOfDeath = c.DateTime(),
                        PlaceOfDeath = c.String(),
                        CountryOfBirth = c.String(),
                        Nationality = c.String(),
                        Gender = c.String(),
                    })
                .PrimaryKey(t => t.PersonId)
                .ForeignKey("dbo.People", t => t.PersonId)
                .Index(t => t.PersonId);
            
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
            
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        UserId = c.Guid(nullable: false),
                        PracticingCertificateNumber = c.String(),
                        Title = c.String(),
                        Firm_Id = c.Int(),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.LegalFirms", t => t.Firm_Id)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Firm_Id)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.LegalFirms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RelationshipTypes",
                c => new
                    {
                        RelatioshipTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.RelatioshipTypeId);
            
            CreateTable(
                "dbo.PhoneNumbers",
                c => new
                    {
                        PhoneId = c.Int(nullable: false, identity: true),
                        Number = c.String(),
                        AreaCode = c.Int(nullable: false),
                        CountryCode = c.Int(nullable: false),
                        Type = c.String(),
                        IsPreferred = c.Boolean(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PhoneId)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.SafeCustodyDocuments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateAdded = c.DateTime(nullable: false),
                        DocumentAuthor = c.String(),
                        DocumentCreationDate = c.DateTime(nullable: false),
                        ReasonForRemoval = c.String(),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Trusts",
                c => new
                    {
                        ContactId = c.Int(nullable: false),
                        Status = c.String(),
                        DateOfTrust = c.DateTime(),
                    })
                .PrimaryKey(t => t.ContactId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Contacts", "Trust_ContactId", "dbo.Trusts");
            DropForeignKey("dbo.Trusts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.SafeCustodyDocuments", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.PhoneNumbers", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Relationships", "RelationshipType_RelatioshipTypeId", "dbo.RelationshipTypes");
            DropForeignKey("dbo.UserProfiles", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Relationships", "MatterId", "dbo.Matters");
            DropForeignKey("dbo.Matters", "PrimaryPerson_UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.People", "UserProfile_UserId1", "dbo.UserProfiles");
            DropForeignKey("dbo.UserProfiles", "Firm_Id", "dbo.LegalFirms");
            DropForeignKey("dbo.People", "UserProfile_UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.Events", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Comments", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Comments", "Author_ContactId", "dbo.People");
            DropForeignKey("dbo.People", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.BiographicalProperties", "PersonId", "dbo.People");
            DropForeignKey("dbo.Relationships", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.EmailAddresses", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Companies", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Addresses", "ContactId", "dbo.Contacts");
            DropIndex("dbo.Trusts", new[] { "ContactId" });
            DropIndex("dbo.SafeCustodyDocuments", new[] { "ContactId" });
            DropIndex("dbo.PhoneNumbers", new[] { "ContactId" });
            DropIndex("dbo.UserProfiles", new[] { "Matter_Id" });
            DropIndex("dbo.UserProfiles", new[] { "Firm_Id" });
            DropIndex("dbo.Events", new[] { "Matter_Id" });
            DropIndex("dbo.BiographicalProperties", new[] { "PersonId" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId1" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId" });
            DropIndex("dbo.People", new[] { "ContactId" });
            DropIndex("dbo.Comments", new[] { "Matter_Id" });
            DropIndex("dbo.Comments", new[] { "Author_ContactId" });
            DropIndex("dbo.Matters", new[] { "PrimaryPerson_UserId" });
            DropIndex("dbo.Relationships", new[] { "RelationshipType_RelatioshipTypeId" });
            DropIndex("dbo.Relationships", new[] { "ContactId" });
            DropIndex("dbo.Relationships", new[] { "MatterId" });
            DropIndex("dbo.EmailAddresses", new[] { "ContactId" });
            DropIndex("dbo.Companies", new[] { "ContactId" });
            DropIndex("dbo.Addresses", new[] { "ContactId" });
            DropIndex("dbo.Contacts", new[] { "Trust_ContactId" });
            DropTable("dbo.Trusts");
            DropTable("dbo.SafeCustodyDocuments");
            DropTable("dbo.PhoneNumbers");
            DropTable("dbo.RelationshipTypes");
            DropTable("dbo.LegalFirms");
            DropTable("dbo.UserProfiles");
            DropTable("dbo.Events");
            DropTable("dbo.BiographicalProperties");
            DropTable("dbo.People");
            DropTable("dbo.Comments");
            DropTable("dbo.Matters");
            DropTable("dbo.Relationships");
            DropTable("dbo.EmailAddresses");
            DropTable("dbo.Companies");
            DropTable("dbo.Addresses");
            DropTable("dbo.Contacts");
        }
    }
}
