namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.PhoneNumbers", "AreaCode");
            DropColumn("dbo.PhoneNumbers", "CountryCode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PhoneNumbers", "CountryCode", c => c.Int(nullable: false));
            AddColumn("dbo.PhoneNumbers", "AreaCode", c => c.Int(nullable: false));
        }
    }
}
