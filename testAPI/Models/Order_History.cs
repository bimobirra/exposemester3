using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testAPI.Models
{
    public class Order_History
    {
        public int Id { get; set; }
        public int Order_DetailId { get; set; }
        public string UserId { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }

        public User User { get; set; }
        public ICollection<Order_Detail> Order_Details { get; set; }
    }
}