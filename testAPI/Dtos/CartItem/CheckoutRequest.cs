using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testAPI.Dtos.CartItem
{
    public class CheckoutRequest
    {
        public string Base64Image { get; set; }
        public int CartId { get; set; }
        public string Customer { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}