using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Profedex.Application.DTOs.Materia;
using Profedex.Application.UseCases;
using System;
using System.Threading.Tasks;

namespace Profedex.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MateriasController : ControllerBase
{
    private readonly CreateMateriaUseCase _createMateriaUseCase;
    private readonly GetAllMateriasUseCase _getAllMaterias;

    public MateriasController(CreateMateriaUseCase createMateriaUseCase, GetAllMateriasUseCase getAllMaterias)
    {
        _createMateriaUseCase = createMateriaUseCase;
        _getAllMaterias = getAllMaterias;
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> CreateMateria([FromBody] CreateMateriaDto dto)
    {
        try
        {
            var materia = await _createMateriaUseCase.ExecuteAsync(dto);
            return Ok(materia);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMaterias()
    {
        var materias = await _getAllMaterias.ExecuteAsync();
        return Ok(materias);
    }
}
