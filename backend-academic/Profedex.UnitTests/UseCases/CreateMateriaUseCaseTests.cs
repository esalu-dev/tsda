using Moq;
using Profedex.Application.DTOs.Materia;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class CreateMateriaUseCaseTests
{
    private readonly Mock<IMateriaRepository> _mockRepo;
    private readonly CreateMateriaUseCase _useCase;

    public CreateMateriaUseCaseTests()
    {
        _mockRepo = new Mock<IMateriaRepository>();
        _useCase = new CreateMateriaUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ValidDto_ReturnsCreatedMateria()
    {
        var dto = new CreateMateriaDto("Cálculo", "ISC");
        _mockRepo.Setup(r => r.GetByNombreYCarreraAsync("Cálculo", "ISC")).ReturnsAsync((Materia?)null);
        _mockRepo.Setup(r => r.AddAsync(It.IsAny<Materia>())).ReturnsAsync((Materia m) => m);

        var result = await _useCase.ExecuteAsync(dto);

        Assert.Equal("Cálculo", result.Nombre);
        Assert.Equal("ISC", result.Carrera);
    }

    [Fact]
    public async Task ExecuteAsync_EmptyNombre_ThrowsArgumentException()
    {
        var dto = new CreateMateriaDto("", "ISC");
        await Assert.ThrowsAsync<ArgumentException>(() => _useCase.ExecuteAsync(dto));
    }

    [Fact]
    public async Task ExecuteAsync_EmptyCarrera_ThrowsArgumentException()
    {
        var dto = new CreateMateriaDto("Cálculo", "");
        await Assert.ThrowsAsync<ArgumentException>(() => _useCase.ExecuteAsync(dto));
    }

    [Fact]
    public async Task ExecuteAsync_Duplicate_ThrowsInvalidOperationException()
    {
        var dto = new CreateMateriaDto("Cálculo", "ISC");
        _mockRepo.Setup(r => r.GetByNombreYCarreraAsync("Cálculo", "ISC")).ReturnsAsync(new Materia { Nombre = "Cálculo", Carrera = "ISC" });

        await Assert.ThrowsAsync<InvalidOperationException>(() => _useCase.ExecuteAsync(dto));
    }
}
