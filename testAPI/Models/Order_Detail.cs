using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testAPI.Models
{
    public class Order_Detail
    {
        public int Id{ get; set; }
        public int CartId { get; set; }
        public Cart Cart{ get; set; }
        public DateTime Date { get; set; }
        public string Customer { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Payment_Picture { get; set; }
        public string Payment_Status { get; set; }
        public decimal Total { get; set; }
        public string ProductNames { get; set; }
        public int OrderHistoryId { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
        public Order_History OrderHistory { get; set; }

    }
}