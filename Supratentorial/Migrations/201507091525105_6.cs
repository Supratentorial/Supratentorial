namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _6 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.EventTemplates", "EventType_EventTypeId", "dbo.EventTypes");
            DropIndex("dbo.EventTemplates", new[] { "EventType_EventTypeId" });
            RenameColumn(table: "dbo.EventTemplates", name: "EventType_EventTypeId", newName: "EventTypeId");
            AlterColumn("dbo.EventTemplates", "EventTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.EventTemplates", "EventTypeId");
            AddForeignKey("dbo.EventTemplates", "EventTypeId", "dbo.EventTypes", "EventTypeId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventTemplates", "EventTypeId", "dbo.EventTypes");
            DropIndex("dbo.EventTemplates", new[] { "EventTypeId" });
            AlterColumn("dbo.EventTemplates", "EventTypeId", c => c.Int());
            RenameColumn(table: "dbo.EventTemplates", name: "EventTypeId", newName: "EventType_EventTypeId");
            CreateIndex("dbo.EventTemplates", "EventType_EventTypeId");
            AddForeignKey("dbo.EventTemplates", "EventType_EventTypeId", "dbo.EventTypes", "EventTypeId");
        }
    }
}
