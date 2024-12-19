using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testAPI.Dtos.Account
{
    public class NewUserDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int CartId { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
    }
}