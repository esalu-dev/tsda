using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class DeleteTeacherUseCase
{
    private readonly ITeacherRepository _repository;

    public DeleteTeacherUseCase(ITeacherRepository repository)
    {
        _repository = repository;
    }

    public async Task ExecuteAsync(int id)
    {
        var teacher = await _repository.GetByIdAsync(id);
        if (teacher == null)
        {
            throw new Exception("Profesor no encontrado.");
        }

        // Soft delete
        teacher.Active = false;
        
        await _repository.UpdateAsync(teacher);
        await _repository.SaveChangesAsync();
    }
}
