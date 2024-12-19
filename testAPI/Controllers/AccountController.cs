using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Data;
using testAPI.Models;
using Microsoft.EntityFrameworkCore;
using testAPI.Dtos.Account;
using testAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using testAPI.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace testtestAPI.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.Include(u => u.Cart).FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());

            if(user == null) return Unauthorized("Invalid Username!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized("Username not found / Password is incorrect");

            var cartId = user.Cart?.Id?? 0;
            var phone = user.Phone ?? string.Empty;
            var address = user.Address ?? string.Empty;

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User";

            return Ok(
                new NewUserDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    CartId = cartId,
                    Phone = phone,
                    Address = address,
                    Role = role,
                    Token = await _tokenService.CreateToken(user, cartId, phone, address)
                }
            );
            
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    Address = registerDto.Address,
                    Phone = registerDto.Phone,
                };

                var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var cart = new Cart
                    {
                        UserId = user.Id
                    };

                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                    _context.Entry(user).Reference(u => u.Cart).Load();

                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok();
                    }
                    else
                    {
                        return StatusCode(500, new { errors = roleResult.Errors.Select(e => e.Description) });
                    }
                }
                else
                {
                    return StatusCode(500, new { errors = createdUser.Errors.Select(e => e.Description) });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("register/admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    Address = registerDto.Address,
                    Phone = registerDto.Phone,
                };

                var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var cart = new Cart
                    {
                        UserId = user.Id
                    };

                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                    _context.Entry(user).Reference(u => u.Cart).Load();

                    var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
                    if (roleResult.Succeeded)
                    {
                        return Ok();
                    }
                    else
                    {
                        return StatusCode(500, new { errors = roleResult.Errors.Select(e => e.Description) });
                    }
                }
                else
                {
                    return StatusCode(500, new { errors = createdUser.Errors.Select(e => e.Description) });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}