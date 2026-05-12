using Profedex.Domain.Entities;
using Profedex.Infrastructure.Repositories;
using Profedex.IntegrationTests.Helpers;

namespace Profedex.IntegrationTests.Repositories;

public class ReviewRepositoryTests
{
    private async Task<(ReviewRepository repo, Teacher teacher, Materia materia)> SetupWithDependencies()
    {
        var context = TestDbContextFactory.Create();
        var teacher = new Teacher { Nombre = "Juan", ApellidoPaterno = "P", ApellidoMaterno = "M", Shortname = "jpm" };
        var materia = new Materia { Nombre = "Cálculo", Carrera = "ISC" };
        context.Teachers.Add(teacher);
        context.Materias.Add(materia);
        await context.SaveChangesAsync();

        return (new ReviewRepository(context), teacher, materia);
    }

    [Fact]
    public async Task AddAsync_And_GetByIdAsync_WorkCorrectly()
    {
        var (repo, teacher, materia) = await SetupWithDependencies();
        var review = new Review
        {
            TeacherId = teacher.Id,
            MateriaId = materia.Id,
            UserId = "user-1",
            Body = "Great",
            Rating = 5,
            Difficulty = 3,
            WouldTakeAgain = true,
            LearningLevel = 4,
            Published = true
        };

        var created = await repo.AddAsync(review);
        var found = await repo.GetByIdAsync(created.Id);

        Assert.NotNull(found);
        Assert.Equal("Great", found.Body);
    }

    [Fact]
    public async Task GetByTeacherIdAsync_ReturnsPublishedReviewsWithIncludes()
    {
        var (repo, teacher, materia) = await SetupWithDependencies();
        await repo.AddAsync(new Review
        {
            TeacherId = teacher.Id, MateriaId = materia.Id, UserId = "u1",
            Body = "Good", Rating = 4, Difficulty = 2, WouldTakeAgain = true, LearningLevel = 3, Published = true
        });
        await repo.AddAsync(new Review
        {
            TeacherId = teacher.Id, MateriaId = materia.Id, UserId = "u2",
            Body = "Hidden", Rating = 1, Difficulty = 5, WouldTakeAgain = false, LearningLevel = 1, Published = false
        });

        var reviews = (await repo.GetByTeacherIdAsync(teacher.Id)).ToList();

        Assert.Single(reviews);
        Assert.Equal("Good", reviews[0].Body);
        Assert.NotNull(reviews[0].Teacher);
        Assert.NotNull(reviews[0].Materia);
    }

    [Fact]
    public async Task GetByIdAsync_NonExisting_ReturnsNull()
    {
        var (repo, _, _) = await SetupWithDependencies();

        var result = await repo.GetByIdAsync(999);

        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteAsync_And_SaveChangesAsync_RemovesReview()
    {
        var (repo, teacher, materia) = await SetupWithDependencies();
        var review = await repo.AddAsync(new Review
        {
            TeacherId = teacher.Id, MateriaId = materia.Id, UserId = "u1",
            Body = "ToDelete", Rating = 3, Difficulty = 3, WouldTakeAgain = true, LearningLevel = 3, Published = true
        });

        await repo.DeleteAsync(review);
        await repo.SaveChangesAsync();

        var found = await repo.GetByIdAsync(review.Id);
        Assert.Null(found);
    }
}
