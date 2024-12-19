using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace testAPI.Migrations
{
    /// <inheritdoc />
    public partial class test5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "894354dd-3e25-414b-9cdd-c480e61e48d9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93ab134d-47ee-414f-9e6e-ae9a9f65f1f4");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Order_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Customer",
                table: "Order_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Order_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Order_Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "067a0592-db09-411a-a519-470a2a09662f", null, "Admin", "ADMIN" },
                    { "cfdc212f-6c38-4f5a-b762-17c45a6939a9", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "067a0592-db09-411a-a519-470a2a09662f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cfdc212f-6c38-4f5a-b762-17c45a6939a9");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Order_Details");

            migrationBuilder.DropColumn(
                name: "Customer",
                table: "Order_Details");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Order_Details");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Order_Details");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "894354dd-3e25-414b-9cdd-c480e61e48d9", null, "Admin", "ADMIN" },
                    { "93ab134d-47ee-414f-9e6e-ae9a9f65f1f4", null, "User", "USER" }
                });
        }
    }
}
