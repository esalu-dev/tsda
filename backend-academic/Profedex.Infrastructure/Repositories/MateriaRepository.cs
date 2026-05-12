using Microsoft.EntityFrameworkCore;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using Profedex.Infrastructure.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Profedex.Infrastructure.Repositories;

public class MateriaRepository : IMateriaRepository
{
    private readonly ApplicationDBContext _context;

    public MateriaRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Materia> AddAsync(Materia materia)
    {
        _context.Materias.Add(materia);
        await _context.SaveChangesAsync();
        return materia;
    }

    public async Task<IEnumerable<Materia>> GetAllAsync()
    {
        return await _context.Materias.ToListAsync();
    }

    public async Task<Materia?> GetByIdAsync(int id)
    {
        return await _context.Materias.FindAsync(id);
    }

    public async Task<Materia?> GetByNombreYCarreraAsync(string nombre, string carrera)
    {
        return await _context.Materias.FirstOrDefaultAsync(m => m.Nombre == nombre && m.Carrera == carrera);
    }

    public Task UpdateAsync(Materia materia)
    {
        _context.Materias.Update(materia);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
