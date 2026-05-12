using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class DeleteTeacherUseCaseTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly DeleteTeacherUseCase _useCase;

    public DeleteTeacherUseCaseTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        _useCase = new DeleteTeacherUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ExistingId_SoftDeletesTeacher()
    {
        var teacher = new Teacher { Id = 1, Active = true };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(teacher);
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Teacher>())).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _useCase.ExecuteAsync(1);

        Assert.False(teacher.Active);
        _mockRepo.Verify(r => r.UpdateAsync(teacher), Times.Once);
        _mockRepo.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_NonExistingId_ThrowsException()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(999));
    }
}
