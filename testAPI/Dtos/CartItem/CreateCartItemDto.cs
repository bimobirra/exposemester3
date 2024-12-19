using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testAPI.Dtos.CartItem
{
    public class CreateCartItemDto
    {
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }

    }
}