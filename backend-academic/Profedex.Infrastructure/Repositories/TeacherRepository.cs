using Microsoft.EntityFrameworkCore;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using Profedex.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Infrastructure.Repositories;

public class TeacherRepository : ITeacherRepository
{
    private readonly ApplicationDBContext _context;

    public TeacherRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Teacher> AddAsync(Teacher teacher)
    {
        _context.Teachers.Add(teacher);
        await _context.SaveChangesAsync();
        return teacher;
    }

    public async Task<IEnumerable<Teacher>> GetAllAsync()
    {
        return await _context.Teachers.ToListAsync();
    }

    public async Task<Teacher?> GetByShortnameAsync(string shortname)
    {
        return await _context.Teachers.FirstOrDefaultAsync(t => t.Shortname == shortname);
    }

    public async Task<Teacher?> GetByIdAsync(int id)
    {
        return await _context.Teachers.FindAsync(id);
    }

    public Task UpdateAsync(Teacher teacher)
    {
        _context.Teachers.Update(teacher);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
