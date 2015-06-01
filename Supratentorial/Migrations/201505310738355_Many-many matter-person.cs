namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Manymanymatterperson : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.People", "Matter_Id", "dbo.Matters");
            DropIndex("dbo.People", new[] { "Matter_Id" });
            CreateTable(
                "dbo.PersonMatters",
                c => new
                    {
                        Person_PersonId = c.Int(nullable: false),
                        Matter_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Person_PersonId, t.Matter_Id })
                .ForeignKey("dbo.People", t => t.Person_PersonId, cascadeDelete: true)
                .ForeignKey("dbo.Matters", t => t.Matter_Id, cascadeDelete: true)
                .Index(t => t.Person_PersonId)
                .Index(t => t.Matter_Id);
            
            AddColumn("dbo.Addresses", "Type", c => c.String());
            DropColumn("dbo.People", "Matter_Id");
            DropColumn("dbo.Addresses", "IsMailing");
            DropColumn("dbo.Addresses", "IsResidential");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Addresses", "IsResidential", c => c.Boolean(nullable: false));
            AddColumn("dbo.Addresses", "IsMailing", c => c.Boolean(nullable: false));
            AddColumn("dbo.People", "Matter_Id", c => c.Int());
            DropForeignKey("dbo.PersonMatters", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.PersonMatters", "Person_PersonId", "dbo.People");
            DropIndex("dbo.PersonMatters", new[] { "Matter_Id" });
            DropIndex("dbo.PersonMatters", new[] { "Person_PersonId" });
            DropColumn("dbo.Addresses", "Type");
            DropTable("dbo.PersonMatters");
            CreateIndex("dbo.People", "Matter_Id");
            AddForeignKey("dbo.People", "Matter_Id", "dbo.Matters", "Id");
        }
    }
}
