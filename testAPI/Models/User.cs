using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace testAPI.Models
{
    public class User : IdentityUser
    {
        public string Phone { get; set; }
        public string Address { get; set; }
        public Cart Cart { get; set; }
        public ICollection<Order_History> OrderHistories { get; set; }
    }
}