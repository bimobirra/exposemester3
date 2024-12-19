using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace testAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts{ get; set; }
        public DbSet<CartItem> CartItems{ get; set; }
        public DbSet<Order_Detail> Order_Details { get; set; }
        public DbSet<Order_History> Order_Histories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Cart>()
            .HasOne(c => c.User)
            .WithOne(u => u.Cart)
            .HasForeignKey<Cart>(c => c.UserId)
            .IsRequired();

            modelBuilder.Entity<CartItem>()
            .HasOne(ci => ci.Product)
            .WithMany(c => c.CartItems)
            .HasForeignKey(ci => ci.ProductId);

            modelBuilder.Entity<Cart>()
            .HasMany(c => c.CartItems)
            .WithOne(ci => ci.Cart);

            modelBuilder.Entity<Order_History>()
            .HasOne(oh => oh.User)
            .WithMany()
            .HasForeignKey(oh => oh.UserId)
            .HasConstraintName("FK_Order_Histories_AspNetUsers_UserId")
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Order_Detail>()
            .HasOne(od => od.OrderHistory)
            .WithMany(oh => oh.Order_Details)
            .HasForeignKey(od => od.OrderHistoryId)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<IdentityUserLogin<string>>().HasNoKey();
            modelBuilder.Entity<IdentityUserRole<string>>().HasNoKey();
            modelBuilder.Entity<IdentityUserToken<string>>().HasNoKey();

            base.OnModelCreating(modelBuilder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER",
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
