namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedbiographicproperties : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BiographicalProperties",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateOfDeath = c.DateTime(nullable: false),
                        PlaceOfDeath = c.String(),
                        CountryOfBirth = c.String(),
                        Nationality = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Contacts", "BiographicalProperties_Id", c => c.Int());
            CreateIndex("dbo.Contacts", "BiographicalProperties_Id");
            AddForeignKey("dbo.Contacts", "BiographicalProperties_Id", "dbo.BiographicalProperties", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Contacts", "BiographicalProperties_Id", "dbo.BiographicalProperties");
            DropIndex("dbo.Contacts", new[] { "BiographicalProperties_Id" });
            DropColumn("dbo.Contacts", "BiographicalProperties_Id");
            DropTable("dbo.BiographicalProperties");
        }
    }
}
