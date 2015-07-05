namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.People", "Matter_Id", "dbo.Matters");
            DropIndex("dbo.People", new[] { "Matter_Id" });
            AddColumn("dbo.Contacts", "Matter_Id", c => c.Int());
            AddColumn("dbo.UserProfiles", "Matter_Id", c => c.Int());
            AlterColumn("dbo.People", "DateOfBirth", c => c.DateTime(storeType: "date"));
            CreateIndex("dbo.Contacts", "Matter_Id");
            CreateIndex("dbo.UserProfiles", "Matter_Id");
            AddForeignKey("dbo.Contacts", "Matter_Id", "dbo.Matters", "Id");
            AddForeignKey("dbo.UserProfiles", "Matter_Id", "dbo.Matters", "Id");
            DropColumn("dbo.People", "Matter_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.People", "Matter_Id", c => c.Int());
            DropForeignKey("dbo.UserProfiles", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Contacts", "Matter_Id", "dbo.Matters");
            DropIndex("dbo.UserProfiles", new[] { "Matter_Id" });
            DropIndex("dbo.Contacts", new[] { "Matter_Id" });
            AlterColumn("dbo.People", "DateOfBirth", c => c.DateTime());
            DropColumn("dbo.UserProfiles", "Matter_Id");
            DropColumn("dbo.Contacts", "Matter_Id");
            CreateIndex("dbo.People", "Matter_Id");
            AddForeignKey("dbo.People", "Matter_Id", "dbo.Matters", "Id");
        }
    }
}
