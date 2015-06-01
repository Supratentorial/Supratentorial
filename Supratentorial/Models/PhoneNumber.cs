namespace Supratentorial.Models
{
    public class PhoneNumber
    {
        public int PhoneId { get; set; }
        public int Number { get; set; }
        public int AreaCode { get; set; }
        public int CountryCode { get; set; }
        public string Type { get; set; }
        public bool IsPreferred { get; set; }
        public int PersonId { get; set; }

        public virtual Person Person { get; set; }

    }
}
