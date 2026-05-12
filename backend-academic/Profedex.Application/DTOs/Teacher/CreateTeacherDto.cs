using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Application.DTOs.Teacher;

public record CreateTeacherDto(
    string Nombre,
    string ApellidoPaterno,
    string ApellidoMaterno,
    string Shortname
);
