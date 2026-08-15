var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello");
app.MapGet("/aaa", () => "aaa");

app.MapGet("/db-test", async () =>
{
    var connStr = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? Environment.GetEnvironmentVariable("SQLCONNSTR_DefaultConnection");

    using var conn = new Microsoft.Data.SqlClient.SqlConnection(connStr);
    await conn.OpenAsync();
    return "DB connected: " + conn.State;
});

app.Run();
