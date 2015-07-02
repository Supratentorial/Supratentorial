namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Nullableemaildatearchived : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.EmailAddresses", "DateArchived", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.EmailAddresses", "DateArchived", c => c.DateTime(nullable: false));
        }
    }
}
