namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _0 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        ContactId = c.Int(nullable: false, identity: true),
                        ContactStatusId = c.Int(nullable: false),
                        Trust_ContactId = c.Int(),
                    })
                .PrimaryKey(t => t.ContactId)
                .ForeignKey("dbo.ContactStatus", t => t.ContactStatusId, cascadeDelete: true)
                .ForeignKey("dbo.Trusts", t => t.Trust_ContactId)
                .Index(t => t.ContactStatusId)
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
                        Status = c.String(),
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
                        DateCreated = c.DateTime(nullable: false, storeType: "date"),
                        Status = c.String(),
                        RelationshipTypeId = c.Int(nullable: false),
                        MatterId = c.Int(nullable: false),
                        ContactId = c.Int(),
                    })
                .PrimaryKey(t => t.RelationshipId)
                .ForeignKey("dbo.Contacts", t => t.ContactId)
                .ForeignKey("dbo.Matters", t => t.MatterId, cascadeDelete: true)
                .ForeignKey("dbo.RelationshipTypes", t => t.RelationshipTypeId, cascadeDelete: true)
                .Index(t => t.RelationshipTypeId)
                .Index(t => t.MatterId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Matters",
                c => new
                    {
                        MatterId = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        DateCreated = c.DateTime(nullable: false, storeType: "date"),
                        InstructionsReceived = c.DateTime(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.MatterId);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        Author_ContactId = c.Int(),
                        Matter_MatterId = c.Int(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.People", t => t.Author_ContactId)
                .ForeignKey("dbo.Matters", t => t.Matter_MatterId)
                .Index(t => t.Author_ContactId)
                .Index(t => t.Matter_MatterId);
            
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
                        Date = c.DateTime(nullable: false),
                        EventTypeId = c.Int(nullable: false),
                        MatterId = c.Int(nullable: false),
                        MatterType_MatterTypeId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EventTypes", t => t.EventTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Matters", t => t.MatterId, cascadeDelete: true)
                .ForeignKey("dbo.MatterTypes", t => t.MatterType_MatterTypeId)
                .Index(t => t.EventTypeId)
                .Index(t => t.MatterId)
                .Index(t => t.MatterType_MatterTypeId);
            
            CreateTable(
                "dbo.EventTypes",
                c => new
                    {
                        EventTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.EventTypeId);
            
            CreateTable(
                "dbo.UserMatterAssociations",
                c => new
                    {
                        UserId = c.Guid(nullable: false),
                        MatterId = c.Int(nullable: false),
                        IsPrimaryPerson = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.MatterId })
                .ForeignKey("dbo.Matters", t => t.MatterId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfiles", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.MatterId);
            
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        UserId = c.Guid(nullable: false),
                        PracticingCertificateNumber = c.String(),
                        Title = c.String(),
                        Firm_Id = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.LegalFirms", t => t.Firm_Id)
                .Index(t => t.Firm_Id);
            
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
                        RelationshipTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.RelationshipTypeId);
            
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
                "dbo.ContactStatus",
                c => new
                    {
                        ContactStatusId = c.Int(nullable: false, identity: true),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.ContactStatusId);
            
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
            
            CreateTable(
                "dbo.MatterTypes",
                c => new
                    {
                        MatterTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.MatterTypeId);
            
            CreateTable(
                "dbo.RelationshipTemplates",
                c => new
                    {
                        RelationshipTemplateId = c.Int(nullable: false, identity: true),
                        MatterTypeId = c.Int(nullable: false),
                        RelationshipTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RelationshipTemplateId)
                .ForeignKey("dbo.MatterTypes", t => t.MatterTypeId, cascadeDelete: true)
                .ForeignKey("dbo.RelationshipTypes", t => t.RelationshipTypeId, cascadeDelete: true)
                .Index(t => t.MatterTypeId)
                .Index(t => t.RelationshipTypeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RelationshipTemplates", "RelationshipTypeId", "dbo.RelationshipTypes");
            DropForeignKey("dbo.RelationshipTemplates", "MatterTypeId", "dbo.MatterTypes");
            DropForeignKey("dbo.Events", "MatterType_MatterTypeId", "dbo.MatterTypes");
            DropForeignKey("dbo.Contacts", "Trust_ContactId", "dbo.Trusts");
            DropForeignKey("dbo.Trusts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Contacts", "ContactStatusId", "dbo.ContactStatus");
            DropForeignKey("dbo.SafeCustodyDocuments", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.PhoneNumbers", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Relationships", "RelationshipTypeId", "dbo.RelationshipTypes");
            DropForeignKey("dbo.UserMatterAssociations", "UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.People", "UserProfile_UserId1", "dbo.UserProfiles");
            DropForeignKey("dbo.UserProfiles", "Firm_Id", "dbo.LegalFirms");
            DropForeignKey("dbo.People", "UserProfile_UserId", "dbo.UserProfiles");
            DropForeignKey("dbo.UserMatterAssociations", "MatterId", "dbo.Matters");
            DropForeignKey("dbo.Relationships", "MatterId", "dbo.Matters");
            DropForeignKey("dbo.Events", "MatterId", "dbo.Matters");
            DropForeignKey("dbo.Events", "EventTypeId", "dbo.EventTypes");
            DropForeignKey("dbo.Comments", "Matter_MatterId", "dbo.Matters");
            DropForeignKey("dbo.Comments", "Author_ContactId", "dbo.People");
            DropForeignKey("dbo.People", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.BiographicalProperties", "PersonId", "dbo.People");
            DropForeignKey("dbo.Relationships", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.EmailAddresses", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Companies", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Addresses", "ContactId", "dbo.Contacts");
            DropIndex("dbo.RelationshipTemplates", new[] { "RelationshipTypeId" });
            DropIndex("dbo.RelationshipTemplates", new[] { "MatterTypeId" });
            DropIndex("dbo.Trusts", new[] { "ContactId" });
            DropIndex("dbo.SafeCustodyDocuments", new[] { "ContactId" });
            DropIndex("dbo.PhoneNumbers", new[] { "ContactId" });
            DropIndex("dbo.UserProfiles", new[] { "Firm_Id" });
            DropIndex("dbo.UserMatterAssociations", new[] { "MatterId" });
            DropIndex("dbo.UserMatterAssociations", new[] { "UserId" });
            DropIndex("dbo.Events", new[] { "MatterType_MatterTypeId" });
            DropIndex("dbo.Events", new[] { "MatterId" });
            DropIndex("dbo.Events", new[] { "EventTypeId" });
            DropIndex("dbo.BiographicalProperties", new[] { "PersonId" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId1" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId" });
            DropIndex("dbo.People", new[] { "ContactId" });
            DropIndex("dbo.Comments", new[] { "Matter_MatterId" });
            DropIndex("dbo.Comments", new[] { "Author_ContactId" });
            DropIndex("dbo.Relationships", new[] { "ContactId" });
            DropIndex("dbo.Relationships", new[] { "MatterId" });
            DropIndex("dbo.Relationships", new[] { "RelationshipTypeId" });
            DropIndex("dbo.EmailAddresses", new[] { "ContactId" });
            DropIndex("dbo.Companies", new[] { "ContactId" });
            DropIndex("dbo.Addresses", new[] { "ContactId" });
            DropIndex("dbo.Contacts", new[] { "Trust_ContactId" });
            DropIndex("dbo.Contacts", new[] { "ContactStatusId" });
            DropTable("dbo.RelationshipTemplates");
            DropTable("dbo.MatterTypes");
            DropTable("dbo.Trusts");
            DropTable("dbo.ContactStatus");
            DropTable("dbo.SafeCustodyDocuments");
            DropTable("dbo.PhoneNumbers");
            DropTable("dbo.RelationshipTypes");
            DropTable("dbo.LegalFirms");
            DropTable("dbo.UserProfiles");
            DropTable("dbo.UserMatterAssociations");
            DropTable("dbo.EventTypes");
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
