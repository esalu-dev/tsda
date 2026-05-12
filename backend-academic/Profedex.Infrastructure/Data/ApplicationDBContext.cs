using Microsoft.EntityFrameworkCore;
using Profedex.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Infrastructure.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options) { }
    // Aquí exponemos la tabla de Profesores
    public DbSet<Teacher> Teachers => Set<Teacher>();
    public DbSet<Materia> Materias => Set<Materia>();
    public DbSet<Review> Reviews => Set<Review>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Hacemos el Shortname único
        modelBuilder.Entity<Teacher>()
            .HasIndex(t => t.Shortname)
            .IsUnique();

        modelBuilder.Entity<Materia>()
            .HasIndex(m => new { m.Nombre, m.Carrera })
            .IsUnique();
    }

}
