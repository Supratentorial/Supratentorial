namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _7 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Matters", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Matters", "Name");
        }
    }
}
