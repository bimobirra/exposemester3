using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Data;
using testAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using testAPI.Dtos.Category;
using testAPI.Mappers;

namespace testAPI.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            {
                var categories = await _context.Categories.Include(c => c.Products).ToListAsync();

                    var categoryDto = categories.Select(c => new
                    {
                        Id = c.Id,
                        category_name = c.category_name,
                        Products = c.Products.Select(p => new
                        {
                            Id = p.Id,
                            product_name = p.product_name
                        }).ToList()
                    }).ToList();

                    return Ok(categoryDto);
            }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            {
                var category = await _context.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    return NotFound();
                }

                var CategoryDto = new 
                {
                    Id = category.Id,
                    category_name = category.category_name,
                    Products = category.Products.Select(p => new
                    {
                        Id = p.Id,
                        product_name = p.product_name
                    })
                };
                return Ok(CategoryDto);
            }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto categoryDto)
        {
            var categoryModel = categoryDto.ToCategoryFromCreateDto();

            _context.Categories.Add(categoryModel);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id }, categoryModel.ToCategoryDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryDto updateDto)
        {
            var categoryModel = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if (categoryModel == null)
            {
                return NotFound();
            }

            categoryModel.category_name = updateDto.category_name;

            await _context.SaveChangesAsync();

            return Ok(categoryModel.ToCategoryDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            var categoryModel = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if(categoryModel == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categoryModel);

            _context.SaveChanges();

            return NoContent();
        }
    }   
        
}