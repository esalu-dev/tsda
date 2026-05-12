using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Profedex.Application.UseCases;
using Profedex.Domain.Interfaces;
using Profedex.Infrastructure.Data;
using Profedex.Infrastructure.Repositories;
using System.Text; // <- Esto es vital para que encuentre tu ApplicationDbContext
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// --- ESTE ES EL C�DIGO NUEVO ---
// Aqu� conectamos tu base de datos de SQLite
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("WriteDb")
        ?? "Data Source=profedex.db");
});
// -------------------------------

builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<IMateriaRepository, MateriaRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

// Casos de uso
builder.Services.AddScoped<CreateTeacherUseCase>();
builder.Services.AddScoped<GetAllTeachers>();
builder.Services.AddScoped<GetTeacherByIdUseCase>();
builder.Services.AddScoped<UpdateTeacherUseCase>();
builder.Services.AddScoped<DeleteTeacherUseCase>();
builder.Services.AddScoped<CreateMateriaUseCase>();
builder.Services.AddScoped<GetAllMateriasUseCase>();
builder.Services.AddScoped<CreateReviewUseCase>();
builder.Services.AddScoped<GetTeacherReviewsUseCase>();
builder.Services.AddScoped<DeleteReviewUseCase>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!)
            ),
            // Si en NestJS configuras "Issuer" o "Audience", pon estos en 'true' y config�ralos abajo
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true, // Verifica que el token no haya expirado
            ClockSkew = TimeSpan.Zero,
            RoleClaimType = ClaimTypes.Role
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // 1. Primero pregunta "�Qui�n eres? (valida el token)"
app.UseAuthorization();  // 2. Luego pregunta "�Tienes permisos? (ej. Solo admins)"
app.MapControllers();

app.Run();
