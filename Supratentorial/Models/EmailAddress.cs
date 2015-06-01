namespace Supratentorial.Models
{
    public class EmailAddress
    {
        public int EmailId { get; set; }
        public string Address { get; set; }
        public bool IsPreferred { get; set; }
        public int PersonId { get; set; }

        public virtual Person Person { get; set; }
    }
}
