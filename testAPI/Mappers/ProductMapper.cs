using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Dtos.Product;
using testAPI.Models;

namespace testAPI.Mappers
{
    public static class ProductMapper
    {
        public static ProductDto ToProductDto(this Product productModel)
        {
            return new ProductDto
            {
                Id = productModel.Id,
                product_name = productModel.product_name,
                picture = productModel.picture,
                description = productModel.description,
                price = productModel.price,
                stocks = productModel.stocks,
                CategoryId = productModel.CategoryId,
            };
        }

        public static Product ToProductFromCreateDto(this CreateProductRequestDto productDto)
        {
            return new Product
            {
                product_name = productDto.product_name,
                picture = productDto.picture,
                description = productDto.description,
                price = productDto.price,
                stocks = productDto.stocks,
                CategoryId = productDto.CategoryId
            };
        }
    }
}