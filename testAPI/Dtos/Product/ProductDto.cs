using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Models;
using testAPI.Data;

namespace testAPI.Dtos.Product
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string product_name { get; set; } = string.Empty;
        public string picture { get; set; } = string.Empty;
        public decimal price { get; set; }
        public string description { get; set; } = string.Empty;
        public int stocks { get; set; }
        public int CategoryId { get; set; }
    }
}