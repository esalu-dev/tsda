using Profedex.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Profedex.Domain.Interfaces;

public interface IMateriaRepository
{
    Task<IEnumerable<Materia>> GetAllAsync();
    Task<Materia?> GetByIdAsync(int id);
    Task<Materia?> GetByNombreYCarreraAsync(string nombre, string carrera);
    Task<Materia> AddAsync(Materia materia);
    Task UpdateAsync(Materia materia);
    Task SaveChangesAsync();
}
