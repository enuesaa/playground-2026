var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello from dotnet Web API!");

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.MapGet("/echo/{message}", (string message) => new { message });

app.Run("http://0.0.0.0:8080");
