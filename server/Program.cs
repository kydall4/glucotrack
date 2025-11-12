using GlucoTrack.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// EF Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GlucoContext>(options =>
    options.UseSqlServer(connectionString));

// Swagger for quick testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClient", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowClient");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<GlucoTrack.Data.GlucoContext>();
        context.Database.Migrate(); // apply migrations if needed
        await GlucoTrack.Data.SeedData.InitializeAsync(context);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"⚠️ Seeding failed: {ex.Message}");
    }
}

app.Run();
