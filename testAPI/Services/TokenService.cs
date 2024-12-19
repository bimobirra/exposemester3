using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using testAPI.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;


namespace testAPI.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<User> _userManager; // Gunakan readonly field untuk UserManager

        public TokenService(IConfiguration config, UserManager<User> userManager) // Tambahkan UserManager dalam constructor
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _userManager = userManager; // Assign ke field
        }

        public async Task<string> CreateToken(User user, int CartId, string Phone, string Address)
        {
            // Dapatkan role pengguna
            var roles = await _userManager.GetRolesAsync(user); // Gunakan .Result untuk memblok hingga hasil tersedia
            var role = roles.FirstOrDefault(); // Ambil role pertama

            // Buat klaim token
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
            new Claim("CartId", CartId.ToString()),
            new Claim("Phone", Phone ?? "N/A"),
            new Claim("Address", Address ?? "N/A"),
            new Claim(ClaimTypes.Role, role ?? "User"), // Role default adalah "User" jika null
        };

            // Buat kredensial signing
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Buat deskripsi token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }

}