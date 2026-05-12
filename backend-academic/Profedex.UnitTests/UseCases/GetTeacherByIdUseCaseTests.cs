using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class GetTeacherByIdUseCaseTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly GetTeacherByIdUseCase _useCase;

    public GetTeacherByIdUseCaseTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        _useCase = new GetTeacherByIdUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ExistingId_ReturnsTeacher()
    {
        var teacher = new Teacher { Id = 1, Nombre = "Juan" };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(teacher);

        var result = await _useCase.ExecuteAsync(1);

        Assert.Equal("Juan", result.Nombre);
    }

    [Fact]
    public async Task ExecuteAsync_NonExistingId_ThrowsException()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(999));
    }
}
