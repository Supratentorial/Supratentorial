namespace Supratentorial.Migrations
{
    using Microsoft.Azure.ActiveDirectory.GraphClient;
    using Microsoft.Azure.ActiveDirectory.GraphClient.Extensions;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using Supratentorial.Models;
    using Supratentorial.Utils;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    internal sealed class Configuration : DbMigrationsConfiguration<Supratentorial.Models.APIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        async Task<List<UserProfile>> GetUsersAsync()
        {
            List<UserProfile> userProfileList = new List<UserProfile>();
            ActiveDirectoryClient activeDirectoryClient = AuthenticationHelper.GetActiveDirectoryClient();
            Task<IPagedCollection<IUser>> getUsersTask = activeDirectoryClient.Users.ExecuteAsync();
            IPagedCollection<IUser> pagedCollection = await getUsersTask;
            if (pagedCollection != null)
            {
                do{
                    var usersList = pagedCollection.CurrentPage.ToList();
                    foreach (IUser user in usersList)
                    {
                        UserProfile userProfile = new UserProfile()
                        {
                            UserId = new Guid(user.ObjectId),
                            UserMatterAssociations = null,
                            Title = null,
                            RecentClients = null,
                            Firm = null,
                            PracticingCertificateNumber = null,
                            FavouriteClients = null
                        };
                        userProfileList.Add(userProfile);
                    }
                    pagedCollection = await pagedCollection.GetNextPageAsync();
                } while (pagedCollection != null);
            }
            return userProfileList;
        }  

        protected override void Seed(Supratentorial.Models.APIContext context)
        {

            // Deletes all data, from all tables, except for __MigrationHistory
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'");
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'IF OBJECT_ID(''?'') NOT IN (ISNULL(OBJECT_ID(''[dbo].[__MigrationHistory]''),0)) DELETE FROM ?'");
            context.Database.ExecuteSqlCommand("EXEC sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'");


            List<UserProfile> userProfiles = GetUsersAsync().Result;
            foreach (UserProfile userProfile in userProfiles)
            {
                context.UserProfiles.AddOrUpdate(userProfile);
            }

            List<Supratentorial.Models.Contact> deserializedCompanies = new List<Supratentorial.Models.Contact>();
            List<Supratentorial.Models.Contact> deserializedPeople = new List<Supratentorial.Models.Contact>();
            using (StreamReader contactReader = new StreamReader(@"/meridian_legal_company_seed_data.json"))
            {
                String companyJSON = contactReader.ReadToEnd();
                JsonSerializerSettings deserializeSettings = new JsonSerializerSettings();
                deserializedCompanies = JsonConvert.DeserializeObject<List<Supratentorial.Models.Contact>>(companyJSON, new IsoDateTimeConverter());
            }
            using (StreamReader personReader = new StreamReader(@"/meridian_legal_people_seed_data.json"))
            {
                String peopleJSON = personReader.ReadToEnd();
                deserializedPeople = JsonConvert.DeserializeObject<List<Supratentorial.Models.Contact>>(peopleJSON, new IsoDateTimeConverter());
            }
            foreach (Supratentorial.Models.Contact c in deserializedCompanies)
            {
                context.Contacts.AddOrUpdate(c);
            }
            foreach (Supratentorial.Models.Contact c in deserializedPeople)
            {
                context.Contacts.AddOrUpdate(c);
            }
            context.MatterTypes.AddOrUpdate<MatterType>(
                new MatterType
                {
                    Name = "Purchase",
                    Description = "Matter type to be used when a client has signed a contract to purchase a property.",
                    Events =
                    {
                        
                    },
                    Relationships = { 

                    
                    }
                }
                );

            context.RelationshipTypes.AddOrUpdate<RelationshipType>(
                new RelationshipType { RelationshipTypeId = 1, Name = "Client", Description = "The contact who is the client in a matter.", Status = "Active" },
                new RelationshipType { RelationshipTypeId = 2, Name = "Other Side's Solicitor", Description = "The solicitor acting on behalf of the Other Side.", Status = "Active" }
                );
            context.ContactStatuses.AddOrUpdate<ContactStatus>(
                new ContactStatus { ContactStatusId = 1, Status = "Active" },
                new ContactStatus { ContactStatusId = 2, Status = "Deleted" }
                );

            context.SaveChanges();
        }
    }
}
