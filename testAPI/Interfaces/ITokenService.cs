using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Models;

namespace testAPI.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user, int CartId, string Phone, string Address);
    }
}