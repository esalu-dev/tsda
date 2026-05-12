using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class GetTeacherReviewsUseCase
{
    private readonly IReviewRepository _repository;

    public GetTeacherReviewsUseCase(IReviewRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Review>> ExecuteAsync(int teacherId)
    {
        return await _repository.GetByTeacherIdAsync(teacherId);
    }
}
