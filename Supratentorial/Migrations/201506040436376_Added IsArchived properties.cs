namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedIsArchivedproperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Addresses", "IsArchived", c => c.Boolean(nullable: false));
            AddColumn("dbo.Organisations", "Type", c => c.String());
            AddColumn("dbo.EmailAddresses", "IsArchived", c => c.Boolean(nullable: false));
            AddColumn("dbo.EmailAddresses", "DateArchived", c => c.DateTime(nullable: false));
            DropColumn("dbo.Addresses", "Status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Addresses", "Status", c => c.String());
            DropColumn("dbo.EmailAddresses", "DateArchived");
            DropColumn("dbo.EmailAddresses", "IsArchived");
            DropColumn("dbo.Organisations", "Type");
            DropColumn("dbo.Addresses", "IsArchived");
        }
    }
}
