using Microsoft.AspNetCore.Mvc;
using Moq;
using Profedex.API.Controllers;
using Profedex.Application.DTOs.Materia;
using Profedex.Application.UseCases;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;

namespace Profedex.UnitTests.Controllers;

public class MateriasControllerTests
{
    private readonly Mock<IMateriaRepository> _mockRepo;
    private readonly MateriasController _controller;

    public MateriasControllerTests()
    {
        _mockRepo = new Mock<IMateriaRepository>();
        var createUseCase = new CreateMateriaUseCase(_mockRepo.Object);
        var getAllUseCase = new GetAllMateriasUseCase(_mockRepo.Object);
        _controller = new MateriasController(createUseCase, getAllUseCase);
    }

    [Fact]
    public async Task CreateMateria_ValidDto_ReturnsOk()
    {
        var dto = new CreateMateriaDto("Cálculo", "ISC");
        _mockRepo.Setup(r => r.GetByNombreYCarreraAsync("Cálculo", "ISC")).ReturnsAsync((Materia?)null);
        _mockRepo.Setup(r => r.AddAsync(It.IsAny<Materia>())).ReturnsAsync((Materia m) => m);

        var result = await _controller.CreateMateria(dto);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task CreateMateria_Invalid_ReturnsBadRequest()
    {
        var dto = new CreateMateriaDto("", "ISC");

        var result = await _controller.CreateMateria(dto);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task GetAllMaterias_ReturnsOk()
    {
        _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Materia>());

        var result = await _controller.GetAllMaterias();

        Assert.IsType<OkObjectResult>(result);
    }
}
