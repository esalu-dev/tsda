using Moq;
using Profedex.Application.DTOs.Teacher;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class CreateTeacherUseCaseTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly CreateTeacherUseCase _useCase;

    public CreateTeacherUseCaseTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        _useCase = new CreateTeacherUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task Execute_ValidDto_ReturnsCreatedTeacher()
    {
        var dto = new CreateTeacherDto("Juan", "Perez", "Lopez", "jperez");
        _mockRepo.Setup(r => r.GetByShortnameAsync("jperez")).ReturnsAsync((Teacher?)null);
        _mockRepo.Setup(r => r.AddAsync(It.IsAny<Teacher>())).ReturnsAsync((Teacher t) => t);

        var result = await _useCase.execute(dto);

        Assert.Equal("Juan", result.Nombre);
        Assert.Equal("jperez", result.Shortname);
        Assert.True(result.Active);
    }

    [Fact]
    public async Task Execute_NullDto_ThrowsArgumentException()
    {
        await Assert.ThrowsAsync<ArgumentException>(() => _useCase.execute(null!));
    }

    [Fact]
    public async Task Execute_EmptyShortname_ThrowsArgumentException()
    {
        var dto = new CreateTeacherDto("Juan", "Perez", "Lopez", "");
        await Assert.ThrowsAsync<ArgumentException>(() => _useCase.execute(dto));
    }

    [Fact]
    public async Task Execute_DuplicateShortname_ThrowsInvalidOperationException()
    {
        var dto = new CreateTeacherDto("Juan", "Perez", "Lopez", "jperez");
        _mockRepo.Setup(r => r.GetByShortnameAsync("jperez")).ReturnsAsync(new Teacher { Shortname = "jperez" });

        await Assert.ThrowsAsync<InvalidOperationException>(() => _useCase.execute(dto));
    }
}
