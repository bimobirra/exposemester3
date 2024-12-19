using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace testAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        
        public string category_name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
