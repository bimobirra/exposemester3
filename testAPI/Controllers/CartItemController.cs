using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Data;
using testAPI.Models;
using Microsoft.EntityFrameworkCore;
using testAPI.Dtos.CartItem;
using testAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace testAPI.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cartitems = await _context.CartItems.Include(ci => ci.Product).Where(ci => ci.CartId == id).ToListAsync();
            if (cartitems == null)
            {
                return NotFound();
            }

            var cartItemDto = cartitems.Select(ci => new
            {
                Id = ci.Id,
                CartId = ci.CartId,
                Quantity = ci.Quantity,
                ProductId = ci.ProductId,
                Price = ci.Price,
                Total = ci.Total,
                ProductName = ci.Product.product_name,
                Picture = ci.Product.picture,

            });

            return Ok(cartItemDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCartItemDto cartDto)
        {
            var cartItemModel = cartDto.ToCartitemFromCreateDto();

            // Cek apakah CartId ada dalam tabel Carts
            var cart = await _context.Carts.FindAsync(cartItemModel.CartId);
            if (cart == null)
            {
                // Jika CartId tidak ada, return NotFound dengan pesan error
                return NotFound(new { message = $"Cart with CartId {cartItemModel.CartId} not found." });
            }

            // Cek apakah sudah ada CartItem dengan CartId dan ProductId yang sama
            var existingCartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartId == cartItemModel.CartId && ci.ProductId == cartItemModel.ProductId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cartItemModel.Quantity;
                existingCartItem.Total = existingCartItem.Quantity * existingCartItem.Price;

                _context.CartItems.Update(existingCartItem);
            }
            else
            {
                cartItemModel.Total = cartItemModel.Quantity * cartItemModel.Price;

                _context.CartItems.Add(cartItemModel);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = cartItemModel.Id }, cartItemModel.ToCartItemDto());
        }

        [HttpPut("update/{Id}")]
        public async Task<IActionResult> UpdateCart([FromRoute]int Id, [FromBody] UpdateCartItemDto updateCartItemDto)
        {
            // Cek apakah cart item ada
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == Id);

            if (cartItem == null)
            {
                return NotFound(new { message = "Cart item not found." });
            }

            // Update quantity dan price jika ada perubahan
            cartItem.Quantity = updateCartItemDto.Quantity;
            cartItem.Total = cartItem.Quantity * cartItem.Price; // Update total berdasarkan quantity dan price

            // Simpan perubahan
            _context.CartItems.Update(cartItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("update/detail/{Id}")]
        public async Task<IActionResult> UpdateDetailStatus([FromRoute]int Id, [FromBody] UpdateStatus updateStatus)
        {
            // Cek apakah cart item ada
            var order_detail = await _context.Order_Details.FirstOrDefaultAsync(od => od.Id == Id);

            if (order_detail == null)
            {
                return NotFound(new { message = "Detail not found" });
            }

            order_detail.Payment_Status = updateStatus.Payment_Status;

            // Simpan perubahan
            _context.Order_Details.Update(order_detail);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("update/history/{Id}")]
        public async Task<IActionResult> UpdateHistoryStatus([FromRoute]int Id, [FromBody] UpdateHistoryStatusDto updateHistoryStatus)
        {
            // Cek apakah cart item ada
            var order_history = await _context.Order_Histories.FirstOrDefaultAsync(od => od.Id == Id);

            if (order_history == null)
            {
                return NotFound(new { message = "History not found" });
            }

            order_history.Status = updateHistoryStatus.Status;

            // Simpan perubahan
            _context.Order_Histories.Update(order_history);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("/api/checkout")]
public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
{
    var cartItems = await _context.CartItems.Where(ci => ci.CartId == request.CartId).Include(ci => ci.Product).ToListAsync();

    if (!cartItems.Any())
    {
        return NotFound();
    }

    var cart = await _context.Carts.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == request.CartId);

    if (cart == null)
    {
        return NotFound();
    }

    decimal totalAmount = cartItems.Sum(ci => ci.Quantity * ci.Price);

    var productNames = string.Join(", ", cartItems.Select(ci => $"{ci.Quantity} {ci.Product.product_name} (@ {ci.Product.price:0,0})"));

    // Memeriksa stok sebelum melanjutkan
    foreach (var item in cartItems)
    {
        if (item.Quantity > item.Product.stocks) // Cek jika jumlah yang dibeli lebih banyak dari stok yang tersedia
        {
            return BadRequest($"Not enough stock for product {item.Product.product_name}. Available: {item.Product.stocks}, Requested: {item.Quantity}");
        }
    }

    // Buat Order_History terlebih dahulu
    var orderHistory = new Order_History
    {
        UserId = cart.UserId,
        Date = DateTime.Now,
        Status = "Pending"
    };

    _context.Order_Histories.Add(orderHistory);
    await _context.SaveChangesAsync(); // Simpan ke database agar memiliki ID

    // Gunakan ID dari Order_History untuk Order_Detail
    var orderDetail = new Order_Detail
    {
        CartId = request.CartId,
        Date = DateTime.Now,
        Customer = request.Customer,
        Address = request.Address,
        Phone = request.Phone,
        Email = request.Email,
        Payment_Picture = request.Base64Image,
        Payment_Status = "Pending",
        ProductNames = productNames,
        Total = totalAmount,
        OrderHistoryId = orderHistory.Id, // Tetapkan foreign key
    };

    _context.Order_Details.Add(orderDetail);
    await _context.SaveChangesAsync();

    orderHistory.Order_DetailId = orderDetail.Id;

    _context.Order_Histories.Update(orderHistory);
    await _context.SaveChangesAsync();

    // Hapus cart items setelah order selesai dan update stok produk
    foreach (var item in cartItems)
    {
        // Mengurangi stok produk
        item.Product.stocks -= item.Quantity;

        // Memastikan stok tidak kurang dari 0
        if (item.Product.stocks < 0)
        {
            item.Product.stocks = 0;
        }

        _context.CartItems.Remove(item); // Menghapus item dari keranjang
    }

    await _context.SaveChangesAsync();

    var cartItemsToReturn = cartItems.Select(ci => new
    {
        ProductName = ci.Product.product_name,
        Quantity = ci.Quantity,
        Price = ci.Price,
        Total = ci.Total
    }).ToList();

    return Ok(new
    {
        OrderDetailId = orderDetail.Id,
        TotalAmount = totalAmount,
        CartItems = cartItemsToReturn
    });
}


        [HttpDelete("/clear/{CartId}")]
        public async Task<IActionResult> ClearCart(int CartId)
        {
            var CartItems = await _context.CartItems.Where(ci => ci.CartId == CartId).ToListAsync();

            if (!CartItems.Any())
            {
                return NotFound();
            }

            _context.CartItems.RemoveRange(CartItems);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("/remove/{id}")]
        public async Task<IActionResult> RemoveItem(int id)
        {
            var CartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == id);

            if (CartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(CartItem);

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("order_detail/status/{status}")]
        public async Task<IActionResult> GetAllDetails(string status)
        {
            var order_detail = await _context.Order_Details.Where(od => od.Payment_Status == status).ToListAsync();

                var orderDetailDto = order_detail.Select(od => new {
                    Id = od.Id,
                    CartId = od.CartId,
                    Date = od.Date,
                    Payment_Picture = od.Payment_Picture,
                    Payment_Status = od.Payment_Status,
                    OrderHistoryId = od.OrderHistoryId,
                    ProductNames = od. ProductNames,
                    Total = od.Total,
                    Address = od.Address,
                    Customer = od.Customer,
                    Email = od.Email,
                    Phone = od.Phone,
                }).ToList();

                return Ok(orderDetailDto);

        }

        [HttpGet("order_history/{Id}")]
        public async Task<IActionResult> GetHistoryById(string Id)
        {
            var orderHistories = await _context.Order_Histories.Include(oh => oh.User).Where(oh => oh.UserId == Id).ToListAsync();

            if(orderHistories == null)
            {
                return NotFound();
            }

            var orderHistoryDto = orderHistories.Select(oh => new
            {
                Id = oh.Id,
                Order_DetailId = oh.Order_DetailId,
                UserId = oh.UserId,
                Date = DateTime.Now,
                Status = oh.Status,
            });

            return Ok(orderHistoryDto);

        }

        [HttpGet("order_detail/{CartId}")]
        public async Task<IActionResult> GetHistory(int CartId)
        {
            var orderDetails = await _context.Order_Details
            .Where(od => od.CartId == CartId)
            .Include(od => od.CartItems)
            .ThenInclude(ci => ci.Product)
            .OrderByDescending(od => od.Id)
            .FirstOrDefaultAsync();

            if(orderDetails == null)
            {
                return NotFound();
            }

            var orderDetailsDto = new
            {
                Id = orderDetails.Id,
                CartId = orderDetails.CartId,
                Date = DateTime.Now,
                Payment_Picture = orderDetails.Payment_Picture,
                Payment_Status = orderDetails.Payment_Status,
                OrderHistoryId = orderDetails.OrderHistoryId,
                ProductNames = orderDetails.ProductNames,
                Total = orderDetails.Total,

            };
            return Ok(orderDetailsDto);
        }

        [HttpGet("order_detail/{CartId}/{Id}")]
        public async Task<IActionResult> GetHistory(int CartId, int Id)
        {
            var orderDetails = await _context.Order_Details
            .Where(od => od.CartId == CartId && od.Id == Id)
            .FirstOrDefaultAsync();

            if(orderDetails == null)
            {
                return NotFound();
            }

            var orderDetailsDto = new
            {
                Id = orderDetails.Id,
                CartId = orderDetails.CartId,
                Date = orderDetails.Date,
                Payment_Picture = orderDetails.Payment_Picture,
                Payment_Status = orderDetails.Payment_Status,
                OrderHistoryId = orderDetails.OrderHistoryId,
                ProductNames = orderDetails.ProductNames,
                Total = orderDetails.Total,

            };
            return Ok(orderDetailsDto);
        }

    }
}