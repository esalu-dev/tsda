using Profedex.Application.DTOs.Teacher;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Application.UseCases;

public class CreateTeacherUseCase
{
    private readonly ITeacherRepository _teacherRepository;
    public CreateTeacherUseCase(ITeacherRepository teacherRepository)
    {
        _teacherRepository = teacherRepository;
    }

    public async Task<Teacher> execute(CreateTeacherDto teacher)
    {
        if (teacher == null || string.IsNullOrEmpty(teacher.Shortname)) {
            throw new ArgumentException("El profesor debe tener un shortname válido.");
        }
        // Verificar si ya existe un profesor con el mismo shortname
        var existingTeacher = await _teacherRepository.GetByShortnameAsync(teacher.Shortname);
        if (existingTeacher != null) {
            throw new InvalidOperationException($"Ya existe un profesor con el shortname '{teacher.Shortname}'.");
        }
        var newTeacher = new Teacher
        {
            Nombre = teacher.Nombre,
            ApellidoPaterno = teacher.ApellidoPaterno,
            ApellidoMaterno = teacher.ApellidoMaterno,
            Shortname = teacher.Shortname,
            Active = true
        };
        return await _teacherRepository.AddAsync(newTeacher);
    }
}
