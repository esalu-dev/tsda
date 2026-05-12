using Profedex.Application.DTOs.Materia;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class CreateMateriaUseCase
{
    private readonly IMateriaRepository _repository;

    public CreateMateriaUseCase(IMateriaRepository repository)
    {
        _repository = repository;
    }

    public async Task<Profedex.Domain.Entities.Materia> ExecuteAsync(CreateMateriaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre) || string.IsNullOrWhiteSpace(dto.Carrera))
        {
            throw new ArgumentException("El nombre y la carrera son obligatorios.");
        }

        var existing = await _repository.GetByNombreYCarreraAsync(dto.Nombre, dto.Carrera);
        if (existing != null)
        {
            throw new InvalidOperationException($"La materia '{dto.Nombre}' para la carrera '{dto.Carrera}' ya existe.");
        }

        var nuevaMateria = new Profedex.Domain.Entities.Materia
        {
            Nombre = dto.Nombre,
            Carrera = dto.Carrera
        };

        return await _repository.AddAsync(nuevaMateria);
    }
}
