using Profedex.Domain.Entities;

namespace Profedex.UnitTests.Entities;

public class EntityPropertyTests
{
    [Fact]
    public void Materia_AllProperties_CanBeSetAndRead()
    {
        var reviews = new List<Review> { new() { Id = 1 } };
        var materia = new Materia
        {
            Id = 1,
            Nombre = "Cálculo",
            Carrera = "ISC",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Reviews = reviews
        };

        Assert.Equal(1, materia.Id);
        Assert.Equal("Cálculo", materia.Nombre);
        Assert.Equal("ISC", materia.Carrera);
        Assert.Single(materia.Reviews);
    }

    [Fact]
    public void Review_AllProperties_CanBeSetAndRead()
    {
        var teacher = new Teacher { Id = 1, Nombre = "Juan" };
        var materia = new Materia { Id = 1, Nombre = "Física" };
        var review = new Review
        {
            Id = 1,
            UserId = "uuid-123",
            TeacherId = 1,
            MateriaId = 1,
            Body = "Great",
            Rating = 5,
            Difficulty = 3,
            WouldTakeAgain = true,
            LearningLevel = 4,
            Published = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Teacher = teacher,
            Materia = materia
        };

        Assert.Equal("uuid-123", review.UserId);
        Assert.Equal("Juan", review.Teacher.Nombre);
        Assert.Equal("Física", review.Materia.Nombre);
    }

    [Fact]
    public void Teacher_AllProperties_CanBeSetAndRead()
    {
        var reviews = new List<Review> { new() { Id = 1 } };
        var teacher = new Teacher
        {
            Id = 1,
            Nombre = "Juan",
            ApellidoPaterno = "Perez",
            ApellidoMaterno = "Lopez",
            Shortname = "jperez",
            Active = true,
            Reviews = reviews
        };

        Assert.Equal("jperez", teacher.Shortname);
        Assert.Single(teacher.Reviews);
    }
}
