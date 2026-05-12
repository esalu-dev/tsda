using Microsoft.EntityFrameworkCore;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using Profedex.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Profedex.Infrastructure.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly ApplicationDBContext _context;

    public ReviewRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Review> AddAsync(Review review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
        return review;
    }

    public async Task DeleteAsync(Review review)
    {
        _context.Reviews.Remove(review);
        await Task.CompletedTask;
    }

    public async Task<Review?> GetByIdAsync(int id)
    {
        return await _context.Reviews.FindAsync(id);
    }

    public async Task<IEnumerable<Review>> GetByTeacherIdAsync(int teacherId)
    {
        return await _context.Reviews
            .Include(r => r.Teacher)
            .Include(r => r.Materia)
            .Where(r => r.TeacherId == teacherId && r.Published)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
