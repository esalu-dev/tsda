using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class GetAllMateriasUseCaseTests
{
    private readonly Mock<IMateriaRepository> _mockRepo;
    private readonly GetAllMateriasUseCase _useCase;

    public GetAllMateriasUseCaseTests()
    {
        _mockRepo = new Mock<IMateriaRepository>();
        _useCase = new GetAllMateriasUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ReturnsList()
    {
        var materias = new List<Materia> { new() { Id = 1, Nombre = "Cálculo" } };
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(materias);

        var result = await _useCase.ExecuteAsync();

        Assert.Single(result);
    }

    [Fact]
    public async Task ExecuteAsync_ReturnsEmptyList()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Materia>());

        var result = await _useCase.ExecuteAsync();

        Assert.Empty(result);
    }
}
