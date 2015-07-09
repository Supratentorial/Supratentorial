namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _5 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.EventTemplates", "MatterType_MatterTypeId", "dbo.MatterTypes");
            DropIndex("dbo.EventTemplates", new[] { "MatterType_MatterTypeId" });
            RenameColumn(table: "dbo.EventTemplates", name: "MatterType_MatterTypeId", newName: "MatterTypeId");
            AddColumn("dbo.EventTemplates", "EventType_EventTypeId", c => c.Int());
            AlterColumn("dbo.EventTemplates", "MatterTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.EventTemplates", "MatterTypeId");
            CreateIndex("dbo.EventTemplates", "EventType_EventTypeId");
            AddForeignKey("dbo.EventTemplates", "EventType_EventTypeId", "dbo.EventTypes", "EventTypeId");
            AddForeignKey("dbo.EventTemplates", "MatterTypeId", "dbo.MatterTypes", "MatterTypeId", cascadeDelete: true);
            DropColumn("dbo.EventTemplates", "MyProperty");
        }
        
        public override void Down()
        {
            AddColumn("dbo.EventTemplates", "MyProperty", c => c.Int(nullable: false));
            DropForeignKey("dbo.EventTemplates", "MatterTypeId", "dbo.MatterTypes");
            DropForeignKey("dbo.EventTemplates", "EventType_EventTypeId", "dbo.EventTypes");
            DropIndex("dbo.EventTemplates", new[] { "EventType_EventTypeId" });
            DropIndex("dbo.EventTemplates", new[] { "MatterTypeId" });
            AlterColumn("dbo.EventTemplates", "MatterTypeId", c => c.Int());
            DropColumn("dbo.EventTemplates", "EventType_EventTypeId");
            RenameColumn(table: "dbo.EventTemplates", name: "MatterTypeId", newName: "MatterType_MatterTypeId");
            CreateIndex("dbo.EventTemplates", "MatterType_MatterTypeId");
            AddForeignKey("dbo.EventTemplates", "MatterType_MatterTypeId", "dbo.MatterTypes", "MatterTypeId");
        }
    }
}
