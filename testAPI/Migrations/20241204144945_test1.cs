using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace testAPI.Migrations
{
    /// <inheritdoc />
    public partial class test1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5137a335-0272-4711-abe0-ad173c35ab6b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81f61555-189c-4ce4-8018-470a0dd857d6");

            migrationBuilder.AddColumn<string>(
                name: "ConcatProductName",
                table: "Order_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Order_Details",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9ad958dc-39db-44c1-a9d9-35cf7bd95149", null, "User", "USER" },
                    { "9c947242-40e7-4d95-bcf5-9a81701252a5", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ad958dc-39db-44c1-a9d9-35cf7bd95149");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c947242-40e7-4d95-bcf5-9a81701252a5");

            migrationBuilder.DropColumn(
                name: "ConcatProductName",
                table: "Order_Details");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Order_Details");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5137a335-0272-4711-abe0-ad173c35ab6b", null, "Admin", "ADMIN" },
                    { "81f61555-189c-4ce4-8018-470a0dd857d6", null, "User", "USER" }
                });
        }
    }
}
