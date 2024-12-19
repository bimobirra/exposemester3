using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Data;
using testAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using testAPI.Dtos.Product;
using testAPI.Mappers;
using Microsoft.AspNetCore.Authorization;

namespace testAPI.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

            [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                var products = await _context.Products.Include(p => p.Category).ToListAsync();

                    var productDtos = products.Select(p => new
                    {
                        Id = p.Id,
                        product_name = p.product_name,
                        picture = p.picture,
                        price = p.price,
                        description = p.description,
                        stocks = p.stocks,
                        CategoryId = p.CategoryId,
                        category_name = p.Category.category_name,
                    }).ToList();

                    return Ok(productDtos);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)
            {
                var product = await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
                if (product == null)
                {
                    return NotFound();
                }
                
                var productDto = new 
                {
                    Id = product.Id,
                    product_name = product.product_name,
                    picture = product.picture,
                    price = product.price,
                    description = product.description,
                    stocks = product.stocks,
                    CategoryId = product.CategoryId,
                    category_name = product.Category.category_name,
                };
                

                return Ok(productDto);
            }

            [HttpGet("/item/{category}")]
            public async Task<IActionResult> GetByCategory(int category)
            {
                var products = await _context.Products.Where(p => p.CategoryId == category).Include(p => p.Category).ToListAsync();
                if (products == null)
                {
                    return NotFound();
                }

                var productDtos = products.Select(p => new
                {
                    Id = p.Id,
                    product_name = p.product_name,
                    picture = p.picture,
                    price = p.price,
                    description = p.description,
                    stocks = p.stocks,
                    CategoryId = p.CategoryId,
                    category_name = p.Category.category_name,
                }).ToList();


            return Ok(productDtos);
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] CreateProductRequestDto productDto)
            {
                var productModel = productDto.ToProductFromCreateDto();

                _context.Products.Add(productModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = productModel.Id }, productModel.ToProductDto());
            }

            [HttpPut]
            [Route("{id}")]
            public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductRequestDto updateDto)
            {
                var productModel = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

                if (productModel == null)
                {
                    return NotFound();
                }

                productModel.product_name = updateDto.product_name;
                productModel.picture = updateDto.picture;
                productModel.price = updateDto.price;
                productModel.description = updateDto.description;
                productModel.stocks = updateDto.stocks;
                productModel.CategoryId = updateDto.CategoryId;

                await _context.SaveChangesAsync();

                return Ok(productModel.ToProductDto());
            }

            [HttpDelete]
            [Route("{id}")]
            public async Task<IActionResult> Delete([FromRoute]int id)
            {
                var productModel = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

                if(productModel == null)
                {
                    return NotFound();
                }

                _context.Products.Remove(productModel);

                _context.SaveChanges();

                return NoContent();
            }
    }
}