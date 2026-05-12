using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class DeleteReviewUseCaseTests
{
    private readonly Mock<IReviewRepository> _mockRepo;
    private readonly DeleteReviewUseCase _useCase;

    public DeleteReviewUseCaseTests()
    {
        _mockRepo = new Mock<IReviewRepository>();
        _useCase = new DeleteReviewUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_OwnerDeletes_Succeeds()
    {
        var review = new Review { Id = 1, UserId = "user-1" };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(review);
        _mockRepo.Setup(r => r.DeleteAsync(review)).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _useCase.ExecuteAsync(1, "user-1", false);

        _mockRepo.Verify(r => r.DeleteAsync(review), Times.Once);
        _mockRepo.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_AdminDeletes_Succeeds()
    {
        var review = new Review { Id = 1, UserId = "user-1" };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(review);
        _mockRepo.Setup(r => r.DeleteAsync(review)).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _useCase.ExecuteAsync(1, "admin-uuid", true);

        _mockRepo.Verify(r => r.DeleteAsync(review), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_ReviewNotFound_ThrowsException()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Review?)null);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(999, "user-1", false));
    }

    [Fact]
    public async Task ExecuteAsync_NotOwnerNotAdmin_ThrowsUnauthorizedAccess()
    {
        var review = new Review { Id = 1, UserId = "user-1" };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(review);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(() => _useCase.ExecuteAsync(1, "user-2", false));
    }
}
