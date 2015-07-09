namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _4 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Events", new[] { "MatterType_MatterTypeId" });
            CreateTable(
                "dbo.EventTemplates",
                c => new
                    {
                        EventTemplateId = c.Int(nullable: false, identity: true),
                        MyProperty = c.Int(nullable: false),
                        MatterType_MatterTypeId = c.Int(),
                    })
                .PrimaryKey(t => t.EventTemplateId)
                .Index(t => t.MatterType_MatterTypeId);
            
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "MatterType_MatterTypeId", c => c.Int());
            DropIndex("dbo.EventTemplates", new[] { "MatterType_MatterTypeId" });
            DropTable("dbo.EventTemplates");
            CreateIndex("dbo.Events", "MatterType_MatterTypeId");
        }
    }
}
