using Microsoft.AspNetCore.Mvc;
using Moq;
using Profedex.API.Controllers;
using Profedex.Application.DTOs.Teacher;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.Controllers;

public class TeachersControllerTests
{
    private readonly Mock<ITeacherRepository> _mockRepo;
    private readonly TeachersController _controller;

    public TeachersControllerTests()
    {
        _mockRepo = new Mock<ITeacherRepository>();
        var createUseCase = new CreateTeacherUseCase(_mockRepo.Object);
        var getAllUseCase = new GetAllTeachers(_mockRepo.Object);
        var getByIdUseCase = new GetTeacherByIdUseCase(_mockRepo.Object);
        var updateUseCase = new UpdateTeacherUseCase(_mockRepo.Object);
        var deleteUseCase = new DeleteTeacherUseCase(_mockRepo.Object);
        _controller = new TeachersController(createUseCase, getAllUseCase, getByIdUseCase, updateUseCase, deleteUseCase);
    }

    [Fact]
    public async Task CreateTeacher_ValidDto_ReturnsOk()
    {
        var dto = new CreateTeacherDto("Juan", "P", "M", "jpm");
        _mockRepo.Setup(r => r.GetByShortnameAsync("jpm")).ReturnsAsync((Teacher?)null);
        _mockRepo.Setup(r => r.AddAsync(It.IsAny<Teacher>())).ReturnsAsync((Teacher t) => t);

        var result = await _controller.CreateTeacher(dto);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task CreateTeacher_InvalidDto_ReturnsBadRequest()
    {
        var result = await _controller.CreateTeacher(null!);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetAllTeachers_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Teacher>());

        var result = await _controller.GetAllTeachers();

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetTeacherById_Found_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Teacher { Id = 1 });

        var result = await _controller.GetTeacherById(1);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetTeacherById_NotFound_ReturnsNotFound()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);

        var result = await _controller.GetTeacherById(999);

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task UpdateTeacher_Valid_ReturnsOk()
    {
        var existing = new Teacher { Id = 1, Shortname = "old" };
        var dto = new UpdateTeacherDto("New", "P", "M", "new", true);
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
        _mockRepo.Setup(r => r.GetByShortnameAsync("new")).ReturnsAsync((Teacher?)null);
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Teacher>())).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _controller.UpdateTeacher(1, dto);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task UpdateTeacher_NotFound_ReturnsBadRequest()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);
        var dto = new UpdateTeacherDto("A", "B", "C", "d", true);

        var result = await _controller.UpdateTeacher(999, dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task DeleteTeacher_Valid_ReturnsNoContent()
    {
        var teacher = new Teacher { Id = 1, Active = true };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(teacher);
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Teacher>())).Returns(Task.CompletedTask);
        _mockRepo.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _controller.DeleteTeacher(1);

        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteTeacher_NotFound_ReturnsBadRequest()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Teacher?)null);

        var result = await _controller.DeleteTeacher(999);

        Assert.IsType<BadRequestObjectResult>(result);
    }
}
