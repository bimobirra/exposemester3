using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace testAPI.Migrations
{
    /// <inheritdoc />
    public partial class test3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b3aaa81-7ab1-4aa8-9c01-a8360344bd27");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b90ddc69-6094-4eb4-abc3-15480f2b9fa5");

            migrationBuilder.RenameColumn(
                name: "ConcatProductName",
                table: "Order_Details",
                newName: "ProductNames");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3242b98e-4371-46bc-9584-36067d28763d", null, "User", "USER" },
                    { "517a78ec-4731-46fb-92b6-96d4ec50f1da", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3242b98e-4371-46bc-9584-36067d28763d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "517a78ec-4731-46fb-92b6-96d4ec50f1da");

            migrationBuilder.RenameColumn(
                name: "ProductNames",
                table: "Order_Details",
                newName: "ConcatProductName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b3aaa81-7ab1-4aa8-9c01-a8360344bd27", null, "Admin", "ADMIN" },
                    { "b90ddc69-6094-4eb4-abc3-15480f2b9fa5", null, "User", "USER" }
                });
        }
    }
}
