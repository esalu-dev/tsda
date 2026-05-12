using Moq;
using Profedex.Application.DTOs.Teacher;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class UpdateTeacherUseCaseTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly UpdateTeacherUseCase _useCase;

    public UpdateTeacherUseCaseTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        _useCase = new UpdateTeacherUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ValidUpdate_ReturnsUpdatedTeacher()
    {
        var existing = new Teacher { Id = 1, Nombre = "Old", ApellidoPaterno = "P", ApellidoMaterno = "M", Shortname = "old", Active = true };
        var dto = new UpdateTeacherDto("New", "NP", "NM", "new-short", true);
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
        _mockRepo.Setup(r => r.GetByShortnameAsync("new-short")).ReturnsAsync((Teacher?)null);
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Teacher>())).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _useCase.ExecuteAsync(1, dto);

        Assert.Equal("New", result.Nombre);
        Assert.Equal("new-short", result.Shortname);
    }

    [Fact]
    public async Task ExecuteAsync_SameShortname_SkipsDuplicateCheck()
    {
        var existing = new Teacher { Id = 1, Nombre = "Old", Shortname = "same", Active = true };
        var dto = new UpdateTeacherDto("New", "NP", "NM", "same", true);
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Teacher>())).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _useCase.ExecuteAsync(1, dto);

        Assert.Equal("New", result.Nombre);
        _mockRepo.Verify(r => r.GetByShortnameAsync(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public async Task ExecuteAsync_NonExistingId_ThrowsException()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);
        var dto = new UpdateTeacherDto("A", "B", "C", "d", true);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(999, dto));
    }

    [Fact]
    public async Task ExecuteAsync_DuplicateShortname_ThrowsInvalidOperationException()
    {
        var existing = new Teacher { Id = 1, Shortname = "old" };
        var dto = new UpdateTeacherDto("A", "B", "C", "taken", true);
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
        _mockRepo.Setup(r => r.GetByShortnameAsync("taken")).ReturnsAsync(new Teacher { Id = 2, Shortname = "taken" });

        await Assert.ThrowsAsync<InvalidOperationException>(() => _useCase.ExecuteAsync(1, dto));
    }
}
