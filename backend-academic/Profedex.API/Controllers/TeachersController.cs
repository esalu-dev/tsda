using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profedex.Application.DTOs.Teacher;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Infrastructure.Data;

namespace Profedex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TeachersController : ControllerBase
{
    private readonly CreateTeacherUseCase _createTeacherUseCase;
    private readonly GetAllTeachers _getAllTeachers;
    private readonly GetTeacherByIdUseCase _getTeacherByIdUseCase;
    private readonly UpdateTeacherUseCase _updateTeacherUseCase;
    private readonly DeleteTeacherUseCase _deleteTeacherUseCase;

    public TeachersController(
        CreateTeacherUseCase createTeacherUseCase, 
        GetAllTeachers getAllTeachers,
        GetTeacherByIdUseCase getTeacherByIdUseCase,
        UpdateTeacherUseCase updateTeacherUseCase,
        DeleteTeacherUseCase deleteTeacherUseCase)
    {
        _createTeacherUseCase = createTeacherUseCase;
        _getAllTeachers = getAllTeachers;
        _getTeacherByIdUseCase = getTeacherByIdUseCase;
        _updateTeacherUseCase = updateTeacherUseCase;
        _deleteTeacherUseCase = deleteTeacherUseCase;
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> CreateTeacher([FromBody] CreateTeacherDto teacher) {
        try
        {
            var newTeacher = await _createTeacherUseCase.execute(teacher);
            return Ok(newTeacher);
        }
        catch (Exception ex)
        {
            // El controlador solo se encarga de manejar las respuestas HTTP correctas.
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTeachers() {
        var teachers = await _getAllTeachers.execute();
        return Ok(teachers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTeacherById(int id) {
        try {
            var teacher = await _getTeacherByIdUseCase.ExecuteAsync(id);
            return Ok(teacher);
        } catch (Exception ex) {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> UpdateTeacher(int id, [FromBody] UpdateTeacherDto dto) {
        try {
            var teacher = await _updateTeacherUseCase.ExecuteAsync(id, dto);
            return Ok(teacher);
        } catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> DeleteTeacher(int id) {
        try {
            await _deleteTeacherUseCase.ExecuteAsync(id);
            return NoContent();
        } catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }

    
}
