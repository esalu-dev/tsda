using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class GetTeacherByIdUseCase
{
    private readonly ITeacherRepository _repository;

    public GetTeacherByIdUseCase(ITeacherRepository repository)
    {
        _repository = repository;
    }

    public async Task<Teacher> ExecuteAsync(int id)
    {
        var teacher = await _repository.GetByIdAsync(id);
        if (teacher == null)
        {
            throw new Exception("Profesor no encontrado.");
        }
        return teacher;
    }
}
