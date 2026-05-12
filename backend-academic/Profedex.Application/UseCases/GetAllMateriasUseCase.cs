using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class GetAllMateriasUseCase
{
    private readonly IMateriaRepository _repository;

    public GetAllMateriasUseCase(IMateriaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Profedex.Domain.Entities.Materia>> ExecuteAsync()
    {
        return await _repository.GetAllAsync();
    }
}
