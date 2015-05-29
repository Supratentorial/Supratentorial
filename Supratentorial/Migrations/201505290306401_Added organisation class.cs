namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedorganisationclass : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SafeCustodyDocuments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateAdded = c.DateTime(nullable: false),
                        DocumentAuthor = c.String(),
                        DocumentCreationDate = c.DateTime(nullable: false),
                        ReasonForRemoval = c.String(),
                        Contact_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Contacts", t => t.Contact_Id)
                .Index(t => t.Contact_Id);
            
            AlterColumn("dbo.Contacts", "LastName", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SafeCustodyDocuments", "Contact_Id", "dbo.Contacts");
            DropIndex("dbo.SafeCustodyDocuments", new[] { "Contact_Id" });
            AlterColumn("dbo.Contacts", "LastName", c => c.String());
            DropTable("dbo.SafeCustodyDocuments");
        }
    }
}
