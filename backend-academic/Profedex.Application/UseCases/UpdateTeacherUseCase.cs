using Profedex.Application.DTOs.Teacher;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class UpdateTeacherUseCase
{
    private readonly ITeacherRepository _repository;

    public UpdateTeacherUseCase(ITeacherRepository repository)
    {
        _repository = repository;
    }

    public async Task<Teacher> ExecuteAsync(int id, UpdateTeacherDto dto)
    {
        var teacher = await _repository.GetByIdAsync(id);
        if (teacher == null)
        {
            throw new Exception("Profesor no encontrado.");
        }

        // Check if shortname is being changed and if it already exists
        if (teacher.Shortname != dto.Shortname)
        {
            var existing = await _repository.GetByShortnameAsync(dto.Shortname);
            if (existing != null)
            {
                throw new InvalidOperationException($"Ya existe un profesor con el shortname '{dto.Shortname}'.");
            }
        }

        teacher.Nombre = dto.Nombre;
        teacher.ApellidoPaterno = dto.ApellidoPaterno;
        teacher.ApellidoMaterno = dto.ApellidoMaterno;
        teacher.Shortname = dto.Shortname;
        teacher.Active = dto.Active;

        await _repository.UpdateAsync(teacher);
        await _repository.SaveChangesAsync();

        return teacher;
    }
}
