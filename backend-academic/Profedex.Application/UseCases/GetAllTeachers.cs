using Profedex.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Application.UseCases;

public class GetAllTeachers
{
    private readonly ITeacherRepository teacherRepository;
    public GetAllTeachers(ITeacherRepository teacherRepository)
    {
        this.teacherRepository = teacherRepository;
    }

    public async Task<IEnumerable<Domain.Entities.Teacher>> execute()
    {
        return await teacherRepository.GetAllAsync();
    }
}
