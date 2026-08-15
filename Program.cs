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

app.MapGet("/notes", async () =>
{
    var connStr = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? Environment.GetEnvironmentVariable("SQLCONNSTR_DefaultConnection");

    using var conn = new Microsoft.Data.SqlClient.SqlConnection(connStr);
    await conn.OpenAsync();

    var notes = new List<object>();
    using var cmd = new Microsoft.Data.SqlClient.SqlCommand("SELECT id, title, content, created_at FROM notes", conn);
    using var reader = await cmd.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        notes.Add(new
        {
            Id = reader.GetInt32(0),
            Title = reader.GetString(1),
            Content = reader.IsDBNull(2) ? null : reader.GetString(2),
            CreatedAt = reader.GetDateTime(3)
        });
    }

    return Results.Ok(notes);
});

app.Run();
