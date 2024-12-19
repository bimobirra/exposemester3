using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Models;
using testAPI.Dtos.CartItem;

namespace testAPI.Mappers
{
    public static class cartItemDto
    {
        public static CartItemDto ToCartItemDto(this CartItem cartItemModel)
        {
            return new CartItemDto
            {
                Id = cartItemModel.Id,
                Quantity = cartItemModel.Quantity,
                CartId = cartItemModel.CartId,
                ProductId = cartItemModel.ProductId,
                Price = cartItemModel.Price,
                Total = cartItemModel.Total,
            };
        }

        public static CartItem ToCartitemFromCreateDto(this CreateCartItemDto cartItemDto)
        {
            return new CartItem
            {
                Quantity = cartItemDto.Quantity,
                CartId = cartItemDto.CartId,
                ProductId = cartItemDto.ProductId,
                Price = cartItemDto.Price,
 
            };
        }
    }
}