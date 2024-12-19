using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Models;
using testAPI.Data;


namespace testAPI.Dtos.Category
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string category_name { get; set; }
    }
}