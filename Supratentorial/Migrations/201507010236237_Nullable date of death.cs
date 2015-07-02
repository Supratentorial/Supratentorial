namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Nullabledateofdeath : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BiographicalProperties", "DateOfDeath", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BiographicalProperties", "DateOfDeath", c => c.DateTime(nullable: false));
        }
    }
}
