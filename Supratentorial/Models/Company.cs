using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Company
    {
        public string TradingName { get; set; }
        public string CompanySuffix { get; set; }
        public string TradingSuffix { get; set; }
        public int AustralianBusinessNumber { get; set; }
        public bool SoleDirector { get; set; }

        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }
    }
}