﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class RelationshipType
    {
        public int RelationshipTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}