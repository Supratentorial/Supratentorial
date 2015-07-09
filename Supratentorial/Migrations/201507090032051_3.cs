namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Companies", "AustralianBusinessNumber", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Companies", "AustralianBusinessNumber", c => c.Long(nullable: false));
        }
    }
}
