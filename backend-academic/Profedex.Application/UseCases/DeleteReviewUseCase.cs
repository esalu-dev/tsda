using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class DeleteReviewUseCase
{
    private readonly IReviewRepository _repository;

    public DeleteReviewUseCase(IReviewRepository repository)
    {
        _repository = repository;
    }

    public async Task ExecuteAsync(int reviewId, string userId, bool isAdmin)
    {
        var review = await _repository.GetByIdAsync(reviewId);
        if (review == null) throw new Exception("Reseña no encontrada.");

        if (review.UserId != userId && !isAdmin)
        {
            throw new UnauthorizedAccessException("No tienes permiso para borrar esta reseña.");
        }

        await _repository.DeleteAsync(review);
        await _repository.SaveChangesAsync();
    }
}
