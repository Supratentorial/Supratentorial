namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PersonMatters", "Person_PersonId", "dbo.People");
            DropForeignKey("dbo.PersonMatters", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.StaffProperties", "Matter_Id", "dbo.Matters");
            DropIndex("dbo.StaffProperties", new[] { "Matter_Id" });
            DropIndex("dbo.PersonMatters", new[] { "Person_PersonId" });
            DropIndex("dbo.PersonMatters", new[] { "Matter_Id" });
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                        Author_PersonId = c.Int(),
                        Matter_Id = c.Int(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.People", t => t.Author_PersonId)
                .ForeignKey("dbo.Matters", t => t.Matter_Id)
                .Index(t => t.Author_PersonId)
                .Index(t => t.Matter_Id);
            
            CreateTable(
                "dbo.Relationships",
                c => new
                    {
                        RelationshipId = c.Int(nullable: false, identity: true),
                        MatterId = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                        OrganisationId = c.Int(nullable: false),
                        Type_RelatioshipTypeId = c.Int(),
                    })
                .PrimaryKey(t => t.RelationshipId)
                .ForeignKey("dbo.Matters", t => t.MatterId, cascadeDelete: true)
                .ForeignKey("dbo.Organisations", t => t.OrganisationId, cascadeDelete: true)
                .ForeignKey("dbo.People", t => t.PersonId, cascadeDelete: true)
                .ForeignKey("dbo.RelationshipTypes", t => t.Type_RelatioshipTypeId)
                .Index(t => t.MatterId)
                .Index(t => t.PersonId)
                .Index(t => t.OrganisationId)
                .Index(t => t.Type_RelatioshipTypeId);
            
            CreateTable(
                "dbo.RelationshipTypes",
                c => new
                    {
                        RelatioshipTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Status = c.String(),
                        Author_PersonId = c.Int(),
                    })
                .PrimaryKey(t => t.RelatioshipTypeId)
                .ForeignKey("dbo.People", t => t.Author_PersonId)
                .Index(t => t.Author_PersonId);
            
            AddColumn("dbo.People", "Matter_Id", c => c.Int());
            CreateIndex("dbo.People", "Matter_Id");
            AddForeignKey("dbo.People", "Matter_Id", "dbo.Matters", "Id");
            DropColumn("dbo.StaffProperties", "Matter_Id");
            DropTable("dbo.PersonMatters");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PersonMatters",
                c => new
                    {
                        Person_PersonId = c.Int(nullable: false),
                        Matter_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Person_PersonId, t.Matter_Id });
            
            AddColumn("dbo.StaffProperties", "Matter_Id", c => c.Int());
            DropForeignKey("dbo.Relationships", "Type_RelatioshipTypeId", "dbo.RelationshipTypes");
            DropForeignKey("dbo.RelationshipTypes", "Author_PersonId", "dbo.People");
            DropForeignKey("dbo.Relationships", "PersonId", "dbo.People");
            DropForeignKey("dbo.Relationships", "OrganisationId", "dbo.Organisations");
            DropForeignKey("dbo.Relationships", "MatterId", "dbo.Matters");
            DropForeignKey("dbo.People", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Comments", "Matter_Id", "dbo.Matters");
            DropForeignKey("dbo.Comments", "Author_PersonId", "dbo.People");
            DropIndex("dbo.RelationshipTypes", new[] { "Author_PersonId" });
            DropIndex("dbo.Relationships", new[] { "Type_RelatioshipTypeId" });
            DropIndex("dbo.Relationships", new[] { "OrganisationId" });
            DropIndex("dbo.Relationships", new[] { "PersonId" });
            DropIndex("dbo.Relationships", new[] { "MatterId" });
            DropIndex("dbo.People", new[] { "Matter_Id" });
            DropIndex("dbo.Comments", new[] { "Matter_Id" });
            DropIndex("dbo.Comments", new[] { "Author_PersonId" });
            DropColumn("dbo.People", "Matter_Id");
            DropTable("dbo.RelationshipTypes");
            DropTable("dbo.Relationships");
            DropTable("dbo.Comments");
            CreateIndex("dbo.PersonMatters", "Matter_Id");
            CreateIndex("dbo.PersonMatters", "Person_PersonId");
            CreateIndex("dbo.StaffProperties", "Matter_Id");
            AddForeignKey("dbo.StaffProperties", "Matter_Id", "dbo.Matters", "Id");
            AddForeignKey("dbo.PersonMatters", "Matter_Id", "dbo.Matters", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PersonMatters", "Person_PersonId", "dbo.People", "PersonId", cascadeDelete: true);
        }
    }
}
