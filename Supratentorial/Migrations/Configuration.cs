namespace Supratentorial.Migrations
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using Supratentorial.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Supratentorial.Models.APIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Supratentorial.Models.APIContext context)
        {

            // Deletes all data, from all tables, except for __MigrationHistory
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'");
            context.Database.ExecuteSqlCommand("sp_MSForEachTable 'IF OBJECT_ID(''?'') NOT IN (ISNULL(OBJECT_ID(''[dbo].[__MigrationHistory]''),0)) DELETE FROM ?'");
            context.Database.ExecuteSqlCommand("EXEC sp_MSForEachTable 'ALTER TABLE ? CHECK CONSTRAINT ALL'");

            List<Contact> deserializedContacts = new List<Contact>();
            List<Person> deserializedPeople = new List<Person>();
            using (StreamReader contactReader = new StreamReader(@"/meridian_legal_contact_seed_data.json"))
            {
                String contactJSON = contactReader.ReadToEnd();
                JsonSerializerSettings deserializeSettings = new JsonSerializerSettings();
                deserializedContacts = JsonConvert.DeserializeObject<List<Contact>>(contactJSON, new IsoDateTimeConverter());
            }
            using (StreamReader personReader = new StreamReader(@"/meridian_legal_people_seed_data.json"))
            {
                String peopleJSON = personReader.ReadToEnd();
                deserializedPeople = JsonConvert.DeserializeObject<List<Person>>(peopleJSON, new IsoDateTimeConverter());
            }
            List<Contact> combinedList = deserializedContacts.Zip(deserializedPeople, (contact, person) => new Contact { Person = person }).ToList();
            foreach (Contact contact in combinedList) {
                context.Contacts.AddOrUpdate(contact);
            }

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
