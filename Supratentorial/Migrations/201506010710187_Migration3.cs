namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Matters", "DateCreated", c => c.DateTime(nullable: false));
            AddColumn("dbo.Matters", "InstructionsReceived", c => c.DateTime(nullable: false));
            AddColumn("dbo.Matters", "Status", c => c.String());
            AddColumn("dbo.Relationships", "Status", c => c.String());
            AddColumn("dbo.Relationships", "MyProperty", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Relationships", "MyProperty");
            DropColumn("dbo.Relationships", "Status");
            DropColumn("dbo.Matters", "Status");
            DropColumn("dbo.Matters", "InstructionsReceived");
            DropColumn("dbo.Matters", "DateCreated");
        }
    }
}
