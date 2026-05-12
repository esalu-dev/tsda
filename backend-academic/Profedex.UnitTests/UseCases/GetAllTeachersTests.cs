using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class GetAllTeachersTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly GetAllTeachers _useCase;

    public GetAllTeachersTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        _useCase = new GetAllTeachers(_mockRepo.Object);
    }

    [Fact]
    public async Task Execute_ReturnsList()
    {
        var teachers = new List<Teacher> { new() { Id = 1, Nombre = "Test" } };
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(teachers);

        var result = await _useCase.execute();

        Assert.Single(result);
    }

    [Fact]
    public async Task Execute_ReturnsEmptyList()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Teacher>());

        var result = await _useCase.execute();

        Assert.Empty(result);
    }
}
