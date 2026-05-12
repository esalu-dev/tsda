namespace Profedex.Application.DTOs.Teacher;

public record UpdateTeacherDto(
    string Nombre,
    string ApellidoPaterno,
    string ApellidoMaterno,
    string Shortname,
    bool Active
);
