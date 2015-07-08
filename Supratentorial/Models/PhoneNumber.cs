using Newtonsoft.Json;
namespace Supratentorial.Models
{
    public class PhoneNumber
    {
        public int PhoneId { get; set; }
        public string Number { get; set; }
        public string Type { get; set; }
        public bool IsPreferred { get; set; }
        
        [JsonIgnore]
        public virtual Contact Contact { get; set; }
        public int ContactId { get; set; }
    }
}
