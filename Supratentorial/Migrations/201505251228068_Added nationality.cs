namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addednationality : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BiographicalProperties", "Gender", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BiographicalProperties", "Gender");
        }
    }
}
