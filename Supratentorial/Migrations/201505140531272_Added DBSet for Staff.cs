namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDBSetforStaff : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Contacts", "Type");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "Type", c => c.String());
        }
    }
}
