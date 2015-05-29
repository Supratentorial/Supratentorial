namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Unsure : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Contacts", name: "StaffProfile_Id", newName: "StaffProperties_Id");
            RenameIndex(table: "dbo.Contacts", name: "IX_StaffProfile_Id", newName: "IX_StaffProperties_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Contacts", name: "IX_StaffProperties_Id", newName: "IX_StaffProfile_Id");
            RenameColumn(table: "dbo.Contacts", name: "StaffProperties_Id", newName: "StaffProfile_Id");
        }
    }
}
