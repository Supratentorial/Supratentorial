using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class CompanyProperties
    {
        public int OrganisationId { get; set; }
        public virtual Organisation Organisation { get; set; }
        public string TradingName { get; set; }
        public string CompanySuffix { get; set; }
        public string TradingSuffix { get; set; }
        public int AustralianBusinessNumber { get; set; }
        public bool SoleDirector { get; set; }
    }
}