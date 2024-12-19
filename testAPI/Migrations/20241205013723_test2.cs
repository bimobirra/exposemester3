using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace testAPI.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Order_Details_OrderDetailId",
                table: "CartItems");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ad958dc-39db-44c1-a9d9-35cf7bd95149");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c947242-40e7-4d95-bcf5-9a81701252a5");

            migrationBuilder.RenameColumn(
                name: "OrderDetailId",
                table: "CartItems",
                newName: "Order_DetailId");

            migrationBuilder.RenameIndex(
                name: "IX_CartItems_OrderDetailId",
                table: "CartItems",
                newName: "IX_CartItems_Order_DetailId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b3aaa81-7ab1-4aa8-9c01-a8360344bd27", null, "Admin", "ADMIN" },
                    { "b90ddc69-6094-4eb4-abc3-15480f2b9fa5", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Order_Details_Order_DetailId",
                table: "CartItems",
                column: "Order_DetailId",
                principalTable: "Order_Details",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Order_Details_Order_DetailId",
                table: "CartItems");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b3aaa81-7ab1-4aa8-9c01-a8360344bd27");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b90ddc69-6094-4eb4-abc3-15480f2b9fa5");

            migrationBuilder.RenameColumn(
                name: "Order_DetailId",
                table: "CartItems",
                newName: "OrderDetailId");

            migrationBuilder.RenameIndex(
                name: "IX_CartItems_Order_DetailId",
                table: "CartItems",
                newName: "IX_CartItems_OrderDetailId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9ad958dc-39db-44c1-a9d9-35cf7bd95149", null, "User", "USER" },
                    { "9c947242-40e7-4d95-bcf5-9a81701252a5", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Order_Details_OrderDetailId",
                table: "CartItems",
                column: "OrderDetailId",
                principalTable: "Order_Details",
                principalColumn: "Id");
        }
    }
}
