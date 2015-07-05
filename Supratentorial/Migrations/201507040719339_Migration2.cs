namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PhoneNumbers", "Number", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PhoneNumbers", "Number", c => c.Int(nullable: false));
        }
    }
}
