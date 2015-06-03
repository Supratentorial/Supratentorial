namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Middlenamestring : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.People", "MiddleNames", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.People", "MiddleNames");
        }
    }
}
