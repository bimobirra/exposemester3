using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace testAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string product_name { get; set; } = string.Empty;
        public string picture { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal price { get; set; }
        public string description { get; set; } = string.Empty;
        public int stocks { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; } 

        public ICollection<CartItem> CartItems { get; set; }
    }
}
