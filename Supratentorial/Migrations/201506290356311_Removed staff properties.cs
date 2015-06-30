namespace Supratentorial.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Removedstaffproperties : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StaffProperties", "PersonId", "dbo.People");
            DropIndex("dbo.StaffProperties", new[] { "PersonId" });
            CreateTable(
                "dbo.LegalFirms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.People", "UserProfile_UserId", c => c.Guid());
            AddColumn("dbo.People", "UserProfile_UserId1", c => c.Guid());
            AddColumn("dbo.UserProfiles", "PracticingCertificateNumber", c => c.String());
            AddColumn("dbo.UserProfiles", "Firm_Id", c => c.Int());
            CreateIndex("dbo.People", "UserProfile_UserId");
            CreateIndex("dbo.People", "UserProfile_UserId1");
            CreateIndex("dbo.UserProfiles", "Firm_Id");
            AddForeignKey("dbo.People", "UserProfile_UserId", "dbo.UserProfiles", "UserId");
            AddForeignKey("dbo.UserProfiles", "Firm_Id", "dbo.LegalFirms", "Id");
            AddForeignKey("dbo.People", "UserProfile_UserId1", "dbo.UserProfiles", "UserId");
            DropColumn("dbo.UserProfiles", "Role");
            DropTable("dbo.StaffProperties");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StaffProperties",
                c => new
                    {
                        PersonId = c.Int(nullable: false),
                        CommencementDate = c.DateTime(nullable: false),
                        TerminationDate = c.DateTime(nullable: false),
                        Position = c.String(),
                    })
                .PrimaryKey(t => t.PersonId);
            
            AddColumn("dbo.UserProfiles", "Role", c => c.String());
            DropForeignKey("dbo.People", "UserProfile_UserId1", "dbo.UserProfiles");
            DropForeignKey("dbo.UserProfiles", "Firm_Id", "dbo.LegalFirms");
            DropForeignKey("dbo.People", "UserProfile_UserId", "dbo.UserProfiles");
            DropIndex("dbo.UserProfiles", new[] { "Firm_Id" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId1" });
            DropIndex("dbo.People", new[] { "UserProfile_UserId" });
            DropColumn("dbo.UserProfiles", "Firm_Id");
            DropColumn("dbo.UserProfiles", "PracticingCertificateNumber");
            DropColumn("dbo.People", "UserProfile_UserId1");
            DropColumn("dbo.People", "UserProfile_UserId");
            DropTable("dbo.LegalFirms");
            CreateIndex("dbo.StaffProperties", "PersonId");
            AddForeignKey("dbo.StaffProperties", "PersonId", "dbo.People", "PersonId");
        }
    }
}
