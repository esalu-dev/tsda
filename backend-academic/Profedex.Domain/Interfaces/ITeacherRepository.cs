using Profedex.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Domain.Interfaces;

public interface ITeacherRepository
{
    Task<IEnumerable<Teacher>> GetAllAsync();
    Task<Teacher?> GetByIdAsync(int id);
    Task<Teacher?> GetByShortnameAsync(string shortname);
    Task<Teacher> AddAsync(Teacher teacher);
    Task UpdateAsync(Teacher teacher);
    Task SaveChangesAsync();
}
