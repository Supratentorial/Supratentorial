using Newtonsoft.Json;
namespace Supratentorial.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public int UnitNumber { get; set; }
        public int StreetNumber { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int PostCode { get; set; }
        public string Type { get; set; }
        public bool IsArchived { get; set; }

        [JsonIgnore]
        public Contact Contact { get; set; }
        public int ContactId { get; set; }
    }
}
