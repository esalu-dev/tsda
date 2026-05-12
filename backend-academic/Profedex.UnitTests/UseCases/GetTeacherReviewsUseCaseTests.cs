using Moq;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class GetTeacherReviewsUseCaseTests
{
    private readonly Mock<IReviewRepository> _mockRepo;
    private readonly GetTeacherReviewsUseCase _useCase;

    public GetTeacherReviewsUseCaseTests()
    {
        _mockRepo = new Mock<IReviewRepository>();
        _useCase = new GetTeacherReviewsUseCase(_mockRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ReturnsReviews()
    {
        var reviews = new List<Review> { new() { Id = 1, TeacherId = 1, Body = "Good" } };
        _mockRepo.Setup(r => r.GetByTeacherIdAsync(1)).ReturnsAsync(reviews);

        var result = await _useCase.ExecuteAsync(1);

        Assert.Single(result);
    }

    [Fact]
    public async Task ExecuteAsync_ReturnsEmptyList()
    {
        _mockRepo.Setup(r => r.GetByTeacherIdAsync(1)).ReturnsAsync(new List<Review>());

        var result = await _useCase.ExecuteAsync(1);

        Assert.Empty(result);
    }
}
