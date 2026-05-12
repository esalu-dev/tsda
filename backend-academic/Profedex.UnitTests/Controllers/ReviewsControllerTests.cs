using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Profedex.API.Controllers;
using Profedex.Application.DTOs.Review;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System.Security.Claims;

namespace Profedex.UnitTests.Controllers;

public class ReviewsControllerTests
{
    private readonly Mock<IReviewRepository> _mockReviewRepo;
    private readonly Mock<ITeacherRepository> _mockTeacherRepo;
    private readonly Mock<IMateriaRepository> _mockMateriaRepo;
    private readonly ReviewsController _controller;

    public ReviewsControllerTests()
    {
        _mockReviewRepo = new Mock<IReviewRepository>();
        _mockTeacherRepo = new Mock<ITeacherRepository>();
        _mockMateriaRepo = new Mock<IMateriaRepository>();

        var createUseCase = new CreateReviewUseCase(_mockReviewRepo.Object, _mockTeacherRepo.Object, _mockMateriaRepo.Object);
        var getUseCase = new GetTeacherReviewsUseCase(_mockReviewRepo.Object);
        var deleteUseCase = new DeleteReviewUseCase(_mockReviewRepo.Object);

        _controller = new ReviewsController(createUseCase, getUseCase, deleteUseCase);
    }

    private void SetupUserClaims(string userId, string role = "USER")
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId),
            new("sub", userId),
            new(ClaimTypes.Role, role)
        };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var user = new ClaimsPrincipal(identity);
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user }
        };
    }

    private void SetupNoUserClaims()
    {
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext()
        };
    }

    [Fact]
    public async Task CreateReview_Valid_ReturnsOk()
    {
        SetupUserClaims("user-uuid-123");
        var dto = new CreateReviewDto(1, "Great", 5, 3, true, 4);
        _mockTeacherRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Teacher { Id = 1 });
        _mockMateriaRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Materia { Id = 1 });
        _mockReviewRepo.Setup(r => r.AddAsync(It.IsAny<Review>())).ReturnsAsync((Review r) => r);

        var result = await _controller.CreateReview(1, dto);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task CreateReview_NoUserId_ReturnsUnauthorized()
    {
        SetupNoUserClaims();
        var dto = new CreateReviewDto(1, "Great", 5, 3, true, 4);

        var result = await _controller.CreateReview(1, dto);

        Assert.IsType<UnauthorizedResult>(result);
    }

    [Fact]
    public async Task CreateReview_TeacherNotFound_ReturnsBadRequest()
    {
        SetupUserClaims("user-uuid-123");
        var dto = new CreateReviewDto(1, "Great", 5, 3, true, 4);
        _mockTeacherRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Teacher?)null);

        var result = await _controller.CreateReview(1, dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetTeacherReviews_ReturnsOk()
    {
        _mockReviewRepo.Setup(r => r.GetByTeacherIdAsync(1)).ReturnsAsync(new List<Review>());

        var result = await _controller.GetTeacherReviews(1);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task DeleteReview_Valid_ReturnsNoContent()
    {
        SetupUserClaims("user-1");
        var review = new Review { Id = 1, UserId = "user-1" };
        _mockReviewRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(review);
        _mockReviewRepo.Setup(r => r.DeleteAsync(review)).Returns(Task.CompletedTask);
        _mockReviewRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _controller.DeleteReview(1);

        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteReview_NoUserId_ReturnsUnauthorized()
    {
        SetupNoUserClaims();

        var result = await _controller.DeleteReview(1);

        Assert.IsType<UnauthorizedResult>(result);
    }

    [Fact]
    public async Task DeleteReview_NotFound_ReturnsBadRequest()
    {
        SetupUserClaims("user-1");
        _mockReviewRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Review?)null);

        var result = await _controller.DeleteReview(999);

        Assert.IsType<BadRequestObjectResult>(result);
    }
}
