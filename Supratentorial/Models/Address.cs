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
        public string Status { get; set; }

        public int? PersonId { get; set; }
        public virtual Person Person { get; set; }
        public int? OrganisationId { get; set; }
        public virtual Organisation Organisation{ get; set; }
    }
}
