using API_DotNet.Infrastructures;
using API_DotNet.Repository.Encryption;
using API_DotNet.Repository.User;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddTransient<IEncryptionService, EncryptionService>();

builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.

// Configurar o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
