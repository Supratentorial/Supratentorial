namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.SafeCustodyDocuments", "ReasonForRemoval");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SafeCustodyDocuments", "ReasonForRemoval", c => c.String());
        }
    }
}
