using Profedex.Domain.Entities;
using Profedex.Infrastructure.Repositories;
using Profedex.IntegrationTests.Helpers;

namespace Profedex.IntegrationTests.Repositories;

public class TeacherRepositoryTests
{
    [Fact]
    public async Task AddAsync_And_GetAllAsync_WorkCorrectly()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);
        var teacher = new Teacher { Nombre = "Juan", ApellidoPaterno = "P", ApellidoMaterno = "M", Shortname = "jpm" };

        var created = await repo.AddAsync(teacher);
        var all = await repo.GetAllAsync();

        Assert.True(created.Id > 0);
        Assert.Single(all);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsTeacher()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);
        var teacher = new Teacher { Nombre = "Test", ApellidoPaterno = "A", ApellidoMaterno = "B", Shortname = "test" };
        await repo.AddAsync(teacher);

        var result = await repo.GetByIdAsync(teacher.Id);

        Assert.NotNull(result);
        Assert.Equal("Test", result.Nombre);
    }

    [Fact]
    public async Task GetByIdAsync_NonExisting_ReturnsNull()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);

        var result = await repo.GetByIdAsync(999);

        Assert.Null(result);
    }

    [Fact]
    public async Task GetByShortnameAsync_Existing_ReturnsTeacher()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);
        await repo.AddAsync(new Teacher { Nombre = "A", ApellidoPaterno = "B", ApellidoMaterno = "C", Shortname = "abc" });

        var result = await repo.GetByShortnameAsync("abc");

        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetByShortnameAsync_NonExisting_ReturnsNull()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);

        var result = await repo.GetByShortnameAsync("nonexistent");

        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsync_And_SaveChangesAsync_UpdatesTeacher()
    {
        using var context = TestDbContextFactory.Create();
        var repo = new TeacherRepository(context);
        var teacher = new Teacher { Nombre = "Old", ApellidoPaterno = "A", ApellidoMaterno = "B", Shortname = "old" };
        await repo.AddAsync(teacher);

        teacher.Nombre = "New";
        await repo.UpdateAsync(teacher);
        await repo.SaveChangesAsync();

        var updated = await repo.GetByIdAsync(teacher.Id);
        Assert.Equal("New", updated!.Nombre);
    }
}
