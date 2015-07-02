namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfiles", "Title", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserProfiles", "Title");
        }
    }
}
