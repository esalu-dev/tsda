using Profedex.Domain.Entities;
using Profedex.Infrastructure.Repositories;
using Profedex.IntegrationTests.Helpers;

namespace Profedex.IntegrationTests.Repositories;

public class MateriaRepositoryTests
{
    [Fact]
    public async Task AddAsync_And_GetAllAsync_WorkCorrectly()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);
        var materia = new Materia { Nombre = "Cálculo", Carrera = "ISC" };

        var created = await repo.AddAsync(materia);
        var all = await repo.GetAllAsync();

        Assert.True(created.Id > 0);
        Assert.Single(all);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsMateria()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);
        var materia = new Materia { Nombre = "Física", Carrera = "ISC" };
        await repo.AddAsync(materia);

        var result = await repo.GetByIdAsync(materia.Id);

        Assert.NotNull(result);
        Assert.Equal("Física", result.Nombre);
    }

    [Fact]
    public async Task GetByIdAsync_NonExisting_ReturnsNull()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);

        var result = await repo.GetByIdAsync(999);

        Assert.Null(result);
    }

    [Fact]
    public async Task GetByNombreYCarreraAsync_Existing_ReturnsMateria()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);
        await repo.AddAsync(new Materia { Nombre = "Álgebra", Carrera = "ISC" });

        var result = await repo.GetByNombreYCarreraAsync("Álgebra", "ISC");

        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetByNombreYCarreraAsync_NonExisting_ReturnsNull()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);

        var result = await repo.GetByNombreYCarreraAsync("Nope", "XYZ");

        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsync_And_SaveChangesAsync_UpdatesMateria()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new MateriaRepository(context);
        var materia = new Materia { Nombre = "Old", Carrera = "ISC" };
        await repo.AddAsync(materia);

        materia.Nombre = "New";
        await repo.UpdateAsync(materia);
        await repo.SaveChangesAsync();

        var updated = await repo.GetByIdAsync(materia.Id);
        Assert.Equal("New", updated!.Nombre);
    }
}
