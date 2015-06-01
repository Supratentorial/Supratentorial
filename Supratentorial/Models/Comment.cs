using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supratentorial.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public virtual Matter Matter { get; set; }
        public Person Author { get; set; }
        public DateTime DateCreated { get; set; }
    }
}