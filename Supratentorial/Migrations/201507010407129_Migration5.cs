namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration5 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Matters", "InstructionsReceived", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Matters", "InstructionsReceived", c => c.DateTime(nullable: false));
        }
    }
}
