using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace testAPI.Migrations
{
    /// <inheritdoc />
    public partial class test4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3242b98e-4371-46bc-9584-36067d28763d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "517a78ec-4731-46fb-92b6-96d4ec50f1da");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Order_Histories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "894354dd-3e25-414b-9cdd-c480e61e48d9", null, "Admin", "ADMIN" },
                    { "93ab134d-47ee-414f-9e6e-ae9a9f65f1f4", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "894354dd-3e25-414b-9cdd-c480e61e48d9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93ab134d-47ee-414f-9e6e-ae9a9f65f1f4");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Order_Histories");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3242b98e-4371-46bc-9584-36067d28763d", null, "User", "USER" },
                    { "517a78ec-4731-46fb-92b6-96d4ec50f1da", null, "Admin", "ADMIN" }
                });
        }
    }
}
