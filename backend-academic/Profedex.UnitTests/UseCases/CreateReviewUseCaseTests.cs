using Moq;
using Profedex.Application.DTOs.Review;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.UseCases;

public class CreateReviewUseCaseTests
{
    private readonly Mock<IReviewRepository> _mockReviewRepo;
    private readonly Mock<ITeacherRepository> _mockTeacherRepo;
    private readonly Mock<IMateriaRepository> _mockMateriaRepo;
    private readonly CreateReviewUseCase _useCase;

    public CreateReviewUseCaseTests()
    {
        _mockReviewRepo = new Mock<IReviewRepository>();
        _mockTeacherRepo = new Mock<ITeacherRepository>();
        _mockMateriaRepo = new Mock<IMateriaRepository>();
        _useCase = new CreateReviewUseCase(_mockReviewRepo.Object, _mockTeacherRepo.Object, _mockMateriaRepo.Object);
    }

    [Fact]
    public async Task ExecuteAsync_ValidDto_ReturnsReview()
    {
        var dto = new CreateReviewDto(1, "Gran profe", 5, 3, true, 4);
        _mockTeacherRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Teacher { Id = 1 });
        _mockMateriaRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Materia { Id = 1 });
        _mockReviewRepo.Setup(r => r.AddAsync(It.IsAny<Review>())).ReturnsAsync((Review r) => r);

        var result = await _useCase.ExecuteAsync(dto, "user-uuid-123", 1);

        Assert.Equal("Gran profe", result.Body);
        Assert.Equal("user-uuid-123", result.UserId);
        Assert.Equal(5, result.Rating);
        Assert.True(result.Published);
    }

    [Fact]
    public async Task ExecuteAsync_TeacherNotFound_ThrowsException()
    {
        var dto = new CreateReviewDto(1, "Body", 5, 3, true, 4);
        _mockTeacherRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(dto, "user-uuid", 999));
    }

    [Fact]
    public async Task ExecuteAsync_MateriaNotFound_ThrowsException()
    {
        var dto = new CreateReviewDto(999, "Body", 5, 3, true, 4);
        _mockTeacherRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Teacher { Id = 1 });
        _mockMateriaRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Materia?)null);

        await Assert.ThrowsAsync<Exception>(() => _useCase.ExecuteAsync(dto, "user-uuid", 1));
    }
}
