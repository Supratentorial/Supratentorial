namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Removedemailtype : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.EmailAddresses", "Type");
        }
        
        public override void Down()
        {
            AddColumn("dbo.EmailAddresses", "Type", c => c.String());
        }
    }
}
