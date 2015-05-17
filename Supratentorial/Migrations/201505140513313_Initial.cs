namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        FirstName = c.String(),
                        DateOfBirth = c.DateTime(nullable: false),
                        DivorceDate = c.DateTime(),
                        MarriageDate = c.DateTime(),
                        CohabitationDAte = c.DateTime(),
                        Type = c.String(),
                        StartDate = c.DateTime(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.EmailAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Address = c.String(),
                        IsPreferred = c.Boolean(nullable: false),
                        Type = c.String(),
                        Contact_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.Contact_Id)
                .Index(t => t.Contact_Id);
            
            CreateTable(
                "dbo.PhoneNumbers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        AreaCode = c.Int(nullable: false),
                        CountryCode = c.Int(nullable: false),
                        Type = c.String(),
                        IsPreferred = c.Boolean(nullable: false),
                        Contact_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.Contact_Id)
                .Index(t => t.Contact_Id);
            
            CreateTable(
                "dbo.Matters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
                "dbo.MatterClients",
                c => new
                    {
                        Matter_Id = c.Int(nullable: false),
                        Client_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Matter_Id, t.Client_Id })
                .ForeignKey("dbo.Matters", t => t.Matter_Id, cascadeDelete: true)
                .ForeignKey("dbo.Contacts", t => t.Client_Id, cascadeDelete: true)
                .Index(t => t.Matter_Id)
                .Index(t => t.Client_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Contacts", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Events", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.MatterClients", "Client_Id", "dbo.Contacts");
            DropForeignKey("dbo.MatterClients", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.PhoneNumbers", "Contact_Id", "dbo.Contacts");
            DropForeignKey("dbo.EmailAddresses", "Contact_Id", "dbo.Contacts");
            DropIndex("dbo.MatterClients", new[] { "Client_Id" });
            DropIndex("dbo.MatterClients", new[] { "Matter_Id" });
            DropIndex("dbo.Events", new[] { "Matter_Id" });
            DropIndex("dbo.PhoneNumbers", new[] { "Contact_Id" });
            DropIndex("dbo.EmailAddresses", new[] { "Contact_Id" });
            DropIndex("dbo.Contacts", new[] { "Matter_Id" });
            DropTable("dbo.MatterClients");
            DropTable("dbo.Events");
            DropTable("dbo.Matters");
            DropTable("dbo.PhoneNumbers");
            DropTable("dbo.EmailAddresses");
            DropTable("dbo.Contacts");
        }
    }
}
