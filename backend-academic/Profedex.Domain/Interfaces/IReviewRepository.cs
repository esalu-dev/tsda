using Profedex.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Profedex.Domain.Interfaces;

public interface IReviewRepository
{
    Task<IEnumerable<Review>> GetByTeacherIdAsync(int teacherId);
    Task<Review?> GetByIdAsync(int id);
    Task<Review> AddAsync(Review review);
    Task DeleteAsync(Review review);
    Task SaveChangesAsync();
}
