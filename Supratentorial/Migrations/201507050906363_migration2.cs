namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Relationships", "RelationshipType_RelatioshipTypeId", "dbo.RelationshipTypes");
            DropIndex("dbo.Relationships", new[] { "RelationshipType_RelatioshipTypeId" });
            DropColumn("dbo.Relationships", "RelationshipTypeId");
            RenameColumn(table: "dbo.Relationships", name: "RelationshipType_RelatioshipTypeId", newName: "RelationshipTypeId");
            AlterColumn("dbo.Relationships", "RelationshipTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Relationships", "RelationshipTypeId");
            AddForeignKey("dbo.Relationships", "RelationshipTypeId", "dbo.RelationshipTypes", "RelatioshipTypeId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Relationships", "RelationshipTypeId", "dbo.RelationshipTypes");
            DropIndex("dbo.Relationships", new[] { "RelationshipTypeId" });
            AlterColumn("dbo.Relationships", "RelationshipTypeId", c => c.Int());
            RenameColumn(table: "dbo.Relationships", name: "RelationshipTypeId", newName: "RelationshipType_RelatioshipTypeId");
            AddColumn("dbo.Relationships", "RelationshipTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Relationships", "RelationshipType_RelatioshipTypeId");
            AddForeignKey("dbo.Relationships", "RelationshipType_RelatioshipTypeId", "dbo.RelationshipTypes", "RelatioshipTypeId");
        }
    }
}
